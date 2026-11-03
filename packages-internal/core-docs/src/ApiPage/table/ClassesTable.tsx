/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { brandingDarkTheme as darkTheme, brandingLightTheme as lightTheme } from '../../branding';
import { useTranslate } from '../../i18n';
import { StyledTableContainer } from './StyledTableContainer';
import type { ClassDefinition } from '../definitions/types';
import { ApiWarningAlert } from '../ApiWarningAlert';

const StyledTable = styled('table')(
  ({ theme }) => ({
    textAlign: 'left',
    // Override docs/src/modules/components/MarkdownElement styles
    '&&': {
      display: 'table',
      width: '100%',
    },
    '& .class-name': {
      flexShrink: 0,
      fontWeight: theme.typography.fontWeightSemiBold,
      fontFamily: theme.typography.fontFamilyCode,
      fontSize: theme.typography.pxToRem(13),
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
    },
    '& .class-key': {
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
  }),
  ({ theme }) => ({
    [`*:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .class-name': {
        color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
      },
      '& .class-key': {
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
        borderColor: alpha(darkTheme.palette.primary[400], 0.1),
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.4),
      },
    },
  }),
);

interface ClassesTableProps {
  classes: ClassDefinition[];
  displayClassKeys?: boolean;
}

export default function ClassesTable(props: ClassesTableProps) {
  const { classes, displayClassKeys } = props;
  const t = useTranslate();

  return (
    <StyledTableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>{'Class name'}</th>
            {displayClassKeys && <th>{'Rule name'}</th>}
            <th>{'Description'}</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((params) => {
            const { className, hash, key, description, isGlobal, isDeprecated, deprecationInfo } =
              params;

            return (
              <tr key={className} id={hash}>
                <td className="algolia-lvl3">
                  <span className="class-name">.{className}</span>
                </td>
                {displayClassKeys && (
                  <td>{!isGlobal && <span className="class-key">{key}</span>}</td>
                )}
                <td className="algolia-content">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: description || '',
                    }}
                  />
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </StyledTableContainer>
  );
}
