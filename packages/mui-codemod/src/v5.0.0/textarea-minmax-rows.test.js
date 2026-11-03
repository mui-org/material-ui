import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './textarea-minmax-rows';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('textarea-minmax-rows', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./textarea-minmax-rows.test/actual.js'),
            path: require.resolve('./textarea-minmax-rows.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./textarea-minmax-rows.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./textarea-minmax-rows.test/expected.js'),
            path: require.resolve('./textarea-minmax-rows.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./textarea-minmax-rows.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
