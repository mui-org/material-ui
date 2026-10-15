import * as React from 'react';
import { useTranslate, useUserLanguage } from '../i18n';
import { Demo } from '../Demo/Demo';
import type { DemoProps } from '../Demo/Demo';
import { DemoToolbar } from '../Demo/DemoToolbar';
import type { RichMarkdownElementProps } from './RichMarkdownElement';

function noComponent(moduleID: string) {
  return function NoComponent() {
    throw new Error(`No demo component provided for '${moduleID}'`);
  };
}

export default function LegacyMarkdownDemo(props: RichMarkdownElementProps) {
  const { demoComponents, demos = {}, disableAd, localizedDoc, renderedMarkdownOrDemo } = props;
  const userLanguage = useUserLanguage();
  const t = useTranslate();

  if (typeof renderedMarkdownOrDemo === 'string') {
    return null;
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
