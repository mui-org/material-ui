import Grid from '@mui/material/Grid';
import { ComponentShowcaseCard } from '@mui/internal-core-docs/AppLayout';

const dataDisplayComponents = [
  {
    name: 'Avatar',
    srcLight: '/static/material-ui/react-components/avatar-light.png',
    srcDark: '/static/material-ui/react-components/avatar-dark.png',
    link: '/material-ui/react-avatar/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Badge',
    srcLight: '/static/material-ui/react-components/badge-light.png',
    srcDark: '/static/material-ui/react-components/badge-dark.png',
    link: '/material-ui/react-badge/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Chip',
    srcLight: '/static/material-ui/react-components/chip-light.png',
    srcDark: '/static/material-ui/react-components/chip-dark.png',
    link: '/material-ui/react-chip/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Divider',
    srcLight: '/static/material-ui/react-components/divider-light.png',
    srcDark: '/static/material-ui/react-components/divider-dark.png',
    link: '/material-ui/react-divider/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Icons',
    srcLight: '/static/material-ui/react-components/icons-light.png',
    srcDark: '/static/material-ui/react-components/icons-dark.png',
    link: '/material-ui/icons/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Material Icons',
    srcLight: '/static/material-ui/react-components/material-icons-light.png',
    srcDark: '/static/material-ui/react-components/material-icons-dark.png',
    link: '/material-ui/material-icons/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'List',
    srcLight: '/static/material-ui/react-components/list-light.png',
    srcDark: '/static/material-ui/react-components/list-dark.png',
    link: '/material-ui/react-list/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Table',
    srcLight: '/static/material-ui/react-components/table-light.png',
    srcDark: '/static/material-ui/react-components/table-dark.png',
    link: '/material-ui/react-table/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Tooltip',
    srcLight: '/static/material-ui/react-components/tooltip-light.png',
    srcDark: '/static/material-ui/react-components/tooltip-dark.png',
    link: '/material-ui/react-tooltip/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Typography',
    srcLight: '/static/material-ui/react-components/typography-light.png',
    srcDark: '/static/material-ui/react-components/typography-dark.png',
    link: '/material-ui/react-typography/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
];

export default function MaterialDataDisplayComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {dataDisplayComponents.map(
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
