import * as React from 'react';
import {
  unstable_createCssVarsProvider as createCssVarsProvider,
  unstable_prepareCssVars as prepareCssVars,
  styled,
} from '@mui/system';

type Theme = {
  colorSchemes: {
    light: typeof lightColorScheme;
    dark: typeof lightColorScheme;
  };
  palette: {
    colorScheme: 'light' | 'dark';
  } & (typeof lightColorScheme)['palette'];
} & ReturnType<typeof prepareCssVars>;

const lightColorScheme = {
  palette: {
    mode: 'light',
    primary: {
      default: '#3990FF',
      dark: '#02367D',
    },
    text: {
      default: '#111111',
    },
    // ... other colors
  },
};

const darkColorScheme = {
  palette: {
    mode: 'dark',
    primary: {
      default: '#265D97',
      dark: '#132F4C',
      main: '#5090D3',
    },
    text: {
      default: '#ffffff',
    },
    // ... other colors
  },
};

function extendTheme({ cssVarPrefix = 'system-demo' } = {}) {
  const colorSchemeSelector = 'data-system-demo-color-scheme';
  const { vars: themeVars, ...params } = prepareCssVars(
    {
      colorSchemes: {
        light: lightColorScheme,
        dark: darkColorScheme,
      },
    },
    {
      prefix: cssVarPrefix,
      colorSchemeSelector,
    },
  );
  const theme: Theme & { colorSchemeSelector: string } = {
    colorSchemeSelector,
    colorSchemes: {
      light: lightColorScheme,
      dark: darkColorScheme,
    },
    // ... any other objects independent of color-scheme,
    // like fontSizes, spacing etc
    vars: themeVars,
    palette: {
      ...lightColorScheme.palette,
      colorScheme: 'light',
    },
    ...params,
  };

  return theme;
}

const myCustomDefaultTheme = extendTheme();

const { CssVarsProvider, useColorScheme } = createCssVarsProvider({
  theme: myCustomDefaultTheme,
  modeStorageKey: 'system-demo-mode',
  defaultColorScheme: {
    light: 'light',
    dark: 'dark',
  },
});

const Button = styled('button')<{ theme?: Theme }>(({ theme }) => ({
  backgroundColor: theme.vars.palette.primary.default,
  border: `1px solid ${theme.vars.palette.primary.dark}`,
  color: theme.vars.palette.text.default,
  padding: 10,
  borderRadius: 5,
  fontWeight: 'bold',
}));

const WrapperDiv = styled('div')<{ theme?: Theme }>(({ theme }) => ({
  width: '100%',
  minHeight: 100,
  padding: 20,
  color: theme.vars.palette.text.default,
  backgroundColor: '#fff',
  '[data-system-demo-color-scheme="dark"] &': {
    backgroundColor: '#111',
  },
}));

function App() {
  // changes specific to this demo.
  const [shouldRender, setShouldRender] = React.useState(false);
  const { setMode, mode } = useColorScheme();
  const toggleMode = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  // to avoid hydration error in demo. unrelated to the actual implementation
  React.useEffect(() => {
    setShouldRender(true);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <WrapperDiv className="App">
      <div className="card">
        <h2>Current mode: {mode}</h2>
        <Button type="button" onClick={toggleMode}>
          Toggle Mode
        </Button>
      </div>
    </WrapperDiv>
  );
}

export default function CreateCssVarsProvider() {
  return (
    // @focus-start @padding 2
    <CssVarsProvider>
      <App />
    </CssVarsProvider>
    // @focus-end
  );
}
