import Tabs from '@mui/material/Tabs';
import { Tabs as MyTabs } from '@mui/material';

<Tabs
  slots={{
    scrollButtons: CustomScrollButton
  }}
  slotProps={{
    scrollButtons: { disableRipple: true },
    indicator: { className: 'indicator' }
  }} />;

<MyTabs
  slots={{
    scrollButtons: CustomScrollButton
  }}
  slotProps={{
    scrollButtons: { disableRipple: true },
    indicator: { className: 'indicator' }
  }} />;

<Tabs
  slots={{ startScrollButtonIcon: CustomIcon, endScrollButtonIcon: CustomIcon2 }}
/>;

<MyTabs
  slots={{ startScrollButtonIcon: CustomIcon }}
/>;

<CustomTabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;
