import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import DiamondSponsors from 'docs/src/components/home/DiamondSponsors';
import GoldSponsors from 'docs/src/components/home/GoldSponsors';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';

export default function Sponsors() {
  return (
    <Section cozy>
      <SectionHeadline
        id="sponsors"
        overline="Sponsors"
        title={
          <Typography variant="h2" sx={{ my: 1 }}>
            <GradientText>You</GradientText> make this possible
          </Typography>
        }
        description="The development of these open-source tools is accelerated by our generous sponsors."
      />
      <DiamondSponsors />
      <GoldSponsors />
    </Section>
  );
}
