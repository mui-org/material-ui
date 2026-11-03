'use client';
import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import { getThemeProps } from '../useThemeProps';
import useTheme from '../useThemeWithoutDefault';

export interface UseMediaQueryOptions {
  /**
   * As `window.matchMedia()` is unavailable on the server,
   * it returns a default matches during the first mount.
   * @default false
   */
  defaultMatches?: boolean | undefined;
  /**
   * You can provide your own implementation of matchMedia.
   * This can be used for handling an iframe content window.
   */
  matchMedia?: typeof window.matchMedia | undefined;
  /**
   * To perform the server-side hydration, the hook needs to render twice.
   * A first time with `defaultMatches`, the value of the server, and a second time with the resolved value.
   * This double pass rendering cycle comes with a drawback: it's slower.
   * You can set this option to `true` if you use the returned value **only** client-side.
   * @default false
   */
  noSsr?: boolean | undefined;
  /**
   * You can provide your own implementation of `matchMedia`, it's used when rendering server-side.
   */
  ssrMatchMedia?: ((query: string) => { matches: boolean }) | undefined;
}

// TODO React 17: Remove `useMediaQueryOld` once React 17 support is removed
function useMediaQueryOld(
  query: string,
  defaultMatches: boolean,
  matchMedia: typeof window.matchMedia | null,
  ssrMatchMedia: ((query: string) => { matches: boolean }) | null,
  noSsr: boolean,
): boolean {
  const [match, setMatch] = React.useState(() => {
    if (noSsr && matchMedia) {
      return matchMedia!(query).matches;
    }
    if (ssrMatchMedia) {
      return ssrMatchMedia(query).matches;
    }

    // Once the component is mounted, we rely on the
    // event listeners to return the correct matches value.
    return defaultMatches;
  });

  useEnhancedEffect(() => {
    if (!matchMedia) {
      return undefined;
    }

    const queryList = matchMedia!(query);
    const updateMatch = () => {
      setMatch(queryList.matches);
    };

    updateMatch();
    queryList.addEventListener('change', updateMatch);

    return () => {
      queryList.removeEventListener('change', updateMatch);
    };
  }, [query, matchMedia]);

  return match;
}

// See https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379 for why
const safeReact = { ...React };
const maybeReactUseSyncExternalStore: undefined | any = safeReact.useSyncExternalStore;

function useMediaQueryNew(
  query: string,
  defaultMatches: boolean,
  matchMedia: typeof window.matchMedia | null,
  ssrMatchMedia: ((query: string) => { matches: boolean }) | null,
  noSsr: boolean,
): boolean {
  const getDefaultSnapshot = React.useCallback(() => defaultMatches, [defaultMatches]);
  const getServerSnapshot = React.useMemo(() => {
    if (noSsr && matchMedia) {
      return () => matchMedia!(query).matches;
    }

    if (ssrMatchMedia !== null) {
      const { matches } = ssrMatchMedia(query);
      return () => matches;
    }
    return getDefaultSnapshot;
  }, [getDefaultSnapshot, query, ssrMatchMedia, noSsr, matchMedia]);
  const [getSnapshot, subscribe] = React.useMemo(() => {
    if (matchMedia === null) {
      return [getDefaultSnapshot, () => () => {}];
    }

    const mediaQueryList = matchMedia(query);

    return [
      () => mediaQueryList.matches,
      (notify: () => void) => {
        mediaQueryList.addEventListener('change', notify);
        return () => {
          mediaQueryList.removeEventListener('change', notify);
        };
      },
    ];
  }, [getDefaultSnapshot, matchMedia, query]);
  const match = maybeReactUseSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return match;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_createUseMediaQuery(params: { themeId?: string | undefined } = {}) {
  const { themeId } = params;
  return function useMediaQuery<Theme = unknown>(
    queryInput: string | ((theme: Theme) => string),
    options: UseMediaQueryOptions = {},
  ): boolean {
    let theme = useTheme<Theme>();
    if (theme && themeId) {
      theme = (theme as Record<string, any>)[themeId] || theme;
    }
    // Wait for jsdom to support the match media feature.
    // All the browsers MUI support have this built-in.
    // This defensive check is here for simplicity.
    // Most of the time, the match media logic isn't central to people tests.
    const supportMatchMedia =
      typeof window !== 'undefined' && typeof window.matchMedia !== 'undefined';
    const fallbackMatchMedia = supportMatchMedia ? window.matchMedia : null;
    const {
      defaultMatches = false,
      matchMedia: customMatchMedia,
      ssrMatchMedia = null,
      noSsr = false,
    } = getThemeProps({ name: 'MuiUseMediaQuery', props: options, theme });
    const matchMedia = React.useMemo(() => {
      if (customMatchMedia !== undefined) {
        return customMatchMedia;
      }

      if (fallbackMatchMedia === null) {
        return null;
      }

      return fallbackMatchMedia.bind(window);
    }, [customMatchMedia, fallbackMatchMedia]);

    if (process.env.NODE_ENV !== 'production') {
      if (typeof queryInput === 'function' && theme === null) {
        console.error(
          [
            'MUI: The `query` argument provided is invalid.',
            'You are providing a function without a theme in the context.',
            'One of the parent elements needs to use a ThemeProvider.',
          ].join('\n'),
        );
      }
    }

    let query = typeof queryInput === 'function' ? queryInput(theme) : queryInput;
    query = query.replace(/^@media( ?)/m, '');

    if (query.includes('print')) {
      console.warn(
        [
          `MUI: You have provided a \`print\` query to the \`useMediaQuery\` hook.`,
          'Using the print media query to modify print styles can lead to unexpected results.',
          'Consider using the `displayPrint` field in the `sx` prop instead.',
          'More information about `displayPrint` on our docs: https://mui.com/system/display/#display-in-print.',
        ].join('\n'),
      );
    }

    const useMediaQueryImplementation =
      maybeReactUseSyncExternalStore !== undefined ? useMediaQueryNew : useMediaQueryOld;
    const match = useMediaQueryImplementation(
      query,
      defaultMatches,
      matchMedia,
      ssrMatchMedia,
      noSsr,
    );

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useDebugValue({ query, match });
    }

    return match;
  };
}

const useMediaQuery = unstable_createUseMediaQuery();

export default useMediaQuery;
