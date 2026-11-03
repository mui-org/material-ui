import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './transitions';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('transitions', () => {
      it('transforms transitions as needed', () => {
        const actual = transform(
          {
            source: read('./transitions.test/actual.js'),
            path: require.resolve('./transitions.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./transitions.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./transitions.test/expected.js'),
            path: require.resolve('./transitions.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./transitions.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
