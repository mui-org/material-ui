import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './color-imports';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('color-imports', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./color-imports.test/actual.js'),
            path: require.resolve('./color-imports.test/actual.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./color-imports.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./color-imports.test/expected.js'),
            path: require.resolve('./color-imports.test/expected.js'),
          },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./color-imports.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
