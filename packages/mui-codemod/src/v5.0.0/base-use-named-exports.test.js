import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './base-use-named-exports';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('base-use-named-exports', () => {
      it('transforms exports as needed', () => {
        const actual = transform(
          {
            source: read('./base-use-named-exports.test/actual.js'),
            path: require.resolve('./base-use-named-exports.test/actual.js'),
          },
          { jscodeshift },
          { printOptions: { quote: 'single' } },
        );

        const expected = read('./base-use-named-exports.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./base-use-named-exports.test/expected.js'),
            path: require.resolve('./base-use-named-exports.test/expected.js'),
          },
          { jscodeshift },
          { printOptions: { quote: 'single' } },
        );

        const expected = read('./base-use-named-exports.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('warns when deep import is found but transforms all the valid ones', () => {
        let actual;
        const filePath = require.resolve('./base-use-named-exports.test/actual-with-warning.js');
        expect(() => {
          actual = transform(
            {
              source: read('./base-use-named-exports.test/actual-with-warning.js'),
              path: filePath,
            },
            { jscodeshift },
            { printOptions: { quote: 'single' } },
          );
        }).toWarnDev(
          `WARNING: ${filePath}: "@mui/base/utils/ClassNameConfigurator" is more than one level deep. This is not supported.`,
        );

        const expected = read('./base-use-named-exports.test/expected-with-warning.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
