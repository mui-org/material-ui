'use client';
import * as React from 'react';
import {
  DEFAULT_MODE_STORAGE_KEY,
  DEFAULT_COLOR_SCHEME_STORAGE_KEY,
} from '../InitColorSchemeScript/InitColorSchemeScript';
import type { StorageManager } from './localStorageManager';
import localStorageManager from './localStorageManager';

export type Mode = 'light' | 'dark' | 'system';
export type SystemMode = Exclude<Mode, 'system'>;

export interface State<SupportedColorScheme extends string> {
  /**
   * User selected mode.
   * Note: on the server, mode is always undefined
   */
  mode: 'light' | 'dark' | 'system' | undefined;
  /**
   * Only valid if `mode: 'system'`, either 'light' | 'dark'.
   */
  systemMode: 'light' | 'dark' | undefined;
  /**
   * The color scheme for the light mode.
   */
  lightColorScheme: SupportedColorScheme;
  /**
   * The color scheme for the dark mode.
   */
  darkColorScheme: SupportedColorScheme;
}

export type Result<SupportedColorScheme extends string> = State<SupportedColorScheme> & {
  /**
   * The current application color scheme. It is always `undefined` on the server.
   */
  colorScheme: SupportedColorScheme | undefined;
  /**
   * `mode` is saved to internal state and localStorage
   * If `mode` is null, it will be reset to the defaultMode
   */
  setMode: (mode: Mode | null) => void;
  /**
   * `colorScheme` is saved to internal state and localStorage
   * If `colorScheme` is null, it will be reset to the defaultColorScheme (light | dark)
   */
  setColorScheme: (
    colorScheme:
      | SupportedColorScheme
      | Partial<{
          light: SupportedColorScheme | null;
          dark: SupportedColorScheme | null;
        }>
      | null,
  ) => void;
};

function noop() {}

export function getSystemMode(mode: undefined | string): SystemMode | undefined {
  if (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    mode === 'system'
  ) {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      return 'dark';
    }
    return 'light';
  }
  return undefined;
}

function processState<T>(
  state: { mode: Mode | undefined; systemMode: SystemMode | undefined },
  callback: (mode: SystemMode) => T,
) {
  if (state.mode === 'light' || (state.mode === 'system' && state.systemMode === 'light')) {
    return callback('light');
  }
  if (state.mode === 'dark' || (state.mode === 'system' && state.systemMode === 'dark')) {
    return callback('dark');
  }
  return undefined;
}

export function getColorScheme<SupportedColorScheme extends string>(
  state: State<SupportedColorScheme>,
) {
  return processState(state, (mode) => {
    if (mode === 'light') {
      return state.lightColorScheme;
    }
    if (mode === 'dark') {
      return state.darkColorScheme;
    }
    return undefined;
  });
}

interface UseCurrentColoSchemeOptions<SupportedColorScheme extends string> {
  defaultLightColorScheme: SupportedColorScheme;
  defaultDarkColorScheme: SupportedColorScheme;
  supportedColorSchemes: Array<SupportedColorScheme>;
  defaultMode?: Mode | undefined;
  modeStorageKey?: string | undefined;
  colorSchemeStorageKey?: string | undefined;
  storageWindow?: Window | null | undefined;
  storageManager?: StorageManager | null | undefined;
  noSsr?: boolean | undefined;
}

export default function useCurrentColorScheme<SupportedColorScheme extends string>(
  options: UseCurrentColoSchemeOptions<SupportedColorScheme>,
): Result<SupportedColorScheme> {
  const {
    defaultMode = 'light',
    defaultLightColorScheme,
    defaultDarkColorScheme,
    supportedColorSchemes = [],
    modeStorageKey = DEFAULT_MODE_STORAGE_KEY,
    colorSchemeStorageKey = DEFAULT_COLOR_SCHEME_STORAGE_KEY,
    storageWindow = typeof window === 'undefined' ? undefined : window,
    storageManager = localStorageManager,
    noSsr = false,
  } = options;

  const joinedColorSchemes = supportedColorSchemes.join(',');
  const isMultiSchemes = supportedColorSchemes.length > 1;
  const modeStorage = React.useMemo(
    () => storageManager?.({ key: modeStorageKey, storageWindow }),
    [storageManager, modeStorageKey, storageWindow],
  );
  const lightStorage = React.useMemo(
    () => storageManager?.({ key: `${colorSchemeStorageKey}-light`, storageWindow }),
    [storageManager, colorSchemeStorageKey, storageWindow],
  );
  const darkStorage = React.useMemo(
    () => storageManager?.({ key: `${colorSchemeStorageKey}-dark`, storageWindow }),
    [storageManager, colorSchemeStorageKey, storageWindow],
  );

  const [state, setState] = React.useState(() => {
    const initialMode = modeStorage?.get(defaultMode) || defaultMode;
    const lightColorScheme = lightStorage?.get(defaultLightColorScheme) || defaultLightColorScheme;
    const darkColorScheme = darkStorage?.get(defaultDarkColorScheme) || defaultDarkColorScheme;
    return {
      mode: initialMode,
      systemMode: getSystemMode(initialMode),
      lightColorScheme,
      darkColorScheme,
    } as State<SupportedColorScheme>;
  });
  const [isClient, setIsClient] = React.useState(noSsr || !isMultiSchemes);
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true); // to rerender the component after hydration
  }, []);

  const colorScheme = getColorScheme(state);

  const setMode: Result<SupportedColorScheme>['setMode'] = React.useCallback(
    (mode) => {
      setState((currentState) => {
        if (mode === currentState.mode) {
          // do nothing if mode does not change
          return currentState;
        }
        const newMode = mode ?? defaultMode;
        modeStorage?.set(newMode);
        return {
          ...currentState,
          mode: newMode,
          systemMode: getSystemMode(newMode),
        };
      });
    },
    [modeStorage, defaultMode],
  );

  const setColorScheme: Result<SupportedColorScheme>['setColorScheme'] = React.useCallback(
    (value) => {
      if (!value) {
        setState((currentState) => {
          lightStorage?.set(defaultLightColorScheme);
          darkStorage?.set(defaultDarkColorScheme);
          return {
            ...currentState,
            lightColorScheme: defaultLightColorScheme,
            darkColorScheme: defaultDarkColorScheme,
          };
        });
      } else if (typeof value === 'string') {
        if (value && !joinedColorSchemes.includes(value)) {
          console.error(`\`${value}\` does not exist in \`theme.colorSchemes\`.`);
        } else {
          setState((currentState) => {
            const newState = { ...currentState };
            processState(currentState, (mode) => {
              if (mode === 'light') {
                lightStorage?.set(value);
                newState.lightColorScheme = value;
              }
              if (mode === 'dark') {
                darkStorage?.set(value);
                newState.darkColorScheme = value;
              }
            });
            return newState;
          });
        }
      } else {
        setState((currentState) => {
          const newState = { ...currentState };
          const newLightColorScheme = value.light === null ? defaultLightColorScheme : value.light;
          const newDarkColorScheme = value.dark === null ? defaultDarkColorScheme : value.dark;

          if (newLightColorScheme) {
            if (!joinedColorSchemes.includes(newLightColorScheme)) {
              console.error(`\`${newLightColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
            } else {
              newState.lightColorScheme = newLightColorScheme;
              lightStorage?.set(newLightColorScheme);
            }
          }

          if (newDarkColorScheme) {
            if (!joinedColorSchemes.includes(newDarkColorScheme)) {
              console.error(`\`${newDarkColorScheme}\` does not exist in \`theme.colorSchemes\`.`);
            } else {
              newState.darkColorScheme = newDarkColorScheme;
              darkStorage?.set(newDarkColorScheme);
            }
          }

          return newState;
        });
      }
    },
    [
      joinedColorSchemes,
      lightStorage,
      darkStorage,
      defaultLightColorScheme,
      defaultDarkColorScheme,
    ],
  );

  const handleMediaQuery = React.useCallback(
    (event?: MediaQueryListEvent) => {
      if (state.mode === 'system') {
        setState((currentState) => {
          const systemMode = event?.matches ? 'dark' : 'light';

          // Early exit, nothing changed.
          if (currentState.systemMode === systemMode) {
            return currentState;
          }
          return { ...currentState, systemMode };
        });
      }
    },
    [state.mode],
  );

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = React.useRef(handleMediaQuery);
  mediaListener.current = handleMediaQuery;

  React.useEffect(() => {
    if (typeof window.matchMedia !== 'function' || !isMultiSchemes) {
      return undefined;
    }
    const handler = (...args: any) => mediaListener.current(...args);

    // Always listen to System preference
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handler);
    handler(media);
    return () => {
      media.removeListener(handler);
    };
  }, [isMultiSchemes]);

  // Handle when localStorage has changed
  React.useEffect(() => {
    if (isMultiSchemes) {
      const unsubscribeMode =
        modeStorage?.subscribe((value: Mode) => {
          if (!value || ['light', 'dark', 'system'].includes(value)) {
            setMode((value as Mode) || defaultMode);
          }
        }) || noop;
      const unsubscribeLight =
        lightStorage?.subscribe((value: SupportedColorScheme) => {
          if (!value || joinedColorSchemes.match(value)) {
            setColorScheme({ light: value as SupportedColorScheme | null });
          }
        }) || noop;
      const unsubscribeDark =
        darkStorage?.subscribe((value: SupportedColorScheme) => {
          if (!value || joinedColorSchemes.match(value)) {
            setColorScheme({ dark: value as SupportedColorScheme | null });
          }
        }) || noop;
      return () => {
        unsubscribeMode();
        unsubscribeLight();
        unsubscribeDark();
      };
    }
    return undefined;
  }, [
    setColorScheme,
    setMode,
    joinedColorSchemes,
    defaultMode,
    storageWindow,
    isMultiSchemes,
    modeStorage,
    lightStorage,
    darkStorage,
  ]);

  return {
    ...state,
    mode: isClient ? state.mode : undefined,
    systemMode: isClient ? state.systemMode : undefined,
    colorScheme: isClient ? colorScheme : undefined,
    setMode,
    setColorScheme,
  };
}
