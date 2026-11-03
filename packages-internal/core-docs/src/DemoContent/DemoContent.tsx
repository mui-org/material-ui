import * as React from 'react';
import { useRouter } from 'next/router';
import { Tabs } from '@base-ui/react/tabs';
import type { ContentProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import { CodeControllerContext } from '@mui/internal-docs-infra/CodeControllerContext';
import { preloadCodeEditor } from '@mui/internal-docs-infra/useCode';
import { useDemo } from '@mui/internal-docs-infra/useDemo';
import { useUrlHashState } from '@mui/internal-docs-infra/useUrlHashState';
import { useTranslate } from '../i18n';
import { useCodeVariant, useNoSsrCodeVariant, useSetCodeVariant } from '../codeVariant';
import DemoContext from '../DemoContext';
import { AdCarbonInline } from '../Ad/AdCarbon';
import { CODE_VARIANTS, stylingSolutionMapping } from '../constants/constants';
import { DemoAiSuggestionHero } from './DemoAiSuggestionHero';
import { DemoAnchorLink, DemoContainer, DemoFileTabBar } from './DemoContainer';
import { DemoErrorOverlay } from './DemoErrorOverlay';
import { CodeSource, FileTab } from './CodeSource';
import { DemoToolbar, useToolbarKeyboard } from './DemoToolbar';
import {
  createDemoUseOptions,
  expandDemo,
  getDemoEditingDependencies,
  hasJavascriptTransform,
  resetDemo,
  resolveDemoSourceView,
  toggleDemoExpanded,
} from './DemoContent.helpers';
import { buildDemoDeploymentLinks } from './demoDeploymentLinks';
import {
  demoAnchorId,
  fileSourceAnchorIds,
  sourceAnchorTransform,
  toJavascriptFileName,
} from './sourceAnchors';
import { useMuiChatExporter } from './useMuiChatExporter';
import { buildExportConfig } from './exportConfig';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Options that drive demo presentation. These options are passed as
 * top-level meta on the demo component (e.g. via MDX
 * `{{"component": "...", "bg": true, "hideToolbar": true}}`).
 */
export interface DemoOptions {
  /** Hide the action toolbar entirely. Disables most other interactive features. */
  hideToolbar?: boolean;
  /** Start with the source expanded. Also a docs-infra `ContentProps` field. */
  initialExpanded?: boolean;
  /**
   * Collapse the source to an empty block (no focused lines) until the reader
   * expands it. Also a docs-infra `ContentProps` field.
   */
  collapseToEmpty?: boolean;
  /** Suppress the inline Carbon ad even when ads are enabled globally. */
  disableAd?: boolean;
  /** Disable in-place editing of the demo source. */
  disableLiveEdit?: boolean;
  /**
   * Legacy alias: `true` -> `initialExpanded`, `false` -> `collapseToEmpty`.
   * Rewritten by `createDemo`'s `normalizeDemoOptions`; docs pages use the
   * target options directly, only `docs/pages/experiments` still sets it.
   */
  defaultCodeOpen?: boolean;
  /** Prompt string shown in the "Customize with AI" hero. When unset, the hero is omitted. */
  aiSuggestion?: string;
  /** Hide the "Edit this page" button in the toolbar. */
  hideEditButton?: boolean;
  /** Override the anchor `id` used for deep-links. `null` disables anchors entirely. */
  anchorId?: string | null;
  /** Background treatment for the preview area. */
  bg?: string | boolean;
  /** Render the demo inside an iframe sandbox. */
  iframe?: boolean;
  /** Skip injecting the surrounding theme inside the iframe sandbox. */
  isolated?: boolean;
  /** Maximum width of the preview area. */
  maxWidth?: number;
  /** Fixed height of the preview area. */
  height?: number;
}

export type DemoContentProps = ContentProps<DemoOptions>;

export default function DemoContent(props: DemoContentProps) {
  const {
    hideToolbar,
    initialExpanded,
    disableLiveEdit,
    disableAd: demoDisableAd,
    aiSuggestion,
    anchorId: anchorIdOption,
    hideEditButton,
    bg,
    maxWidth,
    height,
    isolated,
    iframe,
  } = props;

  // Iframe demos default to the filled background treatment so the sandboxed
  // surface reads as a distinct preview region (matching the legacy behavior).
  const resolvedBg = bg ?? (iframe ? true : undefined);

  // Demo identifier surfaced in error messages — `name` is set by `createDemo`
  // from the demo's file path (e.g. `BasicButtons.js`).
  const demoName = props.name;

  // Guard with NEXT_RUNTIME so this check is dead-code-eliminated from client bundles.
  if (process.env.NEXT_RUNTIME) {
    if (hideToolbar === false) {
      throw new Error(
        [
          '"hideToolbar": false is already the default.',
          `Please remove the property in {{"component": "${demoName}", …}}.`,
        ].join('\n'),
      );
    }
    if (hideToolbar === true && initialExpanded === true) {
      throw new Error(
        [
          '"hideToolbar": true, "initialExpanded": true combination is invalid.',
          `Please remove one of the properties in {{"component": "${demoName}", …}}.`,
        ].join('\n'),
      );
    }
    if (hideToolbar === true && demoDisableAd === true) {
      throw new Error(
        [
          '"hideToolbar": true, "disableAd": true combination is invalid.',
          `Please remove one of the properties in {{"component": "${demoName}", …}}.`,
        ].join('\n'),
      );
    }
  }

  if (
    demoName != null &&
    (demoName.endsWith('.ts') || demoName.endsWith('.tsx')) &&
    hideToolbar !== true
  ) {
    throw new Error(
      [
        `The following demos use TS directly: ${demoName}.`,
        '',
        "If it's not a code demo, hide the toolbar:",
        `{{"component": "${demoName}", "hideToolbar": true, …}}.`,
      ].join('\n'),
    );
  }

  const csbContext = React.useContext(DemoContext);
  const codeController = React.useContext(CodeControllerContext);
  const csbConfig = csbContext?.csb;
  const pageDisableAd = csbContext?.disableAd ?? false;

  // Export dependency resolution reads the current language at click time.
  const useTypescriptRef = React.useRef(true);

  const exportConfig = React.useMemo(
    () => buildExportConfig({ csbConfig, useTypescriptRef }),
    [csbConfig],
  );

  const codeVariant = useCodeVariant();
  const noSsrCodeVariant = useNoSsrCodeVariant();
  const setCodeVariant = useSetCodeVariant();
  const selectedTransform = (noSsrCodeVariant ?? codeVariant) === CODE_VARIANTS.JS ? 'js' : null;
  const handleSelectedTransformChange = React.useCallback(
    (transform: string | null) => {
      setCodeVariant(transform === 'js' ? CODE_VARIANTS.JS : CODE_VARIANTS.TS);
    },
    [setCodeVariant],
  );
  // The highlighter clones `props.code` with live edits; actions still need the initial source.
  const initialCodeRef = React.useRef(props.code);
  const demo = useDemo(
    { ...props, code: initialCodeRef.current },
    createDemoUseOptions({
      disableLiveEdit,
      selectedTransform,
      onSelectedTransformChange: handleSelectedTransformChange,
      exportConfig,
    }),
  );
  useTypescriptRef.current = demo.selectedTransform !== 'js';
  const [previewEpoch, remountPreview] = React.useReducer((epoch: number) => epoch + 1, 0);
  const handleReset = React.useCallback(() => {
    resetDemo(demo.reset, remountPreview);
  }, [demo.reset]);

  const openMuiChat = useMuiChatExporter({
    props,
    selectedVariant: demo.selectedVariant,
    selectedTransform: demo.selectedTransform,
    exportConfig,
  });

  const t = useTranslate();

  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const languageToggleRef = React.useRef<HTMLDivElement | null>(null);

  const hasJsTransform =
    demo.availableTransforms.includes('js') ||
    hasJavascriptTransform(props.code, demo.selectedVariant);
  const isJsSelected = demo.selectedTransform === 'js';

  const handleLanguageClick = React.useCallback(
    (_event: React.MouseEvent, value: string | null) => {
      if (value !== null) {
        demo.selectTransform(value === 'js' ? 'js' : null);
      }
    },
    [demo],
  );

  // Prefer Material UI's `ButtonBase#focusVisible()` (a non-standard helper
  // that forces the `:focus-visible` ring on regardless of input modality) so
  // a mouse-driven reset still shows a clear keyboard focus indicator. Falls
  // back to the generic `resetFocus` exposed by `useDemo` for non-ButtonBase
  // targets.
  const handleResetFocus = React.useCallback(() => {
    const target = demo.focusRef.current as
      (HTMLButtonElement & { focusVisible?: () => void }) | null;
    if (target && typeof target.focusVisible === 'function') {
      target.focusVisible();
      return;
    }
    demo.resetFocus();
  }, [demo]);

  const { sourceVisible, hasSourceFocus } = resolveDemoSourceView({
    expanded: demo.expanded,
    focusedLines: demo.selectedFileFocusedLines,
    collapsible: demo.selectedFileCollapsible,
    hasFocusProjection: demo.selectedFileHasFocusProjection,
  });
  // Whether the demo has a short preview is a property of its source, not of the
  // reader's edits — a full-source edit drops the focus projection, and the
  // Expand/Collapse labels must not turn into Show/Hide because of it.
  const hadSourceFocusRef = React.useRef(false);
  hadSourceFocusRef.current = hadSourceFocusRef.current || hasSourceFocus;
  const showCodeLabel = hadSourceFocusRef.current
    ? t(demo.expanded ? 'hideFullSource' : 'showFullSource')
    : t(demo.expanded ? 'hideSource' : 'showSource');

  // The Carbon ad appears once the reader toggles the source viewer (see
  // `handleToggleFrames`), not when a source deep link or `initialExpanded`
  // opens it — matching master, where only the toggle sets `showAd`.
  const [adShown, setAdShown] = React.useState(false);
  const showAd = adShown && !pageDisableAd && !demoDisableAd;

  // Build the file list for the AI hero from the current variant's source
  // and extra files. Pass whichever variant is selected — the underlying chat
  // API only needs a self-contained snapshot.
  const aiSuggestionParams = React.useMemo(() => {
    if (!aiSuggestion) {
      return null;
    }
    const variantCode = props.code?.[demo.selectedVariant];
    if (!variantCode || typeof variantCode === 'string') {
      return null;
    }
    const entrypoint = demo.selectedFileName ?? demoName ?? 'index';
    const files: Array<{ path: string; content: string; isEntry?: boolean }> = [];
    if (typeof variantCode.source === 'string') {
      files.push({ path: entrypoint, content: variantCode.source, isEntry: true });
    }
    const extra = variantCode.extraFiles;
    if (extra) {
      for (const [name, file] of Object.entries(extra)) {
        if (file && typeof file === 'object' && typeof file.source === 'string') {
          files.push({ path: name, content: file.source });
        }
      }
    }
    return {
      name: demoName ?? demo.slug ?? 'Demo',
      description: aiSuggestion,
      initialMessage: aiSuggestion,
      files,
    };
  }, [aiSuggestion, demoName, props.code, demo.selectedVariant, demo.selectedFileName, demo.slug]);

  const expandedRef = React.useRef(demo.expanded);
  expandedRef.current = demo.expanded;
  const editingDependencies = React.useMemo(
    () => getDemoEditingDependencies(props.code),
    [props.code],
  );
  const expandSource = demo.expand;
  const expandWithEditingPreload = React.useCallback(() => {
    if (!disableLiveEdit) {
      codeController?.onActivate?.(editingDependencies);
    }
    expandSource();
  }, [codeController, disableLiveEdit, editingDependencies, expandSource]);
  // Warm the live-editing runtime (build engine, transpile worker, editor chunk)
  // while the browser is idle, so the first click into a code area edits instantly.
  // All preloads are module-level singletons, so per-demo scheduling is deduped.
  React.useEffect(() => {
    if (disableLiveEdit || !codeController?.onActivate) {
      return undefined;
    }
    const warm = () => {
      codeController.onActivate?.(editingDependencies);
      preloadCodeEditor();
    };
    if (typeof window.requestIdleCallback === 'function') {
      const handle = window.requestIdleCallback(warm);
      return () => window.cancelIdleCallback(handle);
    }
    const handle = setTimeout(warm, 1500);
    return () => clearTimeout(handle);
  }, [codeController, disableLiveEdit, editingDependencies]);
  const handleExpand = React.useCallback(() => {
    expandDemo(expandWithEditingPreload, remountPreview);
  }, [expandWithEditingPreload]);
  // The collapsed preview projects the unedited main file, so restore both the
  // file selection and the original source when the viewer closes.
  const resetSourceFile = React.useCallback(() => {
    const mainFileName = demo.files[0]?.name;
    if (mainFileName && demo.selectedFileName !== mainFileName) {
      demo.selectFileName(mainFileName);
    }
    resetDemo(demo.reset, remountPreview);
  }, [demo]);
  const handleToggleFrames = React.useCallback(() => {
    setAdShown(true);
    toggleDemoExpanded(
      expandedRef.current,
      expandWithEditingPreload,
      demo.setExpanded,
      remountPreview,
      resetSourceFile,
    );
  }, [expandWithEditingPreload, demo.setExpanded, resetSourceFile]);

  // GA event label — the canonical demo slug is used since it uniquely
  // identifies a demo within a page and is stable across renders.
  const gaLabel = demo.slug ?? props.name ?? '';

  const {
    toolbarRef,
    handleKeyDown: handleToolbarKeyDown,
    handleFocus: handleToolbarFocus,
  } = useToolbarKeyboard();

  // ---- Source deep links (custom, transform-only) ----
  // Render the ROOT (entry) file's `#<FileName>.{tsx,ts,js,jsx}` anchors (via
  // `DemoContainer`, so the loading skeleton emits them too) and, on a matching
  // hash, swap to the right language: `.tsx`/`.ts` -> TS source, `.js`/`.jsx` ->
  // the JS transform. Ids are FILENAME-based to match the existing/shipped slugs
  // (e.g. `ButtonBaseDemo.tsx` / `.jsx`). We only swap the language — no file or
  // variant selection. The native hash nav only reacts to `${kebab(slug)}:`-prefixed
  // hashes (`isHashRelevantToDemo`), so these colon-less ids never fight it. NEVER
  // join these ids with `:` or it re-enables native nav.
  const [hash] = useUrlHashState();
  const { selectTransform } = demo;

  // The root file is the selected variant's entry file (`VariantCode.fileName`,
  // e.g. `ButtonBaseDemo.tsx`).
  const rootVariantCode = props.code?.[demo.selectedVariant];
  const rootFileName =
    rootVariantCode && typeof rootVariantCode !== 'string' ? rootVariantCode.fileName : undefined;

  // The demo's deep-link anchor: the root file's base name (e.g. `#ContainedButtons`
  // from `ContainedButtons.tsx`), matching the existing/shipped slugs in `master`
  // — not the kebab-case `demo.slug`. An explicit `anchorId` option overrides it
  // (`null` disables anchors).
  const anchorName = anchorIdOption === undefined ? demoAnchorId(rootFileName) : anchorIdOption;

  const sourceAnchorIds = React.useMemo(
    () => (!hideToolbar && rootFileName ? fileSourceAnchorIds([rootFileName]) : undefined),
    [hideToolbar, rootFileName],
  );

  // Apply the hash once per change. Gating on `appliedHashRef` is essential:
  // `selectTransform`'s identity changes on every JS/TS toggle, so without it the
  // effect would re-run with a stale hash and yank the user's toggle choice back.
  const appliedHashRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (!hash || hash === appliedHashRef.current || !sourceAnchorIds?.includes(hash)) {
      return;
    }
    appliedHashRef.current = hash;
    // Landing on a source link reveals the source and selects its language.
    handleExpand();
    selectTransform(sourceAnchorTransform(hash));
  }, [hash, sourceAnchorIds, handleExpand, selectTransform]);

  // The main `#<DemoName>` anchor is rendered by `DemoContainer` (via the
  // `anchorId` prop) so the loading skeleton emits it too. Here we only add the
  // styling-solution deep links (`#system-<DemoName>.js`, etc.), which are
  // live-only and need the toolbar.
  const anchors =
    anchorName != null && !hideToolbar ? (
      <React.Fragment>
        {Object.keys(stylingSolutionMapping).flatMap((key) => {
          const slug = stylingSolutionMapping[key as keyof typeof stylingSolutionMapping];
          return [
            <DemoAnchorLink key={`${slug}-js`} id={`${slug}-${anchorName}.js`} />,
            <DemoAnchorLink key={`${slug}-tsx`} id={`${slug}-${anchorName}.tsx`} />,
          ];
        })}
      </React.Fragment>
    ) : null;

  const demoSourceId = `demo-source-${anchorName ?? demo.slug ?? demoName ?? 'demo'}`;

  // GitHub "view source" link for the file currently shown in the viewer.
  // `selectedFileUrl` follows the active file tab and is the demo's local
  // source URL rewritten to a hosted Git URL by `createDemo`'s `projectUrl`
  // (empty when no repository URL is configured, e.g. local dev — the menu
  // item is then disabled). The rewrite yields a `/tree/<ref>/` prefix; swap
  // it for `/blob/<ref>/` so the link opens the file view rather than a
  // directory listing. The URL keeps the authored `.tsx` name regardless of
  // the JavaScript/TypeScript view — there are no `.jsx` files to link to.
  const githubLocation = demo.selectedFileUrl?.replace('/tree/', '/blob/');

  // Copy-link anchors for the demo's ROOT file: its TS source name and its JS twin
  // (e.g. `ButtonBaseDemo.tsx` / `ButtonBaseDemo.jsx`) — the ids rendered above, so
  // pasting the link opens the demo source in that language.
  const tsSourceAnchor = rootFileName;
  const jsSourceAnchor =
    rootFileName && hasJsTransform ? toJavascriptFileName(rootFileName) : undefined;

  const router = useRouter();
  const deploymentLinks = React.useMemo(
    () =>
      buildDemoDeploymentLinks(
        {
          deployEnv: process.env.DEPLOY_ENV,
          siteName: process.env.SITE_NAME ?? process.env.NETLIFY_SITE_NAME,
          siteDeployUrl: process.env.SITE_DEPLOY_URL ?? process.env.NETLIFY_DEPLOY_URL,
          pullRequestId: process.env.PULL_REQUEST_ID,
        },
        router.asPath,
        // Deep-link to the kebab-case demo slug (e.g. `#combo-box`) — the
        // canonical anchor users see in the TOC — not the `#ComboBox` file anchor.
        demo.slug ?? anchorName ?? undefined,
      ),
    [router.asPath, anchorName, demo.slug],
  );

  const toolbar = hideToolbar ? null : (
    <DemoToolbar
      gaLabel={gaLabel}
      demoSourceId={demoSourceId}
      expanded={demo.expanded}
      onToggleExpand={handleToggleFrames}
      toggleRef={toggleRef}
      showCodeLabel={showCodeLabel}
      hasJsTransform={hasJsTransform}
      isJsSelected={isJsSelected}
      onLanguageClick={handleLanguageClick}
      languageToggleRef={languageToggleRef}
      variants={demo.variants}
      selectedVariant={demo.selectedVariant}
      onSelectVariant={demo.selectVariant}
      openMuiChat={openMuiChat}
      hideEditButton={hideEditButton}
      onOpenStackBlitz={demo.openStackBlitz}
      onOpenCodeSandbox={demo.openCodeSandbox}
      onCopySource={demo.copy}
      onResetFocus={handleResetFocus}
      onReset={handleReset}
      githubLocation={githubLocation}
      tsSourceAnchor={tsSourceAnchor}
      jsSourceAnchor={jsSourceAnchor}
      deploymentLinks={deploymentLinks}
    />
  );

  const hasMultipleFiles = !hideToolbar && demo.files.length > 1;

  const tabs =
    hasMultipleFiles && demo.expanded ? (
      <DemoFileTabBar activateOnFocus>
        {demo.files.map((file) => (
          <FileTab key={file.name} value={file.name}>
            {file.name}
          </FileTab>
        ))}
      </DemoFileTabBar>
    ) : null;

  const code = hideToolbar ? null : (
    <CodeSource expanded={demo.expanded}>{demo.selectedFile}</CodeSource>
  );

  // When the demo has multiple files, wrap the tabs + code region in a
  // `Tabs.Root` so the `Tabs.List` / `Tabs.Tab` parts wired through
  // `DemoFileTabBar` / `FileTab` get their shared state.
  const renderTabsAndCode = hasMultipleFiles
    ? (children: React.ReactNode) => (
        <Tabs.Root
          value={demo.selectedFileName}
          onValueChange={(value) => {
            if (typeof value === 'string') {
              demo.selectFileName(value);
            }
          }}
        >
          {children}
        </Tabs.Root>
      )
    : undefined;

  const afterCode = hideToolbar ? null : (
    <React.Fragment>
      {aiSuggestion && aiSuggestionParams ? (
        <DemoAiSuggestionHero suggestion={aiSuggestion} params={aiSuggestionParams} />
      ) : null}
      {showAd ? <AdCarbonInline /> : null}
    </React.Fragment>
  );

  // Build the inner-sandbox style only when a constraint is set so the common
  // case keeps the preview area's flex-child layout untouched.
  const previewStyle = React.useMemo(() => {
    if (maxWidth == null && height == null) {
      return undefined;
    }
    return { maxWidth, height };
  }, [maxWidth, height]);

  return (
    <DemoContainer
      anchorId={anchorName}
      anchors={anchors}
      sourceAnchorIds={sourceAnchorIds}
      preview={demo.component}
      isolated={isolated}
      iframe={iframe}
      name={demoName ?? demo.slug ?? 'demo'}
      onReset={handleReset}
      previewEpoch={previewEpoch}
      bg={resolvedBg}
      hideToolbar={hideToolbar}
      previewStyle={previewStyle}
      codeOverlay={<DemoErrorOverlay message={demo.error} />}
      focusRef={demo.focusRef}
      toolbar={toolbar}
      toolbarRef={toolbarRef}
      toolbarLabel={t('demoToolbarLabel')}
      onToolbarKeyDown={handleToolbarKeyDown}
      onToolbarFocus={handleToolbarFocus}
      expanded={demo.expanded}
      sourceVisible={sourceVisible}
      tabs={tabs}
      code={code}
      codeId={demoSourceId}
      afterCode={afterCode}
      renderTabsAndCode={renderTabsAndCode}
    />
  );
}
