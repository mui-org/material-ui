import fs from 'fs';
import os from 'os';
import path from 'path';
import * as ts from '@typescript/typescript6';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { TypeScriptProject } from './createTypeScriptProject';
import { createTypeScriptProject } from './createTypeScriptProject';
import { getPropsFromComponentNode } from './getPropsFromComponentNode';
import { resolveExportSpecifier } from './resolveExportSpecifier';

describe('createTypeScriptProject', () => {
  let directory: string;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-typescript-project-'));
    fs.writeFileSync(
      path.join(directory, 'tsconfig.build.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          jsx: 'react',
          module: 'esnext',
          moduleResolution: 'bundler',
          skipLibCheck: true,
          types: [],
          paths: {
            react: [
              path.resolve(import.meta.dirname, '../../../../node_modules/@types/react/index.d.ts'),
            ],
            '@mui/types': [
              path.resolve(import.meta.dirname, '../../../../packages/mui-types/src/index.ts'),
            ],
          },
        },
      }),
    );
  });

  afterEach(() => {
    fs.rmSync(directory, { recursive: true });
  });

  function getComponentProps(project: TypeScriptProject, name: string) {
    const symbol = resolveExportSpecifier(project.exports[name], project);
    expect(ts.isVariableDeclaration(symbol.valueDeclaration!)).to.equal(true);
    return getPropsFromComponentNode({
      node: symbol.valueDeclaration!,
      project,
      checkDeclarations: true,
    })!.props;
  }

  [false, true].forEach((overridable) => {
    it(`extracts props from a direct ${overridable ? 'OverridableComponent' : 'forwardRef'} entrypoint`, () => {
      fs.writeFileSync(
        path.join(directory, 'Menu2.tsx'),
        `import * as React from 'react';
        import { OverridableComponent } from '@mui/types';
        export interface Menu2Slots { root?: React.ElementType; }
        export interface Menu2Props {
          slots?: Menu2Slots;
          classes?: { root?: string };
        }
        const Menu2 = React.forwardRef<HTMLDivElement, Menu2Props>(function Menu2(props, ref) {
          return null;
        })${overridable ? " as OverridableComponent<{ props: Menu2Props; defaultComponent: 'div' }>" : ''};
        export default Menu2;`,
      );

      const project = createTypeScriptProject({
        name: 'fixture',
        rootPath: directory,
        entryPointPath: 'Menu2.tsx',
      });

      expect(ts.getPreEmitDiagnostics(project.program)).to.deep.equal([]);
      expect(project.exports).to.have.property('Menu2Slots');
      expect(getComponentProps(project, 'Menu2')).to.include.all.keys('slots', 'classes');
    });
  });

  it('preserves named-only entrypoints and barrel exports', () => {
    fs.writeFileSync(
      path.join(directory, 'Named.tsx'),
      `import * as React from 'react';
      export interface NamedProps { slots?: { root?: React.ElementType }; }
      export const Named = React.forwardRef<HTMLDivElement, NamedProps>(function Named(props, ref) {
        return null;
      });`,
    );
    fs.writeFileSync(
      path.join(directory, 'index.ts'),
      "export { Named as PublicName } from './Named';",
    );

    const project = createTypeScriptProject({
      name: 'fixture',
      rootPath: directory,
      entryPointPath: ['index.ts', 'Named.tsx'],
    });

    expect(project.exports).to.include.all.keys('Named', 'NamedProps', 'PublicName');
    expect(project.exports).not.to.have.property('index');
    expect(project.exports).not.to.have.property('default');
    expect(getComponentProps(project, 'Named')).to.have.property('slots');
    expect(getComponentProps(project, 'PublicName')).to.have.property('slots');
  });

  it('resolves a re-exported default from a direct entrypoint', () => {
    fs.writeFileSync(
      path.join(directory, 'Implementation.tsx'),
      `import * as React from 'react';
      const Implementation = React.forwardRef<HTMLDivElement, { slots?: { root?: React.ElementType } }>(
        function Implementation(props, ref) { return null; },
      );
      export default Implementation;`,
    );
    fs.writeFileSync(
      path.join(directory, 'PublicMenu.ts'),
      "export { default } from './Implementation';",
    );

    const project = createTypeScriptProject({
      name: 'fixture',
      rootPath: directory,
      entryPointPath: 'PublicMenu.ts',
    });

    expect(getComponentProps(project, 'PublicMenu')).to.have.property('slots');
  });
});
