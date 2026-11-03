import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector, { timelineConnectorClasses } from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot, { timelineDotClasses } from '@mui/lab/TimelineDot';

export default function BasicTimeline() {
  return (
    <Fade in timeout={700}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          p: 2,
          pb: 1,
          display: 'flex',
          alignItems: 'flex-start',
          borderColor: 'grey.200',
          boxShadow: `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            borderColor: 'primaryDark.700',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          }),
        })}
      >
        <Box
          sx={(theme) => ({
            height: 24,
            width: 24,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 700,
            borderRadius: 0.3,
            bgcolor: 'primary.50',
            color: 'primary.600',
            border: '1px solid',
            borderColor: 'primary.100',
            ...theme.applyDarkStyles({
              bgcolor: 'primary.900',
              color: 'primary.50',
              borderColor: 'primary.800',
            }),
          })}
        >
          1
        </Box>
        <Box sx={{ ml: 2, flex: 1 }}>
          <Typography variant="body2" gutterBottom sx={{ color: 'text.primary' }}>
            Install one of our production-ready libraries to get your next app started inevitably
            successful:
          </Typography>
          <Timeline
            sx={[
              {
                pl: 0,
                py: 0,
                my: 0,
                [`& .${timelineItemClasses.root}`]: {
                  minHeight: 24,
                  '&::before': {
                    display: 'none',
                  },
                },
                [`& .${timelineDotClasses.root}`]: {
                  zIndex: 1,
                  padding: '3px',
                  boxShadow: 'none',
                  margin: '15px 0',
                  border: 'none',
                  bgcolor: 'primary.500',
                },
                [`& .${timelineConnectorClasses.root}`]: {
                  margin: '-8px 0',
                  bgcolor: 'primary.100',
                },
                [`& .${timelineContentClasses.root}`]: {
                  fontSize: '0.875rem',
                  color: 'grey.800',
                },
              },
              (theme) =>
                theme.applyDarkStyles({
                  [`& .${timelineConnectorClasses.root}`]: {
                    bgcolor: 'primary.900',
                  },
                  [`& .${timelineContentClasses.root}`]: {
                    color: 'grey.100',
                  },
                }),
            ]}
          >
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>Material UI</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>MUI Base</TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>Joy UI</TimelineContent>
            </TimelineItem>
          </Timeline>
        </Box>
      </Card>
    </Fade>
  );
}
