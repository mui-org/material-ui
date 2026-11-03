import type * as React from 'react';
import type { Simplify } from '@mui/types';
import isHostComponent from '../isHostComponent';

/**
 * Type of the ownerState based on the type of an element it applies to.
 * This resolves to the provided OwnerState for React components and `undefined` for host components.
 * Falls back to `OwnerState | undefined` when the exact type can't be determined in development time.
 */
type OwnerStateWhenApplicable<ElementType extends React.ElementType, OwnerState> =
  ElementType extends React.ComponentType<any>
    ? OwnerState
    : ElementType extends keyof React.JSX.IntrinsicElements
      ? undefined
      : OwnerState | undefined;

export type AppendOwnerStateReturnType<
  ElementType extends React.ElementType,
  OtherProps,
  OwnerState,
> = Simplify<
  OtherProps & {
    ownerState: OwnerStateWhenApplicable<ElementType, OwnerState>;
  }
>;

/**
 * Appends the ownerState object to the props, merging with the existing one if necessary.
 *
 * @param elementType Type of the element that owns the `existingProps`. If the element is a DOM node or undefined, `ownerState` is not applied.
 * @param otherProps Props of the element.
 * @param ownerState
 */
function appendOwnerState<
  ElementType extends React.ElementType,
  OtherProps extends Record<string, any>,
  OwnerState,
>(
  elementType: ElementType | undefined,
  otherProps: OtherProps,
  ownerState: OwnerState,
): AppendOwnerStateReturnType<ElementType, OtherProps, OwnerState> {
  if (elementType === undefined || isHostComponent(elementType)) {
    return otherProps as AppendOwnerStateReturnType<ElementType, OtherProps, OwnerState>;
  }

  return {
    ...otherProps,
    ownerState: { ...otherProps.ownerState, ...ownerState },
  } as AppendOwnerStateReturnType<ElementType, OtherProps, OwnerState>;
}

export default appendOwnerState;
