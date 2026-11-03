import * as React from 'react';
import type { GlobalStylesProps as EmGlobalStylesProps } from '@mui/styled-engine';
import { GlobalStyles as EmGlobalStyles } from '@mui/styled-engine';

interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
}

const defaultTheme: Theme = {
  colors: {
    primary: '#f00',
    secondary: '#ff00',
  },
};

export interface GlobalStylesProps {
  /**
   * The styles you want to apply globally.
   */
  styles: EmGlobalStylesProps<Theme>['styles'];
}

function GlobalStyles(props: GlobalStylesProps): React.JSX.Element {
  return <EmGlobalStyles {...props} defaultTheme={defaultTheme} />;
}

function Test() {
  <GlobalStyles
    styles={(theme) => ({
      color: theme.colors.primary,
      // @ts-expect-error tertiary color doesn't exist
      backgroundColor: theme.colors.tertiary,
    })}
  />;
}
