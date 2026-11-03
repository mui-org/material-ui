import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './moved-lab-modules';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('moved-lab-modules', () => {
      it('transforms exports as needed', () => {
        const actual = transform(
          {
            source: read('./moved-lab-modules.test/actual.js'),
            path: require.resolve('./moved-lab-modules.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./moved-lab-modules.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./moved-lab-modules.test/expected.js'),
            path: require.resolve('./moved-lab-modules.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./moved-lab-modules.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
