import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './import-path';
import readFile from '../util/readFile';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v0.15.0', () => {
    describe('import-path', () => {
      it('convert path as needed', () => {
        const actual = transform(
          { source: read('./import-path.test/actual.js') },
          { jscodeshift: jscodeshift },
        );

        const expected = read('./import-path.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
