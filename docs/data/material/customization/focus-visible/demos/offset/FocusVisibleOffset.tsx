import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

const theme = createTheme({
  focusVisible: true,
  colorSchemes: { light: true, dark: true },
  components: {
    MuiButtonBase: { defaultProps: { disableRipple: true } },
    MuiMenuItem: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.Mui-focusVisible': theme.applyFocusVisible('outside'),
          borderRadius: theme.shape.borderRadius,
        }),
      },
    },
  },
});

export default function FocusVisibleOffset() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Paper sx={{ width: 220 }}>
        <MenuList
          sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, p: 0.5 }}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper>
    </ThemeProvider>
    // @focus-end
  );
}
