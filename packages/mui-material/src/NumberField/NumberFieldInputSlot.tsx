import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import resolveComponentProps from '@mui/utils/resolveComponentProps';

import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import useSlot from '../utils/useSlot';
import OutlinedInput, { OutlinedInputProps } from '../OutlinedInput';
import FilledInput from '../FilledInput';
import Input from '../Input';
import resolveNumberFieldInputProps from './utils/resolveNumberFieldInputProps';

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

/**
 * @ignore - internal component.
 */
const NumberFieldInputSlot = React.forwardRef(
  (props: NumberFieldInputProps, ref: React.Ref<HTMLDivElement>) => {
    const { baseProps, baseState, materialProps, externalForwardedProps } = props;
    const { inputValue } = baseState;
    const { autoFocus, variant, label, id, fullWidth, inputRef } = materialProps;
    const ownerState = {
      ...materialProps,
      disabled: baseState.disabled,
      required: baseState.required,
      readOnly: baseState.readOnly,
    };

    const hasHelperText = materialProps.helperText != null && materialProps.helperText !== '';
    const helperTextId = hasHelperText && id ? `${id}-helper-text` : undefined;

    const InputComponent = variantComponent[materialProps.variant ?? 'standard'];
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

    const { materialInputProps, nativeSlotProps } = resolveNumberFieldInputProps({
      inputProps,
      htmlInputSlotProps: externalForwardedProps.slotProps.htmlInput,
      ownerState,
    });

    const [HtmlInputSlot, htmlInputProps] = useSlot('htmlInput', {
      elementType: 'input',
      externalForwardedProps: {
        ...externalForwardedProps,
        slotProps: {
          ...externalForwardedProps.slotProps,
          htmlInput: nativeSlotProps,
        },
      },
      ownerState,
      className: undefined,
      getSlotProps: (externalHandlers) => {
        // An unspecified Base UI validation state must not clear Material's aria-invalid.
        const { 'aria-invalid': ariaInvalid, ...restBaseProps } = baseProps;

        // Compose the selected consumer handlers with Base UI; useSlot merges their refs.
        return mergeProps(ariaInvalid === undefined ? restBaseProps : baseProps, externalHandlers);
      },
    });

    // Keep Material styling and native behavior aligned with Base UI's resolved state.
    const inputStateProps = {
      disabled: ownerState.disabled,
      required: ownerState.required,
      readOnly: ownerState.readOnly,
    };

    // Apply behavioral flags after native consumer props, preserving merged handlers and refs.
    const finalHtmlInputProps = {
      ...htmlInputProps,
      ...inputStateProps,
    };

    return (
      <InputSlot
        aria-describedby={helperTextId}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        value={inputValue}
        id={id}
        inputRef={inputRef}
        onBlur={materialProps.onBlur}
        onFocus={materialProps.onFocus}
        slots={{
          input: externalForwardedProps.slots.htmlInput ? HtmlInputSlot : undefined,
        }}
        {...materialInputProps}
        {...inputStateProps}
        inputProps={finalHtmlInputProps}
      />
    );
  },
);

export default NumberFieldInputSlot;
