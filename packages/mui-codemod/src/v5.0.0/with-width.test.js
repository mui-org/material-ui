import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './with-width';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('with-width', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./with-width.test/actual.js'),
            path: require.resolve('./with-width.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./with-width.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./with-width.test/expected.js'),
            path: require.resolve('./with-width.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./with-width.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should not remove import from core', () => {
        const actual = transform(
          {
            source: read('./with-width.test/no-withwidth.actual.js'),
            path: require.resolve('./with-width.test/no-withwidth.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./with-width.test/no-withwidth.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
