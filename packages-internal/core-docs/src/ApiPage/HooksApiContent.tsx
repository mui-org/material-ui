/* eslint-disable react/no-danger */
import * as React from 'react';
import type { HookApiContent, HooksTranslations } from '@mui/internal-api-docs-builder';
import { kebabCase } from 'es-toolkit/string';
import { useTranslate, useUserLanguage } from '../i18n';
import type { Translate } from '../i18n';
import { SectionTitle } from '../SectionTitle';
import type { SectionTitleProps } from '../SectionTitle';
import type { LayoutStorageKeys } from './types';
import { getHookApiDefinitions } from './definitions/properties';
import { DEFAULT_API_LAYOUT_STORAGE_KEYS } from './sections/ToggleDisplayOption';
import type { ApiDisplayLayout } from './sections/ToggleDisplayOption';
import { PropertiesSection } from './sections/PropertiesSection';
import { HighlightedCode } from '../HighlightedCode';
import { MarkdownElement } from '../MarkdownDocs/MarkdownElement';

function getTranslatedHeader(t: Translate, header: string, title?: string) {
  const translations: Record<string, string> = {
    demos: t('api-docs.demos'),
    import: t('api-docs.import'),
    'hook-name': t('api-docs.hookName'),
    parameters: t('api-docs.parameters'),
    'return-value': t('api-docs.returnValue'),
  };

  return translations[header] || (title && translations[title]) || title || header;
}

function Heading(props: SectionTitleProps) {
  const { hash, title, level = 'h2' } = props;
  const t = useTranslate();

  return <SectionTitle title={getTranslatedHeader(t, hash, title)} hash={hash} level={level} />;
}

export type HooksApiContentProps = {
  descriptions: {
    [hookName: string]: {
      [lang: string]: HooksTranslations;
    };
  };
  pagesContents: { [component: string]: HookApiContent };
  defaultLayout?: ApiDisplayLayout;
  layoutStorageKey?: LayoutStorageKeys;
};

export function HooksApiContent(props: HooksApiContentProps) {
  const {
    descriptions,
    pagesContents,
    defaultLayout = 'table',
    layoutStorageKey = DEFAULT_API_LAYOUT_STORAGE_KEYS,
  } = props;
  const userLanguage = useUserLanguage();
  const t = useTranslate();

  const hooks = Object.keys(pagesContents);

  return hooks.map((key) => {
    const { name: hookName, parameters, returnValue, imports } = pagesContents[key];

    const { parametersDescriptions, returnValueDescriptions } = descriptions[key][userLanguage];

    const hookNameKebabCase = kebabCase(hookName);

    const importInstructions = imports.join(`
// ${t('or')}
`);

    return (
      <React.Fragment key={`hook-api-${key}`}>
        <MarkdownElement>
          <Heading hash={hookNameKebabCase} title={`${hookName} API`} />
          <Heading title="import" hash={`${hookNameKebabCase}-import`} level="h3" />
          <HighlightedCode code={importInstructions} language="jsx" />
          {imports.length > 1 && (
            <p dangerouslySetInnerHTML={{ __html: t('api-docs.importDifference') }} />
          )}
          {Object.keys(parameters).length > 0 ? (
            <PropertiesSection
              properties={getHookApiDefinitions({
                kind: 'parameters',
                hookName,
                properties: parameters,
                translations: parametersDescriptions,
              })}
              level="h3"
              title="api-docs.parameters"
              titleHash={`${hookNameKebabCase}-parameters`}
              defaultLayout={defaultLayout}
              layoutStorageKey={layoutStorageKey.props}
            />
          ) : (
            <span>{t('api-docs.hooksNoParameters')}</span>
          )}
          <PropertiesSection
            properties={getHookApiDefinitions({
              kind: 'return',
              hookName,
              properties: returnValue,
              translations: returnValueDescriptions,
              showOptionalAbbr: true,
            })}
            level="h3"
            title="api-docs.returnValue"
            titleHash={`${hookNameKebabCase}-return-value`}
            defaultLayout={defaultLayout}
            layoutStorageKey={layoutStorageKey.props}
          />
          <br />
        </MarkdownElement>
        <svg style={{ display: 'none' }}>
          <symbol id="anchor-link-icon" viewBox="0 0 16 16">
            <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
          </symbol>
        </svg>
      </React.Fragment>
    );
  });
}
