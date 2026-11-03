import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './base-remove-unstyled-suffix';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('base-remove-unstyled-suffix', () => {
      it('removes `Unstyled` suffix from Base UI components except default import declarations', () => {
        const actual = transform(
          {
            source: read('./base-remove-unstyled-suffix.test/actual.js'),
            path: require.resolve('./base-remove-unstyled-suffix.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./base-remove-unstyled-suffix.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
