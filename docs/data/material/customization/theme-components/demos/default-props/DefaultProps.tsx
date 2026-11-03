import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The default props to change
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

export default function DefaultProps() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Button>This button has disabled ripples.</Button>
    </ThemeProvider>
    // @focus-end
  );
}
