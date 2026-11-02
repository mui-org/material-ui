import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

// Merge over the curated default: recolor only, width and offset stay at 2px.
const theme = createTheme({
  focusVisible: { outlineColor: '#9c27b0' },
  colorSchemes: { light: true, dark: true },
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function FocusVisibleRecolor() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Button variant="outlined">Tab to me</Button>
    </ThemeProvider>
    // @focus-end
  );
}
