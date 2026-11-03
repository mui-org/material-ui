/* eslint-disable react/no-danger */
import * as React from 'react';
import Box from '@mui/material/Box';
import type { PropsTranslations, ComponentClassDefinition } from '@mui/internal-api-docs-builder';
import { SectionTitle } from '../../SectionTitle';
import { useTranslate } from '../../i18n';
import type { ClassDefinition } from '../definitions/types';
import { ToggleDisplayOption, useApiPageOption } from './ToggleDisplayOption';
import type { ApiDisplayLayout } from './ToggleDisplayOption';
import { getClassApiDefinitions } from '../definitions/classes';
import ClassesTable from '../table/ClassesTable';
import ClassesList from '../list/ClassesList';

export type ClassesSectionProps = (
  | {
      classes: ClassDefinition[];
      componentClasses?: undefined;
      classDescriptions?: undefined;
      componentName?: undefined;
    }
  | {
      classes: undefined;
      componentClasses: ComponentClassDefinition[];
      classDescriptions: PropsTranslations['classDescriptions'];
      componentName: string;
    }
) & {
  spreadHint?: string;
  /**
   * The translation key of the section title.
   * @default 'api-docs.classes'
   */
  title?: string;
  /**
   * @default 'classes'
   */
  titleHash?: string;
  /**
   * @default 'h2'
   */
  level?: 'h2' | 'h3' | 'h4';
  defaultLayout: ApiDisplayLayout;
  layoutStorageKey: string;
  displayClassKeys?: boolean;
  styleOverridesLink?: string;
};

export function ClassesSection(props: ClassesSectionProps) {
  const {
    classes,
    componentClasses,
    classDescriptions,
    componentName,
    spreadHint,
    title = 'api-docs.classes',
    titleHash = 'classes',
    level = 'h2',
    displayClassKeys,
    styleOverridesLink,
    defaultLayout,
    layoutStorageKey,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(layoutStorageKey, defaultLayout);

  const formattedClasses =
    classes ||
    getClassApiDefinitions({
      componentClasses,
      classDescriptions,
      componentName,
    });
  if (!formattedClasses || formattedClasses.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <SectionTitle title={t(title)} hash={titleHash} level={level} />
        <ToggleDisplayOption
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
          sectionType="classes"
        />
      </Box>
      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}
      {displayOption === 'table' ? (
        <ClassesTable classes={formattedClasses} displayClassKeys={displayClassKeys} />
      ) : (
        <ClassesList
          classes={formattedClasses}
          displayOption={displayOption}
          displayClassKeys={displayClassKeys}
        />
      )}
      {styleOverridesLink && (
        <React.Fragment>
          <br />
          <p dangerouslySetInnerHTML={{ __html: t('api-docs.overrideStyles') }} />
          <div
            dangerouslySetInnerHTML={{
              __html: t('api-docs.overrideStylesStyledComponent').replace(
                /{{styleOverridesLink}}/,
                styleOverridesLink,
              ),
            }}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
