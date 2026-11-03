/* eslint-disable react/no-danger */
import * as React from 'react';
import Box from '@mui/material/Box';
import type { ComponentApiContent } from '@mui/internal-api-docs-builder';
import { useTranslate } from '../../i18n';
import { SectionTitle } from '../../SectionTitle';
import SlotsList from '../list/SlotsList';
import SlotsTable from '../table/SlotsTable';
import type { SlotDefinition } from '../definitions/types';
import { ToggleDisplayOption, useApiPageOption } from './ToggleDisplayOption';
import type { ApiDisplayLayout } from './ToggleDisplayOption';
import { getSlotsApiDefinitions } from '../definitions/slots';

export type SlotsSectionProps = (
  | {
      slots: SlotDefinition[];
      componentSlots?: undefined;
      slotDescriptions?: undefined;
      componentName?: undefined;
    }
  | {
      slots: undefined;
      componentSlots: ComponentApiContent['slots'];
      slotDescriptions: { [key: string]: string };
      componentName: string;
    }
) & {
  title?: string;
  titleHash?: string;
  level?: 'h2' | 'h3' | 'h4';
  defaultLayout: ApiDisplayLayout;
  layoutStorageKey: string;
  spreadHint?: string;
};

export function SlotsSection(props: SlotsSectionProps) {
  const {
    slots,
    componentSlots,
    slotDescriptions,
    componentName,
    title = 'api-docs.slots',
    titleHash = 'slots',
    level = 'h2',
    spreadHint,
    defaultLayout,
    layoutStorageKey,
  } = props;
  const t = useTranslate();

  const [displayOption, setDisplayOption] = useApiPageOption(layoutStorageKey, defaultLayout);

  const formattedSlots =
    slots ??
    getSlotsApiDefinitions({
      componentSlots,
      slotDescriptions,
      componentName,
    });
  if (!formattedSlots || formattedSlots.length === 0) {
    return null;
  }

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
        <SectionTitle title={t(title)} hash={titleHash} level={level} />
        <ToggleDisplayOption
          displayOption={displayOption}
          setDisplayOption={setDisplayOption}
          sectionType="slots"
        />
      </Box>
      {spreadHint && <p dangerouslySetInnerHTML={{ __html: spreadHint }} />}
      {displayOption === 'table' ? (
        <SlotsTable slots={formattedSlots} />
      ) : (
        <SlotsList slots={formattedSlots} displayOption={displayOption} />
      )}
    </React.Fragment>
  );
}
