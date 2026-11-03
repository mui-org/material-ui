'use client';
import * as React from 'react';
import { ThemeContext } from '@mui/styled-engine';

function isObjectEmpty(obj: object) {
  return Object.keys(obj).length === 0;
}

function useThemeWithoutDefault<T = null>(defaultTheme: T = null as unknown as T): T {
  const contextTheme = React.useContext(ThemeContext as any) as any;
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}

export default useThemeWithoutDefault;
