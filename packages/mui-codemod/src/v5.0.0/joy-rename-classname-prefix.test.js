import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './joy-rename-classname-prefix';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('joy-rename-classname-prefix', () => {
      it('transforms classname prefix from Joy to Mui', () => {
        const actual = transform(
          {
            source: read('./joy-rename-classname-prefix.test/actual.js'),
            path: require.resolve('./joy-rename-classname-prefix.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./joy-rename-classname-prefix.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
