import * as React from 'react';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// testing docs/src/pages/customization/breakpoints/breakpoints.md

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
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
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'laptop',
      },
    },
  },
});

function MyContainer() {
  return (
    <ThemeProvider theme={theme}>
      hello
      <Container maxWidth="tablet">yooo</Container>
      <Dialog open maxWidth="tablet">
        <div />
      </Dialog>
    </ThemeProvider>
  );
}

theme.breakpoints.up('tablet');
// @ts-expect-error The augmentation removes this breakpoint.
theme.breakpoints.up('sm');
// @ts-expect-error This breakpoint does not exist.
theme.breakpoints.up('unknown');
