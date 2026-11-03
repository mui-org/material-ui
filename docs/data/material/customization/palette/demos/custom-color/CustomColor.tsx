import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  palette: {
    neutral: {
      light: '#838fa2',
      main: '#64748b',
      dark: '#465161',
      contrastText: '#fff',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  // allow configuration using `createTheme()`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export default function CustomColor() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Button color="neutral" variant="contained">
        neutral
      </Button>
    </ThemeProvider>
    // @focus-end
  );
}
