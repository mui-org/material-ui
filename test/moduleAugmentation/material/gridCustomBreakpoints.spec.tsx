import * as React from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
});

<ThemeProvider theme={theme}>
  <Grid
    size={{
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 4,
    }}
  />
</ThemeProvider>;

<ThemeProvider theme={theme}>
  <Grid
    size={{
      mobile: 1,
      tablet: 2,
      laptop: 3,
      /* @ts-expect-error unknown desk */
      desk: 4,
    }}
  />
</ThemeProvider>;
