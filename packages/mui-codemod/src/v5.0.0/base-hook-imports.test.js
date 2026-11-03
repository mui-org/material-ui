import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './base-hook-imports';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('base-hook-imports', () => {
      it('transforms the imports of Base hooks to default imports', () => {
        const actual = transform(
          {
            source: read('./base-hook-imports.test/actual.js'),
            path: require.resolve('./base-hook-imports.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./base-hook-imports.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
