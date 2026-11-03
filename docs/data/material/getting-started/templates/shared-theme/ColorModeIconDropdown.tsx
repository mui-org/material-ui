import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import Box from '@mui/material/Box';
import type { IconButtonOwnProps } from '@mui/material/IconButton';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useColorScheme } from '@mui/material/styles';

export default function ColorModeIconDropdown(props: IconButtonOwnProps) {
  const { mode, systemMode, setMode } = useColorScheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMode = (targetMode: 'system' | 'light' | 'dark') => () => {
    setMode(targetMode);
    handleClose();
  };
  if (!mode) {
    return (
      <Box
        data-screenshot="toggle-mode"
        sx={(theme) => ({
          verticalAlign: 'bottom',
          display: 'inline-flex',
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: '1px solid',
          borderColor: (theme.vars || theme).palette.divider,
        })}
      />
    );
  }
  const resolvedMode = (systemMode || mode) as 'light' | 'dark';
  const icon = {
    light: <LightModeIcon />,
    dark: <DarkModeIcon />,
  }[resolvedMode];
  return (
    <React.Fragment>
      <IconButton
        data-screenshot="toggle-mode"
        onClick={handleClick}
        disableRipple
        size="small"
        aria-controls={open ? 'color-scheme-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        {...props}
      >
        {icon}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            variant: 'outlined',
            elevation: 0,
            sx: {
              my: '4px',
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem selected={mode === 'system'} onClick={handleMode('system')}>
          System
        </MenuItem>
        <MenuItem selected={mode === 'light'} onClick={handleMode('light')}>
          Light
        </MenuItem>
        <MenuItem selected={mode === 'dark'} onClick={handleMode('dark')}>
          Dark
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
