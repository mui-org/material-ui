import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';

export default function HeroPricing() {
  return (
    <Section cozy>
      <SectionHeadline
        alwaysCenter
        overline="Pricing"
        title={
          <Typography variant="h2" component="h1">
            Start using MUI&apos;s products <GradientText>for free!</GradientText>
          </Typography>
        }
        description="Switch to a commercial plan to access advanced features & technical support."
      />
    </Section>
  );
}
