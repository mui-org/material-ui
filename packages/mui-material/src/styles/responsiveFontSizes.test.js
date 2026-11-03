import { describe, it, expect } from 'vitest';
import { createTheme } from '@mui/material/styles';
import defaultTheme from './defaultTheme';
import responsiveFontSizes from './responsiveFontSizes';

describe('responsiveFontSizes', () => {
  it('should support unitless line height', () => {
    const defaultVariant = {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '6rem',
      fontWeight: 300,
      letterSpacing: '-0.01562em',
      lineHeight: 1,
    };

    const theme = createTheme({
      typography: {
        h1: defaultVariant,
      },
    });
    const { typography } = responsiveFontSizes(theme);
    expect(typography.h1).to.deep.equal({
      ...defaultVariant,
      fontSize: '3.5rem',
      [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: { fontSize: '4.75rem' },
      [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: { fontSize: '5.5rem' },
      [`@media (min-width:${defaultTheme.breakpoints.values.lg}px)`]: {
        fontSize: defaultVariant.fontSize,
      },
    });
  });

  it('should disable vertical alignment', () => {
    const defaultVariant = {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '6rem',
      fontWeight: 300,
      letterSpacing: '-0.01562em',
      lineHeight: '6rem',
    };

    const theme = createTheme({
      typography: {
        h1: defaultVariant,
      },
    });
    const { typography } = responsiveFontSizes(theme, {
      disableAlign: true,
    });

    expect(typography.h1).to.deep.equal({
      ...defaultVariant,
      fontSize: '3.5rem',
      [`@media (min-width:${defaultTheme.breakpoints.values.sm}px)`]: { fontSize: '4.75rem' },
      [`@media (min-width:${defaultTheme.breakpoints.values.md}px)`]: { fontSize: '5.375rem' },
      [`@media (min-width:${defaultTheme.breakpoints.values.lg}px)`]: {
        fontSize: defaultVariant.fontSize,
      },
    });
  });

  it('should preserve the original font size at the largest breakpoint', () => {
    // Regression test for https://github.com/mui/material-ui/issues/40255
    // h4 (34px = 2.125rem, lineHeight 1.235) has a font size that falls between
    // grid alignment points, causing alignProperty to snap it ~1.6px away.
    // Uses px input to also verify that the largest-breakpoint value is
    // normalized to rem (consistent with the other breakpoints).
    const defaultVariant = {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '34px',
      fontWeight: 400,
      letterSpacing: '0.00735em',
      lineHeight: 1.235,
    };

    const theme = createTheme({
      typography: {
        h4: defaultVariant,
      },
    });
    const { typography } = responsiveFontSizes(theme);
    expect(
      typography.h4[`@media (min-width:${defaultTheme.breakpoints.values.lg}px)`],
    ).to.deep.equal({
      fontSize: '2.125rem',
    });
  });

  it('should handle variants that have been reset to undefined', () => {
    const theme = createTheme({
      typography: {
        h1: undefined,
      },
    });
    const { typography } = responsiveFontSizes(theme, {
      disableAlign: true,
    });

    expect(typography.h1).to.deep.equal(undefined);
  });

  describe('when requesting a responsive typography with non unitless line height and alignment', () => {
    it('should throw an error, as this is not supported', () => {
      const theme = createTheme({
        typography: {
          h1: {
            lineHeight: '6rem',
          },
        },
      });
      expect(() => {
        responsiveFontSizes(theme);
      }).toThrowMinified(
        'MUI: Unsupported non-unitless line height with grid alignment.\n' +
          'Use unitless line heights instead.',
      );
    });
  });
});
