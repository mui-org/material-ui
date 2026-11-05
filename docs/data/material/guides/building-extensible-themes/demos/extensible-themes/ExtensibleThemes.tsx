import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

/**
 * Branded theme: you might want to export this as a separate file
 */
const brandedTokens: ThemeOptions = {
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: 'rgb(229, 229, 234)',
    },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily:
      'var(--font-primary, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 2px 4px 0 rgb(0 0 0 / 0.06)',
    '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)',
    '0 3px 5px -1px rgb(0 0 0 / 0.07), 0 1px 3px -1px rgb(0 0 0 / 0.05)',
    '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -1px rgb(0 0 0 / 0.05)',
    '0 5px 8px -2px rgb(0 0 0 / 0.08), 0 2px 4px -1px rgb(0 0 0 / 0.05)',
    '0 6px 10px -2px rgb(0 0 0 / 0.08), 0 3px 5px -2px rgb(0 0 0 / 0.06)',
    '0 8px 12px -3px rgb(0 0 0 / 0.09), 0 3px 6px -2px rgb(0 0 0 / 0.06)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 7px -3px rgb(0 0 0 / 0.07)',
    '0 12px 18px -4px rgb(0 0 0 / 0.11), 0 5px 9px -3px rgb(0 0 0 / 0.08)',
    '0 15px 22px -4px rgb(0 0 0 / 0.12), 0 6px 11px -4px rgb(0 0 0 / 0.09)',
    '0 18px 28px -5px rgb(0 0 0 / 0.13), 0 7px 13px -4px rgb(0 0 0 / 0.1)',
    '0 22px 34px -6px rgb(0 0 0 / 0.14), 0 8px 16px -5px rgb(0 0 0 / 0.11)',
    '0 26px 40px -7px rgb(0 0 0 / 0.15), 0 10px 19px -5px rgb(0 0 0 / 0.12)',
    '0 31px 47px -8px rgb(0 0 0 / 0.16), 0 12px 23px -6px rgb(0 0 0 / 0.13)',
    '0 36px 54px -9px rgb(0 0 0 / 0.17), 0 14px 27px -7px rgb(0 0 0 / 0.14)',
    '0 42px 62px -10px rgb(0 0 0 / 0.18), 0 16px 31px -8px rgb(0 0 0 / 0.15)',
    '0 48px 70px -11px rgb(0 0 0 / 0.2), 0 18px 36px -9px rgb(0 0 0 / 0.16)',
    '0 54px 78px -12px rgb(0 0 0 / 0.21), 0 20px 41px -10px rgb(0 0 0 / 0.17)',
    '0 60px 86px -13px rgb(0 0 0 / 0.22), 0 23px 46px -11px rgb(0 0 0 / 0.18)',
    '0 66px 94px -14px rgb(0 0 0 / 0.23), 0 26px 52px -12px rgb(0 0 0 / 0.19)',
    '0 72px 102px -15px rgb(0 0 0 / 0.24), 0 29px 58px -13px rgb(0 0 0 / 0.2)',
    '0 58px 82px -11px rgb(0 0 0 / 0.26), 0 21px 40px -11px rgb(0 0 0 / 0.22)',
  ],
};

const brandedComponents: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: 'unset',
        textTransform: 'capitalize',
        fontSize: '1rem',
        '&:hover': {
          textDecoration: 'underline',
        },
        [theme.breakpoints.up('md')]: {
          fontSize: '0.875rem',
        },
      }),
    },
  },
};

const brandedTheme = createTheme({
  ...brandedTokens,
  components: brandedComponents,
});

/**
 * Application theme
 */
const appTheme = createTheme({
  ...brandedTokens,
  palette: {
    ...brandedTokens.palette,
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    ...brandedComponents,
    MuiButton: {
      styleOverrides: {
        root: [
          brandedComponents?.MuiButton?.styleOverrides?.root,
          {
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        ],
      },
    },
  },
});

function App1() {
  return (
    <ThemeProvider theme={appTheme}>
      <Button>App Button</Button>
    </ThemeProvider>
  );
}

const appTheme2 = createTheme({
  ...brandedTokens,
  palette: {
    ...brandedTokens.palette,
    primary: {
      main: '#ffa726',
    },
  },
  components: {
    ...brandedComponents,
    MuiButton: {
      defaultProps: {
        ...brandedComponents?.MuiButton?.defaultProps,
        variant: 'outlined',
      },
      styleOverrides: {
        root: [
          brandedComponents?.MuiButton?.styleOverrides?.root,
          ({ theme }) => ({
            color: theme.palette.primary.dark,
          }),
        ],
      },
    },
  },
});

function App2() {
  return (
    <ThemeProvider theme={appTheme2}>
      <Button>App 2 Button</Button>
    </ThemeProvider>
  );
}

export default function ExtensibleThemes() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* @focus-start */}
      <ThemeProvider theme={brandedTheme}>
        <Button>Branded Button</Button>
      </ThemeProvider>
      <App1 />
      <App2 />
      {/* @focus-end */}
    </Box>
  );
}
