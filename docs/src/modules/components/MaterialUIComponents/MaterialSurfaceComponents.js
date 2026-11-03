import Grid from '@mui/material/Grid';
import { ComponentShowcaseCard } from '@mui/internal-core-docs/AppLayout';

const surfaceComponents = [
  {
    name: 'Accordion',
    srcLight: '/static/material-ui/react-components/accordion-light.png',
    srcDark: '/static/material-ui/react-components/accordion-dark.png',
    link: '/material-ui/react-accordion/',
    md1: true,
    md2: false,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'App Bar',
    srcLight: '/static/material-ui/react-components/appbar-light.png',
    srcDark: '/static/material-ui/react-components/appbar-dark.png',
    link: '/material-ui/react-app-bar/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Card',
    srcLight: '/static/material-ui/react-components/card-light.png',
    srcDark: '/static/material-ui/react-components/card-dark.png',
    link: '/material-ui/react-card/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Paper',
    srcLight: '/static/material-ui/react-components/paper-light.png',
    srcDark: '/static/material-ui/react-components/paper-dark.png',
    link: '/material-ui/react-paper/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
];

export default function MaterialSurfaceComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {surfaceComponents.map(({ name, link, srcLight, srcDark, md1, md2, md3, noGuidelines }) => (
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
