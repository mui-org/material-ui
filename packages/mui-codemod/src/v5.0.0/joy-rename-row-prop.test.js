import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './joy-rename-row-prop';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('joy-rename-row-prop', () => {
      it('transforms `row` prop to `orientation="horizontal"`', () => {
        const actual = transform(
          {
            source: read('./joy-rename-row-prop.test/actual.js'),
            path: require.resolve('./joy-rename-components-to-slots.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./joy-rename-row-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
