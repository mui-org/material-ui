import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const theme = createTheme({
  focusVisible: {
    outlineWidth: 2,
    outlineOffset: 1,
    boxShadow: '0 0 0 1px #fff',
    insetOverrides: {
      boxShadow: 'inset 0 0 0 3px #fff',
    },
  },
  colorSchemes: { light: true, dark: true },
  // These demos opt out of the ripple, so the focus ring is the only keyboard indicator.
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function FocusVisibleInsetOverrides() {
  // @focus-start @padding 1
  const [cardTab, setCardTab] = React.useState(0);
  const [appBarTab, setAppBarTab] = React.useState(0);
  const handleCardChange = (event: React.SyntheticEvent, newValue: number) => {
    setCardTab(newValue);
  };
  const handleAppBarChange = (event: React.SyntheticEvent, newValue: number) => {
    setAppBarTab(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Typography variant="body2" color="text.secondary">
          Press <kbd>Tab</kbd> and the arrow keys. The button draws the ring outside.
          The menu items and tabs draw the outline at their edge, with a light line
          inside it.
        </Typography>
        <Card
          sx={{
            px: 3,
            minHeight: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Button variant="outlined">Tab to me</Button>
          <MenuList dense disablePadding>
            <MenuItem selected>Selected item</MenuItem>
            <MenuItem>Item</MenuItem>
          </MenuList>
          <Tabs value={cardTab} onChange={handleCardChange}>
            <Tab label="Tab one" />
            <Tab label="Tab two" />
          </Tabs>
        </Card>
        <AppBar position="static" sx={{ borderRadius: 1 }}>
          <Toolbar sx={{ gap: 3 }}>
            <Button variant="outlined" color="inherit">
              Tab to me
            </Button>
            <Tabs
              value={appBarTab}
              onChange={handleAppBarChange}
              textColor="inherit"
              indicatorColor="secondary"
            >
              <Tab label="Tab one" />
              <Tab label="Tab two" />
            </Tabs>
          </Toolbar>
        </AppBar>
      </Stack>
    </ThemeProvider>
  );
  // @focus-end
}
