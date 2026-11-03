import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import type { SnackbarCloseReason } from '@mui/material/Snackbar';

export default function DialogSnackbar() {
  // @focus-start @padding 1
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSnackbarOpen(false);
  };

  const handleSnackbarClose = (
    _event: React.SyntheticEvent | Event,
    reason: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setDialogOpen(true)}>Open dialog</Button>
      <Dialog
        open={dialogOpen}
        onClose={(_event, reason) => {
          if (reason === 'escapeKeyDown' && snackbarOpen) {
            setSnackbarOpen(false);
            return;
          }
          handleDialogClose();
        }}
        aria-labelledby="snackbar-dialog-title"
        aria-describedby="snackbar-dialog-description"
      >
        <DialogTitle id="snackbar-dialog-title">Snackbar in a dialog</DialogTitle>
        <DialogContent>
          <DialogContentText id="snackbar-dialog-description">
            Show the snackbar, then press Escape to close it. Press Escape again to
            close the dialog.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={() => setSnackbarOpen(true)}>Show snackbar</Button>
        </DialogActions>
        <Snackbar
          open={snackbarOpen}
          onClose={handleSnackbarClose}
          message="Press Escape to close this snackbar"
        />
      </Dialog>
    </React.Fragment>
  );
  // @focus-end
}
