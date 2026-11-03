import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { ThemeProvider, createTheme, useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DemoInstanceThemeProvider } from './DemoThemeProviders';

function DarkMode() {
  const { mode, setMode } = useColorScheme();
  return <button onClick={() => setMode('dark')}>{mode}</button>;
}

function UpperProvider({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider
      storageManager={null}
      defaultMode="light"
      theme={createTheme({ colorSchemes: { light: true, dark: true } })}
    >
      <DarkMode />
      {children}
    </ThemeProvider>
  );
}

describe('docs demo theming', () => {
  const { render } = createRenderer();

  it('should inherit the theme.palette.mode from upper theme', () => {
    render(
      <UpperProvider>
        <DemoInstanceThemeProvider runtimeTheme={undefined}>
          <Box
            data-testid="foo"
            sx={(theme) => ({
              mixBlendMode: theme.palette.mode === 'dark' ? 'darken' : 'lighten',
            })}
          />
        </DemoInstanceThemeProvider>
      </UpperProvider>,
    );

    expect(screen.getByRole('button')).to.have.text('light');
    expect(screen.getByTestId('foo')).toHaveComputedStyle({ mixBlendMode: 'lighten' });

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByRole('button')).to.have.text('dark');
    expect(screen.getByTestId('foo')).toHaveComputedStyle({ mixBlendMode: 'darken' });
  });
});
