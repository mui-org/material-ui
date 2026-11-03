import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './button-color-prop';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('button-color-prop', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./button-color-prop.test/actual.js'),
            path: require.resolve('./button-color-prop.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./button-color-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./button-color-prop.test/expected.js'),
            path: require.resolve('./button-color-prop.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./button-color-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
