import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './material-ui-styles';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('material-ui-styles', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./material-ui-styles.test/actual.js'),
            path: require.resolve('./material-ui-styles.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./material-ui-styles.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./material-ui-styles.test/expected.js'),
            path: require.resolve('./material-ui-styles.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./material-ui-styles.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('remove no variable import', () => {
        const actual = transform(
          {
            source: read('./material-ui-styles.test/single-import.actual.js'),
            path: require.resolve('./material-ui-styles.test/single-import.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./material-ui-styles.test/single-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transform core import', () => {
        const actual = transform(
          {
            source: read('./material-ui-styles.test/core-import.actual.js'),
            path: require.resolve('./material-ui-styles.test/core-import.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./material-ui-styles.test/core-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('transform types import', () => {
        const actual = transform(
          {
            source: read('./material-ui-styles.test/types-import.actual.js'),
            path: require.resolve('./material-ui-styles.test/types-import.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./material-ui-styles.test/types-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
