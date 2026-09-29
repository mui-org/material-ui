'use client';

import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import useId from '@mui/utils/useId';

import { useDefaultProps } from '../DefaultPropsProvider';
import type { NumberFieldProps } from './NumberField.types';
import RootSlot from './NumberFieldRootSlot';

const NumberField = React.forwardRef(function NumberField(
  inProps: NumberFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const props = useDefaultProps<NumberFieldProps>({ props: inProps, name: 'MuiNumberField' });
  const {
    color = 'primary',
    defaultValue,
    disabled = false,
    helperText,
    id: idProp,
    label,
    name,
    onValueChange,
    onValueCommitted,
    required = false,
    size = 'medium',
    slots = {},
    slotProps = {},
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
    required,
    size,
    variant,
  };

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  return (
    <BaseNumberField.Root
      defaultValue={defaultValue}
      disabled={disabled}
      id={id}
      name={name}
      onValueChange={onValueChange}
      onValueCommitted={onValueCommitted}
      required={required}
      render={(baseProps, state) => (
        <RootSlot
          baseProps={baseProps}
          baseState={state}
          materialProps={ownerState}
          ref={ref}
          externalForwardedProps={{ ...externalForwardedProps, ...other }}
        />
      )}
      value={value}
    ></BaseNumberField.Root>
  );
});

NumberField.propTypes = {};

export default NumberField;
