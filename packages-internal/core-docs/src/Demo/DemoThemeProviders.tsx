import * as React from 'react';
import { deepmerge } from '@mui/utils';
import { ThemeProvider, createTheme, useTheme, enhanceHighContrast } from '@mui/material/styles';
import { ThemeOptionsContext, highDensity } from '../ThemeContext';
import { BrandingCssVarsProvider } from '../branding';

const defaultTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  motion: {
    reducedMotion: 'system',
  },
});

export function DemoPageThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const themeOptions = React.useContext(ThemeOptionsContext);
  return (
    <BrandingCssVarsProvider {...themeOptions}>
      {/* The ThemeProvider below generate default Material UI CSS variables and attach to html for all the demo on the page */}
      {/* This is more performant than generating variables in each demo. */}
      <ThemeProvider theme={defaultTheme} />
      {children}
    </BrandingCssVarsProvider>
  );
}

export function DemoInstanceThemeProvider({
  children,
  runtimeTheme,
}: React.PropsWithChildren<{ runtimeTheme: any }>) {
  const { dense, direction } = React.useContext(ThemeOptionsContext);
  const upperTheme = useTheme();
  const upperMode = upperTheme?.palette?.mode;

  const theme = React.useMemo(() => {
    const resultTheme = enhanceHighContrast(
      createTheme(
        {
          cssVariables: {
            colorSchemeSelector: 'data-mui-color-scheme',
          },
          colorSchemes: {
            light: true,
            dark: true,
          },
          direction: direction as 'ltr' | 'rtl',
          motion: {
            reducedMotion: 'system',
          },
        },
        dense ? highDensity : {},
      ),
    );
    if (upperMode) {
      Object.assign(resultTheme, resultTheme.colorSchemes[upperMode]);
    }
    if (runtimeTheme && Object.prototype.toString.call(runtimeTheme) === '[object Object]') {
      try {
        return deepmerge(resultTheme, runtimeTheme);
      } catch {
        return resultTheme;
      }
    }
    return resultTheme;
  }, [runtimeTheme, dense, direction, upperMode]);

  return (
    /* - use a function to ensure that the upper theme (branding theme) is not spread to the demo theme */
    /* - a function will skip the CSS vars generation logic */
    <ThemeProvider theme={() => theme}>{children}</ThemeProvider>
  );
}
