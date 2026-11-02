'use client';
import styleFunctionSx from '@mui/system/styleFunctionSx';
import type { SxProps } from '@mui/system';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';
import type { SupportedColorScheme, CssVarsTheme } from './createThemeWithVars';
import createTheme from './createTheme';
import createTypography from './createTypography';
import THEME_ID from './identifier';
import { defaultConfig } from '../InitColorSchemeScript/InitColorSchemeScript';

const {
  CssVarsProvider: InternalCssVarsProvider,
  useColorScheme,
  getInitColorSchemeScript: deprecatedGetInitColorSchemeScript,
} = createCssVarsProvider<SupportedColorScheme, typeof THEME_ID>({
  themeId: THEME_ID,
  theme: () => createTheme({ cssVariables: true }),
  colorSchemeStorageKey: defaultConfig.colorSchemeStorageKey,
  modeStorageKey: defaultConfig.modeStorageKey,
  defaultColorScheme: {
    light: defaultConfig.defaultLightColorScheme,
    dark: defaultConfig.defaultDarkColorScheme,
  },
  resolveTheme: (theme) => {
    const newTheme = {
      ...theme,
      typography: createTypography(theme.palette, theme.typography),
    };

    newTheme.unstable_sx = function sx(props: SxProps<CssVarsTheme>) {
      return styleFunctionSx({ sx: props, theme: this });
    };

    return newTheme;
  },
});

let warnedOnce = false;

// TODO: remove in v7
// eslint-disable-next-line @typescript-eslint/naming-convention
function Experimental_CssVarsProvider(props: any) {
  if (process.env.NODE_ENV !== 'production') {
    if (!warnedOnce) {
      console.warn(
        [
          'MUI: The Experimental_CssVarsProvider component has been ported into ThemeProvider.',
          '',
          "You should use `import { ThemeProvider } from '@mui/material/styles'` instead.",
          'For more details, check out https://mui.com/material-ui/customization/css-theme-variables/usage/',
        ].join('\n'),
      );

      warnedOnce = true;
    }
  }

  return <InternalCssVarsProvider {...props} />;
}

let warnedInitScriptOnce = false;

// TODO: remove in v7
const getInitColorSchemeScript: typeof deprecatedGetInitColorSchemeScript = (params) => {
  if (!warnedInitScriptOnce) {
    console.warn(
      [
        'MUI: The getInitColorSchemeScript function has been deprecated.',
        '',
        "You should use `import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'`",
        'and replace the function call with `<InitColorSchemeScript />` instead.',
      ].join('\n'),
    );

    warnedInitScriptOnce = true;
  }
  return deprecatedGetInitColorSchemeScript(params);
};

/**
 * TODO: remove this export in v7
 * @deprecated
 * The `CssVarsProvider` component has been deprecated and ported into `ThemeProvider`.
 *
 * You should use `ThemeProvider` and `createTheme()` instead:
 *
 * ```diff
 * - import { CssVarsProvider, extendTheme } from '@mui/material/styles';
 * + import { ThemeProvider, createTheme } from '@mui/material/styles';
 *
 * - const theme = extendTheme();
 * + const theme = createTheme({
 * +   cssVariables: true,
 * +   colorSchemes: { light: true, dark: true },
 * + });
 *
 * - <CssVarsProvider theme={theme}>
 * + <ThemeProvider theme={theme}>
 * ```
 *
 * To see the full documentation, check out https://mui.com/material-ui/customization/css-theme-variables/usage/.
 */
export const CssVarsProvider = InternalCssVarsProvider;

export { useColorScheme, getInitColorSchemeScript, Experimental_CssVarsProvider };
