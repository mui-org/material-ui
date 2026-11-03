import * as React from 'react';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Portal from '@mui/material/Portal';
import type { SxProps } from '@mui/system';

export default function PortalClickAway() {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const styles: SxProps = {
    position: 'fixed',
    width: 200,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid',
    p: 1,
    bgcolor: 'background.paper',
  };

  return (
    // @focus-start @padding 2
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <button type="button" onClick={handleClick}>
          Open menu dropdown
        </button>
        {open ? (
          <Portal>
            <Box sx={styles}>
              Click me, I will stay visible until you click outside.
            </Box>
          </Portal>
        ) : null}
      </div>
    </ClickAwayListener>
    // @focus-end
  );
}
