/* eslint-disable no-console */
import path from 'path';
import * as fs from 'fs/promises';
import url from 'url';

const currentDirectory = url.fileURLToPath(new URL('.', import.meta.url));
const packageDir = path.resolve(currentDirectory, '..');

// Wildcard exports keep the published package.json small (~10 lines instead of
// ~10k explicit subpath entries). The flat list balloons the file enough that
// the TypeScript language server stalls or crashes when indexing
// package.json for auto-imports. See https://github.com/mui/material-ui/issues/48364
// and https://github.com/microsoft/TypeScript/issues/60854.
const wildcardExports = {
  './package.json': './package.json',
  '.': {
    require: './index.js',
    import: './index.mjs',
    default: './index.mjs',
  },
  './*': {
    require: './*.js',
    import: './*.mjs',
    default: './*.mjs',
  },
};

/**
 * Reads `package.json` and `lib/package.json`, then creates a new package.json
 * where all fields come from `lib/package.json` (so build-time fields like
 * `main` point at `./index.js`), with a few metadata fields pulled from the
 * root `package.json`. The `exports` field is overridden with a wildcard form.
 */
async function run() {
  const rootPackageJsonPath = path.resolve(packageDir, 'package.json');
  const buildPackageJsonPath = path.resolve(packageDir, 'build/package.json');

  const rootPackageJson = await fs
    .readFile(rootPackageJsonPath, 'utf8')
    .then((content) => JSON.parse(content));

  const mergedPackageJson = {
    ...rootPackageJson,
    exports: wildcardExports,
  };
  mergedPackageJson.main = './index.js';
  mergedPackageJson.types = './index.d.ts';
  delete mergedPackageJson.publishConfig?.directory;
  // Remove fields that shouldn't be in the published package
  delete mergedPackageJson.devDependencies;
  delete mergedPackageJson.scripts;

  await fs.writeFile(
    buildPackageJsonPath,
    `${JSON.stringify(mergedPackageJson, null, 2)}\n`,
    'utf8',
  );

  console.log('✅ package.json created successfully.');
}

run().catch((error) => {
  console.error('Error creating package.json files:', error);
  process.exit(1);
});
