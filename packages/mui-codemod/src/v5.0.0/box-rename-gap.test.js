import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './box-rename-gap';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('box-rename-gap', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./box-rename-gap.test/actual.js'),
            path: require.resolve('./box-rename-gap.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-rename-gap.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./box-rename-gap.test/expected.js'),
            path: require.resolve('./box-rename-gap.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-rename-gap.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
