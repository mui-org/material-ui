import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './link-underline-hover';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('link-underline-hover', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./link-underline-hover.test/actual.js'),
            path: require.resolve('./link-underline-hover.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./link-underline-hover.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./link-underline-hover.test/expected.js'),
            path: require.resolve('./link-underline-hover.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./link-underline-hover.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
