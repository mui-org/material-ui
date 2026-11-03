
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { OtherProvider } from './contexts';
import Page from './pages';

const App = () => {
  return (
    <Providers>
      <MuiThemeProvider theme={createMuiTheme()}>
        <OtherProvider>
          <Page />
        </OtherProvider>
      </MuiThemeProvider>
    </Providers>
  );
};

export default App;
