
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { OtherProvider } from './contexts';
import Page from './pages';

const App = () => {
  return (
    <ThemeProvider theme={createTheme()}>
      <OtherProvider>
        <Page />
      </OtherProvider>
    </ThemeProvider>
  );
};

export default App;
