import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    success: {
      main: '#ff0000',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        h1 {
          color: ${themeParam.palette.success.main};
        }
      `,
    },
  },
});

export default function OverrideCallbackCssBaseline() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1>h1 element</h1>
    </ThemeProvider>
    // @focus-end
  );
}
