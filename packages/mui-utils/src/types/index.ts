import type * as React from 'react';
import type { WithDataAttributes } from './DataAttributes';

// Re-export only what consumers need: `DataAttributesOverrides` to augment and
// `WithDataAttributes` for typing custom slot props. `DataAttributes` stays
// internal — it is a bare alias of `DataAttributesOverrides` with no behavior.
export type { DataAttributesOverrides, WithDataAttributes } from './DataAttributes';

export type EventHandlers = Record<string, React.EventHandler<any>>;

export type WithOptionalOwnerState<Props extends { ownerState: unknown }> = Omit<
  Props,
  'ownerState'
> &
  Partial<Pick<Props, 'ownerState'>>;

export type SlotComponentProps<TSlotComponent extends React.ElementType, TOverrides, TOwnerState> =
  | WithDataAttributes<Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides>
  | ((
      ownerState: TOwnerState,
    ) => WithDataAttributes<Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides>);

export type SlotComponentPropsWithSlotState<
  TSlotComponent extends React.ElementType,
  TOverrides,
  TOwnerState,
  TSlotState,
> =
  | WithDataAttributes<Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides>
  | ((
      ownerState: TOwnerState,
      slotState: TSlotState,
    ) => WithDataAttributes<Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides>);
