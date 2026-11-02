import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  components: {
    MuiButton: {
      // Style sheet name ⚛️
      styleOverrides: {
        // Name of the rule
        root: {
          variants: [
            {
              props: { variant: 'text', color: 'primary' },
              style: {
                // Some CSS
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              },
            },
          ],
        },
      },
    },
  },
});

export default function GlobalCss() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Button>Overrides CSS</Button>
    </ThemeProvider>
    // @focus-end
  );
}
