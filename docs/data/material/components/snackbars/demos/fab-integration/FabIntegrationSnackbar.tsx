import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';

export default function FabIntegrationSnackbar() {
  return (
    <React.Fragment>
      {/* @focus-start */}
      <CssBaseline />
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: theme.palette.background.paper },
        })}
      />
      <div>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              sx={{ mr: 2 }}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: 'inherit',
              }}
            >
              App bar
            </Typography>
          </Toolbar>
        </AppBar>
        <Fab
          color="secondary"
          sx={(theme) => ({
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
          })}
        >
          <AddIcon />
        </Fab>
        <Snackbar
          open
          autoHideDuration={6000}
          message="Archived"
          action={
            <Button color="inherit" size="small">
              Undo
            </Button>
          }
          sx={{ bottom: { xs: 90, sm: 0 } }}
        />
      </div>
      {/* @focus-end */}
    </React.Fragment>
  );
}
