/* eslint-disable react/no-danger */
import * as React from 'react';
import type { ComponentApiContent, PropsTranslations } from '@mui/internal-api-docs-builder';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Ad, AdGuest } from '../Ad';
import type { TocItem, LayoutStorageKeys } from './types';
import { useTranslate } from '../i18n';
import type { Translate } from '../i18n';
import { HighlightedCode } from '../HighlightedCode';
import { BrandingProvider, BrandingCssVarsProvider } from '../branding';
import { SectionTitle } from '../SectionTitle';
import type { SectionTitleProps } from '../SectionTitle';
import { MarkdownElement } from '../MarkdownDocs/MarkdownElement';
import { AppLayoutDocs } from '../AppLayout';
import { getPropertiesToc, getPropsApiDefinitions } from './definitions/properties';
import { getClassesToc, getClassApiDefinitions } from './definitions/classes';
import { getSlotsApiDefinitions, getSlotsToc } from './definitions/slots';
import { DEFAULT_API_LAYOUT_STORAGE_KEYS } from './sections/ToggleDisplayOption';
import type { ApiDisplayLayout } from './sections/ToggleDisplayOption';
import { PropertiesSection } from './sections/PropertiesSection';
import { SlotsSection } from './sections/SlotsSection';
import { ClassesSection } from './sections/ClassesSection';

type ApiHeaderKeys =
  | 'demos'
  | 'import'
  | 'props'
  | 'theme-default-props'
  | 'inheritance'
  | 'slots'
  | 'classes'
  | 'css'
  | 'source-code';

export function getTranslatedHeader(t: Translate, header: ApiHeaderKeys) {
  const translations = {
    demos: t('api-docs.demos'),
    import: t('api-docs.import'),
    props: t('api-docs.props'),
    'theme-default-props': t('api-docs.themeDefaultProps'),
    inheritance: t('api-docs.inheritance'),
    slots: t('api-docs.slots'),
    classes: t('api-docs.classes'),
    css: t('api-docs.css'),
    'source-code': t('api-docs.source-code'),
  };

  // TODO Drop runtime type-checking once we type-check this file
  if (!translations.hasOwnProperty(header)) {
    throw new TypeError(
      `Unable to translate header '${header}'. Did you mean one of '${Object.keys(
        translations,
      ).join("', '")}'`,
    );
  }

  return translations[header] || header;
}

function Heading(props: Pick<SectionTitleProps<ApiHeaderKeys>, 'hash' | 'level'>) {
  const { hash, level = 'h2' } = props;
  const t = useTranslate();
  return <SectionTitle title={getTranslatedHeader(t, hash)} hash={hash} level={level} />;
}

export interface ApiPageProps {
  descriptions: PropsTranslations & {
    // Table of Content added by mapApiPageTranslation.
    componentDescriptionToc: TocItem[];
  };
  disableAd?: boolean;
  pageContent: ComponentApiContent;
  defaultLayout?: ApiDisplayLayout;
  /**
   * The localStorage key used to save the user layout for each section.
   * It's useful to save different preferences on different pages.
   * For example, the data grid has a different key than the core.
   */
  layoutStorageKey?: LayoutStorageKeys;
}

export function ApiPage(props: ApiPageProps) {
  const {
    descriptions,
    disableAd = false,
    pageContent,
    defaultLayout = 'table',
    layoutStorageKey = DEFAULT_API_LAYOUT_STORAGE_KEYS,
  } = props;
  const t = useTranslate();

  const {
    demos,
    deprecated,
    filename,
    forwardsRefTo,
    inheritance,
    props: componentProps,
    spread,
    slots: componentSlots = [],
    classes,
  } = pageContent;

  const componentClasses = Array.isArray(classes)
    ? [...classes].sort((c1, c2) => c1.className.localeCompare(c2.className))
    : [];

  const defaultPropsLink = '/material-ui/customization/theme-components/#theme-default-props';
  const styleOverridesLink = '/material-ui/customization/theme-components/#theme-style-overrides';

  const {
    componentDescription,
    componentDescriptionToc = [],
    classDescriptions,
    deprecationInfo,
    propDescriptions,
    slotDescriptions = {},
  } = descriptions;
  const description = t('api-docs.pageDescription').replace(/{{name}}/, pageContent.name);

  // Prefer linking the .tsx or .d.ts for the "Edit this page" link.
  const apiSourceLocation = filename.replace('.js', '.d.ts');

  // Merge data and translation
  const propertiesDef = getPropsApiDefinitions({
    componentName: pageContent.name,
    properties: componentProps,
    propertiesDescriptions: propDescriptions,
  });
  const classesDef = getClassApiDefinitions({
    componentClasses,
    componentName: pageContent.name,
    classDescriptions,
  });
  const slotsDef = getSlotsApiDefinitions({
    componentSlots,
    componentName: pageContent.name,
    slotDescriptions,
  });

  function createTocEntry(sectionName: ApiHeaderKeys): TocItem {
    return {
      text: getTranslatedHeader(t, sectionName),
      hash: sectionName,
      children: [
        ...(sectionName === 'props' && inheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : ([] as TocItem[])),
        ...(sectionName === 'props' && pageContent.themeDefaultProps
          ? [{ text: t('api-docs.themeDefaultProps'), hash: 'theme-default-props', children: [] }]
          : ([] as TocItem[])),
      ],
    };
  }

  const toc: TocItem[] = [
    createTocEntry('demos'),
    createTocEntry('import'),
    ...componentDescriptionToc,
    getPropertiesToc({ properties: propertiesDef, hash: 'props', t }),
    ...getSlotsToc({ slots: slotsDef, t }),
    ...getClassesToc({ classes: classesDef, t }),
    pageContent.filename ? createTocEntry('source-code') : null,
  ].filter((item): item is TocItem => Boolean(item));

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

  return (
    <BrandingCssVarsProvider>
      <AppLayoutDocs
        description={description}
        disableAd={disableAd}
        disableToc={false}
        location={apiSourceLocation}
        title={`${pageContent.name} API`}
        toc={toc}
      >
        <MarkdownElement>
          <h1>{pageContent.name} API</h1>
          {deprecated ? (
            <Alert
              severity="warning"
              icon={<WarningRoundedIcon fontSize="small" />}
              sx={{ mt: 1.5, mb: 3 }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: deprecationInfo || t('api-docs.defaultDeprecationMessage'),
                }}
              />
            </Alert>
          ) : null}
          <Typography variant="h5" component="p" className="description" gutterBottom>
            {description}
            {disableAd ? null : (
              <BrandingProvider>
                <AdGuest>
                  <Ad />
                </AdGuest>
              </BrandingProvider>
            )}
          </Typography>
          <Heading hash="demos" />
          <Alert severity="success" icon={<VerifiedRoundedIcon fontSize="small" />}>
            <div
              dangerouslySetInnerHTML={{
                __html: `<p>For examples and details on the usage of this React component, visit the component demo pages:</p>
              ${demos}`,
              }}
            />
          </Alert>
          <Heading hash="import" />
          <HighlightedCode
            code={pageContent.imports.join(`
// ${t('or')}
`)}
            language="jsx"
          />
          {pageContent.imports.length > 1 && (
            <p dangerouslySetInnerHTML={{ __html: t('api-docs.importDifference') }} />
          )}
          {componentDescription ? (
            <React.Fragment>
              <br />
              <br />
              <div
                dangerouslySetInnerHTML={{
                  __html: componentDescription,
                }}
              />
            </React.Fragment>
          ) : null}
          <PropertiesSection
            properties={propertiesDef}
            spreadHint={spreadHint}
            defaultLayout={defaultLayout}
            layoutStorageKey={layoutStorageKey.props}
          />
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
              <Heading hash="inheritance" level="h3" />
              <p
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
              <Heading hash="theme-default-props" level="h3" />
              <p
                dangerouslySetInnerHTML={{
                  __html: t('api-docs.themeDefaultPropsDescription')
                    .replace(/{{muiName}}/, pageContent.muiName)
                    .replace(/{{defaultPropsLink}}/, defaultPropsLink),
                }}
              />
            </React.Fragment>
          )}
          {/* Fallback anchor for #classes link when there's no classes section */}
          {classesDef.length === 0 && <span id="classes" />}
          <SlotsSection
            slots={slotsDef}
            defaultLayout={defaultLayout}
            layoutStorageKey={layoutStorageKey.slots}
          />
          <ClassesSection
            classes={classesDef}
            spreadHint={t('api-docs.classesDescription')}
            styleOverridesLink={styleOverridesLink}
            defaultLayout={defaultLayout}
            layoutStorageKey={layoutStorageKey.classes}
            displayClassKeys
          />

          <Heading hash="source-code" level="h2" />
          <p
            dangerouslySetInnerHTML={{
              __html: t('api-docs.seeSourceCode').replace(
                '{{href}}',
                `${process.env.SOURCE_CODE_REPO}/blob/v${process.env.LIB_VERSION}${pageContent.filename}`,
              ),
            }}
          />
        </MarkdownElement>
        <svg style={{ display: 'none' }}>
          <symbol id="anchor-link-icon" viewBox="0 0 12 6">
            <path d="M8.9176 0.083252H7.1676C6.84677 0.083252 6.58427 0.345752 6.58427 0.666585C6.58427 0.987419 6.84677 1.24992 7.1676 1.24992H8.9176C9.8801 1.24992 10.6676 2.03742 10.6676 2.99992C10.6676 3.96242 9.8801 4.74992 8.9176 4.74992H7.1676C6.84677 4.74992 6.58427 5.01242 6.58427 5.33325C6.58427 5.65409 6.84677 5.91659 7.1676 5.91659H8.9176C10.5276 5.91659 11.8343 4.60992 11.8343 2.99992C11.8343 1.38992 10.5276 0.083252 8.9176 0.083252ZM3.6676 2.99992C3.6676 3.32075 3.9301 3.58325 4.25094 3.58325H7.75094C8.07177 3.58325 8.33427 3.32075 8.33427 2.99992C8.33427 2.67909 8.07177 2.41659 7.75094 2.41659H4.25094C3.9301 2.41659 3.6676 2.67909 3.6676 2.99992ZM4.83427 4.74992H3.08427C2.12177 4.74992 1.33427 3.96242 1.33427 2.99992C1.33427 2.03742 2.12177 1.24992 3.08427 1.24992H4.83427C5.1551 1.24992 5.4176 0.987419 5.4176 0.666585C5.4176 0.345752 5.1551 0.083252 4.83427 0.083252H3.08427C1.47427 0.083252 0.167603 1.38992 0.167603 2.99992C0.167603 4.60992 1.47427 5.91659 3.08427 5.91659H4.83427C5.1551 5.91659 5.4176 5.65409 5.4176 5.33325C5.4176 5.01242 5.1551 4.74992 4.83427 4.74992Z" />
          </symbol>
        </svg>
      </AppLayoutDocs>
    </BrandingCssVarsProvider>
  );
}
