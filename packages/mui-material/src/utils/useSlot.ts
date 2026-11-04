'use client';
import type * as React from 'react';
import type { ClassValue } from 'clsx';
import useForkRef from '@mui/utils/useForkRef';
import appendOwnerState from '@mui/utils/appendOwnerState';
import resolveComponentProps from '@mui/utils/resolveComponentProps';
import mergeSlotProps from '@mui/utils/mergeSlotProps';

export type WithCommonProps<T> = T & {
  className?: string | undefined;
  style?: React.CSSProperties | undefined;
  ref?: React.Ref<any> | undefined;
};

type EventHandlers = Record<string, React.EventHandler<any>>;

type ExtractComponentProps<P> = P extends infer T | ((ownerState: any) => infer T) ? T : never;

/**
 * An internal function to create a Material UI slot.
 *
 * This is an advanced version of Base UI `useSlotProps` because Material UI allows leaf component to be customized via `component` prop
 * while Base UI does not need to support leaf component customization.
 *
 * @param {string} name: name of the slot
 * @param {object} parameters
 * @returns {[Slot, slotProps]} The slot's React component and the slot's props
 *
 * Note: the returned slot's props
 * - will never contain `component` prop.
 * - might contain `as` prop.
 */
export default function useSlot<
  T extends string,
  ElementType extends React.ElementType,
  SlotProps,
  OwnerState extends {},
  ExternalSlotProps extends {
    component?: React.ElementType | undefined;
    ref?: React.Ref<any> | undefined;
  },
  ExternalForwardedProps extends {
    component?: React.ElementType | undefined;
    slots?: { [k in T]?: React.ElementType } | undefined;
    slotProps?:
      | {
          [k in T]?: ExternalSlotProps | ((ownerState: OwnerState) => ExternalSlotProps);
        }
      | undefined;
  },
  AdditionalProps,
  SlotOwnerState extends {},
>(
  /**
   * The slot's name. All Material UI components should have `root` slot.
   *
   * If the name is `root`, the logic behaves differently from other slots,
   * e.g. the `externalForwardedProps` are spread to `root` slot but not other slots.
   */
  name: T,
  parameters: (T extends 'root' // root slot must pass a `ref` as a parameter
    ? { ref: React.ForwardedRef<any> }
    : { ref?: React.ForwardedRef<any> | undefined }) & {
    /**
     * The slot's className
     */
    className: ClassValue | ClassValue[];
    /**
     * The slot's default styled-component
     */
    elementType: ElementType;
    /**
     * The component's ownerState
     */
    ownerState: OwnerState;
    /**
     * The `other` props from the consumer. It has to contain `component`, `slots`, and `slotProps`.
     * The function will use those props to calculate the final rendered element and the returned props.
     *
     * If the slot is not `root`, the rest of the `externalForwardedProps` are neglected.
     */
    externalForwardedProps: ExternalForwardedProps;
    getSlotProps?: ((other: EventHandlers) => WithCommonProps<SlotProps>) | undefined;
    additionalProps?: WithCommonProps<AdditionalProps> | undefined;
    /**
     * props forward to `T` only if the `slotProps.*.component` is not provided.
     * e.g. Autocomplete's listbox uses Popper + StyledComponent
     */
    internalForwardedProps?: any;
    /**
     * Set to true if the `elementType` is a styled component of another Material UI component.
     *
     * For example, the AlertRoot is a styled component of the Paper component.
     * This flag is used to forward the `component` and `slotProps.root.component` to the Paper component.
     * Otherwise, the `component` prop will be converted to `as` prop which replaces the Paper component (the paper styles are gone).
     */
    shouldForwardComponentProp?: boolean | undefined;
  },
) {
  const {
    className,
    elementType: initialElementType,
    ownerState,
    externalForwardedProps,
    internalForwardedProps,
    shouldForwardComponentProp = false,
    ...useSlotPropsParams
  } = parameters;
  const {
    component: rootComponent,
    slots = { [name]: undefined },
    slotProps = { [name]: undefined },
    ...other
  } = externalForwardedProps;

  const elementType = slots[name] || initialElementType;

  // `slotProps[name]` can be a callback that receives the component's ownerState.
  // `resolvedComponentsProps` is always a plain object.
  const resolvedComponentsProps = resolveComponentProps(slotProps[name], ownerState);

  const {
    props: { component: slotComponent, ...mergedProps },
    internalRef,
  } = mergeSlotProps({
    className,
    ...useSlotPropsParams,
    externalForwardedProps: name === 'root' ? other : undefined,
    externalSlotProps: resolvedComponentsProps,
  });

  const ref = useForkRef(internalRef, resolvedComponentsProps?.ref, parameters.ref);

  const LeafComponent = (name === 'root' ? slotComponent || rootComponent : slotComponent) as
    React.ElementType | undefined;

  const props = appendOwnerState(
    elementType,
    {
      ...(name === 'root' && !rootComponent && !slots[name] && internalForwardedProps),
      ...(name !== 'root' && !slots[name] && internalForwardedProps),
      ...mergedProps,
      ...(LeafComponent &&
        !shouldForwardComponentProp && {
          as: LeafComponent,
        }),
      ...(LeafComponent &&
        shouldForwardComponentProp && {
          component: LeafComponent,
        }),
      ref,
    },
    ownerState,
  );

  return [elementType, props] as [
    ElementType,
    {
      className: string;
      ownerState: OwnerState & SlotOwnerState;
    } & AdditionalProps &
      SlotProps &
      ExternalSlotProps &
      ExtractComponentProps<
        Exclude<Exclude<ExternalForwardedProps['slotProps'], undefined>[T], undefined>
      >,
  ];
}
