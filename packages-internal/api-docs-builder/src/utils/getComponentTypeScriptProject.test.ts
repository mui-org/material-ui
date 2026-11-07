import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createTypeScriptProject } from './createTypeScriptProject';
import getComponentTypeScriptProject from './getComponentTypeScriptProject';
import { resolveExportSpecifier } from './resolveExportSpecifier';

describe('getComponentTypeScriptProject', () => {
  let directory: string;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-component-project-'));
    fs.writeFileSync(
      path.join(directory, 'tsconfig.build.json'),
      JSON.stringify({ compilerOptions: { strict: true, types: [], noLib: true, allowJs: true } }),
    );
    fs.writeFileSync(path.join(directory, 'index.ts'), 'export const Existing = {};');
  });

  afterEach(() => {
    fs.rmSync(directory, { recursive: true });
  });

  function createProject() {
    return createTypeScriptProject({
      name: 'fixture',
      rootPath: directory,
      entryPointPath: 'index.ts',
    });
  }

  it.each(['Existing', 'Unstable_Existing'])(
    'preserves the project for the %s entrypoint export',
    (exportName) => {
      fs.writeFileSync(path.join(directory, 'index.ts'), `export const ${exportName} = {};`);
      const project = createProject();

      expect(
        getComponentTypeScriptProject(project, path.join(directory, 'Existing.js'), 'Existing'),
      ).to.equal(project);
    },
  );

  it('resolves a default component and its slot types without changing the shared exports', () => {
    const filename = path.join(directory, 'Menu2.tsx');
    fs.writeFileSync(
      filename,
      `export interface Menu2Slots { root?: string; }
       export interface Menu2Props { slots?: Menu2Slots; }
       export default function Menu2(props: Menu2Props) { return null; }`,
    );
    const project = createProject();
    const componentProject = getComponentTypeScriptProject(project, filename, 'Menu2');

    expect(componentProject.program).to.equal(project.program);
    expect(componentProject.checker).to.equal(project.checker);
    expect(componentProject.exports).to.include.all.keys('Existing', 'Menu2', 'Menu2Slots');
    expect(
      resolveExportSpecifier(
        componentProject.exports.Menu2,
        componentProject,
      ).valueDeclaration!.getSourceFile().fileName,
    ).to.equal(filename);
    expect(project.exports).to.have.all.keys('Existing');
  });

  it('prefers a matching named component over an unrelated default export', () => {
    const filename = path.join(directory, 'Menu2.tsx');
    fs.writeFileSync(filename, 'export function Menu2() {} export default function Other() {}');
    const project = getComponentTypeScriptProject(createProject(), filename, 'Menu2');

    expect(project.exports.Menu2.valueDeclaration!.getText()).to.equal(
      'export function Menu2() {}',
    );
  });

  it('resolves a JavaScript component from its companion declaration file', () => {
    const declarationFilename = path.join(directory, 'Menu2.d.ts');
    fs.writeFileSync(declarationFilename, 'export default function Menu2(): void;');
    const project = getComponentTypeScriptProject(
      createProject(),
      path.join(directory, 'Menu2.js'),
      'Menu2',
    );

    expect(project.exports.Menu2.valueDeclaration!.getSourceFile().fileName).to.equal(
      declarationFilename,
    );
  });

  it('prefers the companion declaration when both files are in the program', () => {
    const filename = path.join(directory, 'Menu2.js');
    const declarationFilename = path.join(directory, 'Menu2.d.ts');
    fs.writeFileSync(filename, 'export default function Menu2() {}');
    fs.writeFileSync(declarationFilename, 'export default function Menu2(): void;');
    const project = createTypeScriptProject({
      name: 'fixture',
      rootPath: directory,
      entryPointPath: 'index.ts',
      files: [path.join(directory, 'index.ts'), filename, declarationFilename],
    });
    expect(project.program.getSourceFile(filename)).not.to.equal(undefined);

    const componentProject = getComponentTypeScriptProject(project, filename, 'Menu2');
    expect(componentProject.exports.Menu2.valueDeclaration!.getSourceFile().fileName).to.equal(
      declarationFilename,
    );
  });

  it('keeps the existing failure path for files without a component export', () => {
    const filename = path.join(directory, 'Menu2.tsx');
    fs.writeFileSync(filename, 'export interface Menu2Slots { root?: string; }');
    const project = createProject();

    expect(getComponentTypeScriptProject(project, filename, 'Menu2')).to.equal(project);
    expect(
      getComponentTypeScriptProject(project, path.join(directory, 'Missing.tsx'), 'Missing'),
    ).to.equal(project);
  });
});
