import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import sinon from 'sinon';
import { createRenderer } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import { CssVarsProvider, extendTheme } from '@mui/material/styles';
import { deepOrange, green } from '@mui/material/colors';

describe('extendTheme', () => {
  let originalMatchmedia;
  const { render } = createRenderer();
  const storage = {};

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(globalThis, 'localStorage', {
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

  it('should have a light colorScheme by default', () => {
    const theme = extendTheme();
    expect(typeof extendTheme).to.equal('function');
    expect(typeof theme.colorSchemes).to.equal('object');
    expect(typeof theme.colorSchemes.light).to.equal('object');
    expect(theme.colorSchemes.dark).to.equal(undefined);
  });

  it('should have a light as a default colorScheme regardless of key order', () => {
    const theme = extendTheme({
      colorSchemes: { dark: true, light: true },
    });
    expect(theme.defaultColorScheme).to.equal('light');
  });

  it('should have "media" colorSchemeSelector', () => {
    const theme = extendTheme({ colorSchemeSelector: 'media' });
    expect(theme.colorSchemeSelector).to.equal('media');
  });

  it('should have CSS color-scheme by default', () => {
    const theme = extendTheme();
    sinon.assert.match(theme.generateStyleSheets()[1], {
      ':root': {
        colorScheme: 'light',
      },
    });
  });

  it('should have CSS color-scheme: dark', () => {
    const theme = extendTheme({ defaultColorScheme: 'dark' });
    sinon.assert.match(theme.generateStyleSheets()[1], {
      ':root': {
        colorScheme: 'dark',
      },
    });
  });

  it('should throw error if the default color scheme is invalid', () => {
    expect(() =>
      extendTheme({ colorSchemes: { dark: false }, defaultColorScheme: 'dark' }),
    ).to.throw('MUI: The `colorSchemes.dark` option is either missing or invalid.');
  });

  it('should throw error if the default color scheme is missing', () => {
    expect(() => extendTheme({ defaultColorScheme: 'paper' })).to.throw(
      'MUI: The `colorSchemes.paper` option is either missing or invalid.',
    );
  });

  it('should not attach to `colorSchemes` if the provided scheme is invalid', () => {
    const theme = extendTheme({ colorSchemes: { dark: null, light: true } });
    expect(theme.colorSchemes.dark).to.equal(undefined);
  });

  it('disableCssColorScheme should remove CSS color-scheme', () => {
    const theme = extendTheme({ disableCssColorScheme: true });
    expect(theme.generateStyleSheets()[1][':root'].colorScheme).to.equal(undefined);

    const theme2 = extendTheme({ defaultColorScheme: 'dark', disableCssColorScheme: true });
    expect(theme2.generateStyleSheets()[1][':root'].colorScheme).to.equal(undefined);
  });

  it('should have the custom color schemes', () => {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.primary.main).to.equal(deepOrange[500]);
    expect(theme.colorSchemes.light.palette.secondary.main).to.equal(green.A400);
  });

  it('should generate color channels', () => {
    const theme = extendTheme();

    expect(theme.colorSchemes.light.palette.background.defaultChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.light.palette.background.paperChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.light.palette.primary.mainChannel).to.equal('25 118 210');
    expect(theme.colorSchemes.light.palette.primary.darkChannel).to.equal('21 101 192');
    expect(theme.colorSchemes.light.palette.primary.lightChannel).to.equal('66 165 245');
    expect(theme.colorSchemes.light.palette.primary.contrastTextChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.light.palette.secondary.mainChannel).to.equal('156 39 176');
    expect(theme.colorSchemes.light.palette.secondary.darkChannel).to.equal('123 31 162');
    expect(theme.colorSchemes.light.palette.secondary.lightChannel).to.equal('186 104 200');
    expect(theme.colorSchemes.light.palette.secondary.contrastTextChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.light.palette.text.primaryChannel).to.equal('0 0 0');
    expect(theme.colorSchemes.light.palette.text.secondaryChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.light.palette.dividerChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.light.palette.action.activeChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.light.palette.action.selectedChannel).to.equal('0 0 0');
  });

  it('should generate dark color channels', () => {
    const theme = extendTheme({ defaultColorScheme: 'dark' });

    expect(theme.colorSchemes.dark.palette.background.defaultChannel).to.equal('18 18 18');

    expect(theme.colorSchemes.dark.palette.background.paperChannel).to.equal('18 18 18');

    expect(theme.colorSchemes.dark.palette.primary.mainChannel).to.equal('144 202 249');
    expect(theme.colorSchemes.dark.palette.primary.darkChannel).to.equal('66 165 245');
    expect(theme.colorSchemes.dark.palette.primary.lightChannel).to.equal('227 242 253');
    expect(theme.colorSchemes.dark.palette.primary.contrastTextChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.dark.palette.secondary.mainChannel).to.equal('206 147 216');
    expect(theme.colorSchemes.dark.palette.secondary.darkChannel).to.equal('171 71 188');
    expect(theme.colorSchemes.dark.palette.secondary.lightChannel).to.equal('243 229 245');
    expect(theme.colorSchemes.dark.palette.secondary.contrastTextChannel).to.equal('0 0 0');

    expect(theme.colorSchemes.dark.palette.text.primaryChannel).to.equal('255 255 255');
    expect(theme.colorSchemes.dark.palette.text.secondaryChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.dark.palette.dividerChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.dark.palette.action.activeChannel).to.equal('255 255 255');

    expect(theme.colorSchemes.dark.palette.action.selectedChannel).to.equal('255 255 255');
  });

  it('should generate common background, onBackground channels', () => {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: {
            common: {
              background: '#f9f9f9',
            },
          },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.common.background).to.equal('#f9f9f9');
    expect(theme.colorSchemes.light.palette.common.backgroundChannel).to.equal('249 249 249');
    expect(theme.colorSchemes.light.palette.common.onBackground).to.equal('#000');
    expect(theme.colorSchemes.light.palette.common.onBackgroundChannel).to.equal('0 0 0');
  });

  it('should generate dark common background, onBackground channels', () => {
    const theme = extendTheme({
      defaultColorScheme: 'dark',
      colorSchemes: {
        dark: {
          palette: {
            common: {
              onBackground: '#f9f9f9', // this should not be overridden
            },
          },
        },
      },
    });
    expect(theme.colorSchemes.dark.palette.common.background).to.equal('#000');
    expect(theme.colorSchemes.dark.palette.common.backgroundChannel).to.equal('0 0 0');
    expect(theme.colorSchemes.dark.palette.common.onBackground).to.equal('#f9f9f9');
    expect(theme.colorSchemes.dark.palette.common.onBackgroundChannel).to.equal('249 249 249');
  });

  it('should generate color channels for custom colors', () => {
    const theme = extendTheme({
      colorSchemes: {
        light: {
          palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
        },
      },
    });
    expect(theme.colorSchemes.light.palette.primary.mainChannel).to.equal('255 87 34');
    expect(theme.colorSchemes.light.palette.secondary.mainChannel).to.equal('0 230 118');
  });

  describe('motion', () => {
    it('should provide the default values', () => {
      const theme = extendTheme();

      expect(theme.motion.reducedMotion).to.equal('never');
    });

    it('should provide custom values', () => {
      const theme = extendTheme({
        motion: {
          reducedMotion: 'system',
        },
      });

      expect(theme.motion.reducedMotion).to.equal('system');
    });
  });

  describe('transitions', () => {
    it('[`easing`]: should provide the default values', () => {
      const theme = extendTheme();
      expect(theme.transitions.easing.easeInOut).to.equal('cubic-bezier(0.4, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeOut).to.equal('cubic-bezier(0.0, 0, 0.2, 1)');
      expect(theme.transitions.easing.easeIn).to.equal('cubic-bezier(0.4, 0, 1, 1)');
      expect(theme.transitions.easing.sharp).to.equal('cubic-bezier(0.4, 0, 0.6, 1)');
    });

    it('[`duration`]: should provide the default values', () => {
      const theme = extendTheme();
      expect(theme.transitions.duration.shortest).to.equal(150);
      expect(theme.transitions.duration.shorter).to.equal(200);
      expect(theme.transitions.duration.short).to.equal(250);
      expect(theme.transitions.duration.standard).to.equal(300);
      expect(theme.transitions.duration.complex).to.equal(375);
      expect(theme.transitions.duration.enteringScreen).to.equal(225);
      expect(theme.transitions.duration.leavingScreen).to.equal(195);
    });

    it('[`easing`]: should provide the custom values', () => {
      const theme = extendTheme({
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
      const theme = extendTheme({
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
      const theme = extendTheme({ transitions: { duration: { shortest: 150 } } });
      expect(theme.transitions.duration.shorter).not.to.equal(undefined);
    });
  });

  describe('opacity', () => {
    it('should provide the default opacities', () => {
      const theme = extendTheme();
      expect(theme.colorSchemes.light.opacity).to.deep.equal({
        inputPlaceholder: 0.42,
        inputUnderline: 0.42,
        switchTrackDisabled: 0.12,
        switchTrack: 0.38,
      });
    });

    it('should provide the default dark opacities', () => {
      const theme = extendTheme({ defaultColorScheme: 'dark' });
      expect(theme.colorSchemes.dark.opacity).to.deep.equal({
        inputPlaceholder: 0.5,
        inputUnderline: 0.7,
        switchTrackDisabled: 0.2,
        switchTrack: 0.3,
      });
    });

    it('should allow overriding of the default opacities', () => {
      const theme = extendTheme({
        colorSchemes: {
          light: {
            opacity: {
              inputPlaceholder: 1,
            },
          },
        },
      });
      expect(theme.colorSchemes.light.opacity).to.deep.include({
        inputPlaceholder: 1,
        inputUnderline: 0.42,
      });
    });

    it('should allow overriding of the default dark opacities', () => {
      const theme = extendTheme({
        defaultColorScheme: 'dark',
        colorSchemes: {
          dark: {
            opacity: {
              inputPlaceholder: 0.2,
            },
          },
        },
      });
      expect(theme.colorSchemes.dark.opacity).to.deep.include({
        inputPlaceholder: 0.2,
        inputUnderline: 0.7,
      });
    });
  });

  describe('Input palette', () => {
    it('should provide the default autofill tokens', () => {
      const theme = extendTheme({ colorSchemes: { light: true, dark: true } });
      expect(theme.colorSchemes.light.palette.Input).to.deep.equal({
        autofillWebkitBoxShadow: 'none',
      });
      expect(theme.colorSchemes.dark.palette.Input).to.deep.equal({
        autofillWebkitBoxShadow: '0 0 0 100px #266798 inset',
      });
    });

    it('should allow overriding the autofill tokens', () => {
      const theme = extendTheme({
        colorSchemes: {
          light: {
            palette: {
              Input: {
                autofillWebkitBoxShadow: '0 0 0 100px #e8f0fe inset',
              },
            },
          },
        },
      });
      expect(theme.colorSchemes.light.palette.Input).to.deep.equal({
        autofillWebkitBoxShadow: '0 0 0 100px #e8f0fe inset',
      });
    });
  });

  describe('overlays', () => {
    it('should provide the default array', () => {
      const theme = extendTheme();
      expect(theme.colorSchemes.light.overlays).to.have.length(0);
    });

    it('should provide the default array for dark', () => {
      const theme = extendTheme({ defaultColorScheme: 'dark' });
      expect(theme.colorSchemes.dark.overlays).to.have.length(25);

      expect(theme.colorSchemes.dark.overlays[0]).to.equal('none');
      expect(theme.colorSchemes.dark.overlays[24]).to.equal(
        'linear-gradient(rgba(255 255 255 / 0.165), rgba(255 255 255 / 0.165))',
      );
    });

    it('should override the array as expected', () => {
      const overlays = Array(25).fill('none');
      const theme = extendTheme({
        defaultColorScheme: 'dark',
        colorSchemes: { dark: { overlays } },
      });
      expect(theme.colorSchemes.dark.overlays).to.equal(overlays);
    });
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const theme = extendTheme();
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
      const theme = extendTheme({ shadows });
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
      const theme = extendTheme({ components });
      expect(theme.components).to.deep.equal(components);
    });
  });

  describe('styleOverrides', () => {
    it('should warn when trying to override an internal state the wrong way', () => {
      let theme;

      expect(() => {
        theme = extendTheme({
          components: { Button: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).not.toErrorDev();
      expect(Object.keys(theme.components.Button.styleOverrides.disabled).length).to.equal(1);

      expect(() => {
        theme = extendTheme({
          components: { MuiButton: { styleOverrides: { root: { color: 'blue' } } } },
        });
      }).not.toErrorDev();

      expect(() => {
        theme = extendTheme({
          components: { MuiButton: { styleOverrides: { disabled: { color: 'blue' } } } },
        });
      }).toErrorDev(
        'MUI: The `MuiButton` component increases the CSS specificity of the `disabled` internal state.',
      );
      expect(Object.keys(theme.components.MuiButton.styleOverrides.disabled).length).to.equal(0);
    });
  });

  describe('spacing', () => {
    it('produce spacing token by default', () => {
      const theme = extendTheme();
      expect(theme.vars.spacing).to.equal('var(--mui-spacing, 8px)');
      expect(theme.spacing(2)).to.equal('calc(2 * var(--mui-spacing, 8px))');
    });

    it('turn number to pixel', () => {
      const theme = extendTheme({ spacing: 4 });
      expect(theme.vars.spacing).to.equal('var(--mui-spacing, 4px)');
      expect(theme.spacing(2)).to.equal('calc(2 * var(--mui-spacing, 4px))');
    });

    it('can be customized as a string', () => {
      const theme = extendTheme({ spacing: '0.5rem' });
      expect(theme.vars.spacing).to.equal('var(--mui-spacing, 0.5rem)');
      expect(theme.spacing(2)).to.equal('calc(2 * var(--mui-spacing, 0.5rem))');
    });

    it('uses the provided value if it is a string', () => {
      const theme = extendTheme({ spacing: '0.5rem' });
      expect(theme.spacing('1rem')).to.equal('1rem');
    });

    it('can be customized as an array', () => {
      const theme = extendTheme({ spacing: [0, 1, 2, 4, 8, 16, 32] });
      expect(theme.vars.spacing).to.deep.equal([
        'var(--mui-spacing-0, 0px)',
        'var(--mui-spacing-1, 1px)',
        'var(--mui-spacing-2, 2px)',
        'var(--mui-spacing-3, 4px)',
        'var(--mui-spacing-4, 8px)',
        'var(--mui-spacing-5, 16px)',
        'var(--mui-spacing-6, 32px)',
      ]);
      expect(theme.spacing(2)).to.equal('var(--mui-spacing-2, 2px)');
    });

    it('can be customized as a function', () => {
      const theme = extendTheme({ spacing: (factor) => `${0.25 * factor}rem` });
      expect('spacing' in theme.vars).to.equal(false);
      expect(theme.spacing(2)).to.equal('0.5rem');
    });

    it('a custom function should not be altered', () => {
      const theme = extendTheme({
        spacing: (val) => (val === 'xs' ? '100px' : val),
      });
      expect('spacing' in theme.vars).to.equal(false);
      expect(theme.spacing('xs')).to.equal('100px');
    });
  });

  describe('typography', () => {
    it('produce typography token by default', () => {
      const theme = extendTheme();
      expect(Object.keys(theme.vars.font)).to.deep.equal([
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
        'inherit',
      ]);
    });

    it('access font vars', () => {
      const theme = extendTheme();
      expect(
        theme.unstable_sx({
          font: 'h1',
        }),
      ).to.deep.equal({
        font: 'var(--mui-font-h1, 300 6rem/1.167 "Roboto", "Helvetica", "Arial", sans-serif)',
      });
    });

    it('use provided value if no font', () => {
      const theme = extendTheme();
      expect(
        theme.unstable_sx({
          font: 'var(--custom-font)',
        }),
      ).to.deep.equal({
        font: 'var(--custom-font)',
      });
    });
  });

  describe('container queries', () => {
    it('should generate container queries', () => {
      const theme = extendTheme();
      expect(theme.containerQueries('sidebar').up('sm')).to.equal(
        '@container sidebar (min-width:600px)',
      );
      expect(theme.containerQueries.up(300)).to.equal('@container (min-width:300px)');
    });
  });

  it('shallow merges multiple arguments', () => {
    const theme = extendTheme({ foo: 'I am foo' }, { bar: 'I am bar' });
    expect(theme.foo).to.equal('I am foo');
    expect(theme.bar).to.equal('I am bar');
  });

  it('deep merges multiple arguments', () => {
    const theme = extendTheme({ custom: { foo: 'I am foo' } }, { custom: { bar: 'I am bar' } });
    expect(theme.custom.foo).to.equal('I am foo');
    expect(theme.custom.bar).to.equal('I am bar');
  });

  it('allows callbacks using theme in variants', () => {
    const theme = extendTheme({
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
      <CssVarsProvider theme={theme}>
        <Button />
      </CssVarsProvider>,
    );
    expect(container.firstChild).toHaveComputedStyle({ fontFamily: 'cursive' });
  });

  describe('css var prefix', () => {
    it('has mui as default css var prefix', () => {
      const theme = extendTheme();
      expect(theme.cssVarPrefix).to.equal('mui');
    });

    it('custom css var prefix', () => {
      const theme = extendTheme({ cssVarPrefix: 'foo' });
      expect(theme.cssVarPrefix).to.equal('foo');
    });
  });

  describe('warnings', () => {
    it('dependent token: should warn if the value cannot be parsed by color manipulators', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                divider: 'green',
              },
            },
          },
        }),
      ).toWarnDev(
        "MUI: Can't create `palette.dividerChannel` because `palette.divider` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()." +
          '\n' +
          'To suppress this warning, you need to explicitly provide the `palette.dividerChannel` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.',
      );
    });

    it('should not warn if channel token is provided', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                dividerChannel: '12 12 12',
              },
            },
          },
        }),
      ).not.toWarnDev();
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                dividerChannel: undefined,
              },
            },
          },
        }),
      ).not.toWarnDev();
    });

    it('independent token: should skip warning', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                Alert: {
                  errorColor: 'green',
                },
              },
            },
          },
        }),
      ).not.to.throw();
    });

    it('custom palette should not throw errors', () => {
      expect(() =>
        extendTheme({
          colorSchemes: {
            light: {
              palette: {
                gradient: {
                  primary: 'linear-gradient(#000, transparent)',
                },
              },
            },
          },
        }),
      ).not.to.throw();
    });
  });

  it('should have the vars object', () => {
    const theme = extendTheme();
    const keys = [
      // MD2 specific tokens
      'palette',
      'shadows',
      'zIndex',
      'opacity',
      'overlays',
      'shape',
    ];

    Object.keys(keys).forEach((key) => {
      expect(theme[key]).to.deep.equal(theme.vars[key]);
    });
  });

  describe('dark color scheme only', () => {
    it('should use dark as default color scheme', () => {
      expect(extendTheme({ colorSchemes: { dark: true } }).defaultColorScheme).to.deep.equal(
        'dark',
      );
    });

    it('should not have colorSchemeSelector', () => {
      expect(extendTheme({ colorSchemes: { dark: true } }).colorSchemeSelector).to.deep.equal(
        undefined,
      );
    });

    it('should have dark palette and not light color scheme', () => {
      const theme = extendTheme({ colorSchemes: { dark: true } });
      expect(theme.colorSchemes.dark.palette.text.primary).to.equal('#fff');
      expect(theme.colorSchemes.light).to.equal(undefined);
    });
  });

  describe('light and dark color schemes', () => {
    it('should use prefers-color-scheme (`media`) by default', () => {
      const theme = extendTheme({ colorSchemes: { light: true, dark: true } });
      const sheets = theme.generateStyleSheets();
      sinon.assert.match(sheets, [
        {
          ':root': sheets[0][':root'], // non-colors related variables
        },
        {
          ':root': sheets[1][':root'], // light palette
        },
        {
          '@media (prefers-color-scheme: dark)': {
            ':root': sheets[2]['@media (prefers-color-scheme: dark)'][':root'], // dark palette
          },
        },
      ]);
    });

    it('[media] should use prefers-color-scheme for styling', () => {
      const theme = extendTheme({ colorSchemes: { light: true, dark: true } });

      expect(theme.getColorSchemeSelector('light')).to.equal(
        '@media (prefers-color-scheme: light)',
      );
      expect(theme.getColorSchemeSelector('dark')).to.equal('@media (prefers-color-scheme: dark)');
    });

    it('[media] should use prefers-color-scheme with dark as default', () => {
      const theme = extendTheme({
        colorSchemes: { light: true, dark: true },
        defaultColorScheme: 'dark',
      });
      const sheets = theme.generateStyleSheets();
      sinon.assert.match(sheets, [
        {
          ':root': sheets[0][':root'], // non-colors related variables
        },
        {
          ':root': sheets[1][':root'], // dark palette
          '@media (prefers-color-scheme: dark)': {
            // dark specific variables
            ':root': sheets[1]['@media (prefers-color-scheme: dark)'][':root'],
          },
        },
        {
          '@media (prefers-color-scheme: light)': {
            ':root': sheets[2]['@media (prefers-color-scheme: light)'][':root'], // light palette
          },
        },
      ]);
    });

    it('should use default class selector', () => {
      const theme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: 'class',
      });
      expect(theme.generateStyleSheets().flatMap((sheet) => Object.keys(sheet))).to.deep.equal([
        ':root',
        ':root, .light',
        '.dark',
      ]);
    });

    it('should use a custom class selector', () => {
      const theme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: '.mode-%s',
      });
      expect(theme.generateStyleSheets().flatMap((sheet) => Object.keys(sheet))).to.deep.equal([
        ':root',
        ':root, .mode-light',
        '.mode-dark',
      ]);
    });

    it('should use default data selector for styling', () => {
      const theme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: 'data',
      });

      expect(theme.getColorSchemeSelector('light')).to.equal('[data-light] &');
      expect(theme.getColorSchemeSelector('dark')).to.equal('[data-dark] &');
    });

    it('should use data attribute selector', () => {
      const theme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: '[data-theme-%s]',
      });
      expect(theme.generateStyleSheets().flatMap((sheet) => Object.keys(sheet))).to.deep.equal([
        ':root',
        ':root, [data-theme-light]',
        '[data-theme-dark]',
      ]);
    });

    it('should use data attribute for styling', () => {
      const theme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: '[data-theme-%s]',
      });

      expect(theme.getColorSchemeSelector('light')).to.equal('[data-theme-light] &');
      expect(theme.getColorSchemeSelector('dark')).to.equal('[data-theme-dark] &');
    });

    it('should use a custom class selector when dark is the default', () => {
      const theme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: '.mode-%s',
        defaultColorScheme: 'dark',
      });
      expect(theme.generateStyleSheets().flatMap((sheet) => Object.keys(sheet))).to.deep.equal([
        ':root',
        '.mode-dark', // specific variables for dark
        ':root, .mode-dark',
        '.mode-light',
      ]);
    });

    it('should use a custom root selector', () => {
      const theme = extendTheme({
        colorSchemes: { light: true, dark: true },
        colorSchemeSelector: 'class',
        rootSelector: ':host',
      });
      expect(theme.generateStyleSheets().flatMap((sheet) => Object.keys(sheet))).to.deep.equal([
        ':host',
        ':host, .light',
        '.dark',
      ]);
    });
  });

  it('should not generate vars for modularCssLayers', () => {
    const theme = extendTheme({
      modularCssLayers: '@layer mui,utilities;',
    });
    expect(theme.vars.modularCssLayers).to.equal(undefined);
  });
});
