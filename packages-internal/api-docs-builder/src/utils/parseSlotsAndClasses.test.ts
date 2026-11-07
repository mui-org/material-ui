import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import type { ProjectSettings } from '../ProjectSettings';
import { createTypeScriptProject } from './createTypeScriptProject';
import parseSlotsAndClasses from './parseSlotsAndClasses';
import getComponentTypeScriptProject from './getComponentTypeScriptProject';

const projectSettings: ProjectSettings = {
  output: { apiManifestPath: '' },
  typeScriptProjects: [],
  getApiPages: () => [],
  getComponentInfo: () => {
    throw new Error('Component lookup is not used when parsing slots and classes.');
  },
  translationLanguages: [],
  skipComponent: () => false,
  translationPagesDirectory: '',
  generateClassName: (name, slot) => (slot === 'disabled' ? 'Mui-disabled' : `${name}-${slot}`),
  isGlobalClassName: (slot) => slot === 'disabled',
};

describe('parseSlotsAndClasses', () => {
  let directory: string;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-slots-and-classes-'));
    fs.writeFileSync(
      path.join(directory, 'tsconfig.build.json'),
      JSON.stringify({
        compilerOptions: {
          strict: true,
          jsx: 'react',
          module: 'esnext',
          moduleResolution: 'bundler',
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

  [
    { generic: true, overridable: false },
    { generic: true, overridable: true },
    { generic: false, overridable: false },
    { generic: true, overridable: false, subpathOnly: true },
  ].forEach(({ generic, overridable, subpathOnly = false }) => {
    it(`extracts ${generic ? 'inherited generic' : 'local'} classes from ${overridable ? 'OverridableComponent' : 'forwardRef'} props${subpathOnly ? ' without a root export' : ''}`, () => {
      fs.writeFileSync(
        path.join(directory, 'Menu2.tsx'),
        `import * as React from 'react';
        import { OverridableComponent } from '@mui/types';
        interface SharedClasses {
          /** Styles applied to the root. */
          root: string;
          /** State class applied when disabled. */
          disabled: string;
          /** @ignore */
          internal: string;
        }
        interface Menu2Classes extends SharedClasses {
          /** Styles applied when dense. */
          dense: string;
        }
        interface VisualProps<Classes> { classes?: Partial<Classes>; }
        export interface Menu2Slots {
          /**
           * The root component.
           * @default 'div'
           */
          root?: React.ElementType;
        }
        interface Menu2Props${generic ? ' extends VisualProps<Menu2Classes>' : ''} {
          ${generic ? '' : 'classes?: Partial<Menu2Classes>;'}
          slots?: Menu2Slots;
        }
        const Menu2 = React.forwardRef<HTMLDivElement, Menu2Props>(function Menu2(props, ref) {
          return null;
        })${overridable ? " as OverridableComponent<{ props: Menu2Props; defaultComponent: 'div' }>" : ''};
        export default Menu2;`,
      );

      fs.writeFileSync(path.join(directory, 'index.ts'), 'export {};');
      const typescriptProject = createTypeScriptProject({
        name: 'fixture',
        rootPath: directory,
        entryPointPath: subpathOnly ? 'index.ts' : 'Menu2.tsx',
      });
      const { slots, classes } = parseSlotsAndClasses({
        typescriptProject: getComponentTypeScriptProject(
          typescriptProject,
          path.join(directory, 'Menu2.tsx'),
          'Menu2',
        ),
        projectSettings,
        componentName: 'Menu2',
        muiName: 'MuiMenu2',
      });

      expect(slots).to.deep.equal([
        {
          name: 'root',
          description: 'The root component.',
          default: "'div'",
          class: 'MuiMenu2-root',
        },
      ]);
      expect(classes.map((definition) => definition.key)).to.have.members(['disabled', 'dense']);
      expect(classes.find((definition) => definition.key === 'disabled')).to.deep.include({
        className: 'Mui-disabled',
        description: 'State class applied when disabled.',
        isGlobal: true,
      });
      expect(classes.find((definition) => definition.key === 'dense')).to.deep.include({
        className: 'MuiMenu2-dense',
        description: 'Styles applied when dense.',
        isGlobal: false,
      });
    });
  });
});
