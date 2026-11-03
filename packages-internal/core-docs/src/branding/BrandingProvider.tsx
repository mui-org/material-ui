import * as React from 'react';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import { brandingDarkTheme, brandingLightTheme } from './brandingTheme';

export interface BrandingProviderProps {
  children: React.ReactNode;
  /**
   * If not `undefined`, the provider is considered nesting and does not render NextNProgressBar & CssBaseline
   */
  mode?: 'light' | 'dark';
}

export function BrandingProvider(props: BrandingProviderProps) {
  const { children, mode: modeProp } = props;
  const upperTheme = useTheme();
  const mode = modeProp || upperTheme.palette.mode;
  const theme = mode === 'dark' ? brandingDarkTheme : brandingLightTheme;
  return <ThemeProvider theme={modeProp ? () => theme : theme}>{children}</ThemeProvider>;
}
