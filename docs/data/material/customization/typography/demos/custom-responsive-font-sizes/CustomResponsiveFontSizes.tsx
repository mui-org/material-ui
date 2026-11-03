import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

export default function CustomResponsiveFontSizes() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Typography variant="h3">Responsive h3</Typography>
    </ThemeProvider>
    // @focus-end
  );
}
