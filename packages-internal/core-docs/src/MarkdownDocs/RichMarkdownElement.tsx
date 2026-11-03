import * as React from 'react';
import { useTranslate, useUserLanguage } from '../i18n';
import { HighlightedCodeWithTabs } from '../HighlightedCodeWithTabs';
import { MarkdownElement } from './MarkdownElement';
import { Demo } from '../Demo/Demo';
import type { DemoProps } from '../Demo/Demo';
import { DemoToolbar } from '../Demo/DemoToolbar';

function noComponent(moduleID: string) {
  return function NoComponent() {
    throw new Error(`No demo component provided for '${moduleID}'`);
  };
}

export interface RichMarkdownElementProps {
  activeTab?: string;
  demoComponents: Record<string, React.ComponentType<any>>;
  demos?: Record<string, any>;
  disableAd?: boolean;
  localizedDoc: {
    location: string;
    [key: string]: any;
  };
  renderedMarkdownOrDemo:
    | string
    | {
        component?: any;
        demo?: string;
        type?: string;
        data?: any;
        storageKey?: string;
        [key: string]: any;
      };
  srcComponents?: Record<string, React.ComponentType<any>>;
}

export function RichMarkdownElement(props: RichMarkdownElementProps) {
  const {
    activeTab,
    demoComponents,
    demos = {},
    disableAd,
    localizedDoc,
    renderedMarkdownOrDemo,
    srcComponents,
  } = props;
  const userLanguage = useUserLanguage();
  const t = useTranslate();

  if (typeof renderedMarkdownOrDemo === 'string') {
    return <MarkdownElement renderedMarkdown={renderedMarkdownOrDemo} />;
  }

  if (renderedMarkdownOrDemo.component) {
    const name = renderedMarkdownOrDemo.component;
    const Component = srcComponents?.[name];

    if (Component === undefined) {
      throw new Error(`No component found at the path 'docs/src/${name}`);
    }

    const additionalProps: Record<string, any> = {};
    if (name === 'modules/components/ComponentPageTabs.js') {
      additionalProps.activeTab = activeTab;
    }

    return <Component {...renderedMarkdownOrDemo} {...additionalProps} markdown={localizedDoc} />;
  }

  if (renderedMarkdownOrDemo.type === 'codeblock') {
    return (
      <HighlightedCodeWithTabs
        tabs={renderedMarkdownOrDemo.data}
        storageKey={
          renderedMarkdownOrDemo.storageKey && `codeblock-${renderedMarkdownOrDemo.storageKey}`
        }
      />
    );
  }

  const name = renderedMarkdownOrDemo.demo!;
  const demo = demos?.[name];
  if (demo === undefined) {
    const errorMessage = [
      `Missing demo: ${name}. You can use one of the following:`,
      Object.keys(demos),
    ].join('\n');

    if (userLanguage === 'en') {
      throw new Error(errorMessage);
    }

    if (process.env.NODE_ENV !== 'production') {
      console.error(errorMessage);
    }

    const warnIcon = (
      <span role="img" aria-label={t('emojiWarning')}>
        ⚠️
      </span>
    );
    return (
      <div>
        {warnIcon} Missing demo `{name}` {warnIcon}
      </div>
    );
  }

  const splitLocationBySlash = localizedDoc.location.split('/');
  splitLocationBySlash.pop();
  const fileNameWithLocation = `${splitLocationBySlash.join('/')}/${name}`;

  return (
    <Demo
      demo={{
        raw: demo.raw,
        js: demoComponents[demo.module!] ?? noComponent(demo.module!),
        scope: demos.scope,
        jsxPreview: demo.jsxPreview,
        tailwindJsxPreview: demo.tailwindJsxPreview,
        cssJsxPreview: demo.cssJsxPreview,
        rawTS: demo.rawTS,
        module: demo.module,
        moduleTS: demo.moduleTS,
        tsx: demoComponents[demo.moduleTS!] ?? noComponent(demo.moduleTS!),
        rawTailwind: demo.rawTailwind,
        rawTailwindTS: demo.rawTailwindTS,
        jsTailwind: demoComponents[demo.moduleTailwind] ?? null,
        tsxTailwind: demoComponents[demo.moduleTSTailwind] ?? null,
        rawCSS: demo.rawCSS,
        rawCSSTS: demo.rawCSSTS,
        jsCSS: demoComponents[demo.moduleCSS] ?? null,
        tsxCSS: demoComponents[demo.moduleTSCSS] ?? null,
        gaLabel: fileNameWithLocation.replace(/^\/docs\/data\//, ''),
        relativeModules: demo.relativeModules,
      }}
      disableAd={disableAd ?? false}
      demoOptions={renderedMarkdownOrDemo as DemoProps['demoOptions']}
      githubLocation={`${process.env.SOURCE_CODE_REPO}/blob/v${process.env.LIB_VERSION}${fileNameWithLocation}`}
      demoToolbarSlot={DemoToolbar}
    />
  );
}
