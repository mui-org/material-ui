'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';

export default function TailwindDemo() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="my-4 flex w-full max-w-md flex-col gap-4">
      <div className="rounded-md bg-sky-100 p-4 text-sky-950 dark:bg-sky-950 dark:text-sky-100">
        Styled with Tailwind CSS utilities.
      </div>
      <Button variant="contained" className="bg-violet-600 text-white">
        Contained button
      </Button>
      <Slider
        className="my-2"
        defaultValue={30}
        classes={{ active: 'shadow-none' }}
        slotProps={{ thumb: { className: 'hover:shadow-none' } }}
        aria-label="Example slider"
      />
      <div>
        <Button
          id="demo-menu-button"
          aria-controls={open ? 'demo-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Menu
        </Button>
        <Menu
          id="demo-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          slotProps={{ list: { 'aria-labelledby': 'demo-menu-button' } }}
        >
          <MenuItem onClick={handleClose} className="py-2">
            Small item
          </MenuItem>
          <MenuItem onClick={handleClose} className="py-8">
            Large item
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}
