import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './mui-replace';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('mui-replace', () => {
      it('replace material-ui with mui', () => {
        const actual = transform(
          {
            source: read('./mui-replace.test/actual.js'),
            path: require.resolve('./mui-replace.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./mui-replace.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./mui-replace.test/expected.js'),
            path: require.resolve('./mui-replace.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./mui-replace.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
