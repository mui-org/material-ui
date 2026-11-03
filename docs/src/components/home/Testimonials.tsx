import dynamic from 'next/dynamic';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';

const UserFeedbacks = dynamic(() => import('./UserFeedbacks'));

export default function Testimonials() {
  return (
    <Box
      data-mui-color-scheme="dark"
      sx={(theme) => ({
        background: `linear-gradient(180deg, ${alpha(theme.palette.primaryDark[800], 0.8)}2%, ${
          theme.palette.primaryDark[900]
        } 80%), ${theme.palette.primaryDark[900]}`,
      })}
    >
      <Section bg="transparent" cozy>
        <SectionHeadline
          overline="Join the community"
          title={
            <Typography variant="h2" component="h2">
              Supported by thousands of <GradientText>developers and designers</GradientText>
            </Typography>
          }
        />
        <UserFeedbacks />
      </Section>
    </Box>
  );
}
