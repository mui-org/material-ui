import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { spy } from 'sinon';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { createRenderer, screen, fireEvent } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/system';
import createCssVarsTheme from './createCssVarsTheme';
import createCssVarsProvider, { DISABLE_CSS_TRANSITION } from './createCssVarsProvider';
import {
  DEFAULT_ATTRIBUTE,
  DEFAULT_MODE_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';
import useTheme from '../useTheme';

describe('createCssVarsProvider', () => {
  const { clock, render } = createRenderer();
  let originalMatchmedia;
  let storage = {};
  const createMatchMedia = (matches) => () => ({
    matches,
    // Keep mocking legacy methods because @mui/material v5 still uses them
    addListener: () => {},
    addEventListener: () => {},
    removeListener: () => {},
    removeEventListener: () => {},
  });

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;

    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: spy((key) => storage[key]),
        setItem: spy((key, value) => {
          storage[key] = value;
        }),
      },
      configurable: true,
    });

    // clear the localstorage
    storage = {};
    window.matchMedia = createMatchMedia(false);
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  describe('[Design System] CssVarsProvider', () => {
    it('has specified default colorScheme', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: {} },
        }),
        defaultColorScheme: 'light',
      });
      function Consumer() {
        const { colorScheme } = useColorScheme();
        return <div data-testid="current-color-scheme">{colorScheme}</div>;
      }
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('light');
    });

    it('provide getColorSchemeSelector util', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemeSelector: '[data-custom-color-scheme="%s"]',
          colorSchemes: { light: { palette: { primary: { 500: '#ff5252' } } } },
        }),
        defaultColorScheme: 'light',
      });
      function Text() {
        const theme = useTheme();
        return <div data-testid={`text`}>{theme.getColorSchemeSelector('light')}</div>;
      }
      render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text').textContent).to.equal(
        '[data-custom-color-scheme="light"] &',
      );
    });

    it('can access to allColorSchemes', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: {
            light: {},
            dark: {},
          },
        }),
        defaultColorScheme: 'light',
      });
      function Consumer() {
        const { allColorSchemes } = useColorScheme();
        return <div data-testid="all-colorSchemes">{allColorSchemes.join(',')}</div>;
      }
      const view = render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('all-colorSchemes').textContent).to.equal('light,dark');

      view.rerender(
        <CssVarsProvider
          theme={createCssVarsTheme({
            colorSchemes: { light: {}, dark: {}, comfort: { palette: { color: '#e5e5e5' } } },
          })}
        >
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('all-colorSchemes').textContent).to.equal('light,dark,comfort');
    });

    it('can set new colorScheme', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: {}, dark: {} },
        }),
        defaultColorScheme: 'light',
      });
      function Consumer() {
        const { colorScheme, setColorScheme } = useColorScheme();
        return (
          <div>
            <div data-testid="current-color-scheme">{colorScheme}</div>
            <button onClick={() => setColorScheme('dark')}>change to dark</button>
          </div>
        );
      }
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('dark');
    });

    it('display error if nonexistent colorScheme is set', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: {} },
        }),
        defaultColorScheme: 'light',
      });
      function Consumer() {
        const { setColorScheme } = useColorScheme();
        return <button onClick={() => setColorScheme('foo')}>change to dark</button>;
      }

      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(() =>
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' })),
      ).toErrorDev('`foo` does not exist in `theme.colorSchemes`.');
    });

    it('does not create css var if shouldSkipGeneratingVar return true', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: {
            light: {
              typography: {
                htmlFontSize: '16px',
                h1: {
                  fontSize: '1rem',
                  fontWeight: 500,
                },
              },
            },
          },
          shouldSkipGeneratingVar: (keys) => keys[0] === 'typography' && keys[1] === 'h1',
        }),
        defaultColorScheme: 'light',
      });
      function Consumer() {
        const theme = useTheme();
        return <div data-testid="h1">{theme.vars.typography.h1 || ''}</div>;
      }
      expect(() =>
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        ),
      ).not.toErrorDev(); // if `h1` is skipped, there will be no error.
    });

    it('vars are merged from all colorSchemes regardless of selected color scheme', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: {
            light: {
              palette: {
                primary: '#000',
              },
            },
            dark: {
              palette: {
                grey: '#888',
              },
            },
          },
        }),
        defaultColorScheme: 'light',
      });
      function Consumer() {
        const theme = useTheme();
        return (
          <div>
            <div>{theme.vars.palette.primary || ''}</div>
            <div>{theme.vars.palette.grey || ''}</div>
          </div>
        );
      }
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );
      expect(screen.getByText('var(--palette-primary)')).not.to.equal(null);
      expect(screen.getByText('var(--palette-grey)')).not.to.equal(null);
    });

    describe('[option]: `disableTransitionOnChange`', () => {
      clock.withFakeTimers();

      beforeEach(() => {
        document.head.replaceChildren([]);
      });

      it('disable all css transitions when switching between modes, given `disableTransitionOnChange` is true', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: createCssVarsTheme({
            colorSchemes: { light: {}, dark: {} },
          }),
          defaultColorScheme: {
            light: 'light',
            dark: 'dark',
          },
          disableTransitionOnChange: true,
        });
        function Consumer() {
          const { mode, setMode } = useColorScheme();
          return (
            <div>
              <div data-testid="current-mode">{mode}</div>
              <button onClick={() => setMode('dark')}>change to dark</button>;
            </div>
          );
        }
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );
        clock.runToLast();
        expect(document.head.children[document.head.children.length - 1]?.textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        expect(document.head.children[document.head.children.length - 1]?.textContent).to.equal(
          DISABLE_CSS_TRANSITION,
        );
        expect(screen.getByTestId('current-mode').textContent).to.equal('dark');

        clock.runToLast();
        expect(document.head.children[document.head.children.length - 1]?.textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
      });

      it('sets the nonce of the Emotion cache on the style tag that disables transitions', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: createCssVarsTheme({
            colorSchemes: { light: {}, dark: {} },
          }),
          defaultColorScheme: {
            light: 'light',
            dark: 'dark',
          },
          disableTransitionOnChange: true,
        });
        function Consumer() {
          const { setMode } = useColorScheme();
          return <button onClick={() => setMode('dark')}>change to dark</button>;
        }
        const cache = createCache({ key: 'nonce-test', nonce: 'test-nonce' });
        render(
          <CacheProvider value={cache}>
            <CssVarsProvider>
              <Consumer />
            </CssVarsProvider>
          </CacheProvider>,
        );
        clock.runToLast();
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        const styleElement = document.head.children[document.head.children.length - 1];
        expect(styleElement.textContent).to.equal(DISABLE_CSS_TRANSITION);
        expect(styleElement.nonce).to.equal('test-nonce');
      });

      it('disable all css transitions when switching between color schemes, given `disableTransitionOnChange` is true', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: createCssVarsTheme({
            colorSchemes: { light: {}, dark: {} },
          }),
          defaultColorScheme: {
            light: 'light',
            dark: 'dark',
          },
          disableTransitionOnChange: true,
        });
        function Consumer() {
          const { colorScheme, setColorScheme } = useColorScheme();
          return (
            <div>
              <div data-testid="current-color-scheme">{colorScheme}</div>
              <button onClick={() => setColorScheme('dark')}>change to dark</button>;
            </div>
          );
        }
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );
        clock.runToLast();
        expect(document.head.children[document.head.children.length - 1]?.textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        expect(document.head.children[document.head.children.length - 1]?.textContent).to.equal(
          DISABLE_CSS_TRANSITION,
        );
        expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');

        clock.runToLast();
        expect(document.head.children[document.head.children.length - 1]?.textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
      });

      it('do not disable all css transitions when switching between modes, given `disableTransitionOnChange` is false', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: createCssVarsTheme({
            colorSchemes: { light: {}, dark: {} },
          }),
          defaultColorScheme: 'light',
          disableTransitionOnChange: false,
        });
        function Consumer() {
          const { mode, setMode } = useColorScheme();
          return (
            <div>
              <div data-testid="current-mode">{mode}</div>
              <button onClick={() => setMode('dark')}>change to dark</button>;
            </div>
          );
        }
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );

        expect(document.head.children[document.head.children.length - 1]?.textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        expect(document.head.children[document.head.children.length - 1]?.textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
      });

      it('do not disable all css transitions when switching between color schemes, given `disableTransitionOnChange` is false', () => {
        const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
          theme: createCssVarsTheme({
            colorSchemes: { light: {}, dark: {} },
          }),
          defaultColorScheme: 'light',
          disableTransitionOnChange: false,
        });
        function Consumer() {
          const { colorScheme, setColorScheme } = useColorScheme();
          return (
            <div>
              <div data-testid="current-color-scheme">{colorScheme}</div>
              <button onClick={() => setColorScheme('dark')}>change to dark</button>;
            </div>
          );
        }
        render(
          <CssVarsProvider>
            <Consumer />
          </CssVarsProvider>,
        );

        expect(document.head.children[document.head.children.length - 1]?.textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));
        expect(document.head.children[document.head.children.length - 1]?.textContent).not.to.equal(
          DISABLE_CSS_TRANSITION,
        );
        expect(screen.getByTestId('current-color-scheme').textContent).to.equal('dark');
      });
    });
  });

  describe('DOM', () => {
    it('attach default dataset on html', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: {}, dark: {} },
        }),
        defaultColorScheme: { light: 'light', dark: 'dark' },
      });
      function Toggle() {
        const { mode, setMode } = useColorScheme();
        return (
          <button
            onClick={() => {
              setMode('dark');
            }}
          >
            {mode}
          </button>
        );
      }
      render(
        <CssVarsProvider>
          <Toggle />
        </CssVarsProvider>,
      );

      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('light');

      fireEvent.click(screen.getByRole('button'));

      expect(document.documentElement.getAttribute(DEFAULT_ATTRIBUTE)).to.equal('dark');
    });

    it('attach class on html', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemeSelector: 'class',
          colorSchemes: { light: {}, dark: {} },
        }),
        defaultColorScheme: { light: 'light', dark: 'dark' },
      });
      function Toggle() {
        const { mode, setMode } = useColorScheme();
        return (
          <button
            onClick={() => {
              setMode('dark');
            }}
          >
            {mode}
          </button>
        );
      }
      render(
        <CssVarsProvider>
          <Toggle />
        </CssVarsProvider>,
      );

      expect(document.documentElement.classList.contains('light')).to.equal(true);

      fireEvent.click(screen.getByRole('button'));

      expect(document.documentElement.classList.contains('light')).to.equal(false);
      expect(document.documentElement.classList.contains('dark')).to.equal(true);

      document.documentElement.classList.remove('dark'); // cleanup
    });

    it('attach data- on html', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemeSelector: 'data',
          colorSchemes: { light: {}, dark: {} },
        }),
        defaultColorScheme: { light: 'light', dark: 'dark' },
      });
      function Toggle() {
        const { mode, setMode } = useColorScheme();
        return (
          <button
            onClick={() => {
              setMode('dark');
            }}
          >
            {mode}
          </button>
        );
      }
      render(
        <CssVarsProvider>
          <Toggle />
        </CssVarsProvider>,
      );

      expect(document.documentElement.getAttribute('data-light')).to.equal('');

      fireEvent.click(screen.getByRole('button'));

      expect(document.documentElement.getAttribute('data-light')).to.equal(null);
      expect(document.documentElement.getAttribute('data-dark')).to.equal('');
    });

    it('use custom attribute', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemeSelector: 'data-foo-bar',
          colorSchemes: { light: {}, dark: {} },
        }),
        defaultColorScheme: { light: 'light', dark: 'dark' },
      });
      function Toggle() {
        const { mode, setMode } = useColorScheme();
        return (
          <button
            onClick={() => {
              setMode('dark');
            }}
          >
            {mode}
          </button>
        );
      }
      render(
        <CssVarsProvider>
          <Toggle />
        </CssVarsProvider>,
      );

      expect(document.documentElement.getAttribute('data-foo-bar')).to.equal('light');

      fireEvent.click(screen.getByRole('button'));

      expect(document.documentElement.getAttribute('data-foo-bar')).to.equal('dark');
    });

    it('does not crash if documentNode is null', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: {} },
        }),
        defaultColorScheme: 'light',
      });

      expect(() => render(<CssVarsProvider documentNode={null} />)).not.to.throw();
    });

    it('does not crash if colorSchemeNode is null', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: {} },
        }),
        defaultColorScheme: 'light',
      });

      expect(() => render(<CssVarsProvider colorSchemeNode={null} />)).not.to.throw();
    });
  });

  describe('Storage', () => {
    const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
      theme: createCssVarsTheme({
        colorSchemes: { light: {}, dark: {} },
      }),
      defaultColorScheme: 'light',
    });
    function Consumer() {
      const { mode, setMode } = useColorScheme();
      return (
        <div>
          <div data-testid="current-mode">{mode}</div>
          <button onClick={() => setMode('dark')}>change to dark</button>
        </div>
      );
    }

    it('should save mode to localStorage', () => {
      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      fireEvent.click(screen.getByRole('button', { name: 'change to dark' }));

      expect(window.localStorage.setItem.calledWith(DEFAULT_MODE_STORAGE_KEY, 'dark')).to.equal(
        true,
      );
    });

    it('should use mode from localStorage if exists', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';

      render(
        <CssVarsProvider>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
    });

    it('use custom modeStorageKey', () => {
      const customModeStorageKey = 'foo-mode';
      storage[customModeStorageKey] = 'dark';

      render(
        <CssVarsProvider modeStorageKey={customModeStorageKey}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode').textContent).to.equal('dark');
    });

    it('support custom storage window', () => {
      const storageWindow = {
        addEventListener: (key, handler) => {
          if (key === 'storage') {
            handler({ key: DEFAULT_MODE_STORAGE_KEY, newValue: 'dark' });
          }
        },
        removeEventListener: () => {},
      };
      render(
        <CssVarsProvider storageWindow={storageWindow}>
          <Consumer />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('current-mode')).to.have.text('dark');
    });
  });

  /**
   * This can occur if two application use default storage key
   * App I: supported color scheme ['light', 'dark', 'purple']
   * App II: supported color scheme ['light', 'dark', 'orange']
   *
   * If you are one App I with color scheme 'purple', when open App II it should fallback
   * to default color scheme of App II because App II does not support 'purple'
   */
  describe('Unsupported color scheme', () => {
    const { CssVarsProvider } = createCssVarsProvider({
      theme: createCssVarsTheme({
        colorSchemes: {
          light: {
            color: 'light',
          },
          dark: {
            color: 'dark',
          },
        },
      }),
      defaultColorScheme: 'light',
    });
    function Color() {
      const theme = useTheme();
      return <div data-testid="color">{theme.vars.color}</div>;
    }

    it('use default color scheme if the storage value does not exist', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'unknown';

      render(
        <CssVarsProvider>
          <Color />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('color').textContent).to.equal('var(--color)');
    });
  });

  describe('[Application] Customization', () => {
    it('custom theme replace the default theme', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          fontSize: { md: '1rem', sm: null },
          colorSchemes: {
            light: {},
          },
        }),
        defaultColorScheme: 'light',
      });
      function Text({ scale = 'md' }) {
        const theme = useTheme();
        return <div data-testid={`text-${scale}`}>{theme.vars.fontSize[scale]}</div>;
      }
      render(
        <CssVarsProvider theme={createCssVarsTheme({ fontSize: { sm: '0.75rem' } })}>
          <Text scale="md" />
          <Text scale="sm" />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text-md').textContent).to.equal('');
      expect(screen.getByTestId('text-sm').textContent).to.equal('var(--fontSize-sm)');
    });

    it('extend palette property in colorSchemes', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: {
            light: {
              palette: {
                color: '#000000',
              },
            },
          },
        }),
        defaultColorScheme: 'light',
      });
      function Swatch() {
        const theme = useTheme();
        return (
          <div>
            <div data-testid="swatch-color">{theme.vars.palette.color}</div>
            <div data-testid="swatch-bgcolor">{theme.vars.palette.bgcolor}</div>
          </div>
        );
      }
      render(
        <CssVarsProvider
          theme={createCssVarsTheme({
            colorSchemes: { light: { palette: { color: '#000000', bgcolor: '#ffffff' } } },
          })}
        >
          <Swatch />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('swatch-color').textContent).to.equal('var(--palette-color)');
      expect(screen.getByTestId('swatch-bgcolor').textContent).to.equal('var(--palette-bgcolor)');
    });

    /**
     * `colorSchemes` are useful for creating toggle UI.
     * In some cases, developers might want to use the color defined in colorSchemes.
     */
    it('All `colorSchemes` is available in theme', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: {
            light: {},
            dark: {},
          },
        }),
        defaultColorScheme: 'light',
      });
      function Consumer() {
        const theme = useTheme();
        return <div>{Object.keys(theme.colorSchemes).join(', ')}</div>;
      }
      const { container } = render(
        <CssVarsProvider
          theme={createCssVarsTheme({ colorSchemes: { light: {}, dark: {}, dim: {} } })}
        >
          <Consumer />
        </CssVarsProvider>,
      );

      expect(container.firstChild.textContent).to.equal('light, dark, dim');
    });

    it('able to override css variable prefix', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: { fontSize: 16 } },
        }),
        defaultColorScheme: 'light',
      });
      function Text() {
        const theme = useTheme();
        return <div data-testid={`text`}>{theme.vars.fontSize}</div>;
      }
      render(
        <CssVarsProvider
          theme={createCssVarsTheme({
            cssVarPrefix: 'foo-bar',
            colorSchemes: { light: { fontSize: 16 } },
          })}
        >
          <Text />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text').textContent).to.equal('var(--foo-bar-fontSize)');
    });

    it('does not take `theme.components` into account', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: { fontSize: 16 } },
          components: {
            foo: 'bar',
          },
        }),
        defaultColorScheme: 'light',
      });
      function Text() {
        const theme = useTheme();

        return <div data-testid={`text`}>{theme.vars.components?.foo}</div>;
      }
      render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );

      expect(screen.getByTestId('text').textContent).not.to.equal('var(--components-foo)');
    });

    it('`mode` is `system` by default if `colorSchemes` contains all the default', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: { light: {}, dark: {} },
        }),
        defaultColorScheme: { light: 'light', dark: 'dark' },
      });
      function Text() {
        const { mode } = useColorScheme();
        return <div>{mode}</div>;
      }
      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );
      expect(container.firstChild.textContent).to.equal('system');
    });

    it('should use colorSchemes.palette.mode if `colorSchemes` does not contain all the default', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          defaultColorScheme: 'contrast',
          colorSchemes: {
            contrast: { palette: { mode: 'dark' } },
          },
        }),
        defaultColorScheme: { light: 'paper', dark: 'contrast' },
      });
      function Text() {
        const { mode } = useColorScheme();
        return <div>{mode}</div>;
      }
      const { container } = render(
        <CssVarsProvider>
          <Text />
        </CssVarsProvider>,
      );
      expect(container.firstChild.textContent).to.equal('dark');
    });
  });

  describe('Nested providers', () => {
    it('independent context', () => {
      const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
        theme: createCssVarsTheme({
          colorSchemes: {
            light: {
              color: 'light',
            },
            dark: {
              color: 'dark',
            },
          },
        }),
        defaultColorScheme: 'light',
      });
      function Toggle(props) {
        const { mode, setMode } = useColorScheme();
        return (
          <button onClick={() => setMode('dark')} {...props}>
            {mode}
          </button>
        );
      }

      render(
        <CssVarsProvider>
          <Toggle data-testid="outer" />
          <CssVarsProvider disableNestedContext>
            <Toggle data-testid="inner" />
          </CssVarsProvider>
        </CssVarsProvider>,
      );

      fireEvent.click(screen.getByTestId('inner'));

      // state changes in nested provider should not affect the upper context
      // if `disableNestedContext` is true.
      expect(screen.getByTestId('outer')).to.have.text('system');

      expect(screen.getByTestId('inner')).to.have.text('dark');
    });

    it('themeId should not exist in the theme if not provided as a prop', () => {
      const { CssVarsProvider } = createCssVarsProvider({
        themeId: '$$foo',
        theme: createCssVarsTheme({
          colorSchemes: {
            light: {
              color: 'light',
            },
            dark: {
              color: 'dark',
            },
          },
        }),
        defaultColorScheme: 'light',
      });
      function Text() {
        const theme = useTheme();
        return theme.$$foo ? 'failed' : 'passed';
      }
      const { container } = render(
        <ThemeProvider theme={{ renderText: () => 'foo-bar' }}>
          <CssVarsProvider>
            <Text />
          </CssVarsProvider>
        </ThemeProvider>,
      );
      expect(container.textContent).to.equal('passed');
    });
  });
});
