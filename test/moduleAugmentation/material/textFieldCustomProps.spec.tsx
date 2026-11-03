import * as React from 'react';
import TextField from '@mui/material/TextField';
import { createTheme } from '@mui/material/styles';

// Update the TextField's extendable props options
declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    customPalette: true;
  }
  interface TextFieldPropsSizeOverrides {
    extraLarge: true;
  }
}
declare module '@mui/material/FormControl' {
  interface FormControlPropsColorOverrides {
    customPalette: true;
  }
  interface FormControlPropsSizeOverrides {
    extraLarge: true;
  }
}
declare module '@mui/material/InputBase' {
  interface InputBasePropsSizeOverrides {
    extraLarge: true;
  }
}
declare module '@mui/material/styles' {
  interface Palette {
    customPalette: Palette['primary'];
  }
  interface PaletteOptions {
    customPalette: PaletteOptions['primary'];
  }
}

// theme typings should work as expected
const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      variants: [
        {
          props: { size: 'extraLarge' },
          style: {
            padding: '30px 15px',
            fontSize: 40,
          },
        },
      ],
    },
  },
  palette: {
    customPalette: {
      main: 'blue',
    },
  },
});

<TextField color="customPalette" size="extraLarge">
  Custom Color TextField
</TextField>;
<TextField variant="filled" size="extraLarge">
  Custom Size TextField
</TextField>;

declare module '@mui/material/TextField' {
  interface TextFieldFormHelperTextSlotPropsOverrides {
    'data-cy'?: string;
  }
  interface TextFieldRootSlotPropsOverrides {
    customRootProp?: string;
  }
  interface TextFieldInputSlotPropsOverrides {
    customInputProp?: string;
  }
  interface TextFieldInputLabelSlotPropsOverrides {
    customInputLabelProp?: string;
  }
  interface TextFieldSelectSlotPropsOverrides {
    customSelectProp?: string;
  }
}

<TextField
  slotProps={{
    formHelperText: { 'data-cy': 'email-error' },
    root: {
      customRootProp: 'abc',
    },
    input: {
      customInputProp: 'abc',
    },
    inputLabel: {
      customInputLabelProp: 'abc',
    },
    select: {
      customSelectProp: 'abc',
    },
  }}
>
  Custom TextField
</TextField>;
