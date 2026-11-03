import { describe, it, expect } from 'vitest';
import path from 'path';
import { jscodeshift } from '../../../testUtils';
import transform from './styled-v6';
import readFile from '../../util/readFile';

function read(fileName) {
  return readFile(path.join(__dirname, fileName));
}

describe('@mui/codemod', () => {
  describe('v6.0.0', () => {
    describe('basic styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/BasicStyled.actual.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/BasicStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/BasicStyled.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/BasicStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('logical styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/LogicalStyled.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/LogicalStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/LogicalStyled.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/LogicalStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('nested spread styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/NestedSpread.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/NestedSpread.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/NestedSpread.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/NestedSpread.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('object map styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/ObjectMap.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/ObjectMap.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/ObjectMap.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/ObjectMap.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('conditional styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/ConditionalStyled.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/ConditionalStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/ConditionalStyled.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/ConditionalStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('theme palette mode styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/ThemePaletteMode.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/ThemePaletteMode.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/ThemePaletteMode.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/ThemePaletteMode.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('theme palette mode and variants styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/VariantAndModeStyled.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/VariantAndModeStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/VariantAndModeStyled.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/VariantAndModeStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });

    describe('dynamic props styled-v6', () => {
      it('transforms props as needed', () => {
        const actual = transform(
          { source: read('./test-cases/DynamicPropsStyled.actual.js') },
          { jscodeshift },
          { printOptions: { trailingComma: false } },
        );

        const expected = read('./test-cases/DynamicPropsStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });

      it('should be idempotent', () => {
        const actual = transform(
          { source: read('./test-cases/DynamicPropsStyled.expected.js') },
          { jscodeshift },
          {},
        );

        const expected = read('./test-cases/DynamicPropsStyled.expected.js');
        expect(actual).to.equal(expected, 'The transformed version should be correct');
      });
    });
  });
});
