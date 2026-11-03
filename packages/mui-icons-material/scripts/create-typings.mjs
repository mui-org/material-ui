/* eslint-disable no-console */
import path from 'path';
import chalk from 'chalk';
import * as fs from 'fs/promises';
import glob from 'fast-glob';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));

const SRC_DIR = path.resolve(currentDirectory, '../lib/');
const TARGET_DIR = path.resolve(currentDirectory, '../build');

function normalizeFileName(file) {
  return path.parse(file).name;
}

async function createIconTypings(targetDir, files, extension = 'd.ts') {
  const contents = `export { default } from '@mui/material/SvgIcon';`;

  let index = 0;
  const filesIterable = {
    [Symbol.iterator]: () => ({
      next() {
        if (index >= files.length) {
          return { done: true };
        }
        const nextFile = files[index];
        index += 1;
        return { value: nextFile, done: false };
      },
    }),
  };

  const createWorker = async () => {
    for (const file of filesIterable) {
      const iconName = normalizeFileName(file);
      // eslint-disable-next-line no-await-in-loop
      await fs.writeFile(path.resolve(targetDir, `${iconName}.${extension}`), contents, 'utf8');
    }
  };

  const concurrency = 50;
  const workers = Array.from({ length: concurrency }, createWorker);

  await Promise.all(workers);
}

async function createIndexTyping(targetDir, files, extension = 'd.ts') {
  const contents = `
import SvgIcon from '@mui/material/SvgIcon';

type SvgIconComponent = typeof SvgIcon;

${files.map((file) => `export const ${normalizeFileName(file)}: SvgIconComponent;`).join('\n')}
`;

  await fs.writeFile(path.resolve(targetDir, `index.${extension}`), contents, 'utf8');
}

// Generate TypeScript.
async function run() {
  await Promise.all([fs.mkdir(TARGET_DIR, { recursive: true })]);
  console.log(`\u{1f52c}  Searching for modules inside "${chalk.dim(SRC_DIR)}".`);
  const files = await glob('!(index)*.mjs', { cwd: SRC_DIR });
  await Promise.all([
    createIconTypings(TARGET_DIR, files),
    createIndexTyping(TARGET_DIR, files),
    createIconTypings(TARGET_DIR, files, 'd.mts'),
    createIndexTyping(TARGET_DIR, files, 'd.mts'),
  ]);
  console.log(`\u{1F5C4}  Written typings to ${chalk.dim(TARGET_DIR)}.`);
}

run();
