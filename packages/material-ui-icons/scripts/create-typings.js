/* eslint-disable no-console */
import path from 'path';
import chalk from 'chalk';
import fse from 'fs-extra';
import glob from 'fast-glob';

const SRC_DIR = path.resolve(__dirname, '../lib/esm');
const TARGET_DIR = path.resolve(__dirname, '../build');

function normalizeFileName(file) {
  return path.parse(file).name;
}

function createIconTyping(file) {
  const name = normalizeFileName(file);
  const contents = `export { default } from '@material-ui/core/SvgIcon';`;
  return fse.writeFile(path.resolve(TARGET_DIR, `${name}.d.ts`), contents, 'utf8');
}

function createIndexTyping(files) {
  const contents = `
import SvgIcon from '@material-ui/core/SvgIcon';

type SvgIconComponent = typeof SvgIcon;

${files.map((file) => `export const ${normalizeFileName(file)}: SvgIconComponent;`).join('\n')}
`;

  return fse.writeFile(path.resolve(TARGET_DIR, 'index.d.ts'), contents, 'utf8');
}

// Generate TypeScript.
async function run() {
  await fse.ensureDir(TARGET_DIR);
  console.log(`\u{1f52c}  Searching for modules inside "${chalk.dim(SRC_DIR)}".`);
  const files = await glob('!(index)*.js', { cwd: SRC_DIR });
  const typings = files.map((file) => createIconTyping(file));
  await Promise.all([...typings, createIndexTyping(files)]);
  console.log(`\u{1F5C4}  Written typings to ${chalk.dim(TARGET_DIR)}.`);
}

run();
