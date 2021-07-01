import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './color-imports';
import readFile from '../util/readFile';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v1.0.0', () => {
    describe('color-imports', () => {
      it('update color module imports', () => {
        const actual = transform(
          { source: read('./color-imports.test/actual.js') },
          { jscodeshift: jscodeshift },
        );

        const expected = read('./color-imports.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
