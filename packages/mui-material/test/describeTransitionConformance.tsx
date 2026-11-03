import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { screen, isJsdom, createDescribe } from '@mui/internal-test-utils';
import type { Clock, MuiRenderResult } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type TransitionCallbackName =
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited';

interface TransitionConformanceOptions {
  /**
   * The transition component to test. It should accept the shared transition
   * props used by Material UI transition components: `in`, `timeout`, lifecycle
   * callbacks, and optionally `addEndListener`.
   */
  Component: React.ElementType;
  /**
   * The `render` helper returned by `createRenderer()`. These tests use its
   * `setProps` API to open and close the transition.
   */
  render: (element: React.ReactElement) => MuiRenderResult;
  /**
   * Fake timer controls returned by `createRenderer()`. Tests use them when a
   * timeout must finish before a lifecycle callback runs.
   */
  clock: Clock;
  /**
   * Props passed to every render. Use this for component-specific required
   * props, for example `direction` on `Slide`.
   */
  defaultProps?: Record<string, unknown>;
  /**
   * Child rendered inside the transition. Defaults to `<div id="test" />` so
   * the tests can check which DOM node lifecycle callbacks receive.
   */
  children?: React.ReactElement;
  /**
   * Returns the DOM node lifecycle callbacks should receive. Override this when
   * the component wraps its child or uses a different animated node.
   */
  getNode?: (container: HTMLElement) => HTMLElement | null;
  /**
   * Enables the shared lifecycle callback test. Component-specific assertions
   * can inspect the callback node without duplicating the common callback order
   * and node identity checks.
   */
  lifecycle?: {
    /**
     * Set to `true` when the component supports `addEndListener`. The test
     * checks that it receives the animated node and a `done` callback.
     */
    addEndListener?: boolean;
    /**
     * Optional assertion run after `onEnter` fires.
     */
    assertEnter?: (node: HTMLElement) => void;
    /**
     * Optional assertion run after `onEntering` fires.
     */
    assertEntering?: (node: HTMLElement) => void;
    /**
     * Optional assertion run after `onExit` fires.
     */
    assertExit?: (node: HTMLElement) => void;
    /**
     * Optional assertion run after `onExiting` fires.
     */
    assertExiting?: (node: HTMLElement) => void;
  };
  /**
   * Enables browser computed-style tests for default and custom theme
   * durations. `renderElement` must render the animated node with
   * `data-testid="child"`.
   */
  themeDuration?: {
    /**
     * Renders the transition fixture used by duration tests. The helper passes
     * extra props here when checking timeout values from props.
     */
    renderElement: (props?: Record<string, unknown>) => React.ReactElement;
    /**
     * Set to `true` when the component should also prove that
     * `timeout={{ enter: 1 }}` overrides the theme duration in a browser.
     */
    testPropTimeout?: boolean;
  };
  /**
   * Enables jsdom tests for inline styles created from the `timeout` prop. Use
   * this when the enter or exit timeout can be checked in a lifecycle callback.
   */
  propTimeout?: {
    /**
     * Enter timeout assertion. `callback` selects where the expected enter
     * style is available.
     */
    enter?: {
      timeout: number;
      callback: 'onEnter' | 'onEntering';
      assertStyle: (node: HTMLElement) => void;
    };
    /**
     * Exit timeout assertion. `callback` selects where the expected exit style
     * is available.
     */
    exit?: {
      timeout: number;
      callback: 'onExit' | 'onExiting';
      assertStyle: (node: HTMLElement) => void;
    };
  };
  /**
   * Enables shared reduced-motion behavior tests for public transition primitives.
   * Keep component-specific auto-duration and measurement details in the component tests.
   */
  reducedMotion?: {
    /**
     * Enter timeout used by generated reduced-motion tests.
     * Defaults to 250ms.
     */
    timeout?: number;
    /**
     * Optional assertion run after reduced motion zeroes component-owned timing.
     * When provided, the helper also verifies completion remains next-task async.
     */
    assertReducedTiming?: (node: HTMLElement) => void;
    /**
     * Set to `true` for transitions that normally force reflow before entering.
     * The helper verifies normal motion still reflows and reduced motion skips the reflow.
     */
    testReflow?: boolean;
    /**
     * Verifies `disablePrefersReducedMotion` restores authored timeout completion.
     */
    testOptOut?: boolean;
    /**
     * Verifies `disablePrefersReducedMotion` is consumed internally and not forwarded to the DOM.
     */
    testNoDomPropLeak?: boolean;
  };
}

const EMPTY_OBJECT = {};

function describeTransitionConformance(
  componentName: string,
  getOptions: () => TransitionConformanceOptions,
) {
  describe(`${componentName} transition conformance`, () => {
    const options = getOptions();
    const {
      Component,
      render,
      clock,
      defaultProps = EMPTY_OBJECT,
      children = <div id="test" />,
      getNode = (container) => container.querySelector('#test'),
    } = options;

    function getRequiredNode(container: HTMLElement) {
      const node = getNode(container);
      expect(node).not.to.equal(null);
      if (node == null) {
        throw new Error('Expected transition conformance test node.');
      }

      return node;
    }

    const lifecycle = options.lifecycle;

    if (lifecycle) {
      describe('lifecycle', () => {
        clock.withFakeTimers();

        it('calls transition lifecycle callbacks with the child node', () => {
          const addEndListener = spy();
          const handlers: Record<TransitionCallbackName, sinon.SinonSpy> = {
            onEnter: spy(),
            onEntering: spy(),
            onEntered: spy(),
            onExit: spy(),
            onExiting: spy(),
            onExited: spy(),
          };

          const props = {
            ...defaultProps,
            in: false,
            ...(lifecycle.addEndListener ? { addEndListener } : {}),
            ...handlers,
          };

          const { container, setProps } = render(<Component {...props}>{children}</Component>);
          const node = getRequiredNode(container);

          setProps({ ...props, in: true });

          if (lifecycle.addEndListener) {
            expect(addEndListener.callCount).to.equal(1);
            expect(addEndListener.args[0][0]).to.equal(node);
            expect(typeof addEndListener.args[0][1]).to.equal('function');
          }

          expect(handlers.onEnter.callCount).to.equal(1);
          expect(handlers.onEnter.args[0][0]).to.equal(node);
          lifecycle.assertEnter?.(handlers.onEnter.args[0][0]);

          expect(handlers.onEntering.callCount).to.equal(1);
          expect(handlers.onEntering.args[0][0]).to.equal(node);
          lifecycle.assertEntering?.(handlers.onEntering.args[0][0]);

          clock.tick(1000);
          expect(handlers.onEntered.callCount).to.equal(1);
          expect(handlers.onEntered.args[0][0]).to.equal(node);

          setProps({ ...props, in: false });

          expect(handlers.onExit.callCount).to.equal(1);
          expect(handlers.onExit.args[0][0]).to.equal(node);
          lifecycle.assertExit?.(handlers.onExit.args[0][0]);

          expect(handlers.onExiting.callCount).to.equal(1);
          expect(handlers.onExiting.args[0][0]).to.equal(node);
          lifecycle.assertExiting?.(handlers.onExiting.args[0][0]);

          clock.tick(1000);
          expect(handlers.onExited.callCount).to.equal(1);
          expect(handlers.onExited.args[0][0]).to.equal(node);
        });
      });
    }

    const themeDuration = options.themeDuration;

    if (themeDuration) {
      describe('theme duration', () => {
        it.skipIf(isJsdom())('uses the default theme duration by default', function test() {
          const theme = createTheme();
          const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;

          render(themeDuration.renderElement());

          expect(screen.getByTestId('child')).toHaveComputedStyle({
            transitionDuration: `${enteringScreenDurationInSeconds}s`,
          });
        });

        it.skipIf(isJsdom())('uses custom theme duration', function test() {
          const theme = createTheme({
            transitions: {
              duration: {
                enteringScreen: 1,
              },
            },
          });

          render(<ThemeProvider theme={theme}>{themeDuration.renderElement()}</ThemeProvider>);

          expect(screen.getByTestId('child')).toHaveComputedStyle({
            transitionDuration: '0.001s',
          });
        });

        if (themeDuration.testPropTimeout) {
          it.skipIf(isJsdom())('uses values provided via prop', function test() {
            render(themeDuration.renderElement({ timeout: { enter: 1 } }));

            expect(screen.getByTestId('child')).toHaveComputedStyle({
              transitionDuration: '0.001s',
            });
          });
        }
      });
    }

    const propTimeout = options.propTimeout;

    if (propTimeout) {
      describe('prop: timeout', () => {
        const enterTimeout = propTimeout.enter;
        const exitTimeout = propTimeout.exit;

        if (enterTimeout) {
          it('creates the configured enter animation', () => {
            const handler = spy();
            const props = {
              ...defaultProps,
              in: false,
              timeout: { enter: enterTimeout.timeout },
              [enterTimeout.callback]: handler,
            };
            const { setProps } = render(<Component {...props}>{children}</Component>);

            setProps({ ...props, in: true });
            expect(handler.callCount).to.equal(1);
            enterTimeout.assertStyle(handler.args[0][0]);
          });
        }

        if (exitTimeout) {
          it('creates the configured exit animation', () => {
            const handler = spy();
            const props = {
              ...defaultProps,
              in: true,
              appear: false,
              timeout: { exit: exitTimeout.timeout },
              [exitTimeout.callback]: handler,
            };
            const { setProps } = render(<Component {...props}>{children}</Component>);

            setProps({ ...props, in: false });
            expect(handler.callCount).to.equal(1);
            exitTimeout.assertStyle(handler.args[0][0]);
          });
        }
      });
    }

    const reducedMotion = options.reducedMotion;

    if (reducedMotion) {
      describe('reduced motion', () => {
        clock.withFakeTimers();

        const timeout = reducedMotion.timeout ?? 250;
        const theme = createTheme({
          motion: {
            reducedMotion: 'always',
          },
        });

        function ReducedMotionTest(props: Record<string, unknown>) {
          return (
            <ThemeProvider theme={theme}>
              <Component {...defaultProps} {...props}>
                {children}
              </Component>
            </ThemeProvider>
          );
        }

        const assertReducedTiming = reducedMotion.assertReducedTiming;

        if (assertReducedTiming) {
          it('reduces timing to 0ms when the theme mode is always', () => {
            const handleEntered = spy();
            const { container, setProps } = render(
              <ReducedMotionTest
                in={false}
                timeout={{ enter: timeout }}
                onEntered={handleEntered}
              />,
            );
            const node = getRequiredNode(container);

            setProps({ in: true });

            assertReducedTiming(node);
            expect(handleEntered.callCount).to.equal(0);

            clock.tick(0);

            expect(handleEntered.callCount).to.equal(1);
          });
        }

        if (reducedMotion.testReflow) {
          it('reflows before entering when motion is enabled', () => {
            const scrollTopGetter = spy(() => 0);

            function Test(props: Record<string, unknown>) {
              return (
                <Component {...defaultProps} timeout={{ enter: timeout }} {...props}>
                  {children}
                </Component>
              );
            }

            const { container, setProps } = render(<Test in={false} />);
            const node = getRequiredNode(container);
            Object.defineProperty(node, 'scrollTop', {
              configurable: true,
              get: scrollTopGetter,
            });

            setProps({ in: true });

            expect(scrollTopGetter.callCount).to.equal(1);
          });

          it('skips reflow before entering when reduced motion is always', () => {
            const scrollTopGetter = spy(() => 0);
            const { container, setProps } = render(
              <ReducedMotionTest in={false} timeout={{ enter: timeout }} />,
            );
            const node = getRequiredNode(container);
            Object.defineProperty(node, 'scrollTop', {
              configurable: true,
              get: scrollTopGetter,
            });

            setProps({ in: true });

            expect(scrollTopGetter.callCount).to.equal(0);
          });
        }

        if (reducedMotion.testOptOut) {
          it('disablePrefersReducedMotion restores normal timing', () => {
            const handleEntered = spy();
            const { setProps } = render(
              <ReducedMotionTest
                in={false}
                timeout={{ enter: timeout }}
                onEntered={handleEntered}
                disablePrefersReducedMotion
              />,
            );

            setProps({ in: true });

            expect(handleEntered.callCount).to.equal(0);
            clock.tick(0);
            expect(handleEntered.callCount).to.equal(0);

            clock.tick(timeout);

            expect(handleEntered.callCount).to.equal(1);
          });
        }

        if (reducedMotion.testNoDomPropLeak) {
          it('does not forward disablePrefersReducedMotion to the DOM node', () => {
            const { container } = render(
              <Component {...defaultProps} in disablePrefersReducedMotion>
                {children}
              </Component>,
            );
            const node = getRequiredNode(container);

            expect(node).not.to.have.attribute('disablePrefersReducedMotion');
          });
        }
      });
    }
  });
}

export default createDescribe('MUI transition API', describeTransitionConformance);
