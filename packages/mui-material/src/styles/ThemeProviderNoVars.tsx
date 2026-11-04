'use client';
import * as React from 'react';
import type { DefaultTheme } from '@mui/system';
import { ThemeProvider as SystemThemeProvider } from '@mui/system';
import THEME_ID from './identifier';

export interface ThemeProviderNoVarsProps<Theme = DefaultTheme> {
  children?: React.ReactNode;
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
}

export default function ThemeProviderNoVars<Theme = DefaultTheme>({
  theme: themeInput,
  ...props
}: ThemeProviderNoVarsProps<Theme>): React.ReactElement<ThemeProviderNoVarsProps<Theme>> {
  const scopedTheme = THEME_ID in themeInput ? themeInput[THEME_ID] : undefined;
  return (
    <SystemThemeProvider
      {...props}
      themeId={scopedTheme ? THEME_ID : undefined}
      theme={scopedTheme || themeInput}
    />
  );
}
