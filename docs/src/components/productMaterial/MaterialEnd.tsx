import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import { GlowingIconContainer } from '@mui/internal-core-docs/InfoCard';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { Link } from '@mui/internal-core-docs/Link';
import { ROUTES } from '@mui/internal-core-docs/constants';

interface MaterialEndProps {
  noFaq?: boolean;
}

export default function MaterialEnd({ noFaq }: MaterialEndProps) {
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
      {noFaq ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionHeadline
            alwaysCenter
            overline="Community"
            title={
              <Typography variant="h2">
                Join our <GradientText>global community</GradientText>
              </Typography>
            }
            description={
              <React.Fragment>
                Material UI wouldn&apos;t be possible without our global community of contributors.
                Join us today to get help when you need it, and lend a hand when you can.
              </React.Fragment>
            }
          />
          <GetStartedButtons
            primaryUrl={ROUTES.materialDocs}
            secondaryLabel="View templates"
            secondaryUrl={ROUTES.freeTemplates}
            altInstallation="npm install @mui/material @emotion/react @emotion/styled"
          />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 6, sm: 10 }} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <SectionHeadline
              overline="Community"
              title={
                <Typography variant="h2">
                  Join our <GradientText>global community</GradientText>
                </Typography>
              }
              description={
                <React.Fragment>
                  Material UI wouldn&apos;t be possible without our global community of
                  contributors. Join us today to get help when you need it, and lend a hand when you
                  can.
                </React.Fragment>
              }
            />
            <GetStartedButtons
              primaryUrl={ROUTES.materialDocs}
              secondaryLabel="View templates"
              secondaryUrl={ROUTES.freeTemplates}
              altInstallation="npm install @mui/material @emotion/react @emotion/styled"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <List sx={{ '& > li': { alignItems: 'flex-start' } }}>
              <ListItem sx={{ p: 0, gap: 2.5 }}>
                <GlowingIconContainer icon={<StyleRoundedIcon color="primary" />} />
                <div>
                  <Typography gutterBottom sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
                    Does it support Material Design 3?
                  </Typography>
                  <Typography>
                    Material UI currently adopts Material Design 2. You can follow{' '}
                    <Link href="https://github.com/mui/material-ui/issues/29345">
                      this GitHub issue
                    </Link>{' '}
                    for future design-related updates.
                  </Typography>
                </div>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      )}
    </Section>
  );
}
