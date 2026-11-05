import * as React from 'react';
import type { GlobalStylesProps as SCGlobalStylesProps } from '@mui/styled-engine-sc';
import { GlobalStyles as SCGlobalStyles } from '@mui/styled-engine-sc';

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
  styles: SCGlobalStylesProps<Theme>['styles'];
}

function GlobalStyles(props: GlobalStylesProps): React.JSX.Element {
  return <SCGlobalStyles {...props} defaultTheme={defaultTheme} />;
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
