import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import GradientText from 'docs/src/components/typography/GradientText';
import { Link } from '@mui/internal-core-docs/Link';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import { GlowingIconContainer } from '@mui/internal-core-docs/InfoCard';

function Widget({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon: React.ReactElement<unknown>;
}) {
  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
        ...theme.applyDarkStyles({
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
        }),
      })}
    >
      <GlowingIconContainer icon={icon} />
      <Typography
        component="h3"
        variant="body2"
        sx={{ fontWeight: 'bold', color: 'text.primary', mt: 2, mb: 0.5 }}
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
}

export default function HowToSupport() {
  return (
    <Section cozy>
      <SectionHeadline
        overline="Support us"
        title={
          <Typography variant="h2" sx={{ mb: 4 }}>
            Learn how to support
            <br /> <GradientText>MUI&apos;s growth</GradientText>
          </Typography>
        }
        description=""
      />
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Widget
            icon={<ForumRoundedIcon fontSize="small" color="primary" />}
            title="Give feedback"
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Tell us what and where we can improve or share your happy moments with us! You can
              also up or downvote any page on our documentation. <br />
              <br /> And lastly, from time to time, we send our community a survey for more
              structured feedback, you&apos;re always invited to participate to share your thoughts.
            </Typography>
            <Button
              component="a"
              size="small"
              variant="outlined"
              fullWidth
              href="https://github.com/mui/material-ui/issues?q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc"
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ mt: 'auto' }}
            >
              Leave your feedback{' '}
            </Button>
          </Widget>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Widget
            icon={<PeopleRoundedIcon fontSize="small" color="primary" />}
            title="Join the community"
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Become a member of a huge community of developers supporting MUI. You can:
            </Typography>
            <Box component="ul" sx={{ typography: 'body2', color: 'text.secondary', pl: 2, mb: 2 }}>
              <li>
                Add new features by{' '}
                <Link href="https://github.com/mui/material-ui/blob/HEAD/CONTRIBUTING.md#your-first-pull-request">
                  submitting a pull request
                </Link>
                .
              </li>
              <li>
                Fix bugs or{' '}
                <Link href="https://github.com/mui/material-ui/tree/HEAD/docs">
                  improve our documentation
                </Link>
                .
              </li>
              <li>
                Help others by reviewing and commenting on existing{' '}
                <Link href="https://github.com/mui/material-ui/pulls">PRs</Link> and{' '}
                <Link href="https://github.com/mui/material-ui/issues">issues</Link>.
              </li>
              <li>
                Help <Link href="https://crowdin.com/project/material-ui-docs">translate</Link> the
                documentation.
              </li>
              <li>
                Answer questions on{' '}
                <Link href="https://stackoverflow.com/questions/tagged/material-ui">
                  Stack&nbsp;Overflow
                </Link>
                .
              </li>
            </Box>
            <Button
              component="a"
              size="small"
              variant="outlined"
              fullWidth
              href="https://github.com/mui/material-ui"
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ mt: 'auto' }}
            >
              See the repository
            </Button>
          </Widget>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Widget
            icon={<LocalAtmRoundedIcon fontSize="small" color="primary" />}
            title="Support us financially"
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              If you use MUI in a commercial project and would like to support its continued
              development by becoming a Sponsor, or in a side or hobby project and would like to
              become a Backer, you can do so through {'Open Collective'}.
              <br />
              <br />
              All funds donated are managed transparently, and Sponsors receive recognition in the
              README and on the MUI home page.
            </Typography>
            <Button
              component="a"
              size="small"
              variant="outlined"
              fullWidth
              href="https://opencollective.com/mui-org"
              endIcon={<KeyboardArrowRightRounded />}
              sx={{ mt: 'auto' }}
            >
              {'See Open Collective'}
            </Button>
          </Widget>
        </Grid>
      </Grid>
    </Section>
  );
}
