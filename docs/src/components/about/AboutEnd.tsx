import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from '@mui/internal-core-docs/Link';
import GradientText from 'docs/src/components/typography/GradientText';
import { ROUTES } from '@mui/internal-core-docs/constants';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';

export default function AboutEnd() {
  return (
    <Section bg="gradient" sx={{ p: { sm: 8 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <SectionHeadline
          alwaysCenter
          overline="Join us"
          title={
            <Typography variant="h2">
              <GradientText>Build the next generation</GradientText>
              <br /> of tools for UI development
            </Typography>
          }
          description="We give developers and designers the tools to bring stunning user interfaces to life with unrivaled speed and ease."
        />
        <Button
          component={Link}
          noLinkStyle
          href={ROUTES.careers}
          endIcon={<KeyboardArrowRightRounded fontSize="small" />}
          variant="contained"
          sx={{ width: { xs: '100%', sm: 'fit-content' } }}
        >
          View careers
        </Button>
      </Box>
      <Box
        component="img"
        src="/static/branding/about/illustrations/team-globe-distribution-light.png"
        alt="A map illustration with pins loosely positioned where team members from MUI are located."
        loading="lazy"
        sx={(theme) => ({
          mt: -20,
          display: { xs: 'none', sm: 'block' },
          width: '100%',
          aspectRatio: '231/145',
          ...theme.applyDarkStyles({
            content: 'url(/static/branding/about/illustrations/team-globe-distribution-dark.png)',
          }),
        })}
      />
    </Section>
  );
}
