import { describe, it, expect } from 'vitest';
import {
  isUnitless,
  getUnit,
  toUnitless,
  convertLength,
  alignProperty,
  fontGrid,
  responsiveProperty,
} from './cssUtils';

describe('cssUtils', () => {
  describe('isUnitless', () => {
    it('should work as expected', () => {
      expect(isUnitless('20px')).to.equal(false);
      expect(isUnitless('2.5 px')).to.equal(false);
      expect(isUnitless('2.5 %')).to.equal(false);
      expect(isUnitless('-2.5')).to.equal(true);
    });
  });

  describe('getUnit', () => {
    it('should work as expected', () => {
      expect(getUnit('20px')).to.equal('px');
      expect(getUnit('2.5 px')).to.equal('px');
      expect(getUnit('2.5 %')).to.equal('%');
      expect(getUnit('-2.5')).to.equal('');
    });
  });

  describe('toUnitless', () => {
    it('should work as expected', () => {
      expect(toUnitless('20px')).to.equal(20);
      expect(toUnitless('2.5 px')).to.equal(2.5);
      expect(toUnitless('2.5 %')).to.equal(2.5);
      expect(toUnitless('-2.5')).to.equal(-2.5);
    });
  });

  describe('convertLength', () => {
    it('should work as expected', () => {
      const convert = convertLength('16px');
      expect(convert('32px', 'rem')).to.equal('2rem');
      expect(convert('2rem', 'px')).to.equal('32px');
    });
  });

  describe('alignProperty', () => {
    const tests = [
      { args: { size: 8, grid: 4 }, expected: 8 },
      { args: { size: 8, grid: 1 }, expected: 8 },
      { args: { size: 8, grid: 9 }, expected: 9 },
      { args: { size: 8, grid: 7 }, expected: 7 },
      { args: { size: 8, grid: 17 }, expected: 0 },
    ];

    tests.forEach((test) => {
      const {
        args: { size, grid },
        expected,
      } = test;

      it(`aligns ${size} on grid ${grid} to ${expected}`, () => {
        const sizeAligned = alignProperty({ size, grid });
        expect(sizeAligned).to.equal(expected);
      });
    });
  });

  describe('fontGrid', () => {
    const tests = [
      { lineHeight: 1.3, pixels: 4, htmlFontSize: 16 },
      { lineHeight: 1.6, pixels: 9, htmlFontSize: 15 },
      { lineHeight: 1.0, pixels: 3, htmlFontSize: 14 },
    ];

    tests.forEach((test) => {
      const { lineHeight, pixels, htmlFontSize } = test;

      describe(`when ${lineHeight} lineHeight, ${pixels} pixels,
      ${htmlFontSize} htmlFontSize`, () => {
        const grid = fontGrid({ lineHeight, pixels, htmlFontSize });

        it(`should return a font grid such that the relative lineHeight is aligned`, () => {
          const absoluteLineHeight = grid * lineHeight * htmlFontSize;
          expect(Math.round((absoluteLineHeight % pixels) * 100000) / 100000).to.equal(0);
        });
      });

      it(`with ${lineHeight} lineHeight, ${pixels} pixels,
      ${htmlFontSize} htmlFontSize, the font grid is such that
      there is no smaller font aligning the lineHeight`, () => {
        const grid = fontGrid({ lineHeight, pixels, htmlFontSize });
        const absoluteLineHeight = grid * lineHeight * htmlFontSize;
        expect(Math.floor(absoluteLineHeight / pixels)).to.equal(1);
      });
    });
  });

  describe('responsiveProperty', () => {
    describe('when providing two breakpoints and pixel units', () => {
      it('should respond with three styles in pixels', () => {
        const result = responsiveProperty({
          cssProperty: 'fontSize',
          min: 15,
          max: 20,
          unit: 'px',
          breakpoints: [300, 600],
        });

        expect(result).to.deep.equal({
          fontSize: '15px',
          '@media (min-width:300px)': {
            fontSize: '17.5px',
          },
          '@media (min-width:600px)': {
            fontSize: '20px',
          },
        });
      });
    });

    describe('when providing one breakpoint and requesting rem units', () => {
      it('should respond with two styles in rem', () => {
        const result = responsiveProperty({
          cssProperty: 'fontSize',
          min: 0.875,
          max: 1,
          unit: 'rem',
          breakpoints: [500],
        });

        expect(result).to.deep.equal({
          fontSize: '0.875rem',
          '@media (min-width:500px)': {
            fontSize: '1rem',
          },
        });
      });
    });
  });
});
