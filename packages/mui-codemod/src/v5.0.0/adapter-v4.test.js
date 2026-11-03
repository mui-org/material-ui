import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './adapter-v4';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('adapter-v4', () => {
      it('add adaptV4Theme as needed', () => {
        const actual = transform(
          {
            source: read('./adapter-v4.test/actual.js'),
            path: require.resolve('./adapter-v4.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./adapter-v4.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./adapter-v4.test/expected.js'),
            path: require.resolve('./adapter-v4.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./adapter-v4.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('works with core import', () => {
        const actual = transform(
          {
            source: read('./adapter-v4.test/core-import.actual.js'),
            path: require.resolve('./adapter-v4.test/core-import.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./adapter-v4.test/core-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('works with other path import', () => {
        const actual = transform(
          {
            source: read('./adapter-v4.test/no-styles-import.actual.js'),
            path: require.resolve('./adapter-v4.test/no-styles-import.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./adapter-v4.test/no-styles-import.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
