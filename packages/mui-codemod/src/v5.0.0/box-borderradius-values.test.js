import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './box-borderradius-values';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('box-borderradius-values', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./box-borderradius-values.test/actual.js'),
            path: require.resolve('./box-borderradius-values.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-borderradius-values.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
