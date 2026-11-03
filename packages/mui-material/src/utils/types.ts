import type { SxProps } from '@mui/system';
import type { SlotComponentProps } from '@mui/utils/types';
import type { Theme } from '../styles';

export type {
  EventHandlers,
  WithOptionalOwnerState,
  SlotComponentProps,
  SlotComponentPropsWithSlotState,
  // Augment `DataAttributesOverrides` to opt in to typed `data-*` attributes on slot props.
  DataAttributesOverrides,
  WithDataAttributes,
} from '@mui/utils/types';

export type SlotCommonProps = {
  component?: React.ElementType | undefined;
  sx?: SxProps<Theme> | undefined;
};

export type SlotProps<
  TSlotComponent extends React.ElementType,
  TOverrides,
  TOwnerState,
> = SlotComponentProps<TSlotComponent, SlotCommonProps & TOverrides, TOwnerState>;

/**
 * Use the keys of `Slots` to make sure that K contains all of the keys
 *
 * @example CreateSlotsAndSlotProps<{ root: React.ElementType, decorator: React.ElementType }, { root: ..., decorator: ... }>
 */
export type CreateSlotsAndSlotProps<Slots, K extends Record<keyof Slots, any>> = {
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: Partial<Slots> | undefined;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?:
    | {
        [P in keyof K]?: K[P];
      }
    | undefined;
};
