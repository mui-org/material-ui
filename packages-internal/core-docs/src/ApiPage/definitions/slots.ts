import type { PropsTranslations, ComponentApiContent } from '@mui/internal-api-docs-builder';
import type { BaseCssTOCParams, SlotDefinition } from './types';
import type { TocItem } from '../types';

export interface GetSlotsApiDefinitionsParams {
  componentSlots: ComponentApiContent['slots'];
  slotDescriptions: PropsTranslations['slotDescriptions'];
  componentName: string;
}

export function getSlotsApiDefinitions(params: GetSlotsApiDefinitionsParams): SlotDefinition[] {
  const { componentSlots, slotDescriptions, componentName } = params;

  if (!componentSlots) {
    return [];
  }
  return componentSlots.map(({ class: className, name, default: defaultValue }) => {
    return {
      description: slotDescriptions?.[name],
      className,
      name,
      defaultValue,
      hash: `${componentName}-css-${className ?? name}`,
    };
  });
}

export const getSlotsToc = ({
  slots,
  t,
  hash,
}: BaseCssTOCParams & {
  slots: SlotDefinition[];
}): TocItem[] =>
  !slots || slots.length === 0
    ? []
    : [
        {
          text: t('api-docs.slots'),
          hash: hash ?? 'slots',
          children: [
            ...slots.map(({ name, hash: slotHash }) => ({
              text: name,
              hash: slotHash,
              children: [],
            })),
          ],
        },
      ];
