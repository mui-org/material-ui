import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, screen, fireEvent, isJsdom } from '@mui/internal-test-utils';
import Box from '@mui/material/Box';
import {
  CssVarsProvider,
  extendTheme,
  useTheme,
  ThemeProvider,
  createTheme,
  useColorScheme,
} from '@mui/material/styles';

describe('[Material UI] ThemeProviderWithVars', () => {
  let originalMatchmedia;
  const { render } = createRenderer();
  let storage = {};

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // clear the localstorage
    storage = {};
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key) => storage[key],
        setItem: (key, value) => {
          storage[key] = value;
        },
      },
      configurable: true,
    });
    window.matchMedia = () => ({
      // Keep mocking legacy methods because @mui/material v5 still uses them
      addListener: () => {},
      addEventListener: () => {},
      removeListener: () => {},
      removeEventListener: () => {},
    });
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  describe('All CSS vars', () => {
    it('palette', () => {
      function Vars() {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="palette-primary">{JSON.stringify(theme.vars.palette.primary)}</div>
            <div data-testid="palette-secondary">
              {JSON.stringify(theme.vars.palette.secondary)}
            </div>
            <div data-testid="palette-error">{JSON.stringify(theme.vars.palette.error)}</div>
            <div data-testid="palette-info">{JSON.stringify(theme.vars.palette.info)}</div>
            <div data-testid="palette-success">{JSON.stringify(theme.vars.palette.success)}</div>
            <div data-testid="palette-warning">{JSON.stringify(theme.vars.palette.warning)}</div>
            <div data-testid="palette-text">{JSON.stringify(theme.vars.palette.text)}</div>
            <div data-testid="palette-background">
              {JSON.stringify(theme.vars.palette.background)}
            </div>
            <div data-testid="palette-divider">{JSON.stringify(theme.vars.palette.divider)}</div>
            <div data-testid="palette-action">{JSON.stringify(theme.vars.palette.action)}</div>
            <div data-testid="palette-common">{JSON.stringify(theme.vars.palette.common)}</div>
          </div>
        );
      }

      render(
        <CssVarsProvider theme={extendTheme({ colorSchemes: { light: true, dark: true } })}>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('palette-primary').textContent).to.equal(
        JSON.stringify({
          main: 'var(--mui-palette-primary-main)',
          light: 'var(--mui-palette-primary-light)',
          dark: 'var(--mui-palette-primary-dark)',
          contrastText: 'var(--mui-palette-primary-contrastText)',
          mainChannel: 'var(--mui-palette-primary-mainChannel)',
          lightChannel: 'var(--mui-palette-primary-lightChannel)',
          darkChannel: 'var(--mui-palette-primary-darkChannel)',
          contrastTextChannel: 'var(--mui-palette-primary-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-secondary').textContent).to.equal(
        JSON.stringify({
          main: 'var(--mui-palette-secondary-main)',
          light: 'var(--mui-palette-secondary-light)',
          dark: 'var(--mui-palette-secondary-dark)',
          contrastText: 'var(--mui-palette-secondary-contrastText)',
          mainChannel: 'var(--mui-palette-secondary-mainChannel)',
          lightChannel: 'var(--mui-palette-secondary-lightChannel)',
          darkChannel: 'var(--mui-palette-secondary-darkChannel)',
          contrastTextChannel: 'var(--mui-palette-secondary-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-error').textContent).to.equal(
        JSON.stringify({
          main: 'var(--mui-palette-error-main)',
          light: 'var(--mui-palette-error-light)',
          dark: 'var(--mui-palette-error-dark)',
          contrastText: 'var(--mui-palette-error-contrastText)',
          mainChannel: 'var(--mui-palette-error-mainChannel)',
          lightChannel: 'var(--mui-palette-error-lightChannel)',
          darkChannel: 'var(--mui-palette-error-darkChannel)',
          contrastTextChannel: 'var(--mui-palette-error-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-warning').textContent).to.equal(
        JSON.stringify({
          main: 'var(--mui-palette-warning-main)',
          light: 'var(--mui-palette-warning-light)',
          dark: 'var(--mui-palette-warning-dark)',
          contrastText: 'var(--mui-palette-warning-contrastText)',
          mainChannel: 'var(--mui-palette-warning-mainChannel)',
          lightChannel: 'var(--mui-palette-warning-lightChannel)',
          darkChannel: 'var(--mui-palette-warning-darkChannel)',
          contrastTextChannel: 'var(--mui-palette-warning-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-info').textContent).to.equal(
        JSON.stringify({
          main: 'var(--mui-palette-info-main)',
          light: 'var(--mui-palette-info-light)',
          dark: 'var(--mui-palette-info-dark)',
          contrastText: 'var(--mui-palette-info-contrastText)',
          mainChannel: 'var(--mui-palette-info-mainChannel)',
          lightChannel: 'var(--mui-palette-info-lightChannel)',
          darkChannel: 'var(--mui-palette-info-darkChannel)',
          contrastTextChannel: 'var(--mui-palette-info-contrastTextChannel)',
        }),
      );
      expect(screen.getByTestId('palette-success').textContent).to.equal(
        JSON.stringify({
          main: 'var(--mui-palette-success-main)',
          light: 'var(--mui-palette-success-light)',
          dark: 'var(--mui-palette-success-dark)',
          contrastText: 'var(--mui-palette-success-contrastText)',
          mainChannel: 'var(--mui-palette-success-mainChannel)',
          lightChannel: 'var(--mui-palette-success-lightChannel)',
          darkChannel: 'var(--mui-palette-success-darkChannel)',
          contrastTextChannel: 'var(--mui-palette-success-contrastTextChannel)',
        }),
      );

      expect(screen.getByTestId('palette-text').textContent).to.equal(
        JSON.stringify({
          primary: 'var(--mui-palette-text-primary)',
          secondary: 'var(--mui-palette-text-secondary)',
          disabled: 'var(--mui-palette-text-disabled)',
          icon: 'var(--mui-palette-text-icon)',
          primaryChannel: 'var(--mui-palette-text-primaryChannel)',
          secondaryChannel: 'var(--mui-palette-text-secondaryChannel)',
        }),
      );
      expect(screen.getByTestId('palette-divider').textContent).to.equal(
        '"var(--mui-palette-divider)"',
      );
      expect(screen.getByTestId('palette-background').textContent).to.equal(
        JSON.stringify({
          paper: 'var(--mui-palette-background-paper)',
          default: 'var(--mui-palette-background-default)',
          defaultChannel: 'var(--mui-palette-background-defaultChannel)',
          paperChannel: 'var(--mui-palette-background-paperChannel)',
        }),
      );
      expect(screen.getByTestId('palette-action').textContent).to.equal(
        JSON.stringify({
          active: 'var(--mui-palette-action-active)',
          hover: 'var(--mui-palette-action-hover)',
          hoverOpacity: 'var(--mui-palette-action-hoverOpacity)',
          selected: 'var(--mui-palette-action-selected)',
          selectedOpacity: 'var(--mui-palette-action-selectedOpacity)',
          disabled: 'var(--mui-palette-action-disabled)',
          disabledBackground: 'var(--mui-palette-action-disabledBackground)',
          disabledOpacity: 'var(--mui-palette-action-disabledOpacity)',
          focus: 'var(--mui-palette-action-focus)',
          focusOpacity: 'var(--mui-palette-action-focusOpacity)',
          activatedOpacity: 'var(--mui-palette-action-activatedOpacity)',
          activeChannel: 'var(--mui-palette-action-activeChannel)',
          selectedChannel: 'var(--mui-palette-action-selectedChannel)',
        }),
      );
      expect(screen.getByTestId('palette-common').textContent).to.equal(
        JSON.stringify({
          black: 'var(--mui-palette-common-black)',
          white: 'var(--mui-palette-common-white)',
          background: 'var(--mui-palette-common-background)',
          onBackground: 'var(--mui-palette-common-onBackground)',
          backgroundChannel: 'var(--mui-palette-common-backgroundChannel)',
          onBackgroundChannel: 'var(--mui-palette-common-onBackgroundChannel)',
        }),
      );
    });

    it('opacity', () => {
      function Vars() {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="opacity">{JSON.stringify(theme.vars.opacity)}</div>
          </div>
        );
      }

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('opacity').textContent).to.equal(
        JSON.stringify({
          inputPlaceholder: 'var(--mui-opacity-inputPlaceholder)',
          inputUnderline: 'var(--mui-opacity-inputUnderline)',
          switchTrackDisabled: 'var(--mui-opacity-switchTrackDisabled)',
          switchTrack: 'var(--mui-opacity-switchTrack)',
        }),
      );
    });

    it('shape', () => {
      function Vars() {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="shape">{JSON.stringify(theme.vars.shape)}</div>
          </div>
        );
      }

      render(
        <CssVarsProvider>
          <Vars />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('shape').textContent).to.equal(
        JSON.stringify({
          borderRadius: 'var(--mui-shape-borderRadius)',
        }),
      );
    });
  });

  describe('Typography', () => {
    it('contain expected typography', function test() {
      function Text() {
        const theme = useTheme();
        return <div>{Object.keys(theme.typography).join(',')}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal(
        'htmlFontSize,pxToRem,fontFamily,fontSize,fontWeightLight,fontWeightRegular,fontWeightMedium,fontWeightBold,h1,h2,h3,h4,h5,h6,subtitle1,subtitle2,body1,body2,button,caption,overline,inherit',
      );
    });
  });

  describe('Spacing', () => {
    it('provides spacing utility', function test() {
      function Text() {
        const theme = useTheme();
        return <div>{theme.spacing(2)}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('calc(2 * var(--mui-spacing))');
    });
  });

  describe('Breakpoints', () => {
    it('provides breakpoint utilities', function test() {
      function Text() {
        const theme = useTheme();
        return <div>{theme.breakpoints.up('sm')}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).to.equal('@media (min-width:600px)');
    });
  });

  describe('Skipped vars', () => {
    it('should not contain `variants` in theme.vars', () => {
      function Consumer() {
        const theme = useTheme();
        return <div>{theme.vars.variants ? 'variants' : ''}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).not.to.equal('variants');
    });

    it('should not contain `focus` in theme.vars', () => {
      function Consumer() {
        const theme = useTheme();
        return <div>{theme.vars.focus ? 'focus' : ''}</div>;
      }

      const { container } = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild?.textContent).not.to.equal('focus');
    });
  });

  it.skipIf(isJsdom() || !/WebKit/.test(window.navigator.userAgent))(
    "should use numeric values in system's spacing",
    function test() {
      render(
        <CssVarsProvider>
          <Box
            data-testid="box-1"
            sx={{
              borderRadius: '50%',
            }}
          />
          <Box
            data-testid="box-2"
            sx={{
              borderRadius: 4,
            }}
          />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('box-1')).toHaveComputedStyle({
        borderTopLeftRadius: '50%',
        borderTopRightRadius: '50%',
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
      });
      expect(screen.getByTestId('box-2')).toHaveComputedStyle({
        borderTopLeftRadius: '16px',
        borderTopRightRadius: '16px',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
      });
    },
  );

  it('warns when using `setMode` without configuring `colorSchemeSelector`', () => {
    function Test() {
      const { setMode } = useColorScheme();
      return <button onClick={() => setMode('dark')}>Dark</button>;
    }
    render(
      <ThemeProvider
        theme={createTheme({ cssVariables: true, colorSchemes: { light: true, dark: true } })}
      >
        <Test />
      </ThemeProvider>,
    );

    expect(() => {
      fireEvent.click(screen.getByText('Dark'));
    }).toErrorDev([
      'MUI: The `setMode` function has no effect if `colorSchemeSelector` is `media` (`media` is the default value).\nTo toggle the mode manually, please configure `colorSchemeSelector` to use a class or data attribute.\nTo learn more, visit https://next.mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually',
    ]);
  });

  it('do not warn when using `setMode` with `colorSchemeSelector` that is not `media`', () => {
    function Test() {
      const { setMode } = useColorScheme();
      return <button onClick={() => setMode('dark')}>Dark</button>;
    }
    render(
      <ThemeProvider
        theme={createTheme({
          cssVariables: { colorSchemeSelector: 'class' },
          colorSchemes: { light: true, dark: true },
        })}
      >
        <Test />
      </ThemeProvider>,
    );

    expect(() => {
      fireEvent.click(screen.getByText('Dark'));
    }).not.toErrorDev();
  });

  it('theme should remain the same when ThemeProvider rerenders', () => {
    const theme = createTheme({ cssVariables: true });

    function Inner() {
      const upperTheme = useTheme();
      const themeRef = React.useRef(upperTheme);
      const [changed, setChanged] = React.useState(false);
      React.useEffect(() => {
        if (themeRef.current !== upperTheme) {
          setChanged(true);
        }
      }, [upperTheme]);
      return changed ? <div data-testid="theme-changed" /> : null;
    }
    function App() {
      const [, setState] = React.useState({});
      const rerender = () => setState({});
      return (
        <ThemeProvider theme={theme}>
          <button onClick={() => rerender()}>rerender</button>
          <Inner />
        </ThemeProvider>
      );
    }
    render(<App />);

    fireEvent.click(screen.getByRole('button'));

    expect(screen.queryByTestId('theme-changed')).to.equal(null);
  });

  it('theme does not change with CSS variables', () => {
    function Toggle() {
      const [count, setCount] = React.useState(0);
      const { setMode } = useColorScheme();
      const theme = useTheme();
      React.useEffect(() => {
        setCount((prev) => prev + 1);
      }, [theme]);
      return (
        <button onClick={() => setMode('dark')}>
          {count} {theme.palette.mode}
        </button>
      );
    }

    const theme = createTheme({
      cssVariables: { colorSchemeSelector: 'class' },
      colorSchemes: { light: true, dark: true },
    });
    function App() {
      return (
        <ThemeProvider theme={theme}>
          <Toggle />
        </ThemeProvider>
      );
    }
    const view = render(<App />);

    expect(view.container).to.have.text(`2 light`);

    fireEvent.click(screen.getByRole('button'));

    expect(view.container).to.have.text(`2 light`);
  });

  it('palette mode should change if not using CSS variables', () => {
    function Toggle() {
      const [count, setCount] = React.useState(0);
      const { setMode } = useColorScheme();
      const theme = useTheme();
      React.useEffect(() => {
        setCount((prev) => prev + 1);
      }, [theme]);
      return (
        <button onClick={() => setMode('dark')}>
          {count} {theme.palette.mode} {theme.palette.primary.main}
        </button>
      );
    }

    const theme = createTheme({
      cssVariables: false,
      colorSchemes: { light: true, dark: true },
    });
    function App() {
      return (
        <ThemeProvider theme={theme}>
          <Toggle />
        </ThemeProvider>
      );
    }
    const view = render(<App />);

    expect(view.container).to.have.text(`2 light ${createTheme().palette.primary.main}`);

    fireEvent.click(screen.getByRole('button'));

    expect(view.container).to.have.text(
      `3 dark ${createTheme({ palette: { mode: 'dark' } }).palette.primary.main}`,
    );
  });

  it('`forceThemeRerender` recalculates the theme', () => {
    function Toggle() {
      const [count, setCount] = React.useState(0);
      const { setMode } = useColorScheme();
      const theme = useTheme();
      React.useEffect(() => {
        setCount((prev) => prev + 1);
      }, [theme]);
      return (
        <button onClick={() => setMode('dark')}>
          {count} {theme.palette.mode}
        </button>
      );
    }

    const theme = createTheme({
      cssVariables: { colorSchemeSelector: 'class' },
      colorSchemes: { light: true, dark: true },
    });
    function App() {
      return (
        <ThemeProvider theme={theme} forceThemeRerender>
          <Toggle />
        </ThemeProvider>
      );
    }
    const view = render(<App />);

    expect(view.container).to.have.text(`2 light`);

    fireEvent.click(screen.getByRole('button'));

    expect(view.container).to.have.text(`3 dark`);
  });
});
