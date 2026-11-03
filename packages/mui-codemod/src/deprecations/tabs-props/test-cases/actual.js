import Tabs from '@mui/material/Tabs';
import { Tabs as MyTabs } from '@mui/material';

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

<MyTabs
  slots={{ StartScrollButtonIcon: CustomIcon }}
/>;

<CustomTabs
  ScrollButtonComponent={CustomScrollButton}
  TabScrollButtonProps={{ disableRipple: true }}
  TabIndicatorProps={{ className: 'indicator' }}
/>;
