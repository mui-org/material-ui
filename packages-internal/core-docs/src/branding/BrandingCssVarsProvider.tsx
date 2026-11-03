import * as React from 'react';
import { useRouter } from 'next/router';
import deepmerge from '@mui/utils/deepmerge';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { PaletteColorOptions } from '@mui/material/styles';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { colorChannel, getContrastRatio, lighten, darken } from '@mui/system/colorManipulator';
import CssBaseline from '@mui/material/CssBaseline';
import { getCookie, pathnameToLanguage } from '../helpers/helpers';
import { NextNProgressBar } from '../NextNProgressBar';
import { getDesignTokens, getThemedComponents } from './brandingTheme';
import { SkipLink, MarkdownLinks } from '../Link';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    primaryDark?: PaletteColorOptions;
  }
}

const { palette: lightPalette, typography, ...designTokens } = getDesignTokens('light');
const { palette: darkPalette } = getDesignTokens('dark');
const themeOptions = {
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  ...designTokens,
  motion: {
    reducedMotion: 'system' as const,
  },
  typography: deepmerge(typography, {
    h1: {
      '*:where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-common-white)',
      },
    },
    h2: {
      '*:where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-grey-100)',
      },
    },
    h5: {
      '*:where([data-mui-color-scheme="dark"]) &': {
        color: 'var(--muidocs-palette-primary-300)',
      },
    },
  }),
  ...getThemedComponents(),
};

export function setDocsColors(primary: Record<string, string>, secondary: Record<string, string>) {
  function injectPalette(prefix: string, palette: string, color: string, el: HTMLElement) {
    // simplified logic of `createPalette` to avoid `useTheme`.
    const light = lighten(color, 0.2);
    const dark = darken(color, 0.3);
    const contrastText = getContrastRatio(color, '#fff') >= 3 ? '#fff' : 'rgba(0, 0, 0, 0.87)';
    const elStyle = el.style;

    elStyle.setProperty(`--${prefix}-palette-${palette}-main`, color);
    elStyle.setProperty(`--${prefix}-palette-${palette}-mainChannel`, colorChannel(color));
    elStyle.setProperty(`--${prefix}-palette-${palette}-light`, light);
    elStyle.setProperty(`--${prefix}-palette-${palette}-lightChannel`, colorChannel(light));
    elStyle.setProperty(`--${prefix}-palette-${palette}-dark`, dark);
    elStyle.setProperty(`--${prefix}-palette-${palette}-darkChannel`, colorChannel(dark));
    elStyle.setProperty(`--${prefix}-palette-${palette}-contrastText`, contrastText);
    elStyle.setProperty(
      `--${prefix}-palette-${palette}-contrastTextChannel`,
      colorChannel(contrastText),
    );
  }
  if (typeof document !== 'undefined') {
    const htmlEl = document.documentElement;
    injectPalette('muidocs', 'primary', primary.main, htmlEl);
    injectPalette('muidocs', 'secondary', secondary.main, htmlEl);

    ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].forEach((key) => {
      htmlEl.style.setProperty(`--muidocs-palette-primary-${key}`, primary[key]);
      htmlEl.style.setProperty(`--muidocs-palette-secondary-${key}`, secondary[key]);
    });

    injectPalette('mui', 'primary', primary.main, htmlEl);
    injectPalette('mui', 'secondary', secondary.main, htmlEl);
  }
}

export function resetDocsColor() {
  if (typeof document !== 'undefined') {
    const htmlElStyle = document.documentElement.style;
    htmlElStyle.removeProperty('--muidocs-palette-primary-main');
    htmlElStyle.removeProperty('--muidocs-palette-secondary-main');
    htmlElStyle.removeProperty('--mui-palette-primary-main');
    htmlElStyle.removeProperty('--mui-palette-secondary-main');

    ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].forEach((key) => {
      htmlElStyle.removeProperty(`--muidocs-palette-primary-${key}`);
      htmlElStyle.removeProperty(`--muidocs-palette-secondary-${key}`);
    });
  }
}

export function setDocsSpacing(value: number) {
  if (typeof document !== 'undefined') {
    const htmlElStyle = document.documentElement.style;
    htmlElStyle.setProperty('--muidocs-spacing', `${value}px`);
    htmlElStyle.setProperty('--mui-spacing', `${value}px`);
  }
}

export function resetDocsSpacing() {
  if (typeof document !== 'undefined') {
    const htmlElStyle = document.documentElement.style;
    htmlElStyle.removeProperty('--muidocs-spacing');
    htmlElStyle.removeProperty('--mui-spacing');
  }
}

const themeCache: Map<string, ReturnType<typeof createTheme>> = new Map();
export function getTheme(direction: 'ltr' | 'rtl') {
  let cachedTheme = themeCache.get(direction);
  if (!cachedTheme) {
    cachedTheme = createTheme({
      cssVariables: {
        cssVarPrefix: 'muidocs',
        colorSchemeSelector: 'data-mui-color-scheme',
      },
      direction,
      ...themeOptions,
    });
    themeCache.set(direction, cachedTheme);
  }
  return cachedTheme!;
}

interface BrandingCssThemeProviderProps {
  children: React.ReactNode;
  direction?: 'ltr' | 'rtl';
  forceThemeRerender?: boolean;
}

export function BrandingCssThemeProvider({
  children,
  direction = 'ltr',
  forceThemeRerender = false,
}: BrandingCssThemeProviderProps) {
  const theme = React.useMemo(() => getTheme(direction), [direction]);
  return (
    <ThemeProvider
      theme={theme}
      disableTransitionOnChange
      // TODO: remove `forceThemeRerender` once custom theme on some demos rely on CSS variables instead of `theme.palette.mode`
      forceThemeRerender={forceThemeRerender}
    >
      {children}
    </ThemeProvider>
  );
}

export function BrandingCssVarsProvider(props: {
  children: React.ReactNode;
  direction?: 'ltr' | 'rtl';
}) {
  const { direction = 'ltr', children } = props;
  const { asPath } = useRouter();
  const { canonicalAs } = pathnameToLanguage(asPath);
  useEnhancedEffect(() => {
    const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
    if (nextPaletteColors) {
      setDocsColors(nextPaletteColors.primary, nextPaletteColors.secondary);
    }
  }, []);
  useEnhancedEffect(() => {
    // This is required to ensure that the layer order is declared first in the head
    // because when the direction is RTL on the client, emotion reinserts the RTL styles back to the top of the insertion point.
    if (direction === 'rtl') {
      const head = document.querySelector('head');
      if (head) {
        const style = document.createElement('style');
        style.textContent =
          '@layer theme, docsearch, mui, mui.global, mui.default, mui.theme, mui.custom, mui.sx, utilities;';
        head.prepend(style);
      }
    }
  }, [direction]);
  return (
    <BrandingCssThemeProvider
      direction={direction}
      forceThemeRerender={canonicalAs.startsWith('/x/') || canonicalAs.startsWith('/toolpad/')}
    >
      <NextNProgressBar />
      <CssBaseline />
      <SkipLink />
      <MarkdownLinks />
      {children}
    </BrandingCssThemeProvider>
  );
}
