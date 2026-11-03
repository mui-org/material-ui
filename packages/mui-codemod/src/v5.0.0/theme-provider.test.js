import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './theme-provider';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('theme-provider', () => {
      it('transforms MuiThemeProvider as needed', () => {
        const actual = transform(
          {
            source: read('./theme-provider.test/actual.js'),
            path: require.resolve('./theme-provider.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./theme-provider.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./theme-provider.test/expected.js'),
            path: require.resolve('./theme-provider.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./theme-provider.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms MuiThemeProvider in core import', () => {
        const actual = transform(
          {
            source: read('./theme-provider.test/core-import.actual.js'),
            path: require.resolve('./theme-provider.test/core-import.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./theme-provider.test/core-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
