import * as React from 'react';
import type { Theme } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';

{
  // Overriding styles
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: blue,
      contrastThreshold: 3,
      tonalOffset: 0.2,
      common: {
        white: '#ffffff',
      },
    },
    typography: {
      h1: {
        fontSize: 24,
      },
      fontSize: 18,
    },
    mixins: {
      toolbar: {
        backgroundColor: 'red',
      },
    },
    breakpoints: {
      step: 3,
    },
    transitions: {
      duration: {
        short: 50,
      },
    },
    spacing: 5,
    zIndex: {
      appBar: 42,
    },
    components: {
      MuiButton: {
        defaultProps: {
          disabled: true,
        },
        styleOverrides: {
          // Name of the styleSheet
          root: {
            // Name of the rule
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: 48,
            padding: '0 30px',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          },
        },
      },
      MuiAppBar: {
        defaultProps: {
          position: 'fixed',
        },
      },
    },
  });

  <ThemeProvider theme={theme}>
    <Button>Overrides</Button>
  </ThemeProvider>;
}
const theme2 = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disabled: false,
        TouchRippleProps: {
          center: true,
        },
      },
    },
    MuiTable: {
      defaultProps: {
        cellPadding: 12,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
});

const t1: string = createTheme().spacing(1);
const t2: string = createTheme().spacing(1, 2);
const t3: string = createTheme().spacing(1, 2, 3);
const t4: string = createTheme().spacing(1, 2, 3, 4);
// @ts-expect-error: The spacing helper accepts at most four arguments.
const t5 = createTheme().spacing(1, 2, 3, 4, 5);

function themeProviderTest() {
  <ThemeProvider theme={{ foo: 1 }}>{null}</ThemeProvider>;
  // @ts-expect-error: The explicit Theme type requires the standard theme fields.
  <ThemeProvider<Theme> theme={{ foo: 1 }}>{null}</ThemeProvider>;
  <ThemeProvider<Theme>
    theme={{ components: { MuiAppBar: { defaultProps: { 'aria-atomic': 'true' } } } }}
  >
    {null}
  </ThemeProvider>;
}
