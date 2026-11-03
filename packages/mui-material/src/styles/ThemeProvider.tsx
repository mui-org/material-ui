'use client';
import * as React from 'react';
import type { DefaultTheme } from '@mui/system';
import type { StorageManager } from '@mui/system/cssVars';
import ThemeProviderNoVars from './ThemeProviderNoVars';
import type { CssThemeVariables } from './createThemeNoVars';
import { CssVarsProvider } from './ThemeProviderWithVars';
import type { CssVarsTheme } from './createThemeWithVars';
import THEME_ID from './identifier';

type ThemeProviderCssVariablesProps = CssThemeVariables extends { enabled: true }
  ? {
      /**
       * The node for attaching the `theme.colorSchemeSelector`.
       * @default document
       */
      colorSchemeNode?: Element | null | undefined;
      /**
       * If `true`, the provider creates its own context and generate stylesheet as if it is a root `ThemeProvider`.
       */
      disableNestedContext?: boolean | undefined;
      /**
       * If `true`, the style sheet for CSS theme variables won't be generated.
       *
       * This is useful for controlling nested ThemeProvider behavior.
       * @default false
       */
      disableStyleSheetGeneration?: boolean | undefined;
      /**
       * If `true`, theme values are recalculated when the mode changes.
       * The `theme.colorSchemes.{mode}.*` nodes will be shallow merged to the top-level of the theme.
       * @default false
       */
      forceThemeRerender?: boolean | undefined;
    }
  : {};

export interface ThemeProviderProps<Theme = DefaultTheme> extends ThemeProviderCssVariablesProps {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  /**
   * The document used to perform `disableTransitionOnChange` feature
   * @default document
   */
  documentNode?: Document | null | undefined;
  /**
   * The default mode when the local storage has no mode yet,
   * requires the theme to have `colorSchemes` with light and dark.
   * @default 'system'
   */
  defaultMode?: 'light' | 'dark' | 'system' | undefined;
  /**
   * The window that attaches the 'storage' event listener
   * @default window
   */
  storageWindow?: Window | null | undefined;
  /**
   * The storage manager to be used for storing the mode and color scheme
   * @default using `window.localStorage`
   */
  storageManager?: StorageManager | null | undefined;
  /**
   * localStorage key used to store application `mode`
   * @default 'mui-mode'
   */
  modeStorageKey?: string | undefined;
  /**
   * localStorage key used to store `colorScheme`
   * @default 'mui-color-scheme'
   */
  colorSchemeStorageKey?: string | undefined;
  /*
   * If `true`, ThemeProvider will not rerender and the initial value of `mode` comes from the local storage.
   * For SSR applications, you must ensure that the server render output must match the initial render output on the client.
   * @default false
   */
  noSsr?: boolean | undefined;
  /**
   * Disable CSS transitions when switching between modes or color schemes
   * @default false
   */
  disableTransitionOnChange?: boolean | undefined;
}

export default function ThemeProvider<Theme = DefaultTheme>({
  theme,
  ...props
}: ThemeProviderProps<Theme>) {
  const noVarsTheme = React.useMemo(() => {
    if (typeof theme === 'function') {
      return theme;
    }
    const muiTheme = (THEME_ID in theme ? theme[THEME_ID] : theme) as ThemeProviderProps['theme'];
    if (!('colorSchemes' in muiTheme)) {
      if (!('vars' in muiTheme)) {
        // For non-CSS variables themes, set `vars` to null to prevent theme inheritance from the upper theme.
        // The example use case is the docs demo that uses ThemeProvider to customize the theme while the upper theme is using CSS variables.
        return { ...theme, vars: null };
      }
      return theme;
    }
    return null;
  }, [theme]);

  if (noVarsTheme) {
    return <ThemeProviderNoVars theme={noVarsTheme} {...props} />;
  }
  return <CssVarsProvider theme={theme as unknown as CssVarsTheme} {...props} />;
}
