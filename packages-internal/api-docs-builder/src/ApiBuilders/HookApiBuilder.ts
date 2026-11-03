import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import * as babel from '@babel/core';
import traverse from '@babel/traverse';
import { defaultHandlers, parse as docgenParse } from 'react-docgen';
import { kebabCase, upperFirst, escapeRegExp } from 'es-toolkit/string';
import type { Annotation } from 'doctrine';
import { parse as parseDoctrine } from 'doctrine';
import { escapeEntities, renderMarkdown } from '../buildApi';
import type { ProjectSettings } from '../ProjectSettings';
import { computeApiDescription } from './ComponentApiBuilder';
import { toGitHubPath, writePrettifiedFile } from '../buildApiUtils';
import type { TypeScriptProject } from '../utils/createTypeScriptProject';
import generateApiTranslations from '../utils/generateApiTranslation';
import type { HookApiContent, HookReactApi, ParsedProperty } from '../types/ApiBuilder.types';
import type { HookInfo } from '../types/utils.types';
import extractInfoFromType from '../utils/extractInfoFromType';

/**
 * Add demos & API comment block to type definitions, e.g.:
 * /**
 * * Demos:
 * *
 * * - [Button](https://mui.com/base-ui/react-button/)
 * *
 * * API:
 * *
 * * - [useButton API](https://mui.com/base-ui/api/use-button/)
 */
async function annotateHookDefinition(
  api: HookReactApi,
  hookJsdoc: Annotation,
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

      if (babel.types.isTSDeclareFunction(node.declaration)) {
        // export function useHook() in .d.ts
        if (node.declaration.id?.name !== fileName) {
          return;
        }
      } else if (node.declaration == null) {
        // export { useHook };

        node.specifiers.forEach((specifier) => {
          if (specifier.type === 'ExportSpecifier' && specifier.local.name === fileName) {
            const binding = babelPath.scope.bindings[specifier.local.name];

            if (babel.types.isFunctionDeclaration(binding.path.node)) {
              // For function declarations the binding is equal to the declaration
              // /**
              //  */
              // function useHook() {}
              node = binding.path.node;
            } else {
              // For variable declarations the binding points to the declarator.
              // /**
              //  */
              // const useHook = () => {}
              node = binding.path.parentPath!.node;
            }
          }
        });
      } else if (babel.types.isFunctionDeclaration(node.declaration)) {
        // export function useHook() in .ts
        if (node.declaration.id?.name !== fileName) {
          return;
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
      `${api.filename}: Don't know where to insert the jsdoc block. Probably no default export found`,
    );
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
    if (api.demos && api.demos.length > 0) {
      markdownLines.push(
        'Demos:',
        '',
        ...api.demos.map((item) => {
          return `- [${item.demoPageTitle}](${
            item.demoPathname.startsWith('http') ? item.demoPathname : `${HOST}${item.demoPathname}`
          })`;
        }),
        '',
      );
    }

    markdownLines.push(
      'API:',
      '',
      `- [${api.name} API](${
        api.apiPathname.startsWith('http') ? api.apiPathname : `${HOST}${api.apiPathname}`
      })`,
    );
  }

  if (hookJsdoc.tags.length > 0) {
    markdownLines.push('');
  }

  hookJsdoc.tags.forEach((tag) => {
    markdownLines.push(`@${tag.title}${tag.name ? ` ${tag.name} -` : ''} ${tag.description}`);
  });

  const jsdoc = `/**\n${markdownLines
    .map((line) => (line.length > 0 ? ` * ${line}` : ` *`))
    .join('\n')}\n */`;
  const typesSourceNew = typesSource.slice(0, start) + jsdoc + typesSource.slice(end);
  writeFileSync(typesFilename, typesSourceNew, { encoding: 'utf8' });
}

const attachTable = (
  reactApi: HookReactApi,
  params: ParsedProperty[],
  tableName: 'parametersTable' | 'returnValueTable',
) => {
  const propErrors: Array<[propName: string, error: Error]> = [];
  const parameters: HookReactApi[typeof tableName] = params
    .flatMap((p) => {
      const { name: propName, ...propDescriptor } = p;
      let prop: Omit<ParsedProperty, 'name'> | null;
      try {
        prop = propDescriptor;
      } catch (error) {
        propErrors.push([propName, error as Error]);
        prop = null;
      }
      if (prop === null) {
        // have to delete `componentProps.undefined` later
        return [];
      }

      const defaultTag = propDescriptor.tags?.default;
      const defaultValue: string | undefined = defaultTag?.text?.[0]?.text;
      const requiredProp = prop.required;

      const deprecation = (propDescriptor.description || '').match(/@deprecated(\s+(?<info>.*))?/);
      const typeDescription = escapeEntities(propDescriptor.typeStr ?? '');
      return [
        {
          [propName]: {
            type: {
              // The docgen generates this structure for the components. For consistency in the structure
              // we are adding the same value in both the name and the description
              name: typeDescription,
              description: typeDescription,
            },
            default: defaultValue,
            // undefined values are not serialized => saving some bytes
            required: requiredProp || undefined,
            deprecated: !!deprecation || undefined,
            deprecationInfo: renderMarkdown(deprecation?.groups?.info || '').trim() || undefined,
          },
        },
      ];
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  if (propErrors.length > 0) {
    throw new Error(
      `There were errors creating prop descriptions:\n${propErrors
        .map(([propName, error]) => {
          return `  - ${propName}: ${error}`;
        })
        .join('\n')}`,
    );
  }

  reactApi[tableName] = parameters;
};

const generateTranslationDescription = (description: string) => {
  return renderMarkdown(description.replace(/\n@default.*$/, ''));
};

const attachTranslations = (reactApi: HookReactApi, deprecationInfo: string | undefined) => {
  const translations: HookReactApi['translations'] = {
    hookDescription: reactApi.description,
    deprecationInfo: deprecationInfo ? renderMarkdown(deprecationInfo).trim() : undefined,
    parametersDescriptions: {},
    returnValueDescriptions: {},
  };

  (reactApi.parameters ?? []).forEach(({ name: propName, description }) => {
    if (description) {
      translations.parametersDescriptions[propName] = {
        description: generateTranslationDescription(description),
      };
      const deprecation = (description || '').match(/@deprecated(\s+(?<info>.*))?/);
      if (deprecation !== null) {
        translations.parametersDescriptions[propName].deprecated =
          renderMarkdown(deprecation?.groups?.info || '').trim() || undefined;
      }
    }
  });

  (reactApi.returnValue ?? []).forEach(({ name: propName, description }) => {
    if (description) {
      translations.returnValueDescriptions[propName] = {
        description: generateTranslationDescription(description),
      };
      const deprecation = (description || '').match(/@deprecated(\s+(?<info>.*))?/);
      if (deprecation !== null) {
        translations.parametersDescriptions[propName].deprecated =
          renderMarkdown(deprecation?.groups?.info || '').trim() || undefined;
      }
    }
  });

  reactApi.translations = translations;
};

const generateApiJson = async (outputDirectory: string, reactApi: HookReactApi) => {
  /**
   * Gather the metadata needed for the component's API page.
   */
  const pageContent: HookApiContent = {
    // Sorted by required DESC, name ASC
    parameters: Object.fromEntries(
      Object.entries(reactApi.parametersTable).sort(([aName, aData], [bName, bData]) => {
        if ((aData.required && bData.required) || (!aData.required && !bData.required)) {
          return aName.localeCompare(bName);
        }
        if (aData.required) {
          return -1;
        }
        return 1;
      }),
    ),
    returnValue: Object.fromEntries(
      Object.entries(reactApi.returnValueTable).sort(([aName, aData], [bName, bData]) => {
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
    filename: toGitHubPath(reactApi.filename),
    imports: reactApi.imports,
    demos: `<ul>${reactApi.demos
      .map((item) => `<li><a href="${item.demoPathname}">${item.demoPageTitle}</a></li>`)
      .join('\n')}</ul>`,
    deprecated: reactApi.deprecated,
  };

  await writePrettifiedFile(
    path.resolve(outputDirectory, `${kebabCase(reactApi.name)}.json`),
    JSON.stringify(pageContent),
  );
};

/**
 * Helper to get the import options
 * @param name The name of the hook
 * @param filename The filename where its defined (to infer the package)
 * @returns an array of import command
 */
const defaultGetHookImports = (name: string, filename: string) => {
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

  if (/unstable_/.test(githubPath)) {
    namedImportName = `unstable_${name} as ${name}`;
  }

  const useNamedImports = rootImportPath === '@mui/base';

  const subpathImport = useNamedImports
    ? `import { ${namedImportName} } from '${subdirectoryImportPath}';`
    : `import ${defaultImportName} from '${subdirectoryImportPath}';`;

  const rootImport = `import { ${namedImportName} } from '${rootImportPath}';`;

  return [subpathImport, rootImport];
};

export async function generateHookApi(
  hooksInfo: HookInfo,
  project: TypeScriptProject,
  projectSettings: ProjectSettings,
) {
  const {
    filename,
    name,
    apiPathname,
    apiPagesDirectory,
    getDemos,
    readFile,
    skipApiGeneration,
    customAnnotation,
  } = hooksInfo;

  const { shouldSkip, EOL, src } = readFile();

  if (shouldSkip) {
    return null;
  }

  const results = docgenParse(src, {
    resolver: {
      resolve(file) {
        const foundPaths: any[] = [];
        file.traverse({
          FunctionDeclaration(funcPath) {
            if (funcPath.node.id?.name === name) {
              foundPaths.push(funcPath);
            }
          },
        });
        return foundPaths;
      },
    },
    handlers: defaultHandlers,
    filename,
  });
  const reactApi: HookReactApi = results[0] as HookReactApi;

  const parameters = await extractInfoFromType(`${upperFirst(name)}Parameters`, project);
  const returnValue = await extractInfoFromType(`${upperFirst(name)}ReturnValue`, project);
  const hookJsdoc = parseDoctrine(reactApi.description);

  // We override `reactApi.description` with `hookJsdoc.description` because
  // the former can include JSDoc tags that we don't want to render in the docs.
  reactApi.description = hookJsdoc.description;

  // Ignore what we might have generated in `annotateComponentDefinition`
  let annotationBoundary: RegExp = /(Demos|API):\r?\n\r?\n/;
  if (customAnnotation) {
    annotationBoundary = new RegExp(escapeRegExp(customAnnotation.trim().split('\n')[0].trim()));
  }
  const annotatedDescriptionMatch = reactApi.description.match(new RegExp(annotationBoundary));
  if (annotatedDescriptionMatch !== null) {
    reactApi.description = reactApi.description.slice(0, annotatedDescriptionMatch.index).trim();
  }

  const { getHookImports = defaultGetHookImports, translationPagesDirectory } = projectSettings;
  reactApi.filename = filename;
  reactApi.name = name;
  reactApi.imports = getHookImports(name, filename);
  reactApi.apiPathname = apiPathname;
  reactApi.EOL = EOL;
  reactApi.demos = getDemos();
  reactApi.customAnnotation = customAnnotation;
  if (reactApi.demos.length === 0) {
    // TODO: Enable this error once all public hooks are documented
    // throw new Error(
    //   'Unable to find demos. \n' +
    //     `Be sure to include \`hooks: ${reactApi.name}\` in the markdown pages where the \`${reactApi.name}\` hook is relevant. ` +
    //     'Every public hook should have a demo. ',
    // );
  }

  attachTable(reactApi, parameters, 'parametersTable');
  reactApi.parameters = parameters;

  attachTable(reactApi, returnValue, 'returnValueTable');
  reactApi.returnValue = returnValue;

  const deprecation = hookJsdoc.tags.find((tag) => tag.title === 'deprecated');
  const deprecationInfo = deprecation?.description || undefined;

  reactApi.deprecated = !!deprecation || undefined;

  attachTranslations(reactApi, deprecationInfo);

  // eslint-disable-next-line no-console
  console.log('Built API docs for', reactApi.name);

  if (!skipApiGeneration) {
    // Generate pages, json and translations
    await generateApiTranslations(
      path.join(process.cwd(), translationPagesDirectory),
      reactApi,
      projectSettings.translationLanguages,
    );
    await generateApiJson(apiPagesDirectory, reactApi);

    // Add comment about demo & api links to the component hook file
    await annotateHookDefinition(reactApi, hookJsdoc, projectSettings);
  }

  return reactApi;
}
