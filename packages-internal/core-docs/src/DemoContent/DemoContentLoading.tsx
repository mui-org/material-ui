import * as React from 'react';
import type { ContentLoadingProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { useCodeFallback } from '@mui/internal-docs-infra/CodeHighlighter';
import { useUrlHashState } from '@mui/internal-docs-infra/useUrlHashState';
import { CodeSource } from './CodeSource';
import { DemoContainer, DemoFileTabBarSkeleton } from './DemoContainer';
import { DemoToolbar } from './DemoToolbar';
import { useTranslate } from '../i18n';
import type { DemoOptions } from './DemoContent';
import { demoAnchorId, fileSourceAnchorIds } from './sourceAnchors';
import { resolveDemoSourceView } from './DemoContent.helpers';
import { loadDemoContent } from './loadDemoContent';

// ---------------------------------------------------------------------------
// SSR / streaming placeholder rendered before the live `DemoContent` mounts.
// Shares the `DemoContainer` shell so the page layout doesn't shift when the
// real demo takes over. We render:
//   - the SSR'd `component` in the preview slot. `iframe` is forwarded to
//     `DemoContainer` so iframe demos render the `<iframe>` shell here too and
//     mount the demo in the client-only portal — never inline in the static
//     HTML (which would otherwise fail HTML validation), matching the live
//     `DemoContent`.
//   - the toolbar buttons, inert (the handlers need `useDemo` state)
//   - the SSR'd `source` (initial file) in the code slot when expanded, which
//     includes landing on a source deep link (see `expanded` below)
// ---------------------------------------------------------------------------

export type DemoContentLoadingProps = ContentLoadingProps<DemoOptions>;

// The skeleton toolbar has no demo state to act on; its buttons only hold the
// layout (and the accessible names) until the live toolbar takes over.
const noop = () => {};
const noopAsync = async () => {};

export default function DemoContentLoading(props: DemoContentLoadingProps) {
  // `code` is the ready `<code>` for the displayed file — the hook applies
  // `data-collapsible`, `data-total-lines`, and `data-focused-lines` to match
  // the hydrated `<Pre>`, so the collapse CSS sizes the window identically
  // before highlighting swaps in. `focusedLines` is the collapsed window size
  // (0 for a `collapseToEmpty` / `oversizedFocus: 'hide'` block).
  const {
    code: fallbackCode,
    focusedLines = 0,
    collapsible = false,
    canLoadContent,
  } = useCodeFallback(props);
  React.useEffect(() => {
    if (canLoadContent) {
      void loadDemoContent().catch(() => {});
    }
  }, [canLoadContent]);
  const {
    hideToolbar,
    initialExpanded,
    component,
    fileNames,
    bg,
    maxWidth,
    height,
    isolated,
    iframe,
    name,
    slug,
    anchorId: anchorIdOption,
    hideEditButton,
  } = props;
  const t = useTranslate();

  const previewStyle = maxWidth == null && height == null ? undefined : { maxWidth, height };
  const themeName = name ?? slug ?? 'demo';
  const resolvedBg = bg ?? (iframe ? true : undefined);

  // The root file is the first entry in `fileNames`, used both for the demo's
  // deep-link anchor (its base name, e.g. `#ContainedButtons`) and the per-file
  // source anchors below.
  const rootFileName = fileNames?.[0];

  // Root-file deep-link ids: `#<RootFile>.{tsx,ts,js,jsx}`, matching the live
  // `DemoContent`, so a `#<RootFile>.tsx`/`.jsx` link resolves before hydration.
  const sourceAnchorIds = rootFileName ? fileSourceAnchorIds([rootFileName]) : undefined;

  // Landing on a source deep link expands the skeleton at hydration, so the
  // page settles before the live content arrives (master expands on hydration
  // too). The hash reads `null` on the server and while hydrating, so this is a
  // post-hydration re-render, never a mismatch. The `.js`/`.jsx` language swap
  // needs the transform and still waits for the live demo.
  const [hash] = useUrlHashState();
  const expanded =
    initialExpanded === true || (hash != null && sourceAnchorIds?.includes(hash) === true);
  const { sourceVisible, hasSourceFocus } = resolveDemoSourceView({
    expanded,
    focusedLines,
    collapsible,
    hasFocusProjection: collapsible,
  });

  // Match the live `DemoContent` anchor (the root file's base name) so a deep
  // link resolves against the skeleton before the demo hydrates. An explicit
  // `anchorId` option overrides it (`null` disables anchors).
  const anchorId = anchorIdOption === undefined ? demoAnchorId(rootFileName) : anchorIdOption;
  const demoSourceId = `demo-source-${anchorId ?? slug ?? name ?? 'demo'}`;

  if (hideToolbar === true) {
    return (
      <DemoContainer
        anchorId={anchorId}
        preview={component}
        isolated={isolated}
        iframe={iframe}
        name={themeName}
        bg={resolvedBg}
        hideToolbar
        previewStyle={previewStyle}
      />
    );
  }

  // The live toolbar ships in the code-split `DemoContent` chunk, behind the
  // highlighter runtime and the demo's precompute (~30kB gz on a 4Mbps link
  // that is ~0.5s after hydration, vs ~0.2s for master's 8kB lazy toolbar).
  // Render the same buttons here, inert and `aria-busy`, so they are visible
  // from first paint and the swap to the live toolbar changes nothing visually.
  // The label mirrors `DemoContent`'s `showCodeLabel` for the initial state.
  const showCodeLabel = hasSourceFocus
    ? t(expanded ? 'hideFullSource' : 'showFullSource')
    : t(expanded ? 'hideSource' : 'showSource');
  const toolbar = (
    <DemoToolbar
      gaLabel={slug ?? name ?? ''}
      demoSourceId={demoSourceId}
      expanded={expanded}
      onToggleExpand={noop}
      toggleRef={null}
      showCodeLabel={showCodeLabel}
      hasJsTransform={false}
      isJsSelected={false}
      onLanguageClick={noop}
      variants={[]}
      selectedVariant=""
      onSelectVariant={noop}
      openMuiChat={noopAsync}
      hideEditButton={hideEditButton}
      onOpenStackBlitz={noop}
      onOpenCodeSandbox={noop}
      onCopySource={noopAsync}
      onResetFocus={noop}
      onReset={noop}
      tsSourceAnchor={rootFileName}
    />
  );

  const tabs =
    expanded && fileNames && fileNames.length > 1 ? <DemoFileTabBarSkeleton aria-hidden /> : null;

  // Reuse the live `CodeSource` wrapper so the SSR'd code panel matches the
  // hydrated demo exactly (dark background, rounded bottom corners, padding,
  // and the `enhanceCodeEmphasis` styles). `fallbackCode` is the ready `<code>`
  // (with the `data-*` attributes the collapse CSS keys off), so it only needs
  // wrapping in `<pre>` to satisfy `CodeSource`'s descendant selectors. The
  // shared `expanded` value keeps its frame visibility aligned with the
  // hydrated source.
  const code = fallbackCode ? (
    <CodeSource expanded={expanded}>
      {/* `fallbackCode` is a bare `<code>` (from `useCodeFallback`); wrap it in
            `<pre>` so `CodeSource`'s `& pre > code` selectors apply — the live
            render gets its `<pre>` from `<Pre>`. Without it the panel is
            unstyled (no dark background, frame layout, or collapse). */}
      <pre>{fallbackCode}</pre>
    </CodeSource>
  ) : null;

  return (
    <DemoContainer
      anchorId={anchorId}
      preview={component}
      isolated={isolated}
      iframe={iframe}
      name={themeName}
      bg={resolvedBg}
      hideToolbar={hideToolbar}
      previewStyle={previewStyle}
      toolbar={toolbar}
      toolbarLabel={t('demoToolbarLabel')}
      toolbarBusy
      expanded={expanded}
      sourceVisible={sourceVisible}
      tabs={tabs}
      code={code}
      codeId={demoSourceId}
      sourceAnchorIds={sourceAnchorIds}
    />
  );
}
