import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function KeepMountedLabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* @focus-start */}
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="keep mounted tabs example"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Item One" value="1" />
          <Tab label="Item Two" value="2" />
        </TabList>
        <TabPanel value="1" keepMounted>
          <TextField label="Item One input" />
        </TabPanel>
        <TabPanel value="2" keepMounted>
          <TextField label="Item Two input" />
        </TabPanel>
      </TabContext>
      {/* @focus-end */}
    </Box>
  );
}
