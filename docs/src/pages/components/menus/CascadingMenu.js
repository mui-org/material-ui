import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SubMenu from '@material-ui/core/SubMenu';
import useTheme from '@material-ui/styles/useTheme';

export default function CascadingMenu() {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const swapDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div>
      <Button
        aria-controls="cascading-menu"
        aria-haspopup="true"
        onClick={handleButtonClick}
      >
        Open Menu
      </Button>
      <Menu
        id="cascading-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: theme.direction === 'rtl' ? 'left' : 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          subMenu={
            <SubMenu>
              <MenuItem onClick={swapDarkMode}>View</MenuItem>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem onClick={handleClose}>75%</MenuItem>
                    <MenuItem onClick={handleClose}>100%</MenuItem>
                    <MenuItem onClick={handleClose}>125%</MenuItem>
                  </SubMenu>
                }
              >
                Zoom
              </MenuItem>
              <MenuItem onClick={handleClose}>Help</MenuItem>
            </SubMenu>
          }
        >
          Options
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
