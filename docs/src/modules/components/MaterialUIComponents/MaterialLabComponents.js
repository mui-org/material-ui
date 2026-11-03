import Grid from '@mui/material/Grid';
import { ComponentShowcaseCard } from '@mui/internal-core-docs/AppLayout';

const labComponents = [
  {
    name: 'Masonry',
    srcLight: '/static/material-ui/react-components/masonry-light.png',
    srcDark: '/static/material-ui/react-components/masonry-dark.png',
    link: '/material-ui/react-masonry/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Timeline',
    srcLight: '/static/material-ui/react-components/timeline-light.png',
    srcDark: '/static/material-ui/react-components/timeline-dark.png',
    link: '/material-ui/react-timeline/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
];

export default function MaterialLabComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {labComponents.map(({ name, link, srcLight, srcDark, md1, md2, md3, noGuidelines }) => (
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
