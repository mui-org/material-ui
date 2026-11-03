import { describe, beforeAll, afterAll, beforeEach, afterEach, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, fireEvent, act, screen } from '@mui/internal-test-utils';
import {
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';
import useCurrentColorScheme, { getColorScheme } from './useCurrentColorScheme';

describe('useCurrentColorScheme', () => {
  const { render } = createRenderer();
  let originalMatchmedia;
  let originalAddEventListener;
  let storage = {};
  const eventHandlers = new Map();
  let trigger;

  const createMatchMedia = (matches) => () => ({
    matches,
    // Keep mocking legacy methods because @mui/material v5 still uses them
    addListener: (listener) => {
      trigger = listener;
    },
    addEventListener: (listener) => {
      trigger = listener;
    },
    removeListener: () => {},
    removeEventListener: () => {},
  });

  beforeAll(() => {
    originalAddEventListener = window.addEventListener;
    window.addEventListener = (key, handler) => {
      if (eventHandlers.has(key)) {
        eventHandlers.get(key).listeners.push(handler);
      } else {
        eventHandlers.set(key, {
          listeners: [handler],
          broadcastEvent(event) {
            this.listeners.forEach((listener) => {
              listener(event);
            });
          },
        });
      }
    };
  });

  afterAll(() => {
    window.addEventListener = originalAddEventListener;
  });

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;
    // clear the localstorage
    storage = {};
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

    window.matchMedia = createMatchMedia(false);
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  it('does not trigger a re-render for a single color scheme', () => {
    function Data() {
      const { mode } = useCurrentColorScheme({
        defaultMode: 'dark',
        supportedColorSchemes: ['dark'],
      });
      const count = React.useRef(0);
      React.useEffect(() => {
        count.current += 1;
      });
      return (
        <div>
          {mode}:{count.current}
        </div>
      );
    }
    const { container } = render(<Data />);

    expect(container.firstChild.textContent).to.equal('dark:0');
  });

  it('trigger a re-render for a multi color schemes', () => {
    let effectRunCount = 0;
    function Data() {
      const { mode } = useCurrentColorScheme({
        supportedColorSchemes: ['light', 'dark'],
        defaultLightColorScheme: 'light',
        defaultDarkColorScheme: 'dark',
      });
      React.useEffect(() => {
        effectRunCount += 1;
      });
      return <div>{mode}</div>;
    }

    const { container } = render(<Data />);

    expect(container.firstChild.textContent).to.equal('light');
    expect(effectRunCount).to.equal(3);
  });

  it('[noSsr] does not trigger a re-render', () => {
    function Data() {
      const { mode } = useCurrentColorScheme({
        defaultMode: 'dark',
        supportedColorSchemes: ['light', 'dark'],
        noSsr: true,
      });
      const count = React.useRef(0);
      React.useEffect(() => {
        count.current += 1;
      });
      return (
        <div>
          {mode}:{count.current}
        </div>
      );
    }
    const { container } = render(<Data />);

    expect(container.firstChild.textContent).to.equal('dark:0');
  });

  describe('getColorScheme', () => {
    it('use lightColorScheme given mode=light', () => {
      expect(getColorScheme({ mode: 'light', lightColorScheme: 'light' })).to.equal('light');
    });

    it('use darkColorScheme given mode=dark', () => {
      expect(getColorScheme({ mode: 'dark', darkColorScheme: 'dark' })).to.equal('dark');
    });

    it('use lightColorScheme given mode=system, systemMode=light', () => {
      expect(
        getColorScheme({ mode: 'system', systemMode: 'light', lightColorScheme: 'light' }),
      ).to.equal('light');
    });

    it('use lightColorScheme given mode=system, systemMode=dark', () => {
      expect(
        getColorScheme({ mode: 'system', systemMode: 'dark', darkColorScheme: 'dark' }),
      ).to.equal('dark');
    });

    it('return undefined if no conditions are matched', () => {
      expect(
        getColorScheme({ mode: undefined, lightColorScheme: 'light', darkColorScheme: 'dark' }),
      ).to.equal(undefined);
      expect(
        getColorScheme({ mode: 'unknown', lightColorScheme: 'light', darkColorScheme: 'dark' }),
      ).to.equal(undefined);
      expect(
        getColorScheme({
          mode: 'system',
          systemMode: undefined,
          lightColorScheme: 'light',
          darkColorScheme: 'dark',
        }),
      ).to.equal(undefined);
    });
  });

  describe('Client', () => {
    it('has default mode=`light`', () => {
      function Data() {
        const data = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <div>{JSON.stringify(data)}</div>;
      }
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'light',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'light',
      });
    });

    it('defaultMode=`dark`', () => {
      function Data() {
        const data = useCurrentColorScheme({
          defaultMode: 'dark',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <div>{JSON.stringify(data)}</div>;
      }
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('defaultMode=`system`', () => {
      function Data() {
        const data = useCurrentColorScheme({
          defaultMode: 'system',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <div>{JSON.stringify(data)}</div>;
      }
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'light',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'light',
      });

      act(() => {
        trigger({ matches: true }); // system matches 'prefers-color-scheme: dark'
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('change to `dark` mode', () => {
      function Data() {
        const { setMode, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button onClick={() => setMode('dark')}>{JSON.stringify(data)}</button>;
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('change to `system` mode', () => {
      window.matchMedia = createMatchMedia(true); // system matches 'prefers-color-scheme: dark'
      function Data() {
        const { setMode, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button onClick={() => setMode('system')}>{JSON.stringify(data)}</button>;
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('reset mode', () => {
      function Data() {
        const { setMode, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <div>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <button data-testid="dark" onClick={() => setMode('dark')} />
            <button data-testid="reset" onClick={() => setMode(null)} />
          </div>
        );
      }
      render(<Data />);

      fireEvent.click(screen.getByTestId('dark'));

      fireEvent.click(screen.getByTestId('reset'));

      expect(JSON.parse(screen.getByTestId('data').textContent)).to.deep.equal({
        mode: 'light',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'light',
      });
    });

    it('change colorScheme when mode is `light` should change `lightColorScheme`', () => {
      function Data() {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'paper', 'dark'],
        });
        return <button onClick={() => setColorScheme('paper')}>{JSON.stringify(data)}</button>;
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'light',
        lightColorScheme: 'paper',
        darkColorScheme: 'dark',
        colorScheme: 'paper',
      });
    });

    it('change colorScheme when mode is `system` should look at systemMode', () => {
      window.matchMedia = createMatchMedia(true); // system matches 'prefers-color-scheme: dark'
      function Data() {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'paper', 'dark', 'dim'],
        });
        return <button onClick={() => setColorScheme('dim')}>{JSON.stringify(data)}</button>;
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dim',
        colorScheme: 'dim',
      });
    });

    it('change both light & dark color scheme at the same time', () => {
      function Data() {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'paper', 'dark', 'dim'],
        });
        return (
          <button onClick={() => setColorScheme({ light: 'paper', dark: 'dim' })}>
            {JSON.stringify(data)}
          </button>
        );
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'light',
        lightColorScheme: 'paper',
        darkColorScheme: 'dim',
        colorScheme: 'paper',
      });

      act(() => {
        trigger({ matches: true }); // system matches 'prefers-color-scheme: dark'
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'dark',
        lightColorScheme: 'paper',
        darkColorScheme: 'dim',
        colorScheme: 'dim',
      });
    });

    it('change only the mode specified as key', () => {
      function Data() {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultMode: 'light',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'paper', 'dark', 'dim'],
        });
        return (
          <div>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <button onClick={() => setColorScheme('paper')}>first</button>
            <button onClick={() => setColorScheme({ dark: 'dim' })}>second</button>
          </div>
        );
      }
      render(<Data />);

      fireEvent.click(screen.getByText('first'));

      expect(JSON.parse(screen.getByTestId('data').textContent)).to.deep.equal({
        mode: 'light',
        lightColorScheme: 'paper',
        darkColorScheme: 'dark',
        colorScheme: 'paper',
      });

      fireEvent.click(screen.getByText('second'));

      expect(JSON.parse(screen.getByTestId('data').textContent)).to.deep.equal({
        mode: 'light',
        lightColorScheme: 'paper',
        darkColorScheme: 'dim',
        colorScheme: 'paper',
      });
    });

    it('able to setMode and setColorScheme in the same event', () => {
      function Data() {
        const { setColorScheme, setMode, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'paper', 'dark', 'dim'],
        });
        return (
          <button
            onClick={() => {
              setMode('dark');
              setColorScheme({ light: 'paper', dark: 'dim' });
            }}
          >
            {JSON.stringify(data)}
          </button>
        );
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'dark',
        lightColorScheme: 'paper',
        darkColorScheme: 'dim',
        colorScheme: 'dim',
      });
    });

    it('reset colorScheme', () => {
      function Data() {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <div>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <button data-testid="dark" onClick={() => setColorScheme('dark')} />
            <button data-testid="reset" onClick={() => setColorScheme(null)} />
          </div>
        );
      }
      render(<Data />);

      fireEvent.click(screen.getByTestId('dark'));

      fireEvent.click(screen.getByTestId('reset'));

      expect(JSON.parse(screen.getByTestId('data').textContent)).to.deep.equal({
        mode: 'light',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'light',
      });
    });

    it('reset light & dark colorScheme', () => {
      function Data() {
        const { setColorScheme, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark', 'light-dim', 'dark-dim'],
        });
        return (
          <div>
            <div data-testid="data">{JSON.stringify(data)}</div>
            <button
              data-testid="dark"
              onClick={() => setColorScheme({ light: 'light-dim', dark: 'dark-dim' })}
            />
            <button
              data-testid="reset"
              onClick={() => setColorScheme({ light: null, dark: null })}
            />
          </div>
        );
      }
      render(<Data />);

      fireEvent.click(screen.getByTestId('dark'));

      fireEvent.click(screen.getByTestId('reset'));

      expect(JSON.parse(screen.getByTestId('data').textContent)).to.deep.equal({
        mode: 'light',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'light',
      });
    });
  });

  describe('Storage', () => {
    it('save dark mode', () => {
      function Data() {
        const { setMode, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <button
            onClick={() => {
              setMode('dark');
            }}
          >
            {JSON.stringify(data)}
          </button>
        );
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(
        window.localStorage.setItem.lastCall.calledWith(DEFAULT_MODE_STORAGE_KEY, 'dark'),
      ).to.equal(true);
    });

    it('save lightColorScheme and darkColorScheme', () => {
      function Data() {
        const { setMode, setColorScheme, ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark', 'dim'],
        });
        return (
          <button
            onClick={() => {
              setMode('dark');
              setColorScheme('dim');
            }}
          >
            {JSON.stringify(data)}
          </button>
        );
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(window.localStorage.setItem.calledWith(DEFAULT_MODE_STORAGE_KEY, 'dark')).to.equal(
        true,
      );
      expect(
        window.localStorage.setItem.calledWith(`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`, 'dim'),
      ).to.equal(true);
    });

    it('use mode from localStorage if exists', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
      function Data() {
        const { setMode, setColorScheme, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <div>{JSON.stringify(data)}</div>;
      }
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('use mode & colorScheme from localStorage if exists', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
      storage[`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`] = 'dim';
      function Data() {
        const { setMode, setColorScheme, ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark', 'dim'],
        });
        return <div>{JSON.stringify(data)}</div>;
      }
      const { container } = render(<Data />);

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dim',
        colorScheme: 'dim',
      });
    });

    it('storage mode changes from `light` to `dark`', () => {
      function Data() {
        const { ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button>{JSON.stringify(data)}</button>;
      }
      const { container } = render(<Data />);

      act(() => {
        eventHandlers
          .get('storage')
          .broadcastEvent?.({ key: DEFAULT_MODE_STORAGE_KEY, newValue: 'dark' });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('storage mode changes from `light` to `auto`', () => {
      window.matchMedia = createMatchMedia(true); // system matches 'prefers-color-scheme: dark'
      function Data() {
        const { ...data } = useCurrentColorScheme({
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button>{JSON.stringify(data)}</button>;
      }
      const { container } = render(<Data />);

      act(() => {
        eventHandlers
          .get('storage')
          .broadcastEvent?.({ key: DEFAULT_MODE_STORAGE_KEY, newValue: 'system' });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('storage mode is deleted', () => {
      storage[DEFAULT_MODE_STORAGE_KEY] = 'dark';
      function Data() {
        const { ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return <button>{JSON.stringify(data)}</button>;
      }
      const { container } = render(<Data />);

      act(() => {
        eventHandlers
          .get('storage')
          .broadcastEvent?.({ key: DEFAULT_MODE_STORAGE_KEY, newValue: null });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'light',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'light',
      });
    });

    it('storage lightColorScheme & darkColorScheme changes', () => {
      function Data() {
        const { ...data } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark', 'light-dim', 'dark-dim'],
        });
        return <button>{JSON.stringify(data)}</button>;
      }
      const { container } = render(<Data />);

      act(() => {
        eventHandlers.get('storage').broadcastEvent?.({
          key: `${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`,
          newValue: 'light-dim',
        });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'light',
        lightColorScheme: 'light-dim',
        darkColorScheme: 'dark',
        colorScheme: 'light-dim',
      });

      act(() => {
        eventHandlers.get('storage').broadcastEvent?.({
          key: `${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`,
          newValue: 'dark-dim',
        });
      });

      act(() => {
        trigger({ matches: true });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'system',
        systemMode: 'dark',
        lightColorScheme: 'light-dim',
        darkColorScheme: 'dark-dim',
        colorScheme: 'dark-dim',
      });
    });

    it('reset mode in storage', () => {
      function Data() {
        const { setMode } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <div>
            <button data-testid="dark" onClick={() => setMode('dark')} />
            <button data-testid="reset" onClick={() => setMode(null)} />
          </div>
        );
      }
      render(<Data />);

      fireEvent.click(screen.getByTestId('dark'));

      fireEvent.click(screen.getByTestId('reset'));

      expect(
        window.localStorage.setItem.lastCall.calledWith(DEFAULT_MODE_STORAGE_KEY, 'system'),
      ).to.equal(true);
    });

    it('reset color scheme in storage', () => {
      function Data() {
        const { setColorScheme } = useCurrentColorScheme({
          defaultMode: 'system',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <div>
            <button data-testid="dark" onClick={() => setColorScheme('dark')} />
            <button data-testid="reset" onClick={() => setColorScheme(null)} />
          </div>
        );
      }
      render(<Data />);

      fireEvent.click(screen.getByTestId('dark'));

      window.localStorage.setItem.resetHistory();
      expect(window.localStorage.setItem.callCount).to.equal(0); // reset the calls to neglect initial setItem in the assertion below

      fireEvent.click(screen.getByTestId('reset'));

      expect(
        window.localStorage.setItem.calledWith(
          `${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-light`,
          'light',
        ),
      ).to.equal(true);
      expect(
        window.localStorage.setItem.calledWith(`${DEFAULT_COLOR_SCHEME_STORAGE_KEY}-dark`, 'dark'),
      ).to.equal(true);
    });
  });

  describe('Custom storage', () => {
    let cache = {};

    beforeEach(() => {
      cache = {};
    });

    const storageManager = ({ key }) => ({
      get(defaultValue) {
        return cache[key] || defaultValue;
      },
      set(value) {
        cache[key] = value;
      },
      subscribe: (handler) => {
        const listener = (event) => {
          const value = event.newValue;
          if (event.key === key) {
            handler(value);
          }
        };
        window.addEventListener('storage', listener);
        return () => {
          window.removeEventListener('storage', listener);
        };
      },
    });

    it('use custom storage', () => {
      function Data() {
        const { setMode, ...data } = useCurrentColorScheme({
          storageManager,
          defaultMode: 'light',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <button
            onClick={() => {
              setMode('dark');
            }}
          >
            {JSON.stringify(data)}
          </button>
        );
      }
      const { container } = render(<Data />);

      fireEvent.click(container.firstChild);

      expect(storageManager({ key: DEFAULT_MODE_STORAGE_KEY }).get()).to.equal('dark');
    });

    it('handle subscription', () => {
      function Data() {
        const { setMode, ...data } = useCurrentColorScheme({
          storageManager,
          defaultMode: 'light',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <button
            onClick={() => {
              setMode('dark');
            }}
          >
            {JSON.stringify(data)}
          </button>
        );
      }
      const { container } = render(<Data />);

      act(() => {
        eventHandlers.get('storage').broadcastEvent?.({
          key: DEFAULT_MODE_STORAGE_KEY,
          newValue: 'dark',
        });
      });

      expect(JSON.parse(container.firstChild.textContent)).to.deep.equal({
        mode: 'dark',
        lightColorScheme: 'light',
        darkColorScheme: 'dark',
        colorScheme: 'dark',
      });
    });

    it('able to disable storage manager', () => {
      function Data() {
        const { setMode, ...data } = useCurrentColorScheme({
          storageManager: null,
          defaultMode: 'light',
          defaultLightColorScheme: 'light',
          defaultDarkColorScheme: 'dark',
          supportedColorSchemes: ['light', 'dark'],
        });
        return (
          <button
            onClick={() => {
              setMode('dark');
            }}
          >
            {JSON.stringify(data)}
          </button>
        );
      }
      expect(() => render(<Data />)).not.to.throw();
    });
  });
});
