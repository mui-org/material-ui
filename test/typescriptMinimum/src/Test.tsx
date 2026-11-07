import * as React from 'react';
import { Button as RootButton } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: { defaultProps: { variant: 'contained' } },
    MuiMenu: { defaultProps: { keepMounted: true } },
    MuiMenu2: {
      defaultProps: { modal: false },
    },
    MuiMenu2Popup: {
      defaultProps: { align: 'start' },
      styleOverrides: {
        root: ({ ownerState, theme: componentTheme }) => {
          ownerState.elevation satisfies number | undefined;
          // @ts-expect-error Owner state must retain the declared prop types.
          ownerState.elevation satisfies string;
          return { minWidth: componentTheme.spacing(20) };
        },
        positioner: { transition: 'none' },
      },
      variants: [{ props: { align: 'start' }, style: { color: 'navy' } }],
    },
    MuiMenu2Submenu: { defaultProps: { loopFocus: true } },
    MuiMenu2SubmenuPopup: {
      defaultProps: { side: 'inline-end' },
      styleOverrides: { root: { minWidth: 180 } },
    },
    MuiMenu2Item: {
      defaultProps: { dense: true },
      styleOverrides: { dense: { minHeight: 24 } },
    },
    MuiMenu2Trigger: { defaultProps: { openOnHover: true, delay: 200 } },
  },
});

createTheme({
  components: {
    MuiMenu2: {
      defaultProps: {
        // @ts-expect-error Theme defaults must retain the declared prop types.
        modal: 'false',
      },
    },
    MuiMenu2Trigger: {
      // @ts-expect-error The render element owns its styles.
      styleOverrides: { root: { color: 'red' } },
    },
  },
});

export default function Test() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  return (
    <ThemeProvider theme={theme}>
      <RootButton variant="text">Root import</RootButton>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ color: 'primary.main' }}>
        Open menu
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => setAnchorEl(null)}>Close menu</MenuItem>
      </Menu>
      {/* @ts-expect-error Invalid variants must still produce a type error. */}
      <Button variant="invalid" />
    </ThemeProvider>
  );
}
