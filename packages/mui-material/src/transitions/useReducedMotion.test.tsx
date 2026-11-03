import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer, RenderCounter, screen } from '@mui/internal-test-utils';
import type { ReducedMotionMode } from '../styles/createMotion';
import useReducedMotion from './useReducedMotion';

const safeReact = { ...React };
const usesUseSyncExternalStore = safeReact.useSyncExternalStore !== undefined;
const NOOP = () => {};

describe('useReducedMotion', () => {
  const { render, renderToString } = createRenderer();
  let originalMatchMedia: typeof window.matchMedia;
  let addEventListenerCount = 0;
  let removeEventListenerCount = 0;
  let listeners: Array<() => void> = [];
  let instance: MediaQueryList;

  function installMatchMedia(matches: boolean) {
    listeners = [];
    addEventListenerCount = 0;
    removeEventListenerCount = 0;
    instance = {
      matches,
      media: '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: (_eventType: string, listener: EventListenerOrEventListenerObject) => {
        addEventListenerCount += 1;
        listeners.push(listener as () => void);
      },
      removeEventListener: (_eventType: string, listener: EventListenerOrEventListenerObject) => {
        removeEventListenerCount += 1;
        listeners = listeners.filter((item) => item !== listener);
      },
      addListener: NOOP,
      removeListener: NOOP,
      dispatchEvent: () => true,
    };

    window.matchMedia = () => instance;
  }

  function Test(props: { mode: ReducedMotionMode; disablePrefersReducedMotion?: boolean }) {
    const reducedMotion = useReducedMotion(props.mode, props.disablePrefersReducedMotion);
    const transitionTiming = reducedMotion.getTransitionTiming({
      duration: 250,
      delay: '20ms',
    });

    return (
      <span
        data-testid="result"
        data-delay={transitionTiming.delay}
        data-duration={transitionTiming.duration}
        data-should-reduce={reducedMotion.shouldReduceMotion}
      />
    );
  }

  beforeEach(() => {
    originalMatchMedia = window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('does not subscribe to matchMedia when mode is never', () => {
    installMatchMedia(true);

    const { unmount } = render(<Test mode="never" />);

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');
    expect(screen.getByTestId('result')).to.have.attribute('data-duration', '250');
    expect(addEventListenerCount).to.equal(0);

    unmount();
    expect(removeEventListenerCount).to.equal(0);
  });

  it('does not subscribe to matchMedia when mode is always', () => {
    installMatchMedia(false);

    const { unmount } = render(<Test mode="always" />);

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'true');
    expect(screen.getByTestId('result')).to.have.attribute('data-duration', '0');
    expect(screen.getByTestId('result')).to.have.attribute('data-delay', '0ms');
    expect(addEventListenerCount).to.equal(0);

    unmount();
    expect(removeEventListenerCount).to.equal(0);
  });

  it('subscribes and unsubscribes only when mode is system', () => {
    installMatchMedia(false);

    const { unmount } = render(<Test mode="system" />);

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');
    expect(addEventListenerCount).to.be.greaterThan(0);

    unmount();
    expect(removeEventListenerCount).to.equal(addEventListenerCount);
  });

  it('uses the resolved media query for the first client render when available', () => {
    installMatchMedia(false);
    const renderedValues: boolean[] = [];

    function LoggingTest(props: {
      mode: ReducedMotionMode;
      disablePrefersReducedMotion?: boolean;
    }) {
      const reducedMotion = useReducedMotion(props.mode, props.disablePrefersReducedMotion);
      renderedValues.push(reducedMotion.shouldReduceMotion);

      return <span data-testid="result" data-should-reduce={reducedMotion.shouldReduceMotion} />;
    }

    render(<LoggingTest mode="system" />);

    expect(renderedValues[0]).to.equal(!usesUseSyncExternalStore);
    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');
  });

  it('reacts to media query changes in system mode', () => {
    installMatchMedia(false);

    render(<Test mode="system" />);
    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');

    act(() => {
      Object.defineProperty(instance, 'matches', {
        configurable: true,
        value: true,
      });
      listeners.forEach((listener) => {
        listener();
      });
    });

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'true');
    expect(screen.getByTestId('result')).to.have.attribute('data-duration', '0');
    expect(screen.getByTestId('result')).to.have.attribute('data-delay', '0ms');
  });

  it('server-renders system mode as reduced-motion safe before hydration', () => {
    installMatchMedia(false);

    const { container } = renderToString(<Test mode="system" />);
    const result = container.querySelector('[data-testid="result"]');

    expect(result).to.have.attribute('data-should-reduce', 'true');
    expect(result).to.have.attribute('data-duration', '0');
    expect(result).to.have.attribute('data-delay', '0ms');
  });

  it('uses the resolved media query when system mode is enabled after opt-out', () => {
    installMatchMedia(false);
    const renderedValues: boolean[] = [];

    function LoggingTest(props: {
      mode: ReducedMotionMode;
      disablePrefersReducedMotion?: boolean;
    }) {
      const reducedMotion = useReducedMotion(props.mode, props.disablePrefersReducedMotion);
      renderedValues.push(reducedMotion.shouldReduceMotion);

      return <span data-testid="result" data-should-reduce={reducedMotion.shouldReduceMotion} />;
    }

    const { setProps } = render(<LoggingTest mode="system" disablePrefersReducedMotion />);
    expect(renderedValues[0]).to.equal(false);
    renderedValues.length = 0;

    setProps({ disablePrefersReducedMotion: false });

    expect(renderedValues[0]).to.equal(!usesUseSyncExternalStore);
    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');
  });

  it('hydrates from an SSR-safe default in system mode', () => {
    installMatchMedia(true);
    const getRenderCountRef = React.createRef<() => number>();

    function TestWithCounter(props: {
      mode: ReducedMotionMode;
      disablePrefersReducedMotion?: boolean;
    }) {
      const reducedMotion = useReducedMotion(props.mode, props.disablePrefersReducedMotion);

      return (
        <RenderCounter ref={getRenderCountRef}>
          <span data-testid="result" data-should-reduce={reducedMotion.shouldReduceMotion} />
        </RenderCounter>
      );
    }

    const { hydrate } = renderToString(<TestWithCounter mode="system" />);
    hydrate();

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'true');
    expect(getRenderCountRef.current!()).to.equal(usesUseSyncExternalStore ? 1 : 2);
  });

  it('allows per-instance opt-out', () => {
    installMatchMedia(false);

    render(<Test mode="always" disablePrefersReducedMotion />);

    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'false');
    expect(screen.getByTestId('result')).to.have.attribute('data-duration', '250');
    expect(screen.getByTestId('result')).to.have.attribute('data-delay', '20ms');
  });

  it('keeps the returned object stable while the resolved reduced-motion state is unchanged', () => {
    installMatchMedia(false);
    const values: Array<ReturnType<typeof useReducedMotion>> = [];

    function LoggingTest(props: {
      mode: ReducedMotionMode;
      disablePrefersReducedMotion?: boolean;
    }) {
      const reducedMotion = useReducedMotion(props.mode, props.disablePrefersReducedMotion);
      values.push(reducedMotion);

      return <span data-testid="result" data-should-reduce={reducedMotion.shouldReduceMotion} />;
    }

    const { setProps } = render(<LoggingTest mode="never" />);
    const firstValue = values[values.length - 1];

    setProps({ mode: 'never' });
    const stableValue = values[values.length - 1];

    expect(stableValue).to.equal(firstValue);

    setProps({ mode: 'always' });
    const changedValue = values[values.length - 1];

    expect(changedValue).not.to.equal(stableValue);
    expect(screen.getByTestId('result')).to.have.attribute('data-should-reduce', 'true');
  });
});
