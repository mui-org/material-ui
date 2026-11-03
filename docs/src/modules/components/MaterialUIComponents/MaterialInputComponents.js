import Grid from '@mui/material/Grid';
import { ComponentShowcaseCard } from '@mui/internal-core-docs/AppLayout';

const inputComponents = [
  {
    name: 'Autocomplete',
    srcLight: '/static/material-ui/react-components/autocomplete-light.png',
    srcDark: '/static/material-ui/react-components/autocomplete-dark.png',
    link: '/material-ui/react-autocomplete/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Button',
    srcLight: '/static/material-ui/react-components/button-light.png',
    srcDark: '/static/material-ui/react-components/button-dark.png',
    link: '/material-ui/react-button/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Button Group',
    srcLight: '/static/material-ui/react-components/button-group-light.png',
    srcDark: '/static/material-ui/react-components/button-group-dark.png',
    link: '/material-ui/react-button-group/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Checkbox',
    srcLight: '/static/material-ui/react-components/checkbox-light.png',
    srcDark: '/static/material-ui/react-components/checkbox-dark.png',
    link: '/material-ui/react-checkbox/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Floating Action Button',
    srcLight: '/static/material-ui/react-components/fab-light.png',
    srcDark: '/static/material-ui/react-components/fab-dark.png',
    link: '/material-ui/react-floating-action-button/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Radio Group',
    srcLight: '/static/material-ui/react-components/radio-group-light.png',
    srcDark: '/static/material-ui/react-components/radio-group-dark.png',
    link: '/material-ui/react-radio-button/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Rating',
    srcLight: '/static/material-ui/react-components/rating-light.png',
    srcDark: '/static/material-ui/react-components/rating-dark.png',
    link: '/material-ui/react-rating/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Select',
    srcLight: '/static/material-ui/react-components/select-light.png',
    srcDark: '/static/material-ui/react-components/select-dark.png',
    link: '/material-ui/react-select/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Slider',
    srcLight: '/static/material-ui/react-components/slider-light.png',
    srcDark: '/static/material-ui/react-components/slider-dark.png',
    link: '/material-ui/react-slider/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Switch',
    srcLight: '/static/material-ui/react-components/switch-light.png',
    srcDark: '/static/material-ui/react-components/switch-dark.png',
    link: '/material-ui/react-switch/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Text Field',
    srcLight: '/static/material-ui/react-components/text-field-light.png',
    srcDark: '/static/material-ui/react-components/text-field-dark.png',
    link: '/material-ui/react-text-field/',
    md1: false,
    md2: true,
    md3: false,
    noGuidelines: false,
  },
  {
    name: 'Transfer List',
    srcLight: '/static/material-ui/react-components/transfer-list-light.png',
    srcDark: '/static/material-ui/react-components/transfer-list-dark.png',
    link: '/material-ui/react-transfer-list/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
  {
    name: 'Toggle Button',
    srcLight: '/static/material-ui/react-components/toggle-button-light.png',
    srcDark: '/static/material-ui/react-components/toggle-button-dark.png',
    link: '/material-ui/react-toggle-button/',
    md1: false,
    md2: false,
    md3: false,
    noGuidelines: true,
  },
];

export default function MaterialInputComponents() {
  return (
    <Grid container spacing={2} sx={{ pt: 1 }}>
      {inputComponents.map(({ name, link, srcLight, srcDark, md1, md2, md3, noGuidelines }) => (
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
            imgLoading="eager"
          />
        </Grid>
      ))}
    </Grid>
  );
}
