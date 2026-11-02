import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`keep-mounted-tabpanel-${index}`}
      aria-labelledby={`keep-mounted-tab-${index}`}
      {...other}
    >
      <Box sx={{ p: 3 }}>{children}</Box>
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `keep-mounted-tab-${index}`,
    'aria-controls': `keep-mounted-tabpanel-${index}`,
  };
}

export default function KeepMountedStandardTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* @focus-start */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="keep mounted tabs example"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <TextField label="Item One input" />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TextField label="Item Two input" />
      </CustomTabPanel>
      {/* @focus-end */}
    </Box>
  );
}
