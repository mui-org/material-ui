import fs from 'fs';
import path from 'path';
import { expect } from 'chai';
import jscodeshift from 'jscodeshift';
import transform from './variant-prop';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@material-ui/codemod', () => {
  describe('v5.0.0', () => {
    describe('variant-prop', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./variant-prop.test/actual.js'),
            path: require.resolve('./variant-prop.test/actual.js'),
          },
          { jscodeshift },
          {},
        );

        const expected = read('./variant-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
