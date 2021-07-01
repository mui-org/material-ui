import { useTheme as useThemeSystem } from '@material-ui/system';
import * as React from 'react';
import defaultTheme from './defaultTheme';

export default function useTheme() {
  const theme = useThemeSystem(defaultTheme);

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useDebugValue(theme);
  }

  return theme;
}
