'use client';
import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
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

interface MediaQueryState {
  /**
   * When `true` the hook will track OS-level `prefers-reduced-motion`.
   * This means the theme is in `system` mode and unknown media-query state
   * is treated as reduced-motion safe until resolved. It does not mean that
   * reduced motion is in effect.
   */
  enabled: boolean;
  matches: boolean | null;
}

/**
 * Subscribes to the OS reduced-motion media query only when the theme mode needs it.
 * React 17 reads the media query after mount, matching useMediaQuery's fallback path.
 */
function useReducedMotionMediaQueryOld(enabled: boolean): boolean | null {
  const [queryState, setQueryState] = React.useState<MediaQueryState>(() => ({
    enabled,
    matches: enabled ? null : false,
  }));

  let matches = queryState.matches;
  if (queryState.enabled !== enabled) {
    matches = null;
    if (!enabled) {
      matches = false;
    }
  }

  useEnhancedEffect(() => {
    const setResolvedMatches = (nextMatches: boolean | null) => {
      setQueryState((previousState) => {
        if (previousState.enabled === enabled && previousState.matches === nextMatches) {
          return previousState;
        }

        return {
          enabled,
          matches: nextMatches,
        };
      });
    };

    if (!enabled) {
      if (queryState.enabled) {
        setResolvedMatches(false);
      }

      return undefined;
    }

    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setResolvedMatches(false);
      return undefined;
    }

    const mediaQueryList = window.matchMedia(MEDIA_QUERY);
    const update = () => {
      setResolvedMatches(mediaQueryList.matches);
    };

    update();
    mediaQueryList.addEventListener('change', update);

    return () => {
      mediaQueryList.removeEventListener('change', update);
    };
  }, [enabled, queryState.enabled]);

  return matches;
}

// See https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379 for why
const safeReact = { ...React };
const maybeReactUseSyncExternalStore: undefined | any = safeReact.useSyncExternalStore;

/**
 * React 18+ can read the media query during client renders, so newly mounted
 * transitions do not start from the SSR-safe reduced-motion default.
 */
function useReducedMotionMediaQueryNew(enabled: boolean): boolean {
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

  return maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const useReducedMotionMediaQuery =
  maybeReactUseSyncExternalStore !== undefined
    ? useReducedMotionMediaQueryNew
    : useReducedMotionMediaQueryOld;

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
    (mode === 'always' || (mode === 'system' && prefersReducedMotion !== false));

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
