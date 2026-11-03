'use client';
import * as React from 'react';
import type { DefaultTheme } from '../defaultTheme';
import ThemeContext from './ThemeContext';

export default function useTheme<T = DefaultTheme>(): T {
  const theme = React.useContext(ThemeContext);

  if (process.env.NODE_ENV !== 'production') {
    // TODO: uncomment once we enable eslint-plugin-react-compiler eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/rules-of-hooks -- It's not required to run React.useDebugValue in production
    React.useDebugValue(theme);
  }

  return theme;
}
