import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './preset-safe';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('preset-safe', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./preset-safe.test/actual.js'),
            path: require.resolve('./preset-safe.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./preset-safe.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./preset-safe.test/expected.js'),
            path: require.resolve('./preset-safe.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./preset-safe.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
