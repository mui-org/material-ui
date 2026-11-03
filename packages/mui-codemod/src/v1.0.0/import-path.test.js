import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './import-path';
import readFile from '../util/readFile';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v1.0.0', () => {
    describe('import-path', () => {
      it('convert path as needed', () => {
        const actual = transform(
          { source: read('./import-path.test/actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./import-path.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./import-path.test/expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./import-path.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
