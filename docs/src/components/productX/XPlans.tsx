import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { ROUTES } from '@mui/internal-core-docs/constants';
import { InfoCard } from '@mui/internal-core-docs/InfoCard';
import IconImage from '@mui/internal-core-docs/IconImage';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

const content = [
  {
    icon: <IconImage name="pricing/x-plan-community" mode="" loading="eager" />,
    title: 'Community version',
    description:
      'Free forever. This version contains features that we believe are maintainable by contributions from the open-source community.',
    link: '/x/introduction/licensing/#community-plan',
  },
  {
    icon: <IconImage name="pricing/x-plan-pro" mode="" loading="eager" />,
    title: 'Pro plan',
    description:
      'More advanced capabilities such as multi-filtering, multi-sorting, and more for the Data Grid; as well as the other components.',
    link: '/x/introduction/licensing/#pro-plan',
  },
  {
    icon: <IconImage name="pricing/x-plan-premium" mode="" loading="eager" />,
    title: 'Premium plan',
    description:
      'The most advanced features for every component, including row grouping and Excel export for the Data Grid, plus everything included in the Pro plan.',
    link: '/x/introduction/licensing/#premium-plan',
  },
];

export default function XPlans2() {
  return (
    <Section cozy>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid size={{ md: 6 }}>
          <SectionHeadline
            overline="Plans"
            title={
              <Typography variant="h2">
                Available with <GradientText>MIT and commercial</GradientText> licenses
              </Typography>
            }
            description="MUI X components are available under two licenses: MIT for the free community version, and commercial for Pro and Premium plans."
          />
          <GetStartedButtons
            primaryLabel="Compare plans"
            primaryUrl={ROUTES.pricing}
            secondaryLabel="Learn about licensing"
            secondaryUrl={ROUTES.xLicensing}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Stack spacing={2} useFlexGap>
            {content.map(({ icon, title, description, link }) => (
              <InfoCard
                key={title}
                title={title}
                icon={icon}
                description={description}
                link={link}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Section>
  );
}
