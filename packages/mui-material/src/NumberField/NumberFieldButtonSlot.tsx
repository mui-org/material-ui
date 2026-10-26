import * as React from 'react';

import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import appendOwnerState from '@mui/utils/appendOwnerState';

import type { NumberFieldOwnerState } from './NumberField.types';
import { useForkRef } from '../utils';
import type { IconButtonProps } from '../IconButton';

interface NumberFieldButtonProps {
  ButtonSlot: React.ElementType;
  buttonProps: IconButtonProps;
  baseProps: React.ComponentPropsWithRef<'button'>;
  baseState: BaseNumberField.Decrement.State | BaseNumberField.Increment.State;
  materialProps: NumberFieldOwnerState;
}

/**
 * @ignore - internal component.
 *
 * Renders an increment/decrement button slot for the NumberField component, merging Base and Material props.
 */
const NumberFieldButtonSlot = React.forwardRef<HTMLButtonElement, NumberFieldButtonProps>(
  (props: NumberFieldButtonProps, forwardedRef) => {
    const { ButtonSlot, baseProps, baseState, materialProps, buttonProps } = props;

    // mergeProps composes handlers, classes, and styles, but not refs.
    const ref = useForkRef(baseProps.ref, buttonProps.ref, forwardedRef);

    // Material should also display read-only controls as unavailable.
    const disabled = baseState.disabled || baseState.readOnly;

    // Unset consumer handlers must preserve Base UI's internal handlers.
    const consumerButtonProps = Object.fromEntries(
      Object.entries(buttonProps).filter(
        ([key, value]) => !(/^on[A-Z]/.test(key) && value == null),
      ),
    );

    const mergedProps = appendOwnerState(
      ButtonSlot,
      {
        // Consumer handlers run first and can prevent Base's behavior.
        ...mergeProps(baseProps, consumerButtonProps),
        // Preserve Base's resolved availability after consumer props.
        disabled,
        ref,
      },
      {
        ...materialProps,
        disabled,
        readOnly: baseState.readOnly,
      },
    );

    return <ButtonSlot {...mergedProps} />;
  },
);

export default NumberFieldButtonSlot;
