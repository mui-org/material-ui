import * as React from 'react';
import { Ad, AdGuest } from '../Ad';
import DemoContext, { useDemoContext } from '../DemoContext';
import { RichMarkdownElement } from './RichMarkdownElement';
import { AppLayoutDocs } from '../AppLayout';
import { useUserLanguage } from '../i18n';

export interface MarkdownDocsProps {
  wideLayout?: boolean;
  demoComponents?: Record<string, React.ComponentType<any>>;
  demos?: Record<string, any>;
  disableAd?: boolean;
  disableToc?: boolean;
  docs: Record<string, any>;
  srcComponents?: Record<string, React.ComponentType<any>>;
}

export function MarkdownDocs(props: MarkdownDocsProps) {
  const {
    disableAd = false,
    disableToc = false,
    wideLayout,
    demos = {},
    docs,
    demoComponents = {},
    srcComponents,
  } = props;

  const userLanguage = useUserLanguage();
  const localizedDoc = docs[userLanguage] || docs.en;

  // Propagate the page-level `disableAd` killswitch into `DemoContext` so the
  // inline Carbon ad rendered inside demos respects pages that opt out of ads
  // (e.g. the Getting Started > Usage page). Without this, demos on ad-free
  // pages would still show inline Carbon ads once the source viewer is opened.
  const parentDemoContext = useDemoContext();
  const demoContextValue = React.useMemo(
    () => ({ ...parentDemoContext, disableAd: disableAd || parentDemoContext.disableAd }),
    [parentDemoContext, disableAd],
  );

  const content = (
    <AppLayoutDocs
      cardOptions={{
        description: localizedDoc.headers.cardDescription,
        title: localizedDoc.headers.cardTitle,
      }}
      description={localizedDoc.description}
      disableAd={disableAd}
      disableToc={disableToc}
      wideLayout={wideLayout}
      location={localizedDoc.location}
      title={localizedDoc.title}
      toc={localizedDoc.toc}
    >
      {disableAd ? null : (
        <AdGuest>
          <Ad />
        </AdGuest>
      )}
      {localizedDoc.rendered.map((renderedMarkdownOrDemo: any, index: number) => (
        <RichMarkdownElement
          key={`demos-section-${index}`}
          demoComponents={demoComponents}
          demos={demos}
          disableAd={disableAd}
          localizedDoc={localizedDoc}
          renderedMarkdownOrDemo={renderedMarkdownOrDemo}
          srcComponents={srcComponents}
        />
      ))}
    </AppLayoutDocs>
  );

  return <DemoContext.Provider value={demoContextValue}>{content}</DemoContext.Provider>;
}
