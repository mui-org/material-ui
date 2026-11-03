import type { CSSObject } from '@mui/system';
import type {} from '@mui/material/themeCssVarsAugmentation';
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded';
import { createTheme, alpha } from '@mui/material/styles';
import type { ThemeOptions, Theme } from '@mui/material/styles';

interface ApplyDarkStyles {
  (scheme: CSSObject): CSSObject;
}

declare module '@mui/material/styles' {
  interface Theme {
    applyDarkStyles: ApplyDarkStyles;
  }

  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    primaryDark: PaletteColor;
    gradients: {
      radioSubtle: string;
      linearSubtle: string;
    };
  }

  interface TypeText {
    tertiary: string;
  }

  interface TypographyVariantsOptions {
    fontWeightSemiBold?: number;
    fontWeightExtraBold?: number;
    fontFamilyCode?: string;
    fontFamilyTagline?: string;
    fontFamilySystem?: string;
  }

  interface TypographyVariants {
    fontWeightSemiBold: number;
    fontWeightExtraBold: number;
    fontFamilyCode: string;
    fontFamilyTagline: string;
    fontFamilySystem: string;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    grey: true;
  }
}

declare module '@mui/material/SvgIcon' {
  interface SvgIconPropsColorOverrides {
    danger: true;
  }
  interface SvgIconPropsSizeOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xl2: true;
    xl3: true;
    xl4: true;
  }
}

// TODO: enable this once types conflict is fixed
// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     code: true;
//   }
// }

const defaultTheme = createTheme();

export const blue = {
  50: 'hsl(210, 100%, 96%)',
  100: 'hsl(210, 100%, 90%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 70%)',
  400: 'hsl(210, 100%, 60%)',
  main: 'hsl(210, 100%, 45%)',
  500: 'hsl(210, 100%, 45%)',
  600: 'hsl(210, 100%, 42%)',
  700: 'hsl(210, 100%, 38%)',
  800: 'hsl(210, 100%, 30%)',
  900: 'hsl(210, 100%, 23%)',
};
export const blueDark = {
  50: 'hsl(210, 14%, 92%)',
  100: 'hsl(210, 14%, 87%)',
  200: 'hsl(210, 14%, 72%)',
  300: 'hsl(210, 14%, 56%)',
  main: 'hsl(210, 14%, 56%)',
  400: 'hsl(210, 14%, 36%)',
  500: 'hsl(210, 14%, 28%)',
  600: 'hsl(210, 14%, 22%)',
  700: 'hsl(210, 14%, 13%)',
  800: 'hsl(210, 14%, 9%)',
  900: 'hsl(210, 14%, 7%)',
};
export const grey = {
  50: 'hsl(215, 15%, 97%)',
  100: 'hsl(215, 15%, 92%)',
  200: 'hsl(215, 15%, 89%)',
  300: 'hsl(215, 15%, 82%)',
  400: 'hsl(215, 15%, 75%)',
  500: 'hsl(215, 15%, 65%)',
  600: 'hsl(215, 15%, 50%)',
  700: 'hsl(215, 15%, 40%)',
  800: 'hsl(215, 15%, 22%)',
  900: 'hsl(215, 15%, 12%)',
};
export const error = {
  50: 'hsl(355, 98%, 97%)',
  100: 'hsl(355, 98%, 93%)',
  200: 'hsl(355, 98%, 87%)',
  300: 'hsl(355, 98%, 80%)',
  400: 'hsl(355, 98%, 74%)',
  500: 'hsl(355, 98%, 66%)',
  main: 'hsl(355, 98%, 66%)',
  600: 'hsl(355, 98%, 46%)',
  700: 'hsl(355, 98%, 39%)',
  800: 'hsl(355, 98%, 29%)',
  900: 'hsl(355, 98%, 17%)',
};
export const success = {
  50: 'hsl(144, 72%, 95%)',
  100: 'hsl(144, 72%, 87%)',
  200: 'hsl(144, 72%, 77%)',
  300: 'hsl(144, 72%, 66%)',
  400: 'hsl(144, 72%, 56%)',
  500: 'hsl(144, 72%, 46%)',
  600: 'hsl(144, 72%, 41%)',
  700: 'hsl(144, 72%, 37%)',
  800: 'hsl(144, 72%, 32%)',
  900: 'hsl(144, 72%, 21%)',
};
export const warning = {
  50: 'hsl(48, 100%, 96%)',
  100: 'hsl(48, 100%, 88%)',
  200: 'hsl(48, 100%, 82%)',
  300: 'hsl(48, 100%, 64%)',
  400: 'hsl(48, 100%, 48%)',
  500: 'hsl(48, 100%, 44%)',
  main: 'hsl(48, 100%, 44%)',
  600: 'hsl(40, 100%, 40%)',
  700: 'hsl(36, 100%, 34%)',
  800: 'hsl(36, 100%, 27%)',
  900: 'hsl(36, 100%, 18%)',
};

const systemFont = [
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
];

// The variables come from `next/font` and add its metric-matched fallback faces.
// They are only set on the docs `<body>`, hence the `var()` fallbacks. The
// `--muidocs-font-*` theme variables resolve on `:root`, so they don't get the
// fallback faces. The family name goes first because Turbopack sets the variables
// to a different family name (https://github.com/vercel/next.js/issues/88894).
const fontFamilyIbmPlexSans = [
  '"IBM Plex Sans"',
  'var(--font-ibm-plex-sans, "IBM Plex Sans")',
  ...systemFont,
].join(',');
const fontFamilyGeneralSans = [
  '"General Sans"',
  'var(--font-general-sans, "General Sans")',
  ...systemFont,
].join(',');

export const getMetaThemeColor = (mode: 'light' | 'dark') => {
  const themeColor = {
    light: blue[600],
    dark: blueDark[900],
  };
  return themeColor[mode];
};

export const getDesignTokens = (mode: 'light' | 'dark') =>
  ({
    palette: {
      primary: {
        ...blue,
        ...(mode === 'dark' && {
          main: blue[400],
        }),
      },
      secondary: {
        ...grey,
        ...(mode === 'light' && {
          main: blueDark[100],
          contrastText: blueDark[600],
        }),
        ...(mode === 'dark' && {
          main: blueDark[700],
          contrastText: blueDark[600],
        }),
      },
      divider: mode === 'dark' ? alpha(blueDark[500], 0.3) : grey[100],
      primaryDark: blueDark,
      mode,
      ...(mode === 'dark' && {
        background: {
          default: blueDark[900],
          paper: alpha(blueDark[800], 0.8),
        },
      }),
      common: {
        black: 'hsl(200, 10%, 4%)',
      },
      text: {
        ...(mode === 'light' && {
          primary: grey[900],
          secondary: grey[800],
          tertiary: grey[700],
        }),
        ...(mode === 'dark' && {
          primary: '#fff',
          secondary: grey[400],
          tertiary: grey[500],
        }),
      },
      grey: {
        ...grey,
        ...(mode === 'light' && {
          main: grey[100],
          contrastText: grey[600],
        }),
        ...(mode === 'dark' && {
          main: grey[700],
          contrastText: grey[600],
        }),
      },
      error,
      success: {
        ...success,
        ...(mode === 'dark' && {
          main: success[600],
        }),
        ...(mode === 'light' && {
          main: success[700],
        }),
      },
      warning,
      gradients: {
        radioSubtle:
          mode === 'dark'
            ? `radial-gradient(100% 100% at 100% 100%, transparent 0, ${alpha(blue[900], 0.3)} 300%)`
            : `radial-gradient(100% 90% at 50% 0, transparent 0, ${alpha(blue[100], 0.3)} 300%)`,
        linearSubtle:
          mode === 'dark'
            ? `linear-gradient(0deg, ${alpha(blue[900], 0.1)}, ${alpha(blueDark[900], 0.5)})`
            : `linear-gradient(0deg, ${alpha(blue[50], 0.4)}, ${alpha(grey[50], 0.1)})`,
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    typography: {
      fontFamily: fontFamilyIbmPlexSans,
      // Match VS Code
      // https://github.com/microsoft/vscode/blob/b38691f611d1ce3ef437c67a1b047c757b7b4e53/src/vs/editor/common/config/editorOptions.ts#L4578-L4580
      // https://github.com/microsoft/vscode/blob/d950552131d7350a45dac8b59bf179469c36c2ac/src/vs/editor/standalone/browser/standalone-tokens.css#L10
      fontFamilyCode: [
        'Menlo', // macOS
        'Consolas', // Windows
        '"Droid Sans Mono"', // Linux
        'monospace', // fallback
      ].join(','),
      fontFamilyTagline: fontFamilyGeneralSans,
      fontFamilySystem: systemFont.join(','),
      fontWeightSemiBold: 600,
      fontWeightExtraBold: 800,
      h1: {
        fontFamily: fontFamilyGeneralSans,
        fontSize: 'clamp(2.5rem, 1.125rem + 3.5vw, 3.5em)',
        fontWeight: 600,
        lineHeight: 78 / 70,
        letterSpacing: -0.2,
        ...(mode === 'light' && {
          color: blueDark[900],
        }),
      },
      h2: {
        fontFamily: fontFamilyGeneralSans,
        fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
        fontWeight: 600,
        lineHeight: 44 / 36,
        letterSpacing: -0.2,
        color: mode === 'dark' ? grey[100] : blueDark[700],
      },
      h3: {
        fontFamily: fontFamilyGeneralSans,
        fontSize: defaultTheme.typography.pxToRem(36),
        lineHeight: 44 / 36,
        letterSpacing: 0.2,
      },
      h4: {
        fontFamily: fontFamilyGeneralSans,
        fontSize: defaultTheme.typography.pxToRem(30),
        lineHeight: 42 / 28,
        letterSpacing: 0.2,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(24),
        lineHeight: 36 / 24,
        letterSpacing: 0.1,
        color: mode === 'dark' ? blue[300] : blue.main,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(20),
        lineHeight: 30 / 20,
      },
      button: {
        textTransform: 'initial',
        fontWeight: 700,
        letterSpacing: 0,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        lineHeight: 24 / 18,
        letterSpacing: 0,
        fontWeight: 500,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(16),
        lineHeight: 24 / 16,
        letterSpacing: 0,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        lineHeight: 21 / 14,
        letterSpacing: 0,
      },
      caption: {
        display: 'inline-block',
        fontSize: defaultTheme.typography.pxToRem(12),
        lineHeight: 18 / 12,
        letterSpacing: 0,
        fontWeight: 700,
      },
      allVariants: {
        scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      },
    },
    /**
     * This utility exists to help transitioning to CSS variables page by page (prevent dark mode flicker).
     * It will use the proper styling method based on the theme because the component might be on the page that does not support CSS variables yet.
     *
     * 😓 Without this utility:
     * {
     *   ...theme.vars ? {
     *     color: theme.vars.palette.primary.main,
     *     [theme.getColorScheme('dark')]: {
     *       color: '#fff',
     *     }
     *   } : {
     *     color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
     *   }
     * }
     *
     * 🤩 Using the utility:
     * {
     *   color: (theme.vars || theme).palette.primary.main,
     *   ...theme.applyDarkStyles({
     *     color: '#fff',
     *   }),
     * }
     *
     * -------------------------------------------------------------------------------------------------
     * 💡 This util should be used in an array if the styles contain pseudo classes or nested selectors:
     *
     * ❌ There is a chance that the upper selectors could be overridden
     * {
     *    // the whole selector could be overridden
     *   '&::before': {
     *     color: ...
     *   },
     *   ...theme.applyDarkStyles({
     *      '&::before': {
     *        color: ...
     *      }
     *   })
     * }
     *
     * ✅ use an array (supports in both emotion and styled-components)
     * Only the `color` will be overridden in dark mode.
     *  [
     *    '&::before': {
     *      color: ...
     *    },
     *    theme.applyDarkStyles({
     *      '&::before': {
     *        color: ...
     *      }
     *    })
     *  ]
     */
    applyDarkStyles(css: Parameters<ApplyDarkStyles>[0]) {
      return (this as Theme).applyStyles('dark', css);
    },
  }) as ThemeOptions;

export function getThemedComponents(): ThemeOptions {
  return {
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ theme }) => ({
            padding: '16px',
            gap: '12px',
            fontSize: '1rem',
            '& * ul': { paddingLeft: '24px !important', marginBottom: '0 !important' }, // !important is used here to override the anchor tag color coming from MarkdownElement
            '& .MuiAlert-icon': {
              margin: 0,
              marginTop: '2px',
              padding: 0,
            },
            '& .MuiAlert-message': { padding: 0 },
            variants: [
              {
                // same styles from the MarkdownElement callout
                props: { variant: 'standard', color: 'warning' },
                style: [
                  {
                    backgroundColor: alpha(theme.palette.warning[50], 0.5),
                    color: (theme.vars || theme).palette.grey[900],
                    border: '1px solid',
                    borderColor: alpha(theme.palette.warning[700], 0.15),
                    '& .MuiAlert-icon': {
                      color: (theme.vars || theme).palette.warning[600],
                    },
                    '& * a': {
                      // !important is used here to override the anchor tag color coming from MarkdownElement
                      color: `${(theme.vars || theme).palette.warning[900]} !important`,
                      textDecorationColor: `${alpha(theme.palette.warning.main, 0.4)} !important`,
                      '&:hover': {
                        textDecorationColor: `${(theme.vars || theme).palette.warning[900]} !important`,
                      },
                    },
                  },
                  theme.applyDarkStyles({
                    backgroundColor: alpha(theme.palette.warning[700], 0.12),
                    color: (theme.vars || theme).palette.warning[50],
                    '& .MuiAlert-icon': {
                      color: (theme.vars || theme).palette.warning[400],
                    },
                    '& * a': {
                      color: `${(theme.vars || theme).palette.warning[100]} !important`,
                      textDecorationColor: `${alpha(theme.palette.warning[600], 0.4)} !important`,
                      '&:hover': {
                        textDecorationColor: `${(theme.vars || theme).palette.warning[600]} !important`,
                      },
                    },
                  }),
                ],
              },
              {
                // same styles from the MarkdownElement callout
                props: { variant: 'standard', color: 'success' },
                style: [
                  {
                    backgroundColor: alpha(theme.palette.success[50], 0.5),
                    color: (theme.vars || theme).palette.success[900],
                    border: `1px solid ${(theme.vars || theme).palette.success[100]}`,
                    '& .MuiAlert-icon': {
                      color: (theme.vars || theme).palette.success[600],
                    },
                    '& * a': {
                      // !important is used here to override the anchor tag color coming from MarkdownElement
                      color: `${(theme.vars || theme).palette.success[900]} !important`,
                      textDecorationColor: `${alpha(theme.palette.success.main, 0.4)} !important`,
                      '&:hover': {
                        textDecorationColor: `${(theme.vars || theme).palette.success[900]} !important`,
                      },
                    },
                  },
                  theme.applyDarkStyles({
                    backgroundColor: alpha(theme.palette.success[700], 0.12),
                    color: (theme.vars || theme).palette.success[50],
                    borderColor: alpha(theme.palette.success[400], 0.1),
                    '& .MuiAlert-icon': {
                      color: (theme.vars || theme).palette.success[500],
                    },
                    '& * a': {
                      color: `${(theme.vars || theme).palette.success[100]} !important`,
                      textDecorationColor: `${alpha(theme.palette.success[600], 0.4)} !important`,
                      '&:hover': {
                        textDecorationColor: `${(theme.vars || theme).palette.success[600]} !important`,
                      },
                    },
                  }),
                ],
              },
            ],
          }),
          icon: {
            paddingTop: 10,
            paddingBottom: 0,
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableTouchRipple: true,
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            transition: 'all 100ms ease-in',
            '&:focus-visible': {
              outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
              outlineOffset: 2,
            },
          }),
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            transition: 'all 120ms ease-in',
            ...(ownerState.size === 'large' && {
              ...theme.typography.body1,
              lineHeight: 1.5,
              fontWeight: theme.typography.fontWeightMedium,
              padding: theme.spacing('8px', '12px', '8px', '14px'),
              borderRadius: 10,
              '& > span': { transition: '0.2s', marginLeft: 4 },
              '&:hover > span': { transform: 'translateX(2px)' },
            }),
            ...(ownerState.size === 'medium' && {
              fontSize: defaultTheme.typography.pxToRem(15),
              fontWeight: theme.typography.fontWeightMedium,
              lineHeight: 1.25,
              padding: theme.spacing('8px', '10px', '10px', '12px'),
              borderRadius: 10,
              '& > span': { transition: '0.2s', marginLeft: 4 },
              '&:hover > span': { transform: 'translateX(2px)' },
            }),
            ...(ownerState.size === 'small' && {
              padding: '6px 10px',
              fontFamily: theme.typography.fontFamily,
              fontSize: defaultTheme.typography.pxToRem(13),
              fontWeight: theme.typography.fontWeightMedium,
              borderRadius: 10,
              '& .MuiButton-startIcon': {
                transition: '0.15s',
                marginRight: 4,
                marginLeft: -1,
              },
              '& .MuiButton-endIcon': {
                transition: '0.15s',
                marginLeft: 4,
              },
              '&:hover': {
                '& .MuiButton-startIcon': { transform: 'translateX(-2px)' },
                '& .MuiButton-endIcon': { transform: 'translateX(2px)' },
              },
            }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'secondary' && {
                color: (theme.vars || theme).palette.text.primary,
                backgroundColor: alpha(theme.palette.primaryDark[50], 0.1),
                borderColor: (theme.vars || theme).palette.primaryDark[100],
                boxShadow: `#FFF 0 1px 0 1px inset, ${alpha(theme.palette.grey[200], 0.4)} 0 -1px 0 1px inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[50],
                },
                '&:active': {
                  backgroundColor: (theme.vars || theme).palette.grey[100],
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primaryDark[100],
                  borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
                  boxShadow: `${alpha(theme.palette.primaryDark[700], 0.3)} 0 1px 0 1px inset, ${(theme.vars || theme).palette.common.black} 0 -1px 0 1px inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                  '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                    borderColor: (theme.vars || theme).palette.primaryDark[600],
                  },
                  '&:active': {
                    backgroundColor: (theme.vars || theme).palette.primaryDark[800],
                  },
                  '&.Mui-disabled:not(.MuiButton-loading)': {
                    color: theme.palette.grey[500],
                  },
                }),
              }),
            ...(ownerState.variant === 'outlined' &&
              ownerState.color === 'primary' && {
                color: (theme.vars || theme).palette.primary[600],
                backgroundColor: alpha(theme.palette.primary[50], 0.2),
                borderColor: (theme.vars || theme).palette.primary[100],
                boxShadow: `${alpha(theme.palette.primary[100], 0.4)} 0 -1px 0 1px inset, ${alpha(theme.palette.primary[100], 0.5)} 0 1px 2px 0`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[50],
                  borderColor: (theme.vars || theme).palette.primary[200],
                },
                '&:active': {
                  backgroundColor: alpha(theme.palette.primary[100], 0.7),
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[200],
                  borderColor: alpha(theme.palette.primary[900], 0.7),
                  backgroundColor: alpha(theme.palette.primary[900], 0.2),
                  boxShadow: `${alpha(theme.palette.primary[900], 0.2)} 0 1px 0 1px inset, ${(theme.vars || theme).palette.common.black} 0 -1px 0 1px inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.5),
                    borderColor: (theme.vars || theme).palette.primary[900],
                  },
                  '&:active': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.3),
                  },
                  '&.Mui-disabled:not(.MuiButton-loading)': {
                    background: 'none',
                    backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
                    color: theme.palette.grey[500],
                  },
                }),
              }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'primary' && {
                color: '#fff',
                textShadow: `0 1px 1px ${alpha(theme.palette.common.black, 0.6)}`,
                backgroundColor: (theme.vars || theme).palette.primary[500],
                backgroundImage: 'transparent',
                border: '1px solid ',
                borderColor: (theme.vars || theme).palette.primary[600],
                boxShadow: `${alpha(theme.palette.primary[400], 0.5)} 0 1px 0 inset, ${alpha(theme.palette.primary[800], 0.4)} 0 -1px 0 1px inset, ${alpha(theme.palette.common.black, 0.1)} 0 2px 4px 0`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[700],
                  borderColor: (theme.vars || theme).palette.primary[800],
                },
                '&:active': {
                  backgroundColor: (theme.vars || theme).palette.primary[800],
                  borderColor: (theme.vars || theme).palette.primary[600],
                  boxShadow: `${alpha(theme.palette.primary[900], 0.7)} 0 1px 0 1px inset`,
                },
                '&.Mui-disabled': {
                  color: theme.palette.grey[700],
                  textShadow: 'none',
                  borderColor: theme.palette.grey[400],
                },
                ...theme.applyDarkStyles({
                  '&.Mui-disabled:not(.MuiButton-loading)': {
                    color: theme.palette.grey[400],
                    textShadow: 'none',
                    borderColor: theme.palette.grey[800],
                  },
                }),
              }),
            ...(ownerState.variant === 'contained' &&
              ownerState.color === 'secondary' && {
                color: '#fff',
                textShadow: `0 1px 1px ${alpha(theme.palette.common.black, 0.6)}`,
                backgroundColor: (theme.vars || theme).palette.primaryDark[500],
                backgroundImage: 'transparent',
                border: '1px solid ',
                borderColor: (theme.vars || theme).palette.primaryDark[600],
                boxShadow: `${alpha(theme.palette.primaryDark[400], 0.5)} 0 1px 0 1px inset, ${alpha(theme.palette.primaryDark[800], 0.7)} 0 -1px 0 1px inset, ${alpha(theme.palette.common.black, 0.1)} 0 2px 4px 0`,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                  borderColor: (theme.vars || theme).palette.primaryDark[700],
                },
                '&:active': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                  boxShadow: `${alpha(theme.palette.primaryDark[900], 0.7)} 0 1px 0 1px inset`,
                },
                '&.Mui-disabled': {
                  color: theme.palette.grey[700],
                  textShadow: 'none',
                  borderColor: theme.palette.grey[400],
                },
                ...theme.applyDarkStyles({
                  '&.Mui-disabled:not(.MuiButton-loading)': {
                    color: theme.palette.grey[400],
                    textShadow: 'none',
                    borderColor: theme.palette.grey[800],
                  },
                }),
              }),
            ...(ownerState.variant === 'text' &&
              ownerState.color === 'secondary' && {
                color: (theme.vars || theme).palette.text.secondary,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[50],
                },
                '&:active': {
                  backgroundColor: (theme.vars || theme).palette.grey[200],
                },
                ...theme.applyDarkStyles({
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                  },
                  '&:active': {
                    backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                  },
                  '&.Mui-disabled': {
                    color: theme.palette.grey[500],
                  },
                }),
              }),
            ...(ownerState.variant === 'text' &&
              ownerState.color === 'primary' && {
                color: (theme.vars || theme).palette.primary[600],
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary[100], 0.3),
                },
                '&:active': {
                  backgroundColor: alpha(theme.palette.primary[100], 0.5),
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[300],
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.3),
                  },
                  '&:active': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.1),
                  },
                  '&.Mui-disabled:not(.MuiButton-loading)': {
                    color: theme.palette.grey[500],
                  },
                }),
              }),
          }),
        },
        variants: [
          {
            // @ts-expect-error: The branding theme defines the code variant without global Button variant augmentation.
            props: { variant: 'code' },
            style: ({ theme }) => [
              {
                cursor: 'copy',
                padding: 0,
                width: 'max-content',
                backgroundColor: 'transparent',
                color: (theme.vars || theme).palette.grey[600],
                fontFamily: theme.typography.fontFamilyCode,
                fontWeight: 400,
                fontSize: defaultTheme.typography.pxToRem(12),
                lineHeight: 21 / 14,
                letterSpacing: 0,
                WebkitFontSmoothing: 'subpixel-antialiased',
                '& .MuiButton-startIcon': {
                  color: (theme.vars || theme).palette.grey[400],
                },
                '& .MuiButton-endIcon': {
                  display: 'inline-block',
                  position: 'absolute',
                  color: (theme.vars || theme).palette.primary.main,
                  right: -22,
                  top: -1,
                  opacity: 0,
                  transitionProperty: 'opacity',
                  transitionDuration: '100ms',
                  transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                },
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: 'transparent',
                  color: (theme.vars || theme).palette.primary.main,
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary.main,
                    opacity: 1,
                  },
                },
              },
              theme.applyDarkStyles({
                '& .MuiButton-endIcon': {
                  color: (theme.vars || theme).palette.primary[300],
                },
                '&:hover, &.Mui-focusVisible': {
                  color: (theme.vars || theme).palette.primary[300],
                  '& .MuiButton-endIcon': {
                    opacity: 1,
                  },
                },
              }),
            ],
          },
          {
            // @ts-expect-error: The branding theme defines codeOutlined without global Button variant augmentation.
            props: { variant: 'codeOutlined' },
            style: ({ theme }) => [
              {
                display: 'inline-block',
                justifyContent: 'start',
                overflowX: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                position: 'relative',
                border: '1px solid',
                color: (theme.vars || theme).palette.grey[900],
                backgroundColor: alpha(theme.palette.primary[50], 0.3),
                borderColor: (theme.vars || theme).palette.grey[200],
                boxShadow: `0px 2px 2px ${alpha(
                  theme.palette.primary[100],
                  0.2,
                )}, inset 0px 4px 4px ${alpha(theme.palette.primary[100], 0.2)}`,
                fontFamily: theme.typography.fontFamilyCode,
                fontWeight: 400,
                fontSize: defaultTheme.typography.pxToRem(12),
                lineHeight: 21 / 14,
                letterSpacing: 0,
                WebkitFontSmoothing: 'subpixel-antialiased',
                '& .MuiButton-endIcon': {
                  display: 'inline-block',
                  position: 'absolute',
                  top: 12,
                  right: 0,
                  marginRight: 10,
                  color: (theme.vars || theme).palette.grey[600],
                },
                '&:hover, &.Mui-focusVisible': {
                  borderColor: (theme.vars || theme).palette.primary.main,
                  backgroundColor: (theme.vars || theme).palette.primary[50],
                  color: (theme.vars || theme).palette.primary[600],
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary.main,
                  },
                },
              } as const,
              theme.applyDarkStyles({
                color: (theme.vars || theme).palette.grey[500],
                borderColor: (theme.vars || theme).palette.primaryDark[600],
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                boxShadow: '0px 2px 2px #0B0D0E, inset 0px 4px 4px rgba(20, 25, 31, 0.3)',
                '& .MuiButton-endIcon': {
                  color: (theme.vars || theme).palette.grey[400],
                },
                '&:hover, &.Mui-focusVisible': {
                  backgroundColor: (theme.vars || theme).palette.primary[900],
                  color: (theme.vars || theme).palette.primary[100],
                  '& .MuiButton-endIcon': {
                    color: (theme.vars || theme).palette.primary[300],
                  },
                },
              }),
            ],
          },
          {
            // @ts-expect-error: The branding theme defines the link variant without global Button variant augmentation.
            props: { variant: 'link' },
            style: ({ theme }) => ({
              marginBottom: 1,
              fontSize: theme.typography.pxToRem(14),
              fontWeight: theme.typography.fontWeightBold,
              color: (theme.vars || theme).palette.primary[600],
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.primary[50],
              },
              ...theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary[800], 0.3),
                },
              }),
            }),
          },
        ],
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            borderRadius: theme.shape.borderRadius,
            transition: 'all 100ms ease-in',
            '&:hover': {
              borderColor: (theme.vars || theme).palette.grey[300],
              background: (theme.vars || theme).palette.grey[50],
              ...theme.applyDarkStyles({
                borderColor: (theme.vars || theme).palette.primaryDark[600],
                background: alpha(theme.palette.primaryDark[700], 0.8),
              }),
            },
            '&:active': {
              background: (theme.vars || theme).palette.grey[100],
              ...theme.applyDarkStyles({
                background: theme.palette.primaryDark[800],
              }),
            },
            ...(ownerState.size === 'small' && {
              height: 32,
              width: 32,
              '& .MuiSvgIcon-root': {
                fontSize: defaultTheme.typography.pxToRem(18),
              },
            }),
          }),
        },
        variants: [
          {
            props: { color: 'primary' },
            style: ({ theme }) => [
              {
                color: (theme.vars || theme).palette.primary.main,
                backgroundColor: alpha(theme.palette.primaryDark[50], 0.1),
                border: `1px solid ${(theme.vars || theme).palette.primaryDark[100]}`,
                boxShadow: `#FFF 0 1px 0 inset, ${alpha(theme.palette.grey[200], 0.4)} 0 -1px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.grey[300],
                  background: (theme.vars || theme).palette.grey[50],
                  boxShadow: `${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                },
                '&:active': {
                  background: (theme.vars || theme).palette.grey[100],
                },
              },
              theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
                borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
                boxShadow: `${alpha(theme.palette.primaryDark[600], 0.3)} 0 1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                  background: alpha(theme.palette.primaryDark[700], 0.8),
                  boxShadow: `${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                },
                '&:active': {
                  background: theme.palette.primaryDark[800],
                },
              }),
            ],
          },
          {
            props: { color: 'info' },
            style: ({ theme }) => [
              {
                color: (theme.vars || theme).palette.text.secondary,
                backgroundColor: alpha(theme.palette.primaryDark[50], 0.1),
                border: `1px solid ${(theme.vars || theme).palette.primaryDark[100]}`,
                boxShadow: `#FFF 0 1px 0 inset, ${alpha(theme.palette.grey[200], 0.4)} 0 -1px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                '&:hover': {
                  color: (theme.vars || theme).palette.text.primary,
                  borderColor: (theme.vars || theme).palette.grey[300],
                  background: (theme.vars || theme).palette.grey[50],
                  boxShadow: `${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                },
                '&:active': {
                  background: (theme.vars || theme).palette.grey[100],
                },
              },
              theme.applyDarkStyles({
                borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
                boxShadow: `${alpha(theme.palette.primaryDark[600], 0.3)} 0 1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                '&:hover': {
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                  background: alpha(theme.palette.primaryDark[700], 0.8),
                  boxShadow: `${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                },
                '&:active': {
                  background: theme.palette.primaryDark[800],
                },
              }),
            ],
          },
        ],
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => [
            {
              padding: '6px',
              minWidth: 160,
              color: (theme.vars || theme).palette.text.secondary,
              backgroundImage: 'none',
              border: '1px solid',
              backgroundColor: (theme.vars || theme).palette.background.paper,
              borderColor: (theme.vars || theme).palette.grey[200],
              '& .MuiMenu-list': {
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                '& .MuiDivider-root': {
                  margin: '4px -8px 4px -8px',
                },
              },
              '& .MuiMenuItem-root': {
                padding: '6px 8px',
                borderRadius: '6px',
                fontSize: theme.typography.pxToRem(14),
                fontWeight: theme.typography.fontWeightMedium,
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[100],
                  color: (theme.vars || theme).palette.text.primary,
                },
                '&:focus-visible': {
                  outline: 'none',
                },
                '&.Mui-selected': {
                  fontWeight: 500,
                  color: (theme.vars || theme).palette.primary[600],
                  backgroundColor: alpha(theme.palette.primary[100], 0.6),
                },
              },
            },
            theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              borderColor: (theme.vars || theme).palette.primaryDark[700],
              '& .MuiMenuItem-root': {
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                },
                '&.Mui-selected': {
                  color: (theme.vars || theme).palette.primary[200],
                  backgroundColor: alpha(theme.palette.primary[900], 0.4),
                },
              },
            }),
          ],
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
            ...theme.applyDarkStyles({
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
            }),
          }),
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: (theme.vars || theme).palette.divider,
          }),
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: ({ theme }) => ({
            display: 'inline-flex',
            alignItems: 'center',
            fontWeight: theme.typography.fontWeightSemiBold,
            '&.MuiTypography-body1 > svg': {
              marginTop: 2,
            },
            '& svg:last-child': {
              marginLeft: 2,
            },
            '&:focus-visible': {
              outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
              outlineOffset: 2,
            },
          }),
        },
        variants: [
          {
            props: { color: 'primary' },
            style: ({ theme }) => [
              {
                color: (theme.vars || theme).palette.primary[600],
                '&:hover': {
                  color: (theme.vars || theme).palette.primary[700],
                },
              },
              theme.applyDarkStyles({
                color: (theme.vars || theme).palette.primary[300],
                '&:hover': {
                  color: (theme.vars || theme).palette.primary[200],
                },
              }),
            ],
          },
        ],
      },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState: { color, variant }, theme }) => ({
            fontWeight: theme.typography.fontWeightSemiBold,
            paddingBottom: 0.2,
            ...(variant === 'outlined' &&
              color === 'default' && {
                backgroundColor: alpha(theme.palette.grey[50], 0.5),
                color: (theme.vars || theme).palette.grey[900],
                borderColor: (theme.vars || theme).palette.grey[200],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[100],
                  color: (theme.vars || theme).palette.grey[900],
                },
                ...theme.applyDarkStyles({
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
                  color: (theme.vars || theme).palette.grey[300],
                  borderColor: alpha(theme.palette.primaryDark[500], 0.5),
                  '&:hover': {
                    color: (theme.vars || theme).palette.grey[300],
                    backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                  },
                }),
              }),
            ...(variant === 'outlined' &&
              color === 'info' && {
                backgroundColor: alpha(theme.palette.grey[50], 0.5),
                color: (theme.vars || theme).palette.grey[900],
                borderColor: (theme.vars || theme).palette.grey[200],
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.grey[300],
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                }),
              }),
            ...(variant === 'outlined' &&
              color === 'primary' && {
                borderColor: (theme.vars || theme).palette.primary[100],
                backgroundColor: alpha(theme.palette.primary[100], 0.2),
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[300],
                  borderColor: alpha(theme.palette.primary[500], 0.2),
                  backgroundColor: alpha(theme.palette.primary[700], 0.2),
                }),
              }),
            ...(variant === 'outlined' &&
              color === 'success' && {
                borderColor: (theme.vars || theme).palette.success[100],
                backgroundColor: (theme.vars || theme).palette.success[50],
                color: (theme.vars || theme).palette.success[900],
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.success[300],
                  borderColor: alpha(theme.palette.success[300], 0.2),
                  background: alpha(theme.palette.success[800], 0.2),
                }),
              }),
            ...(variant === 'filled' && {
              ...(color === 'default' && {
                border: '1px solid transparent',
                color: (theme.vars || theme).palette.primary[700],
                backgroundColor: alpha(theme.palette.primary[100], 0.5),
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: alpha(theme.palette.primaryDark[500], 0.8),
                  '&:hover': {
                    backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                  },
                }),
              }),
              ...(color === 'primary' && {
                color: (theme.vars || theme).palette.primary[600],
                backgroundColor: alpha(theme.palette.primary[100], 0.4),
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
                '& .MuiChip-deleteIcon': {
                  color: (theme.vars || theme).palette.primary[600],
                  '&:hover': {
                    color: (theme.vars || theme).palette.primary[700],
                  },
                },
                '&.Mui-focusVisible': {
                  backgroundColor: (theme.vars || theme).palette.primary[200],
                },
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[100],
                  backgroundColor: alpha(theme.palette.primary[800], 0.5),
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary[900], 0.5),
                  },
                  '& .MuiChip-deleteIcon': {
                    color: (theme.vars || theme).palette.primary[100],
                    '&:hover': {
                      color: (theme.vars || theme).palette.primary[50],
                    },
                  },
                }),
              }),
            }),
            // for labelling product in the search
            // @ts-expect-error: The branding theme defines light without global Chip variant augmentation.
            ...(variant === 'light' && {
              ...(color === 'default' && {
                color: (theme.vars || theme).palette.primary[700],
                backgroundColor: alpha(theme.palette.primary[100], 0.3),
                ...theme.applyDarkStyles({
                  color: (theme.vars || theme).palette.primary[200],
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                }),
              }),
              ...(color === 'warning' && {
                color: (theme.vars || theme).palette.warning[900],
                backgroundColor: (theme.vars || theme).palette.warning[100],
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: (theme.vars || theme).palette.warning[900],
                }),
              }),
              ...(color === 'success' && {
                color: (theme.vars || theme).palette.success[900],
                backgroundColor: (theme.vars || theme).palette.success[100],
                ...theme.applyDarkStyles({
                  color: '#fff',
                  backgroundColor: (theme.vars || theme).palette.success[900],
                }),
              }),
            }),
          }),
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              padding: '8px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: theme.typography.pxToRem(14),
              color: theme.palette.grey[700],
              borderRadius: 0,
              '&:hover': {
                backgroundColor: theme.palette.grey[50],
              },
              '&.Mui-selected': {
                borderRadius: 10,
                border: '1px solid',
                color: (theme.vars || theme).palette.primary[500],
                borderColor: `${(theme.vars || theme).palette.primary[500]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
              },
            } as const,
            theme.applyDarkStyles({
              color: theme.palette.grey[300],
              '&:hover': {
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
              },
              '&.Mui-selected': {
                color: '#fff',
                borderColor: `${(theme.vars || theme).palette.primary[700]} !important`,
                backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[600],
                },
              },
            }),
          ],
        },
      },
      MuiSelect: {
        defaultProps: {
          IconComponent: ArrowDropDownRounded,
        },
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiSelect-filled ~ .MuiSelect-icon': {
              top: 'calc(50% - .25em)',
            },
            variants: [
              {
                props: { variant: 'outlined' },
                style: {
                  backgroundColor: alpha(theme.palette.primaryDark[50], 0.1),
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: `1px solid ${(theme.vars || theme).palette.primaryDark[100]}`,
                    boxShadow: `#FFF 0 1px 0 inset, ${alpha(theme.palette.grey[200], 0.4)} 0 -1px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                  },
                  '&:not(.Mui-focused):hover': {
                    background: (theme.vars || theme).palette.grey[50],
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: (theme.vars || theme).palette.grey[300],
                      boxShadow: `${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                    },
                  },
                  ...theme.applyDarkStyles({
                    color: (theme.vars || theme).palette.primary[300],
                    backgroundColor: alpha(theme.palette.primaryDark[700], 0.2),
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                      boxShadow: `${alpha(theme.palette.primaryDark[600], 0.3)} 0 1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                    },
                    '&:not(.Mui-focused):hover': {
                      background: alpha(theme.palette.primaryDark[700], 0.8),
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: (theme.vars || theme).palette.primaryDark[600],
                        boxShadow: `${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                      },
                    },
                  }),
                },
              },
              {
                props: { size: 'small' },
                style: {
                  minHeight: 32,
                  '& [role="combobox"]': {
                    paddingBlock: 5,
                  },
                },
              },
            ],
          }),
        },
      },
      MuiTab: {
        defaultProps: {
          disableTouchRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme, ownerState }) => [
            {
              backgroundImage: 'none',
              backgroundColor: '#fff',
              '&[href]': {
                textDecorationLine: 'none',
              },
              transition: theme.transitions.create(['border', 'box-shadow'], {
                duration: theme.transitions.duration.shortest,
              }),
              ...(ownerState.variant === 'outlined' && {
                display: 'block',
                borderColor: (theme.vars || theme).palette.grey[100],
                '&[href]': {
                  textDecorationLine: 'none',
                  boxShadow: `hsl(200, 0%, 100%) 0 2px 0 inset, ${alpha(theme.palette.grey[100], 0.3)} 0 -2px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
                  '&:hover': {
                    borderColor: (theme.vars || theme).palette.primary[200],
                    boxShadow: `0px 2px 8px ${(theme.vars || theme).palette.primary[100]}`,
                  },
                  '&:focus-visible': {
                    outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
                    outlineOffset: 2,
                  },
                },
                '&:is(a, button)': {
                  '&:hover': {
                    borderColor: (theme.vars || theme).palette.primary[200],
                    boxShadow: `0px 4px 16px ${(theme.vars || theme).palette.grey[200]}`,
                  },
                },
              }),
            },
            theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              ...(ownerState.variant === 'outlined' && {
                borderColor: (theme.vars || theme).palette.primaryDark[700],
                backgroundColor: alpha(theme.palette.primaryDark[800], 0.6),
                '&[href]': {
                  textDecorationLine: 'none',
                  boxShadow: `${alpha(theme.palette.primaryDark[700], 0.4)} 0 2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -2px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
                  '&:hover': {
                    borderColor: alpha(theme.palette.primary[600], 0.5),
                    boxShadow: `0px 2px 8px ${alpha(theme.palette.primary[900], 0.6)}`,
                  },
                },
                '&:is(a, button)': {
                  '&:hover': {
                    boxShadow: `0px 4px 24px ${(theme.vars || theme).palette.common.black}`,
                  },
                },
              }),
            }),
          ],
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            padding: theme.spacing(1, 2),
            borderColor: (theme.vars || theme).palette.divider,
            ...(ownerState.variant === 'head' && {
              color: (theme.vars || theme).palette.text.primary,
              fontWeight: 700,
            }),
            ...(ownerState.variant === 'body' && {
              color: (theme.vars || theme).palette.text.secondary,
            }),
          }),
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: '#fff',
            ...theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme, ownerState }) => [
            {
              textTransform: 'none',
              fontWeight: theme.typography.fontWeightMedium,
              color: (theme.vars || theme).palette.text.secondary,
              borderColor: theme.palette.grey[200],
              ...(ownerState.size === 'small' && {
                padding: '0.375rem 0.75rem',
              }),
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[700],
                borderColor: `${(theme.vars || theme).palette.primary[200]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
              },
            } as const,
            theme.applyDarkStyles({
              borderColor: theme.palette.primaryDark[700],
              '&:hover': {
                backgroundColor: alpha(theme.palette.primaryDark[600], 0.2),
              },
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[200],
                borderColor: `${(theme.vars || theme).palette.primary[800]} !important`,
                backgroundColor: alpha(theme.palette.primary[900], 0.4),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary[900], 0.8),
                  borderColor: `${(theme.vars || theme).palette.primary[400]} !important`,
                },
              },
            }),
          ],
        },
      },
      MuiTooltip: {
        defaultProps: {
          arrow: true,
        },
        styleOverrides: {
          tooltip: ({ theme }) => ({
            padding: '6px 8px',
            borderRadius: 6,
            backgroundColor: (theme.vars || theme).palette.grey[800],
            '& .MuiTooltip-arrow': {
              color: (theme.vars || theme).palette.grey[800],
            },
          }),
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: ({ theme }) => ({
            width: 32,
            height: 20,
            padding: 0,
            borderRadius: 10,
            '&:has(input:focus-visible)': {
              outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
              outlineOffset: 2,
            },
            '& .MuiSwitch-switchBase': {
              '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
              },
            },
          }),
          switchBase: {
            height: 20,
            width: 20,
            padding: 0,
            color: '#fff',
            '&.Mui-checked + .MuiSwitch-track': {
              opacity: 1,
            },
          },
          track: ({ theme }) => ({
            opacity: 1,
            borderRadius: 32,
            backgroundColor: theme.palette.grey[400],
            ...theme.applyDarkStyles({
              backgroundColor: theme.palette.grey[800],
            }),
          }),
          thumb: {
            flexShrink: 0,
            width: '14px',
            height: '14px',
          },
        },
      },
      MuiSnackbar: {
        styleOverrides: {
          root: ({ theme }) => ({
            '& .MuiSnackbarContent-root': {
              backgroundColor: '#FFF',
              color: (theme.vars || theme).palette.text.primary,
              fontWeight: theme.typography.fontWeightMedium,
              border: `1px solid ${(theme.vars || theme).palette.divider}`,
              boxShadow: `0 4px 16px ${alpha(theme.palette.grey[400], 0.2)}`,
              ...theme.applyDarkStyles({
                backgroundColor: (theme.vars || theme).palette.primaryDark[800],
                boxShadow: '0 4px 16px hsl(0, 100%, 1%)',
              }),
            },
          }),
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              textTransform: 'none',
              fontWeight: theme.typography.fontWeightSemiBold,
              color: theme.palette.grey[700],
              borderColor: theme.palette.grey[200],
              borderRadius: '8px',
              '&.Mui-selected': {
                color: (theme.vars || theme).palette.primary[500],
                borderColor: `${(theme.vars || theme).palette.primary[500]} !important`,
                backgroundColor: (theme.vars || theme).palette.primary[50],
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.primary[100],
                },
              },
            } as const,
            theme.applyDarkStyles({
              color: theme.palette.grey[200],
              borderColor: theme.palette.primaryDark[700],
              '&.Mui-selected': {
                color: theme.palette.primary[100],
                borderColor: `${(theme.vars || theme).palette.primary[700]} !important`,
                backgroundColor: alpha(theme.palette.primary[900], 0.5),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary[900], 0.8),
                },
              },
            }),
          ],
        },
      },
      MuiCssBaseline: {
        defaultProps: {
          enableColorScheme: true,
        },
        styleOverrides: {
          html: {
            overflowY: 'scroll',
            // TODO add support for it,
            // https://github.com/mui/material-ui/issues/40748
            // scrollbarGutter: 'stable',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            ...(ownerState.variant === 'elevation' && {
              border: '1px solid',
              borderColor: (theme.vars || theme).palette.grey[100],
              boxShadow: `${alpha(theme.palette.grey[200], 0.4)} 0 -1px 0 inset, ${alpha(theme.palette.grey[300], 0.5)} 0 1px 8px 0`,
              ...theme.applyDarkStyles({
                borderColor: (theme.vars || theme).palette.primaryDark[700],
                boxShadow: `${(theme.vars || theme).palette.common.black} 0 -1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 8px 0`,
              }),
            }),
          }),
        },
      },
    },
  };
}

export const brandingDarkTheme = createTheme({
  ...getDesignTokens('dark'),
  ...getThemedComponents(),
});

export const brandingLightTheme = createTheme({
  ...getDesignTokens('light'),
  ...getThemedComponents(),
});
