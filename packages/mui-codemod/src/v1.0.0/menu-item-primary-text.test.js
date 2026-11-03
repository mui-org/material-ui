import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './menu-item-primary-text';
import readFile from '../util/readFile';

function trim(str) {
  return str ? str.replace(/^\s+|\s+$/, '') : '';
}

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v1.0.0', () => {
    describe('menu-item-primary-text', () => {
      it('convert property as needed', () => {
        const actual = transform(
          { source: read('./menu-item-primary-text.test/actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./menu-item-primary-text.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./menu-item-primary-text.test/expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./menu-item-primary-text.test/expected.js');
        expect(trim(actual)).to.equal(trim(expected), 'The transformed version should be correct');
      });
    });
  });
});
