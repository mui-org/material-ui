import { describe, it, expect } from 'vitest';
import path from 'path';
import { jscodeshift } from '../../../testUtils';
import transform from './list-item-button-prop';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('deprecations', () => {
    describe('list-item-button-prop', () => {
      it('transforms props as needed', () => {
        const actual = transform({ source: read('./test-cases/actual.js') }, { jscodeshift }, {});

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform({ source: read('./test-cases/expected.js') }, { jscodeshift }, {});

        const expected = read('./test-cases/expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('actual.js should not be equal to expected.js', () => {
        const actual = read('./test-cases/actual.js');
        const expected = read('./test-cases/expected.js');
        expect(actual).not.to.equal(expected);
      });
    });

    describe('[theme] button-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/theme.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/theme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/theme.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/theme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('theme.actual.js should not be equal to theme.expected.js', () => {
        const actual = read('./test-cases/theme.actual.js');
        const expected = read('./test-cases/theme.expected.js');
        expect(actual).not.to.equal(expected);
      });
    });

    describe('[package] button-props', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/package.actual.js') },
          { jscodeshift },
          { packageName: '@org/ui/material' },
        );

        const expected = read('./test-cases/package.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/package.expected.js') },
          { jscodeshift },
          { packageName: '@org/ui/material' },
        );

        const expected = read('./test-cases/package.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    it('should skip files that do not import ListItem from @mui/material', () => {
      const actual = transform(
        { source: read('./test-cases/not-related.actual.js') },
        { jscodeshift },
        {},
      );

      const expected = read('./test-cases/not-related.expected.js');
      expect(actual).to.equal(expected, 'The transformed version should be correct');
    });
  });
});
