import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { mergeProps } from '@base-ui/react/merge-props';

import resolveComponentProps from '@mui/utils/resolveComponentProps';

import KeyboardArrowDownIcon from '../internal/svg-icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '../internal/svg-icons/KeyboardArrowUp';
import type { NumberFieldOwnerState, NumberFieldProps } from './NumberField.types';
import useSlot from '../utils/useSlot';
import OutlinedInput, { OutlinedInputProps } from '../OutlinedInput';
import FilledInput from '../FilledInput';
import Input from '../Input';
import { getControlElements, resolveInputProps } from './utils';
import IconButton from '../IconButton';
import type { IconButtonProps } from '../IconButton';
import NumberFieldButtonSlot from './NumberFieldButtonSlot';

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

    const { materialInputProps, nativeSlotProps } = resolveInputProps({
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

    const [DecrementButtonSlot, decrementButtonProps] = useSlot('decrementButton', {
      elementType: IconButton,
      externalForwardedProps,
      ownerState,
      className: undefined,
      additionalProps: {
        size: ownerState.size,
        children: <KeyboardArrowDownIcon fontSize="inherit" />,
      },
    });
    const [IncrementButtonSlot, incrementButtonProps] = useSlot('incrementButton', {
      elementType: IconButton,
      externalForwardedProps,
      ownerState,
      className: undefined,
      additionalProps: {
        size: ownerState.size,
        children: <KeyboardArrowUpIcon fontSize="inherit" />,
      },
    });
    const { disabled: decrementButtonDisabled, ...restDecrementButtonProps } =
      decrementButtonProps as IconButtonProps;
    const { disabled: incrementButtonDisabled, ...restIncrementButtonProps } =
      incrementButtonProps as IconButtonProps;
    const incrementButton = (
      <BaseNumberField.Increment
        disabled={incrementButtonDisabled}
        render={(buttonBaseProps, buttonBaseState) => (
          <NumberFieldButtonSlot
            ButtonSlot={IncrementButtonSlot}
            buttonProps={restIncrementButtonProps}
            baseProps={buttonBaseProps}
            baseState={buttonBaseState}
            materialProps={ownerState}
          />
        )}
      />
    );
    const decrementButton = (
      <BaseNumberField.Decrement
        disabled={decrementButtonDisabled}
        render={(buttonBaseProps, buttonBaseState) => (
          <NumberFieldButtonSlot
            ButtonSlot={DecrementButtonSlot}
            buttonProps={restDecrementButtonProps}
            baseProps={buttonBaseProps}
            baseState={buttonBaseState}
            materialProps={ownerState}
          />
        )}
      />
    );
    const { startControls, endControls } = getControlElements(
      ownerState.controlsPosition,
      incrementButton,
      decrementButton,
    );
    const consumerStartAdornment =
      'startAdornment' in materialInputProps ? materialInputProps.startAdornment : undefined;
    const consumerEndAdornment =
      'endAdornment' in materialInputProps ? materialInputProps.endAdornment : undefined;

    const startAdornment = startControls ? (
      <React.Fragment>
        {startControls}
        {consumerStartAdornment}
      </React.Fragment>
    ) : (
      consumerStartAdornment
    );

    const endAdornment = endControls ? (
      <React.Fragment>
        {consumerEndAdornment}
        {endControls}
      </React.Fragment>
    ) : (
      consumerEndAdornment
    );

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
        startAdornment={startAdornment}
        endAdornment={endAdornment}
        {...inputStateProps}
        inputProps={finalHtmlInputProps}
      />
    );
  },
);

export default NumberFieldInputSlot;
