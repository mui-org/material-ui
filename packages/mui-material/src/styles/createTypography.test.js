import { describe, beforeAll, it, expect } from 'vitest';
import createPalette from './createPalette';
import createTypography from './createTypography';

describe('createTypography', () => {
  let palette;

  beforeAll(() => {
    palette = createPalette({});
  });

  it('should create a material design typography according to spec', () => {
    const typography = createTypography(palette, {});
    expect(typography.fontSize).to.equal(14);
  });

  it('should create a typography with custom fontSize', () => {
    const typography = createTypography(palette, { fontSize: 15 });
    expect(typography.fontSize).to.equal(15);
  });

  it('should accept a function', () => {
    const typography = createTypography(palette, (paletteCurrent) => {
      expect(palette).to.equal(paletteCurrent);

      return { fontSize: 15 };
    });
    expect(typography.fontSize).to.equal(15);
  });

  it('should accept a custom font size', () => {
    const typography = createTypography(palette, { fontSize: 16 });
    expect(typography.body2.fontSize).to.equal('1rem');
  });

  it('should create a typography with a custom baseFontSize', () => {
    const typography = createTypography(palette, { htmlFontSize: 10 });
    expect(typography.h2.fontSize).to.equal('6rem');
  });

  it('should create a typography with custom h1', () => {
    const customFontSize = '18px';
    const typography = createTypography(palette, { h1: { fontSize: customFontSize } });
    expect(typography.h1.fontSize).to.equal(customFontSize);
  });

  it('should apply a CSS property to all the variants', () => {
    const typography = createTypography(palette, { allVariants: { marginLeft: 0 } });
    const allVariants = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'subtitle1',
      'subtitle2',
      'body1',
      'body2',
      'button',
      'caption',
      'overline',
    ];

    allVariants.forEach((variant) => {
      expect(typography[variant].marginLeft).to.equal(0);
    });
  });

  it('only defines letter-spacing if the font-family is not overwritten', () => {
    expect(createTypography(palette, {}).h1.letterSpacing).not.to.equal(undefined);
    expect(createTypography(palette, { fontFamily: 'Gotham' }).h1.letterSpacing).to.equal(
      undefined,
    );
  });

  // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
  it('should apply font CSS properties to inherit variant', () => {
    const typography = createTypography(palette, {});
    const fontProperties = ['fontFamily', 'fontWeight', 'fontSize', 'lineHeight', 'letterSpacing'];

    fontProperties.forEach((prop) => {
      expect(typography.inherit[prop]).to.equal('inherit');
    });
  });

  describe('warnings', () => {
    it('logs an error if `fontSize` is not of type number', () => {
      expect(() => {
        createTypography({}, { fontSize: '1' });
      }).toErrorDev('MUI: `fontSize` is required to be a number.');
    });

    it('logs an error if `htmlFontSize` is not of type number', () => {
      expect(() => {
        createTypography({}, { htmlFontSize: '1' });
      }).toErrorDev('MUI: `htmlFontSize` is required to be a number.');
    });
  });
});
