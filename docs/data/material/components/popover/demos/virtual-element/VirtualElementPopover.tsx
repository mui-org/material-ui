import * as React from 'react';
import Popover from '@mui/material/Popover';
import type { PopoverProps } from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export default function VirtualElementPopover() {
  // @focus-start @padding 1
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<PopoverProps['anchorEl']>(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();

    // Skip if selection has a length of 0
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      return;
    }

    const getBoundingClientRect = () => {
      return selection.getRangeAt(0).getBoundingClientRect();
    };

    setOpen(true);

    setAnchorEl({ getBoundingClientRect, nodeType: 1 });
  };

  const id = open ? 'virtual-element-popover' : undefined;

  return (
    <div>
      <Typography aria-describedby={id} onMouseUp={handleMouseUp}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ipsum purus,
        bibendum sit amet vulputate eget, porta semper ligula. Donec bibendum
        vulputate erat, ac fringilla mi finibus nec. Donec ac dolor sed dolor
        porttitor blandit vel vel purus. Fusce vel malesuada ligula. Nam quis
        vehicula ante, eu finibus est. Proin ullamcorper fermentum orci, quis finibus
        massa. Nunc lobortis, massa ut rutrum ultrices, metus metus finibus ex, sit
        amet facilisis neque enim sed neque. Quisque accumsan metus vel maximus
        consequat. Suspendisse lacinia tellus a libero volutpat maximus.
      </Typography>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        onClose={handleClose}
        disableAutoFocus
      >
        <Paper>
          <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
        </Paper>
      </Popover>
    </div>
  );
  // @focus-end
}
