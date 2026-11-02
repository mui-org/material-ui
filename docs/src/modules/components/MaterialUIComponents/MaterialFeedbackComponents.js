import Grid from '@mui/material/Grid';
import { ComponentShowcaseCard } from '@mui/internal-core-docs/AppLayout';

const feedbackComponents = [
  {
    name: 'Alert',
    srcLight: '/static/material-ui/react-components/alert-light.png',
    srcDark: '/static/material-ui/react-components/alert-dark.png',
    link: '/material-ui/react-alert/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Dialog',
    srcLight: '/static/material-ui/react-components/dialog-light.png',
    srcDark: '/static/material-ui/react-components/dialog-dark.png',
    link: '/material-ui/react-dialog/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Progress',
    srcLight: '/static/material-ui/react-components/progress-light.png',
    srcDark: '/static/material-ui/react-components/progress-dark.png',
    link: '/material-ui/react-progress/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Skeleton',
    srcLight: '/static/material-ui/react-components/skeleton-light.png',
    srcDark: '/static/material-ui/react-components/skeleton-dark.png',
    link: '/material-ui/react-skeleton/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Snackbar',
    srcLight: '/static/material-ui/react-components/snackbar-light.png',
    srcDark: '/static/material-ui/react-components/snackbar-dark.png',
    link: '/material-ui/react-snackbar/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
];

export default function MaterialFeedbackComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {feedbackComponents.map(({ name, link, srcLight, srcDark, md1, md2, md3, noGuidelines }) => (
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
