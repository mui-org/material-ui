import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';

export default function StartToday() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'auto', sm: 'center' } }}
    >
      <SectionHeadline
        alwaysCenter
        overline="Start now"
        title={
          <Typography variant="h2">
            Ship your next project <GradientText>faster</GradientText>
          </Typography>
        }
        description="Find out why MUI's tools are trusted by thousands of open-source developers and teams around the world."
      />
      <GetStartedButtons primaryLabel="Discover the Core libraries" primaryUrl="/core/" />
    </Box>
  );
}
