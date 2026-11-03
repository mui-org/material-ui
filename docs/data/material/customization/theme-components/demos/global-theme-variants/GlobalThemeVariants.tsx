import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    dashed: true;
  }
}

const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'dashed' },
              style: ({ theme }) => ({
                textTransform: 'none',
                border: `2px dashed ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
              }),
            },
            {
              props: { variant: 'dashed', color: 'secondary' },
              style: ({ theme }) => ({
                border: `2px dashed ${theme.palette.secondary.main}`,
                color: theme.palette.secondary.main,
              }),
            },
            {
              props: { variant: 'dashed', size: 'large' },
              style: {
                borderWidth: 4,
              },
            },
            {
              props: { variant: 'dashed', color: 'secondary', size: 'large' },
              style: {
                fontSize: 18,
              },
            },
          ],
        },
      },
    },
  },
});

export default function GlobalThemeVariants() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={customTheme}>
      <Button variant="dashed" sx={{ m: 1 }}>
        Dashed
      </Button>
      <Button variant="dashed" color="secondary" sx={{ m: 1 }}>
        Secondary
      </Button>
      <Button variant="dashed" size="large" sx={{ m: 1 }}>
        Large
      </Button>
      <Button variant="dashed" color="secondary" size="large" sx={{ m: 1 }}>
        Secondary large
      </Button>
    </ThemeProvider>
    // @focus-end
  );
}
