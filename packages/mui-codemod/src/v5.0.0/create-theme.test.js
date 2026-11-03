import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './create-theme';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('create-theme', () => {
      it('transforms createMuiTheme as needed', () => {
        const actual = transform(
          {
            source: read('./create-theme.test/actual.js'),
            path: require.resolve('./create-theme.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./create-theme.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./create-theme.test/expected.js'),
            path: require.resolve('./create-theme.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./create-theme.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transforms with core import', () => {
        const actual = transform(
          {
            source: read('./create-theme.test/core-import.actual.js'),
            path: require.resolve('./create-theme.test/core-import.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./create-theme.test/core-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('existing custom createTheme', () => {
        const actual = transform(
          {
            source: read('./create-theme.test/custom-fn.actual.js'),
            path: require.resolve('./create-theme.test/custom-fn.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./create-theme.test/custom-fn.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
