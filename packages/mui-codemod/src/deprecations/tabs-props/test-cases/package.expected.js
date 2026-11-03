import Tabs from '@org/ui/material/Tabs';
import { Tabs as MyTabs } from '@org/ui/material';

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

<CustomTabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;
