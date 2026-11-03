import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import IconImage from '@mui/internal-core-docs/IconImage';

export default function CoreHero() {
  return (
    <Section cozy noPaddingBottom>
      <SectionHeadline
        alwaysCenter
        overline={
          <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconImage loading="eager" width={28} height={28} name="product-core" sx={{ mr: 1 }} />{' '}
            MUI Core
          </Stack>
        }
        title={
          <Typography component="h1" variant="h2" sx={{ textAlign: 'center' }} gutterBottom>
            Ready to use components <GradientText>free forever</GradientText>
          </Typography>
        }
        description="Get a growing list of React components and utilities, ready-to-use, free forever, and with
        accessibility always in mind. We've built the foundational UI blocks for your design system so you don't have to."
      />
    </Section>
  );
}
