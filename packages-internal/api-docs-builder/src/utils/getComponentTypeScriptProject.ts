import type { TypeScriptProject } from './createTypeScriptProject';

/**
 * Resolve a subpath-only component without adding its exports to the shared project.
 */
export default function getComponentTypeScriptProject(
  project: TypeScriptProject,
  filename: string,
  componentName: string,
): TypeScriptProject {
  const unstableName = `Unstable_${componentName}`;
  if (project.exports[componentName] || project.exports[unstableName]) {
    return project;
  }

  const sourceFile =
    project.program.getSourceFile(filename.replace(/\.jsx?$/, '.d.ts')) ??
    project.program.getSourceFile(filename);
  const moduleSymbol = sourceFile && project.checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    return project;
  }

  const exports = Object.fromEntries(
    project.checker.getExportsOfModule(moduleSymbol).map((symbol) => [symbol.name, symbol]),
  );
  const componentSymbol = exports[componentName] ?? exports[unstableName] ?? exports.default;
  if (!componentSymbol) {
    return project;
  }

  return {
    ...project,
    exports: { ...project.exports, ...exports, [componentName]: componentSymbol },
  };
}
