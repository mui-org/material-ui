
import { MuiThemeProvider, StyledEngineProvider, createMuiTheme } from '@material-ui/core';
import { OtherProvider } from './contexts';
import Page from './pages';

const App = () => {
  return (
    <Providers>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={createMuiTheme()}>
          <OtherProvider>
            <Page />
          </OtherProvider>
        </MuiThemeProvider>
      </StyledEngineProvider>
    </Providers>
  );
};

export default App;
