import Grid from '@mui/material/Grid';
import { ComponentShowcaseCard } from '@mui/internal-core-docs/AppLayout';

const navigationComponents = [
  {
    name: 'Bottom Navigation',
    srcLight: '/static/material-ui/react-components/bottomnav-light.png',
    srcDark: '/static/material-ui/react-components/bottomnav-dark.png',
    link: '/material-ui/react-bottom-navigation/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Breadcrumbs',
    srcLight: '/static/material-ui/react-components/breadcrumbs-light.png',
    srcDark: '/static/material-ui/react-components/breadcrumbs-dark.png',
    link: '/material-ui/react-breadcrumbs/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Drawer',
    srcLight: '/static/material-ui/react-components/drawer-light.png',
    srcDark: '/static/material-ui/react-components/drawer-dark.png',
    link: '/material-ui/react-drawer/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Link',
    srcLight: '/static/material-ui/react-components/link-light.png',
    srcDark: '/static/material-ui/react-components/link-dark.png',
    link: '/material-ui/react-link/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Menu',
    srcLight: '/static/material-ui/react-components/menu-light.png',
    srcDark: '/static/material-ui/react-components/menu-dark.png',
    link: '/material-ui/react-menu/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Pagination',
    srcLight: '/static/material-ui/react-components/pagination-light.png',
    srcDark: '/static/material-ui/react-components/pagination-dark.png',
    link: '/material-ui/react-pagination/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Speed Dial',
    srcLight: '/static/material-ui/react-components/speed-dial-light.png',
    srcDark: '/static/material-ui/react-components/speed-dial-dark.png',
    link: '/material-ui/react-speed-dial/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Stepper',
    srcLight: '/static/material-ui/react-components/stepper-light.png',
    srcDark: '/static/material-ui/react-components/stepper-dark.png',
    link: '/material-ui/react-stepper/',
    md1: true,
    md2: false,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Tabs',
    srcLight: '/static/material-ui/react-components/tabs-light.png',
    srcDark: '/static/material-ui/react-components/tabs-dark.png',
    link: '/material-ui/react-tabs/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
];

export default function MaterialNavigationComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {navigationComponents.map(
        ({ name, link, srcLight, srcDark, md1, md2, md3, noGuidelines }) => (
          <Grid
            sx={{ flexGrow: 1 }}
            key={name}
            size={{
              xs: 12,
              sm: 4,
            }}
          >
            <ComponentShowcaseCard
              link={link}
              name={name}
              srcLight={srcLight}
              srcDark={srcDark}
              md1={md1}
              md2={md2}
              md3={md3}
              noGuidelines={noGuidelines}
            />
          </Grid>
        ),
      )}
    </Grid>
  );
}
