import path from 'path';
import * as ts from '@typescript/typescript6';
import { describe, expect, it } from 'vitest';
import type { TypeScriptProject } from './createTypeScriptProject';
import getComponentImports from './getComponentImports';

function createProject({
  rootExports = ['Button'],
  additionalExports = [],
  rootIndexPath = 'src/index.d.ts',
  packageName = 'material',
}: {
  rootExports?: string[];
  additionalExports?: string[];
  rootIndexPath?: string | null;
  packageName?: string;
} = {}): TypeScriptProject {
  const rootPath = path.join(process.cwd(), `packages/mui-${packageName}`);
  const sources = new Map<string, string>();
  if (rootIndexPath) {
    sources.set(
      path.join(rootPath, rootIndexPath),
      rootExports.length === 0
        ? 'export {};'
        : rootExports
            .map((name) =>
              rootIndexPath.endsWith('.js')
                ? `export const ${name} = null;`
                : `export declare const ${name}: unknown;`,
            )
            .join('\n'),
    );
  }
  sources.set(
    path.join(rootPath, 'src/Additional.ts'),
    additionalExports.map((name) => `export declare const ${name}: unknown;`).join('\n'),
  );
  const options = { noLib: true, allowJs: true };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = (filename, languageVersion) => {
    const source = sources.get(filename);
    return source === undefined
      ? undefined
      : ts.createSourceFile(filename, source, languageVersion);
  };
  const program = ts.createProgram({ rootNames: [...sources.keys()], options, host });
  const checker = program.getTypeChecker();
  const exports = Object.fromEntries(
    program.getSourceFiles().flatMap((source) => {
      const symbol = checker.getSymbolAtLocation(source);
      return symbol ? checker.getExportsOfModule(symbol).map((item) => [item.name, item]) : [];
    }),
  );

  return { name: packageName, rootPath, program, checker, exports };
}

function getFilename(project: TypeScriptProject, componentPath: string) {
  return path.join(project.rootPath, 'src', componentPath);
}

describe('getComponentImports', () => {
  it.each(['src/index.d.ts', 'src/index.ts', 'src/index.js', 'index.ts'])(
    'preserves subpath and barrel imports exported from %s',
    (rootIndexPath) => {
      const project = createProject({ rootIndexPath });

      expect(
        getComponentImports('Button', getFilename(project, 'Button/Button.js'), project),
      ).to.deep.equal([
        "import Button from '@mui/material/Button';",
        "import { Button } from '@mui/material';",
      ]);
    },
  );

  it('preserves aliases for unstable barrel exports', () => {
    const project = createProject({ rootExports: ['Unstable_Preview'] });

    expect(
      getComponentImports('Preview', getFilename(project, 'Unstable_Preview/Preview.tsx'), project),
    ).to.deep.equal([
      "import Preview from '@mui/material/Unstable_Preview';",
      "import { Unstable_Preview as Preview } from '@mui/material';",
    ]);
  });

  it('only includes the subpath for a component not exported from the package root', () => {
    const project = createProject({ rootExports: [] });

    expect(
      getComponentImports('Preview', getFilename(project, 'Unstable_Preview/Preview.tsx'), project),
    ).to.deep.equal(["import Preview from '@mui/material/Unstable_Preview';"]);
  });

  it('does not treat additional Pigment entrypoints as package-root exports', () => {
    const project = createProject({ additionalExports: ['PigmentStack'] });

    expect(project.exports).to.have.property('PigmentStack');
    expect(
      getComponentImports(
        'PigmentStack',
        getFilename(project, 'PigmentStack/PigmentStack.tsx'),
        project,
      ),
    ).to.deep.equal(["import PigmentStack from '@mui/material/PigmentStack';"]);
  });

  it('keeps the local import name independent of export and subpath names', () => {
    const project = createProject({ rootExports: ['Unstable_Preview'] });

    expect(
      getComponentImports(
        'Preview',
        getFilename(project, 'Unstable_Preview/Preview.tsx'),
        project,
        'Example',
      ),
    ).to.deep.equal([
      "import Example from '@mui/material/Unstable_Preview';",
      "import { Unstable_Preview as Example } from '@mui/material';",
    ]);
  });

  it('preserves named subpath imports for Base UI', () => {
    const project = createProject({ packageName: 'base' });

    expect(
      getComponentImports('Button', getFilename(project, 'Button/Button.tsx'), project),
    ).to.deep.equal([
      "import { Button } from '@mui/base/Button';",
      "import { Button } from '@mui/base';",
    ]);
  });

  it('preserves default examples when the package-root source is not in the project', () => {
    const project = createProject({ rootIndexPath: null });

    expect(
      getComponentImports('Button', getFilename(project, 'Button/Button.js'), project),
    ).to.deep.equal([
      "import Button from '@mui/material/Button';",
      "import { Button } from '@mui/material';",
    ]);
  });
});
