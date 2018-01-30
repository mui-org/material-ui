/* eslint-disable no-console */

import path from 'path';
import fse from 'fs-extra';
import flowCopySource from 'flow-copy-source';
import glob from 'glob';

async function copyFile(file) {
  const buildPath = path.resolve(__dirname, '../build/', path.basename(file));
  await fse.copy(file, buildPath);
  console.log(`Copied ${file} to ${buildPath}`);
}

function typescriptCopy(from, to) {
  const files = glob.sync('**/*.d.ts', { cwd: from });
  const cmds = files.map(file => fse.copy(path.resolve(from, file), path.resolve(to, file)));
  return Promise.all(cmds);
}

async function createPackageFile() {
  const packageData = await new Promise(resolve => {
    fse.readFile(path.resolve(__dirname, '../package.json'), 'utf8', (err, data) => {
      if (err) {
        throw err;
      }

      resolve(data);
    });
  });
  const { nyc, ...packageDataOther } = JSON.parse(packageData);
  const newPackageData = {
    ...packageDataOther,
    name: 'material-ui',
    main: './index.js',
    module: './index.es.js',
    private: false,
  };
  const buildPath = path.resolve(__dirname, '../build/package.json');

  await new Promise(resolve => {
    fse.writeFile(buildPath, JSON.stringify(newPackageData, null, 2), 'utf8', err => {
      if (err) throw err;
      console.log(`Created package.json in ${buildPath}`);
      resolve();
    });
  });

  return newPackageData;
}

async function prepend(file, string) {
  const data = await new Promise(resolve => {
    fse.readFile(file, 'utf8', (err, data2) => {
      if (err) {
        throw err;
      }
      resolve(data2);
    });
  });
  return new Promise(resolve => {
    fse.writeFile(file, string + data, 'utf8', err => {
      if (err) {
        throw err;
      }
      resolve();
    });
  });
}

function addLicense(packageData) {
  const license = `/** @license Material-UI v${packageData.version}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
`;
  return Promise.all(
    [
      '../build/index.js',
      '../build/index.es.js',
      '../build/umd/material-ui.development.js',
      '../build/umd/material-ui.production.min.js',
    ].map(file => prepend(path.resolve(__dirname, file), license)),
  );
}

async function run() {
  await ['README.md', 'CHANGELOG.md', 'LICENSE'].map(file => copyFile(file));
  const packageData = await createPackageFile();

  const from = path.resolve(__dirname, '../src');
  await Promise.all([
    typescriptCopy(from, path.resolve(__dirname, '../build')),
    typescriptCopy(from, path.resolve(__dirname, '../build/es')),
  ]);
  await addLicense(packageData);

  // Copy original implementation files for flow.
  flowCopySource(['src'], 'build', { verbose: true, ignore: '**/*.spec.js' });
}

run();
