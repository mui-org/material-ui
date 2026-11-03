import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import { createTheme, useTheme, styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/utils';
import type * as StylisPluginRtl from '@mui/stylis-plugin-rtl';
import { useTranslate } from '../i18n';
import { ThemeOptionsContext } from '../ThemeContext/ThemeContext';
import { useDemoContext } from '../DemoContext/DemoContext';
import { DemoErrorBoundary } from './DemoErrorBoundary';
import { DemoInstanceThemeProvider } from './DemoThemeProviders';

type RtlModule = typeof StylisPluginRtl;

let rtlModulePromise: Promise<RtlModule> | undefined;
function loadRtlModule() {
  rtlModulePromise ??= import('@mui/stylis-plugin-rtl');
  return rtlModulePromise;
}

const SRC_DOC = `<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap">
  </head>
  <body></body>
</html>`;

let globalInjectThemeCache: (() => Record<string, unknown>) | undefined;

interface MaterialIframeWrapperProps {
  children: React.ReactElement;
  isolated?: boolean;
}

/**
 * Default iframe wrapper for Material UI demos.
 * Creates a Material theme and injects its CSS variables.
 */
function MaterialIframeWrapper({ children, isolated }: MaterialIframeWrapperProps) {
  // This theme only used for generating CSS variables, NOT with the React context (ThemeProvider).
  const iframeTheme = React.useMemo(() => {
    if (isolated) {
      return null;
    }
    return createTheme({
      colorSchemes: { light: true, dark: true },
      cssVariables: {
        colorSchemeSelector: 'data-mui-color-scheme',
      },
    });
  }, [isolated]);

  return (
    <React.Fragment>
      {iframeTheme && <GlobalStyles styles={iframeTheme.generateStyleSheets?.() || []} />}
      {children}
    </React.Fragment>
  );
}

interface FramedDemoProps {
  children: React.ReactElement;
  document: Document;
  isolated?: boolean;
}

function FramedDemo(props: FramedDemoProps) {
  const { children, document, isolated } = props;
  const themeOptions = React.useContext(ThemeOptionsContext);
  const { IframeWrapper } = useDemoContext();

  const theme = useTheme();
  const rtl = theme.direction === 'rtl';
  const [rtlModule, setRtlModule] = React.useState<RtlModule | null>(null);

  React.useEffect(() => {
    if (rtl && !rtlModule) {
      loadRtlModule().then(setRtlModule);
    }
  }, [rtl, rtlModule]);

  React.useEffect(() => {
    if (!isolated) {
      document.body.setAttribute('dir', theme.direction);
      document.documentElement.style.colorScheme = themeOptions.paletteMode;
      document.documentElement.setAttribute('data-mui-color-scheme', themeOptions.paletteMode);
    }
  }, [document, isolated, theme.direction, themeOptions.paletteMode]);

  // Two caches sharing a key generate the same class names, so the key tracks the plugins. Rules
  // inserted while the RTL plugin is still loading would otherwise keep winning the cascade.
  const flipped = rtl ? rtlModule : null;

  const cache = React.useMemo(
    () =>
      createCache({
        key: `iframe-demo-${flipped ? 'rtl' : 'ltr'}`,
        prepend: true,
        container: document.head,
        stylisPlugins: flipped ? [prefixer, flipped.default] : [prefixer],
      }),
    [document, flipped],
  );

  const getWindow = React.useCallback(() => document.defaultView, [document]);

  // Clone children with window prop first
  const clonedChildren = React.cloneElement(children, { window: getWindow } as Partial<unknown> &
    React.Attributes);

  // Use custom wrapper from context, or default to MaterialIframeWrapper
  // Pass `null` explicitly via context to disable wrapper entirely
  const Wrapper = IframeWrapper === undefined ? MaterialIframeWrapper : IframeWrapper;

  return (
    <CacheProvider value={cache}>
      {Wrapper ? (
        <Wrapper document={document} isolated={isolated}>
          {clonedChildren}
        </Wrapper>
      ) : (
        clonedChildren
      )}
    </CacheProvider>
  );
}

const Iframe = styled('iframe')(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.background.default,
  flexGrow: 1,
  height: 400,
  border: 0,
  boxShadow: (theme.vars || theme)?.shadows?.[1],
}));

interface DemoIframeProps {
  children: React.ReactElement;
  name: string;
  isolated?: boolean;
  [key: string]: unknown;
}

function DemoIframe(props: DemoIframeProps) {
  const { children, name, isolated, ...other } = props;
  const frameRef = React.useRef<HTMLIFrameElement>(null);

  // If we portal content into the iframe before the load event then that content
  // is dropped in firefox.
  const [iframeLoaded, onLoad] = React.useReducer(() => true, false);

  React.useEffect(() => {
    const document = frameRef.current!.contentDocument;
    // When we hydrate the iframe then the load event is already dispatched
    // once the iframe markup is parsed (maybe later but the important part is
    // that it happens before React can attach event listeners).
    // We need to check the readyState of the document once the iframe is mounted
    // and "replay" the missed load event.
    // See https://github.com/react/react/pull/13862 for ongoing effort in React
    // (though not with iframes in mind).
    if (document != null && document.readyState === 'complete' && !iframeLoaded) {
      onLoad();
    }
  }, [iframeLoaded]);

  const document = frameRef.current?.contentDocument;
  return (
    <React.Fragment>
      <Iframe onLoad={onLoad} ref={frameRef} title={`${name} demo`} {...other} srcDoc={SRC_DOC} />
      {iframeLoaded !== false && document
        ? ReactDOM.createPortal(
            <FramedDemo document={document} isolated={isolated}>
              {children}
            </FramedDemo>,
            document.body,
          )
        : null}
    </React.Fragment>
  );
}

interface IsolatedDemoProps {
  children: React.ReactElement;
  /**
   * The CSS variables prefix will be the name of the demo to avoid clashing with other demos
   * because the generated CSS variables are global (always contain `:root`).
   */
  cssVarPrefix?: string;
  /**
   * The node to attach the selector. Ignored if `window` is provided.
   */
  colorSchemeNode?: Element | null;
  /**
   * Provided by `DemoIframe`.
   * If `window` is provided, the `colorSchemeNode` will be set to the html tag of the iframe.
   */
  window?: () => Window;
}

function IsolatedDemo({ children, cssVarPrefix, colorSchemeNode, window }: IsolatedDemoProps) {
  return React.cloneElement(children, {
    window,
    cssVarPrefix,
    colorSchemeNode: window ? window().document.documentElement : colorSchemeNode,
    colorSchemeSelector: 'class',
    documentNode: window ? window().document : undefined,
    disableNestedContext: true,
    storageManager: null,
  } as Partial<unknown> & React.Attributes);
}

export interface DemoSandboxProps {
  children: React.ReactElement;
  id: string;
  iframe?: boolean;
  isolated?: boolean;
  name: string;
  onResetDemoClick: () => void;
  [key: string]: unknown;
}

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
function DemoSandboxInner(props: DemoSandboxProps) {
  const { children, iframe = false, id, name, onResetDemoClick, isolated, ...other } = props;
  const [injectTheme, setInjectTheme] = React.useState<
    (() => Record<string, unknown>) | undefined
  >();
  const [root, setRoot] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRoot(document.getElementById(id));
  }, [id]);

  const t = useTranslate();

  useEnhancedEffect(() => {
    async function setupMaterialUITheme() {
      if (
        typeof (window as unknown as { getInjectTheme?: () => () => Record<string, unknown> })
          .getInjectTheme === 'function'
      ) {
        if (!globalInjectThemeCache) {
          (window as unknown as { React?: typeof React }).React = React;
          const jsx = await import('react/jsx-runtime');
          (window as unknown as { jsx?: typeof jsx }).jsx = jsx;
          globalInjectThemeCache = (
            window as unknown as { getInjectTheme: () => () => Record<string, unknown> }
          ).getInjectTheme();
        }
        setInjectTheme(globalInjectThemeCache);
      }
    }
    setupMaterialUITheme();
  }, []);

  return (
    <DemoErrorBoundary name={name} onResetDemoClick={onResetDemoClick} t={t}>
      {isolated ? (
        // Place ThemeProvider from MUI System here to disconnect the theme inheritance for Material UI
        // The demo will need to handle the ThemeProvider itself.
        <SystemThemeProvider
          theme={(upperTheme) => ({
            direction: (upperTheme as { direction: 'ltr' | 'rtl' }).direction, // required for internal ThemeProvider
            vars: (upperTheme as { vars?: Record<string, unknown> }).vars, // required for styling Iframe
          })}
        >
          {iframe ? (
            <DemoIframe name={name} isolated={isolated} {...other}>
              {/* `children` needs to be a child of `DemoIframe` since the iframe implementation rely on `cloneElement`. */}
              {/* the `colorSchemeNode` will be provided by DemoIframe through `window` prop */}
              <IsolatedDemo cssVarPrefix={name}>{children}</IsolatedDemo>
            </DemoIframe>
          ) : (
            <IsolatedDemo cssVarPrefix={name} colorSchemeNode={root}>
              {children}
            </IsolatedDemo>
          )}
        </SystemThemeProvider>
      ) : (
        <DemoInstanceThemeProvider runtimeTheme={injectTheme}>
          {iframe ? (
            <DemoIframe name={name} {...other}>
              {/* `children` needs to be a child of `DemoIframe` since the iframe implementation rely on `cloneElement`. */}
              {children}
            </DemoIframe>
          ) : (
            children
          )}
        </DemoInstanceThemeProvider>
      )}
    </DemoErrorBoundary>
  );
}

export const DemoSandbox = React.memo(DemoSandboxInner);
