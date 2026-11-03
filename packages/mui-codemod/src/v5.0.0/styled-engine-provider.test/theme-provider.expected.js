
import { ThemeProvider, StyledEngineProvider, createTheme } from '@material-ui/core/styles';
import { OtherProvider } from './contexts';
import Page from './pages';

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      (<ThemeProvider theme={createTheme()}>
        <OtherProvider>
          <Page />
        </OtherProvider>
      </ThemeProvider>)
    </StyledEngineProvider>
  );
};

export default App;
