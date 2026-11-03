import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './grid-list-component';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('grid-list-component', () => {
      it('transforms MuiThemeProvider as needed', () => {
        const actual = transform(
          {
            source: read('./grid-list-component.test/actual.js'),
            path: require.resolve('./grid-list-component.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./grid-list-component.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./grid-list-component.test/expected.js'),
            path: require.resolve('./grid-list-component.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./grid-list-component.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
