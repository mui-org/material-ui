import { describe, it, expect } from 'vitest';
import path from 'path';
import jscodeshift from 'jscodeshift';
import transform from './component-rename-prop';
import readFile from '../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v5.0.0', () => {
    describe('component-rename-prop', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          {
            source: read('./component-rename-prop.test/actual.js'),
          },
          { jscodeshift },
          { component: 'Component', from: 'prop', to: 'newProp' },
        );

        const expected = read('./component-rename-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          {
            source: read('./component-rename-prop.test/expected.js'),
          },
          { jscodeshift },
          { component: 'Component', from: 'prop', to: 'newProp' },
        );

        const expected = read('./component-rename-prop.test/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
