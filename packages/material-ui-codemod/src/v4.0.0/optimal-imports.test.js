import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './optimal-imports';
import readFile from '../util/readFile';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v4.0.0', () => {
    describe('optimal-imports', () => {
      it('convert path as needed', () => {
        const actual = transform(
          { source: read('./optimal-imports.test/actual.js'), path: require.resolve('./optimal-imports.test/actual.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./optimal-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./optimal-imports.test/expected.js'), path: require.resolve('./optimal-imports.test/expected.js') },
          { jscodeshift: jscodeshift },
          {},
        );

        const expected = read('./optimal-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
