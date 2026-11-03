import { describe, it, expect } from 'vitest';
import { createRenderer } from '@mui/internal-test-utils';
import Stack from '@mui/system/Stack';
import createTheme from '@mui/system/createTheme';
import { style } from './createStack';
import describeConformance from '../../test/describeConformance';

describe('<Stack />', () => {
  const { render } = createRenderer();

  describeConformance(<Stack />, () => ({
    render,
    inheritComponent: 'div',
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiStack',
    skip: ['componentProp', 'rootClass', 'themeVariants', 'themeStyleOverrides'],
  }));

  const theme = createTheme();

  it('should handle breakpoints with a missing key', () => {
    expect(
      style({
        ownerState: {
          direction: { xs: 'column', sm: 'row' },
          spacing: { xs: 1, sm: 2, md: 4 },
        },
        theme,
      }),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '8px',
        },
        flexDirection: 'column',
      },
      [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginLeft: '16px',
        },
        flexDirection: 'row',
      },
      [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginLeft: '32px',
        },
      },
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('should handle direction with multiple keys and spacing with one', () => {
    expect(
      style({
        ownerState: {
          direction: { sm: 'column', md: 'row' },
          spacing: 2,
        },
        theme,
      }),
    ).to.deep.equal({
      [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '16px',
        },
        flexDirection: 'column',
      },
      [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginLeft: '16px',
        },
        flexDirection: 'row',
      },
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('should handle spacing with multiple keys and direction with one', () => {
    expect(
      style({
        ownerState: {
          direction: 'column',
          spacing: { sm: 2, md: 4 },
        },
        theme,
      }),
    ).to.deep.equal({
      [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '16px',
        },
      },
      [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '32px',
        },
      },
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('should handle spacing with multiple keys and null values', () => {
    expect(
      style({
        ownerState: {
          direction: 'column',
          spacing: { sm: 2, md: 0, lg: 4 },
        },
        theme,
      }),
    ).to.deep.equal({
      [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '16px',
        },
      },
      [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '0px',
        },
      },
      [`@media (min-width:${theme.breakpoints.values.lg}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '32px',
        },
      },
      display: 'flex',
      flexDirection: 'column',
    });
  });

  it('should handle flat params', () => {
    expect(
      style({
        ownerState: {
          direction: 'row',
          spacing: 3,
        },
        theme,
      }),
    ).to.deep.equal({
      '& > :not(style):not(style)': {
        margin: 0,
      },
      '& > :not(style) ~ :not(style)': {
        marginLeft: '24px',
      },
      display: 'flex',
      flexDirection: 'row',
    });
  });

  it('should respect the theme breakpoints order', () => {
    expect(
      style({
        ownerState: {
          direction: { xs: 'column' },
          spacing: { lg: 2, xs: 1 },
        },
        theme,
      }),
    ).to.deep.equal({
      '@media (min-width:0px)': {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '8px',
        },
        flexDirection: 'column',
      },
      [`@media (min-width:${theme.breakpoints.values.lg}px)`]: {
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '16px',
        },
      },
      display: 'flex',
      flexDirection: 'column',
    });
  });

  describe('prop: direction', () => {
    it('should generate correct direction given string values', () => {
      expect(
        style({
          ownerState: {
            direction: 'column-reverse',
            spacing: 1,
          },
          theme,
        }),
      ).to.deep.equal({
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginBottom: '8px',
        },
        display: 'flex',
        flexDirection: 'column-reverse',
      });
    });

    it('should generate correct responsive styles regardless of breakpoints order', () => {
      expect(
        style({
          ownerState: {
            direction: { sm: 'row', xs: 'column' },
            spacing: { xs: 1, sm: 2, md: 3 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '8px',
          },
          flexDirection: 'column',
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginLeft: '16px',
          },
          flexDirection: 'row',
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginLeft: '24px',
          },
        },
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('should generate correct direction even though breakpoints are not fully provided', () => {
      expect(
        style({
          ownerState: {
            direction: { lg: 'row' },
          },
          theme,
        }),
      ).to.deep.equal({
        [`@media (min-width:${theme.breakpoints.values.lg}px)`]: {
          flexDirection: 'row',
        },
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('should place correct margin direction even though breakpoints are not fully provided', () => {
      expect(
        style({
          ownerState: {
            direction: { lg: 'row' },
            spacing: { xs: 0, md: 2, xl: 4 },
          },
          theme,
        }),
      ).to.deep.equal({
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '0px',
          },
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '16px',
          },
        },
        [`@media (min-width:${theme.breakpoints.values.lg}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginLeft: '16px',
          },
          flexDirection: 'row',
        },
        [`@media (min-width:${theme.breakpoints.values.xl}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginLeft: '32px',
          },
        },
        display: 'flex',
        flexDirection: 'column',
      });

      expect(
        style({
          ownerState: {
            direction: { lg: 'column', sm: 'row' },
            spacing: { md: 2, xl: 4, xs: 0 },
          },
          theme,
        }),
      ).to.deep.equal({
        [`@media (min-width:${theme.breakpoints.values.xs}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '0px',
          },
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginLeft: '0px',
          },
          flexDirection: 'row',
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginLeft: '16px',
          },
        },
        [`@media (min-width:${theme.breakpoints.values.lg}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '16px',
          },
          flexDirection: 'column',
        },
        [`@media (min-width:${theme.breakpoints.values.xl}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '32px',
          },
        },
        display: 'flex',
        flexDirection: 'column',
      });
    });
  });

  describe('prop: spacing', () => {
    it('should generate correct responsive styles regardless of breakpoints order', () => {
      expect(
        style({
          ownerState: {
            direction: 'column',
            spacing: { sm: 2, md: 3, xs: 1 },
          },
          theme,
        }),
      ).to.deep.equal({
        '@media (min-width:0px)': {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '8px',
          },
        },
        [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '16px',
          },
        },
        [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '24px',
          },
        },
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('should generate correct styles if custom breakpoints are provided in theme', () => {
      const customTheme = createTheme({
        breakpoints: {
          values: {
            smallest: 0,
            small: 375,
            mobile: 600,
            tablet: 992,
            desktop: 1200,
          },
        },
      });

      expect(
        style({
          ownerState: {
            direction: 'column',
            spacing: 4,
          },
          theme: customTheme,
        }),
      ).to.deep.equal({
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          marginTop: '32px',
        },
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('should generate correct responsive styles if custom responsive spacing values are provided', () => {
      const customTheme = createTheme({
        breakpoints: {
          values: {
            smallest: 0,
            small: 375,
            mobile: 600,
            tablet: 992,
            desktop: 1200,
          },
        },
      });

      expect(
        style({
          ownerState: {
            direction: 'column',
            spacing: { small: 4 },
          },
          theme: customTheme,
        }),
      ).to.deep.equal({
        [`@media (min-width:${customTheme.breakpoints.values.small}px)`]: {
          '& > :not(style):not(style)': {
            margin: 0,
          },
          '& > :not(style) ~ :not(style)': {
            marginTop: '32px',
          },
        },
        display: 'flex',
        flexDirection: 'column',
      });
    });

    it('should list responsive styles in correct order', () => {
      const styles = style({
        ownerState: {
          direction: { xs: 'column', lg: 'row' },
          spacing: { xs: 0, md: 2, xl: 4 },
        },
        theme,
      });
      const keysForResponsiveStyles = Object.keys(styles).filter((prop) => prop.includes('@media'));
      expect(keysForResponsiveStyles).to.deep.equal([
        '@media (min-width:0px)',
        '@media (min-width:900px)',
        '@media (min-width:1200px)',
        '@media (min-width:1536px)',
      ]);
    });
  });
});
