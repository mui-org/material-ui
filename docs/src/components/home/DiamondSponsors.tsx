import { useInView } from 'react-intersection-observer';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AddRounded from '@mui/icons-material/AddRounded';
import { Link } from '@mui/internal-core-docs/Link';
import SponsorCard from 'docs/src/components/home/SponsorCard';

const DIAMONDs = [
  {
    src: '/static/sponsors/doit-square.svg',
    name: 'Doit International',
    description: 'Technology and cloud expertise to buy, optimize and manage public cloud.',
    href: 'https://www.doit.com/?utm_source=mui.com&utm_medium=referral&utm_content=homepage',
  },
];

export default function DiamondSponsors() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
    rootMargin: '500px',
  });
  const maxNumberOfDiamondSponsors = 3;
  const spotIsAvailable = maxNumberOfDiamondSponsors > DIAMONDs.length;
  return (
    <div ref={ref}>
      <Typography
        component="h3"
        variant="h6"
        sx={[
          {
            fontWeight: 'semiBold',
          },
          (theme) => ({
            mt: 4,
            mb: 1.5,
            background: `linear-gradient(45deg, ${(theme.vars || theme).palette.primary[400]} 50%, ${
              (theme.vars || theme).palette.primary[800]
            } 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }),
        ]}
      >
        Diamond
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {DIAMONDs.map((item) => (
          <Grid key={item.name} size={{ xs: 12, sm: 6, md: 4 }}>
            <SponsorCard logoSize={64} inView={inView} item={item} />
          </Grid>
        ))}
        {spotIsAvailable && (
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                height: '100%',
                borderStyle: 'dashed',
              }}
            >
              <IconButton
                aria-label="Become MUI sponsor"
                component="a"
                href="mailto:sales@mui.com"
                target="_blank"
                color="primary"
                sx={(theme) => ({
                  mr: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  ...theme.applyDarkStyles({
                    borderColor: 'primaryDark.600',
                  }),
                })}
              >
                <AddRounded />
              </IconButton>
              <div>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
                  Become our sponsor!
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  To join us, contact us at{' '}
                  <Link href="mailto:sales@mui.com" target="_blank">
                    sales@mui.com
                  </Link>{' '}
                  for pre-approval.
                </Typography>
              </div>
            </Paper>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
