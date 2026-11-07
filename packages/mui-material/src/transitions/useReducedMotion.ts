'use client';
import * as React from 'react';
import type { ReducedMotionMode } from '../styles/createMotion';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';
const REDUCED_MOTION_DURATION = 0;
const REDUCED_MOTION_DELAY = '0ms';
const NOOP = () => {};
const getDefaultSnapshot = () => false;
const getReducedMotionSnapshot = () => true;
const subscribeNoop = () => NOOP;

interface TransitionTiming {
  duration: string | number;
  delay: string | undefined;
}

/**
 * Subscribes to the OS reduced-motion media query only when the theme mode needs it.
 * Client renders read it directly, so new transitions skip the SSR-safe default.
 */
function useReducedMotionMediaQuery(enabled: boolean): boolean {
  const getServerSnapshot = enabled ? getReducedMotionSnapshot : getDefaultSnapshot;
  const [getSnapshot, subscribe] = React.useMemo(() => {
    if (!enabled || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return [getDefaultSnapshot, subscribeNoop];
    }

    const mediaQueryList = window.matchMedia(MEDIA_QUERY);

    return [
      () => mediaQueryList.matches,
      (notify: () => void) => {
        mediaQueryList.addEventListener('change', notify);
        return () => {
          mediaQueryList.removeEventListener('change', notify);
        };
      },
    ];
  }, [enabled]);

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Resolves whether a Material UI transition should reduce motion and provides
 * adjusted CSS transition timing for MUI-owned duration/delay values.
 */
export default function useReducedMotion(
  mode: ReducedMotionMode,
  disablePrefersReducedMotion: boolean | undefined,
) {
  const prefersReducedMotion = useReducedMotionMediaQuery(
    !disablePrefersReducedMotion && mode === 'system',
  );
  const shouldReduceMotion =
    !disablePrefersReducedMotion &&
    (mode === 'always' || (mode === 'system' && prefersReducedMotion));

  return React.useMemo(
    () => ({
      shouldReduceMotion,
      getTransitionTiming(timing: TransitionTiming): TransitionTiming {
        if (!shouldReduceMotion) {
          return timing;
        }

        return {
          duration: REDUCED_MOTION_DURATION,
          delay: REDUCED_MOTION_DELAY,
        };
      },
    }),
    [shouldReduceMotion],
  );
}
