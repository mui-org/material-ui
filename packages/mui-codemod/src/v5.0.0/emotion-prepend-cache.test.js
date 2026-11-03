import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './emotion-prepend-cache';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('emotion-prepend-cache', () => {
      it('append to createCache', () => {
        const actual = transform(
          {
            source: read('./emotion-prepend-cache.test/default-naming.actual.js'),
            path: require.resolve('./emotion-prepend-cache.test/default-naming.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./emotion-prepend-cache.test/default-naming.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./emotion-prepend-cache.test/default-naming.expected.js'),
            path: require.resolve('./emotion-prepend-cache.test/default-naming.expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./emotion-prepend-cache.test/default-naming.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('append to custom naming', () => {
        const actual = transform(
          {
            source: read('./emotion-prepend-cache.test/custom-naming.actual.js'),
            path: require.resolve('./emotion-prepend-cache.test/custom-naming.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./emotion-prepend-cache.test/custom-naming.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('turn existing prepend to true', () => {
        const actual = transform(
          {
            source: read('./emotion-prepend-cache.test/replace-existing-prepend.actual.js'),
            path: require.resolve('./emotion-prepend-cache.test/replace-existing-prepend.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./emotion-prepend-cache.test/replace-existing-prepend.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
