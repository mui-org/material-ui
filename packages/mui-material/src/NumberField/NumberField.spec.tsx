import * as React from 'react';
import { expectType } from '@mui/types';
import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import NumberField, {
  NumberFieldProps,
  NumberFieldOwnerState,
  StandardNumberFieldProps,
  FilledNumberFieldProps,
  OutlinedNumberFieldProps,
} from '@mui/material/NumberField';

// The default variant exposes OutlinedInput's slots.
<NumberField slotProps={{ input: { slotProps: { notchedOutline: { className: 'outline' } } } }} />;

<NumberField
  variant="outlined"
  slotProps={{ input: { slotProps: { notchedOutline: { className: 'outline' } } } }}
/>;

<NumberField variant="standard" slotProps={{ input: { disableUnderline: true } }} />;
<NumberField
  variant="filled"
  slotProps={{ input: { hiddenLabel: true, disableUnderline: true } }}
/>;

// A variant cannot use another variant's input slots.
// @ts-expect-error The standard input has no notchedOutline slot.
<NumberField variant="standard" slotProps={{ input: { slotProps: { notchedOutline: {} } } }} />;
// @ts-expect-error The filled input has no notchedOutline slot.
<NumberField variant="filled" slotProps={{ input: { slotProps: { notchedOutline: {} } } }} />;
// @ts-expect-error The outlined input has no underline to disable.
<NumberField variant="outlined" slotProps={{ input: { disableUnderline: true } }} />;

// FIXME: Union excess-property checking still accepts other variants' input props
// when variant is omitted, even though the runtime default is outlined.
<NumberField slotProps={{ input: { disableUnderline: true } }} />;

// Explicit generic arguments select the corresponding public interface.
const standardProps: NumberFieldProps<'standard'> = {
  variant: 'standard',
  slotProps: { input: { disableUnderline: true } },
};
expectType<StandardNumberFieldProps, typeof standardProps>(standardProps);
<NumberField {...standardProps} />;

const filledProps: NumberFieldProps<'filled'> = {
  variant: 'filled',
  slotProps: { input: { hiddenLabel: true } },
};
expectType<FilledNumberFieldProps, typeof filledProps>(filledProps);
<NumberField {...filledProps} />;

const outlinedProps: NumberFieldProps<'outlined'> = {
  slotProps: { input: { slotProps: { notchedOutline: { className: 'outline' } } } },
};
expectType<OutlinedNumberFieldProps, typeof outlinedProps>(outlinedProps);
<NumberField {...outlinedProps} />;

// @ts-expect-error A nondefault variant must be selected explicitly.
const missingStandardVariant: NumberFieldProps<'standard'> = {};
// @ts-expect-error A nondefault variant must be selected explicitly.
const missingFilledVariant: NumberFieldProps<'filled'> = {};
// @ts-expect-error The generic argument constrains the variant.
const mismatchedVariant: NumberFieldProps<'outlined'> = { variant: 'filled' };
// @ts-expect-error Only supported variants are accepted.
const invalidVariant: NumberFieldProps<'custom'> = {};

// Slot callbacks receive normalized NumberField owner state and retain variant-specific props.
<NumberField
  variant="outlined"
  slotProps={{
    input: (ownerState) => {
      expectType<NumberFieldOwnerState, typeof ownerState>(ownerState);
      expectType<boolean, typeof ownerState.disabled>(ownerState.disabled);
      expectType<boolean, typeof ownerState.required>(ownerState.required);
      return { slotProps: { notchedOutline: { className: 'outline' } } };
    },
    inputLabel: (ownerState) => ({ shrink: ownerState.required }),
  }}
/>;

<NumberField
  variant="filled"
  slotProps={{ input: (ownerState) => ({ hiddenLabel: ownerState.disabled }) }}
/>;

// Numeric callbacks have the same Base UI signatures for every variant.
function ValueCallbacks(props: NumberFieldProps) {
  return (
    <NumberField
      {...props}
      onValueChange={(value, details) => {
        expectType<number | null, typeof value>(value);
        expectType<BaseNumberField.Root.ChangeEventDetails, typeof details>(details);
      }}
      onValueCommitted={(value, details) => {
        expectType<number | null, typeof value>(value);
        expectType<BaseNumberField.Root.CommitEventDetails, typeof details>(details);
      }}
    />
  );
}

<ValueCallbacks />;
<ValueCallbacks variant="standard" />;
<ValueCallbacks variant="filled" />;
<ValueCallbacks variant="outlined" />;

<NumberField value={null} defaultValue={0} />;
// @ts-expect-error Numeric values cannot be strings.
<NumberField value="42" />;
// @ts-expect-error Numeric default values cannot be strings.
<NumberField defaultValue="42" />;
// @ts-expect-error Public changes use Base UI's numeric callbacks, not a DOM onChange.
<NumberField onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}} />;
// @ts-expect-error onValueChange receives a number or null, not a DOM event.
<NumberField onValueChange={(event: React.ChangeEvent<HTMLInputElement>) => {}} />;
// @ts-expect-error onValueCommitted receives a number or null, not a DOM event.
<NumberField onValueCommitted={(event: React.ChangeEvent<HTMLInputElement>) => {}} />;

// DOM change events remain available on the Material input slot.
<NumberField
  slotProps={{
    input: {
      onChange: (event) => {
        expectType<React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, typeof event>(event);
        expectType<string, typeof event.target.value>(event.target.value);
      },
    },
  }}
/>;

<NumberField
  onFocus={(event) => {
    expectType<React.FocusEvent<HTMLInputElement>, typeof event>(event);
  }}
  onBlur={(event) => {
    expectType<React.FocusEvent<HTMLInputElement>, typeof event>(event);
  }}
/>;
