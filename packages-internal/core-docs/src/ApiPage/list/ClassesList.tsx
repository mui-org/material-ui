import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useTranslate } from '../../i18n';
import { brandingDarkTheme as darkTheme, brandingLightTheme as lightTheme } from '../../branding';
import { ApiItemContainer, ExpandableApiItem } from './ExpandableApiItem';
import type { ClassDefinition } from '../definitions/types';
import { ApiWarningAlert } from '../ApiWarningAlert';

const StyledApiItem = styled(ExpandableApiItem)(
  ({ theme }) => ({
    '& p': {
      margin: 0,
    },
    '& .prop-list-title': {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightSemiBold,
      color: theme.palette.text.primary,
      paddingRight: 5,
      whiteSpace: 'nowrap',
      margin: 0,
    },
    '& .prop-list-class': {
      margin: 0,
    },
    '&.classes-list-deprecated-item': {
      '& .MuiApi-item-note': {
        color: `var(--muidocs-palette-warning-700, ${lightTheme.palette.warning[700]})`,
      },
    },
  }),
  ({ theme }) => ({
    [`*:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .prop-list-title': {
        color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
      },
      '&.classes-list-deprecated-item': {
        '& .MuiApi-item-note': {
          color: `var(--muidocs-palette-warning-400, ${darkTheme.palette.warning[400]})`,
        },
      },
    },
  }),
);

type ClassesListProps = {
  classes: ClassDefinition[];
  displayOption: 'collapsed' | 'expanded';
  /**
   * If `true` the the associated key in the classes object is visible.
   */
  displayClassKeys?: boolean;
};

export default function ClassesList(props: ClassesListProps) {
  const { classes, displayOption, displayClassKeys } = props;
  const t = useTranslate();

  return (
    <ApiItemContainer>
      {classes.map((classDefinition) => {
        const { hash, className, key, description, isGlobal, isDeprecated, deprecationInfo } =
          classDefinition;

        let note = isGlobal ? t('api-docs.state') : '';

        if (isDeprecated) {
          note = [note, t('api-docs.deprecated')].filter(Boolean).join(' - ');
        }

        return (
          <StyledApiItem
            id={hash}
            key={key}
            note={note}
            title={`.${className}`}
            type="classes"
            displayOption={displayOption}
            isExtendable={!!description}
            className={isDeprecated ? 'classes-list-deprecated-item' : ''}
          >
            {/* eslint-disable-next-line react/no-danger */}
            {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
            {displayClassKeys && !isGlobal && (
              <p className="prop-list-class">
                <span className="prop-list-title">{'Rule name'}:</span>
                <code className="Api-code">{key}</code>
              </p>
            )}
            {isDeprecated && (
              <ApiWarningAlert>
                <b>{t('api-docs.deprecated')}</b>
                {deprecationInfo && (
                  <React.Fragment>
                    {'－'}
                    <span
                      /* eslint-disable-next-line react/no-danger */
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
