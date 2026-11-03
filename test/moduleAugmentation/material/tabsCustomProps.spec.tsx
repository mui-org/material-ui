import * as React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Tabs' {
  interface TabsPropsIndicatorColorOverrides {
    success: true;
  }
  interface TabsPropsVariantOverrides {
    halfWidth: true;
  }
}

// theme typings should work as expected
const theme = createTheme({
  components: {
    MuiTabs: {
      variants: [
        {
          props: { indicatorColor: 'success' },
          style: {
            backgroundColor: '#e70000',
          },
        },
        {
          props: { variant: 'halfWidth' },
          style: {
            width: '50%',
          },
        },
      ],
    },
  },
});

<Tabs indicatorColor="success">
  <Tab label="Item One" />
  <Tab label="Item Two" />
</Tabs>;

<Tabs variant="halfWidth">
  <Tab label="Item One" />
  <Tab label="Item Two" />
</Tabs>;

// @ts-expect-error unknown indicatorColor
<Tabs indicatorColor="error">
  <Tab label="Item One" />
  <Tab label="Item Two" />
</Tabs>;
