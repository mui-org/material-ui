import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function MyComponent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
}

const theme = createTheme();

export default function ThemeHelper() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <MyComponent />
    </ThemeProvider>
    // @focus-end
  );
}
