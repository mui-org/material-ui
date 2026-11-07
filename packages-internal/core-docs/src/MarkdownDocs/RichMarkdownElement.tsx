import * as React from 'react';
import dynamic from 'next/dynamic';
import { HighlightedCodeWithTabs } from '../HighlightedCodeWithTabs';
import { MarkdownElement } from './MarkdownElement';

// Legacy pages load their demo renderer only when a demo directive is encountered.
const LegacyMarkdownDemo = dynamic(() => import('./LegacyMarkdownDemo'));

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
  const { activeTab, localizedDoc, renderedMarkdownOrDemo, srcComponents } = props;

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

  return <LegacyMarkdownDemo {...props} />;
}
