import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './box-sx-prop';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('box-sx-prop', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./box-sx-prop.test/actual.js'),
            path: require.resolve('./box-sx-prop.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-sx-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./box-sx-prop.test/expected.js'),
            path: require.resolve('./box-sx-prop.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-sx-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('alias, transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./box-sx-prop.test/alias-actual.js'),
            path: require.resolve('./box-sx-prop.test/alias-actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-sx-prop.test/alias-expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('alias, should be idempotent', () => {
        const actual = transform(
          {
            source: read('./box-sx-prop.test/alias-expected.js'),
            path: require.resolve('./box-sx-prop.test/alias-expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./box-sx-prop.test/alias-expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
