import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { createTheme, useTheme, styled } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import type * as StylisPluginRtl from '@mui/stylis-plugin-rtl';
import { ThemeOptionsContext } from '../ThemeContext';
import { useDemoContext } from '../DemoContext';

type RtlModule = typeof StylisPluginRtl;

let rtlModulePromise: Promise<RtlModule> | undefined;
function loadRtlModule() {
  rtlModulePromise ??= import('@mui/stylis-plugin-rtl');
  return rtlModulePromise;
}

// Minimal document the iframe boots with. The demo tree is portaled into
// `<body>` once the iframe fires `load`; fonts are preconnected here so the
// demo doesn't flash unstyled text while the parent document's fonts load.
const SRC_DOC = `<!DOCTYPE html>
<html>
  <head>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap">
  </head>
  <body></body>
</html>`;

interface MaterialIframeWrapperProps {
  children: React.ReactElement;
  isolated?: boolean;
}

/**
 * Default iframe wrapper for Material UI demos. Generates the Material theme's
 * CSS variables and injects them into the iframe document via `GlobalStyles`,
 * since `:root` custom properties defined on the parent page do not cross the
 * iframe boundary. Products can override this through `DemoContext.IframeWrapper`.
 */
function MaterialIframeWrapper({ children, isolated }: MaterialIframeWrapperProps) {
  // This theme is only used to generate the CSS variable stylesheet, NOT as the
  // React theme context — that is supplied by `DemoComponentTheme` outside the
  // iframe and reaches the portaled demo through React context.
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

/**
 * Renders inside the iframe portal. Redirects emotion style injection to the
 * iframe `<head>`, mirrors the page's color scheme / direction onto the iframe
 * document, injects theme CSS variables, and passes the iframe's `window` down
 * to the demo so `position: fixed`, `useMediaQuery`, and portal containers
 * resolve against the iframe rather than the parent page.
 */
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

  // The iframe implementation relies on `cloneElement` to inject `window`: the
  // demo's root element receives a `() => iframeWindow` accessor.
  const clonedChildren = React.cloneElement(children, { window: getWindow } as Partial<unknown> &
    React.Attributes);

  // Use the product-provided wrapper from context, defaulting to
  // `MaterialIframeWrapper`. `null` explicitly disables wrapping.
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

/**
 * Renders the demo inside an `<iframe>` sandbox. The demo tree is portaled into
 * the iframe's body once it loads, giving the demo its own document, CSS
 * cascade, viewport, and `window` — required for `position: fixed`, responsive
 * breakpoints, `useMediaQuery`, and `window`-prop demos (AppBar, Drawer,
 * Dialog, Snackbar, Container, etc.).
 */
export function DemoIframe(props: DemoIframeProps) {
  const { children, name, isolated, ...other } = props;
  const frameRef = React.useRef<HTMLIFrameElement>(null);

  // If we portal content into the iframe before the load event then that
  // content is dropped in Firefox.
  const [iframeLoadEpoch, onLoad] = React.useReducer((epoch: number) => epoch + 1, 0);

  React.useEffect(() => {
    const frameDocument = frameRef.current!.contentDocument;
    // When we hydrate the iframe the load event has already been dispatched
    // before React can attach listeners, so check `readyState` once mounted
    // and "replay" the missed load event.
    // See https://github.com/facebook/react/pull/13862.
    if (frameDocument != null && frameDocument.readyState === 'complete' && iframeLoadEpoch === 0) {
      onLoad();
    }
  }, [iframeLoadEpoch]);

  const frameDocument = frameRef.current?.contentDocument;
  const frameBody = frameDocument?.body;
  return (
    <React.Fragment>
      <Iframe onLoad={onLoad} ref={frameRef} title={`${name} demo`} {...other} srcDoc={SRC_DOC} />
      {iframeLoadEpoch > 0 && frameDocument && frameBody
        ? ReactDOM.createPortal(
            <FramedDemo document={frameDocument} isolated={isolated}>
              {children}
            </FramedDemo>,
            frameBody,
          )
        : null}
    </React.Fragment>
  );
}

interface IsolatedDemoProps {
  children: React.ReactElement;
  /**
   * The CSS variables prefix, set to the demo name so the generated (always
   * global, `:root`-scoped) CSS variables don't clash with other demos.
   */
  cssVarPrefix?: string;
  /**
   * The node the color-scheme selector attaches to. Ignored when `window` is
   * provided (the iframe's `documentElement` is used instead).
   */
  colorSchemeNode?: Element | null;
  /**
   * Provided by `DemoIframe`. When present, the demo's `CssVarsProvider`
   * attaches to the iframe's document instead of the per-demo container.
   */
  window?: () => Window;
}

/**
 * Coerces a demo name into a valid CSS identifier for use as a `cssVarPrefix`.
 * The demo `name` doubles as a human-readable title (e.g. `"Mode Toggle Iframe"`),
 * but CSS custom-property names cannot contain whitespace or most punctuation —
 * an unsanitized prefix produces invalid `--<prefix>-palette-*` variables, so the
 * demo's theme variables never apply and it renders unstyled.
 */
function toCssVarPrefix(value: string | undefined): string | undefined {
  return value?.replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-+|-+$/g, '') || undefined;
}

/**
 * Clones an isolated demo (e.g. Joy UI) with the props its own
 * `CssVarsProvider` needs to attach to the right root — either the iframe
 * document (when `window` is provided) or the per-demo container node.
 */
export function IsolatedDemo({
  children,
  cssVarPrefix,
  colorSchemeNode,
  window,
}: IsolatedDemoProps) {
  return React.cloneElement(children, {
    window,
    cssVarPrefix: toCssVarPrefix(cssVarPrefix),
    colorSchemeNode: window ? window().document.documentElement : colorSchemeNode,
    colorSchemeSelector: 'class',
    documentNode: window ? window().document : undefined,
    disableNestedContext: true,
    storageManager: null,
  } as Partial<unknown> & React.Attributes);
}
