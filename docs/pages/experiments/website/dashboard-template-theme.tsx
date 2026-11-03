import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import { AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import AppTheme from 'docs/data/material/getting-started/templates/shared-theme/AppTheme';
import ColorModeIconDropdown from 'docs/data/material/getting-started/templates/shared-theme/ColorModeIconDropdown';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from 'docs/data/material/getting-started/templates/dashboard/theme/customizations';
import CustomDatePicker from 'docs/data/material/getting-started/templates/dashboard/components/CustomDatePicker';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function CustomTabPanel(props: { [x: string]: any; children: any; value: any; index: any }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function DashboardTemplateTheme() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [value, setValue] = React.useState(0);
  const handleChange = (_event: any, newValue: React.SetStateAction<number>) => {
    setValue(newValue);
  };

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline />
      <Head title="MUI Branding Theme Test" description="" />
      <Container
        component="main"
        maxWidth="xl"
        id="main-content"
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ alignItems: 'flex-end', justifyContent: 'space-between', gap: 2 }}
        >
          <Typography variant="h4" component="h1">
            Dashboard template theme
          </Typography>
          <ColorModeIconDropdown />
        </Stack>
        <Divider />
        <Stack direction="column" sx={{ gap: 2 }}>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" size="small">
              Contained
            </Button>
            <Button variant="outlined" size="small">
              Outlined
            </Button>
            <Button variant="text" size="small">
              Text
            </Button>
          </Stack>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
            <Button variant="contained" color="secondary">
              Contained
            </Button>
            <Button variant="outlined" color="secondary">
              Outlined
            </Button>
            <Button variant="text" color="secondary">
              Text
            </Button>
            <Button variant="contained" color="secondary" size="small">
              Contained
            </Button>
            <Button variant="outlined" color="secondary" size="small">
              Outlined
            </Button>
            <Button variant="text" color="secondary" size="small">
              Text
            </Button>
          </Stack>
          <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
            <IconButton>
              <NotificationsRoundedIcon />
            </IconButton>
            <IconButton size="small">
              <NotificationsRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Stack direction="row" sx={{ gap: 2 }}>
          <Card sx={{ width: 250 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                be•nev•o•lent
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
          <Card variant="outlined" sx={{ width: 250 }}>
            <CardContent>
              <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                Word of the Day
              </Typography>
              <Typography variant="h5" component="div">
                be•nev•o•lent
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
              <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Stack>
        <LinearProgress variant="determinate" value={50} sx={{ width: 250 }} />
        <Link href="/" sx={{ maxWidth: 'fit-content' }}>
          Link
        </Link>
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
          <IconButton size="small" onClick={handleClick} sx={{ maxWidth: 'fit-content' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>Add another account</MenuItem>
            <MenuItem onClick={handleClose}>Settings</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <CustomDatePicker />
        </Stack>
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
          <OutlinedInput placeholder="Outlined input" />
          <OutlinedInput size="small" placeholder="Outlined input" />
        </Stack>
        <Stack direction="row" sx={{ gap: 2, alignItems: 'center' }}>
          <Box
            sx={{
              height: 250,
              width: 250,
              backgroundColor: 'background.default',
              border: '1px dashed',
              borderColor: 'divider',
            }}
          />
          <Box
            sx={{
              height: 250,
              width: 250,
              backgroundColor: 'background.paper',
              border: '1px dashed',
              borderColor: 'divider',
            }}
          />
        </Stack>
        <Box sx={{ width: 'fit-content' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            Item One
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Container>
    </AppTheme>
  );
}
