import fs from 'fs';
import path from 'path';
import * as ts from '@typescript/typescript6';
import * as prettier from 'prettier';
import { kebabCase } from 'es-toolkit/string';
import { getLineFeed } from '@mui/internal-docs-utils';
import { replaceComponentLinks } from './utils/replaceUrl';
import type { TypeScriptProject } from './utils/createTypeScriptProject';

export type { ComponentInfo, HookInfo } from './types/utils.types';

/**
 * TODO: this should really be fixed in findPagesMarkdown().
 * Plus replaceComponentLinks() shouldn't exist in the first place,
 * the markdown folder location should match the URLs.
 */
export function fixPathname(pathname: string): string {
  let fixedPathname;

  if (pathname.startsWith('/material')) {
    fixedPathname = replaceComponentLinks(`${pathname.replace(/^\/material/, '')}/`);
  } else if (pathname.startsWith('/joy')) {
    fixedPathname = replaceComponentLinks(`${pathname.replace(/^\/joy/, '')}/`).replace(
      'material-ui',
      'joy-ui',
    );
  } else if (pathname.startsWith('/base')) {
    fixedPathname = `${pathname
      .replace('/base/', '/base-ui/')
      .replace('/components/', '/react-')}/`;
  } else {
    fixedPathname = `${pathname.replace('/components/', '/react-')}/`;
  }

  return fixedPathname;
}

const DEFAULT_PRETTIER_CONFIG_PATH = path.join(process.cwd(), 'prettier.config.mjs');

export async function writePrettifiedFile(
  filename: string,
  data: string,
  prettierConfigPath: string = DEFAULT_PRETTIER_CONFIG_PATH,
  options: object = {},
) {
  const prettierConfig = await prettier.resolveConfig(filename, {
    config: prettierConfigPath,
  });
  if (prettierConfig === null) {
    throw new Error(
      `Could not resolve config for '${filename}' using prettier config path '${prettierConfigPath}'.`,
    );
  }

  const formatted = await prettier.format(data, { ...prettierConfig, filepath: filename });
  fs.writeFileSync(filename, formatted, {
    encoding: 'utf8',
    ...options,
  });
}

let systemComponents: string[] | undefined;
// making the resolution lazy to avoid issues when importing something irrelevant from this file (i.e. `getSymbolDescription`)
// the eager resolution results in errors when consuming externally (i.e. `mui-x`)
export function getSystemComponents() {
  if (!systemComponents) {
    systemComponents = fs
      .readdirSync(path.resolve('packages', 'mui-system', 'src'))
      // Normalization, the Unstable_ prefix doesn't count.
      .map((pathname) => pathname.replace('Unstable_', ''))
      .filter((pathname) => pathname.match(/^[A-Z][a-zA-Z]+$/));
  }
  return systemComponents;
}

export function getMuiName(name: string) {
  return `Mui${name.replace('Styled', '')}`;
}

export function extractPackageFile(filePath: string) {
  filePath = filePath.replace(new RegExp(`\\${path.sep}`, 'g'), '/');
  const match = filePath.match(
    /.*\/packages.*\/(?<packagePath>[^/]+)\/src\/(.*\/)?(?<name>[^/]+)\.(js|tsx|ts|d\.ts)/,
  );
  const result = {
    packagePath: match ? match.groups?.packagePath : null,
    name: match ? match.groups?.name : null,
  };
  return {
    ...result,
    muiPackage: result.packagePath?.replace('x-', 'mui-'),
  };
}

export function parseFile(filename: string) {
  const src = fs.readFileSync(filename, 'utf8');
  return {
    src,
    shouldSkip:
      filename.includes('internal') ||
      !!src.match(/@ignore - internal component\./) ||
      !!src.match(/@ignore - internal hook\./) ||
      !!src.match(/@ignore - do not document\./),
    spread: !src.match(/ = exactProp\(/),
    EOL: getLineFeed(src),
    inheritedComponent: src.match(/\/\/ @inheritedComponent (.*)/)?.[1],
  };
}

export function getApiPath(
  demos: Array<{ demoPageTitle: string; demoPathname: string }>,
  name: string,
) {
  let apiPath = null;

  if (demos && demos.length > 0) {
    // remove the hash from the demoPathname, for e.g. "#hooks"
    const cleanedDemosPathname = demos[0].demoPathname.split('#')[0];
    apiPath = `${cleanedDemosPathname}${
      name.startsWith('use') ? 'hooks-api' : 'components-api'
    }/#${kebabCase(name)}`;
  }

  return apiPath;
}

export async function formatType(rawType: string) {
  if (!rawType) {
    return '';
  }

  const prefix = 'type FakeType = ';
  const signatureWithTypeName = `${prefix}${rawType}`;

  const prettifiedSignatureWithTypeName = await prettier.format(signatureWithTypeName, {
    printWidth: 999,
    singleQuote: true,
    semi: false,
    trailingComma: 'none',
    parser: 'typescript',
  });

  return prettifiedSignatureWithTypeName.slice(prefix.length).replace(/\n$/, '');
}

export function getSymbolDescription(symbol: ts.Symbol, project: TypeScriptProject) {
  return symbol
    .getDocumentationComment(project.checker)
    .flatMap((comment) => comment.text.split('\n'))
    .filter((line) => !line.startsWith('TODO'))
    .join('\n');
}

export function getSymbolJSDocTags(symbol: ts.Symbol) {
  return Object.fromEntries(symbol.getJsDocTags().map((tag) => [tag.name, tag]));
}

export async function stringifySymbol(symbol: ts.Symbol, project: TypeScriptProject) {
  let rawType: string;

  const declaration = symbol.declarations?.[0];
  if (declaration && ts.isPropertySignature(declaration)) {
    rawType = declaration.type?.getText() ?? '';
  } else {
    rawType = project.checker.typeToString(
      project.checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration!),
      symbol.valueDeclaration,
      ts.TypeFormatFlags.NoTruncation,
    );
  }

  return formatType(rawType);
}

/**
 * @param filepath - absolute path
 * @example toGitHubPath('/home/user/material-ui/packages/Accordion') === '/packages/Accordion'
 * @example toGitHubPath('C:\\Development\\material-ui\\packages\\Accordion') === '/packages/Accordion'
 */
export function toGitHubPath(filepath: string): string {
  return `/${path.relative(process.cwd(), filepath).replace(/\\/g, '/')}`;
}
