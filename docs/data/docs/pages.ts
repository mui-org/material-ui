import type { MuiPage } from '@mui/internal-core-docs/MuiPage';
import { standardNavIcons } from '@mui/internal-core-docs/AppLayout';

const pages: readonly MuiPage[] = [
  {
    pathname: 'https://mui.com/store/',
    title: 'Templates',
    icon: standardNavIcons.ReaderIcon,
    linkProps: {
      'data-ga-event-category': 'store',
      'data-ga-event-action': 'click',
      'data-ga-event-label': 'sidenav',
    },
  },
  { pathname: 'https://mui.com/blog/', title: 'Blog', icon: standardNavIcons.BookIcon },
];

export default pages;
