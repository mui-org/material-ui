import path from 'path';
import { toGitHubPath } from '../buildApiUtils';
import type { TypeScriptProject } from './createTypeScriptProject';

/**
 * Gets the subpath import and, when exported by the package root, the barrel import.
 * The local import name is independent of the component's public export name.
 */
export default function getComponentImports(
  name: string,
  filename: string,
  project: TypeScriptProject,
  localImportName = name,
) {
  const githubPath = toGitHubPath(filename);
  const rootImportPath = githubPath.replace(
    /\/packages\/mui(?:-(.+?))?\/src\/.*/,
    (match, pkg) => `@mui/${pkg}`,
  );
  const subdirectoryImportPath = githubPath.replace(
    /\/packages\/mui(?:-(.+?))?\/src\/([^\\/]+)\/.*/,
    (match, pkg, directory) => `@mui/${pkg}/${directory}`,
  );

  const exportName = githubPath.includes('Unstable_') ? `Unstable_${name}` : name;
  const namedImportName =
    exportName === localImportName ? exportName : `${exportName} as ${localImportName}`;
  const subpathImport =
    rootImportPath === '@mui/base'
      ? `import { ${namedImportName} } from '${subdirectoryImportPath}';`
      : `import ${localImportName} from '${subdirectoryImportPath}';`;

  const rootSource = [
    'src/index.d.ts',
    'src/index.ts',
    'src/index.js',
    'index.d.ts',
    'index.ts',
    'index.js',
  ]
    .map((indexPath) => project.program.getSourceFile(path.join(project.rootPath, indexPath)))
    .find((source) => source !== undefined);
  const rootSymbol = rootSource && project.checker.getSymbolAtLocation(rootSource);

  // `project.exports` also contains explicitly registered and component-local entrypoints,
  // which do not necessarily have a corresponding export from the package root.
  if (
    rootSymbol &&
    !project.checker.getExportsOfModule(rootSymbol).some((symbol) => symbol.name === exportName)
  ) {
    return [subpathImport];
  }

  // Preserve the default examples if the project does not expose its package root.
  return [subpathImport, `import { ${namedImportName} } from '${rootImportPath}';`];
}
