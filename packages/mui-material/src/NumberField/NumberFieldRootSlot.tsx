import * as React from 'react';
import clsx from 'clsx';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import type { HTMLProps } from '@base-ui/react/types';
import { mergeProps } from '@base-ui/react/merge-props';

import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import FormControl from '../FormControl';
import useSlot from '../utils/useSlot';
import useUtilityClasses from './utils/useUtilityClasses';
import { styled } from '../styles';
import InputLabel from '../InputLabel';
import type { InputLabelProps } from '../InputLabel';
import FormHelperText from '../FormHelperText';

interface NumberFieldRootProps {
  baseProps: HTMLProps;
  baseState: BaseNumberField.Root.State;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: Pick<NumberFieldProps, 'slots' | 'slotProps'>;
}

const NumberFieldRoot = styled(FormControl, {
  name: 'MuiNumberField',
  slot: 'Root',
})({});

// This component is a placeholder for FormControl to correctly set the shrink label state on SSR.
function SSRInitialFilled(_: { value: string }) {
  return null;
}
SSRInitialFilled.muiName = 'Input';

const NumberFieldRootSlot = React.forwardRef(
  (props: NumberFieldRootProps, ref: React.Ref<HTMLDivElement>) => {
    const { baseProps, baseState, materialProps, externalForwardedProps } = props;
    const ownerState = {
      ...materialProps,
      disabled: baseState.disabled,
      required: baseState.required,
    };
    const { id, label, helperText } = materialProps;

    const labelId = label && id ? `${id}-label` : undefined;
    const helperTextId = id ? `${id}-helper-text` : undefined;

    const classes = useUtilityClasses(ownerState);

    const [RootSlot, { children, ...rootProps }] = useSlot('root', {
      elementType: NumberFieldRoot,
      externalForwardedProps,
      shouldForwardComponentProp: true,
      ownerState,
      className: clsx(classes.root, materialProps.className),
      ref,
      getSlotProps: (externalHandlers) => mergeProps(baseProps, externalHandlers),
      additionalProps: {
        color: ownerState.color,
        error: ownerState.error,
        fullWidth: ownerState.fullWidth,
        size: ownerState.size,
        variant: ownerState.variant,
        disabled: ownerState.disabled,
        required: ownerState.required,
      },
    });

    const [InputLabelSlot, inputLabelProps] = useSlot('inputLabel', {
      elementType: InputLabel,
      externalForwardedProps,
      ownerState,
      className: undefined,
    });

    const [FormHelperTextSlot, formHelperTextProps] = useSlot('formHelperText', {
      elementType: FormHelperText,
      externalForwardedProps,
      ownerState,
      className: undefined,
    });

    const hasLabel = label != null && label !== '';
    const hasHelperText = helperText != null && helperText !== '';

    return (
      <RootSlot {...rootProps}>
        <SSRInitialFilled value={baseState.inputValue} />
        {hasLabel && (
          <InputLabelSlot htmlFor={id} id={labelId} {...(inputLabelProps as InputLabelProps)}>
            {label}
          </InputLabelSlot>
        )}
        {children}
        {hasHelperText && (
          <FormHelperTextSlot id={helperTextId} {...formHelperTextProps}>
            {helperText}
          </FormHelperTextSlot>
        )}
      </RootSlot>
    );
  },
);

export default NumberFieldRootSlot;
