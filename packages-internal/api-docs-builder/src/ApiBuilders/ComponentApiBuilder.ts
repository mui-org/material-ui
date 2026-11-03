import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import { kebabCase, escapeRegExp } from 'es-toolkit/string';
import { remark } from 'remark';
import { visit as remarkVisit } from 'unist-util-visit';
import type { Link } from 'mdast';
import { defaultHandlers, parse as docgenParse } from 'react-docgen';
import type { Annotation } from 'doctrine';
import { parse as parseDoctrine } from 'doctrine';
import { renderCodeTags, renderMarkdown } from '../buildApi';
import type { ProjectSettings, SortingStrategiesType } from '../ProjectSettings';
import { toGitHubPath, writePrettifiedFile } from '../buildApiUtils';
import muiDefaultPropsHandler from '../utils/defaultPropsHandler';
import parseTest from '../utils/parseTest';
import generatePropTypeDescription, { getChained } from '../utils/generatePropTypeDescription';
import type {
  CreateDescribeablePropSettings,
  DescribeablePropDescriptor,
} from '../utils/createDescribeableProp';
import createDescribeableProp from '../utils/createDescribeableProp';
import generatePropDescription from '../utils/generatePropDescription';
import type { TypeScriptProject } from '../utils/createTypeScriptProject';
import parseSlotsAndClasses from '../utils/parseSlotsAndClasses';
import generateApiTranslations from '../utils/generateApiTranslation';
import { sortAlphabetical } from '../utils/sortObjects';
import type {
  AdditionalPropsInfo,
  ComponentApiContent,
  ComponentReactApi,
  ParsedProperty,
  TypeDescriptions,
} from '../types/ApiBuilder.types';
import type { Slot, ComponentInfo, ApiItemDescription } from '../types/utils.types';
import extractInfoFromEnum from '../utils/extractInfoFromEnum';

/**
 * Produces markdown of the description that can be hosted anywhere.
 *
 * By default we assume that the markdown is hosted on mui.com which is
 * why the source includes relative url. We transform them to absolute urls with
 * this method.
 */
export async function computeApiDescription(
  api: { description: ComponentReactApi['description'] },
  options: { host: string },
): Promise<string> {
  const { host } = options;
  const file = await remark()
    .use(function docsLinksAttacher() {
      return function transformer(tree) {
        remarkVisit(tree, 'link', (linkNode) => {
          const link = linkNode as Link;
          if ((link.url as string).startsWith('/')) {
            link.url = `${host}${link.url}`;
          }
        });
      };
    })
    .process(api.description);

  return file.toString().trim();
}

/**
 * Add demos & API comment block to type definitions, e.g.:
 * /**
 *  * Demos:
 *  *
 *  * - [Icons](https://mui.com/components/icons/)
 *  * - [Material Icons](https://mui.com/components/material-icons/)
 *  *
 *  * API:
 *  *
 *  * - [Icon API](https://mui.com/api/icon/)
 */
async function annotateComponentDefinition(
  api: ComponentReactApi,
  componentJsdoc: Annotation,
  projectSettings: ProjectSettings,
) {
  const HOST = projectSettings.baseApiUrl ?? 'https://mui.com';

  const typesFilename = api.filename.replace(/\.js$/, '.d.ts');
  const fileName = path.parse(api.filename).name;
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

          // The JSDoc MUST be located at the declaration
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
            node = binding.path.parentPath!.node;
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
      if (jsdocBlock?.start != null && jsdocBlock?.end != null) {
        start = jsdocBlock.start;
        end = jsdocBlock.end;
      } else if (node.start != null) {
        start = node.start - 1;
        end = start;
      }
    },

    ExportNamedDeclaration(babelPath) {
      let node: babel.Node = babelPath.node;

      if (node.declaration == null) {
        // export { Menu };
        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ExportSpecifier' && specifier.local.name === fileName) {
            const binding = babelPath.scope.bindings[specifier.local.name];

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
              node = binding.path.parentPath!.node;
            }
          }
        });
      } else if (babel.types.isFunctionDeclaration(node.declaration)) {
        // export function Menu() {}
        if (node.declaration.id?.name === fileName) {
          node = node.declaration;
        }
      } else {
        return;
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
      if (jsdocBlock?.start != null && jsdocBlock?.end != null) {
        start = jsdocBlock.start;
        end = jsdocBlock.end;
      } else if (node.start != null) {
        start = node.start - 1;
        end = start;
      }
    },
  });

  if (end === null || start === 0) {
    throw new TypeError(
      `${api.filename}: Don't know where to insert the jsdoc block. Probably no default export or named export matching the file name was found.`,
    );
  }

  let inheritanceAPILink = null;
  if (api.inheritance) {
    inheritanceAPILink = `[${api.inheritance.name} API](${
      api.inheritance.apiPathname.startsWith('http')
        ? api.inheritance.apiPathname
        : `${HOST}${api.inheritance.apiPathname}`
    })`;
  }

  const markdownLines = (await computeApiDescription(api, { host: HOST })).split('\n');
  // Ensure a newline between manual and generated description.
  if (markdownLines[markdownLines.length - 1] !== '') {
    markdownLines.push('');
  }

  if (api.customAnnotation) {
    markdownLines.push(
      ...api.customAnnotation
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
    );
  } else {
    markdownLines.push(
      'Demos:',
      '',
      ...api.demos.map((demo) => {
        return `- [${demo.demoPageTitle}](${
          demo.demoPathname.startsWith('http') ? demo.demoPathname : `${HOST}${demo.demoPathname}`
        })`;
      }),
      '',
    );

    markdownLines.push(
      'API:',
      '',
      `- [${api.name} API](${
        api.apiPathname.startsWith('http') ? api.apiPathname : `${HOST}${api.apiPathname}`
      })`,
    );
    if (api.inheritance) {
      markdownLines.push(`- inherits ${inheritanceAPILink}`);
    }
  }

  if (componentJsdoc.tags.length > 0) {
    markdownLines.push('');
  }

  componentJsdoc.tags.forEach((tag) => {
    markdownLines.push(`@${tag.title}${tag.name ? ` ${tag.name} -` : ''} ${tag.description}`);
  });

  const jsdoc = `/**\n${markdownLines
    .map((line) => (line.length > 0 ? ` * ${line}` : ` *`))
    .join('\n')}\n */`;
  const typesSourceNew = typesSource.slice(0, start) + jsdoc + typesSource.slice(end);
  writeFileSync(typesFilename, typesSourceNew, { encoding: 'utf8' });
}

/**
 * Substitute CSS class description conditions with placeholder
 */
function extractClassCondition(description: string) {
  const stylesRegex =
    /((Styles|State class|Class name) applied to )(.*?)(( if | unless | when |, ){1}(.*))?\./;

  const conditions = description.match(stylesRegex);

  if (conditions && conditions[6]) {
    return {
      description: renderMarkdown(
        description.replace(stylesRegex, '$1{{nodeName}}$5{{conditions}}.'),
      ),
      nodeName: renderMarkdown(conditions[3]),
      conditions: renderMarkdown(renderCodeTags(conditions[6])),
    };
  }

  if (conditions && conditions[3] && conditions[3] !== 'the root element') {
    return {
      description: renderMarkdown(description.replace(stylesRegex, '$1{{nodeName}}$5.')),
      nodeName: renderMarkdown(conditions[3]),
    };
  }

  return { description: renderMarkdown(description) };
}

const generateApiPage = async (
  apiPagesDirectory: string,
  importTranslationPagesDirectory: string,
  reactApi: ComponentReactApi,
  sortingStrategies?: SortingStrategiesType,
  onlyJsonFile: boolean = false,
  layoutConfigPath: string = '',
) => {
  const normalizedApiPathname = reactApi.apiPathname.replace(/\\/g, '/');
  /**
   * Gather the metadata needed for the component's API page.
   */
  const pageContent: ComponentApiContent = {
    // Sorted by required DESC, name ASC
    props: Object.fromEntries(
      Object.entries(reactApi.propsTable).sort(([aName, aData], [bName, bData]) => {
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
    imports: reactApi.imports,
    ...(reactApi.slots?.length > 0 && { slots: reactApi.slots }),
    ...(Object.keys(reactApi.cssVariables).length > 0 && { cssVariables: reactApi.cssVariables }),
    ...(Object.keys(reactApi.dataAttributes).length > 0 && {
      dataAttributes: reactApi.dataAttributes,
    }),
    classes: reactApi.classes,
    spread: reactApi.spread,
    themeDefaultProps: reactApi.themeDefaultProps,
    muiName: normalizedApiPathname.startsWith('/joy-ui')
      ? reactApi.muiName.replace('Mui', 'Joy')
      : reactApi.muiName,
    forwardsRefTo: reactApi.forwardsRefTo,
    filename: toGitHubPath(reactApi.filename),
    inheritance: reactApi.inheritance
      ? {
          component: reactApi.inheritance.name,
          pathname: reactApi.inheritance.apiPathname,
        }
      : null,
    demos: `<ul>${reactApi.demos
      .map((item) => `<li><a href="${item.demoPathname}">${item.demoPageTitle}</a></li>`)
      .join('\n')}</ul>`,
    deprecated: reactApi.deprecated,
  };

  const { classesSort = sortAlphabetical('key'), slotsSort = null } = {
    ...sortingStrategies,
  };

  if (classesSort) {
    pageContent.classes = [...pageContent.classes].sort(classesSort);
  }
  if (slotsSort && pageContent.slots) {
    pageContent.slots = [...pageContent.slots].sort(slotsSort);
  }

  await writePrettifiedFile(
    path.resolve(apiPagesDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
  );

  if (!onlyJsonFile) {
    await writePrettifiedFile(
      path.resolve(apiPagesDirectory, `${kebabCase(reactApi.name)}.js`),
      `import * as React from 'react';
import { ApiPage } from '@mui/internal-core-docs/ApiPage';${
        layoutConfigPath === ''
          ? ''
          : `
import layoutConfig from '${layoutConfigPath}';`
      }
import descriptions from '${importTranslationPagesDirectory}/${kebabCase(reactApi.name)}/${kebabCase(reactApi.name)}.json';
import jsonPageContent from './${kebabCase(reactApi.name)}.json';

export default function Page() {
  return <ApiPage ${layoutConfigPath === '' ? '' : '{...layoutConfig} '}descriptions={descriptions} pageContent={jsonPageContent} />;
}
`.replace(/\r?\n/g, reactApi.EOL),
    );
  }
};

const attachTranslations = (
  reactApi: ComponentReactApi,
  deprecationInfo: string | undefined,
  settings?: CreateDescribeablePropSettings,
) => {
  const translations: ComponentReactApi['translations'] = {
    componentDescription: reactApi.description,
    deprecationInfo: deprecationInfo ? renderMarkdown(deprecationInfo) : undefined,
    propDescriptions: {},
    classDescriptions: {},
  };
  Object.entries(reactApi.props!).forEach(([propName, propDescriptor]) => {
    let prop: DescribeablePropDescriptor | null;
    try {
      prop = createDescribeableProp(propDescriptor, propName, settings);
    } catch (error) {
      prop = null;
    }
    if (prop) {
      const { deprecated, seeMore, jsDocText, signatureArgs, signatureReturn, requiresRef } =
        generatePropDescription(prop, propName);
      // description = renderMarkdownInline(`${description}`);

      const typeDescriptions: TypeDescriptions = {};
      (signatureArgs || [])
        .concat(signatureReturn || [])
        .forEach(({ name, description, argType, argTypeDescription }) => {
          typeDescriptions[name] = {
            name,
            description: renderMarkdown(description),
            argType,
            argTypeDescription: argTypeDescription ? renderMarkdown(argTypeDescription) : undefined,
          };
        });

      translations.propDescriptions[propName] = {
        description: renderMarkdown(jsDocText),
        requiresRef: requiresRef || undefined,
        deprecated: renderMarkdown(deprecated) || undefined,
        typeDescriptions: Object.keys(typeDescriptions).length > 0 ? typeDescriptions : undefined,
        seeMoreText: seeMore?.description,
      };
    }
  });

  /**
   * Slot descriptions.
   */
  if (reactApi.slots?.length > 0) {
    translations.slotDescriptions = {};
    [...reactApi.slots]
      .sort(sortAlphabetical('name')) // Sort to ensure consistency of object key order
      .forEach((slot: Slot) => {
        const { name, description } = slot;
        translations.slotDescriptions![name] = renderMarkdown(description);
      });
  }

  /**
   * CSS class descriptions and deprecations.
   */
  [...reactApi.classes]
    .sort(sortAlphabetical('key')) // Sort to ensure consistency of object key order
    .forEach((classDefinition) => {
      translations.classDescriptions[classDefinition.key] = {
        ...extractClassCondition(classDefinition.description),
        deprecationInfo: classDefinition.deprecationInfo,
      };
    });
  reactApi.classes.forEach((classDefinition, index) => {
    delete reactApi.classes[index].deprecationInfo; // store deprecation info in translations only
  });

  /**
   * CSS variables descriptions.
   */
  if (Object.keys(reactApi.cssVariables).length > 0) {
    translations.cssVariablesDescriptions = {};
    [...Object.keys(reactApi.cssVariables)]
      .sort() // Sort to ensure consistency of object key order
      .forEach((cssVariableName: string) => {
        const cssVariable = reactApi.cssVariables[cssVariableName];
        const { description } = cssVariable;
        translations.cssVariablesDescriptions![cssVariableName] = renderMarkdown(description);
      });
  }

  /**
   * Data attributes descriptions.
   */
  if (Object.keys(reactApi.dataAttributes).length > 0) {
    translations.dataAttributesDescriptions = {};
    [...Object.keys(reactApi.dataAttributes)]
      .sort() // Sort to ensure consistency of object key order
      .forEach((dataAttributeName: string) => {
        const dataAttribute = reactApi.dataAttributes[dataAttributeName];
        const { description } = dataAttribute;
        translations.dataAttributesDescriptions![dataAttributeName] = renderMarkdown(description);
      });
  }

  reactApi.translations = translations;
};

const attachPropsTable = (
  reactApi: ComponentReactApi,
  settings?: CreateDescribeablePropSettings,
) => {
  const propErrors: Array<[propName: string, error: Error]> = [];
  type Pair = [string, ComponentReactApi['propsTable'][string]];
  const componentProps: ComponentReactApi['propsTable'] = Object.fromEntries(
    Object.entries(reactApi.props!).flatMap(([propName, propDescriptor]): Pair[] => {
      let prop: DescribeablePropDescriptor | null;
      try {
        prop = createDescribeableProp(propDescriptor, propName, settings);
      } catch (error) {
        propErrors.push([`[${reactApi.name}] \`${propName}\``, error as Error]);
        prop = null;
      }
      if (prop === null) {
        return [];
      }

      const defaultValue = (propDescriptor as any).jsdocDefaultValue?.value;

      const {
        signature: signatureType,
        signatureArgs,
        signatureReturn,
        seeMore,
      } = generatePropDescription(prop, propName);
      const propType = propDescriptor.type;
      const propTypeDescription = propType ? generatePropTypeDescription(propType) : undefined;
      const chainedPropType = getChained(prop.type);

      const requiredProp =
        prop.required ||
        prop.type?.raw?.includes('.isRequired') ||
        (chainedPropType !== false && chainedPropType.required);

      const deprecation = (propDescriptor.description || '').match(/@deprecated(\s+(?<info>.*))?/);

      const additionalPropsInfo: AdditionalPropsInfo = {};

      const normalizedApiPathname = reactApi.apiPathname.replace(/\\/g, '/');

      if (propName === 'classes') {
        additionalPropsInfo.cssApi = true;
      } else if (propName === 'sx') {
        additionalPropsInfo.sx = true;
      } else if (propName === 'slots' && !normalizedApiPathname.startsWith('/material-ui')) {
        additionalPropsInfo.slotsApi = true;
      } else if (normalizedApiPathname.startsWith('/joy-ui')) {
        switch (propName) {
          case 'size':
            additionalPropsInfo['joy-size'] = true;
            break;
          case 'color':
            additionalPropsInfo['joy-color'] = true;
            break;
          case 'variant':
            additionalPropsInfo['joy-variant'] = true;
            break;
          default:
        }
      }

      let signature: ComponentReactApi['propsTable'][string]['signature'];
      if (signatureType !== undefined) {
        signature = {
          type: signatureType,
          describedArgs: signatureArgs?.map((arg) => arg.name),
          returned: signatureReturn?.name,
        };
      }
      // Skip props with unknown/undefined types
      if (!propType?.name) {
        return [];
      }

      return [
        [
          propName,
          {
            type: {
              name: propType.name,
              description: propTypeDescription !== propType.name ? propTypeDescription : undefined,
            },
            default: defaultValue,
            // undefined values are not serialized => saving some bytes
            required: requiredProp || undefined,
            deprecated: !!deprecation || undefined,
            deprecationInfo: renderMarkdown(deprecation?.groups?.info || '').trim() || undefined,
            signature,
            additionalInfo:
              Object.keys(additionalPropsInfo).length === 0 ? undefined : additionalPropsInfo,
            seeMoreLink: seeMore?.link,
          },
        ],
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

  reactApi.propsTable = componentProps;
};

/**
 * Helper to get the import options
 * @param name The name of the component
 * @param filename The filename where its defined (to infer the package)
 * @returns an array of import command
 */
const defaultGetComponentImports = (name: string, filename: string) => {
  const githubPath = toGitHubPath(filename);
  const rootImportPath = githubPath.replace(
    /\/packages\/mui(?:-(.+?))?\/src\/.*/,
    (match, pkg) => `@mui/${pkg}`,
  );

  const subdirectoryImportPath = githubPath.replace(
    /\/packages\/mui(?:-(.+?))?\/src\/([^\\/]+)\/.*/,
    (match, pkg, directory) => `@mui/${pkg}/${directory}`,
  );

  let namedImportName = name;
  const defaultImportName = name;

  if (githubPath.includes('Unstable_')) {
    namedImportName = `Unstable_${name} as ${name}`;
  }

  const useNamedImports = rootImportPath === '@mui/base';

  const subpathImport = useNamedImports
    ? `import { ${namedImportName} } from '${subdirectoryImportPath}';`
    : `import ${defaultImportName} from '${subdirectoryImportPath}';`;

  const rootImport = `import { ${namedImportName} } from '${rootImportPath}';`;

  return [subpathImport, rootImport];
};

const attachTable = (
  reactApi: ComponentReactApi,
  params: ParsedProperty[],
  attribute: 'cssVariables' | 'dataAttributes',
  defaultType?: string,
) => {
  const errors: Array<[propName: string, error: Error]> = [];
  const data: { [key: string]: ApiItemDescription } = params
    .flatMap((p) => {
      const { name: propName, ...propDescriptor } = p;
      let prop: Omit<ParsedProperty, 'name'> | null;
      try {
        prop = propDescriptor;
      } catch (error) {
        errors.push([propName, error as Error]);
        prop = null;
      }
      if (prop === null) {
        return [];
      }

      const deprecationTag = propDescriptor.tags?.deprecated;
      const deprecation = deprecationTag?.text?.[0]?.text;

      const typeTag = propDescriptor.tags?.type;

      let type = typeTag?.text?.[0]?.text ?? defaultType;
      if (typeof type === 'string') {
        type = type.replace(/{|}/g, '');
      }

      return [
        {
          name: propName,
          description: propDescriptor.description,
          type,
          deprecated: !!deprecation || undefined,
          deprecationInfo: renderMarkdown(deprecation || '').trim() || undefined,
        },
      ];
    })
    .reduce((acc, cssVarDefinition) => {
      const { name, ...other } = cssVarDefinition;
      return {
        ...acc,
        [name]: other,
      };
    }, {});

  if (errors.length > 0) {
    throw new Error(
      `There were errors creating ${attribute.replace(/([A-Z])/g, ' $1')} descriptions:\n${errors
        .map(([item, error]) => {
          return `  - ${item}: ${error}`;
        })
        .join('\n')}`,
    );
  }

  reactApi[attribute] = data;
};

/**
 * - Build react component (specified filename) api by lookup at its definition (.d.ts or ts)
 *   and then generate the API page + json data
 * - Generate the translations
 * - Add the comment in the component filename with its demo & API urls (including the inherited component).
 *   this process is done by sourcing markdown files and filter matched `components` in the frontmatter
 */
export default async function generateComponentApi(
  componentInfo: ComponentInfo,
  project: TypeScriptProject,
  projectSettings: ProjectSettings,
) {
  const { shouldSkip, spread, EOL, src } = componentInfo.readFile();

  if (shouldSkip) {
    return null;
  }

  const filename = componentInfo.filename;
  let reactApi: ComponentReactApi;

  const handlers = [...defaultHandlers, muiDefaultPropsHandler];
  try {
    const results = docgenParse(src, {
      handlers,
      filename,
    });
    reactApi = results[0] as ComponentReactApi;
  } catch (error) {
    // fallback to default logic if there is no `create*` definition.
    if ((error as Error).message === 'No suitable component definition found.') {
      const results = docgenParse(src, {
        resolver: {
          resolve(file) {
            const foundPaths: any[] = [];
            file.traverse({
              FunctionDeclaration(funcPath) {
                const params = funcPath.node.params;
                if (
                  params.length > 0 &&
                  params[0].type === 'Identifier' &&
                  params[0].name === 'props'
                ) {
                  foundPaths.push(funcPath);
                }
              },
              VariableDeclaration(varPath) {
                for (const declarator of varPath.node.declarations) {
                  if (declarator.init) {
                    let initNode = declarator.init;
                    // Handle TSAsExpression wrapper
                    if (initNode.type === 'TSAsExpression') {
                      initNode = initNode.expression;
                    }
                    if (
                      initNode.type === 'CallExpression' &&
                      initNode.callee.type === 'Identifier' &&
                      initNode.callee.name === `create${componentInfo.name}`
                    ) {
                      // Get the path to the init (call expression)
                      const declarators = varPath.get('declarations');
                      if (Array.isArray(declarators) && declarators.length > 0) {
                        let initPath = declarators[0].get('init');
                        if (!Array.isArray(initPath)) {
                          // Unwrap TSAsExpression if present
                          if (initPath.isTSAsExpression()) {
                            initPath = initPath.get('expression') as typeof initPath;
                          }
                          foundPaths.push(initPath);
                        }
                      }
                    }
                  }
                }
              },
            });
            return foundPaths;
          },
        },
        handlers,
        filename,
      });
      reactApi = results[0] as ComponentReactApi;
    } else {
      throw error;
    }
  }

  if (!reactApi.props) {
    reactApi.props = {};
  }

  const { getComponentImports = defaultGetComponentImports } = projectSettings;
  const componentJsdoc = parseDoctrine(reactApi.description);

  // We override `reactApi.description` with `componentJsdoc.description` because
  // the former can include JSDoc tags that we don't want to render in the docs.
  reactApi.description = componentJsdoc.description;

  // Ignore what we might have generated in `annotateComponentDefinition`
  let annotationBoundary: RegExp = /(Demos|API):\r?\n\r?\n/;
  if (componentInfo.customAnnotation) {
    annotationBoundary = new RegExp(
      escapeRegExp(componentInfo.customAnnotation.trim().split('\n')[0].trim()),
    );
  }
  const annotatedDescriptionMatch = reactApi.description.match(new RegExp(annotationBoundary));
  if (annotatedDescriptionMatch !== null) {
    reactApi.description = reactApi.description.slice(0, annotatedDescriptionMatch.index).trim();
  }

  reactApi.filename = filename;
  reactApi.name = componentInfo.name;
  reactApi.imports = getComponentImports(componentInfo.name, filename);
  reactApi.muiName = componentInfo.muiName;
  reactApi.apiPathname = componentInfo.apiPathname;
  reactApi.EOL = EOL;
  reactApi.slots = [];
  reactApi.classes = [];
  reactApi.demos = componentInfo.getDemos();
  reactApi.customAnnotation = componentInfo.customAnnotation;
  reactApi.inheritance = null;
  if (reactApi.demos.length === 0) {
    throw new Error(
      'Unable to find demos. \n' +
        `Be sure to include \`components: ${reactApi.name}\` in the markdown pages where the \`${reactApi.name}\` component is relevant. ` +
        'Every public component should have a demo.\nFor internal component, add the name of the component to the `skipComponent` method of the product.',
    );
  }

  try {
    const testInfo = await parseTest(reactApi.filename);
    // no Object.assign to visually check for collisions
    reactApi.forwardsRefTo = testInfo.forwardsRefTo;
    reactApi.spread = testInfo.spread ?? spread;
    reactApi.themeDefaultProps = testInfo.themeDefaultProps;
    reactApi.inheritance = componentInfo.getInheritance(testInfo.inheritComponent);
  } catch (error: any) {
    console.error(error.message);
    if (project.name.includes('grid')) {
      // TODO: Use `describeConformance` for the DataGrid components
      reactApi.forwardsRefTo = 'GridRoot';
    }
  }

  if (!projectSettings.skipSlotsAndClasses) {
    const { slots, classes } = parseSlotsAndClasses({
      typescriptProject: project,
      projectSettings,
      componentName: reactApi.name,
      muiName: reactApi.muiName,
      slotInterfaceName: componentInfo.slotInterfaceName,
    });

    reactApi.slots = slots;
    reactApi.classes = classes;
  }

  const deprecation = componentJsdoc.tags.find((tag) => tag.title === 'deprecated');
  const deprecationInfo = deprecation?.description || undefined;

  reactApi.deprecated = !!deprecation || undefined;

  const cssVars = await extractInfoFromEnum(
    `${componentInfo.name}CssVars`,
    new RegExp(`${componentInfo.name}(CssVars|Classes)?.tsx?$`, 'i'),
    project,
  );

  const dataAttributes = await extractInfoFromEnum(
    `${componentInfo.name}DataAttributes`,
    new RegExp(`${componentInfo.name}(DataAttributes)?.tsx?$`, 'i'),
    project,
  );

  attachPropsTable(reactApi, projectSettings.propsSettings);
  attachTable(reactApi, cssVars, 'cssVariables', 'string');
  attachTable(reactApi, dataAttributes, 'dataAttributes');
  attachTranslations(reactApi, deprecationInfo, projectSettings.propsSettings);

  // eslint-disable-next-line no-console
  console.log('Built API docs for', reactApi.apiPathname);

  if (!componentInfo.skipApiGeneration) {
    const {
      skipAnnotatingComponentDefinition,
      translationPagesDirectory,
      importTranslationPagesDirectory,
      generateJsonFileOnly,
    } = projectSettings;

    await generateApiTranslations(
      path.join(process.cwd(), translationPagesDirectory),
      reactApi,
      projectSettings.translationLanguages,
    );

    // Once we have the tabs API in all projects, we can make this default
    await generateApiPage(
      componentInfo.apiPagesDirectory,
      importTranslationPagesDirectory ?? translationPagesDirectory,
      reactApi,
      projectSettings.sortingStrategies,
      generateJsonFileOnly,
      componentInfo.layoutConfigPath,
    );

    if (
      typeof skipAnnotatingComponentDefinition === 'function'
        ? !skipAnnotatingComponentDefinition(reactApi.filename)
        : !skipAnnotatingComponentDefinition
    ) {
      // Add comment about demo & api links (including inherited component) to the component file
      await annotateComponentDefinition(reactApi, componentJsdoc, projectSettings);
    }
  }

  return reactApi;
}
