import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const theme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});

export default function TypographyVariants() {
  return (
    <div>
      {/* @focus-start */}
      <ThemeProvider theme={theme}>
        <Typography variant="subtitle1">subtitle</Typography>
        <Typography>body1</Typography>
        <Button>Button</Button>
      </ThemeProvider>
      {/* @focus-end */}
    </div>
  );
}
