import type { Overlays, StorageManager } from '@mui/material/styles';
import { extendTheme, ThemeProvider, styled, useTheme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      opacity: {
        inputPlaceholder: 0.1,
        inputUnderline: 0.1,
      },
      overlays: Array(25).fill('') as Overlays,
      palette: {
        AppBar: {
          darkBg: '',
          darkColor: '',
          defaultBg: '',
        },
        // @ts-expect-error: Palette mode accepts light or dark, not an empty string.
        mode: '',
        getContrastText: () => '',
        tonalOffset: 1,
      },
    },
    dark: {
      opacity: {},
      palette: {},
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.vars.palette.primary.main,
        }),
      },
    },
  },
});

const TestStyled = styled('div')(({ theme }) => ({
  // test that `theme.vars` works
  color: theme.vars.palette.primary.main,
  // test that `theme.getColorSchemeSelector` works
  [theme.getColorSchemeSelector('dark')]: {
    color: theme.vars.palette.common.onBackground,
  },
}));

function TestUseTheme() {
  const theme = useTheme();
  // test that `theme` from useTheme has access to CSS vars
  return <div style={{ background: theme.vars.palette.common.background }}>test</div>;
}

<ThemeProvider theme={customTheme}>
  <TestStyled
    sx={(theme) => ({
      // test that `theme` in sx has access to CSS vars
      [theme.getColorSchemeSelector('dark')]: {
        border: '1px solid',
        borderColor: theme.vars.palette.divider,
      },
    })}
  />
</ThemeProvider>;

<ThemeProvider theme={customTheme} storageManager={null} />;

const storageManager: StorageManager = () => {
  return {
    get: () => 'light',
    set: () => {},
    subscribe: () => () => {},
  };
};

<ThemeProvider theme={customTheme} storageManager={storageManager} />;
