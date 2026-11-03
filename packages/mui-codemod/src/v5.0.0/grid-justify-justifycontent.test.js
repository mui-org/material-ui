import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './grid-justify-justifycontent';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('grid-justify-justifycontent', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./grid-justify-justifycontent.test/actual.js'),
            path: require.resolve('./grid-justify-justifycontent.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./grid-justify-justifycontent.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./grid-justify-justifycontent.test/expected.js'),
            path: require.resolve('./grid-justify-justifycontent.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./grid-justify-justifycontent.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
