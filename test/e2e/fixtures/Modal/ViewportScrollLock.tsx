import * as React from 'react';
import Dialog from '@mui/material/Dialog';

export default function ViewportScrollLock() {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ height: '300vh' }}>
      <button type="button" onClick={() => setOpen(true)}>
        Open dialog
      </button>
      <Dialog open={open} transitionDuration={0}>
        <button type="button" onClick={() => setOpen(false)}>
          Close dialog
        </button>
      </Dialog>
    </div>
  );
}
