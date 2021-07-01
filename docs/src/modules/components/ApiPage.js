/* eslint-disable material-ui/no-hardcoded-labels, react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { exactProp } from '@material-ui/utils';
import { styled } from '@material-ui/core/styles';
import Alert from '@material-ui/core/Alert';
import Typography from '@material-ui/core/Typography';
import { useTranslate, useUserLanguage } from 'docs/src/modules/utils/i18n';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';

const Asterisk = styled('abbr')(({ theme }) => ({ color: theme.palette.error.main }));

function PropsTable(props) {
  const { componentProps, propDescriptions } = props;
  const t = useTranslate();

  return (
    <table>
      <thead>
        <tr>
          <th align="left">{t('api-docs.name')}</th>
          <th align="left">{t('api-docs.type')}</th>
          <th align="left">{t('api-docs.default')}</th>
          <th align="left">{t('api-docs.description')}</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(componentProps).map(([propName, propData]) => {
          const typeDescription = propData.type.description || propData.type.name;
          const propDefault = propData.default || (propData.type.name === 'bool' && 'false');
          return (
            propData.description !== '@ignore' && (
              <tr key={propName}>
                <td align="left">
                  <span className={clsx('prop-name', propData.required ? 'required' : null)}>
                    {propName}
                    {propData.required && (
                      <sup>
                        <Asterisk title="required">*</Asterisk>
                      </sup>
                    )}
                  </span>
                </td>
                <td align="left">
                  <span
                    className="prop-type"
                    dangerouslySetInnerHTML={{ __html: typeDescription }}
                  />
                </td>
                <td align="left">
                  {propDefault && <span className="prop-default">{propDefault}</span>}
                </td>
                <td align="left">
                  {propData.deprecated && (
                    <Alert severity="warning" sx={{ mb: 1, py: 0 }}>
                      <strong>Deprecated</strong>
                      {propData.deprecationInfo && ' - '}
                      {propData.deprecationInfo && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: propData.deprecationInfo,
                          }}
                        />
                      )}
                    </Alert>
                  )}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: propDescriptions[propName] || '',
                    }}
                  />
                </td>
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
}

PropsTable.propTypes = {
  componentProps: PropTypes.object.isRequired,
  propDescriptions: PropTypes.object.isRequired,
};

function ClassesTable(props) {
  const { componentName, componentStyles, classDescriptions } = props;
  const t = useTranslate();

  return (
    <table>
      <thead>
        <tr>
          <th align="left">{t('api-docs.ruleName')}</th>
          <th align="left">{t('api-docs.globalClass')}</th>
          <th align="left">{t('api-docs.description')}</th>
        </tr>
      </thead>
      <tbody>
        {componentStyles.classes.map((className) => (
          <tr key={className}>
            <td align="left">
              <span className="prop-name">{className}</span>
            </td>
            <td align="left">
              <span className="prop-name">
                .{componentStyles.globalClasses[className] || `Mui${componentName}-${className}`}
              </span>
            </td>
            <td
              align="left"
              dangerouslySetInnerHTML={{
                __html:
                  classDescriptions[className] &&
                  classDescriptions[className].description
                    .replace(/{{conditions}}/, classDescriptions[className].conditions)
                    .replace(/{{nodeName}}/, classDescriptions[className].nodeName),
              }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}

ClassesTable.propTypes = {
  classDescriptions: PropTypes.object.isRequired,
  componentName: PropTypes.string.isRequired,
  componentStyles: PropTypes.object.isRequired,
};

function getTranslatedHeader(t, header) {
  const translations = {
    import: t('api-docs.import'),
    'component-name': t('api-docs.componentName'),
    props: t('api-docs.props'),
    inheritance: t('api-docs.inheritance'),
    demos: t('api-docs.demos'),
    css: 'CSS',
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

function Heading(props) {
  const { hash, level: Level = 'h2' } = props;
  const t = useTranslate();
  const headingId = `heading-${hash}`;

  return (
    <Level id={headingId}>
      <span className="anchor-link" id={hash} />
      {getTranslatedHeader(t, hash)}
      <a aria-labelledby={headingId} className="anchor-link-style" href={`#${hash}`} tabIndex={-1}>
        <svg>
          <use xlinkHref="#anchor-link-icon" />
        </svg>
      </a>
    </Level>
  );
}

Heading.propTypes = {
  hash: PropTypes.string.isRequired,
  level: PropTypes.string,
};

function ApiDocs(props) {
  const { descriptions, pageContent } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();

  const {
    cssComponent,
    demos,
    filename,
    forwardsRefTo,
    inheritance,
    name: componentName,
    props: componentProps,
    spread,
    // TODO: Drop once migration to emotion is complete since this will always be true.
    styledComponent,
    styles: componentStyles,
  } = pageContent;

  const {
    componentDescription,
    componentDescriptionToc = [],
    classDescriptions,
    propDescriptions,
  } = descriptions[userLanguage];
  const description = t('api-docs.pageDescription').replace(/{{name}}/, componentName);

  const source = filename
    .replace(
      /\/packages\/material-ui(-(.+?))?\/src/,
      (match, dash, pkg) => `@material-ui/${pkg || 'core'}`,
    )
    // convert things like `/Table/Table.js` to ``
    .replace(/\/([^/]+)\/\1\.(js|tsx)$/, '');

  function createTocEntry(sectionName) {
    return {
      text: getTranslatedHeader(t, sectionName),
      hash: sectionName,
      children: [
        ...(sectionName === 'props' && inheritance
          ? [{ text: t('api-docs.inheritance'), hash: 'inheritance', children: [] }]
          : []),
      ],
    };
  }

  const toc = [
    createTocEntry('import'),
    ...componentDescriptionToc,
    componentStyles.name && createTocEntry('component-name'),
    createTocEntry('props'),
    componentStyles.classes && createTocEntry('css'),
    createTocEntry('demos'),
  ].filter(Boolean);

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
    <AppLayoutDocs
      description={description}
      disableAd={false}
      disableToc={false}
      location={filename}
      title={`${componentName} API – Material-UI`}
      toc={toc}
    >
      <MarkdownElement>
        <h1>{componentName} API</h1>
        <Typography variant="h5" component="p" className="description" gutterBottom>
          {description}
        </Typography>
        <Heading hash="import" />
        <HighlightedCode
          code={`
import ${componentName} from '${source}/${componentName}';
// ${t('or')}
import { ${componentName} } from '${source}';`}
          language="jsx"
        />
        <span dangerouslySetInnerHTML={{ __html: t('api-docs.importDifference') }} />
        {componentDescription ? (
          <React.Fragment>
            <br />
            <br />
            <span dangerouslySetInnerHTML={{ __html: componentDescription }} />
          </React.Fragment>
        ) : null}
        {componentStyles.name && (
          <React.Fragment>
            <Heading hash="component-name" />
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.styleOverrides').replace(
                  /{{componentStyles\.name}}/,
                  componentStyles.name,
                ),
              }}
            />
          </React.Fragment>
        )}
        <Heading hash="props" />
        <p dangerouslySetInnerHTML={{ __html: spreadHint }} />
        <PropsTable componentProps={componentProps} propDescriptions={propDescriptions} />
        <br />
        {cssComponent && (
          <React.Fragment>
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.cssComponent').replace(/{{name}}/, componentName),
              }}
            />
            <br />
            <br />
          </React.Fragment>
        )}
        <span dangerouslySetInnerHTML={{ __html: refHint }} />
        {inheritance && (
          <React.Fragment>
            <Heading hash="inheritance" level="h3" />
            <span
              dangerouslySetInnerHTML={{
                __html: t('api-docs.inheritanceDescription')
                  .replace(/{{component}}/, inheritance.component)
                  .replace(/{{pathname}}/, inheritance.pathname)
                  .replace(/{{suffix}}/, inheritanceSuffix)
                  .replace(/{{componentName}}/, componentName),
              }}
            />
          </React.Fragment>
        )}
        {Object.keys(componentStyles.classes).length ? (
          <React.Fragment>
            <Heading hash="css" />
            <ClassesTable
              componentName={componentName}
              componentStyles={componentStyles}
              classDescriptions={classDescriptions}
            />
            <br />
            <span dangerouslySetInnerHTML={{ __html: t('api-docs.overrideStyles') }} />
            {styledComponent ? (
              <span
                dangerouslySetInnerHTML={{ __html: t('api-docs.overrideStylesStyledComponent') }}
              />
            ) : (
              <span
                dangerouslySetInnerHTML={{
                  __html: t('api-docs.overrideStylesJss').replace(
                    /{{URL}}/,
                    `${process.env.SOURCE_CODE_ROOT_URL}${filename}`,
                  ),
                }}
              />
            )}
          </React.Fragment>
        ) : null}
        <Heading hash="demos" />
        <span dangerouslySetInnerHTML={{ __html: demos }} />
      </MarkdownElement>
      <svg style={{ display: 'none' }} xmlns="http://www.w3.org/2000/svg">
        <symbol id="anchor-link-icon" viewBox="0 0 16 16">
          <path d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z" />
        </symbol>
      </svg>
    </AppLayoutDocs>
  );
}

ApiDocs.propTypes = {
  descriptions: PropTypes.object.isRequired,
  pageContent: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  ApiDocs.propTypes = exactProp(ApiDocs.propTypes);
}

export default ApiDocs;
