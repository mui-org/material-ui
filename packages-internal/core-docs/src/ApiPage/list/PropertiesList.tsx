/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import { brandingDarkTheme as darkTheme, brandingLightTheme as lightTheme } from '../../branding';
import { useTranslate } from '../../i18n';
import { ApiItemContainer, ExpandableApiItem } from './ExpandableApiItem';
import type { PropertyDefinition } from '../definitions';
import { ApiWarningAlert } from '../ApiWarningAlert';

const StyledApiItem = styled(ExpandableApiItem)(
  ({ theme }) => ({
    '& .prop-list-description': {
      marginBottom: 10,
    },
    '& .prop-list-additional-info': {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      '& > p': {
        margin: 0,
      },
      '& .prop-list-title': {
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightSemiBold,
        color: (theme.vars || theme).palette.text.primary,
        paddingRight: 5,
        whiteSpace: 'nowrap',
        margin: 0,
      },
      '& .default-value': {
        fontSize: theme.typography.pxToRem(12),
      },
    },
    '&.prop-list-deprecated-item': {
      '& .MuiApi-item-note': {
        color: `var(--muidocs-palette-warning-700, ${lightTheme.palette.warning[700]})`,
      },
    },
    '& .prop-list-alert': {
      marginBottom: 16,
      '& .MuiAlert-icon': {
        margin: 0,
      },
    },
    '& .prop-list-default-props': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
    },
    '& .prop-list-signature': {
      p: {
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightSemiBold,
        marginBottom: 8,
      },
      ul: {
        paddingLeft: 24,
        marginTop: 2,
        marginBottom: 0,
      },
      '& > code': {
        borderRadius: 8,
        padding: 12,
        width: '100%',
        marginBottom: 8,
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[50]})`,
        border: '1px solid',
        borderColor: `var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,
        backgroundColor: `var(--muidocs-palette-primaryDark-800, ${lightTheme.palette.primaryDark[800]})`,
      },
    },
  }),
  ({ theme }) => ({
    [`*:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .prop-list-additional-info': {
        '& .prop-list-title': {
          p: {
            color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
          },
        },
      },
      '& .prop-list-default-props': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
      },
      '&.prop-list-deprecated-item': {
        '& .MuiApi-item-note': {
          color: `var(--muidocs-palette-warning-400, ${darkTheme.palette.warning[400]})`,
        },
      },
    },
  }),
);

function PropDescription(props: { description: string }) {
  const { description } = props;
  const isUlPresent = description.includes('<ul>');

  const ComponentToRender = isUlPresent ? 'div' : 'p';

  return (
    <ComponentToRender
      className="prop-list-description algolia-content" // This className is used by Algolia
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
}

interface PropertiesListProps {
  properties: PropertyDefinition[];
  displayOption: 'collapsed' | 'expanded';
}

export default function PropertiesList(props: PropertiesListProps) {
  const { properties, displayOption } = props;
  const t = useTranslate();
  return (
    <ApiItemContainer>
      {properties.map((params) => {
        const {
          propName,
          seeMoreDescription,
          description,
          requiresRef,
          isOptional,
          isRequired,
          isDeprecated,
          isProPlan,
          isPremiumPlan,
          deprecationInfo,
          typeName,
          propDefault,
          additionalInfo,
          signature,
          signatureArgs,
          signatureReturnDescription,
          hash,
        } = params;

        let note =
          (isOptional && t('api-docs.optional')) || (isRequired && t('api-docs.required')) || '';

        if (isDeprecated) {
          note = [note, t('api-docs.deprecated')].filter(Boolean).join(' - ');
        }

        return (
          <StyledApiItem
            key={propName}
            id={hash}
            title={
              <React.Fragment>
                {propName}
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
              </React.Fragment>
            }
            note={note}
            type="props"
            displayOption={displayOption}
            className={isDeprecated ? 'prop-list-deprecated-item' : ''}
          >
            {description && <PropDescription description={description} />}
            {seeMoreDescription && <p dangerouslySetInnerHTML={{ __html: seeMoreDescription }} />}
            {requiresRef && (
              <ApiWarningAlert className="MuiApi-collapsible prop-list-alert">
                <div
                  dangerouslySetInnerHTML={{
                    __html: t('api-docs.requires-ref'),
                  }}
                />
              </ApiWarningAlert>
            )}
            {additionalInfo?.map((key) => (
              <p
                className="prop-list-additional-description  MuiApi-collapsible"
                key={key}
                dangerouslySetInnerHTML={{
                  __html: t(`api-docs.additional-info.${key}`)!,
                }}
              />
            ))}
            <div className="prop-list-additional-info">
              {typeName && (
                <p className="prop-list-type MuiApi-collapsible">
                  <span className="prop-list-title">{t('api-docs.type')}:</span>
                  <code
                    className="Api-code"
                    dangerouslySetInnerHTML={{
                      __html: typeName,
                    }}
                  />
                </p>
              )}
              {propDefault && (
                <p className="prop-list-default-props MuiApi-collapsible">
                  <span className="prop-list-title">{t('api-docs.default')}:</span>
                  <code className="default-value">{propDefault}</code>
                </p>
              )}
              {signature && (
                <div className="prop-list-signature MuiApi-collapsible">
                  <span className="prop-list-title">{t('api-docs.signature')}:</span>
                  <div className="prop-list-content">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: signature,
                      }}
                    />
                    {signatureArgs && (
                      <div>
                        <ul>
                          {signatureArgs.map(
                            ({ argName, argDescription, argType, argTypeDescription }) => (
                              <li key={argName}>
                                <code>
                                  {argName}
                                  {argType && argTypeDescription && (
                                    <span>
                                      :{' '}
                                      <Tooltip
                                        title={
                                          <span
                                            dangerouslySetInnerHTML={{ __html: argTypeDescription }}
                                          />
                                        }
                                      >
                                        <span className="signature-type">{argType}</span>
                                      </Tooltip>
                                    </span>
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
                </div>
              )}
            </div>
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
          </StyledApiItem>
        );
      })}
    </ApiItemContainer>
  );
}
