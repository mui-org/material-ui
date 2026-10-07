'use client';

import * as React from 'react';
import PropTypes from 'prop-types';

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
    allowOutOfRange = false,
    allowWheelScrub = false,
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
    snapOnStep = false,
    value,
    variant = 'outlined',
    ...other
  } = props;

  const id = useId(idProp);

  const ownerState = {
    ...props,
    allowOutOfRange,
    allowWheelScrub,
    color,
    disabled,
    id,
    readOnly,
    required,
    size,
    snapOnStep,
    variant,
  };

  const externalForwardedProps = {
    slots,
    slotProps,
    ...other,
  };

  return (
    <BaseNumberField.Root
      allowOutOfRange={allowOutOfRange}
      allowWheelScrub={allowWheelScrub}
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
      snapOnStep={snapOnStep}
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

NumberField.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the number input element will allow values outside the specified range.
   */
  allowOutOfRange: PropTypes.bool,
  /**
   * If `true`, the number input element will respond to wheel scrub gestures.
   */
  allowWheelScrub: PropTypes.bool,
  /**
   * If `true`, the `input` element is focused during the first mount.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOf(['error', 'info', 'primary', 'secondary', 'success', 'warning']),
  /**
   * The default value of the number input element.
   */
  defaultValue: PropTypes.number,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the label is displayed in an error state.
   * @default false
   */
  error: PropTypes.bool,
  /**
   * Identifies the form that owns the input element.
   */
  form: PropTypes.string,
  /**
   * Options to format the input value.
   *
   * See [MDN - Intl](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Intl).
   */
  format: PropTypes.shape({
    compactDisplay: PropTypes.oneOf(['long', 'short']),
    currency: PropTypes.string,
    currencyDisplay: PropTypes.oneOf(['code', 'name', 'narrowSymbol', 'symbol']),
    currencySign: PropTypes.oneOf(['accounting', 'standard']),
    localeMatcher: PropTypes.oneOf(['best fit', 'lookup']),
    maximumFractionDigits: PropTypes.number,
    maximumSignificantDigits: PropTypes.number,
    minimumFractionDigits: PropTypes.number,
    minimumIntegerDigits: PropTypes.number,
    minimumSignificantDigits: PropTypes.number,
    notation: PropTypes.oneOf(['compact', 'engineering', 'scientific', 'standard']),
    numberingSystem: PropTypes.string,
    signDisplay: PropTypes.oneOf(['always', 'auto', 'exceptZero', 'never']),
    style: PropTypes.oneOf(['currency', 'decimal', 'percent', 'unit']),
    unit: PropTypes.string,
    unitDisplay: PropTypes.oneOf(['long', 'narrow', 'short']),
    useGrouping: PropTypes.bool,
  }),
  /**
   * If `true`, the input will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * The helper text content.
   */
  helperText: PropTypes.node,
  /**
   * The id of the input element.
   */
  id: PropTypes.string,
  /**
   * The ref of the input element.
   */
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.object,
    }),
  ]),
  /**
   * The label content.
   */
  label: PropTypes.node,
  /**
   * The large step value for the number input element.
   */
  largeStep: PropTypes.number,
  /**
   * The locale used for number formatting and parsing.
   *
   * See [MDN - Intl Number Format](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat).
   */
  locale: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          baseName: PropTypes.string.isRequired,
          calendar: PropTypes.string,
          caseFirst: PropTypes.oneOf(['false', 'lower', 'upper']),
          collation: PropTypes.string,
          hourCycle: PropTypes.oneOf(['h11', 'h12', 'h23', 'h24']),
          language: PropTypes.string.isRequired,
          maximize: PropTypes.func.isRequired,
          minimize: PropTypes.func.isRequired,
          numberingSystem: PropTypes.string,
          numeric: PropTypes.bool,
          region: PropTypes.string,
          script: PropTypes.string,
          toString: PropTypes.func.isRequired,
        }),
        PropTypes.string,
      ]).isRequired,
    ),
    PropTypes.shape({
      baseName: PropTypes.string.isRequired,
      calendar: PropTypes.string,
      caseFirst: PropTypes.oneOf(['false', 'lower', 'upper']),
      collation: PropTypes.string,
      hourCycle: PropTypes.oneOf(['h11', 'h12', 'h23', 'h24']),
      language: PropTypes.string.isRequired,
      maximize: PropTypes.func.isRequired,
      minimize: PropTypes.func.isRequired,
      numberingSystem: PropTypes.string,
      numeric: PropTypes.bool,
      region: PropTypes.string,
      script: PropTypes.string,
      toString: PropTypes.func.isRequired,
    }),
    PropTypes.string,
  ]),
  /**
   * The maximum value allowed for the number input element.
   */
  max: PropTypes.number,
  /**
   * The minimum value allowed for the number input element.
   */
  min: PropTypes.number,
  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,
  /**
   * The blur event handler of the input element.
   */
  onBlur: PropTypes.func,
  /**
   * The focus event handler of the input element.
   */
  onFocus: PropTypes.func,
  /**
   * The change event handler of the number input element.
   */
  onValueChange: PropTypes.func,
  /**
   * The committed value event handler of the number input element.
   */
  onValueCommitted: PropTypes.func,
  /**
   * If `true`, the input element is read-only.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * If `true`, the label is displayed as required and the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['small', 'medium']),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    formHelperText: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    htmlInput: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.shape({
        component: PropTypes.elementType,
        key: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.shape({
            '__@toStringTag@4263': PropTypes.oneOf(['BigInt']).isRequired,
            toLocaleString: PropTypes.func.isRequired,
            toString: PropTypes.func.isRequired,
            valueOf: PropTypes.func.isRequired,
          }),
          PropTypes.string,
        ]),
        sx: PropTypes.oneOfType([
          PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
          ),
          PropTypes.func,
          PropTypes.object,
        ]),
      }),
    ]),
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    inputLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    formHelperText: PropTypes.elementType,
    htmlInput: PropTypes.elementType,
    input: PropTypes.elementType,
    inputLabel: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The small step value for the number input element.
   */
  smallStep: PropTypes.number,
  /**
   * If `true`, the number input element will snap to the nearest step value.
   */
  snapOnStep: PropTypes.bool,
  /**
   * The step attribute of the number input element.
   */
  step: PropTypes.oneOfType([PropTypes.oneOf(['any']), PropTypes.number]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The value of the number input element.
   */
  value: PropTypes.number,
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
} as any;

export default NumberField;
