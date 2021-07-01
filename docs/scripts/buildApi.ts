import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import * as fse from 'fs-extra';
import path from 'path';
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import * as _ from 'lodash';
import kebabCase from 'lodash/kebabCase';
import * as prettier from 'prettier';
import * as recast from 'recast';
import remark from 'remark';
import remarkVisit from 'unist-util-visit';
import * as yargs from 'yargs';
import * as doctrine from 'doctrine';
import {
  defaultHandlers,
  parse as docgenParse,
  PropDescriptor,
  PropTypeDescriptor,
  ReactDocgenApi,
} from 'react-docgen';
import muiDefaultPropsHandler from 'docs/src/modules/utils/defaultPropsHandler';
import { LANGUAGES } from 'docs/src/modules/constants';
import parseTest from 'docs/src/modules/utils/parseTest';
import generatePropTypeDescription, {
  escapeCell,
  isElementTypeAcceptingRefProp,
  isElementAcceptingRefProp,
} from 'docs/src/modules/utils/generatePropTypeDescription';
import { findPages, findPagesMarkdown, findComponents } from 'docs/src/modules/utils/find';
import { getHeaders, renderInline as renderMarkdownInline } from '@material-ui/markdown';
import { pageToTitle } from 'docs/src/modules/utils/helpers';
import createGenerateClassName from '@material-ui/styles/createGenerateClassName';
import * as ttp from 'typescript-to-proptypes';
import { getLineFeed, getUnstyledFilename } from './helpers';

const apiDocsTranslationsDirectory = path.resolve('docs', 'translations', 'api-docs');
function resolveApiDocsTranslationsComponentDirectory(component: ReactApi): string {
  return path.resolve(apiDocsTranslationsDirectory, kebabCase(component.name));
}
function resolveApiDocsTranslationsComponentLanguagePath(
  component: ReactApi,
  language: typeof LANGUAGES[0],
): string {
  const languageSuffix = language === 'en' ? '' : `-${language}`;

  return path.join(
    resolveApiDocsTranslationsComponentDirectory(component),
    `${kebabCase(component.name)}${languageSuffix}.json`,
  );
}

interface ReactApi extends ReactDocgenApi {
  /**
   * list of page pathnames
   * @example ['/components/Accordion']
   */
  demos: readonly string[];
  EOL: string;
  filename: string;
  forwardsRefTo: string | undefined;
  inheritance: { component: string; pathname: string } | null;
  name: string;
  spread: boolean | undefined;
  src: string;
  styles: {
    classes: string[];
    globalClasses: Record<string, string>;
    name: string | null;
    descriptions: Record<string, string>;
  };
}
interface DescribeablePropDescriptor {
  annotation: doctrine.Annotation;
  defaultValue: string | null;
  required: boolean;
  type: PropTypeDescriptor;
}

const cssComponents = ['Box', 'Grid', 'Typography'];

const generateClassName = createGenerateClassName();

function getDeprecatedInfo(type: PropTypeDescriptor) {
  const marker = /deprecatedPropType\((\r*\n)*\s*PropTypes\./g;
  const match = type.raw.match(marker);
  const startIndex = type.raw.search(marker);
  if (match) {
    const offset = match[0].length;

    return {
      propTypes: type.raw.substring(startIndex + offset, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

function getChained(type: PropTypeDescriptor): false | PropDescriptor {
  if (type.raw) {
    const marker = 'chainPropTypes';
    const indexStart = type.raw.indexOf(marker);

    if (indexStart !== -1) {
      const parsed: ReactApi = docgenParse(
        `
        import PropTypes from 'prop-types';
        const Foo = () => <div />
        Foo.propTypes = {
          bar: ${recast.print(recast.parse(type.raw).program.body[0].expression.arguments[0]).code}
        }
        export default Foo
      `,
        null,
        null,
        // helps react-docgen pickup babel.config.js
        { filename: './' },
      );
      return {
        type: parsed.props.bar.type,
        required: parsed.props.bar.required,
      };
    }
  }

  return false;
}

/**
 * Returns `null` if the prop should be ignored.
 * Throws if it is invalid.
 * @param prop
 * @param propName
 */
function createDescribeableProp(
  prop: PropDescriptor,
  propName: string,
): DescribeablePropDescriptor | null {
  const { defaultValue, jsdocDefaultValue, description, required, type } = prop;

  const renderedDefaultValue = defaultValue?.value.replace(/\r?\n/g, '');
  const renderDefaultValue = Boolean(
    renderedDefaultValue &&
      // Ignore "large" default values that would break the table layout.
      renderedDefaultValue.length <= 150,
  );

  if (description === undefined) {
    throw new Error(`The "${propName}" prop is missing a description.`);
  }

  const annotation = doctrine.parse(description, {
    sloppy: true,
  });

  if (
    annotation.description.trim() === '' ||
    annotation.tags.some((tag) => tag.title === 'ignore')
  ) {
    return null;
  }

  if (jsdocDefaultValue !== undefined && defaultValue === undefined) {
    // Assume that this prop:
    // 1. Is typed by another component
    // 2. Is forwarded to that component
    // Then validation is handled by the other component.
    // Though this does break down if the prop is used in other capacity in the implementation.
    // So let's hope we don't make this mistake too often.
  } else if (jsdocDefaultValue === undefined && defaultValue !== undefined && renderDefaultValue) {
    const shouldHaveDefaultAnnotation =
      // Discriminator for polymorphism which is not documented at the component level.
      // The documentation of `component` does not know in which component it is used.
      propName !== 'component';

    if (shouldHaveDefaultAnnotation) {
      throw new Error(
        `JSDOC @default annotation not found. Add \`@default ${defaultValue.value}\` to the JSDOC of this prop.`,
      );
    }
  } else if (jsdocDefaultValue !== undefined) {
    // `defaultValue` can't be undefined or we would've thrown earlier.
    if (jsdocDefaultValue.value !== defaultValue!.value) {
      throw new Error(
        `Expected JSDOC @default annotation for prop '${propName}' of "${jsdocDefaultValue.value}" to equal runtime default value of "${defaultValue?.value}"`,
      );
    }
  }

  return {
    annotation,
    defaultValue: renderDefaultValue ? renderedDefaultValue! : null,
    required: Boolean(required),
    type,
  };
}

function resolveType(type: NonNullable<doctrine.Tag['type']>): string {
  if (type.type === 'AllLiteral') {
    return 'any';
  }

  if (type.type === 'VoidLiteral') {
    return 'void';
  }

  if (type.type === 'NullLiteral') {
    return 'null';
  }

  if (type.type === 'TypeApplication') {
    const arrayTypeName = resolveType(type.applications[0]);
    return `${arrayTypeName}[]`;
  }

  if (type.type === 'UnionType') {
    return type.elements.map((t) => resolveType(t)).join(' | ');
  }

  if ('name' in type) {
    return type.name;
  }
  throw new TypeError(`resolveType for '${type.type}' not implemented`);
}

function generatePropDescription(prop: DescribeablePropDescriptor, propName: string): string {
  const { annotation } = prop;
  const type = prop.type;
  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);
    if (deprecatedInfo) {
      deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  // Two new lines result in a newline in the table.
  // All other new lines must be eliminated to prevent markdown mayhem.
  const jsDocText = escapeCell(annotation.description)
    .replace(/(\r?\n){2}/g, '<br>')
    .replace(/\r?\n/g, ' ');

  let signature = '';

  // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
  // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
  const parsedArgs: readonly doctrine.Tag[] = annotation.tags.filter(
    (tag) => tag.title === 'param',
  );
  let parsedReturns: { description?: string | null; type?: doctrine.Type | null } | undefined =
    annotation.tags.find((tag) => tag.title === 'returns');
  if (type.name === 'func' && (parsedArgs.length > 0 || parsedReturns !== undefined)) {
    parsedReturns = parsedReturns ?? { type: { type: 'VoidLiteral' } };

    // Remove new lines from tag descriptions to avoid markdown errors.
    annotation.tags.forEach((tag) => {
      if (tag.description) {
        tag.description = tag.description.replace(/\r*\n/g, ' ');
      }
    });

    signature += '<br><br>**Signature:**<br>`function(';
    signature += parsedArgs
      .map((tag, index) => {
        if (tag.type != null && tag.type.type === 'OptionalType') {
          return `${tag.name}?: ${(tag.type.expression as any).name}`;
        }

        if (tag.type === undefined) {
          throw new TypeError(
            `In function signature for prop '${propName}' Argument #${index} has no type.`,
          );
        }
        return `${tag.name}: ${resolveType(tag.type!)}`;
      })
      .join(', ');

    const returnType = parsedReturns.type;
    if (returnType == null) {
      throw new TypeError(
        `Function signature for prop '${propName}' has no return type. Try \`@returns void\`. Otherwise it might be a bug with doctrine.`,
      );
    }

    const returnTypeName = resolveType(returnType);

    signature += `) => ${returnTypeName}\`<br>`;
    signature += parsedArgs
      .filter((tag) => tag.description)
      .map((tag) => `*${tag.name}:* ${tag.description}`)
      .join('<br>');
    if (parsedReturns.description) {
      signature += `<br> *returns* (${returnTypeName}): ${parsedReturns.description}`;
    }
  }

  let notes = '';
  if (isElementAcceptingRefProp(type) || isElementTypeAcceptingRefProp(type)) {
    notes += '<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs).';
  }

  return `${deprecated}${jsDocText}${signature}${notes}`;
}

function writePrettifiedFile(
  filename: string,
  data: string,
  prettierConfigPath: string,
  options: object = {},
) {
  const prettierConfig = prettier.resolveConfig.sync(filename, {
    config: prettierConfigPath,
  });
  if (prettierConfig === null) {
    throw new Error(
      `Could not resolve config for '${filename}' using prettier config path '${prettierConfigPath}'.`,
    );
  }

  writeFileSync(filename, prettier.format(data, { ...prettierConfig, filepath: filename }), {
    encoding: 'utf8',
    ...options,
  });
}

/**
 * Receives a component's test information and source code and return's an object
 * containing the inherited component's name and pathname.
 * @param testInfo Information retrieved from the component's describeConformance() in its test.js file.
 * @param src The component's source code.
 */
function getInheritance(
  testInfo: {
    /** The name of the component functionality is inherited from. */
    inheritComponent: string | undefined;
  },
  src: string,
) {
  let inheritedComponentName = testInfo.inheritComponent;

  if (inheritedComponentName == null) {
    const match = src.match(/\/\/ @inheritedComponent (.*)/);
    if (match !== null) {
      inheritedComponentName = match[1];
    }
  }

  if (inheritedComponentName == null) {
    return null;
  }

  let pathname;

  switch (inheritedComponentName) {
    case 'Transition':
      pathname = 'https://reactcommunity.org/react-transition-group/transition#Transition-props';
      break;

    default:
      pathname = `/api/${kebabCase(inheritedComponentName)}/`;
      break;
  }

  return {
    component: inheritedComponentName,
    pathname,
  };
}

/**
 * Produces markdown of the description that can be hosted anywhere.
 *
 * By default we assume that the markdown is hosted on material-ui.com which is
 * why the source includes relative url. We transform them to absolute urls with
 * this method.
 */
async function computeApiDescription(api: ReactApi, options: { host: string }): Promise<string> {
  const { host } = options;
  const file = await remark()
    .use(function docsLinksAttacher() {
      return function transformer(tree) {
        remarkVisit(tree, 'link', (linkNode) => {
          if ((linkNode.url as string).startsWith('/')) {
            linkNode.url = `${host}${linkNode.url}`;
          }
        });
      };
    })
    .process(api.description);

  return file.contents.toString('utf-8').trim();
}

/**
 * Add demos & API comment block to type definitions, e.g.:
 * /**
 *  * Demos:
 *  *
 *  * - [Icons](https://material-ui.com/components/icons/)
 *  * - [Material Icons](https://material-ui.com/components/material-icons/)
 *  *
 *  * API:
 *  *
 *  * - [Icon API](https://material-ui.com/api/icon/)
 */
async function annotateComponentDefinition(context: {
  component: { filename: string };
  api: ReactApi;
}) {
  const { api, component } = context;
  const HOST = 'https://material-ui.com';

  const typesFilename = component.filename.replace(/\.js$/, '.d.ts');
  const typesSource = readFileSync(typesFilename, { encoding: 'utf8' });
  const typesAST = await babel.parseAsync(typesSource, {
    configFile: false,
    filename: typesFilename,
    presets: [require.resolve('@babel/preset-typescript')],
  });
  if (typesAST === null) {
    throw new Error('No AST returned from babel.');
  }

  let start = 0;
  let end = null;
  traverse(typesAST, {
    ExportDefaultDeclaration(babelPath) {
      /**
       * export default function Menu() {}
       */
      let node: babel.Node = babelPath.node;
      if (node.declaration.type === 'Identifier') {
        // declare const Menu: {};
        // export default Menu;
        if (babel.types.isIdentifier(babelPath.node.declaration)) {
          const bindingId = babelPath.node.declaration.name;
          const binding = babelPath.scope.bindings[bindingId];

          // The JSDOC MUST be located at the declaration
          if (babel.types.isFunctionDeclaration(binding.path.node)) {
            // For function declarations the binding is equal to the declaration
            // /**
            //  */
            // function Component() {}
            node = binding.path.node;
          } else {
            // For variable declarations the binding points to the declarator.
            // /**
            //  */
            // const Component = () => {}
            node = binding.path.parentPath.node;
          }
        }
      }

      const { leadingComments } = node;
      const leadingCommentBlocks =
        leadingComments != null
          ? leadingComments.filter(({ type }) => type === 'CommentBlock')
          : null;
      const jsdocBlock = leadingCommentBlocks != null ? leadingCommentBlocks[0] : null;
      if (leadingCommentBlocks != null && leadingCommentBlocks.length > 1) {
        throw new Error(
          `Should only have a single leading jsdoc block but got ${
            leadingCommentBlocks.length
          }:\n${leadingCommentBlocks
            .map(({ type, value }, index) => `#${index} (${type}): ${value}`)
            .join('\n')}`,
        );
      }
      if (jsdocBlock != null) {
        start = jsdocBlock.start;
        end = jsdocBlock.end;
      } else if (node.start !== null) {
        start = node.start - 1;
        end = start;
      }
    },
  });

  if (end === null || start === 0) {
    throw new TypeError(
      "Don't know where to insert the jsdoc block. Probably no `default export` found",
    );
  }

  let inheritanceAPILink = null;
  if (api.inheritance !== null) {
    const url = api.inheritance.pathname.startsWith('/')
      ? `${HOST}${api.inheritance.pathname}`
      : api.inheritance.pathname;

    inheritanceAPILink = `[${api.inheritance.component} API](${url})`;
  }

  const markdownLines = (await computeApiDescription(api, { host: HOST })).split('\n');
  // Ensure a newline between manual and generated description.
  if (markdownLines[markdownLines.length - 1] !== '') {
    markdownLines.push('');
  }
  markdownLines.push(
    'Demos:',
    '',
    ...api.demos.map((demoPathname) => {
      return `- [${pageToTitle({ pathname: demoPathname })}](${HOST}${demoPathname}/)`;
    }),
    '',
  );

  markdownLines.push('API:', '', `- [${api.name} API](${HOST}/api/${kebabCase(api.name)}/)`);
  if (api.inheritance !== null) {
    markdownLines.push(`- inherits ${inheritanceAPILink}`);
  }

  const jsdoc = `/**\n${markdownLines
    .map((line) => (line.length > 0 ? ` * ${line}` : ` *`))
    .join('\n')}\n */`;
  const typesSourceNew = typesSource.slice(0, start) + jsdoc + typesSource.slice(end);
  writeFileSync(typesFilename, typesSourceNew, { encoding: 'utf8' });
}

function generateMuiName(name: string) {
  return `Mui${name.replace('Unstyled', '').replace('Styled', '')}`;
}

async function parseStyles(api: ReactApi, program: ttp.ts.Program): Promise<ReactApi['styles']> {
  // component has no classes
  // or they're inherited from an external component and we don't want them documented on this component.
  if (api.props.classes === undefined) {
    return {
      classes: [],
      descriptions: {},
      globalClasses: {},
      name: null,
    };
  }

  const typesFilename = api.filename.replace(/\.js$/, '.d.ts');
  const proptypes = ttp.parseFromProgram(typesFilename, program, {
    shouldResolveObject: ({ name }) => {
      return name === 'classes';
    },
    checkDeclarations: true,
  });

  const component = proptypes.body.find((internalComponent) => {
    return internalComponent.name === api.name;
  });
  if (component === undefined) {
    return {
      classes: [],
      descriptions: {},
      globalClasses: {},
      name: null,
    };
    // TODO: should we throw?
    // throw new TypeError(
    //   `Unable to find declaration of ${api.name} in one of the ${
    //     proptypes.body.length
    //   } components: ${proptypes.body.map(({ name }) => name)}`,
    // );
  }

  const classes = component.types.find((propType) => {
    const isClassesProp = propType.name === 'classes';

    return isClassesProp;
  });

  let classesPropType: ttp.InterfaceType | undefined;
  if (classes?.propType.type === 'InterfaceNode') {
    // classes: {}
    classesPropType = classes.propType;
  } else if (classes?.propType.type === 'UnionNode') {
    // classes?: {}
    classesPropType = classes.propType.types.find((propType): propType is ttp.InterfaceType => {
      return propType.type === 'InterfaceNode';
    });
  }
  if (classesPropType === undefined) {
    return {
      classes: [],
      descriptions: {},
      globalClasses: {},
      name: null,
    };
  }

  return {
    classes: classesPropType.types.map((unionMember) => {
      const [className] = unionMember;
      return className;
    }),
    descriptions: Object.fromEntries(
      classesPropType.types
        .map((unionMember) => {
          const [className, { jsDoc }] = unionMember;

          return [className, jsDoc];
        })
        .filter((descriptionEntry) => {
          return descriptionEntry[1] !== undefined;
        }),
    ),
    globalClasses: {},
    name: null,
  };
}

/**
 * Substitute CSS class description conditions with placeholder
 */
function extractClassConditions(descriptions: any) {
  const classConditions: {
    [key: string]: { description: string; conditions?: string; nodeName?: string };
  } = {};
  const stylesRegex =
    /((Styles|Pseudo-class|Class name) applied to )(.*?)(( if | unless | when |, ){1}(.*))?\./;

  Object.entries(descriptions).forEach(([className, description]: any) => {
    if (className) {
      const conditions = description.match(stylesRegex);

      if (conditions && conditions[6]) {
        classConditions[className] = {
          description: description.replace(stylesRegex, '$1{{nodeName}}$5{{conditions}}.'),
          nodeName: conditions[3],
          conditions: conditions[6].replace(/`(.*?)`/g, '<code>$1</code>'),
        };
      } else if (conditions && conditions[3] && conditions[3] !== 'the root element') {
        classConditions[className] = {
          description: description.replace(stylesRegex, '$1{{nodeName}}$5.'),
          nodeName: conditions[3],
        };
      } else {
        classConditions[className] = { description };
      }
    }
  });
  return classConditions;
}

/**
 * Generate list of component demos
 */
function generateDemoList(reactAPI: ReactApi): string {
  return `<ul>${reactAPI.demos
    .map(
      (demoPathname) =>
        `<li><a href="${demoPathname}/">${pageToTitle({ pathname: demoPathname })}</a></li>`,
    )
    .join('\n')}</ul>`;
}

/**
 * @param filepath - absolute path
 * @example toGithubPath('/home/user/material-ui/packages/Accordion') === '/packages/Accordion'
 * @example toGithubPath('C:\\Development\material-ui\packages\Accordion') === '/packages/Accordion'
 */
function toGithubPath(filepath: string, workspaceRoot: string): string {
  return `/${path.relative(workspaceRoot, filepath).replace(/\\/g, '/')}`;
}

async function parseComponentSource(
  src: string,
  componentObject: { filename: string },
): Promise<ReactApi> {
  const reactAPI: ReactApi = docgenParse(
    src,
    null,
    defaultHandlers.concat(muiDefaultPropsHandler),
    {
      filename: componentObject.filename,
    },
  );

  const fullDescription = reactAPI.description;
  // Ignore what we might have generated in `annotateComponentDefinition`
  const annotatedDescriptionMatch = fullDescription.match(/(Demos|API):\r?\n\r?\n/);
  if (annotatedDescriptionMatch !== null) {
    reactAPI.description = fullDescription.slice(0, annotatedDescriptionMatch.index).trim();
  }

  return reactAPI;
}

function findComponentDemos(
  api: ReactApi,
  pagesMarkdown: ReadonlyArray<{ pathname: string; components: readonly string[] }>,
): ReactApi['demos'] {
  const demos = pagesMarkdown
    .filter((page) => {
      return page.components.includes(api.name);
    })
    .map((page) => {
      return page.pathname;
    });

  return Array.from(new Set(demos));
}

async function buildDocs(options: {
  component: { filename: string };
  pagesMarkdown: ReadonlyArray<{
    components: readonly string[];
    filename: string;
    pathname: string;
  }>;
  prettierConfigPath: string;
  program: ttp.ts.Program;
  outputDirectory: string;
  workspaceRoot: string;
}): Promise<ReactApi | null> {
  const {
    component: componentObject,
    outputDirectory,
    workspaceRoot,
    pagesMarkdown,
    prettierConfigPath,
    program,
  } = options;

  if (componentObject.filename.indexOf('internal') !== -1) {
    return null;
  }

  const src = readFileSync(componentObject.filename, 'utf8');

  if (src.match(/@ignore - internal component\./) || src.match(/@ignore - do not document\./)) {
    return null;
  }

  const spread = !src.match(/ = exactProp\(/);

  const name = path.parse(componentObject.filename).name;

  const reactApi: ReactApi = await parseComponentSource(src, componentObject);
  reactApi.filename = componentObject.filename;

  const componentApi: {
    componentDescription: string;
    propDescriptions: { [key: string]: string | undefined };
    classDescriptions: { [key: string]: { description: string; conditions?: string } };
  } = {
    componentDescription: reactApi.description,
    propDescriptions: {},
    classDescriptions: {},
  };

  const unstyledFileName = getUnstyledFilename(componentObject.filename);
  let unstyledSrc;

  // Try to get data for the unstyled component
  try {
    unstyledSrc = readFileSync(unstyledFileName, 'utf8');
  } catch (err) {
    // Unstyled component does not exist
  }

  if (unstyledSrc) {
    const unstyledReactAPI = docgenParse(
      unstyledSrc,
      null,
      defaultHandlers.concat(muiDefaultPropsHandler),
      {
        filename: unstyledFileName,
      },
    );

    Object.keys(unstyledReactAPI.props).forEach((prop) => {
      if (
        unstyledReactAPI.props[prop].defaultValue &&
        (!reactApi.props[prop] || !reactApi.props[prop].defaultValue)
      ) {
        if (reactApi.props[prop]) {
          reactApi.props[prop].defaultValue = unstyledReactAPI.props[prop].defaultValue;
          reactApi.props[prop].jsdocDefaultValue = unstyledReactAPI.props[prop].jsdocDefaultValue;
        } else {
          reactApi.props[prop] = unstyledReactAPI.props[prop];
        }
      }
    });
  }

  reactApi.name = name;
  reactApi.EOL = getLineFeed(src);

  reactApi.demos = findComponentDemos(reactApi, pagesMarkdown);
  if (reactApi.demos.length === 0) {
    throw new Error(
      'Unable to find demos. \n' +
        `Be sure to include \`components: ${reactApi.name}\` in the markdown pages where the \`${reactApi.name}\` component is relevant. ` +
        'Every public component should have a demo. ',
    );
  }

  const testInfo = await parseTest(componentObject.filename);
  // no Object.assign to visually check for collisions
  reactApi.forwardsRefTo = testInfo.forwardsRefTo;
  reactApi.spread = testInfo.spread ?? spread;

  reactApi.inheritance = getInheritance(testInfo, src);

  reactApi.styles = await parseStyles(reactApi, program);

  // TODO: Drop once migration to emotion is complete since this will always be true.
  let jssComponent = false;
  const component = await import(componentObject.filename);
  if (component?.default?.options !== undefined) {
    jssComponent = true;
    reactApi.styles.name = component.default.options.name;
  } else if (reactApi.styles.classes.length > 0 && !reactApi.name.endsWith('Unstyled')) {
    reactApi.styles.name = generateMuiName(reactApi.name);
  }
  reactApi.styles.classes.forEach((key) => {
    reactApi.styles.globalClasses[key] = generateClassName(
      // @ts-expect-error
      {
        key,
      },
      {
        options: {
          name: reactApi.styles.name || generateMuiName(name),
          theme: {},
        },
      },
    );
  });

  const propErrors: Array<[propName: string, error: Error]> = [];
  const componentProps = _.fromPairs<{
    default: string | undefined;
    required: boolean | undefined;
    type: { name: string | undefined; description: string | undefined };
    deprecated: true | undefined;
    deprecationInfo: string | undefined;
  }>(
    Object.entries(reactApi.props).map(([propName, propDescriptor]) => {
      let prop: DescribeablePropDescriptor | null;
      try {
        prop = createDescribeableProp(propDescriptor, propName);
      } catch (error) {
        propErrors.push([propName, error]);
        prop = null;
      }
      if (prop === null) {
        // have to delete `componentProps.undefined` later
        return [] as any;
      }

      let description = generatePropDescription(prop, propName);
      description = renderMarkdownInline(description);

      if (propName === 'classes') {
        description += ' See <a href="#css">CSS API</a> below for more details.';
      } else if (propName === 'sx') {
        description += ' See the <a href="/system/the-sx-prop/">`sx` page</a> for more details.';
      }
      componentApi.propDescriptions[propName] = description.replace(/\n@default.*$/, '');

      // Only keep `default` for bool props if it isn't 'false'.
      let defaultValue: string | undefined;
      if (
        propDescriptor.type.name !== 'bool' ||
        propDescriptor.jsdocDefaultValue?.value !== 'false'
      ) {
        defaultValue = propDescriptor.jsdocDefaultValue?.value;
      }

      const propTypeDescription = generatePropTypeDescription(propDescriptor.type);
      const chainedPropType = getChained(prop.type);

      const requiredProp =
        prop.required ||
        /\.isRequired/.test(prop.type.raw) ||
        (chainedPropType !== false && chainedPropType.required);

      const deprecation = (propDescriptor.description || '').match(/@deprecated(\s+(?<info>.*))?/);

      return [
        propName,
        {
          type: {
            name: propDescriptor.type.name,
            description:
              propTypeDescription !== propDescriptor.type.name ? propTypeDescription : undefined,
          },
          default: defaultValue,
          // undefined values are not serialized => saving some bytes
          required: requiredProp || undefined,
          deprecated: !!deprecation || undefined,
          deprecationInfo:
            renderMarkdownInline(deprecation?.groups?.info || '').trim() || undefined,
        },
      ];
    }),
  );
  if (propErrors.length > 0) {
    throw new Error(
      `There were errors creating prop descriptions:\n${propErrors
        .map(([propName, error]) => {
          return `  - ${propName}: ${error}`;
        })
        .join('\n')}`,
    );
  }

  // created by returning the `[]` entry
  delete componentProps.undefined;

  /**
   * CSS class descriptiohs.
   */
  componentApi.classDescriptions = extractClassConditions(reactApi.styles.descriptions);

  mkdirSync(resolveApiDocsTranslationsComponentDirectory(reactApi), {
    mode: 0o777,
    recursive: true,
  });

  writePrettifiedFile(
    resolveApiDocsTranslationsComponentLanguagePath(reactApi, 'en'),
    JSON.stringify(componentApi),
    prettierConfigPath,
  );

  LANGUAGES.forEach((language) => {
    if (language !== 'en') {
      try {
        writePrettifiedFile(
          resolveApiDocsTranslationsComponentLanguagePath(reactApi, language),
          JSON.stringify(componentApi),
          prettierConfigPath,
          { flag: 'wx' },
        );
      } catch (error) {
        // File exists
      }
    }
  });

  /**
   * Gather the metadata needed for the component's API page.
   */
  const pageContent = {
    // Sorted by required DESC, name ASC
    props: _.fromPairs(
      Object.entries(componentProps).sort(([aName, aData], [bName, bData]) => {
        if ((aData.required && bData.required) || (!aData.required && !bData.required)) {
          return aName.localeCompare(bName);
        }
        if (aData.required) {
          return -1;
        }
        return 1;
      }),
    ),
    name: reactApi.name,
    styles: {
      classes: reactApi.styles.classes,
      globalClasses: _.fromPairs(
        Object.entries(reactApi.styles.globalClasses).filter(([className, globalClassName]) => {
          // Only keep "non-standard" global classnames
          return globalClassName !== `Mui${reactApi.name}-${className}`;
        }),
      ),
      name: reactApi.styles.name,
    },
    spread: reactApi.spread,
    forwardsRefTo: reactApi.forwardsRefTo,
    filename: toGithubPath(reactApi.filename, workspaceRoot),
    inheritance: reactApi.inheritance,
    demos: generateDemoList(reactApi),
    styledComponent: !jssComponent,
    cssComponent: cssComponents.indexOf(reactApi.name) >= 0,
  };

  // docs/pages/component-name.json
  writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
    prettierConfigPath,
  );

  // docs/pages/component-name.js
  writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.js`),
    `import * as React from 'react';
import ApiPage from 'docs/src/modules/components/ApiPage';
import mapApiPageTranslations from 'docs/src/modules/utils/mapApiPageTranslations';
import jsonPageContent from './${kebabCase(reactApi.name)}.json';

export default function Page(props) {
  const { descriptions, pageContent } = props;
  return <ApiPage descriptions={descriptions} pageContent={pageContent} />;
}

Page.getInitialProps = () => {
  const req = require.context(
    'docs/translations/api-docs/${kebabCase(reactApi.name)}',
    false,
    /${kebabCase(reactApi.name)}.*.json$/,
  );
  const descriptions = mapApiPageTranslations(req);

  return {
    descriptions,
    pageContent: jsonPageContent,
  };
};
`.replace(/\r?\n/g, reactApi.EOL),
    prettierConfigPath,
  );

  // eslint-disable-next-line no-console
  console.log('Built API docs for', reactApi.name);

  await annotateComponentDefinition({ api: reactApi, component: componentObject });

  return reactApi;
}

/**
 * Creates .js file containing all /api nextjs pages
 */
function generateApiPagesManifest(outputPath: string, prettierConfigPath: string): void {
  const [{ children: apiPages }] = findPages({ front: true });
  if (apiPages === undefined) {
    throw new TypeError('Unable to find pages under /api');
  }

  const source = `module.exports = ${JSON.stringify(apiPages)}`;
  writePrettifiedFile(outputPath, source, prettierConfigPath);
}

async function removeOutdatedApiDocsTranslations(components: readonly ReactApi[]): Promise<void> {
  const componentDirectories = new Set<string>();
  const files = await fse.readdir(apiDocsTranslationsDirectory);
  await Promise.all(
    files.map(async (filename) => {
      const filepath = path.join(apiDocsTranslationsDirectory, filename);
      const stats = await fse.stat(filepath);
      if (stats.isDirectory()) {
        componentDirectories.add(filepath);
      }
    }),
  );

  const currentComponentDirectories = new Set(
    components.map((component) => {
      return resolveApiDocsTranslationsComponentDirectory(component);
    }),
  );

  // outdatedComponentDirectories = currentComponentDirectories.difference(componentDirectories)
  const outdatedComponentDirectories = new Set(componentDirectories);
  currentComponentDirectories.forEach((componentDirectory) => {
    outdatedComponentDirectories.delete(componentDirectory);
  });

  await Promise.all(
    Array.from(outdatedComponentDirectories, (outdatedComponentDirectory) => {
      return fse.remove(outdatedComponentDirectory);
    }),
  );
}

async function run(argv: {
  apiPagesManifestPath?: string;
  componentDirectories?: readonly string[];
  grep?: string;
  outputDirectory?: string;
}) {
  const workspaceRoot = path.resolve(__dirname, '../../');
  /**
   * @type {string[]}
   */
  const componentDirectories = argv.componentDirectories!.map((componentDirectory) => {
    return path.resolve(componentDirectory);
  });
  const apiPagesManifestPath = path.resolve(argv.apiPagesManifestPath!);
  const outputDirectory = path.resolve(argv.outputDirectory!);
  const grep = argv.grep == null ? null : new RegExp(argv.grep);

  const prettierConfigPath = path.join(workspaceRoot, 'prettier.config.js');

  mkdirSync(outputDirectory, { mode: 0o777, recursive: true });

  /**
   * pageMarkdown: Array<{ components: string[]; filename: string; pathname: string }>
   *
   * e.g.:
   * [{
   *   pathname: '/components/accordion',
   *   filename: '/Users/user/Projects/material-ui/docs/src/pages/components/badges/accordion-ja.md',
   *   components: [ 'Accordion', 'AccordionActions', 'AccordionDetails', 'AccordionSummary' ]
   * }, ...]
   */
  const pagesMarkdown = findPagesMarkdown()
    .map((markdown) => {
      const markdownSource = readFileSync(markdown.filename, 'utf8');
      return {
        ...markdown,
        components: getHeaders(markdownSource).components,
      };
    })
    .filter((markdown) => markdown.components.length > 0);

  /**
   * components: Array<{ filename: string }>
   * e.g.
   * [{ filename: '/Users/user/Projects/material-ui/packages/material-ui/src/Accordion/Accordion.js'}, ...]
   */
  const components = componentDirectories
    .reduce((directories, componentDirectory) => {
      return directories.concat(findComponents(componentDirectory));
    }, [] as ReadonlyArray<{ filename: string }>)
    .filter((component) => {
      if (component.filename.includes('ThemeProvider')) {
        return false;
      }
      if (grep === null) {
        return true;
      }
      return grep.test(component.filename);
    });

  const tsconfig = ttp.loadConfig(path.resolve(workspaceRoot, './tsconfig.json'));
  const program = ttp.createTSProgram(
    components.map((component) => {
      if (component.filename.endsWith('.tsx')) {
        return component.filename;
      }
      if (component.filename.endsWith('.js')) {
        return component.filename.replace(/\.js$/, '.d.ts');
      }
      throw new TypeError(
        `Unexpected component filename '${component.filename}'. Expected either a .tsx or .js file.`,
      );
    }),
    tsconfig,
  );

  const componentBuilds = components.map(async (component) => {
    try {
      return await buildDocs({
        component,
        outputDirectory,
        pagesMarkdown,
        prettierConfigPath,
        program,
        workspaceRoot,
      });
    } catch (error) {
      error.message = `${path.relative(process.cwd(), component.filename)}: ${error.message}`;
      throw error;
    }
  });

  const builds = await Promise.allSettled(componentBuilds);

  const fails = builds.filter(
    (promise): promise is PromiseRejectedResult => promise.status === 'rejected',
  );

  fails.forEach((build) => {
    console.error(build.reason);
  });
  if (fails.length > 0) {
    process.exit(1);
  }

  generateApiPagesManifest(apiPagesManifestPath, prettierConfigPath);
  if (grep === null) {
    const componentApis = builds
      .filter((build): build is PromiseFulfilledResult<ReactApi> => {
        return build.status === 'fulfilled' && build.value !== null;
      })
      .map((build) => {
        return build.value;
      });
    await removeOutdatedApiDocsTranslations(componentApis);
  }
}

yargs
  .command({
    command: '$0 <outputDirectory> [componentDirectories...]',
    describe: 'formats codebase',
    builder: (command) => {
      return command
        .positional('outputDirectory', {
          description: 'directory where the files are written to',
          type: 'string',
        })
        .positional('componentDirectories', {
          array: true,
          description: 'Directories to component sources',
          type: 'string',
        })
        .option('grep', {
          description:
            'Only generate files for component filenames matching the pattern. The string is treated as a RegExp.',
          type: 'string',
        })
        .option('apiPagesManifestPath', {
          description: 'The path to the file where pages available under /api are written to.',
          requiresArg: true,
          type: 'string',
        });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
