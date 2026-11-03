/* eslint-disable react/prefer-stateless-function */
import { describe, beforeEach, expect, it } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import { createRenderer, waitFor } from '@mui/internal-test-utils';
import elementTypeAcceptingRef from './elementTypeAcceptingRef';

const [reactMajor, reactMinor] = React.version.split('.').map(Number);

describe('elementTypeAcceptingRef', () => {
  const { render } = createRenderer();

  function checkPropType(elementType: any) {
    PropTypes.checkPropTypes(
      { component: elementTypeAcceptingRef },
      { component: elementType },
      'props',
      'DummyComponent',
    );
  }

  beforeEach(() => {
    PropTypes.resetWarningCache();
  });

  describe('acceptance', () => {
    function assertPass(Component: any, { failsOnMount = false, shouldMount = true } = {}) {
      function testAct() {
        checkPropType(Component);
        if (shouldMount) {
          render(<Component ref={React.createRef()} />);
        }
      }

      if (failsOnMount) {
        expect(testAct).toErrorDev([
          'Did you accidentally provide a React.Fragment instead?',
          reactMajor < 19 && 'Invalid attribute `ref` supplied to `React.Fragment`.',
          reactMajor === 19 &&
            reactMinor < 3 &&
            'Invalid prop `ref` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.',
        ]);
      } else {
        expect(testAct).not.toErrorDev();
      }
    }

    it('accepts nully values', () => {
      assertPass(undefined, { shouldMount: false });
      assertPass(null, { shouldMount: false });
    });

    it('accepts host components', () => {
      assertPass('div');
    });

    it('class components', () => {
      class Component extends React.Component {
        render() {
          return null;
        }
      }

      assertPass(Component);
    });

    it('accepts pure class components', () => {
      class Component extends React.PureComponent {
        render() {
          return null;
        }
      }

      assertPass(Component);
    });

    it('accepts forwardRef', () => {
      const Component = React.forwardRef(() => null);

      assertPass(Component);
    });

    it('accepts memo', () => {
      const Component = React.memo(React.forwardRef(() => null));

      assertPass(Component);
    });

    it('accepts lazy', async () => {
      const Component = React.lazy(() =>
        Promise.resolve({
          default: React.forwardRef<HTMLDivElement>((props, ref) => <div ref={ref} {...props} />),
        }),
      );

      function testAct() {
        checkPropType(Component);
        render(
          <React.Suspense fallback={<p />}>
            <Component ref={React.createRef()} />
          </React.Suspense>,
        );
      }

      await waitFor(() => {
        expect(testAct).not.toErrorDev();
      });
    });

    it('technically allows other exotics like strict mode', () => {
      assertPass(React.StrictMode);
    });

    // undesired behavior
    it('accepts Fragment', () => {
      assertPass(React.Fragment, { failsOnMount: true });
    });
  });

  describe('rejections', () => {
    function assertFail(Component: any, hint: string) {
      expect(() => {
        checkPropType(Component);
      }).toErrorDev(
        'Invalid props `component` supplied to `DummyComponent`. ' +
          `Expected an element type that can hold a ref. ${hint}`,
      );
    }

    it('rejects function components', () => {
      function Component() {
        return null;
      }

      assertFail(Component, 'Did you accidentally provide a plain function component instead?');
    });
  });
});
