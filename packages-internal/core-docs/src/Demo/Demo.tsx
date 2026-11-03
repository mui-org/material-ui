import * as React from 'react';
import copy from 'clipboard-copy';
import { debounce } from '@mui/material/utils';
import { alpha, styled } from '@mui/material/styles';
import { Tabs, TabsTabDataAttributes } from '@base-ui/react/tabs';
import { unstable_useId as useId } from '@mui/utils';
import IconButton from '@mui/material/IconButton';
import type { ButtonBaseActions } from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import NoSsr from '@mui/material/NoSsr';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import LibraryAddCheckRoundedIcon from '@mui/icons-material/LibraryAddCheckRounded';
import { HighlightedCode } from '../HighlightedCode';
import { CodeTab, CodeTabList } from '../HighlightedCodeWithTabs';
import { DemoSandbox } from './DemoSandbox';
import { DemoToolbarRoot } from './DemoToolbarRoot';
import { DemoAiSuggestionHero } from './DemoAiSuggestionHero';
import { DemoEditor } from './DemoEditor';
import { DemoEditorError } from './DemoEditorError';
import { ReactRunner } from './ReactRunner';
import { useDemoContext } from '../DemoContext/DemoContext';
import { useCodeVariant } from '../codeVariant/codeVariant';
import { CODE_VARIANTS, stylingSolutionMapping } from '../constants/constants';
import { useUserLanguage, useTranslate } from '../i18n';
import { AdCarbonInline } from '../Ad/AdCarbon';

/**
 * Removes leading spaces (indentation) present in the `.tsx` previews
 * to be able to replace the existing code with the incoming dynamic code
 */
function trimLeadingSpaces(input = '') {
  return input.replace(/^\s+/gm, '');
}

function DemoToolbarFallback() {
  const t = useTranslate();

  // Sync with styles from DemoToolbar, we can't import the styles
  return <Box sx={{ height: 42 }} aria-busy aria-label={t('demoToolbarLabel')} role="toolbar" />;
}

function getDemoName(location: string) {
  return location.endsWith('.js') || location.endsWith('.tsx')
    ? location.replace(/(.+?)(\w+)\.\w+$$/, '$2')
    : // the demos with multiple styling solution point to directory
      location.split('/').pop()!;
}

interface DemoData {
  scope: any;
  jsxPreview: string | undefined;
  codeVariant: string;
  githubLocation: string;
  raw: string;
  module: string | undefined;
  Component: React.ComponentType | null;
  sourceLanguage: string;
  relativeModules?: Array<{ module: string; raw: string }>;
  title: string;
  language: string;
}

function useDemoData(
  codeVariant: string,
  demo: DemoProps['demo'],
  githubLocation: string,
  productDisplayName: string,
): DemoData {
  const userLanguage = useUserLanguage();

  return React.useMemo(() => {
    let codeOptions: {
      codeVariant: string;
      githubLocation: string;
      raw: string;
      module: string | undefined;
      Component: React.ComponentType | null;
      sourceLanguage: string;
      relativeModules?: Array<{ module: string; raw: string }>;
    };

    if (codeVariant === CODE_VARIANTS.TS && demo.rawTS) {
      codeOptions = {
        codeVariant: CODE_VARIANTS.TS,
        githubLocation: githubLocation.replace(/\.js$/, '.tsx'),
        raw: demo.rawTS,
        module: demo.moduleTS,
        Component: demo.tsx ?? null,
        sourceLanguage: 'tsx',
      };
      if (demo.relativeModules) {
        codeOptions.relativeModules = demo.relativeModules[CODE_VARIANTS.TS];
      }
    } else {
      codeOptions = {
        codeVariant: CODE_VARIANTS.JS,
        githubLocation,
        raw: demo.raw,
        module: demo.module,
        Component: demo.js,
        sourceLanguage: 'jsx',
      };
      if (demo.relativeModules) {
        codeOptions.relativeModules = demo.relativeModules[CODE_VARIANTS.JS];
      }
    }

    return {
      scope: demo.scope,
      jsxPreview: demo.jsxPreview,
      ...codeOptions,
      title: `${getDemoName(githubLocation)} demo — ${productDisplayName}`,
      language: userLanguage,
    };
  }, [codeVariant, demo, githubLocation, productDisplayName, userLanguage]);
}

interface UseDemoElementParams {
  demoData: DemoData;
  editorCode: { value: string; isPreview: boolean; initialEditorCode: string };
  setDebouncedError: React.Dispatch<React.SetStateAction<string | null>>;
  liveDemoActive: boolean;
}

function useDemoElement({
  demoData,
  editorCode,
  setDebouncedError,
  liveDemoActive,
}: UseDemoElementParams) {
  const debouncedSetError = React.useMemo(
    () => debounce(setDebouncedError, 300),
    [setDebouncedError],
  );

  React.useEffect(() => {
    return () => {
      debouncedSetError.clear();
    };
  }, [debouncedSetError]);

  // Memoize to avoid rendering the demo more than it needs to be.
  // For example, avoid a render when the demo is hovered.
  const BundledComponent = React.useMemo(
    () => (demoData.Component ? <demoData.Component /> : (null as unknown as React.ReactElement)),
    [demoData],
  );
  const LiveComponent = React.useMemo(
    () => (
      <ReactRunner
        scope={demoData.scope}
        onError={debouncedSetError as any}
        code={
          editorCode.isPreview
            ? trimLeadingSpaces(demoData.raw).replace(
                trimLeadingSpaces(demoData.jsxPreview),
                editorCode.value,
              )
            : editorCode.value
        }
      />
    ),
    [demoData, debouncedSetError, editorCode.isPreview, editorCode.value],
  );

  // No need for a live environment if the code matches with the component rendered server-side.
  return editorCode.value === editorCode.initialEditorCode && liveDemoActive === false
    ? BundledComponent
    : LiveComponent;
}

const Root = styled('div')(({ theme }) => ({
  marginBottom: 24,
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

const DemoRoot = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'hideToolbar' && prop !== 'bg' && prop !== 'hasAiSuggestion',
})<{ hideToolbar?: boolean; bg?: string | boolean; hasAiSuggestion?: boolean }>(({ theme }) => ({
  position: 'relative',
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
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
      props: {
        bg: 'outlined',
      },
      style: {
        [theme.breakpoints.up('sm')]: {
          borderLeftWidth: 1,
          borderRightWidth: 1,
        },
      },
    },
    {
      props: {
        bg: 'inline',
      },
      style: {
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(0),
        },
      },
    },
    {
      props: {
        bg: 'gradient',
      },
      style: {
        [theme.breakpoints.up('sm')]: {
          padding: theme.spacing(12, 8),
          borderLeftWidth: 1,
          borderRightWidth: 1,
        },
      },
    },
    {
      props: {
        bg: 'outlined',
      },
      style: {
        padding: theme.spacing(3),
        backgroundColor: (theme.vars || theme).palette.background.paper,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        ...theme.applyDarkStyles({
          backgroundColor: alpha(theme.palette.primaryDark[700], 0.1),
        }),
      },
    },
    {
      props: {
        bg: 'playground',
      },
      style: {
        backgroundColor: (theme.vars || theme).palette.background.paper,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        overflow: 'auto',
      },
    },
    {
      props: {
        bg: true,
      },
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
      props: {
        bg: 'gradient',
      },
      style: {
        overflow: 'auto',
        padding: theme.spacing(4, 2),
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundClip: 'padding-box',
        backgroundColor: alpha(theme.palette.primary[50], 0.2),
        backgroundImage: `radial-gradient(120% 140% at 50% 10%, transparent 40%, ${alpha(theme.palette.primary[100], 0.2)} 70%)`,
        ...theme.applyDarkStyles({
          backgroundColor: (theme.vars || theme).palette.primaryDark[900],
          backgroundImage: `radial-gradient(120% 140% at 50% 10%, transparent 30%, ${alpha(theme.palette.primary[900], 0.3)} 80%)`,
        }),
      },
    },
  ],
}));

const DemoCodeViewer = styled(HighlightedCode)(() => ({
  '& pre': {
    margin: 0,
    marginTop: -1,
    maxHeight: 'min(68vh, 1000px)',
    maxWidth: 'initial',
    borderRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
}));

const AnchorLink = styled('div')({
  marginTop: -64, // height of toolbar
  position: 'absolute',
});

const InitialFocus = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: theme.spacing(4),
  height: theme.spacing(4),
  pointerEvents: 'none',
}));

const selectionOverride = (theme: any) => ({
  cursor: 'pointer',
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
});

export interface DemoToolbarProps {
  codeOpen: boolean;
  codeVariant: string;
  copyButtonOnClick: () => void;
  copyIcon: React.ReactNode;
  hasNonSystemDemos: boolean;
  demo: DemoProps['demo'];
  demoData: DemoData;
  demoId: string;
  demoName: string;
  demoOptions: DemoProps['demoOptions'];
  demoSourceId: string;
  initialFocusRef: React.RefObject<ButtonBaseActions | null>;
  onCodeOpenChange: () => void;
  onResetDemoClick: () => void;
  openDemoSource: boolean;
  showPreview: boolean;
}

export interface DemoProps {
  demo: {
    raw: string;
    js: React.ComponentType;
    scope?: any;
    jsxPreview?: string;
    tailwindJsxPreview?: string;
    cssJsxPreview?: string;
    rawTS?: string;
    module: string;
    moduleTS?: string;
    tsx?: React.ComponentType | null;
    rawTailwind?: string;
    rawTailwindTS?: string;
    jsTailwind?: React.ComponentType | null;
    tsxTailwind?: React.ComponentType | null;
    rawCSS?: string;
    rawCSSTS?: string;
    jsCSS?: React.ComponentType | null;
    tsxCSS?: React.ComponentType | null;
    gaLabel?: string;
    relativeModules?: Record<string, Array<{ module: string; raw: string }>>;
  };
  demoOptions: {
    demo: string;
    hideToolbar?: boolean;
    defaultCodeOpen?: boolean;
    disableAd?: boolean;
    bg?: string | boolean;
    iframe?: boolean;
    isolated?: boolean;
    maxWidth?: number;
    height?: number;
    disableLiveEdit?: boolean;
    aiSuggestion?: string;
    hideEditButton?: boolean;
    anchorId?: string | null;
  };
  disableAd: boolean;
  githubLocation: string;
  /**
   * A lazy-loaded toolbar component to render inside the demo.
   * This allows docs-specific toolbar implementations (e.g., with sandbox links)
   * to be injected without coupling core-docs to docs-specific dependencies.
   */
  demoToolbarSlot?: React.ComponentType<DemoToolbarProps>;
}

export function Demo(props: DemoProps) {
  const { demo, demoOptions, disableAd, githubLocation, demoToolbarSlot: DemoToolbar } = props;

  // Guard with NEXT_RUNTIME so this check is dead-code-eliminated from client bundles.
  if (process.env.NEXT_RUNTIME) {
    if (demoOptions.hideToolbar === false) {
      throw new Error(
        [
          '"hideToolbar": false is already the default.',
          `Please remove the property in {{"demo": "${demoOptions.demo}", …}}.`,
        ].join('\n'),
      );
    }
    if (demoOptions.hideToolbar === true && demoOptions.defaultCodeOpen === true) {
      throw new Error(
        [
          '"hideToolbar": true, "defaultCodeOpen": true combination is invalid.',
          `Please remove one of the properties in {{"demo": "${demoOptions.demo}", …}}.`,
        ].join('\n'),
      );
    }
    if (demoOptions.hideToolbar === true && demoOptions.disableAd === true) {
      throw new Error(
        [
          '"hideToolbar": true, "disableAd": true combination is invalid.',
          `Please remove one of the properties in {{"demo": "${demoOptions.demo}", …}}.`,
        ].join('\n'),
      );
    }
  }

  if (
    (demoOptions.demo.endsWith('.ts') || demoOptions.demo.endsWith('.tsx')) &&
    demoOptions.hideToolbar !== true
  ) {
    throw new Error(
      [
        `The following demos use TS directly: ${demoOptions.demo}.`,
        '',
        'Please run "pnpm docs:typescript:formatted" to generate a JS version and reference it:',
        // This regex intentionally excludes the dot character in the Kleene star to prevent ReDoS
        // See https://github.com/mui/material-ui/issues/44078
        `{{"demo": "${demoOptions.demo.replace(/\.([^.]*)$/, '.js')}", …}}.`,
        '',
        "Otherwise, if it's not a code demo hide the toolbar:",
        `{{"demo": "${demoOptions.demo}", "hideToolbar": true, …}}.`,
      ].join('\n'),
    );
  }

  const t = useTranslate();
  const codeVariant = useCodeVariant();
  const { productDisplayName } = useDemoContext();

  const demoData = useDemoData(codeVariant, demo, githubLocation, productDisplayName);

  const hasNonSystemDemos = !!(
    demo.rawTailwind ||
    demo.rawTailwindTS ||
    demo.rawCSS ||
    demo.rawCSSTS
  );

  const demoName = getDemoName(demoData.githubLocation);
  const anchorIdOption = demoOptions.anchorId;
  const anchorName = anchorIdOption === undefined ? demoName : anchorIdOption;
  const demoSandboxedStyle = React.useMemo(
    () => ({
      maxWidth: demoOptions.maxWidth,
      height: demoOptions.height,
    }),
    [demoOptions.height, demoOptions.maxWidth],
  );

  if (demoOptions.bg == null) {
    demoOptions.bg = 'outlined';

    if (demoOptions.iframe) {
      demoOptions.bg = true;
    }
  }

  const [codeOpen, setCodeOpen] = React.useState(demoOptions.defaultCodeOpen || false);
  const shownOnce = React.useRef(false);
  if (codeOpen) {
    shownOnce.current = true;
  }

  React.useEffect(() => {
    const navigatedDemoName = getDemoName(window.location.hash);
    if (
      navigatedDemoName &&
      (demoName === navigatedDemoName || (anchorName !== null && anchorName === navigatedDemoName))
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCodeOpen(true);
    }
  }, [demoName, anchorName]);

  const showPreview =
    !demoOptions.hideToolbar &&
    demoOptions.defaultCodeOpen !== false &&
    Boolean(demoData.jsxPreview);

  const [demoKey, setDemoKey] = React.useReducer((key: number) => key + 1, 0);

  const demoId = `demo-${useId()}`;
  const demoSourceId = `demoSource-${useId()}`;
  const openDemoSource = codeOpen || showPreview;

  const initialFocusRef = React.useRef<ButtonBaseActions>(null);

  const [showAd, setShowAd] = React.useState(false);
  const adVisibility = showAd && !disableAd && !demoOptions.disableAd;

  const isPreview = !codeOpen && showPreview;

  const initialEditorCode = isPreview
    ? (demoData.jsxPreview ?? '')
    : // Prettier remove all the leading lines except for the last one, remove it as we don't
      // need it in the live edit view.
      demoData.raw.replace(/\n$/, '');
  const [editorCode, setEditorCode] = React.useState({
    value: initialEditorCode,
    isPreview,
    initialEditorCode,
  });

  const resetDemo = React.useCallback(() => {
    setEditorCode({
      value: initialEditorCode,
      isPreview,
      initialEditorCode,
    });
    setDemoKey();
  }, [setEditorCode, setDemoKey, initialEditorCode, isPreview]);

  // Reset the (user-editable) editor code whenever the demo's source or preview
  // mode changes. Adjusting state during render is preferred over an effect.
  const [editorCodeSource, setEditorCodeSource] = React.useState({ initialEditorCode, isPreview });
  if (
    editorCodeSource.initialEditorCode !== initialEditorCode ||
    editorCodeSource.isPreview !== isPreview
  ) {
    setEditorCodeSource({ initialEditorCode, isPreview });
    setEditorCode({
      value: initialEditorCode,
      isPreview,
      initialEditorCode,
    });
  }

  const [debouncedError, setDebouncedError] = React.useState<string | null>(null);

  const [liveDemoActive, setLiveDemoActive] = React.useState(false);

  const demoElement = useDemoElement({
    demoData,
    editorCode,
    setDebouncedError,
    liveDemoActive,
  });

  const [activeTab, setActiveTab] = React.useState(0);
  const handleTabChange: NonNullable<Tabs.Root.Props['onValueChange']> = (value) => {
    setActiveTab(value as number);
  };
  const ownerState = { mounted: true, contained: true };

  const tabs = React.useMemo(() => {
    if (!demoData.relativeModules) {
      return [{ module: demoData.module, raw: demoData.raw }];
    }
    let demoModule = demoData.module;
    if (codeVariant === CODE_VARIANTS.TS && demo.moduleTS) {
      demoModule =
        demo.moduleTS === demo.module ? demoData.module!.replace(/\.js$/, '.tsx') : demo.moduleTS;
    }

    return [{ module: demoModule, raw: demoData.raw }, ...demoData.relativeModules];
  }, [
    codeVariant,
    demo.moduleTS,
    demo.module,
    demoData.module,
    demoData.raw,
    demoData.relativeModules,
  ]);

  const [copiedContent, setCopiedContent] = React.useState(false);

  const handleCopyClick = async () => {
    try {
      const activeTabData = tabs[activeTab];
      await copy(activeTabData.raw);
      setCopiedContent(true);
      setTimeout(() => {
        setCopiedContent(false);
      }, 1000);
    } catch (error) {
      console.error('Code content not copied', error);
    }
  };
  const willRenderTabList = demoData.relativeModules && openDemoSource && !editorCode.isPreview;

  return (
    <Root>
      {anchorName !== null && <AnchorLink id={anchorName} />}
      <DemoRoot
        hideToolbar={demoOptions.hideToolbar}
        bg={demoOptions.bg}
        id={demoId}
        hasAiSuggestion={Boolean(demoOptions.aiSuggestion)}
      >
        <InitialFocus aria-label={t('initialFocusLabel')} action={initialFocusRef} tabIndex={-1} />
        <DemoSandbox
          key={demoKey}
          id={demoId}
          style={demoSandboxedStyle}
          iframe={demoOptions.iframe}
          isolated={demoOptions.isolated}
          name={demoName}
          onResetDemoClick={resetDemo}
        >
          {demoElement}
        </DemoSandbox>
      </DemoRoot>
      {demoOptions.hideToolbar ? null : (
        <React.Fragment>
          {anchorName !== null &&
            Object.keys(stylingSolutionMapping).map((key) => (
              <React.Fragment key={key}>
                <AnchorLink
                  id={`${stylingSolutionMapping[key as keyof typeof stylingSolutionMapping]}-${anchorName}.js`}
                />
                <AnchorLink
                  id={`${stylingSolutionMapping[key as keyof typeof stylingSolutionMapping]}-${anchorName}.tsx`}
                />
              </React.Fragment>
            ))}
          {anchorName !== null && <AnchorLink id={`${anchorName}.js`} />}
          {anchorName !== null && <AnchorLink id={`${anchorName}.tsx`} />}
          <DemoToolbarRoot demoOptions={demoOptions} openDemoSource={openDemoSource}>
            {DemoToolbar ? (
              <NoSsr fallback={<DemoToolbarFallback />}>
                <React.Suspense fallback={<DemoToolbarFallback />}>
                  <DemoToolbar
                    codeOpen={codeOpen}
                    codeVariant={codeVariant}
                    copyIcon={
                      copiedContent ? <LibraryAddCheckRoundedIcon /> : <ContentCopyRoundedIcon />
                    }
                    copyButtonOnClick={handleCopyClick}
                    hasNonSystemDemos={hasNonSystemDemos}
                    demo={demo}
                    demoData={demoData}
                    demoId={demoId}
                    demoName={demoName}
                    demoOptions={demoOptions}
                    demoSourceId={demoSourceId}
                    initialFocusRef={initialFocusRef}
                    onCodeOpenChange={() => {
                      setCodeOpen((open) => !open);
                      setShowAd(true);
                    }}
                    onResetDemoClick={resetDemo}
                    openDemoSource={openDemoSource}
                    showPreview={showPreview}
                  />
                </React.Suspense>
              </NoSsr>
            ) : (
              <DemoToolbarFallback />
            )}
          </DemoToolbarRoot>
          <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
            {willRenderTabList ? (
              <CodeTabList ownerState={ownerState}>
                {tabs.map((tab, index) => (
                  <CodeTab
                    sx={selectionOverride}
                    ownerState={ownerState}
                    key={tab.module}
                    value={index}
                  >
                    {tab.module}
                  </CodeTab>
                ))}
              </CodeTabList>
            ) : null}
            <Collapse in={openDemoSource} unmountOnExit timeout={150}>
              {/* A limitation from https://github.com/nihgwu/react-runner,
                we can't inject the `window` of the iframe so we need a disableLiveEdit option. */}
              {tabs.map((tab, index) => (
                <Tabs.Panel
                  role={willRenderTabList ? 'tabpanel' : undefined}
                  value={index}
                  key={index}
                  tabIndex={-1}
                >
                  {demoOptions.disableLiveEdit || index > 0 ? (
                    <DemoCodeViewer
                      key={index}
                      code={tab.raw}
                      language={demoData.sourceLanguage}
                      copyButtonProps={
                        {
                          'data-ga-event-category': codeOpen ? 'demo-expand' : 'demo',
                          'data-ga-event-label': demo.gaLabel,
                          'data-ga-event-action': 'copy-click',
                        } as any
                      }
                      sx={{
                        '& .MuiCode-copy': {
                          display: 'none',
                        },
                        '& pre': {
                          borderBottomLeftRadius: demoOptions.aiSuggestion ? 0 : 12,
                          borderBottomRightRadius: demoOptions.aiSuggestion ? 0 : 12,
                        },
                      }}
                    />
                  ) : (
                    <DemoEditor
                      // Mount a new text editor when the preview mode change to reset the undo/redo history.
                      key={String(editorCode.isPreview)}
                      value={editorCode.value}
                      onChange={
                        ((value: string) => {
                          setEditorCode({
                            ...editorCode,
                            value,
                          });
                        }) as any
                      }
                      onFocus={() => {
                        setLiveDemoActive(true);
                      }}
                      id={demoSourceId}
                      language={demoData.sourceLanguage}
                      copyButtonProps={
                        {
                          'data-ga-event-category': codeOpen ? 'demo-expand' : 'demo',
                          'data-ga-event-label': demo.gaLabel,
                          'data-ga-event-action': 'copy-click',
                        } as any
                      }
                      sx={
                        {
                          '& .scrollContainer': {
                            borderBottomLeftRadius: demoOptions.aiSuggestion ? 0 : 12,
                            borderBottomRightRadius: demoOptions.aiSuggestion ? 0 : 12,
                          },
                        } as any
                      }
                    >
                      <DemoEditorError>{debouncedError}</DemoEditorError>
                    </DemoEditor>
                  )}
                </Tabs.Panel>
              ))}
            </Collapse>
          </Tabs.Root>
          {/* AI Suggestion Hero UI */}
          {demoOptions.aiSuggestion ? (
            <DemoAiSuggestionHero
              suggestion={demoOptions.aiSuggestion}
              params={{
                name: demoName,
                description: demoOptions.aiSuggestion,
                initialMessage: demoOptions.aiSuggestion,
                files: [
                  {
                    path: demo.moduleTS!,
                    content: demo.rawTS!,
                    isEntry: true,
                  },
                  ...(demo.relativeModules?.TS ?? []).map((module) => ({
                    path: module.module,
                    content: module.raw,
                  })),
                ],
              }}
            />
          ) : null}
          {adVisibility ? <AdCarbonInline /> : null}
        </React.Fragment>
      )}
    </Root>
  );
}
