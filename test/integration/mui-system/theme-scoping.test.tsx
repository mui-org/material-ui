import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, screen } from '@mui/internal-test-utils';
import { ThemeContext } from '@mui/styled-engine';
import * as material from '@mui/material';

// simulate 3rd-party library like Theme-UI, Chakra-UI, or Mantine
interface LibTheme {
  palette: { brand: string };
  vars: { palette: { brand: string } };
}
function LibThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const theme = React.useMemo<LibTheme>(
    () => ({ palette: { brand: '#ff5252' }, vars: { palette: { brand: 'var(--palette-brand)' } } }),
    [],
  );
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

function LibComponent() {
  const theme = React.useContext(ThemeContext as unknown as React.Context<LibTheme>);
  return <div style={{ color: theme.palette.brand }} />;
}

const materialTheme = material.createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          mixBlendMode: 'darken',
        }),
      },
    },
  },
});
const CustomMaterial = material.styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
}));

describe('Multiple nested theme providers', () => {
  const { render } = createRenderer();
  let originalMatchmedia: any;
  let storage: Record<string, string> = {};
  const createMatchMedia = (matches: boolean) => () => ({
    matches,
    // Keep mocking legacy methods because @mui/material v5 still uses them
    addListener: () => {},
    addEventListener: () => {},
    removeListener: () => {},
    removeEventListener: () => {},
  });

  beforeEach(() => {
    originalMatchmedia = window.matchMedia;

    // Create mocks of localStorage getItem and setItem functions
    Object.defineProperty(globalThis, 'localStorage', {
      value: {
        getItem: spy((key) => storage[key]),
        setItem: spy((key, value) => {
          storage[key] = value;
        }),
      },
      configurable: true,
    });

    // clear the localstorage
    storage = {};
    window.matchMedia = createMatchMedia(false) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchmedia;
  });

  it('Material UI works with 3rd-party lib', () => {
    render(
      <LibThemeProvider>
        <material.ThemeProvider theme={{ [material.THEME_ID]: materialTheme }}>
          <material.Button>Material</material.Button>
          <CustomMaterial /> {/* styled() should work with theme scoping */}
          <LibComponent />{' '}
          {/* still able to render even though it is wrapped in Material UI ThemeProvider */}
        </material.ThemeProvider>
      </LibThemeProvider>,
    );

    expect(screen.getByText('Material')).to.have.class(material.buttonClasses.outlined);
    expect(screen.getByText('Material')).to.have.class(material.buttonClasses.colorPrimary);
  });
});
