import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './rename-css-variables';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('rename-css-variables', () => {
      it('renames css variables based on the new rules', () => {
        const actual = transform(
          {
            source: read('./rename-css-variables.test/actual.js'),
            path: require.resolve('./rename-css-variables.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./rename-css-variables.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    it('should be idempotent', () => {
      const actual = transform(
        {
          source: read('./rename-css-variables.test/expected.js'),
          path: require.resolve('./rename-css-variables.test/expected.js'),
        },
        { jscodeshift },
        {},
      );

      const expected = read('./rename-css-variables.test/expected.js');
      expect(actual).to.equal(expected, 'The transformed version should be correct');
    });
  });
});
