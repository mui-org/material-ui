import { createTheme, ThemeProvider, Theme } from '@material-ui/core';

function App() {
  return (
    <ThemeProvider theme={createTheme()}>
      <div data-testid="foo" />
    </ThemeProvider>
  );
}
