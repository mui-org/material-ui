'use client';

import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import useId from '@mui/utils/useId';

import { useDefaultProps } from '../DefaultPropsProvider';
import type { NumberFieldProps } from './NumberField.types';
import RootSlot from './NumberFieldRootSlot';
import InputSlot from './NumberFieldInputSlot';

const NumberField = React.forwardRef(function NumberField(
  inProps: NumberFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps<NumberFieldProps>({ props: inProps, name: 'MuiNumberField' });
  const {
    color = 'primary',
    defaultValue,
    disabled = false,
    form,
    format,
    helperText,
    id: idProp,
    inputRef,
    label,
    locale,
    largeStep,
    max,
    min,
    name,
    onBlur,
    onFocus,
    onValueChange,
    onValueCommitted,
    readOnly = false,
    required = false,
    size = 'medium',
    slots = {},
    slotProps = {},
    smallStep,
    step,
    value,
    variant = 'outlined',
    ...other
  } = props;

  const id = useId(idProp);

  const ownerState = {
    ...props,
    color,
    disabled,
    id,
    readOnly,
    required,
    size,
    variant,
  };

  const externalForwardedProps = {
    slots,
    slotProps,
    ...other,
  };

  return (
    <BaseNumberField.Root
      defaultValue={defaultValue}
      disabled={disabled}
      form={form}
      format={format}
      id={id}
      locale={locale}
      largeStep={largeStep}
      max={max}
      min={min}
      name={name}
      onValueChange={onValueChange}
      onValueCommitted={onValueCommitted}
      readOnly={readOnly}
      required={required}
      render={(baseProps, baseState) => (
        <RootSlot
          baseProps={baseProps}
          baseState={baseState}
          materialProps={ownerState}
          ref={ref}
          externalForwardedProps={externalForwardedProps}
        />
      )}
      smallStep={smallStep}
      step={step}
      value={value}
    >
      <BaseNumberField.Input
        render={(baseProps, baseState) => (
          <InputSlot
            baseProps={baseProps}
            baseState={baseState}
            materialProps={ownerState}
            externalForwardedProps={externalForwardedProps}
          />
        )}
      />
    </BaseNumberField.Root>
  );
});

NumberField.propTypes = {};

export default NumberField;
