import { describe, it, expect } from 'vitest';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import {
  alpha as systemAlpha,
  lighten as systemLighten,
  darken as systemDarken,
} from '@mui/system/colorManipulator';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import GlobalStyles from '@mui/material/GlobalStyles';
import OutlinedInput, { outlinedInputClasses } from '@mui/material/OutlinedInput';
import SystemThemeProvider from '@mui/system/ThemeProvider';
import { ThemeProvider, THEME_ID, createTheme, styled } from '@mui/material/styles';
import { deepOrange, green, grey } from '@mui/material/colors';
import createPalette from './createPalette';

const lightPalette = createPalette({ mode: 'light' });
const darkPalette = createPalette({ mode: 'dark' });

const isJSDOM = isJsdom();

describe('createTheme', () => {
  const { render } = createRenderer();

  it('should not create vars if cssVariables: false', () => {
    const theme = createTheme({ cssVariables: false });
    expect(theme.cssVariables).to.equal(false);
    expect('vars' in theme).to.equal(false);
  });

  it('color schemes dark: true', () => {
    const theme = createTheme({ cssVariables: false, colorSchemes: { dark: true } });
    const { light, dark } = theme.colorSchemes;
    expect(light.palette.primary.main).to.deep.equal(lightPalette.primary.main);
    expect(dark.palette.primary.main).to.deep.equal(darkPalette.primary.main);
  });

  it('color schemes light: true', () => {
    const theme = createTheme({
      cssVariables: false,
      colorSchemes: { light: true },
      palette: { mode: 'dark' },
    });
    const { light, dark } = theme.colorSchemes || {};
    expect(light?.palette.primary.main).to.deep.equal(lightPalette.primary.main);
    expect(dark?.palette.primary.main).to.deep.equal(darkPalette.primary.main);
  });

  it('should provide spacing in px', () => {
    const theme = createTheme({ cssVariables: false });
    expect(theme.spacing(1)).to.equal('8px');
  });

  it('should have a palette', () => {
    const theme = createTheme();
    expect(typeof createTheme).to.equal('function');
    expect(typeof theme.palette).to.equal('object');
  });

  it('should have the custom palette', () => {
    const theme = createTheme({
      palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
    });
    expect(theme.palette.primary.main).to.equal(deepOrange[500]);
    expect(theme.palette.secondary.main).to.equal(green.A400);
  });

  it('should be customizable through `colorSchemes` node', () => {
    const theme = createTheme({
      colorSchemes: {
        dark: {
          palette: {
            background: {
              default: grey[900],
            },
          },
        },
        light: {
          palette: {
            background: {
              default: grey[50],
            },
            bg: {
              main: grey[800],
              dark: grey[700],
            },
          },
        },
      },
    });
    expect(theme.colorSchemes.dark.palette.background.default).to.equal(grey[900]);
    expect(theme.colorSchemes.light.palette.background.default).to.equal(grey[50]);
    expect(theme.colorSchemes.light.palette.bg.main).to.equal(grey[800]);
    expect(theme.colorSchemes.light.palette.bg.dark).to.equal(grey[700]);
    expect(theme.palette.mode).to.equal('light');
    expect(theme.palette.background.default).to.equal(grey[50]);
  });

  it('should be customizable through `colorSchemes` node with non-existing fields', () => {
    const theme = createTheme({
      colorSchemes: {
        dark: {
          opacity: {
            disabled: 0.38,
          },
          palette: {
            gradient: 'linear-gradient(90deg, #000000 0%, #ffffff 100%)',
          },
        },
        light: {
          opacity: {
            disabled: 0.5,
          },
          palette: {
            gradient: 'linear-gradient(90deg, #ffffff 0%, #000000 100%)',
          },
        },
      },
    });
    expect(theme.colorSchemes.dark.opacity.disabled).to.equal(0.38);
    expect(theme.colorSchemes.light.opacity.disabled).to.equal(0.5);
    expect(theme.colorSchemes.dark.palette.gradient).to.equal(
      'linear-gradient(90deg, #000000 0%, #ffffff 100%)',
    );
    expect(theme.colorSchemes.light.palette.gradient).to.equal(
      'linear-gradient(90deg, #ffffff 0%, #000000 100%)',
    );
  });

  it('should work with `palette` and `colorSchemes`', () => {
    const theme = createTheme({
      palette: {
        primary: {
          main: '#27272a',
        },
        background: {
          default: '#f5f5f5',
        },
      },
      colorSchemes: {
        dark: true,
      },
    });
    expect(theme.palette.primary.main).to.equal('#27272a');
    expect(theme.palette.background.default).to.equal('#f5f5f5');
    expect(theme.colorSchemes.light.palette.primary.main).to.equal('#27272a');
    expect(theme.colorSchemes.light.palette.background.default).to.equal('#f5f5f5');
    expect(theme.colorSchemes.dark.palette.primary.main).to.equal(darkPalette.primary.main);
    expect(theme.colorSchemes.dark.palette.background.default).to.equal(
      darkPalette.background.default,
    );
  });

  it('should work with `palette` and a custom `colorSchemes.dark`', () => {
    const theme = createTheme({
      palette: {
        background: {
          default: '#f5f5f5',
        },
      },
      colorSchemes: {
        dark: {
          palette: {
            background: {
              default: 'red',
            },
          },
        },
      },
    });
    expect(theme.palette.background.default).to.equal('#f5f5f5');
    expect(theme.colorSchemes.light.palette.background.default).to.equal('#f5f5f5');
    expect(theme.colorSchemes.dark.palette.background.default).to.equal('red');
  });

  describe('CSS variables', () => {
    it('should have default light with media selector if no `palette` and colorSchemes.dark is provided', () => {
      const theme = createTheme({
        cssVariables: true,
        colorSchemes: { dark: true },
      });
      expect(theme.defaultColorScheme).to.equal('light');
      expect(theme.colorSchemeSelector).to.equal('media');
      expect(theme.colorSchemes.light).not.to.equal(undefined);
      expect(theme.colorSchemes.dark).not.to.equal(undefined);
    });

    it('should have a light as a default colorScheme if only `palette` is provided', () => {
      const theme = createTheme({
        cssVariables: true,
        palette: { primary: { main: deepOrange[500] } },
      });
      expect(theme.defaultColorScheme).to.equal('light');
      expect(theme.vars.palette.primary.main).to.equal(
        `var(--mui-palette-primary-main, ${deepOrange[500]})`,
      );
    });

    it('should have a dark as a default colorScheme if only `palette` is provided', () => {
      const theme = createTheme({
        cssVariables: true,
        palette: {
          mode: 'dark',
          primary: { main: deepOrange[500] },
        },
      });
      expect(theme.defaultColorScheme).to.equal('dark');
      expect(theme.palette.primary.main).to.equal(deepOrange[500]);
      expect(theme.vars.palette.primary.main).to.equal(
        `var(--mui-palette-primary-main, ${deepOrange[500]})`,
      );
    });

    it('should have light and dark colorSchemes', () => {
      const theme = createTheme({
        cssVariables: true,
        colorSchemes: { dark: true },
      });
      expect(theme.colorSchemes.light).not.to.equal(undefined);
      expect(theme.colorSchemes.dark).not.to.equal(undefined);
    });

    it('should not have light if default color scheme is set to dark', () => {
      const theme = createTheme({
        cssVariables: true,
        colorSchemes: { dark: true },
        defaultColorScheme: 'dark',
      });
      expect(theme.colorSchemes.light).to.equal(undefined);
      expect(theme.colorSchemes.dark).not.to.equal(undefined);
    });

    it('should be able to customize tonal offset', () => {
      const theme = createTheme({
        cssVariables: true,
        palette: {
          primary: {
            main: green[500],
          },
          tonalOffset: {
            light: 0.1,
            dark: 0.9,
          },
        },
      });
      expect(theme.palette.primary.main).to.equal('#4caf50');
    });

    it('should include the `text.primaryChannel` value in the Skeleton background fallback', () => {
      const theme = createTheme({
        cssVariables: true,
        colorSchemes: { light: true, dark: true },
      });
      expect(theme.vars.palette.Skeleton.bg).to.equal(
        'var(--mui-palette-Skeleton-bg, rgba(var(--mui-palette-text-primaryChannel, 0 0 0) / 0.11))',
      );
      expect(theme.colorSchemes.dark.palette.Skeleton.bg).to.equal(
        'rgba(var(--mui-palette-text-primaryChannel, 255 255 255) / 0.13)',
      );
    });

    it('should generate variables for a palette color added in a second call', () => {
      let theme = createTheme({ cssVariables: true });
      // `cssVariables` isn't stored on the theme, so it's passed again
      theme = createTheme(
        { ...theme, cssVariables: true },
        {
          palette: {
            salmon: theme.palette.augmentColor({ color: { main: '#FF5733' }, name: 'salmon' }),
          },
        },
      );

      expect(theme.palette.salmon.main).to.equal('#FF5733');
      expect(theme.vars.palette.salmon.main).to.equal('var(--mui-palette-salmon-main, #FF5733)');
      expect(theme.vars.palette.salmon.mainChannel).to.equal(
        'var(--mui-palette-salmon-mainChannel, 255 87 51)',
      );

      expect(() =>
        render(
          <ThemeProvider theme={theme}>
            <Button color="salmon">Salmon</Button>
          </ThemeProvider>,
        ),
      ).not.to.throw();
    });

    it('should add a palette color from a second call to the default color scheme', () => {
      let theme = createTheme({ cssVariables: true, colorSchemes: { light: true, dark: true } });
      theme = createTheme(
        { ...theme, cssVariables: true },
        {
          palette: {
            salmon: theme.palette.augmentColor({ color: { main: '#FF5733' }, name: 'salmon' }),
          },
        },
      );

      // Like the `palette` option, it goes to the default color scheme only
      expect(theme.colorSchemes.light.palette.salmon.main).to.equal('#FF5733');
      expect(theme.colorSchemes.dark.palette.salmon).to.equal(undefined);
    });

    it('should generate the channels of palette colors replaced in a second call', () => {
      let theme = createTheme({ cssVariables: true });
      theme = createTheme(
        { ...theme, cssVariables: true },
        { palette: { primary: { main: '#ff0000' }, divider: '#00ff00' } },
      );

      expect(theme.palette.primary.mainChannel).to.equal('255 0 0');
      expect(theme.palette.dividerChannel).to.equal('0 255 0');
    });

    describe('spacing', () => {
      it('should provide the default spacing', () => {
        const theme = createTheme({ cssVariables: true });
        expect(theme.spacing(1)).to.equal(`var(--mui-spacing, 8px)`);
        expect(theme.spacing(2)).to.equal(`calc(2 * var(--mui-spacing, 8px))`);
      });
    });

    describe('spacing array', () => {
      it('should create spacing vars array', () => {
        const theme = createTheme({ cssVariables: true, spacing: [0, 4, 8] });
        expect(theme.vars.spacing).to.deep.equal([
          'var(--mui-spacing-0, 0px)',
          'var(--mui-spacing-1, 4px)',
          'var(--mui-spacing-2, 8px)',
        ]);
      });

      it('should work with positive input', () => {
        const theme = createTheme({ cssVariables: true, spacing: [0, 4, 8] });
        expect(theme.spacing(1)).to.equal(`var(--mui-spacing-1, 4px)`);
        expect(theme.spacing(2)).to.equal(`var(--mui-spacing-2, 8px)`);
      });

      it('should work with negative input', () => {
        const theme = createTheme({ cssVariables: true, spacing: [0, 4, 8] });
        expect(theme.spacing(-1)).to.equal(`calc(-1 * var(--mui-spacing-1, 4px))`);
        expect(theme.spacing(-2)).to.equal(`calc(-1 * var(--mui-spacing-2, 8px))`);
      });
    });
  });

  describe('motion', () => {
    it('should provide the default values', () => {
      const theme = createTheme();

      expect(theme.motion.reducedMotion).to.equal('never');
    });

    it('should provide custom values', () => {
      const theme = createTheme({
        motion: {
          reducedMotion: 'system',
        },
      });

      expect(theme.motion.reducedMotion).to.equal('system');
    });
  });

  describe('transitions', () => {
    it('[`easing`]: should provide the default values', () => {
      const theme = createTheme();
      expect(theme.transitions.easing.easeInOut).to.equal('cubic-bezier(0.4, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeOut).to.equal('cubic-bezier(0.0, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeIn).to.equal('cubic-bezier(0.4, 0, 1, 1)');
      expect(theme.transitions.easing.sharp).to.equal('cubic-bezier(0.4, 0, 0.6, 1)');
    });

    it('[`duration`]: should provide the default values', () => {
      const theme = createTheme();
      expect(theme.transitions.duration.shortest).to.equal(150);
      expect(theme.transitions.duration.shorter).to.equal(200);
      expect(theme.transitions.duration.short).to.equal(250);
      expect(theme.transitions.duration.standard).to.equal(300);
      expect(theme.transitions.duration.complex).to.equal(375);
      expect(theme.transitions.duration.enteringScreen).to.equal(225);
      expect(theme.transitions.duration.leavingScreen).to.equal(195);
    });

    it('[`easing`]: should provide the custom values', () => {
      const theme = createTheme({
        transitions: {
          easing: {
            easeInOut: 'cubic-bezier(1, 1, 1, 1)',
            easeOut: 'cubic-bezier(1, 1, 1, 1)',
            easeIn: 'cubic-bezier(1, 1, 1, 1)',
            sharp: 'cubic-bezier(1, 1, 1, 1)',
          },
        },
      });
      expect(theme.transitions.easing.easeInOut).to.equal('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.easeOut).to.equal('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.easeIn).to.equal('cubic-bezier(1, 1, 1, 1)');
      expect(theme.transitions.easing.sharp).to.equal('cubic-bezier(1, 1, 1, 1)');
    });

    it('[`duration`]: should provide the custom values', () => {
      const theme = createTheme({
        transitions: {
          duration: {
            shortest: 1,
            shorter: 1,
            short: 1,
            standard: 1,
            complex: 1,
            enteringScreen: 1,
            leavingScreen: 1,
          },
        },
      });
      expect(theme.transitions.duration.shortest).to.equal(1);
      expect(theme.transitions.duration.shorter).to.equal(1);
      expect(theme.transitions.duration.short).to.equal(1);
      expect(theme.transitions.duration.standard).to.equal(1);
      expect(theme.transitions.duration.complex).to.equal(1);
      expect(theme.transitions.duration.enteringScreen).to.equal(1);
      expect(theme.transitions.duration.leavingScreen).to.equal(1);
    });

    it('should allow providing a partial structure', () => {
      const theme = createTheme({ transitions: { duration: { shortest: 150 } } });
      expect(theme.transitions.duration.shorter).not.to.equal(undefined);
    });
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const theme = createTheme();
      expect(theme.shadows[2]).to.equal(
        '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      );
    });

    it('should override the array as expected', () => {
      const shadows = [
        'none',
        1,
        1,
        1,
        2,
        3,
        3,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        7,
        8,
        8,
        8,
        9,
        9,
        10,
        10,
        10,
        11,
        11,
      ];
      const theme = createTheme({ shadows });
      expect(theme.shadows).to.equal(shadows);
    });
  });

  describe('components', () => {
    it('should have the components as expected', () => {
      const components = {
        MuiDialog: {
          defaultProps: {
            fullScreen: true,
            fullWidth: false,
          },
        },
        MuiButtonBase: {
          defaultProps: {
            disableRipple: true,
          },
        },
        MuiPopover: {
          defaultProps: {
            container: document.createElement('div'),
          },
        },
      };
      const theme = createTheme({ components });
      expect(theme.components).to.deep.equal(components);
    });
  });

  describe('styleOverrides', () => {
    it('should warn when trying to override an internal state the wrong way', () => {
      let theme;

      expect(() => {
        theme = createTheme({
          components: { Button: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).not.toErrorDev();
      expect(Object.keys(theme.components.Button.styleOverrides.disabled).length).to.equal(1);

      expect(() => {
        theme = createTheme({
          components: { MuiButton: { styleOverrides: { root: { color: 'blue' } } } },
        });
      }).not.toErrorDev();

      expect(() => {
        theme = createTheme({
          components: { MuiButton: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).toErrorDev(
        'MUI: The `MuiButton` component increases the CSS specificity of the `disabled` internal state.',
      );
      expect(Object.keys(theme.components.MuiButton.styleOverrides.disabled).length).to.equal(0);
    });
  });

  describe('focusVisible', () => {
    it('`true` resolves to the curated ring using the palette primary color', () => {
      const theme = createTheme({ cssVariables: false, focusVisible: true });
      expect(theme.focusVisible).to.deep.equal({
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.palette.primary.main,
        // Offset is a fixed curated 2px, wrapped in a per-component sign flip
        // (`--_focusVisible-offset`: 1 outset / -1 inset) so a clip-prone component insets it.
        outlineOffset: 'calc(var(--_focusVisible-offset, 1) * 2px)',
        // Invisible by default (`0 0` is clipped away); a solid-background parent (AppBar, Alert,
        // SnackbarContent) sets `--_focusVisible-shadow` to draw a contrasting ring behind the outline.
        boxShadow: 'var(--_focusVisible-behavior, ) var(--_focusVisible-shadow, 0 0)',
      });
    });

    it('an object merges over the curated default, keeping geometry', () => {
      const theme = createTheme({ cssVariables: false, focusVisible: { outlineColor: 'red' } });
      expect(theme.focusVisible.outlineColor).to.equal('red');
      expect(theme.focusVisible.outlineStyle).to.equal('solid');
      expect(theme.focusVisible.outlineWidth).to.equal(2);
    });

    it('`outlineColor: transparent` removes the visible outline but keeps the object', () => {
      const theme = createTheme({
        cssVariables: false,
        focusVisible: { outlineColor: 'transparent' },
      });
      expect(theme.focusVisible.outlineColor).to.equal('transparent');
      expect(theme.focusVisible.outlineStyle).to.equal('solid');
    });

    it('a boxShadow is additive on the outline and gets the inset behavior var prepended', () => {
      const theme = createTheme({
        cssVariables: false,
        focusVisible: { boxShadow: '0 0 0 4px #fff' },
      });
      expect(theme.focusVisible.boxShadow).to.equal(
        'var(--_focusVisible-behavior, ) 0 0 0 4px #fff',
      );
      expect(theme.focusVisible.outlineStyle).to.equal('solid');
      expect(theme.focusVisible.outlineColor).to.equal(theme.palette.primary.main);
    });

    it('does not prepend the behavior var to a boxShadow that already opts into inset', () => {
      const theme = createTheme({
        cssVariables: false,
        focusVisible: { boxShadow: 'inset 0 0 0 4px #fff' },
      });
      expect(theme.focusVisible.boxShadow).to.equal('inset 0 0 0 4px #fff');
    });

    it('does not prepend the behavior var to standalone box-shadow keywords', () => {
      ['none', 'inherit', 'unset'].forEach((keyword) => {
        const theme = createTheme({
          cssVariables: false,
          focusVisible: { boxShadow: keyword },
        });
        // prefixing would produce e.g. `inset none` — an invalid declaration on clip-prone components
        expect(theme.focusVisible.boxShadow).to.equal(keyword);
      });
    });

    it('`false` and `undefined` leave focusVisible off (non-breaking)', () => {
      expect(createTheme({ cssVariables: false, focusVisible: false }).focusVisible).to.equal(
        false,
      );
      expect(createTheme({ cssVariables: false }).focusVisible).to.equal(undefined);
    });

    it('vars theme: curated color is a scheme-reactive palette var, focusVisible is kept inline', () => {
      const theme = createTheme({ cssVariables: true, focusVisible: true });
      // scheme-reactive: resolves through the palette var, correct in dark mode
      expect(theme.focusVisible.outlineColor).to.equal('var(--mui-palette-primary-main)');
      // no `--mui-focusVisible-*` var: the recipe stays inline (see `shouldSkipGeneratingVar`)
      expect(theme.vars.focusVisible).to.equal(undefined);
      expect(theme.focusVisible.outlineWidth).to.equal(2);
      expect(theme.focusVisible.outlineOffset).to.equal(
        'calc(var(--_focusVisible-offset, 1) * 2px)',
      );
    });

    it('outlineOffset is a fixed curated 2px, a custom width does not scale it, a custom offset is inset-aware', () => {
      const auto = createTheme({ cssVariables: false, focusVisible: true });
      expect(auto.focusVisible.outlineOffset).to.equal(
        'calc(var(--_focusVisible-offset, 1) * 2px)',
      );
      const wide = createTheme({ cssVariables: false, focusVisible: { outlineWidth: 4 } });
      expect(wide.focusVisible.outlineOffset).to.equal(
        'calc(var(--_focusVisible-offset, 1) * 2px)',
      );
      const fixed = createTheme({ cssVariables: false, focusVisible: { outlineOffset: 6 } });
      expect(fixed.focusVisible.outlineOffset).to.equal(
        'calc(var(--_focusVisible-offset, 1) * 6px)',
      );
    });

    it('normalizes `focusVisible` passed as a merge argument (non-vars and vars)', () => {
      const merged = createTheme({ cssVariables: false }, { focusVisible: true }).focusVisible;
      expect(merged.outlineStyle).to.equal('solid');
      expect(merged.outlineColor).to.equal(createTheme().palette.primary.main);
      const varsTheme = createTheme({ cssVariables: true }, { focusVisible: true });
      expect(varsTheme.focusVisible.outlineColor).to.equal('var(--mui-palette-primary-main)');
      expect(varsTheme.vars.focusVisible).to.equal(undefined);
    });

    it('re-composing a resolved theme does not double-wrap the offset (idempotent)', () => {
      // Wrapping the offset calc twice would be `(-1 * -1)` = outset on clip-prone components,
      // clipping the ring after re-composition.
      const base = createTheme({ cssVariables: false, focusVisible: true });
      const recomposed = createTheme({ cssVariables: false, focusVisible: base.focusVisible });
      expect(recomposed.focusVisible.outlineOffset).to.equal(
        'calc(var(--_focusVisible-offset, 1) * 2px)',
      );
      const merged = createTheme(base, { cssVariables: false });
      expect(merged.focusVisible.outlineOffset).to.equal(
        'calc(var(--_focusVisible-offset, 1) * 2px)',
      );
    });

    it('no-vars colorSchemes: each scheme carries its own primary so dark mode stays reactive', () => {
      // Regression: without a per-scheme copy the outline froze to the light primary in dark mode.
      const theme = createTheme({
        cssVariables: false,
        focusVisible: true,
        colorSchemes: { light: true, dark: true },
      });
      expect(theme.colorSchemes.light.focusVisible.outlineColor).to.equal(
        theme.colorSchemes.light.palette.primary.main,
      );
      expect(theme.colorSchemes.dark.focusVisible.outlineColor).to.equal(
        theme.colorSchemes.dark.palette.primary.main,
      );
      // else the test is vacuous
      expect(theme.colorSchemes.light.palette.primary.main).not.to.equal(
        theme.colorSchemes.dark.palette.primary.main,
      );
    });

    it('no-vars colorSchemes: a custom outlineColor stays identical across schemes', () => {
      const theme = createTheme({
        cssVariables: false,
        focusVisible: { outlineColor: 'rgb(255, 0, 0)' },
        colorSchemes: { light: true, dark: true },
      });
      expect(theme.colorSchemes.light.focusVisible.outlineColor).to.equal('rgb(255, 0, 0)');
      expect(theme.colorSchemes.dark.focusVisible.outlineColor).to.equal('rgb(255, 0, 0)');
    });

    it('no-vars colorSchemes: an explicit outlineColor equal to the default stays pinned', () => {
      const pinned = createTheme({ cssVariables: false }).palette.primary.main;
      const theme = createTheme({
        cssVariables: false,
        focusVisible: { outlineColor: pinned },
        colorSchemes: { light: true, dark: true },
      });
      expect(theme.colorSchemes.light.focusVisible.outlineColor).to.equal(pinned);
      expect(theme.colorSchemes.dark.focusVisible.outlineColor).to.equal(pinned);
      // else the test is vacuous — dark would otherwise resolve to its own primary
      expect(theme.colorSchemes.dark.palette.primary.main).not.to.equal(pinned);
    });

    it('no-vars colorSchemes: an explicit outlineColor from a merge argument stays pinned', () => {
      const pinned = createTheme({ cssVariables: false }).palette.primary.main;
      const theme = createTheme(
        { cssVariables: false, colorSchemes: { light: true, dark: true }, focusVisible: true },
        { focusVisible: { outlineColor: pinned } },
      );
      expect(theme.colorSchemes.dark.focusVisible.outlineColor).to.equal(pinned);
    });

    it('no-vars colorSchemes: an unset outlineColor still resolves per scheme', () => {
      const theme = createTheme({
        cssVariables: false,
        focusVisible: { outlineWidth: 4 },
        colorSchemes: { light: true, dark: true },
      });
      expect(theme.colorSchemes.dark.focusVisible.outlineColor).to.equal(
        theme.colorSchemes.dark.palette.primary.main,
      );
      expect(theme.colorSchemes.light.focusVisible.outlineColor).to.equal(
        theme.colorSchemes.light.palette.primary.main,
      );
    });

    it('resolves the ring color against the merged palette, not the options palette', () => {
      const theme = createTheme(
        { cssVariables: false, focusVisible: true },
        { palette: { primary: { main: '#e91e63' } } },
      );
      expect(theme.palette.primary.main).to.equal('#e91e63');
      expect(theme.focusVisible.outlineColor).to.equal('#e91e63');
    });

    it('deep-merges focusVisible across options and merge arguments (both var modes)', () => {
      [false, true].forEach((cssVariables) => {
        const theme = createTheme(
          { cssVariables, focusVisible: { outlineStyle: 'dashed' } },
          { focusVisible: { outlineWidth: 4 } },
        );
        expect(theme.focusVisible.outlineStyle).to.equal('dashed');
        expect(theme.focusVisible.outlineWidth).to.equal(4);
      });
    });

    it('no-vars colorSchemes: scheme copies use the same merged input as the root', () => {
      const theme = createTheme(
        {
          cssVariables: false,
          colorSchemes: { light: true, dark: true },
          focusVisible: { outlineStyle: 'dashed' },
        },
        { focusVisible: { outlineWidth: 4 } },
      );
      expect(theme.focusVisible.outlineStyle).to.equal('dashed');
      expect(theme.focusVisible.outlineWidth).to.equal(4);
      expect(theme.colorSchemes.light.focusVisible.outlineStyle).to.equal('dashed');
      expect(theme.colorSchemes.light.focusVisible.outlineWidth).to.equal(4);
      expect(theme.colorSchemes.dark.focusVisible.outlineStyle).to.equal('dashed');
      expect(theme.colorSchemes.dark.focusVisible.outlineWidth).to.equal(4);
    });

    it('recomposing a no-vars colorSchemes theme keeps the ring scheme-reactive', () => {
      const base = createTheme({
        cssVariables: false,
        colorSchemes: { light: true, dark: true },
        focusVisible: true,
      });
      const recomposed = createTheme(base, {});
      // the baked light hex must not leak into the dark scheme through re-resolution
      expect(recomposed.colorSchemes.dark.focusVisible.outlineColor).to.equal(
        base.colorSchemes.dark.palette.primary.main,
      );
      expect(recomposed.colorSchemes.light.focusVisible.outlineColor).to.equal(
        base.colorSchemes.light.palette.primary.main,
      );
    });

    it('recomposing keeps an explicit custom outlineColor on every scheme', () => {
      const base = createTheme({
        cssVariables: false,
        colorSchemes: { light: true, dark: true },
        focusVisible: { outlineColor: 'rgb(255, 0, 0)' },
      });
      const recomposed = createTheme(base, {});
      expect(recomposed.colorSchemes.light.focusVisible.outlineColor).to.equal('rgb(255, 0, 0)');
      expect(recomposed.colorSchemes.dark.focusVisible.outlineColor).to.equal('rgb(255, 0, 0)');
    });

    it('recompose + palette change: re-passing focusVisible re-derives the ring color (the documented workaround)', () => {
      // Without re-passing, the baked color from the old palette is kept (accepted limitation).
      const base = createTheme({ cssVariables: false, focusVisible: true });
      const recomposed = createTheme({
        ...base,
        palette: { primary: { main: '#2e7d32' } },
        focusVisible: true,
      });
      expect(recomposed.palette.primary.main).to.equal('#2e7d32');
      expect(recomposed.focusVisible.outlineColor).to.equal('#2e7d32');
    });

    it('recompose + palette change on a colorSchemes theme: re-passing focusVisible keeps every scheme reactive', () => {
      const base = createTheme({
        cssVariables: false,
        colorSchemes: { light: true, dark: true },
        focusVisible: true,
      });
      // The root `palette` key feeds the default (light) scheme — overriding via
      // `colorSchemes.light.palette` is a no-op here because the spread root palette wins.
      const recomposed = createTheme({
        ...base,
        palette: { primary: { main: '#2e7d32' } },
        focusVisible: true,
      });
      expect(recomposed.colorSchemes.light.focusVisible.outlineColor).to.equal('#2e7d32');
      expect(recomposed.colorSchemes.dark.focusVisible.outlineColor).to.equal(
        recomposed.colorSchemes.dark.palette.primary.main,
      );
      expect(recomposed.colorSchemes.dark.focusVisible.outlineColor).not.to.equal('#2e7d32');
    });

    it('recompose + palette change via the merge-argument path: re-passing focusVisible re-derives', () => {
      const base = createTheme({ cssVariables: false, focusVisible: true });
      const recomposed = createTheme(base, {
        palette: { primary: { main: '#2e7d32' } },
        focusVisible: true,
      });
      expect(recomposed.palette.primary.main).to.equal('#2e7d32');
      expect(recomposed.focusVisible.outlineColor).to.equal('#2e7d32');
    });
  });

  it('shallow merges multiple arguments', () => {
    const theme = createTheme({ foo: 'I am foo' }, { bar: 'I am bar' });
    expect(theme.foo).to.equal('I am foo');
    expect(theme.bar).to.equal('I am bar');
  });

  it('deep merges multiple arguments', () => {
    const theme = createTheme({ custom: { foo: 'I am foo' } }, { custom: { bar: 'I am bar' } });
    expect(theme.custom.foo).to.equal('I am foo');
    expect(theme.custom.bar).to.equal('I am bar');
  });

  it('allows callbacks using theme in variants', () => {
    const theme = createTheme({
      typography: {
        fontFamily: 'cursive',
      },
      components: {
        MuiButton: {
          variants: [
            {
              props: {}, // match any props combination
              style: ({ theme: t }) => {
                return {
                  fontFamily: t.typography.fontFamily,
                };
              },
            },
          ],
        },
      },
    });

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Button />
      </ThemeProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ fontFamily: 'cursive' });
  });

  it.skipIf(isJSDOM)(
    'should apply the correct borderRadius styles via sx prop if theme values are 0',
    function test() {
      const theme = createTheme({
        shape: {
          borderRadius: 0,
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Box sx={{ width: '2rem', height: '2rem', borderRadius: 4 }} />
        </ThemeProvider>,
      );

      expect(container.firstChild).toHaveComputedStyle({
        borderTopLeftRadius: '0px',
        borderBottomLeftRadius: '0px',
        borderTopRightRadius: '0px',
        borderBottomRightRadius: '0px',
      });
    },
  );

  it('should apply dark styles when using applyStyles if mode="dark"', function test() {
    const darkTheme = createTheme({
      palette: {
        mode: 'dark',
      },
    });

    const Test = styled('div')(({ theme }) => ({
      backgroundColor: 'rgb(255, 255, 255)',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgb(0, 0, 0)',
      }),
    }));

    const { container } = render(
      <ThemeProvider theme={darkTheme}>
        <Test />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      backgroundColor: 'rgb(0, 0, 0)',
    });
  });

  it('should not apply dark styles when using applyStyles if mode="light"', function test() {
    const lightTheme = createTheme();

    const Test = styled('div')(({ theme }) => ({
      backgroundColor: 'rgb(255, 255, 255)',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgb(0, 0, 0)',
      }),
    }));

    const { container } = render(
      <ThemeProvider theme={lightTheme}>
        <Test />
      </ThemeProvider>,
    );

    expect(container.firstChild).toHaveComputedStyle({
      backgroundColor: 'rgb(255, 255, 255)',
    });
  });

  it('should return the styles directly when using applyStyles if the selector is `&`', function test() {
    const theme = createTheme({ cssVariables: true, palette: { mode: 'dark' } });

    expect(theme.applyStyles('dark', { color: 'red' })).to.deep.equal({ color: 'red' });
  });

  it('Throw an informative error when the key `vars` is passed as part of `options` passed', () => {
    try {
      createTheme({
        vars: {
          primary: '#EF14E2',
        },
      });
    } catch (error) {
      expect(error.message).to.equal(
        'MUI: `vars` is a private field used for CSS variables support.\n' +
          'Please use another name or follow the [docs](https://next.mui.com/material-ui/customization/css-theme-variables/usage/) to enable the feature.',
      );
    }
  });

  it('should not throw for nested theme that includes `vars` node', () => {
    const outerTheme = createTheme({
      cssVariables: true,
      palette: {
        secondary: {
          main: deepOrange[500],
        },
      },
    });

    expect(() =>
      render(
        <ThemeProvider theme={outerTheme}>
          <ThemeProvider
            theme={(theme) => {
              return createTheme({
                ...theme,
                palette: {
                  ...theme.palette,
                  primary: {
                    main: green[500],
                  },
                },
              });
            }}
          />
        </ThemeProvider>,
      ),
    ).not.to.throw();
  });

  it('should create a new object', () => {
    const defaultTheme = createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
      },
      colorSchemes: { dark: true },
    });

    expect(
      defaultTheme.generateStyleSheets()[2]['[data-mui-color-scheme="dark"]'][
        '--mui-palette-background-defaultChannel'
      ],
    ).to.equal('18 18 18');

    const theme = createTheme({
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
        cssVarPrefix: 'template',
      },
      colorSchemes: {
        dark: {
          palette: {
            background: {
              default: 'hsl(220, 35%, 3%)',
              paper: 'hsl(220, 30%, 7%)',
            },
          },
        },
      },
    });

    expect(
      theme.generateStyleSheets()[2]['[data-mui-color-scheme="dark"]'][
        '--template-palette-background-defaultChannel'
      ],
    ).to.equal('5 7 10');
  });

  it('should have `toRuntimeSource` for integrating with Pigment CSS', () => {
    const theme = createTheme();
    expect(typeof theme.toRuntimeSource).to.equal('function');

    const themeCssVars = createTheme({ cssVariables: true });
    expect(typeof themeCssVars.toRuntimeSource).to.equal('function');
  });

  describe('color manipulators', () => {
    it('should have the color manipulators', () => {
      const theme = createTheme();
      expect(typeof theme.alpha).to.equal('function');
      expect(typeof theme.lighten).to.equal('function');
      expect(typeof theme.darken).to.equal('function');
    });

    it('should have the color manipulators with CSS variables', () => {
      const theme = createTheme({ cssVariables: true });
      expect(typeof theme.alpha).to.equal('function');
      expect(typeof theme.lighten).to.equal('function');
      expect(typeof theme.darken).to.equal('function');
    });

    it('[default] should use system color manipulators', () => {
      const theme = createTheme();
      expect(theme.alpha(theme.palette.primary.main, 0.5)).to.equal(
        systemAlpha(theme.palette.primary.main, 0.5),
      );
      expect(theme.lighten(theme.palette.primary.main, 0.5)).to.equal(
        systemLighten(theme.palette.primary.main, 0.5),
      );
      expect(theme.darken(theme.palette.primary.main, 0.5)).to.equal(
        systemDarken(theme.palette.primary.main, 0.5),
      );
    });

    it('[default] `alpha()` should work with coefficient as string', () => {
      const theme = createTheme();
      expect(theme.alpha(theme.palette.primary.main, '0.3+0.2')).to.equal(
        systemAlpha(theme.palette.primary.main, 0.5),
      );
    });

    it('[CSS variables] `alpha()` should work with string and number coefficient', () => {
      const theme = createTheme({ cssVariables: true });
      expect(theme.alpha(theme.vars.palette.primary.main, 0.5)).to.equal(
        'rgba(var(--mui-palette-primary-mainChannel, 25 118 210) / 0.5)',
      );
      expect(theme.alpha(theme.vars.palette.primary.main, '0.5 + 0.3')).to.equal(
        'rgba(var(--mui-palette-primary-mainChannel, 25 118 210) / calc(0.5 + 0.3))',
      );
      expect(
        theme.alpha(
          theme.vars.palette.primary.main,
          `${theme.vars.palette.action.selectedOpacity} + ${theme.vars.palette.action.hoverOpacity}`,
        ),
      ).to.equal(
        'rgba(var(--mui-palette-primary-mainChannel, 25 118 210) / calc(var(--mui-palette-action-selectedOpacity, 0.08) + var(--mui-palette-action-hoverOpacity, 0.04)))',
      );
    });

    it('[CSS variables] `alpha()` should work with fallbacks', () => {
      const theme = createTheme({ cssVariables: true });
      const hslTheme = createTheme({
        cssVariables: true,
        palette: { primary: { main: 'hsl(210, 79%, 46%)' } },
      });
      expect(hslTheme.alpha(hslTheme.vars.palette.primary.main, 0.5)).to.equal(
        `rgba(${hslTheme.vars.palette.primary.mainChannel} / 0.5)`,
      );
      expect(theme.alpha(theme.vars.palette.text.primary, 0.5)).to.equal(
        'rgba(var(--mui-palette-text-primaryChannel, 0 0 0) / 0.5)',
      );
      expect(theme.alpha('var(--brand)', 0.5)).to.equal('rgba(var(--brandChannel) / 0.5)');
      // `color()` channels aren't sRGB, so the fallback is dropped.
      expect(theme.alpha('var(--x, color(display-p3 0.1 0.46 0.82))', 0.5)).to.equal(
        'rgba(var(--xChannel) / 0.5)',
      );
      // Fallbacks that `colorChannel()` can't parse are dropped.
      expect(theme.alpha('var(--x, currentColor)', 0.5)).to.equal('rgba(var(--xChannel) / 0.5)');
      expect(theme.alpha('var(--mui-palette-text-primary, rgba(0 0 0 / 0.87))', 0.5)).to.equal(
        'rgba(var(--mui-palette-text-primaryChannel) / 0.5)',
      );
      expect(theme.alpha('var(--x, hsl(0 0% 0% / 0.87))', 0.5)).to.equal(
        'rgba(var(--xChannel) / 0.5)',
      );
      expect(theme.alpha('var(--mui-palette-text-primary, var(--foo))', 0.5)).to.equal(
        'rgba(var(--mui-palette-text-primaryChannel) / 0.5)',
      );
      expect(
        theme.alpha('var(--mui-palette-text-primary, var(--foo, hsl(0 0 0 / 100%)))', 0.5),
      ).to.equal('rgba(var(--mui-palette-text-primaryChannel) / 0.5)');
    });

    it('[CSS variables] `alpha()` should convert raw colors to channels', () => {
      const theme = createTheme({ cssVariables: true });
      expect(theme.alpha('#1976d2', 0.5)).to.equal('rgba(25 118 210 / 0.5)');
      expect(theme.alpha('rgb(25, 118, 210)', 0.5)).to.equal('rgba(25 118 210 / 0.5)');
      expect(theme.alpha('hsl(210, 79%, 46%)', 0.5)).to.equal('rgba(25 117 210 / 0.5)');
      expect(theme.alpha(theme.palette.primary.main, '0.3 + 0.2')).to.equal(
        'rgba(25 118 210 / calc(0.3 + 0.2))',
      );
      expect(
        theme.alpha(theme.palette.primary.main, theme.vars.palette.action.hoverOpacity),
      ).to.equal('rgba(25 118 210 / calc(var(--mui-palette-action-hoverOpacity, 0.04)))');
    });

    it('[CSS variables] `alpha()` should keep raw channel strings', () => {
      const theme = createTheme({ cssVariables: true });
      expect(theme.alpha(theme.palette.primary.mainChannel, 0.4)).to.equal(
        'rgba(25 118 210 / 0.4)',
      );
    });

    it('[CSS variables] `alpha()` should keep `color()` inputs in their color space', () => {
      const theme = createTheme({ cssVariables: true });
      expect(theme.alpha('color(display-p3 0.1 0.4 0.8)', 0.5)).to.equal(
        'color(display-p3 0.1 0.4 0.8 / 0.5)',
      );
      expect(
        theme.alpha('color(display-p3 0.1 0.4 0.8)', theme.vars.palette.action.hoverOpacity),
      ).to.equal(
        'color(display-p3 0.1 0.4 0.8 / calc(var(--mui-palette-action-hoverOpacity, 0.04)))',
      );
      expect(theme.alpha('color(xyz 0.1 0.2 0.3)', 0.5)).to.equal('color(xyz 0.1 0.2 0.3 / 0.5)');
      expect(theme.alpha('color(display-p3 10% 40% 80%)', 0.5)).to.equal(
        'color(display-p3 10% 40% 80% / 0.5)',
      );
      expect(theme.alpha('color(display-p3 0.1 0.4 0.8 / 0.9)', 0.5)).to.equal(
        'color(display-p3 0.1 0.4 0.8 / 0.5)',
      );
    });

    it('[color space with CSS variables] should use CSS for manipulating colors', () => {
      const theme = createTheme({
        cssVariables: {
          nativeColor: true,
        },
        palette: {
          primary: {
            main: 'oklch(0.65 0.3 28.95)',
          },
        },
      });

      expect(theme.alpha(theme.palette.primary.main, 0.5)).to.equal(
        'oklch(from oklch(0.65 0.3 28.95) l c h / 0.5)',
      );
      expect(theme.lighten(theme.palette.primary.main, 0.5)).to.equal(
        'color-mix(in oklch, oklch(0.65 0.3 28.95), #fff 50%)',
      );
      expect(theme.darken(theme.palette.primary.main, 0.5)).to.equal(
        'color-mix(in oklch, oklch(0.65 0.3 28.95), #000 50%)',
      );
    });

    it('[color space with CSS variables] should use CSS for manipulating vars', () => {
      const theme = createTheme({
        cssVariables: {
          nativeColor: true,
        },
        palette: {
          primary: {
            main: 'oklch(0.65 0.3 28.95)',
          },
        },
      });

      expect(theme.alpha(theme.vars.palette.primary.main, 0.3)).to.equal(
        'oklch(from var(--mui-palette-primary-main, oklch(0.65 0.3 28.95)) l c h / 0.3)',
      );
      expect(theme.lighten(theme.vars.palette.primary.main, 0.3)).to.equal(
        'color-mix(in oklch, var(--mui-palette-primary-main, oklch(0.65 0.3 28.95)), #fff 30%)',
      );
      expect(theme.darken(theme.vars.palette.primary.main, 0.3)).to.equal(
        'color-mix(in oklch, var(--mui-palette-primary-main, oklch(0.65 0.3 28.95)), #000 30%)',
      );
    });

    it('mixing color space', () => {
      const theme = createTheme({
        cssVariables: {
          nativeColor: true,
        },
        palette: {
          primary: {
            main: 'oklch(0.65 0.3 28.95)',
          },
          secondary: {
            main: 'hsl(0 0% 100%)',
          },
        },
      });

      expect(theme.alpha(theme.palette.secondary.main, 0.2)).to.equal(
        'oklch(from hsl(0 0% 100%) l c h / 0.2)',
      );
      expect(theme.lighten(theme.palette.secondary.main, 0.2)).to.equal(
        'color-mix(in oklch, hsl(0 0% 100%), #fff 20%)',
      );
      expect(theme.darken(theme.palette.secondary.main, 0.2)).to.equal(
        'color-mix(in oklch, hsl(0 0% 100%), #000 20%)',
      );
    });

    it('should not warn about channel token if nativeColor is used and custom palette colors are provided', () => {
      expect(() =>
        createTheme({
          cssVariables: { nativeColor: true },
          palette: {
            divider: 'var(--mui-palette-divider)',
            background: {
              default: 'var(--mui-palette-background-default)',
              paper: 'var(--mui-palette-background-paper)',
            },
          },
        }),
      ).not.toWarnDev();
    });

    it.skipIf(isJSDOM)(
      '[CSS variables] `alpha()` colors should render without the CSS variables stylesheet',
      () => {
        // Provide the theme as is, like the default theme without a `ThemeProvider`.
        // The CSS variables aren't defined, so the `var()` fallbacks are used.
        const { container } = render(
          <SystemThemeProvider themeId={THEME_ID} theme={createTheme({ cssVariables: true })}>
            <OutlinedInput />
          </SystemThemeProvider>,
        );

        expect(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--mui-palette-common-onBackgroundChannel',
          ),
        ).to.equal('');
        // `theme.alpha(theme.vars.palette.common.onBackground, 0.23)` instead of the text color
        expect(
          container.querySelector(`.${outlinedInputClasses.notchedOutline}`),
        ).toHaveComputedStyle({ borderTopColor: 'rgba(0, 0, 0, 0.23)' });
      },
    );
  });

  // Skip WebKit and firefox because they have a slightly different value
  it.skipIf(isJSDOM || !/chrome/.test(window.navigator.userAgent))(
    'should build color-mix() on top of generated Material UI CSS variables',
    () => {
      function App() {
        const theme = createTheme({
          cssVariables: {
            nativeColor: true,
          },
        });

        return (
          <ThemeProvider theme={theme}>
            {/* This is just to replicate the global CSS file */}
            <GlobalStyles
              styles={{
                ':root': {
                  '--mui-palette-info-main': '#d3b613 !important', // !important is to take precedence over the default one. This is just for test, in real world case global CSS file should be used.
                  '--mui-palette-info-light': '#dfc21f !important',
                },
              }}
            />

            <Alert variant="standard" severity="info" data-testid="alert">
              Alert
            </Alert>
          </ThemeProvider>
        );
      }

      render(<App />);

      expect(screen.getByTestId('alert')).toHaveComputedStyle({
        backgroundColor: 'oklch(0.981465 0.01628 97.7526)', // browser converts color-mix to oklch in window.getComputedStyle()
      });
    },
  );
});
