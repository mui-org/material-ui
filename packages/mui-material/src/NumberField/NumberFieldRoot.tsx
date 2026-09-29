import * as React from 'react';
import clsx from 'clsx';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { HTMLProps } from '@base-ui/react/internals/types';
import { mergeProps } from '@base-ui/react/merge-props';

import type { NumberFieldOwnerState, NumberFieldSlotsAndSlotProps } from './NumberField.types';
import FormControl from '../FormControl';
import useSlot from '../utils/useSlot';
import useUtilityClasses from './utils/useUtilityClasses';

interface NumberFieldRootProps {
  baseProps: HTMLProps;
  baseState: BaseNumberField.Root.State;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: {
    slots: NumberFieldSlotsAndSlotProps<unknown>['slots'];
    slotProps: NumberFieldSlotsAndSlotProps<unknown>['slotProps'];
  };
}

const NumberFieldRoot = React.forwardRef(
  (props: NumberFieldRootProps, ref: React.Ref<HTMLDivElement>) => {
    const { baseProps, baseState, materialProps, externalForwardedProps } = props;
    const ownerState = {
      ...materialProps,
      ...baseState,
    };
    const classes = useUtilityClasses(ownerState);

    const [RootSlot, rootProps] = useSlot('root', {
      elementType: FormControl,
      externalForwardedProps,
      ownerState,
      className: clsx(classes.root, materialProps.className),
      ref,
      getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
      additionalProps: {
        color: materialProps.color,
        error: materialProps.error,
        fullWidth: materialProps.fullWidth,
        size: materialProps.size,
        variant: materialProps.variant,
      },
    });

    return <RootSlot {...rootProps} />;
  },
);

export default NumberFieldRoot;
