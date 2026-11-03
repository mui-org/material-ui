import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';

export default function CustomersCTA() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'auto', sm: 'center' } }}
    >
      <SectionHeadline
        alwaysCenter
        overline="Explore our advanced components"
        title={
          <Typography variant="h2">
            Get started <GradientText>today</GradientText>
          </Typography>
        }
        description="Our advanced components are available with free and commercial licenses. Try them out and see how they can help you improve your UI-building experience."
      />
      <GetStartedButtons primaryLabel="Explore MUI X" primaryUrl="/x/" />
    </Box>
  );
}
