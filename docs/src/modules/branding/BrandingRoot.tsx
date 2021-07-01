import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { darken, createTheme, alpha, ThemeProvider } from '@material-ui/core/styles';
import NProgressBar from '@material-ui/docs/NProgressBar';
import BrandingFooter from 'docs/src/modules/branding/BrandingFooter';

declare module '@material-ui/core/styles' {
  interface Palette {
    ternary: Palette['primary'];
    neutral: Palette['primary'];
    vividBlue: string;
    emerald: string;
    sizzlingRed: string;
    sunglow: string;
    grey5A: string;
    grey87: string;
    greyAA: string;
    greyD7: string;
    greyE5: string;
    greyEA: string;
    greyF3: string;
  }

  interface PaletteOptions {
    ternary?: PaletteOptions['primary'];
    neutral?: PaletteOptions['primary'];
    vividBlue?: string;
    emerald?: string;
    sizzlingRed?: string;
    sunglow?: string;
    grey5A?: string;
    grey87?: string;
    greyAA?: string;
    greyD7?: string;
    greyE5?: string;
    greyEA?: string;
    greyF3?: string;
  }
}

// Update the Typography's variant prop options
declare module '@material-ui/core/Typography' {
  interface TypographyPropsVariantOverrides {
    body3: true;
  }
}

declare module '@material-ui/core/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    ternary: true;
  }
}

function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

const oxfordBlue = '#001E3C';

let theme = createTheme({
  palette: {
    text: {
      primary: oxfordBlue,
    },
    primary: {
      main: '#007FFF',
    },
    secondary: {
      main: oxfordBlue,
    },
    background: {
      default: '#FFF',
    },
    vividBlue: '#00C8FF',
    emerald: '#21CC66',
    sizzlingRed: '#FF505F',
    sunglow: '#FFC846',
    grey5A: '#5A6978',
    grey87: '#8796A5',
    greyAA: '#AAB4BE',
    greyD7: '#D7DCE1',
    greyE5: '#E5E8EC',
    greyEA: '#EAEEF3',
    greyF3: '#F3F6F9',
  },
  typography: {
    fontWeightMedium: undefined,
    fontFamily: [
      'Inter',
      // system-font
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function getButtonColor(color: string) {
  return {
    '&.Mui-focusVisible': {
      boxShadow: `0 0 0 0.25rem ${alpha(color, 0.5)}`,
    },
    '&:hover': {
      backgroundColor: darken(color, 0.12),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: color,
      },
    },
    '&:active': {
      boxShadow: `0 0 0 0.15rem ${alpha(color, 0.5)}`,
      backgroundColor: darken(color, 0.25),
    },
  };
}

theme = createTheme(theme, {
  palette: {
    ternary: {
      main: theme.palette.vividBlue,
      contrastText: '#fff',
    },
    neutral: {
      main: theme.palette.grey87,
      contrastText: '#fff',
    },
    action: {
      active: theme.palette.grey87,
    },
    text: {
      secondary: theme.palette.grey5A,
    },
    divider: theme.palette.greyE5,
  },
  typography: {
    h1: {
      fontWeight: 700,
      letterSpacing: `${round(-2 / 72)}em`,
      lineHeight: 1.111,
      fontSize: theme.typography.pxToRem(44),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(68),
      },
      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(72),
      },
    },
    h2: {
      fontWeight: 700,
      letterSpacing: `${round(-1.5 / 52)}em`,
      lineHeight: 1.154,
      fontSize: theme.typography.pxToRem(40),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(48),
      },
      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(52),
      },
    },
    h3: {
      fontWeight: 700,
      letterSpacing: `${round(-1 / 36)}em`,
      lineHeight: 1.222,
      fontSize: theme.typography.pxToRem(28),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(32),
      },
      [theme.breakpoints.up('md')]: {
        fontSize: theme.typography.pxToRem(36),
      },
    },
    h4: {
      fontWeight: 700,
      letterSpacing: `${round(-0.5 / 24)}em`,
      lineHeight: 1.25,
      fontSize: theme.typography.pxToRem(24),
    },
    h5: {
      fontWeight: 600,
      letterSpacing: `${round(-0.25 / 20)}em`,
      lineHeight: 1.3,
      fontSize: theme.typography.pxToRem(20),
    },
    h6: undefined,
    subtitle1: undefined,
    subtitle2: undefined,
    button: {
      fontWeight: 600,
      fontSize: theme.typography.pxToRem(16),
      lineHeight: 1.25,
    },
    body1: {
      fontSize: theme.typography.pxToRem(16),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(18),
      },
    },
    body2: {
      fontSize: theme.typography.pxToRem(14),
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.typography.pxToRem(16),
      },
    },
    body3: {
      fontSize: theme.typography.pxToRem(14),
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: theme.typography.pxToRem(16),
          [theme.breakpoints.up('sm')]: {
            fontSize: theme.typography.pxToRem(16),
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'initial',
          padding: '12px 16px',
        },
        colorInherit: {
          backgroundColor: theme.palette.greyD7,
          '&.Mui-focusVisible': {
            boxShadow: `0 0 0 0.25rem ${alpha(theme.palette.greyD7, 0.5)}`,
          },
          '&:hover': {
            backgroundColor: darken(theme.palette.greyD7, 0.07),
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: theme.palette.greyD7,
            },
          },
          '&:active': {
            boxShadow: `0 0 0 0.15rem ${alpha(theme.palette.greyD7, 0.5)}`,
            backgroundColor: darken(theme.palette.greyD7, 0.18),
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: getButtonColor(theme.palette.primary.main),
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: getButtonColor(theme.palette.secondary.main),
        },
        {
          props: { variant: 'contained', color: 'ternary' },
          style: getButtonColor(theme.palette.ternary.main),
        },
        {
          props: { variant: 'contained', color: 'neutral' },
          style: getButtonColor(theme.palette.neutral.main),
        },
        {
          props: { size: 'small' },
          style: {
            padding: '7px 16px',
            fontSize: theme.typography.pxToRem(14),
            fontWeight: 700,
          },
        },
        {
          props: { size: 'large' },
          style: {
            padding: '14px 22px',
            boxShadow: '0 2px 3px rgba(0, 30, 60, 0.08)',
            fontSize: theme.typography.pxToRem(18),
            fontWeight: 700,
          },
        },
      ],
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          maxWidth: 1440,
          width: '100%',
          marginRight: 'auto',
          marginLeft: 'auto',
          paddingRight: theme.spacing(3),
          paddingLeft: theme.spacing(3),
          [theme.breakpoints.up('sm')]: {
            paddingRight: theme.spacing(5),
            paddingLeft: theme.spacing(5),
          },
          [theme.breakpoints.up('lg')]: {
            minHeight: 80,
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          padding: '12px',
          fontWeight: 'normal',
          fontSize: theme.typography.pxToRem(14),
          lineHeight: '20px',
          color: theme.palette.secondary.contrastText,
          backgroundColor: theme.palette.secondary.main,
          boxShadow: '0px 2px 3px rgba(0, 30, 60, 0.08)',
          borderRadius: theme.shape.borderRadius,
          maxWidth: 300,
        },
        arrow: {
          '&:before': {
            backgroundColor: theme.palette.secondary.main,
          },
        },
      },
    },
  },
});

interface BrandingRootProps {
  children?: React.ReactNode;
}

export default function BrandingRoot(props: BrandingRootProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NProgressBar />
      {props.children}
      <BrandingFooter />
    </ThemeProvider>
  );
}
