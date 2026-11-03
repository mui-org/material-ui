import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    // Tell MUI what the font-size on the html element is.
    htmlFontSize: 10,
  },
});

export default function FontSizeTheme() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Typography>body1</Typography>
    </ThemeProvider>
    // @focus-end
  );
}
