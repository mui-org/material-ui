/* eslint-disable react/no-danger */
import * as React from 'react';
import Box from '@mui/material/Box';
import type { PropsTableItem, PropsTranslations } from '@mui/internal-api-docs-builder';
import { useTranslate } from '../../i18n';
import { ToggleDisplayOption, useApiPageOption } from './ToggleDisplayOption';
import type { ApiDisplayLayout } from './ToggleDisplayOption';
import { SectionTitle } from '../../SectionTitle';
import type { SectionTitleProps } from '../../SectionTitle';
import PropertiesTable from '../table/PropertiesTable';
import PropertiesList from '../list/PropertiesList';
import { getPropsApiDefinitions } from '../definitions/properties';
import type { LayoutStorageKeys } from '../types';
import type { PropertyDefinition } from '../definitions';

type PropertiesSectionProps = (
  | {
      properties: {
        // isProPlan and isPremiumPlan are added for the MUI X interface documentation.
        [name: string]: PropsTableItem & { isProPlan?: true; isPremiumPlan?: true };
      };
      propertiesDescriptions: PropsTranslations['propDescriptions'];
      componentName: string;
      /**
       * Add indicators that the properties is optional instead of showing it is required.
       */
      showOptionalAbbr?: boolean;
    }
  | {
      showOptionalAbbr?: undefined;
      properties: PropertyDefinition[];
      propertiesDescriptions?: undefined;
      componentName?: undefined;
    }
) & {
  spreadHint?: string;
  defaultLayout: ApiDisplayLayout;
  layoutStorageKey: LayoutStorageKeys['props'];
  /**
   * The translation key of the section title.
   * @default 'api-docs.props'
   */
  title?: string;
  /**
   * The hash linking to the section title.
   * @default 'props'
   */
  titleHash?: SectionTitleProps['hash'];
  /**
   * The title level of the section.
   * @default 'h2'
   */
  level?: SectionTitleProps['level'];
};

export function PropertiesSection(props: PropertiesSectionProps) {
  const {
    properties,
    propertiesDescriptions,
    componentName,
    title = 'api-docs.props',
    titleHash = 'props',
    level = 'h2',
    spreadHint,
    defaultLayout,
    layoutStorageKey,
    showOptionalAbbr,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(layoutStorageKey, defaultLayout);

  const formattedProperties = Array.isArray(properties)
    ? properties
    : getPropsApiDefinitions({
        properties,
        propertiesDescriptions: propertiesDescriptions!,
        componentName: componentName!,
        showOptionalAbbr,
      });

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <SectionTitle title={t(title)} hash={titleHash} level={level} />
        <ToggleDisplayOption
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
          sectionType="props"
        />
      </Box>
      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}
      {displayOption === 'table' ? (
        <PropertiesTable properties={formattedProperties} />
      ) : (
        <PropertiesList properties={formattedProperties} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
