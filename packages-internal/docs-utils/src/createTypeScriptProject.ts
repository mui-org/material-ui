import path from 'path';
import fs from 'fs';
// TypeScript 7 ships no importable compiler API: its root export is just
// `version`, and the replacement is still behind `typescript/unstable/*`.
// `@typescript/typescript6` is Microsoft's republished 6.x API for exactly
// this case. Swap it for the stable API once TypeScript 7.1 ships it
// (https://github.com/microsoft/TypeScript/issues/63703).
import * as ts from '@typescript/typescript6';

export interface TypeScriptProject {
  name: string;
  rootPath: string;
  exports: Record<string, ts.Symbol>;
  program: ts.Program;
  checker: ts.TypeChecker;
}

export interface CreateTypeScriptProjectOptions {
  name: string;
  rootPath: string;
  /**
   * Config to use to build this package.
   * The path must be relative to the root path.
   * @default 'tsconfig.build.json`
   */
  tsConfigPath?: string;
  /**
   * File used as root of the package.
   * This property is used to gather the exports of the project.
   * The path must be relative to the root path.
   */
  entryPointPath?: string;
  /**
   * Files to include in the project.
   * By default, it will use the files defined in the tsconfig.
   */
  files?: string[];
}

export const createTypeScriptProject = (
  options: CreateTypeScriptProjectOptions,
): TypeScriptProject => {
  const {
    name,
    rootPath,
    tsConfigPath: inputTsConfigPath = 'tsconfig.build.json',
    entryPointPath: inputEntryPointPath,
    files,
  } = options;

  const tsConfigPath = path.join(rootPath, inputTsConfigPath);

  const tsConfigFile = ts.readConfigFile(tsConfigPath, (filePath) =>
    fs.readFileSync(filePath).toString(),
  );

  if (tsConfigFile.error) {
    throw tsConfigFile.error;
  }

  // The build config does not parse the `.d.ts` files, but we sometimes need them to get the exports.
  if (tsConfigFile.config.exclude) {
    tsConfigFile.config.exclude = tsConfigFile.config.exclude.filter(
      (pattern: string) => pattern !== 'src/**/*.d.ts',
    );
  }

  const tsConfigFileContent = ts.parseJsonConfigFileContent(
    tsConfigFile.config,
    ts.sys,
    path.dirname(tsConfigPath),
  );

  if (tsConfigFileContent.errors.length > 0) {
    throw tsConfigFileContent.errors[0];
  }

  const program = ts.createProgram({
    rootNames: files ?? tsConfigFileContent.fileNames,
    options: tsConfigFileContent.options,
  });

  const checker = program.getTypeChecker();

  let exports: TypeScriptProject['exports'];
  if (inputEntryPointPath) {
    const entryPointPath = path.join(rootPath, inputEntryPointPath);
    const sourceFile = program.getSourceFile(entryPointPath);

    exports = Object.fromEntries(
      checker.getExportsOfModule(checker.getSymbolAtLocation(sourceFile!)!).map((symbol) => {
        return [symbol.name, symbol];
      }),
    );
  } else {
    exports = {};
  }

  return {
    name,
    rootPath,
    exports,
    program,
    checker,
  };
};

export type TypeScriptProjectBuilder = (
  projectName: string,
  options?: { files?: string[] },
) => TypeScriptProject;

export const createTypeScriptProjectBuilder = (
  projectsConfig: Record<string, Omit<CreateTypeScriptProjectOptions, 'name'>>,
): TypeScriptProjectBuilder => {
  const projects = new Map<string, TypeScriptProject>();

  return (projectName: string, options: { files?: string[] } = {}) => {
    const cachedProject = projects.get(projectName);
    if (cachedProject != null) {
      return cachedProject;
    }

    // eslint-disable-next-line no-console
    console.log(`Building new TS project: ${projectName}`);

    const project = createTypeScriptProject({
      name: projectName,
      ...projectsConfig[projectName],
      ...options,
    });

    projects.set(projectName, project);
    return project;
  };
};
