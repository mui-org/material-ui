import Grid from '@mui/material/Grid';
import { InfoCard } from '@mui/internal-core-docs/InfoCard';

const content = [
  {
    title: 'Material UI for Figma',
    link: 'https://mui.com/store/items/figma-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-figma',
    svg: (
      <img
        src={`/static/branding/design-kits/figma-logo.svg`}
        alt="Figma logo"
        loading="lazy"
        width="36"
        height="36"
      />
    ),
  },
  {
    title: 'Material UI for Sketch',
    link: 'https://mui.com/store/items/sketch-react/?utm_source=docs&utm_medium=referral&utm_campaign=installation-sketch',
    svg: (
      <img
        src={`/static/branding/design-kits/sketch-logo.svg`}
        alt="Sketch logo"
        loading="lazy"
        width="36"
        height="36"
      />
    ),
  },
];

export default function MaterialUIDesignResources() {
  return (
    <Grid container spacing={2}>
      {content.map(({ svg, title, link }) => (
        <Grid key={title} size={{ xs: 12, sm: 6 }}>
          <InfoCard classNameTitle="algolia-lvl3" link={link} title={title} svg={svg} />
        </Grid>
      ))}
    </Grid>
  );
}
