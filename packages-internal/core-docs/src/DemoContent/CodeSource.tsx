import { Tabs, TabsTabDataAttributes } from '@base-ui/react/tabs';
import { alpha, styled } from '@mui/material/styles';
import { blueDark } from '../branding';
import { CODE_BG } from './DemoContainer';

// Inset of the code text from the `<pre>` edge (the `<pre>` fills the container),
// so the scrollbar and editable focus ring sit inside the rounded panel.
const CODE_INSET = 'calc(2 * var(--muidocs-spacing))';

/**
 * Single-file tab button used in the multi-file tab bar between the toolbar
 * and the code panel. Renders as a Base UI `Tabs.Tab` so the surrounding
 * `Tabs.List` (`DemoFileTabBar`) provides the standard tablist semantics:
 * a single Tab stop and arrow-key roving focus.
 */
export const FileTab = styled(Tabs.Tab)(({ theme }) => ({
  flex: '0 0 auto',
  height: 26,
  minWidth: 45,
  padding: '2px 8px',
  border: '1px solid transparent',
  borderRadius: 99,
  position: 'relative',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  lineHeight: 1.2,
  outline: 'none',
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(13),
  fontWeight: theme.typography.fontWeightMedium,
  color: (theme.vars || theme).palette.text.tertiary,
  '&:hover': {
    backgroundColor: (theme.vars || theme).palette.divider,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineOffset: '1px',
    outlineColor: (theme.vars || theme).palette.primary.light,
  },
  [`&[${TabsTabDataAttributes.active}]`]: {
    color: (theme.vars || theme).palette.primary[700],
    backgroundColor: (theme.vars || theme).palette.primary[50],
    borderColor: (theme.vars || theme).palette.primary[200],
    ...theme.applyDarkStyles({
      color: (theme.vars || theme).palette.primary[200],
      backgroundColor: alpha(theme.palette.primary[900], 0.4),
      borderColor: (theme.vars || theme).palette.primary[800],
    }),
  },
}));

/**
 * Wraps the already-highlighted code from `useDemo`. Hosts the styles
 * required by the `enhanceCodeEmphasis` source enhancer: frame/line
 * highlights, indent shifting, fade overlay, and collapsible frame visibility.
 */
export const CodeSource = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded?: boolean }>(({ theme }) => ({
  position: 'relative',

  // ---- Base <pre> styles ----
  // The dark surface, border, rounded corners, and toolbar overlap live on
  // `DemoCodePanel` (the rounded `overflow: hidden` wrapper); the scroll and the
  // height cap live on `DemoCodeWindow`. The `<pre>` fills that window and carries
  // the inset padding ITSELF — so the editable `<pre>` (which IS the
  // `contentEditable` surface) spans the whole container, and the inset scrolls
  // with the content rather than the scroll container clipping a fixed gutter.
  // This matches mui-public. The `<pre>` stays transparent; the dark surface
  // behind it is the panel's, fixed at every scroll position.
  '& pre': {
    margin: 0,
    maxWidth: 'initial',
    overflow: 'visible',
    // `min-width: fit-content` grows the `<pre>` box to the widest line so the
    // code scrolls horizontally inside `DemoCodeWindow`; with `width: auto` it also
    // fills the window when the content is narrower, so the `<pre>` always spans
    // the full container.
    minWidth: 'fit-content',
    padding: CODE_INSET,
    fontFamily: 'Menlo, Consolas, "Droid Sans Mono", monospace',
    fontWeight: '400',
    fontSize: '0.8125rem',
    lineHeight: '1.5',
    tabSize: 2,
  },
  '& .editable-code-editor > div': {
    width: 'max-content',
    minWidth: '100%',
    minHeight: `calc(1lh + ${CODE_INSET} + ${CODE_INSET})`,
    fontFamily: 'Menlo, Consolas, "Droid Sans Mono", monospace',
    fontWeight: '400',
    fontSize: '0.8125rem',
    lineHeight: '1.5',
    tabSize: 2,
  },
  '& .editable-code-editor > div > pre, & .editable-code-editor > div > textarea': {
    padding: `${CODE_INSET} !important`,
    whiteSpace: 'pre !important',
    overflowWrap: 'normal !important',
    wordBreak: 'normal !important',
  },
  // The editable `<pre>`'s hover/focus ring is drawn on the rounded
  // `DemoCodePanel` (via `:has()`) so it follows the rounded border instead of
  // boxing the transparent inset `<pre>`. Here we only suppress the `<pre>`'s
  // default focus outline (white in the dark color scheme); the panel ring is the
  // visible indicator.
  '& .editable-code-wrapper textarea:focus, & .editable-code-wrapper textarea:focus-visible': {
    outline: 'none',
  },

  // Truncated collapsed frame: the fade overlay (anchored on `DemoCodeWrapper`)
  // covers the bottom, so drop the `<pre>`'s bottom padding to keep it flush; the
  // expanded variant restores it.
  '& pre:has(> code > .frame[data-frame-truncated="visible"])': {
    paddingBottom: 0,
  },
  // ---- Collapse-to-empty padding ----
  // A `collapseToEmpty` / `oversizedFocus: 'hide'` block records
  // `data-focused-lines="0"`: every frame is hidden, so the panel must take no
  // vertical space. Zero the `<pre>`'s own top/bottom padding too; otherwise it
  // leaves a ~32px gap. The expanded variant restores it.
  '& pre:has(> code[data-collapsible][data-focused-lines="0"])': {
    paddingTop: 0,
    paddingBottom: 0,
  },

  // Code element inside pre — block so frames stretch to the widest line.
  '& pre > code': {
    display: 'block',
    minWidth: 'fit-content',
  },

  // ---- Frame & line layout ----
  // The HAST emitted by `enhanceCodeEmphasis` separates `.line` spans with
  // whitespace text nodes (spaces/newlines). With `display: block` on `.line`,
  // each of those whitespace nodes also forms an anonymous line box that
  // takes up a full `line-height` of vertical space, doubling the apparent
  // line spacing. Setting `line-height: 0` on the frame collapses those
  // anonymous boxes to zero height; the explicit `line-height` on `.line`
  // restores normal spacing for the actual lines of code.
  '& pre > code > .frame': {
    display: 'block',
  },
  '& pre > code > .frame[data-lined]': {
    lineHeight: 0,
  },
  '& pre > code > .frame[data-lined] .line': {
    display: 'block',
    lineHeight: 1.5,
    whiteSpace: 'pre',
  },

  // Hide the selection highlight on the inter-line gap text nodes (the
  // literal `\n` between `.line` spans). Those characters are real text
  // positions in contentEditable, so when a user drags a selection across
  // multiple lines the browser paints a `line-height: 0` highlight strip
  // for each gap — visible as a thin horizontal bar between lines. Making
  // the frame's `::selection` transparent removes the strip; the explicit
  // `.line ::selection` rule re-enables the standard system highlight
  // inside actual code lines.
  '& pre > code > .frame[data-lined]::selection, & pre > code > .frame[data-lined] *::selection': {
    background: 'transparent',
  },
  '& pre > code > .frame[data-lined] .line::selection, & pre > code > .frame[data-lined] .line *::selection':
    {
      background: 'Highlight',
      color: 'HighlightText',
    },

  // Highlighted frames get rounded corners and a subtle background.
  '& .frame[data-frame-type="highlighted"], & .frame[data-frame-type="highlighted-unfocused"]': {
    background: alpha(theme.palette.primary.main, 0.18),
    borderRadius: 8,
    margin: '0 -6px',
    padding: '0 6px',
  },

  // Line-level highlight inside a frame (nested emphasis). SOLID (opaque) — the
  // `color-mix` blends the primary tint into the dark panel surface to the same
  // visible color a translucent `alpha(primary, 0.18)` over `CODE_BG` would give,
  // but without transparency: where the merge rules below overlap a regular and a
  // strong line (or a `<pre>` spans z-layers), translucent tints would COMPOUND
  // into a darker seam/stripe; an opaque background simply covers.
  '& .line[data-hl]': {
    background: `color-mix(in srgb, ${theme.palette.primary.main} 18%, ${CODE_BG})`,
    margin: '0 -6px',
    padding: '0 6px',
    // Indent-shift: when a collapsible block collapses, its focused frame
    // `translateX`es left to un-indent the code. Extend the highlight's RIGHT
    // padding by the same `--di-indent-shift` the frame tints use (and pull the
    // layout back with a matching negative right margin, so the code's width is
    // unaffected) — the highlight's right edge then stays put while the text
    // un-indents, animating the indent exactly the way the frame tints do.
    // `--di-indent-shift` is 0 outside a collapse, so `max()` keeps the normal
    // 6px gutter then.
    marginRight: 'calc(-1 * max(6px, var(--di-indent-shift, 0px)))',
    paddingRight: 'max(6px, var(--di-indent-shift, 0px))',
  },
  // Inline highlights are emitted as `<mark>` by `enhanceCodeEmphasis`
  // (e.g. `@highlight-text`). Override the UA `mark` default (yellow fill,
  // dark text — unreadable on the dark panel): keep the surrounding code's
  // color and apply the brand tint. A bare `<mark>` is emitted for matches
  // outside a line highlight; marks inside one inherit the line's `data-hl`
  // tier (propagated by the enhancer) and read progressively stronger than
  // the line background they sit on.
  '& mark': {
    color: 'inherit',
    background: alpha(theme.palette.primary.main, 0.32),
    borderRadius: 4,
  },
  '& mark[data-hl]': {
    background: alpha(theme.palette.primary.main, 0.4),
  },
  '& mark[data-hl="strong"]': {
    background: alpha(theme.palette.primary.main, 0.5),
  },
  '& .line[data-hl="strong"]': {
    // Solid (see `.line[data-hl]`) — the stronger tier, blended opaque so it
    // doesn't compound with the regular highlight it sits within. Margin/padding
    // (including the indent-shift right extension) are inherited from
    // `.line[data-hl]`.
    background: `color-mix(in srgb, ${theme.palette.primary.main} 32%, ${CODE_BG})`,
  },
  // Strong lines bordering a regular highlight need to stack above it so the
  // regular line's extended background sits underneath the rounded corners.
  '& .line[data-hl="strong"][data-hl-position="single"], & .line[data-hl="strong"][data-hl-position="end"]':
    {
      position: 'relative',
      zIndex: 1,
    },
  // Visually merge a regular highlighted line into an adjacent strong block.
  '& .line[data-hl=""]:has(+ .line[data-hl="strong"])': {
    paddingBottom: 6,
    marginBottom: -6,
  },
  '& .line[data-hl="strong"] + .line[data-hl=""]': {
    paddingTop: 6,
    marginTop: -6,
  },
  '& .line[data-hl-position="single"]': { borderRadius: 8 },
  '& .line[data-hl-position="start"]': {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  '& .line[data-hl-position="end"]': {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  // Description badges (rendered via `data-hl-description` / `data-frame-description`).
  '& .line[data-hl-description]::after': {
    content: 'attr(data-hl-description)',
    float: 'right',
    background: theme.palette.primary.main,
    borderRadius: 8,
    color: theme.palette.primary.contrastText,
    padding: '2px 4px',
    marginRight: -6,
  },
  '& .frame[data-frame-description]::before': {
    content: 'attr(data-frame-description)',
    float: 'right',
    background: theme.palette.primary.main,
    borderRadius: 8,
    color: theme.palette.primary.contrastText,
    padding: '2px 4px',
  },

  // ---- Editable code wrapper ----
  // Focus-trap wrapper added by `<Pre>` when `setSource` is provided. The
  // wrapper is the keyboard-only tab stop; pressing Enter focuses the inner
  // `<pre>` and engages contentEditable Tab-indents-line behavior. Escape
  // returns focus to the wrapper. The overlay is hidden via the [hidden]
  // attribute when the wrapper isn't armed; only shown after keyboard focus
  // arrives on the wrapper.
  '& .editable-code-wrapper': {
    position: 'relative',
    display: 'block',
    borderRadius: 8,
    // Show the text caret over the whole editable area (which the `<pre>` now
    // fills) — even before editing is armed — so hovering signals it's editable.
    cursor: 'text',
  },
  '& .editable-code-wrapper:focus-visible': {
    outline: 0,
  },
  // "Press Enter to start editing" overlay. `<Pre>` ships the overlay with
  // the `[hidden]` attribute by default and toggles `data-editable-prompt` on
  // the wrapper while the prompt is shown. Override `[hidden]` so the overlay
  // stays in layout and is shown via `data-editable-prompt`.
  '& .editable-code-wrapper .editable-code-overlay[hidden]': {
    display: 'block',
  },
  '& .editable-code-wrapper .editable-code-overlay': {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: theme.spacing(0.2, 1, 0.5, 1),
    border: '1px solid',
    borderColor: blueDark[600],
    backgroundColor: blueDark[700],
    color: '#FFF',
    borderRadius: 6,
    fontSize: theme.typography.pxToRem(13),
    // `outline` paints the ring outside the popup without stacking under it.
    outlineStyle: 'solid',
    outlineColor: alpha(theme.palette.primary[500], 0),
    outlineWidth: 0,
    outlineOffset: 0,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
    visibility: 'hidden',
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 1,
  },
  '& .editable-code-wrapper[data-editable-prompt] .editable-code-overlay': {
    top: theme.spacing(1),
    visibility: 'visible',
    opacity: 1,
    outlineColor: alpha(theme.palette.primary[500], 0.8),
    outlineWidth: 3,
  },
  '& .editable-code-wrapper .editable-code-overlay kbd': {
    padding: theme.spacing(0.2, 0.4),
    backgroundColor: blueDark[500],
    fontSize: theme.typography.pxToRem(11),
    borderRadius: 6,
    border: '1px solid',
    borderColor: blueDark[400],
  },

  // Truncated visible frame: only round top — bottom fades out via overlay.
  '& .frame[data-frame-truncated="visible"]': {
    borderRadius: '8px 8px 0 0',
  },
  // Truncated hidden frame is the bottom of the region.
  '& .frame[data-frame-truncated="hidden"]': {
    borderRadius: '0 0 8px 8px',
  },

  // ---- Collapsible frame behavior ----
  // Scoped to collapsible demos: in non-collapsible demos every frame lacks
  // `data-frame-type`, so an unscoped rule would hide all of them.
  '& pre:has(> code[data-collapsible]) .frame:not([data-frame-type]), & pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted-unfocused"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus-unfocused"]':
    {
      display: 'none',
    } as any,

  // Highlight backgrounds for the collapsed/focused view are painted by a
  // pseudo-element rather than the element's own `background`, so shifting a
  // frame left can extend the tint back to the code's right edge.
  // `--di-indent-shift` is published per indent level on the frame (below) and
  // inherited by nested lines. The frame paints via `::after` (its `::before` is the
  // frame description badge); lines paint via `::before` (their `::after` is
  // the line description badge). Each pseudo sits at `z-index: -1` behind the
  // code text; `isolation` scopes that stacking to the frame.
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"]': {
    position: 'relative',
    isolation: 'isolate',
    background: 'transparent',
  },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl]': {
    position: 'relative',
    background: 'transparent',
  },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"]::after, & pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl]::before':
    {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 'calc(100% + var(--di-indent-shift, 0px))',
      zIndex: -1,
      pointerEvents: 'none',
    },
  // Frame tint — a single block, always fully rounded.
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"]::after': {
    background: alpha(theme.palette.primary.main, 0.18),
    borderRadius: 8,
  },
  // A truncated highlighted frame rounds only its visible end (mirrors the
  // element-level `data-frame-truncated` rules, which the now-transparent
  // element background no longer shows).
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-truncated="visible"]::after':
    {
      borderRadius: '8px 8px 0 0',
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-truncated="hidden"]::after':
    {
      borderRadius: '0 0 8px 8px',
    },
  // Line tint — matches the line's `data-hl` tier and its position rounding
  // (the pseudo is the whole line highlight, not just an extension).
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl]::before':
    {
      background: alpha(theme.palette.primary.main, 0.18),
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl="strong"]::before':
    {
      background: alpha(theme.palette.primary.main, 0.32),
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl][data-hl-position="single"]::before':
    {
      borderRadius: 8,
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl][data-hl-position="start"]::before':
    {
      borderRadius: '8px 8px 0 0',
    },
  '& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"] .line[data-hl][data-hl-position="end"]::before':
    {
      borderRadius: '0 0 8px 8px',
    },
  // Per indent level: pull the frame left and publish the extension width (the
  // `level * 2ch` shift plus 6px, so the tint reaches a touch past the code's
  // right edge) as a custom property the frame and nested line pseudos read.
  ...Object.fromEntries(
    Array.from({ length: 8 }, (_unused, idx) => {
      const level = idx + 1;
      return [
        `& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-indent="${level}"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus"][data-frame-indent="${level}"]`,
        {
          transform: `translateX(-${level * 2}ch)`,
          '--di-indent-shift': `calc(${level * 2}ch + 6px)`,
        },
      ];
    }),
  ),

  variants: [
    {
      props: { expanded: true },
      style: {
        // Show all frames when expanded.
        '& pre:has(> code[data-collapsible]) .frame:not([data-frame-type]), & pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted-unfocused"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus-unfocused"]':
          {
            display: 'block',
          } as any,
        // Reset the indent shift and background extension when expanded. Must
        // match the per-indent base rules' specificity (which include
        // `[data-frame-indent="N"]`) or the base values would still win.
        ...Object.fromEntries(
          Array.from({ length: 8 }, (_unused, idx) => {
            const level = idx + 1;
            return [
              `& pre:has(> code[data-collapsible]) .frame[data-frame-type="highlighted"][data-frame-indent="${level}"], & pre:has(> code[data-collapsible]) .frame[data-frame-type="focus"][data-frame-indent="${level}"]`,
              { transform: 'translateX(0)', '--di-indent-shift': '0px' },
            ];
          }),
        ),
        // Restore the `<pre>`'s inset padding once the source is expanded.
        '& pre:has(> code > .frame[data-frame-truncated="visible"])': {
          paddingBottom: CODE_INSET,
        },
        '& pre:has(> code[data-collapsible][data-focused-lines="0"])': {
          paddingTop: CODE_INSET,
          paddingBottom: CODE_INSET,
        },
      },
    },
  ],
}));
