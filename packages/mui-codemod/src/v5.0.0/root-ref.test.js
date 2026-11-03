import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './root-ref';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('root-ref', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./root-ref.test/actual.js'),
            path: require.resolve('./root-ref.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./root-ref.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./root-ref.test/expected.js'),
            path: require.resolve('./root-ref.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./root-ref.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
