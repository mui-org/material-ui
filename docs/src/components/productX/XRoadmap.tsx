import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import PivotTableChartRoundedIcon from '@mui/icons-material/PivotTableChartRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRounded from '@mui/icons-material/AccountTreeRounded';
import BarChartRounded from '@mui/icons-material/BarChartRounded';
import FileUploadRounded from '@mui/icons-material/FileUploadRounded';
import FormatSizeRoundedIcon from '@mui/icons-material/FormatSizeRounded';
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { alpha } from '@mui/material/styles';
import { ROUTES } from '@mui/internal-core-docs/constants';
import { Link } from '@mui/internal-core-docs/Link';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import Section from 'docs/src/layouts/Section';
import GradientText from 'docs/src/components/typography/GradientText';

interface RoadmapStatusDotProps {
  color: string;
}

function RoadmapStatusDot({ color }: RoadmapStatusDotProps) {
  return (
    <Box
      sx={{
        ml: 1,
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: 10,
        bgcolor: `${color}`,
      }}
    />
  );
}

export default function XRoadmap() {
  function renderList(content: React.ReactElement<unknown>) {
    return (
      <Box
        sx={{
          mt: 2,
          display: 'grid',
          alignItems: 'center',
          gap: 1.5,
          gridTemplateColumns: 'max-content 1fr',
          fontWeight: 'semiBold',
        }}
      >
        {content}
      </Box>
    );
  }
  return (
    <Section
      cozy
      data-mui-color-scheme="dark"
      sx={{
        color: 'text.secondary',
        background: (theme) =>
          `linear-gradient(180deg, ${(theme.vars || theme).palette.primaryDark[900]} 50%, 
        ${alpha(theme.palette.primary[800], 0.2)} 100%), ${
          (theme.vars || theme).palette.primaryDark[900]
        }`,
      }}
    >
      <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Grid size={{ xs: 12, md: 5 }}>
          <SectionHeadline
            overline="Roadmap"
            title={
              <Typography variant="h2">
                Follow the <GradientText>MUI X roadmap</GradientText> for future updates
              </Typography>
            }
            description="It's just the beginning for the MUI X components. Stay tuned for exciting news and updates coming soon!"
          />
          <Button
            component={Link}
            href={ROUTES.xRoadmap}
            noLinkStyle
            variant="contained"
            endIcon={<KeyboardArrowRightRounded />}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            See the roadmap
          </Button>
        </Grid>
        <Grid
          size={{ xs: 12, md: 7, lg: 'auto' }}
          container
          spacing={2}
          sx={{
            typography: 'body2',
            '& .MuiPaper-root': {
              p: 2,
              minWidth: { lg: 180 },
            },
            '& svg': {
              color: 'primary.300',
            },
          }}
        >
          <Grid size={{ xs: 12, sm: 4, lg: 'auto' }}>
            <Paper variant="outlined">
              <Typography
                component="div"
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.primary' }}
              >
                Stable
                <RoadmapStatusDot color="success.main" />
              </Typography>
              {renderList(
                <React.Fragment>
                  <PivotTableChartRoundedIcon sx={{ fontSize: 16 }} />
                  Data Grid
                  <CalendarMonthRoundedIcon sx={{ fontSize: 16 }} />
                  Date and Time Pickers
                  <BarChartRounded sx={{ fontSize: 16 }} />
                  Charts
                  <AccountTreeRounded sx={{ fontSize: 16 }} />
                  Tree View
                </React.Fragment>,
              )}
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 'auto' }}>
            <Paper variant="outlined">
              <Typography
                component="div"
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.primary' }}
              >
                Preview
                <RoadmapStatusDot color="warning.main" />
              </Typography>
              {renderList(
                <React.Fragment>
                  <EventNoteRoundedIcon sx={{ fontSize: 16 }} />
                  Scheduler
                  <ForumRoundedIcon sx={{ fontSize: 16 }} />
                  Chat
                </React.Fragment>,
              )}
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, lg: 'auto' }}>
            <Paper variant="outlined">
              <Typography
                component="div"
                variant="body2"
                sx={{ fontWeight: 'bold', color: 'text.primary' }}
              >
                Future components
                <RoadmapStatusDot color="primaryDark.400" />
              </Typography>
              {renderList(
                <React.Fragment>
                  <FormatSizeRoundedIcon sx={{ fontSize: 16 }} />
                  Rich Text Editor
                  <FileUploadRounded sx={{ fontSize: 16 }} />
                  Upload
                  <ViewTimelineIcon sx={{ fontSize: 16 }} />
                  Gantt
                </React.Fragment>,
              )}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Section>
  );
}
