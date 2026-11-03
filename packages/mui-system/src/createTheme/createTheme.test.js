import { describe, expect, it } from 'vitest';
import { createRenderer, isJsdom } from '@mui/internal-test-utils';
import { styled, ThemeProvider } from '@mui/system';

import createTheme from '@mui/system/createTheme';

describe('createTheme', () => {
  const { render } = createRenderer();
  const breakpointsValues = {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  };

  const round = (value) => Math.round(value * 1e5) / 1e5;

  const theme = createTheme({
    spacing: (val) => `${val * 10}px`,
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      values: breakpointsValues,
      up: (key) => {
        return `@media (min-width:${breakpointsValues[key]}px)`;
      },
    },
    unit: 'px',
    palette: {
      primary: {
        main: 'rgb(0, 0, 255)',
      },
      secondary: {
        main: 'rgb(0, 255, 0)',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontWeightLight: 300,
      fontSize: 14,
      body1: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: '1rem',
        letterSpacing: `${round(0.15 / 16)}em`,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      body2: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: `${14 / 16}rem`,
        letterSpacing: `${round(0.15 / 14)}em`,
        fontWeight: 400,
        lineHeight: 1.43,
      },
    },
  });

  describe('system', () => {
    it.skipIf(isJsdom())('resolves system when used inside styled()', function test() {
      const Test = styled('div')(({ theme: t }) =>
        t.unstable_sx({
          color: 'primary.main',
          bgcolor: 'secondary.main',
          m: 2,
          p: 1,
          fontSize: 'fontSize',
          maxWidth: 'sm',
        }),
      );

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Test />
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 255, 0)',
        marginTop: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        fontSize: '14px',
        maxWidth: '600px',
      });
    });

    it.skipIf(isJsdom())('resolves system when used inside variants', function test() {
      const themeWithVariants = {
        ...theme,
        components: {
          MuiTest: {
            variants: [
              {
                props: {}, // all props
                style: ({ theme: t }) =>
                  t.unstable_sx({
                    color: 'primary.main',
                    bgcolor: 'secondary.main',
                    m: 2,
                    p: 1,
                    fontSize: 'fontSize',
                    maxWidth: 'sm',
                  }),
              },
            ],
          },
        },
      };

      const Test = styled('div', { name: 'MuiTest', slot: 'Root' })(({ theme: t }) =>
        t.unstable_sx({
          color: 'primary.main',
          bgcolor: 'secondary.main',
          m: 2,
          p: 1,
          fontSize: 'fontSize',
          maxWidth: 'sm',
        }),
      );

      const { container } = render(
        <ThemeProvider theme={themeWithVariants}>
          <Test />
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        color: 'rgb(0, 0, 255)',
        backgroundColor: 'rgb(0, 255, 0)',
        marginTop: '20px',
        marginRight: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
        paddingTop: '10px',
        paddingRight: '10px',
        paddingBottom: '10px',
        paddingLeft: '10px',
        fontSize: '14px',
        maxWidth: '600px',
      });
    });

    it('apply correct styles', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: 'rgb(0, 0, 255)',
          },
          secondary: {
            main: 'rgb(0, 255, 0)',
          },
        },
      });

      expect(darkTheme.applyStyles('dark', { color: 'red' })).to.deep.equal({
        color: 'red',
      });
      expect(darkTheme.applyStyles('light', { color: 'salmon' })).to.deep.equal({});

      // assume switching to light theme
      darkTheme.palette.mode = 'light';
      expect(darkTheme.applyStyles('dark', { color: 'red' })).to.deep.equal({});
      expect(darkTheme.applyStyles('light', { color: 'salmon' })).to.deep.equal({
        color: 'salmon',
      });
    });

    it('apply correct styles with new theme', () => {
      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: 'rgb(0, 0, 255)',
          },
          secondary: {
            main: 'rgb(0, 255, 0)',
          },
        },
      });

      const newTheme = { ...darkTheme, palette: { mode: 'light' } };
      expect(newTheme.applyStyles('dark', { color: 'red' })).to.deep.equal({});
      expect(newTheme.applyStyles('light', { color: 'salmon' })).to.deep.equal({
        color: 'salmon',
      });
    });
  });

  it('does not throw if used without ThemeProvider', function test() {
    const Test = styled('div')(({ theme: t }) =>
      t.unstable_sx({
        color: 'primary.main',
        bgcolor: 'secondary.main',
        m: 2,
        p: 1,
        fontSize: 'fontSize',
        maxWidth: 'sm',
      }),
    );

    expect(() => render(<Test />)).not.to.throw();
  });
});
