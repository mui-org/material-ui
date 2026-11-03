import * as React from 'react';
import { deepmerge, unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import { ThemeProvider, createTheme, useTheme, enhanceHighContrast } from '@mui/material/styles';
import type * as JsxRuntime from 'react/jsx-runtime';
import { ThemeOptionsContext, highDensity } from '../ThemeContext';
import { BrandingCssVarsProvider } from '../branding';
import { DemoIframe, IsolatedDemo } from '../DemoContent/DemoSandbox';

const defaultTheme = createTheme({
  colorSchemes: { light: true, dark: true },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  motion: {
    reducedMotion: 'system',
  },
});

type InjectTheme = () => Record<string, unknown>;
type GetInjectTheme = () => InjectTheme;

let injectThemeCache:
  { source: GetInjectTheme; promise: Promise<Record<string, unknown> | undefined> } | undefined;

function loadInjectedTheme(): Promise<Record<string, unknown> | undefined> {
  if (typeof window === 'undefined') {
    return Promise.resolve(undefined);
  }
  const runtimeWindow = window as typeof window & {
    React?: typeof React;
    jsx?: typeof JsxRuntime;
    getInjectTheme?: GetInjectTheme;
  };
  const source = runtimeWindow.getInjectTheme;
  if (typeof source !== 'function') {
    return Promise.resolve(undefined);
  }
  if (injectThemeCache?.source === source) {
    return injectThemeCache.promise;
  }

  const promise = (async () => {
    try {
      runtimeWindow.React = React;
      runtimeWindow.jsx = await import('react/jsx-runtime');
      const injectTheme = source();
      if (typeof injectTheme !== 'function') {
        return undefined;
      }
      const runtimeTheme = injectTheme();
      return Object.prototype.toString.call(runtimeTheme) === '[object Object]'
        ? runtimeTheme
        : undefined;
    } catch {
      return undefined;
    }
  })();
  injectThemeCache = { source, promise };
  return promise;
}

/**
 * Builds the Material UI theme shared by every (non-isolated) demo on a page.
 *
 * The result depends only on page-global inputs (`dense`, `direction`, the
 * upper branding `mode`), so it can be computed once and reused across all
 * demos rather than re-running the expensive `createTheme` — most notably its
 * CSS-variables generation — for each one.
 */
function createDemoBaseTheme(
  dense: boolean,
  direction: 'ltr' | 'rtl',
  upperMode?: 'light' | 'dark',
) {
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
        direction,
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
  return resultTheme;
}

/**
 * Holds the page-level base demo theme produced by `DemoPageThemeProvider`.
 * `null` when a `DemoInstanceThemeProvider` is rendered outside a page
 * provider, in which case it falls back to building its own theme.
 */
const DemoBaseThemeContext = React.createContext<ReturnType<typeof createDemoBaseTheme> | null>(
  null,
);

if (process.env.NODE_ENV !== 'production') {
  DemoBaseThemeContext.displayName = 'DemoBaseThemeContext';
}

/**
 * Computes the shared demo theme once and exposes it via context. Rendered
 * inside `BrandingCssVarsProvider` so `useTheme()` resolves to the branding
 * theme, matching what each `DemoInstanceThemeProvider` would otherwise read.
 */
function DemoBaseThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const { dense, direction } = React.useContext(ThemeOptionsContext);
  const upperMode = useTheme()?.palette?.mode;

  const baseTheme = React.useMemo(
    () => createDemoBaseTheme(dense, direction as 'ltr' | 'rtl', upperMode),
    [dense, direction, upperMode],
  );

  return (
    <DemoBaseThemeContext.Provider value={baseTheme}>{children}</DemoBaseThemeContext.Provider>
  );
}

export function DemoPageThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const themeOptions = React.useContext(ThemeOptionsContext);
  return (
    <BrandingCssVarsProvider {...themeOptions}>
      {/* The ThemeProvider below generate default Material UI CSS variables and attach to html for all the demo on the page */}
      {/* This is more performant than generating variables in each demo. */}
      <ThemeProvider theme={defaultTheme} />
      {/* Build the base demo theme once for the whole page; every */}
      {/* `DemoInstanceThemeProvider` below reuses it instead of recomputing. */}
      <DemoBaseThemeProvider>{children}</DemoBaseThemeProvider>
    </BrandingCssVarsProvider>
  );
}

export function DemoInstanceThemeProvider({
  children,
  runtimeTheme,
}: React.PropsWithChildren<{ runtimeTheme: any }>) {
  const { dense, direction } = React.useContext(ThemeOptionsContext);
  const upperMode = useTheme()?.palette?.mode;
  // Reuse the page-level theme when available; otherwise (e.g. rendered
  // standalone) build one from the same page-global inputs.
  const sharedBaseTheme = React.useContext(DemoBaseThemeContext);

  const theme = React.useMemo(() => {
    const resultTheme =
      sharedBaseTheme ?? createDemoBaseTheme(dense, direction as 'ltr' | 'rtl', upperMode);
    if (runtimeTheme && Object.prototype.toString.call(runtimeTheme) === '[object Object]') {
      try {
        // `deepmerge` clones by default, so the shared base theme is not mutated.
        return deepmerge(resultTheme, runtimeTheme);
      } catch {
        return resultTheme;
      }
    }
    return resultTheme;
  }, [sharedBaseTheme, runtimeTheme, dense, direction, upperMode]);

  return (
    /* - use a function to ensure that the upper theme (branding theme) is not spread to the demo theme */
    /* - a function will skip the CSS vars generation logic */
    <ThemeProvider theme={() => theme}>{children}</ThemeProvider>
  );
}

function DemoRuntimeThemeProvider({ children }: React.PropsWithChildren) {
  const [runtimeTheme, setRuntimeTheme] = React.useState<Record<string, unknown> | undefined>();

  useEnhancedEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof (window as typeof window & { getInjectTheme?: GetInjectTheme }).getInjectTheme !==
        'function'
    ) {
      return undefined;
    }
    let active = true;
    loadInjectedTheme().then((theme) => {
      if (active) {
        setRuntimeTheme(theme);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <DemoInstanceThemeProvider runtimeTheme={runtimeTheme}>{children}</DemoInstanceThemeProvider>
  );
}

/**
 * Wraps a demo's rendered component with the appropriate theme context and,
 * when requested, an iframe sandbox.
 *
 * - When `isolated` is false (default), wraps in `DemoInstanceThemeProvider`
 *   so the demo sees a fresh Material UI theme rather than inheriting the
 *   page's branding theme.
 * - When `isolated` is true, wraps in `SystemThemeProvider` that exposes only
 *   `direction` and `vars` from the upper theme — cutting MUI / Joy UI theme
 *   inheritance so the demo can own its `ThemeProvider`. The demo element is
 *   then cloned with `cssVarPrefix` / `colorSchemeNode` / etc. for its own
 *   `CssVarsProvider`.
 * - When `iframe` is true, the demo renders inside a `DemoIframe` portal so it
 *   gets its own document, CSS cascade, viewport, and `window`. The theme React
 *   context above still reaches the portaled demo, while emotion styles and CSS
 *   variables are redirected into the iframe by `FramedDemo`.
 */
export function DemoComponentTheme({
  children,
  isolated,
  iframe,
  iframeStyle,
  name,
}: {
  children: React.ReactNode;
  isolated?: boolean;
  iframe?: boolean;
  iframeStyle?: React.CSSProperties;
  name: string;
}) {
  const [colorSchemeNode, setColorSchemeNode] = React.useState<HTMLDivElement | null>(null);

  if (isolated && React.isValidElement(children)) {
    return (
      <SystemThemeProvider
        theme={(upperTheme: { direction?: 'ltr' | 'rtl'; vars?: Record<string, unknown> }) => ({
          direction: upperTheme.direction, // required for internal ThemeProvider
          vars: upperTheme.vars, // required for styling the wrapper / iframe
        })}
      >
        {iframe ? (
          <DemoIframe name={name} isolated style={iframeStyle}>
            {/* `IsolatedDemo` receives the iframe `window` via `FramedDemo`'s
                `cloneElement`, so its `CssVarsProvider` attaches to the iframe. */}
            <IsolatedDemo cssVarPrefix={name}>{children as React.ReactElement}</IsolatedDemo>
          </DemoIframe>
        ) : (
          <div ref={setColorSchemeNode}>
            <IsolatedDemo cssVarPrefix={name} colorSchemeNode={colorSchemeNode}>
              {children as React.ReactElement}
            </IsolatedDemo>
          </div>
        )}
      </SystemThemeProvider>
    );
  }

  return (
    <DemoRuntimeThemeProvider>
      {iframe && React.isValidElement(children) ? (
        <DemoIframe name={name} style={iframeStyle}>
          {children}
        </DemoIframe>
      ) : (
        children
      )}
    </DemoRuntimeThemeProvider>
  );
}
