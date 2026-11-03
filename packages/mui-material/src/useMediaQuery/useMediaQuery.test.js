import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  act,
  createRenderer,
  screen,
  RenderCounter,
  strictModeDoubleLoggingSuppressed,
} from '@mui/internal-test-utils';
import mediaQuery from 'css-mediaquery';
import { stub } from 'sinon';
import useMediaQuery from '@mui/material/useMediaQuery';
import { THEME_ID, ThemeProvider, createTheme } from '@mui/material/styles';

const usesUseSyncExternalStore = React.useSyncExternalStore !== undefined;
const matchMediaInstances = new Map();

function createMatchMedia(width) {
  const listeners = [];
  return (query) => {
    let instance = matchMediaInstances.get(query)?.instance;

    if (!instance) {
      instance = {
        matches: mediaQuery.match(query, {
          width,
        }),
        addEventListener: (eventType, listener) => {
          listeners.push(listener);
        },
        removeEventListener: (eventType, listener) => {
          const index = listeners.indexOf(listener);
          if (index > -1) {
            listeners.splice(index, 1);
          }
        },
      };
      matchMediaInstances.set(query, {
        instance,
        listeners,
      });
    }

    return instance;
  };
}

function installMatchMedia(implementation) {
  if (window.matchMedia === undefined) {
    window.matchMedia = implementation;
    window.matchMedia.restore = () => {
      delete window.matchMedia;
    };
  } else {
    stub(window, 'matchMedia').callsFake(implementation);
  }
}

describe('useMediaQuery', () => {
  const { render, renderToString } = createRenderer({ strict: true });

  beforeEach(() => {
    matchMediaInstances.clear();
  });

  describe('without window.matchMedia', () => {
    let originalMatchmedia;

    beforeEach(() => {
      originalMatchmedia = window.matchMedia;
      delete window.matchMedia;
    });

    afterEach(() => {
      window.matchMedia = originalMatchmedia;
    });

    it('should work without window.matchMedia available', () => {
      expect(typeof window.matchMedia).to.equal('undefined');
      function Test() {
        const matches = useMediaQuery('(min-width:100px)');
        return <span data-testid="matches">{`${matches}`}</span>;
      }

      render(<Test />);
      expect(screen.getByTestId('matches').textContent).to.equal('false');
    });
  });

  describe('with window.matchMedia', () => {
    beforeEach(() => {
      installMatchMedia(createMatchMedia(1200));
    });

    afterEach(() => {
      window.matchMedia.restore();
    });

    describe('option: defaultMatches', () => {
      it('should be false by default', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)');
          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(1);
      });

      it('should take the option into account', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });
          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);
      });
    });

    describe('option: noSsr', () => {
      it('should render once if the default value match the expectation', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: false,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(1);
      });

      it('render API: should render once if the default value does not match the expectation', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);
      });

      it('render API: should render once if the default value does not match the expectation but `noSsr` is enabled', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
            noSsr: true,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        render(<Test />);
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(1);
      });

      it('hydrate API: should render twice if the default value does not match the expectation', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        const { hydrate } = renderToString(<Test />);
        hydrate();
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(2);
      });

      it('hydrate API: should render once if the default value does not match the expectation but `noSsr` is enabled', () => {
        const getRenderCountRef = React.createRef();
        function Test() {
          const matches = useMediaQuery('(min-width:2000px)', {
            defaultMatches: true,
            noSsr: true,
          });

          return (
            <RenderCounter ref={getRenderCountRef}>
              <span data-testid="matches">{`${matches}`}</span>
            </RenderCounter>
          );
        }

        const { hydrate } = renderToString(<Test />);
        hydrate();
        expect(screen.getByTestId('matches').textContent).to.equal('false');
        expect(getRenderCountRef.current()).to.equal(1);
      });
    });

    it('should try to reconcile each time', () => {
      const getRenderCountRef = React.createRef();
      function Test() {
        const matches = useMediaQuery('(min-width:2000px)', {
          defaultMatches: true,
        });

        return (
          <RenderCounter ref={getRenderCountRef}>
            <span data-testid="matches">{`${matches}`}</span>
          </RenderCounter>
        );
      }

      const view = render(<Test />);
      expect(screen.getByTestId('matches').textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);

      view.unmount();

      render(<Test />);
      expect(screen.getByTestId('matches').textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);
    });

    it('should be able to change the query dynamically', () => {
      const getRenderCountRef = React.createRef();
      function Test(props) {
        const matches = useMediaQuery(props.query, {
          defaultMatches: true,
        });

        return (
          <RenderCounter ref={getRenderCountRef}>
            <span data-testid="matches">{`${matches}`}</span>
          </RenderCounter>
        );
      }
      Test.propTypes = {
        query: PropTypes.string.isRequired,
      };

      const { setProps } = render(<Test query="(min-width:2000px)" />);
      expect(screen.getByTestId('matches').textContent).to.equal('false');
      expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 1 : 2);
      setProps({ query: '(min-width:100px)' });
      expect(screen.getByTestId('matches').textContent).to.equal('true');
      expect(getRenderCountRef.current()).to.equal(usesUseSyncExternalStore ? 2 : 4);
    });

    it('should observe the media query', async () => {
      const getRenderCountRef = React.createRef();
      const query = '(min-width:2000px)';
      function Test(props) {
        const matches = useMediaQuery(props.query);

        return (
          <RenderCounter ref={getRenderCountRef}>
            <span data-testid="matches">{`${matches}`}</span>
          </RenderCounter>
        );
      }
      Test.propTypes = {
        query: PropTypes.string.isRequired,
      };

      render(<Test query={query} />);

      expect(getRenderCountRef.current()).to.equal(1);
      expect(screen.getByTestId('matches').textContent).to.equal('false');

      await act(async () => {
        matchMediaInstances.get(query).instance.matches = true;
        matchMediaInstances.get(query).listeners[0]();
      });

      expect(screen.getByTestId('matches').textContent).to.equal('true');
      expect(getRenderCountRef.current()).to.equal(2);
    });

    it('should bind the default matchMedia to window', () => {
      const fakeMatchMedia = createMatchMedia(1200);
      window.matchMedia.restore();
      installMatchMedia(function matchMedia(query) {
        if (this !== window) {
          throw new TypeError('Illegal invocation');
        }

        return fakeMatchMedia(query);
      });

      function Test() {
        const matches = useMediaQuery('(min-width:100px)');

        return <span data-testid="matches">{`${matches}`}</span>;
      }

      expect(() => {
        render(<Test />);
      }).not.to.throw();
      expect(screen.getByTestId('matches').textContent).to.equal('true');
    });

    it('should not recreate the default matchMedia on unrelated rerenders', () => {
      let callCount = 0;
      const fakeMatchMedia = createMatchMedia(1200);
      window.matchMedia.restore();
      installMatchMedia((query) => {
        callCount += 1;
        return fakeMatchMedia(query);
      });

      function Test(props) {
        const matches = useMediaQuery('(min-width:100px)');

        return (
          <span data-testid="matches">
            {`${matches}`}
            {props.tick}
          </span>
        );
      }
      Test.propTypes = {
        tick: PropTypes.number.isRequired,
      };

      const { setProps } = render(<Test tick={0} />);
      const initialCallCount = callCount;

      setProps({ tick: 1 });

      expect(screen.getByTestId('matches').textContent).to.equal('true1');
      expect(callCount).to.equal(initialCallCount);
    });
  });

  describe('server-side', () => {
    it('should use the SSR match media implementation', () => {
      function MyComponent() {
        const matches = useMediaQuery('(min-width:2000px)');

        return <span>{`${matches}`}</span>;
      }

      function Test() {
        const ssrMatchMedia = (query) => ({
          matches: mediaQuery.match(query, {
            width: 3000,
          }),
        });

        return (
          <ThemeProvider
            theme={{ components: { MuiUseMediaQuery: { defaultProps: { ssrMatchMedia } } } }}
          >
            <MyComponent />
          </ThemeProvider>
        );
      }

      const { container } = renderToString(<Test />);

      expect(container.firstChild).to.have.text('true');
    });
  });

  describe('theme scoping', () => {
    it('should work with theme scoping', () => {
      function MyComponent() {
        const matches = useMediaQuery((theme) => theme.breakpoints.up('xl'));

        return <span>{`${matches}`}</span>;
      }

      function Test() {
        const ssrMatchMedia = (query) => ({
          matches: mediaQuery.match(query, {
            width: 3000,
          }),
        });

        return (
          <ThemeProvider
            theme={{
              [THEME_ID]: createTheme({
                components: { MuiUseMediaQuery: { defaultProps: { ssrMatchMedia } } },
              }),
            }}
          >
            <MyComponent />
          </ThemeProvider>
        );
      }

      const { container } = renderToString(<Test />);

      expect(container.firstChild).to.have.text('true');
    });
  });

  describe('warnings', () => {
    it('warns on invalid `query` argument', () => {
      function MyComponent() {
        useMediaQuery(() => '(min-width:2000px)');
        return null;
      }

      expect(() => {
        render(<MyComponent />);
      }).toErrorDev([
        'MUI: The `query` argument provided is invalid',
        !strictModeDoubleLoggingSuppressed && 'MUI: The `query` argument provided is invalid',
      ]);
    });
  });
});
