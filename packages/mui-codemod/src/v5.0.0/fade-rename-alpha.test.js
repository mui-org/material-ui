import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './fade-rename-alpha';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('fade-rename-alpha', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./fade-rename-alpha.test/actual.js'),
            path: require.resolve('./fade-rename-alpha.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./fade-rename-alpha.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./fade-rename-alpha.test/expected.js'),
            path: require.resolve('./fade-rename-alpha.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./fade-rename-alpha.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should not modify local functions', () => {
        const actual = transform(
          {
            source: read('./fade-rename-alpha.test/unmodified.js'),
            path: require.resolve('./fade-rename-alpha.test/unmodified.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./fade-rename-alpha.test/unmodified.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
