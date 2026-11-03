import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './expansion-panel-component';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('expansion-panel-component', () => {
      it('transforms as needed', () => {
        const actual = transform(
          {
            source: read('./expansion-panel-component.test/actual.js'),
            path: require.resolve('./expansion-panel-component.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./expansion-panel-component.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./expansion-panel-component.test/expected.js'),
            path: require.resolve('./expansion-panel-component.test/expected.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./expansion-panel-component.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
