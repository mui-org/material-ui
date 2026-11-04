import * as React from 'react';
import type { OverridableStringUnion } from '@mui/types';
import { unstable_createCssVarsProvider as createCssVarsProvider } from '@mui/system';

interface JoyColorSchemeOverrides {}

type JoyExtendedColorScheme = OverridableStringUnion<never, JoyColorSchemeOverrides>;

type JoyColorScheme = 'light' | 'dark' | JoyExtendedColorScheme;

interface JoyThemeInput {
  colorSchemes?: Partial<Record<JoyColorScheme, { palette?: { primary?: { main?: string } } }>>;
  fontSize?: { md?: string };
}

// Simulate color scheme extending, same as module augmentation in real application
interface JoyColorSchemeOverrides {
  comfort: true;
  trueDark: true;
}

const extendTheme = (themeInput: JoyThemeInput) =>
  ({
    colorSchemes: {
      light: { palette: { primary: { main: '' } } },
      dark: { palette: { primary: { main: '' } } },
    },
    fontSize: { md: '' },
  }) as {
    colorSchemes: Record<JoyColorScheme, { palette: { primary: { main: string } } }>;
    fontSize: { md: string };
  };

const { CssVarsProvider, useColorScheme } = createCssVarsProvider<JoyColorScheme>({
  defaultColorScheme: 'light',
  theme: {
    fontSize: {
      md: '1rem',
    },
    colorSchemes: {
      light: {
        palette: {
          primary: {
            500: '#007FFF',
          },
        },
      },
    },
  },
});

function Content() {
  const { setColorScheme } = useColorScheme();
  React.useEffect(() => {
    // @ts-expect-error 'yellow' is not typed in JoyExtendedColorScheme
    setColorScheme('yellow');

    setColorScheme('comfort');
    setColorScheme('light');
  }, [setColorScheme]);
  return null;
}

function App() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        colorSchemes: {
          comfort: {},
          trueDark: {},
          // @ts-expect-error `yellow` is not an extended color scheme
          yellow: {},
        },
      })}
    />
  );
}

function App2() {
  return (
    <CssVarsProvider
      theme={extendTheme({
        colorSchemes: {
          comfort: {},
          trueDark: {},
        },
        // @ts-expect-error `fontSize` should be an object
        fontSize: '12px',
      })}
      // @ts-expect-error `yellow` is not an extended color scheme
      defaultColorScheme="yellow"
    />
  );
}
