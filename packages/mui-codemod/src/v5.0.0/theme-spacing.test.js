import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './theme-spacing';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('theme-spacing', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./theme-spacing.test/actual.js'),
            path: require.resolve('./theme-spacing.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./theme-spacing.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./theme-spacing.test/expected.js'),
            path: require.resolve('./theme-spacing.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./theme-spacing.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('large file - transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./theme-spacing.test/large-actual.js'),
            path: require.resolve('./theme-spacing.test/large-actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./theme-spacing.test/large-expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('large file - should be idempotent', () => {
        const actual = transform(
          {
            source: read('./theme-spacing.test/large-expected.js'),
            path: require.resolve('./theme-spacing.test/large-expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./theme-spacing.test/large-expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
