/* eslint-disable react/no-danger */
import * as React from 'react';
import type { ComponentApiContent, PropsTranslations } from '@mui/internal-api-docs-builder';
import { kebabCase } from 'es-toolkit/string';
import { useRouter } from 'next/router';
import { useTranslate, useUserLanguage } from '../i18n';
import type { Translate } from '../i18n';
import { SectionTitle } from '../SectionTitle';
import type { SectionTitleProps } from '../SectionTitle';
import { HighlightedCode } from '../HighlightedCode';
import { MarkdownElement } from '../MarkdownDocs/MarkdownElement';
import type { LayoutStorageKeys } from './types';
import { getPropsApiDefinitions } from './definitions/properties';
import { getClassApiDefinitions } from './definitions/classes';
import { getSlotsApiDefinitions } from './definitions/slots';
import { DEFAULT_API_LAYOUT_STORAGE_KEYS } from './sections/ToggleDisplayOption';
import type { ApiDisplayLayout } from './sections/ToggleDisplayOption';
import { PropertiesSection } from './sections/PropertiesSection';
import { SlotsSection } from './sections/SlotsSection';
import { ClassesSection } from './sections/ClassesSection';

function getTranslatedHeader(t: Translate, header: string, title?: string) {
  const translations: Record<string, string> = {
    demos: t('api-docs.demos'),
    import: t('api-docs.import'),
    props: t('api-docs.props'),
    'theme-default-props': t('api-docs.themeDefaultProps'),
    inheritance: t('api-docs.inheritance'),
    slots: t('api-docs.slots'),
    classes: t('api-docs.classes'),
    css: t('api-docs.css'),
  };

  return translations[header] || (title && translations[title]) || title || header;
}

function Heading(props: SectionTitleProps) {
  const { hash, title, level = 'h2' } = props;
  const t = useTranslate();

  return <SectionTitle title={getTranslatedHeader(t, hash, title)} hash={hash} level={level} />;
}

export type ComponentsApiContentProps = {
  descriptions: {
    [component: string]: {
      [lang: string]: PropsTranslations;
    };
  };
  pageContents: { [component: string]: ComponentApiContent };
  defaultLayout?: ApiDisplayLayout;
  layoutStorageKey?: LayoutStorageKeys;
};

export function ComponentsApiContent(props: ComponentsApiContentProps) {
  const {
    descriptions,
    pageContents,
    defaultLayout = 'table',
    layoutStorageKey = DEFAULT_API_LAYOUT_STORAGE_KEYS,
  } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const router = useRouter();

  // There are legacy links where the the components had the Unstyled suffix
  // This effects makes sure that the anchors will be correct with the renames
  React.useEffect(() => {
    const anchor = router.asPath.includes('#') ? router.asPath.split('#')[1] : null;
    if (router.isReady && anchor && anchor.includes('-unstyled')) {
      router.replace(
        {
          hash: `${anchor.replace('-unstyled', '')}`,
        },
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [router]);

  const components = Object.keys(pageContents);

  return components.map((key) => {
    const pageContent = pageContents[key];
    const {
      forwardsRefTo,
      inheritance,
      name: componentName,
      props: componentProps,
      spread,
      slots: componentSlots,
      classes,
      imports,
    } = pageContent;

    const componentClasses = [...classes].sort((c1, c2) =>
      c1.className.localeCompare(c2.className),
    );

    const { classDescriptions, propDescriptions, slotDescriptions } =
      descriptions[key][userLanguage];

    const defaultPropsLink = '/material-ui/customization/theme-components/#theme-default-props';
    const slotGuideLink = '';

    // The `ref` is forwarded to the root element.
    let refHint = t('api-docs.refRootElement');
    if (forwardsRefTo == null) {
      // The component cannot hold a ref.
      refHint = t('api-docs.refNotHeld');
    }

    let spreadHint = '';
    if (spread) {
      // Any other props supplied will be provided to the root element ({{spreadHintElement}}).
      spreadHint = t('api-docs.spreadHint').replace(
        /{{spreadHintElement}}/,
        inheritance
          ? `<a href="${inheritance.pathname}">${inheritance.component}</a>`
          : t('api-docs.nativeElement'),
      );
    }

    let inheritanceSuffix = '';
    if (inheritance && inheritance.component === 'Transition') {
      inheritanceSuffix = t('api-docs.inheritanceSuffixTransition');
    }

    const componentNameKebabCase = kebabCase(componentName);

    const importInstructions = imports.join(`
// ${t('or')}
`);

    return (
      <React.Fragment key={`component-api-${key}`}>
        <MarkdownElement>
          <Heading hash={componentNameKebabCase} title={`${componentName} API`} />
          <Heading title="import" hash={`${componentNameKebabCase}-import`} level="h3" />
          <HighlightedCode code={importInstructions} language="jsx" />
          {imports.length > 1 && (
            <p dangerouslySetInnerHTML={{ __html: t('api-docs.importDifference') }} />
          )}
          <PropertiesSection
            properties={getPropsApiDefinitions({
              componentName: pageContent.name,
              properties: componentProps,
              propertiesDescriptions: propDescriptions,
            })}
            spreadHint={spreadHint}
            level="h3"
            titleHash={`${componentNameKebabCase}-props`}
            defaultLayout={defaultLayout}
            layoutStorageKey={layoutStorageKey.props}
          />
          <br />
          <div
            className="MuiCallout-root MuiCallout-info"
            dangerouslySetInnerHTML={{ __html: refHint }}
            style={{
              alignItems: 'baseline',
              gap: '4px',
              marginTop: 0,
            }}
          />
          {inheritance && (
            <React.Fragment>
              <Heading
                title="inheritance"
                hash={`${componentNameKebabCase}-inheritance`}
                level="h3"
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: t('api-docs.inheritanceDescription')
                    .replace(/{{component}}/, inheritance.component)
                    .replace(/{{pathname}}/, inheritance.pathname)
                    .replace(/{{suffix}}/, inheritanceSuffix)
                    .replace(/{{name}}/, pageContent.name),
                }}
              />
            </React.Fragment>
          )}
          {pageContent.themeDefaultProps && (
            <React.Fragment>
              <Heading
                title="theme-default-props"
                hash={`${componentName}-theme-default-props`}
                level="h4"
              />
              <div
                dangerouslySetInnerHTML={{
                  __html: t('api-docs.themeDefaultPropsDescription')
                    .replace(/{{muiName}}/, pageContent.muiName)
                    .replace(/{{defaultPropsLink}}/, defaultPropsLink),
                }}
              />
            </React.Fragment>
          )}
          <SlotsSection
            slots={getSlotsApiDefinitions({
              componentSlots,
              slotDescriptions,
              componentName,
            })}
            titleHash={`${componentNameKebabCase}-slots`}
            level="h3"
            spreadHint={
              slotGuideLink &&
              t('api-docs.slotDescription').replace(/{{slotGuideLink}}/, slotGuideLink)
            }
            defaultLayout={defaultLayout}
            layoutStorageKey={layoutStorageKey.slots}
          />
          <ClassesSection
            classes={getClassApiDefinitions({
              componentClasses,
              componentName: pageContent.name,
              classDescriptions,
            })}
            spreadHint={t('api-docs.classesDescription')}
            titleHash={`${componentNameKebabCase}-classes`}
            level="h3"
            defaultLayout={defaultLayout}
            layoutStorageKey={layoutStorageKey.classes}
          />
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
