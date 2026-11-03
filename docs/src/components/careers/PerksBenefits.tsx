import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import { Link } from '@mui/internal-core-docs/Link';
import IconImage from '@mui/internal-core-docs/IconImage';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import { ROUTES } from '@mui/internal-core-docs/constants';

const companyInfo = [
  {
    title: 'About us',
    description: 'Learn about the team and our history.',
    routeUrl: ROUTES.about,
  },
  {
    title: 'Handbook',
    description: 'Find out how we function as a company.',
    routeUrl: ROUTES.handbook,
  },
  {
    title: 'Blog',
    description: 'Check out the latest product updates.',
    routeUrl: ROUTES.blog,
  },
];

interface CardContentBlockProps {
  description: string;
  title: string;
}

function CardContentBlock({ title, description }: CardContentBlockProps) {
  return (
    <React.Fragment>
      <Typography component="h2" variant="body2" sx={{ fontWeight: 'semiBold' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {description}
      </Typography>
      <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mt: 'auto' }}>
        Read more <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle' }} />
      </Typography>
    </React.Fragment>
  );
}

function RemoteAwardCard() {
  return (
    <Paper
      component={Link}
      href="/blog/remote-award-win-2024/"
      noLinkStyle
      variant="outlined"
      sx={{ p: 2, display: 'flex', flexDirection: 'column ' }}
    >
      <Box
        sx={{
          mb: 2,
          maxWidth: { xs: 315, sm: 325 },
          maxHeight: 315,
          display: 'flex',
          aspectRatio: '1 / 1',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '6px',
          overflow: 'clip',
        }}
      >
        <Box
          component="img"
          src="/static/branding/careers/remote-award-light.png"
          alt="MUI is the winner of the Remote Excellence Awards in the Small and Mighty for SMEs category."
          sx={[
            {
              height: '1200px',
              width: '1200px',
            },
            (theme) => ({
              width: '100%',
              height: '100%',
              ...theme.applyDarkStyles({
                content: `url(/static/branding/careers/remote-award-dark.png)`,
              }),
            }),
          ]}
        />
      </Box>
      <Box sx={{ mt: 'auto' }}>
        <CardContentBlock
          title="Remote Excellence Awards"
          description={`Winners in the first-ever Remote Excellence Awards, in the Small & Mighty category! 🎉`}
        />
      </Box>
    </Paper>
  );
}

export default function PerksBenefits() {
  return (
    <Section bg="gradient" cozy>
      <Grid container spacing={5} sx={{ alignItems: 'center' }}>
        <Grid size={{ md: 6 }}>
          <SectionHeadline
            overline="Working at MUI"
            title={
              <Typography variant="h2" id="perks-and-benefits">
                Perks & benefits
              </Typography>
            }
            description="To help you go above and beyond with us, we provide:"
          />
          <Box sx={{ maxWidth: 500 }}>
            {[
              ['100% remote work', 'Our entire company is globally distributed.'],
              ['Time off', 'We provide 33 days of paid time off globally.'],
              [
                'Retreats',
                'We meet up every 8+ months for a week of working & having fun together!',
              ],
              [
                'Equipment',
                'We let you choose the hardware of your choice (within a given budget).',
              ],
            ].map((textArray) => (
              <Box
                key={textArray[0]}
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1, py: 0.5 }}
              >
                <IconImage name="pricing/yes" />
                <div>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.primary', fontWeight: 'semiBold' }}
                  >
                    {textArray[0]}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {textArray[1]}
                  </Typography>
                </div>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          sx={{
            p: { xs: 2, sm: 0 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
          size={{ xs: 12, md: 6 }}
        >
          <RemoteAwardCard />
          <Stack spacing={2} useFlexGap>
            {companyInfo.map(({ title, description, routeUrl }) => (
              <Paper
                key={title}
                component={Link}
                href={routeUrl}
                noLinkStyle
                variant="outlined"
                sx={{ p: 2, width: '100%', flexGrow: 1, display: 'flex', flexDirection: 'column' }}
              >
                <CardContentBlock title={title} description={description} />
              </Paper>
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Section>
  );
}
