import { describe, it, expect } from 'vitest';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import {
  private_createMixins as createMixins,
  private_createTypography as createTypography,
} from '@mui/material/styles';
import { private_createBreakpoints as createBreakpoints } from '@mui/system/createTheme';

describe('styleFunctionSx', () => {
  describe('breakpoints', () => {
    it('writes breakpoints in correct order if default toolbar mixin is present in theme', () => {
      const breakpoints = createBreakpoints({});
      const result = styleFunctionSx({
        theme: {
          mixins: createMixins(breakpoints),
          breakpoints,
        },
        sx: (themeParam) => themeParam.mixins.toolbar,
      });

      // Test the order
      expect(Object.keys(result)).to.deep.equal([
        '@media (min-width:0px)',
        '@media (min-width:600px)',
        'minHeight',
      ]);
    });
  });

  it('resolves inherit typography properties', () => {
    const result = styleFunctionSx({
      theme: { typography: createTypography({}, {}) },
      sx: {
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        letterSpacing: 'inherit',
      },
    });

    expect(result).deep.equal({
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
    });
  });

  it('resolves theme typography properties', () => {
    const result = styleFunctionSx({
      theme: { typography: createTypography({}, {}) },
      sx: {
        fontFamily: 'default',
        fontWeight: 'fontWeightMedium',
        fontSize: 'fontSize',
      },
    });

    expect(result).deep.equal({
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeight: 500,
      fontSize: 14,
    });
  });
});
