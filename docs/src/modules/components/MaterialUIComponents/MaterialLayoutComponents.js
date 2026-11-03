import Grid from '@mui/material/Grid';
import { ComponentShowcaseCard } from '@mui/internal-core-docs/AppLayout';

const layoutComponents = [
  {
    name: 'Box',
    srcLight: '/static/material-ui/react-components/box-light.png',
    srcDark: '/static/material-ui/react-components/box-dark.png',
    link: '/material-ui/react-box/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Container',
    srcLight: '/static/material-ui/react-components/container-light.png',
    srcDark: '/static/material-ui/react-components/container-dark.png',
    link: '/material-ui/react-container/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Grid',
    srcLight: '/static/material-ui/react-components/grid-v2-light.png',
    srcDark: '/static/material-ui/react-components/grid-v2-dark.png',
    link: '/material-ui/react-grid/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Stack',
    srcLight: '/static/material-ui/react-components/stack-light.png',
    srcDark: '/static/material-ui/react-components/stack-dark.png',
    link: '/material-ui/react-stack/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Image List',
    srcLight: '/static/material-ui/react-components/image-list-light.png',
    srcDark: '/static/material-ui/react-components/image-list-dark.png',
    link: '/material-ui/react-image-list/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
];

export default function MaterialLayoutComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {layoutComponents.map(({ name, link, srcLight, srcDark, md1, md2, md3, noGuidelines }) => (
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
      ))}
    </Grid>
  );
}
