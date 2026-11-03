import Grid from '@mui/material/Grid';
import Section from 'docs/src/layouts/Section';
import { InfoCard } from '@mui/internal-core-docs/InfoCard';
import type { Theme } from '@mui/material/styles';
import { MuiLogomarkIcon } from '@mui/internal-core-docs/svgIcons';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';

const iconStyles = (theme: Theme) => ({
  fontSize: '.875rem',
  color: (theme.vars || theme).palette.primary.main,
});

const logoColor = (theme: Theme) => ({
  '& path': {
    ...theme.applyDarkStyles({
      fill: (theme.vars || theme).palette.primary[400],
    }),
  },
});

const content = [
  {
    icon: <MuiLogomarkIcon width={14} height={14} sx={logoColor} />,
    title: 'Material UI',
    description: "An open-source React component library that implements Google's Material Design.",
    link: '/material-ui/',
  },
  {
    icon: <StyleRoundedIcon sx={iconStyles} />,
    title: 'MUI System',
    description:
      'A set of CSS utilities to help you build custom designs more efficiently. It makes it possible to rapidly lay out custom designs.',
    link: '/system/getting-started/',
  },
];

export default function CoreProducts() {
  return (
    <Section cozy>
      <Grid container spacing={2}>
        {content.map(({ icon, title, description, link }) => (
          <Grid key={title} size={{ xs: 12, md: 4 }}>
            <InfoCard
              icon={icon}
              link={link}
              title={title}
              description={description}
              titleProps={{
                component: 'h2',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
