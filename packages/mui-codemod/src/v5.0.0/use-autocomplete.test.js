import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './use-autocomplete';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('use-autocomplete', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./use-autocomplete.test/actual.js'),
            path: require.resolve('./use-autocomplete.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./use-autocomplete.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./use-autocomplete.test/expected.js'),
            path: require.resolve('./use-autocomplete.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./use-autocomplete.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
