import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import AccessibilityNewRounded from '@mui/icons-material/AccessibilityNewRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import { InfoCard } from '@mui/internal-core-docs/InfoCard';

const content = [
  {
    icon: <InvertColorsRoundedIcon fontSize="small" color="primary" />,
    title: 'Timeless aesthetics',
    description:
      "Build beautiful UIs with ease. Start with Google's Material Design, or create your own sophisticated theme.",
  },
  {
    icon: <HandymanRoundedIcon fontSize="small" color="primary" />,
    title: 'Intuitive customization',
    description:
      'Our components are as flexible as they are powerful. You always have full control over how they look and behave.',
  },
  {
    icon: <ArticleRoundedIcon fontSize="small" color="primary" />,
    title: 'Unrivaled documentation',
    description:
      'The answer to your problem can be found in our docs. How can we be so sure? Because our docs boast over 2,000 contributors.',
  },
  {
    icon: <AccessibilityNewRounded fontSize="small" color="primary" />,
    title: 'Dedicated to accessibility',
    description:
      "We believe in building for everyone. That's why accessibility is a high priority with every new feature we ship.",
  },
];

export default function ValueProposition() {
  return (
    <Section>
      <SectionHeadline
        overline="Why build with MUI?"
        title={
          <Typography variant="h2" sx={{ mt: 1, mb: { xs: 2, sm: 4 } }}>
            A <GradientText>delightful experience</GradientText> <br />
            for you and your users
          </Typography>
        }
      />
      <Grid container spacing={3}>
        {content.map(({ icon, title, description }) => (
          <Grid key={title} size={{ xs: 12, sm: 6, lg: 3 }}>
            <InfoCard title={title} icon={icon} description={description} />
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
