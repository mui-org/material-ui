import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './joy-text-field-to-input';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('joy-text-field-to-input', () => {
      it('transform Joy TextField into Joy Input', () => {
        const actual = transform(
          {
            source: read('./joy-text-field-to-input.test/actual.js'),
            path: require.resolve('./joy-text-field-to-input.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./joy-text-field-to-input.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
