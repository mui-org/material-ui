import Tabs from '@org/ui/material/Tabs';
import { Tabs as MyTabs } from '@org/ui/material';

<Tabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;

<MyTabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;

<Tabs
  slots={{ StartScrollButtonIcon: CustomIcon, EndScrollButtonIcon: CustomIcon2 }}
/>;

<CustomTabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;
