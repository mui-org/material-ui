const childProcess = require('child_process');
const { chunk } = require('lodash');
const glob = require('fast-glob');
const path = require('path');
const { promisify } = require('util');

const exec = promisify(childProcess.exec);
const packageRoot = path.resolve(__dirname, '../');

async function test(tsconfigPath) {
  try {
    await exec(['yarn', 'tsc', '--project', tsconfigPath].join(' '), { cwd: packageRoot });
  } catch (error) {
    if (error.stdout !== undefined) {
      // `exec` error
      throw new Error(`exit code ${error.code}: ${error.stdout}`);
    }
    // Unknown error
    throw error;
  }
}

/**
 * Tests various module augmentation scenarios.
 * We can't run them with a single `tsc` run since these apply globally.
 * Running them all would mean they're not isolated.
 * Each test case represents a section in our docs.
 *
 * We're not using mocha since mocha is used for runtime tests.
 * This script also allows us to test in parallel which we can't do with our mocha tests.
 */
async function main() {
  const tsconfigPaths = await glob('test/typescript/moduleAugmentation/*.tsconfig.json', {
    absolute: true,
    cwd: packageRoot,
  });
  // Need to process in chunks or we might run out-of-memory
  // approximate yarn lerna --concurrency 7
  const tsconfigPathsChunks = chunk(tsconfigPaths, 7);

  // eslint-disable-next-line no-restricted-syntax
  for await (const tsconfigPathsChunk of tsconfigPathsChunks) {
    await Promise.all(
      tsconfigPathsChunk.map(async (tsconfigPath) => {
        await test(tsconfigPath).then(
          () => {
            // eslint-disable-next-line no-console -- test runner feedback
            console.log(`PASS ${path.relative(process.cwd(), tsconfigPath)}`);
          },
          (error) => {
            // don't bail but log the error
            console.error(`FAIL ${path.relative(process.cwd(), tsconfigPath)}\n ${error}`);
            // and mark the test as failed
            process.exitCode = 1;
          },
        );
      }),
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
