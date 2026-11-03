import * as React from 'react';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

export default function ControlledTooltips() {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    // @focus-start @padding 2
    <Tooltip
      describeChild
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title="Add"
    >
      <Button>Controlled</Button>
    </Tooltip>
    // @focus-end
  );
}
