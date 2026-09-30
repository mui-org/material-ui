import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import resolveComponentProps from '@mui/utils/resolveComponentProps';

import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import useSlot from '../utils/useSlot';
import OutlinedInput, { OutlinedInputProps } from '../OutlinedInput';
import FilledInput from '../FilledInput';
import Input from '../Input';

interface NumberFieldInputProps {
  baseProps: React.ComponentPropsWithRef<'input'>;
  baseState: BaseNumberField.Input.State;
  materialProps: NumberFieldOwnerState;
  externalForwardedProps: Required<Pick<NumberFieldProps, 'slots' | 'slotProps'>>;
}

const variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput,
};

const NumberFieldInputSlot = React.forwardRef(
  (props: NumberFieldInputProps, ref: React.Ref<HTMLDivElement>) => {
    const { baseProps, baseState, materialProps, externalForwardedProps } = props;
    const { value } = baseState;
    const { autoFocus, variant, label, id, fullWidth, inputRef } = materialProps;
    const ownerState = {
      ...materialProps,
      disabled: baseState.disabled,
      required: baseState.required,
    };

    const hasHelperText = materialProps.helperText != null && materialProps.helperText !== '';
    const helperTextId = hasHelperText && id ? `${id}-helper-text` : undefined;

    const InputComponent = variantComponent[materialProps.variant || 'standard'];
    const inputLabelSlotProps = resolveComponentProps(
      externalForwardedProps.slotProps?.inputLabel,
      ownerState,
    );
    const inputAdditionalProps: Pick<OutlinedInputProps, 'label' | 'notched'> = {};

    if (variant === 'outlined') {
      if (
        inputLabelSlotProps &&
        'shrink' in inputLabelSlotProps &&
        typeof inputLabelSlotProps.shrink !== 'undefined'
      ) {
        inputAdditionalProps.notched = inputLabelSlotProps.shrink;
      }
      inputAdditionalProps.label = label;
    }

    const [InputSlot, inputProps] = useSlot('input', {
      elementType: InputComponent,
      externalForwardedProps,
      additionalProps: inputAdditionalProps,
      ownerState,
      className: undefined,
      ref,
    });

    const [HtmlInputSlot, htmlInputProps] = useSlot('htmlInput', {
      elementType: 'input',
      externalForwardedProps,
      ownerState,
      className: undefined,
      getSlotProps: (externalHandlers) => {
        const { 'aria-invalid': ariaInvalid, ...restBaseProps } = baseProps;

        return mergeProps(ariaInvalid === undefined ? restBaseProps : baseProps, externalHandlers);
      },
    });

    return (
      <InputSlot
        aria-describedby={helperTextId}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        value={value}
        id={id}
        inputRef={inputRef}
        inputProps={htmlInputProps}
        onBlur={materialProps.onBlur}
        onFocus={materialProps.onFocus}
        slots={{
          input: externalForwardedProps.slots.htmlInput ? HtmlInputSlot : undefined,
        }}
        {...inputProps}
      />
    );
  },
);

export default NumberFieldInputSlot;
