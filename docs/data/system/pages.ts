import type { MuiPage } from '@mui/internal-core-docs/MuiPage';
import pagesApi from 'docs/data/system/pagesApi';

const pages: readonly MuiPage[] = [
  {
    pathname: '/system/getting-started-group',
    title: 'Getting started',
    children: [
      { pathname: '/system/getting-started', title: 'Overview' },
      { pathname: '/system/getting-started/installation' },
      { pathname: '/system/getting-started/usage' },
      { pathname: '/system/getting-started/the-sx-prop' },
      { pathname: '/system/getting-started/custom-components' },
      { pathname: '/system/getting-started/support' },
    ],
  },
  {
    pathname: '/style-utilities',
    children: [
      { pathname: '/system/properties' },
      { pathname: '/system/borders' },
      { pathname: '/system/display' },
      { pathname: '/system/flexbox' },
      { pathname: '/system/grid' },
      { pathname: '/system/palette' },
      { pathname: '/system/positions' },
      { pathname: '/system/shadows' },
      { pathname: '/system/sizing' },
      { pathname: '/system/spacing' },
      { pathname: '/system/screen-readers' },
      { pathname: '/system/typography' },
      { pathname: '/system/styled', title: 'styled' },
    ],
  },
  {
    pathname: '/system/react-',
    title: 'Components',
    children: [
      { pathname: '/system/react-box', title: 'Box' },
      { pathname: '/system/react-container', title: 'Container' },
      { pathname: '/system/react-grid', title: 'Grid' },
      { pathname: '/system/react-stack', title: 'Stack' },
    ],
  },
  {
    pathname: '/system/migration',
    title: 'Migration',
    children: [
      {
        pathname: '/system/migration/upgrade-to-v10',
        title: 'Upgrade to v10',
      },
      {
        pathname: '/system/migration/upgrade-to-v9',
        title: 'Upgrade to v9',
      },
      {
        pathname: '/system/migration/upgrade-to-v7',
        title: 'Upgrade to v7',
      },
      {
        pathname: '/system/migration/migrating-to-v6',
        title: 'Upgrade to v6',
      },
    ],
  },
  {
    title: 'APIs',
    pathname: '/system/api',
    children: pagesApi,
  },
  {
    pathname: '/system/experimental-api',
    title: 'Experimental APIs',
    children: [
      {
        pathname: '/system/experimental-api/configure-the-sx-prop',
        title: 'Configure the sx prop',
      },
      {
        pathname: '/system/experimental-api/css-theme-variables',
        title: 'CSS Theme Variables',
      },
    ],
  },
  {
    pathname: '/system/styles',
    title: 'Styles',
    legacy: true,
    children: [
      { pathname: 'https://v6.mui.com/system/styles/basics/', title: 'Basics' },
      { pathname: 'https://v6.mui.com/system/styles/advanced/', title: 'Advanced' },
      { pathname: 'https://v6.mui.com/system/styles/api/', title: 'APIs' },
    ],
  },
];

export default pages;
