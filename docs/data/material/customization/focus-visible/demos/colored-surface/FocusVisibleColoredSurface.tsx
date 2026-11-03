import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import SnackbarContent from '@mui/material/SnackbarContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({
  focusVisible: true,
  colorSchemes: { light: true, dark: true },
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function FocusVisibleColoredSurface() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Stack spacing={3} sx={{ alignItems: 'center' }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ alignSelf: 'center' }}
        >
          Press <kbd>Tab</kbd> — a background-colored box-shadow renders behind the
          outline so the ring stays visible on the colored surface.
        </Typography>
        <AppBar position="static" sx={{ borderRadius: 1 }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Title
            </Typography>
            <Button color="inherit">Login</Button>
            <IconButton color="inherit" aria-label="add">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Alert
          variant="filled"
          severity="error"
          action={
            <React.Fragment>
              <Button color="inherit" size="small">
                UNDO
              </Button>
              <IconButton color="inherit" size="small" aria-label="close">
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </React.Fragment>
          }
        >
          Something went wrong
        </Alert>
        <SnackbarContent
          message="Message sent"
          action={
            <Button color="inherit" size="small">
              UNDO
            </Button>
          }
        />
      </Stack>
    </ThemeProvider>
    // @focus-end
  );
}
