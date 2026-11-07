import * as React from 'react';
import NumberField from '@mui/material/NumberField';
import { createTheme } from '@mui/material/styles';

// Keep extensions isolated from the ordinary specs so invalid-prop checks stay strict.
declare module '@mui/material/NumberField' {
  interface NumberFieldPropsColorOverrides {
    brand: true;
  }
  interface NumberFieldPropsSizeOverrides {
    compact: true;
  }
  interface NumberFieldRootSlotOverrides {
    customRootProp?: string;
  }
  interface NumberFieldInputSlotPropsOverrides {
    customInputProp?: string;
  }
  interface NumberFieldInputLabelSlotPropsOverrides {
    customLabelProp?: string;
  }
  interface NumberFieldFormHelperTextSlotPropsOverrides {
    customHelperProp?: string;
  }
  interface NumberFieldIncrementButtonSlotPropsOverrides {
    stepLabel?: 'increase';
  }
  interface NumberFieldDecrementButtonSlotPropsOverrides {
    stepLabel?: 'decrease';
  }
}

// NumberField inherits FormControl props, so their size/color extensions must agree.
declare module '@mui/material/FormControl' {
  interface FormControlPropsColorOverrides {
    brand: true;
  }
  interface FormControlPropsSizeOverrides {
    compact: true;
  }
}

<NumberField
  color="brand"
  size="compact"
  slotProps={{
    root: { customRootProp: 'root' },
    input: { customInputProp: 'input' },
    inputLabel: { customLabelProp: 'label', shrink: true },
    formHelperText: { customHelperProp: 'helper' },
    incrementButton: { stepLabel: 'increase' },
    decrementButton: (ownerState) => ({ stepLabel: 'decrease', disabled: ownerState.disabled }),
  }}
/>;

// @ts-expect-error Slot extensions retain their declared value types.
<NumberField slotProps={{ input: { customInputProp: 1 } }} />;
// @ts-expect-error Increment and decrement extensions remain independent.
<NumberField slotProps={{ incrementButton: { stepLabel: 'decrease' } }} />;

// The same public extensions must be available in component defaults and variants.
createTheme({
  components: {
    MuiNumberField: {
      defaultProps: {
        color: 'brand',
        size: 'compact',
        controlsPosition: 'split',
        slotProps: { incrementButton: { stepLabel: 'increase' } },
      },
      styleOverrides: {
        root: { minWidth: 120 },
        controls: { gap: 2 },
        incrementButton: { padding: 1 },
        decrementButton: { padding: 1 },
      },
      variants: [{ props: { color: 'brand', size: 'compact' }, style: { minWidth: 160 } }],
    },
  },
});
