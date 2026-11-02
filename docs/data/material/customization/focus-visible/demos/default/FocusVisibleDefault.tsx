import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

const theme = createTheme({
  focusVisible: true,
  colorSchemes: { light: true, dark: true },
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function FocusVisibleDefault() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Press <kbd>Tab</kbd> to move keyboard focus — the ring appears on focus.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Button variant="outlined">Outlined</Button>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Stack>
    </ThemeProvider>
    // @focus-end
  );
}
