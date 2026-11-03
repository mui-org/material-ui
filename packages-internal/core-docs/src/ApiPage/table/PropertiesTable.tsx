/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { useTranslate } from '../../i18n';
import { brandingDarkTheme as darkTheme, brandingLightTheme as lightTheme } from '../../branding';
import type { PropertyDefinition } from '../definitions/types';
import { StyledTableContainer } from './StyledTableContainer';
import { ApiWarningAlert } from '../ApiWarningAlert';

const StyledTable = styled('table')(
  ({ theme }) => ({
    // Override docs/src/modules/components/MarkdownElement styles
    '&&': {
      display: 'table',
      width: '100%',
    },
    '& .type-column': {
      minWidth: '20%',
    },
    '& .default-column': {
      minWidth: '20%',
    },
    '& .MuiApi-table-item-title': {
      minWidth: '20%',
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .MuiApi-table-item-type': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      padding: '1px 4px',
      borderRadius: 6,
      border: '1px solid',
      borderColor: alpha(darkTheme.palette.primary[100], 0.8),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
    },
    '& .MuiApi-table-item-signature-type': {
      textDecoration: 'underline',
      textDecorationStyle: 'dotted',
      textDecorationColor: alpha(lightTheme.palette.primary.main, 0.4),
      fontWeight: theme.typography.fontWeightMedium,
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
      '&:hover': {
        textDecorationColor: 'inherit',
      },
      cursor: 'help',
    },
    '& .MuiApi-table-item-default': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      padding: '1px 4px',
      borderRadius: 6,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
      backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
    },
    '& .MuiPropTable-description-column': {
      width: '40%',
      paddingRight: 8,
      '& .prop-table-description': {
        marginBottom: 0,
      },
      '& .prop-table-additional-description': {
        marginTop: 12,
        marginBottom: 0,
      },
      '& .prop-table-alert': {
        '& .MuiAlert-icon': {
          margin: 0,
        },
      },
    },
    '& .prop-table-signature': {
      marginTop: 12,
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      '& .prop-table-title': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  }),
  ({ theme }) => ({
    [`*:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiApi-table-item-title': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
      '& .MuiApi-table-item-type': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.3),
      },
      '& .MuiApi-table-item-signature-type': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
        textDecorationColor: alpha(darkTheme.palette.primary.main, 0.6),
      },
      '& .MuiApi-table-item-default': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        backgroundColor: `var(--muidocs-palette-grey-900, ${darkTheme.palette.grey[900]})`,
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
      '& .prop-table-signature': {
        '& .prop-table-title': {
          color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        },
      },
    },
  }),
);

function PropDescription({ description }: { description: string }) {
  const isUlPresent = description.includes('<ul>');

  const ComponentToRender = isUlPresent ? 'div' : 'p';

  return (
    <ComponentToRender
      className="prop-table-description" // This className is used by Algolia
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
}

interface PropertiesTableProps {
  properties: PropertyDefinition[];
}

export default function PropertiesTable(props: PropertiesTableProps) {
  const { properties } = props;

  const hasDefaultColumn = properties.some((item) => item.propDefault !== undefined);

  const t = useTranslate();
  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>{'Name'}</th>
            <th>{'Type'}</th>
            {hasDefaultColumn && <th>{'Default'}</th>}
            <th>{'Description'}</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((params) => {
            const {
              propName,
              description,
              seeMoreDescription,
              requiresRef,
              isOptional,
              isRequired,
              isProPlan,
              isPremiumPlan,
              isDeprecated,
              deprecationInfo,
              typeName,
              propDefault,
              additionalInfo,
              signature,
              signatureArgs,
              signatureReturnDescription,
              hash,
            } = params;

            return (
              <tr key={propName} id={hash}>
                <td className="MuiApi-table-item-title algolia-lvl3">
                  {propName}
                  {isRequired ? '*' : ''}
                  {isOptional ? '?' : ''}
                  {isProPlan && (
                    <a href="/x/introduction/licensing/#pro-plan" aria-label="Pro plan">
                      <span className="plan-pro" />
                    </a>
                  )}
                  {isPremiumPlan && (
                    <a href="/x/introduction/licensing/#premium-plan" aria-label="Premium plan">
                      <span className="plan-premium" />
                    </a>
                  )}
                </td>
                <td className="type-column">
                  {
                    <span
                      className="MuiApi-table-item-type"
                      dangerouslySetInnerHTML={{
                        __html: typeName,
                      }}
                    />
                  }
                </td>
                {hasDefaultColumn && (
                  <td className="default-column">
                    {propDefault ? (
                      <span className="MuiApi-table-item-default">{propDefault}</span>
                    ) : (
                      '-'
                    )}
                  </td>
                )}
                <td className="MuiPropTable-description-column algolia-content">
                  {description && <PropDescription description={description} />}
                  {seeMoreDescription && (
                    <p
                      dangerouslySetInnerHTML={{ __html: seeMoreDescription }}
                      className="prop-table-additional-description"
                    />
                  )}
                  {additionalInfo?.map((key) => (
                    <p
                      className="prop-table-additional-description"
                      key={key}
                      dangerouslySetInnerHTML={{
                        __html: t(`api-docs.additional-info.${key}`),
                      }}
                    />
                  ))}
                  {requiresRef && (
                    <ApiWarningAlert className="prop-table-alert">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: t('api-docs.requires-ref'),
                        }}
                      />
                    </ApiWarningAlert>
                  )}
                  {isDeprecated && (
                    <ApiWarningAlert>
                      <b>{t('api-docs.deprecated')}</b>
                      {deprecationInfo && (
                        <React.Fragment>
                          {'－'}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: deprecationInfo,
                            }}
                          />
                        </React.Fragment>
                      )}
                    </ApiWarningAlert>
                  )}
                  {signature && (
                    <div className="prop-table-signature">
                      <span className="prop-table-title">{t('api-docs.signature')}:</span>
                      <code>{signature}</code>
                      {signatureArgs && (
                        <div>
                          <ul>
                            {signatureArgs.map(
                              ({ argName, argDescription, argType, argTypeDescription }) => (
                                <li className="prop-signature-list" key={argName}>
                                  <code>
                                    {argName}
                                    {argType && argTypeDescription && (
                                      <Tooltip
                                        title={
                                          <span
                                            dangerouslySetInnerHTML={{ __html: argTypeDescription }}
                                          />
                                        }
                                      >
                                        <span>
                                          :{' '}
                                          <span className="MuiApi-table-item-signature-type">
                                            {argType}
                                          </span>
                                        </span>
                                      </Tooltip>
                                    )}
                                  </code>{' '}
                                  {argDescription && (
                                    <span dangerouslySetInnerHTML={{ __html: argDescription }} />
                                  )}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                      {signatureReturnDescription && (
                        <p>
                          {t('api-docs.returns')}
                          <span
                            dangerouslySetInnerHTML={{
                              __html: signatureReturnDescription,
                            }}
                          />
                        </p>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
}
