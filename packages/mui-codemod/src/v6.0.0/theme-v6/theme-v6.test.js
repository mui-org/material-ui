import { describe, it, expect } from 'vitest';
import path from 'path';
import { jscodeshift } from '../../../testUtils';
import transform from './theme-v6';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v6.0.0 - theme-v6', () => {
    describe('styleOverrides', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/basicTheme.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/basicTheme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/basicTheme.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/basicTheme.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('theme variants to root slot', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/themeVariants.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/themeVariants.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/themeVariants.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/themeVariants.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
