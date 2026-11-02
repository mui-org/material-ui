import * as React from 'react';
import { Tabs } from '@base-ui/react/tabs';
import IconButton from '@mui/material/IconButton';
import { alpha, styled } from '@mui/material/styles';
import type { CSSObject, Theme } from '@mui/material/styles';
import { useTranslate } from '../i18n';
import { DemoComponentTheme } from '../DemoThemeProviders';
import { DemoErrorBoundary } from './DemoErrorBoundary';

// ---------------------------------------------------------------------------
// Structural shell shared by `DemoContent` and `DemoContentLoading`.
//
// `DemoContainer` is a slot-based presentational primitive: callers populate
// the structural regions (preview, toolbar, tabs, code, after-code) and the
// container takes care of layout, borders, anchors, and the focus trap target.
// This keeps the loading skeleton visually identical to the live demo without
// duplicating styled-components.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Off-screen animation pausing
//
// Each `.demo-preview` (live demo or loading skeleton) is observed by a single
// shared IntersectionObserver that toggles `data-visible` as the demo scrolls
// in and out of view. `DemoPreviewArea` pauses every animation inside a preview
// that lacks `data-visible`, so demos that aren't on screen don't burn CPU
// animating.
//
// One observer is shared across every demo on the page (cheaper than one per
// demo) and created lazily on the first mount, so it never runs during SSR and
// the per-demo setup stays a single `observe()` call in an effect — off the
// hydration path.
// ---------------------------------------------------------------------------
let visibilityObserver: IntersectionObserver | undefined;

function observePreviewVisibility(node: Element): () => void {
  if (typeof IntersectionObserver === 'undefined') {
    // No observer support: reveal immediately so animations never freeze.
    node.setAttribute('data-visible', '');
    return () => {};
  }
  if (!visibilityObserver) {
    visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', '');
          } else {
            entry.target.removeAttribute('data-visible');
          }
        });
      },
      // A small margin starts the animations just before the demo scrolls into
      // view, so they're already running by the time it's on screen.
      { rootMargin: '200px' },
    );
  }
  visibilityObserver.observe(node);
  return () => visibilityObserver?.unobserve(node);
}

// Dark code-panel surface, shared by `DemoCodePanel` (the rounded clip wrapper),
// the `DemoCodeWrapper` fade overlay, and `CodeSource` (which blends the line
// highlights against it into solid colors).
export const CODE_BG = 'hsl(210, 25%, 9%)';

export const DemoRoot = styled('div')(({ theme }) => ({
  marginBottom: 24,
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    marginRight: 0,
  },
  // Keep each demo as an independent layout and style boundary.
  contain: 'layout style',

  // Square the toolbar against any visible source window, matching master's
  // `openDemoSource` styling for focused snippets and expanded source.
  '&[data-code-open] [role="toolbar"]': {
    [theme.breakpoints.up('sm')]: {
      borderRadius: 0,
    },
  },
}));

// Outer preview wrapper — visual container around the rendered demo.
// `bg` selects the background treatment (`outlined` is the implicit default;
// `inline`, `playground`, `gradient`, and `true` are MDX-author overrides).
// `hideToolbar` switches the bottom corners between rounded and squared so
// the preview merges with the toolbar below it when one is present.
export const DemoPreviewArea = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bg' && prop !== 'hideToolbar',
})<{ bg?: string | boolean; hideToolbar?: boolean }>(({ theme }) => ({
  position: 'relative',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  // Hold every descendant animation paused while the preview is off screen. The
  // shared IntersectionObserver (see `observePreviewVisibility`) adds
  // `data-visible` once the demo scrolls into view, which lets the animations
  // run. Matches the `.demo-preview` className set on this element below.
  '&:not([data-visible=""]) *': {
    animationPlayState: 'paused',
  },
  variants: [
    {
      props: ({ hideToolbar }) => !!hideToolbar,
      style: {
        [theme.breakpoints.up('sm')]: {
          borderRadius: 12,
        },
      },
    },
    {
      props: ({ hideToolbar }) => !hideToolbar,
      style: {
        [theme.breakpoints.up('sm')]: {
          borderRadius: '12px 12px 0 0',
        },
      },
    },
    {
      props: { bg: 'outlined' },
      style: {
        padding: theme.spacing(3),
        backgroundColor: (theme.vars || theme).palette.background.paper,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        [theme.breakpoints.up('sm')]: {
          borderLeftWidth: 1,
          borderRightWidth: 1,
        },
        ...theme.applyDarkStyles({
          backgroundColor: alpha(theme.palette.primaryDark[700], 0.1),
        }),
      },
    },
    {
      props: { bg: 'inline' },
      style: {
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0),
        },
      },
    },
    {
      props: { bg: 'playground' },
      style: {
        backgroundColor: (theme.vars || theme).palette.background.paper,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        overflow: 'auto',
      },
    },
    {
      props: { bg: true },
      style: {
        padding: theme.spacing(3),
        backgroundColor: alpha(theme.palette.grey[50], 0.5),
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        ...theme.applyDarkStyles({
          backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
        }),
      },
    },
    {
      props: { bg: 'gradient' },
      style: {
        overflow: 'auto',
        padding: theme.spacing(4, 2),
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundClip: 'padding-box',
        backgroundColor: alpha(theme.palette.primary[50], 0.2),
        backgroundImage: `radial-gradient(120% 140% at 50% 10%, transparent 40%, ${alpha(theme.palette.primary[100], 0.2)} 70%)`,
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(12, 8),
          borderLeftWidth: 1,
          borderRightWidth: 1,
        },
        ...theme.applyDarkStyles({
          backgroundColor: (theme.vars || theme).palette.primaryDark[900],
          backgroundImage: `radial-gradient(120% 140% at 50% 10%, transparent 30%, ${alpha(theme.palette.primary[900], 0.3)} 80%)`,
        }),
      },
    },
  ],
}));

// Inner sandbox wrapper — receives `maxWidth` / `height` from MDX so authors
// can constrain the rendered demo without affecting the surrounding preview
// chrome. Only rendered when a style is supplied so unwrapped demos keep the
// preview area's flex-child layout untouched.
export const DemoPreviewSandbox = styled('div')({});

export const DemoInitialFocus = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: theme.spacing(4),
  height: theme.spacing(4),
  pointerEvents: 'none',
}));

export const DemoAnchorLink = styled('div')({
  marginTop: -64, // height of toolbar
  position: 'absolute',
});

// Action-button bar between preview and code. Bottom corners round by default
// (the toolbar is the demo's visual bottom) and square so it merges into the
// code panel when a source window is visible below it — see the `DemoRoot`
// `data-code-open` rule driven by `sourceVisible`.
export const DemoToolbarRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'bg',
})<{ bg?: string | boolean }>(({ theme }) => [
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxHeight: 50,
      marginTop: -1,
      padding: theme.spacing('2px', 1),
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderTopWidth: 0,
      backgroundColor: alpha(theme.palette.grey[50], 0.2),
      borderRadius: '0 0 12px 12px',
    },
    variants: [
      {
        props: { bg: 'inline' },
        style: {
          [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(1),
            borderTopWidth: 1,
          },
        },
      },
    ],
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.grey[100],
      },
    },
    '& .MuiSvgIcon-root': {
      fontSize: 16,
      color: (theme.vars || theme).palette.grey[900],
    },
  },
  theme.applyDarkStyles({
    [theme.breakpoints.up('sm')]: {
      backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
    },
    '& .MuiIconButton-root': {
      '&:hover': {
        backgroundColor: (theme.vars || theme).palette.primaryDark[700],
      },
    },
    '& .MuiSvgIcon-root': {
      color: (theme.vars || theme).palette.grey[400],
    },
  }),
]);

// `inert` is a boolean prop from React 19 on. React 18 doesn't know it and warns on
// `true` for a non-boolean attribute, so it needs the empty-string attribute value.
const inertValue = (parseInt(React.version, 10) >= 19 ? true : '') as boolean;

// File tab bar — shown between toolbar and code when a demo exposes multiple
// files. Renders as a Base UI `Tabs.List` (must live under a `Tabs.Root`) so
// the tabs form a single Tab stop with arrow-key roving focus.
const fileTabBarStyles = ({ theme }: { theme: Theme }): CSSObject => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  overflowX: 'auto',
  padding: theme.spacing(1.5, 1),
  borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderRight: `1px solid ${(theme.vars || theme).palette.divider}`,
  backgroundColor: alpha(theme.palette.grey[50], 0.2),
  ...theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
  }),
});

export const DemoFileTabBar = styled(Tabs.List)(fileTabBarStyles);

// Plain-div twin used by the SSR loading skeleton, where wrapping in a
// `Tabs.Root` would be pointless (no interactive state).
export const DemoFileTabBarSkeleton = styled('div')(fileTabBarStyles, {
  // Match the 26px tab plus 12px vertical padding on each side.
  minHeight: 50,
});

// Wraps the highlighted code. The fade overlay relies on `:has()` to detect
// the emphasis-frame markup emitted by `enhanceCodeEmphasis`; demos without
// emphasis frames render identically. The skeleton variant in
// `DemoContentLoading` can safely render a plain block child here.
export const DemoCodeWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(() => ({
  position: 'relative',

  '&:has(pre > code > .frame[data-frame-truncated="visible"])': {
    overflowY: 'clip',
  },
  '&:has(pre > code > .frame[data-frame-truncated="visible"])::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    background: `linear-gradient(to bottom, transparent, ${alpha(CODE_BG, 0.85)})`,
    pointerEvents: 'none',
  },

  variants: [
    {
      props: { expanded: true },
      style: {
        '&:has(pre > code > .frame[data-frame-truncated="visible"])::after': {
          display: 'none',
        },
      },
    },
  ],
}));

// Rounded, clipping panel wrapped around the scroll window. The dark surface, 1px
// divider border, rounded bottom corners, and the 1px toolbar overlap live HERE —
// not on the inner `<pre>` — so the window's scrollbar (and the editable `<pre>`'s
// focus ring) are clipped into the rounded shape instead of squaring the corner.
// This mirrors mui-public's "scroll element inside a rounded `overflow: hidden`
// container" model. The window fills the panel flush, so `overflow: hidden` here
// rounds the window's square scrollbar corners; the dark surface is the scrollport
// background the code scrolls over (fixed at every scroll position).
export const DemoCodeOverlayAnchor = styled('div')({
  position: 'relative',
});

export const DemoCodePanel = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(({ theme }) => ({
  marginTop: -1, // overlap the toolbar's bottom border for a seamless join
  overflow: 'hidden',
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
  backgroundColor: CODE_BG,
  border: '1px solid transparent',
  WebkitPrintColorScheme: 'dark',
  colorScheme: 'dark',
  color: '#f8f8f2',
  // In dark mode the page background matches the dark panel, so a visible divider
  // border separates them; light mode keeps the transparent border (the dark
  // panel already contrasts with the page).
  ...theme.applyDarkStyles({
    border: `1px solid ${(theme.vars || theme).palette.divider}`,
  }),
  // Surface the editable code's hover/focus state as a ring on THIS rounded panel
  // (via `:has()`) so it follows the rounded border, rather than boxing the
  // transparent inset `<pre>`. `box-shadow`/`outline` paint outside the border box
  // (not clipped by this panel's own `overflow: hidden`) and both follow
  // `border-radius`. Hover keys off the PANEL being hovered while it contains an
  // `.editable-code-wrapper`, so hovering anywhere in
  // the panel — including its inset padding — arms the ring. Focus keys off the
  // textarea since that's the element that takes editing focus. Non-editable demos
  // have no `.editable-code-wrapper`, so they never match.
  '&:hover:has(.editable-code-wrapper)': {
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary[500], 0.5)}`,
  },
  '&:has(.editable-code-wrapper textarea:focus), &:has(.editable-code-wrapper textarea:focus-visible)':
    {
      outline: `3px solid ${alpha(theme.palette.primary[500], 0.8)}`,
      outlineOffset: 0,
    },
  // Collapse-to-empty: drop the border so the zero-height panel doesn't leave a
  // 1px line below the toolbar (the window zeroes its inset padding in step). The
  // expanded variant restores it.
  '&:has(pre > code[data-collapsible][data-focused-lines="0"])': {
    borderWidth: 0,
  },
  variants: [
    {
      props: { expanded: true },
      style: {
        '&:has(pre > code[data-collapsible][data-focused-lines="0"])': {
          borderWidth: '1px',
        },
      },
    },
  ],
}));

// Fixed-height scroll "window" inside `DemoCodePanel`, and the single scroll
// container for both axes. The height is capped at `min(68vh, 1000px)` so a long
// expanded source scrolls internally instead of growing the page indefinitely;
// shorter collapsed/focused snippets sit under the cap and still render at their
// natural height (a `max-height` cap never stretches content beneath it).
//
// Horizontal scroll lives here (not on the inner `<pre>`) so the scrollbar sits at
// the window's bottom edge — inside the rounded panel and always in view — rather
// than at the bottom of a collapsible `<pre>` whose full height runs past the cap
// and out of sight. It is enabled in both states: a collapsed focused snippet
// scrolls when its visible frames overflow, and expanding reveals the full source.
//
export const DemoCodeWindow = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>({
  maxHeight: 'min(68vh, 1000px)',
  overflowY: 'auto',
  overflowX: 'auto',
  // The inset padding lives on the `<pre>` itself (see `CodeSource`) so the `<pre>`
  // fills the container and the inset scrolls with the content. This window is just
  // the transparent, height-capped scroll viewport over the panel's dark surface.
  // NB: no `overscroll-behavior: contain` here. As an `overflow: auto` element
  // the window is a scroll container, and `contain` stops the wheel from
  // chaining to the page — so hovering over a code block that can't scroll
  // (a short collapsed snippet) or is already at its edge would freeze the page
  // scroll. Default chaining keeps the page scrolling normally over the panel.
  // ---- Collapse-to-empty ----
  // A `collapseToEmpty` / `oversizedFocus: 'hide'` block collapses to an empty
  // window (`<code data-focused-lines="0">`). Suppress vertical scrolling so the
  // zero-height window can't paint a phantom scrollbar; the `<pre>`'s own padding
  // zeroes in `CodeSource`. The expanded variant restores scrolling.
  '&:has(pre > code[data-focused-lines="0"])': {
    overflowY: 'hidden',
  },
  variants: [
    {
      props: { expanded: true },
      style: {
        // (`overflowX: 'auto'` is inherited from the base — collapsed already
        // allows horizontal scroll — so it isn't repeated here.)
        // Expanded, the empty-focus source is revealed and may exceed the height
        // cap — restore vertical scrolling suppressed by the collapsed rule above
        // (the `<pre>` restores its own inset padding in `CodeSource`).
        '&:has(pre > code[data-focused-lines="0"])': {
          overflowY: 'auto',
        },
      },
    },
  ],
});

export interface DemoContainerProps {
  /**
   * The demo's identity anchor id (e.g. `Filter`, `BasicButtons`) rendered as a
   * deep-link target above the preview. Threaded as a prop — not via `anchors`
   * — so the SSR loading skeleton emits it too, letting a `#<DemoName>` link
   * resolve before the live demo hydrates. `null`/`undefined` renders nothing.
   */
  anchorId?: string | null;
  /** Anchor `<div>` elements rendered above the preview for deep-linking. */
  anchors?: React.ReactNode;
  /**
   * Source deep-link anchor ids (e.g. `basic-buttons.tsx`, `basic-buttons.js`).
   * Rendered here — rather than passed via `anchors` — so the SSR loading
   * skeleton emits them too, letting a `#<slug>.tsx`/`.js` link resolve before
   * the live demo hydrates. The interactive hash→language swap lives in
   * `DemoContent`.
   */
  sourceAnchorIds?: string[];
  /** Main demo preview (rendered React element or a skeleton placeholder). */
  preview: React.ReactNode;
  /**
   * Background treatment for the preview area. Defaults to `'outlined'`.
   */
  bg?: string | boolean;
  /**
   * When true, the preview area is rendered without a trailing toolbar and
   * gets fully rounded corners.
   */
  hideToolbar?: boolean;
  /** Optional inline style applied to the rendered demo (used for `maxWidth` / `height`). */
  previewStyle?: React.CSSProperties;
  /**
   * When true, the demo renders inside an isolated theme scope so it can own
   * its own `CssVarsProvider` without inheriting MUI / Joy UI theme from the
   * surrounding page.
   */
  isolated?: boolean;
  /**
   * When true, the demo renders inside an `<iframe>` sandbox so it gets its own
   * document, CSS cascade, viewport, and `window` — required for
   * `position: fixed`, responsive breakpoints, `useMediaQuery`, and
   * `window`-prop demos.
   */
  iframe?: boolean;
  /**
   * Identifier used to scope the per-demo `cssVarPrefix` when `isolated` is
   * true. Typically the demo `slug` or `name`.
   */
  name?: string;
  /**
   * Reset hook surfaced inside the error-boundary fallback. Typically wired to
   * `useDemo().reset` so the fallback's reset button does the same thing as
   * the toolbar reset button.
   */
  onReset?: () => void;
  /** Changes whenever the preview and its error boundary must be remounted. */
  previewEpoch?: number;
  /**
   * Optional overlay anchored to the top border of the code panel (below the
   * toolbar), e.g. the live-edit error alert. Placed there — rather than over the
   * preview — so a build error appears where the user is typing, matching the
   * legacy editor's placement.
   */
  codeOverlay?: React.ReactNode;
  /** Optional ref target for the initial-focus button inside the preview. */
  focusRef?: React.Ref<HTMLButtonElement>;
  /**
   * Toolbar content. When `null`/`undefined`, the toolbar (and any tabs/code/
   * after-code regions) are hidden.
   */
  toolbar?: React.ReactNode;
  /** Ref attached to the toolbar root for focus management. */
  toolbarRef?: React.Ref<HTMLDivElement>;
  /** Accessible label for the toolbar landmark. */
  toolbarLabel?: string;
  /**
   * Set while the skeleton renders placeholder buttons: the toolbar is `inert`
   * (no clicks, focus, or AT exposure) and `aria-busy` until the live one mounts.
   */
  toolbarBusy?: boolean;
  /** Keydown handler for ARIA toolbar keyboard navigation. */
  onToolbarKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  /** Focus handler used to maintain the toolbar's roving tab stop. */
  onToolbarFocus?: React.FocusEventHandler<HTMLDivElement>;
  /**
   * Whether the source viewer is currently expanded. Drives the code
   * window/wrapper expand state.
   */
  expanded?: boolean;
  /** Whether a focused snippet or expanded source is visible below the toolbar. */
  sourceVisible?: boolean;
  /** Optional file tab bar — typically only present for multi-file demos when expanded. */
  tabs?: React.ReactNode;
  /** Code viewer / source panel. */
  code?: React.ReactNode;
  /** ID assigned to the source region for toolbar `aria-controls`. */
  codeId?: string;
  /** Slot rendered after the code panel (AI hero, ads, etc.). */
  afterCode?: React.ReactNode;
  /**
   * Optional render wrapper for the tabs + code region. Used by the live
   * demo to inject a `<Tabs.Root>` provider connecting `DemoFileTabBar` and
   * the code panel; the loading skeleton omits it.
   */
  renderTabsAndCode?: (children: React.ReactNode) => React.ReactNode;
}

/**
 * Renders the structural shell of a demo. Callers control content via slots so
 * the loading skeleton and the live demo can share identical layout while
 * differing in what they put in each region.
 */
export function DemoContainer(props: DemoContainerProps) {
  const {
    anchorId,
    anchors,
    sourceAnchorIds,
    preview,
    bg,
    hideToolbar,
    previewStyle,
    isolated,
    iframe,
    name,
    onReset,
    previewEpoch,
    codeOverlay,
    focusRef,
    toolbar,
    toolbarRef,
    toolbarLabel,
    toolbarBusy,
    onToolbarKeyDown,
    onToolbarFocus,
    expanded,
    sourceVisible,
    tabs,
    code,
    codeId,
    afterCode,
    renderTabsAndCode,
  } = props;

  const t = useTranslate();

  // Pause the preview's animations until it scrolls into view. Wired in an
  // effect — after hydration — so it never blocks the first paint, and works
  // for both the live demo and the loading skeleton (both render this shell).
  const previewRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const node = previewRef.current;
    return node ? observePreviewVisibility(node) : undefined;
  }, []);

  // Default to the `'outlined'` background when none is specified.
  const resolvedBg = bg ?? 'outlined';

  // The error boundary must wrap `DemoComponentTheme` from the OUTSIDE. The
  // isolated/iframe sandboxes inside `DemoComponentTheme` inject props into the
  // demo via `React.cloneElement` (`colorSchemeNode`, `cssVarPrefix`, `window`,
  // `documentNode`, `colorSchemeSelector`), and that clone targets
  // `DemoComponentTheme`'s direct child. If the error boundary sat between them
  // it would absorb those props — `DemoErrorBoundary` renders `children`
  // verbatim — so the demo's `CssVarsProvider` would never receive them, leaving
  // its color-scheme node unset and the iframe `window` unwired. Keeping the
  // boundary outermost (as master's `DemoSandbox` does) lets the clone reach the
  // demo element directly, while the live `DemoContent` and the SSR
  // `DemoContentLoading` skeleton still share the exact same theming.
  const themedName = name ?? 'demo';
  const themedPreview = (
    <DemoErrorBoundary key={previewEpoch} name={themedName} onReset={onReset}>
      <DemoComponentTheme
        isolated={isolated}
        iframe={iframe}
        iframeStyle={iframe ? previewStyle : undefined}
        name={themedName}
      >
        {preview}
      </DemoComponentTheme>
    </DemoErrorBoundary>
  );

  const tabsAndCode = (
    <React.Fragment>
      {tabs}
      {code != null && sourceVisible !== false ? (
        // Relative anchor so `codeOverlay` can straddle the code panel's top border
        // (below the toolbar). It can't live inside `DemoCodePanel` — that clips with
        // `overflow: hidden` — so it sits here as a sibling of the panel.
        <DemoCodeOverlayAnchor id={codeId}>
          {codeOverlay}
          <DemoCodePanel expanded={expanded}>
            <DemoCodeWindow expanded={expanded}>
              <DemoCodeWrapper expanded={expanded}>{code}</DemoCodeWrapper>
            </DemoCodeWindow>
          </DemoCodePanel>
        </DemoCodeOverlayAnchor>
      ) : null}
    </React.Fragment>
  );

  return (
    <DemoRoot
      data-code-open={sourceVisible ? '' : undefined}
      data-code-expanded={expanded ? '' : undefined}
    >
      {anchorId != null ? <DemoAnchorLink id={anchorId} /> : null}
      {anchors}
      <DemoPreviewArea
        ref={previewRef}
        className="demo-preview"
        bg={resolvedBg}
        hideToolbar={hideToolbar}
      >
        <DemoInitialFocus ref={focusRef} tabIndex={-1} aria-label={t('initialFocusLabel')} />
        {previewStyle && !iframe ? (
          <DemoPreviewSandbox style={previewStyle}>{themedPreview}</DemoPreviewSandbox>
        ) : (
          themedPreview
        )}
      </DemoPreviewArea>

      {/* Source deep links land on the source, so their anchors sit just above
          the toolbar (as on master) rather than at the demo top. */}
      {sourceAnchorIds?.map((id) => (
        <DemoAnchorLink key={`source-${id}`} id={id} />
      ))}
      {toolbar != null ? (
        <React.Fragment>
          <DemoToolbarRoot
            ref={toolbarRef}
            bg={resolvedBg}
            role="toolbar"
            aria-label={toolbarLabel}
            aria-busy={toolbarBusy || undefined}
            inert={toolbarBusy ? inertValue : undefined}
            onKeyDown={onToolbarKeyDown}
            onFocus={onToolbarFocus}
          >
            {toolbar}
          </DemoToolbarRoot>
          {renderTabsAndCode ? renderTabsAndCode(tabsAndCode) : tabsAndCode}
          {afterCode}
        </React.Fragment>
      ) : null}
    </DemoRoot>
  );
}
