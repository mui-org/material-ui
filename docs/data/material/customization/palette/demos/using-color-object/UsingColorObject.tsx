import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

export default function UsingColorObject() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Button variant="contained">Primary</Button>
      <Button variant="contained" color="secondary" sx={{ ml: 2 }}>
        Secondary
      </Button>
    </ThemeProvider>
    // @focus-end
  );
}
