import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';

const data = [
  { icon: <People />, label: 'Authentication' },
  { icon: <Dns />, label: 'Database' },
  { icon: <PermMedia />, label: 'Storage' },
  { icon: <Public />, label: 'Hosting' },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function CustomizedList() {
  // @focus-start @padding 1
  const [open, setOpen] = React.useState(true);
  return (
    <Box sx={{ display: 'flex' }}>
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiListItemButton: {
              defaultProps: {
                disableTouchRipple: true,
              },
            },
          },
          palette: {
            mode: 'dark',
            primary: { main: 'rgb(102, 157, 246)' },
            background: { paper: 'rgb(5, 30, 52)' },
          },
        })}
      >
        <Paper elevation={0} sx={{ maxWidth: 256 }}>
          <FireNav component="nav" disablePadding>
            <ListItemButton component="a" href="#customized-list">
              <ListItemIcon sx={{ fontSize: 20 }}>🔥</ListItemIcon>
              <ListItemText
                sx={{ my: 0 }}
                primary="Firebash"
                slotProps={{
                  primary: {
                    sx: { fontSize: 20, fontWeight: 'medium', letterSpacing: 0 },
                  },
                }}
              />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Project Overview"
                  slotProps={{
                    primary: {
                      color: 'primary',
                      sx: { fontWeight: 'medium' },
                      variant: 'body2',
                    },
                  }}
                />
              </ListItemButton>
              <Tooltip title="Project Settings">
                <IconButton
                  size="large"
                  sx={{
                    '& svg': {
                      color: 'rgba(255,255,255,0.8)',
                      transition: '0.2s',
                      transform: 'translateX(0) rotate(0)',
                    },
                    '&:hover, &:focus': {
                      bgcolor: 'unset',
                      '& svg:first-of-type': {
                        transform: 'translateX(-4px) rotate(-20deg)',
                      },
                      '& svg:last-of-type': {
                        right: 0,
                        opacity: 1,
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      height: '80%',
                      display: 'block',
                      left: 0,
                      width: '1px',
                      bgcolor: 'divider',
                    },
                  }}
                >
                  <Settings />
                  <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider />
            <Box
              sx={[
                open
                  ? {
                      bgcolor: 'rgba(71, 98, 130, 0.2)',
                    }
                  : {
                      bgcolor: null,
                    },
                open
                  ? {
                      pb: 2,
                    }
                  : {
                      pb: 0,
                    },
              ]}
            >
              <ListItemButton
                alignItems="flex-start"
                onClick={() => setOpen(!open)}
                sx={[
                  {
                    px: 3,
                    pt: 2.5,
                  },
                  open
                    ? {
                        pb: 0,
                      }
                    : {
                        pb: 2.5,
                      },
                  open
                    ? {
                        '&:hover, &:focus': {
                          '& svg': {
                            opacity: 1,
                          },
                        },
                      }
                    : {
                        '&:hover, &:focus': {
                          '& svg': {
                            opacity: 0,
                          },
                        },
                      },
                ]}
              >
                <ListItemText
                  primary="Build"
                  secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: 15,
                        fontWeight: 'medium',
                        lineHeight: '20px',
                        mb: '2px',
                      },
                    },
                    secondary: {
                      noWrap: true,
                      sx: {
                        fontSize: 12,
                        lineHeight: '16px',
                        color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                      },
                    },
                  }}
                  sx={{ my: 0 }}
                />
                <KeyboardArrowDown
                  sx={[
                    {
                      mr: -1,
                      opacity: 0,
                      transition: '0.2s',
                    },
                    open
                      ? {
                          transform: 'rotate(-180deg)',
                        }
                      : {
                          transform: 'rotate(0)',
                        },
                  ]}
                />
              </ListItemButton>
              {open &&
                data.map((item) => (
                  <ListItemButton
                    key={item.label}
                    sx={{ py: 0, minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                  >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: { sx: { fontSize: 14, fontWeight: 'medium' } },
                      }}
                    />
                  </ListItemButton>
                ))}
            </Box>
          </FireNav>
        </Paper>
      </ThemeProvider>
    </Box>
  );
  // @focus-end
}
