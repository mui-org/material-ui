import * as React from 'react';

import { NumberField as BaseNumberField } from '@base-ui/react/number-field';

import useId from '@mui/utils/useId';

import { useDefaultProps } from '../DefaultPropsProvider';
import useSlot from '../utils/useSlot';
import FormHelperText from '../FormHelperText';
import InputLabel from '../InputLabel';
import type { NumberFieldProps } from './NumberField.types';
import NumberFieldRoot from './NumberFieldRoot';
import useUtilityClasses from './utils/useUtilityClasses';

const NumberField = React.forwardRef(function NumberField(
  inProps: NumberFieldProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const themeProps = useDefaultProps<NumberFieldProps>({ props: inProps, name: 'MuiNumberField' });
  const {
    variant = 'outlined',
    size = 'medium',
    color = 'primary',
    disabled = false,
    required = false,
    slots = {},
    slotProps = {},
  } = themeProps;
  const props = {
    ...themeProps,
    variant,
    size,
    color,
    disabled,
    required,
    slots,
    slotProps,
  };
  const {
    id: idOverride,
    label,
    defaultValue,
    name,
    onValueChange,
    onValueCommitted,
    value,
  } = props;

  const id = useId(idOverride);
  const labelId = label && id ? `${id}-label` : undefined;
  const helperTextId = id ? `${id}-helper-text` : undefined;

  const ownerState = {
    ...props,
    variant,
  };

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const classes = useUtilityClasses(ownerState);

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
        <NumberFieldRoot
          baseProps={baseProps}
          baseState={state}
          materialProps={props}
          ref={ref}
          externalForwardedProps={externalForwardedProps}
        />
      )}
      value={value}
    ></BaseNumberField.Root>
  );
});

NumberField.propTypes = {};

export default NumberField;
