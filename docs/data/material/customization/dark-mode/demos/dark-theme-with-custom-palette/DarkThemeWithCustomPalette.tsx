import Box from '@mui/material/Box';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import type { PaletteMode } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      ...amber,
      ...(mode === 'dark' && {
        main: amber[300],
      }),
    },
    ...(mode === 'dark' && {
      background: {
        default: deepOrange[900],
        paper: deepOrange[900],
      },
    }),
    text: {
      ...(mode === 'light'
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: '#fff',
            secondary: grey[500],
          }),
    },
  },
});

function MyApp() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 1,
        p: 3,
      }}
    >
      This is a {theme.palette.mode} mode theme with custom palette
    </Box>
  );
}

const darkModeTheme = createTheme(getDesignTokens('dark'));

export default function DarkThemeWithCustomPalette() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={darkModeTheme}>
      <MyApp />
    </ThemeProvider>
    // @focus-end
  );
}
