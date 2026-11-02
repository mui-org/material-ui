import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { green, orange } from '@mui/material/colors';

const outerTheme = createTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

export default function ThemeNestingExtend() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={outerTheme}>
      <Checkbox defaultChecked color="secondary" />
      <ThemeProvider
        theme={(theme: Theme) =>
          createTheme({
            ...theme,
            palette: {
              ...theme.palette,
              primary: {
                main: green[500],
              },
            },
          })
        }
      >
        <Checkbox defaultChecked />
        <Checkbox defaultChecked color="secondary" />
      </ThemeProvider>
    </ThemeProvider>
    // @focus-end
  );
}
