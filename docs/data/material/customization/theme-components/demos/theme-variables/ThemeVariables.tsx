import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
});

export default function ThemeVariables() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Button>font-size: 1rem</Button>
    </ThemeProvider>
    // @focus-end
  );
}
