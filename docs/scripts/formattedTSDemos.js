/* eslint-disable no-console */

/**
 * Transpiles TypeScript demos to formatted JavaScript.
 * Can be used to verify that JS and TS demos are equivalent. No introduced change
 * would indicate equivalence.
 */

/**
 * List of demos to ignore when transpiling
 * Example: "app-bar/BottomAppBar.tsx"
 */
const ignoreList = [];

const fse = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');
const prettier = require('prettier');
const os = require('os');

const babelConfig = {
  presets: ['@babel/preset-typescript'],
  plugins: ['unwrap-createStyles'],
  generatorOpts: { retainLines: true },
  babelrc: false,
  configFile: false,
};

let prettierConfig = prettier.resolveConfig(process.cwd(), {
  config: path.join(__dirname, '../../prettier.config.js'),
});

async function getFiles(root) {
  const files = [];

  await Promise.all(
    (await fse.readdir(root)).map(async name => {
      const filePath = path.join(root, name);
      const stat = await fse.stat(filePath);

      if (stat.isDirectory()) {
        files.push(...(await getFiles(filePath)));
      } else if (
        stat.isFile() &&
        filePath.endsWith('.tsx') &&
        !ignoreList.some(ignorePath => filePath.endsWith(path.normalize(ignorePath)))
      ) {
        files.push(filePath);
      }
    }),
  );

  return files;
}

function getLineFeed(source) {
  if (source.length <= 1) return os.EOL;

  for (let index = 1; index < source.length; index += 1) {
    if (source[index] === '\n') {
      if (source[index - 1] === '\r') return '\r\n';
      return '\n';
    }
  }

  return os.EOL;
}

const fixBabelIssuesRegExp = new RegExp(/(?<=(\/>)|,)(\r?\n){2}/g);
function fixBabelGeneratorIssues(source) {
  return source.replace(fixBabelIssuesRegExp, getLineFeed(source));
}

async function transpileFile(filePath) {
  try {
    const { code } = await babel.transformFileAsync(filePath, babelConfig);
    const prettified = prettier.format(code, { ...prettierConfig, filepath: filePath });
    const formatted = fixBabelGeneratorIssues(prettified);

    await fse.writeFile(filePath.replace('.tsx', '.js'), formatted);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

(async () => {
  prettierConfig = await prettierConfig;

  const tsxFiles = await getFiles(path.join(__dirname, '../src/pages'));

  let successful = 0;
  let failed = 0;
  (await Promise.all(tsxFiles.map(transpileFile))).forEach(item => {
    if (item) successful += 1;
    else failed += 1;
  });

  console.log(
    [
      '------ Summary ------',
      '%i demo(s) were successfully transpiled',
      '%i demo(s) were unsuccessful',
    ].join('\n'),
    successful,
    failed,
  );

  const watchMode = process.argv.some(arg => arg === '--watch');
  if (!watchMode) {
    if (failed > 0) {
      process.exit(1);
    }
    return;
  }

  tsxFiles.forEach(filePath => {
    fse.watchFile(filePath, { interval: 500 }, async () => {
      if (await transpileFile(filePath)) {
        console.log('Success - %s', filePath);
      }
    });
  });

  console.log('\nWatching files for changes...');
})();
