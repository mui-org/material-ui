import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './with-mobile-dialog';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('with-mobile-dialog', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./with-mobile-dialog.test/actual.js'),
            path: require.resolve('./with-mobile-dialog.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./with-mobile-dialog.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./with-mobile-dialog.test/expected.js'),
            path: require.resolve('./with-mobile-dialog.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./with-mobile-dialog.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should not remove import from core', () => {
        const actual = transform(
          {
            source: read('./with-mobile-dialog.test/no-withwidth.actual.js'),
            path: require.resolve('./with-mobile-dialog.test/no-withwidth.actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./with-mobile-dialog.test/no-withwidth.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
