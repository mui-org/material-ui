import * as React from 'react';
import NumberField from '@mui/material/NumberField';

export default function ValidationNumberField() {
  // @focus-start @padding 1
  const [value, setValue] = React.useState<number | null>(5);
  const error = value === null || value < 10;

  return (
    <NumberField
      label="Order quantity"
      value={value}
      onValueChange={setValue}
      min={0}
      required
      error={error}
      helperText={error ? 'Order at least 10 items.' : 'Your quantity is valid.'}
    />
  );
  // @focus-end
}
