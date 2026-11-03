import * as React from 'react';
import Popper from '@mui/material/Popper';
import type { PopperProps } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function VirtualElementPopper() {
  // @focus-start @padding 1
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<PopperProps['anchorEl']>(null);

  const previousAnchorElPosition = React.useRef<DOMRect>(undefined);

  React.useEffect(() => {
    if (anchorEl) {
      if (typeof anchorEl === 'object') {
        previousAnchorElPosition.current = anchorEl.getBoundingClientRect();
      } else {
        previousAnchorElPosition.current = anchorEl().getBoundingClientRect();
      }
    }
  }, [anchorEl]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseUp = () => {
    const selection = window.getSelection();

    // Resets when the selection has a length of 0
    if (!selection || selection.anchorOffset === selection.focusOffset) {
      handleClose();
      return;
    }

    const getBoundingClientRect = () => {
      if (selection.rangeCount === 0 && previousAnchorElPosition.current) {
        setOpen(false);
        return previousAnchorElPosition.current;
      }
      return selection.getRangeAt(0).getBoundingClientRect();
    };

    setOpen(true);

    setAnchorEl({ getBoundingClientRect });
  };

  const id = open ? 'virtual-element-popper' : undefined;

  return (
    <div onMouseLeave={handleClose}>
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
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        transition
        placement="bottom-start"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
  // @focus-end
}
