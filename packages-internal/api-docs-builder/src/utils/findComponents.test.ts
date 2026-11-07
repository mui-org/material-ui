import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import findComponents from './findComponents';

describe('findComponents', () => {
  let directory: string;

  beforeEach(() => {
    directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mui-find-components-'));
  });

  afterEach(() => {
    fs.rmSync(directory, { recursive: true });
  });

  it('finds component names with digits, including unstable components', () => {
    const filenames = [
      'Button.js',
      'Grid2.tsx',
      'Menu2.tsx',
      'Menu2Item.tsx',
      'Menu2SubmenuTrigger.tsx',
      'Unstable_Menu2Item.tsx',
      'Version42Button.tsx',
    ];
    filenames.forEach((filename) => {
      fs.writeFileSync(path.join(directory, filename), '');
    });

    expect(findComponents(directory)).to.have.deep.members(
      filenames.map((filename) => ({
        filename: path.join(directory, filename),
        indexFilename: null,
      })),
    );
  });

  it('ignores non-component files', () => {
    [
      'index.ts',
      'menu2Classes.ts',
      'useMenu2.tsx',
      'Menu2.d.ts',
      'Menu2.test.tsx',
      'Menu2.spec.tsx',
      'Menu2.tsx.preview',
      '2Menu.tsx',
    ].forEach((filename) => {
      fs.writeFileSync(path.join(directory, filename), '');
    });

    expect(findComponents(directory)).to.deep.equal([]);
  });

  it('finds nested components with the index file from their directory', () => {
    const componentDirectory = path.join(directory, 'Unstable_Menu2Item');
    fs.mkdirSync(componentDirectory);
    const filename = path.join(componentDirectory, 'Menu2Item.tsx');
    const indexFilename = path.join(componentDirectory, 'index.ts');
    fs.writeFileSync(filename, '');
    fs.writeFileSync(indexFilename, '');

    expect(findComponents(directory)).to.deep.equal([{ filename, indexFilename }]);
  });
});
