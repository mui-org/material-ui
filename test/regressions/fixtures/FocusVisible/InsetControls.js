import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Each control sits inside its real clipping container (Tabs scroller, scrolling Menu/List, Card,
// bounded BottomNavigation), so a regression in the ring inset shows up as a clipped ring. One
// control per family renders already focus-visible, so no driven test is needed.
const theme = createTheme({
  focusVisible: true,
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function InsetControls() {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ p: 2, width: 320 }}>
        <Tabs value={0}>
          <Tab className="Mui-focusVisible" label="One" />
          <Tab label="Two" />
        </Tabs>

        <Paper sx={{ maxHeight: 96, overflow: 'auto' }}>
          <MenuList>
            <MenuItem className="Mui-focusVisible">Menu item one</MenuItem>
            <MenuItem>Menu item two</MenuItem>
            <MenuItem>Menu item three</MenuItem>
          </MenuList>
        </Paper>

        <Paper sx={{ maxHeight: 96, overflow: 'auto' }}>
          <List disablePadding>
            <ListItemButton className="Mui-focusVisible">
              <ListItemText primary="List item one" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="List item two" />
            </ListItemButton>
          </List>
        </Paper>

        <Card>
          <CardActionArea className="Mui-focusVisible">
            <CardContent>
              <Typography>Card action area</Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        <Box sx={{ width: 320 }}>
          <BottomNavigation showLabels value={0}>
            <BottomNavigationAction
              className="Mui-focusVisible"
              label="Recents"
              icon={<RestoreIcon />}
            />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
          </BottomNavigation>
        </Box>
      </Stack>
    </ThemeProvider>
  );
}
