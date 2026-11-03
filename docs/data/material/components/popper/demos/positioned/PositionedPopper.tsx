import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import type { PopperPlacementType } from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

export default function PositionedPopper() {
  // @focus-start @padding 1
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <Box sx={{ width: 500 }}>
      <Popper
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        sx={{ zIndex: 1200 }}
        open={open}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography sx={{ p: 2 }}>The content of the Popper.</Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClick('top-start')}>top-start</Button>
        <Button onClick={handleClick('top')}>top</Button>
        <Button onClick={handleClick('top-end')}>top-end</Button>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="column" sx={{ alignItems: 'flex-start' }}>
          <Button onClick={handleClick('left-start')}>left-start</Button>
          <Button onClick={handleClick('left')}>left</Button>
          <Button onClick={handleClick('left-end')}>left-end</Button>
        </Stack>
        <Stack direction="column" sx={{ alignItems: 'flex-end' }}>
          <Button onClick={handleClick('right-start')}>right-start</Button>
          <Button onClick={handleClick('right')}>right</Button>
          <Button onClick={handleClick('right-end')}>right-end</Button>
        </Stack>
      </Box>
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Button onClick={handleClick('bottom-start')}>bottom-start</Button>
        <Button onClick={handleClick('bottom')}>bottom</Button>
        <Button onClick={handleClick('bottom-end')}>bottom-end</Button>
      </Stack>
    </Box>
  );
  // @focus-end
}
