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
