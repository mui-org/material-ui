import * as React from 'react';
import { DialogActions, Button } from '@mui/material';

function DialogActionsGap() {
  return (
    <DialogActions>
      <Button data-testid="child-1">Agree</Button>
      <Button data-testid="child-2" href="#">
        Agree
      </Button>
      <Button data-testid="child-3" component="span">
        Agree
      </Button>
      <div data-testid="child-4" />
    </DialogActions>
  );
}

export default DialogActionsGap;
