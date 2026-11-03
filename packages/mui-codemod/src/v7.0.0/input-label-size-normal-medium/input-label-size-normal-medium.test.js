import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './input-label-size-normal-medium';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v7.0.0', () => {
    describe('input-label-size-normal-medium', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./test-cases/actual.js'),
            path: require.resolve('./test-cases/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./test-cases/expected.js'),
            path: require.resolve('./test-cases/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
