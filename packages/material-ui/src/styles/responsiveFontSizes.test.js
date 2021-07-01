import { expect } from 'chai';
import { createTheme } from '@material-ui/core/styles';
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
        'Material-UI: Unsupported non-unitless line height with grid alignment.\n' +
          'Use unitless line heights instead.',
      );
    });
  });
});
