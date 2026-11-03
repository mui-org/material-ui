import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import FunctionsIcon from '@mui/icons-material/Functions';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import Section from 'docs/src/layouts/Section';
import { Link } from '@mui/internal-core-docs/Link';
import GradientText from 'docs/src/components/typography/GradientText';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';

export default function PricingWhatToExpect() {
  return (
    <Section cozy>
      <SectionHeadline
        overline="Paid plans"
        title={
          <Typography variant="h2" sx={{ mt: 1, mb: 4 }}>
            Key information about
            <br /> <GradientText>the paid plans</GradientText>
          </Typography>
        }
      />
      <Box
        sx={{
          columnGap: 3,
          columnCount: { sm: 1, md: 2, lg: 3 },
          '& > *': {
            breakInside: 'avoid',
            marginBottom: 2,
          },
        }}
      >
        <Paper variant="outlined" sx={{ p: 2, height: 'fit-content', gridColumn: 'span 1' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <FunctionsIcon fontSize="small" color="primary" />
            <Typography
              component="h3"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Required quantity
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            The number of developers licensed must correspond to the maximum number of concurrent
            developers contributing changes to the front-end code of the projects that use the
            software.
            <br />
            <br />
            You can learn more about this in{' '}
            <Link
              target="_blank"
              href="https://mui.com/legal/mui-x-eula/#authorized-developer-count-rule"
            >
              the EULA
            </Link>
            .
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, height: 'fit-content' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AcUnitIcon fontSize="small" color="primary" />
            <Typography
              component="h3"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Perpetual license model
            </Typography>
          </Box>
          <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
            The Perpetual license model offers the right to keep using your licensed versions
            forever in production and development. It comes with 12 months of maintenance (free
            updates & support).
            <br />
            <br />
            Upon expiration, you can renew your maintenance plan with a discount that depends on
            when you renew:
            <ul>
              <li>before the support expires: 50% discount</li>
              <li>up to 60 days after the support has expired: 35% discount</li>
              <li>more than 60 days after the support has expired: 15% discount</li>
            </ul>
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, height: 'fit-content' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <AllInclusiveOutlinedIcon fontSize="small" color="primary" />
            <Typography
              component="h3"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Perpetual vs. Annual license model
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            On both license models, any version released before the end of your license term is
            forever available for applications deployed in production.
            <br />
            <br />
            The difference regards the right to use the components for <strong>
              development
            </strong>{' '}
            purposes. Only the perpetual license model allows you to continue development once your
            license expires.
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, height: 'fit-content' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <ReplayRoundedIcon fontSize="small" color="primary" />
            <Typography
              component="h3"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Annual license model
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            The Annual license model requires an active license to use the software in development.
            You will need to renew your license if you wish to continue active development after
            your current license term expires.
            <br />
            <br />
            The license is perpetual in production so you {"don't"} need to renew your license if
            you have stopped active development with the commercial components.
            <br />
            <br />
            You can learn more about this in{' '}
            <Link target="_blank" href="https://mui.com/legal/mui-x-eula/#annual-license">
              the EULA
            </Link>
            .
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, height: 'fit-content' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <HelpOutlineOutlinedIcon fontSize="small" color="primary" />
            <Typography
              component="h3"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Maintenance and support
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            With your purchase, you receive support and access to new versions for the duration of
            your subscription. You can{' '}
            <Link href="https://mui.com/x/introduction/support/#technical-support">
              learn more about support
            </Link>{' '}
            in the docs.
            <br />
            <br />
            Note that, except for critical issues, such as security flaws, we release bug fixes and
            other improvements on top of the latest version, instead of patching older versions.
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, height: 'fit-content' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <LocalOfferOutlinedIcon fontSize="small" color="primary" />
            <Typography
              component="h3"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Volume discounts
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Have a team of 25 or more developers? Get in touch with our{' '}
            <Link href="mailto:sales@mui.com">sales team</Link> for a volume discount.
          </Typography>
        </Paper>
        <Paper variant="outlined" sx={{ p: 2, height: 'fit-content' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <PriceChangeIcon fontSize="small" color="primary" />
            <Typography
              component="h3"
              variant="body2"
              sx={{ fontWeight: 'bold', color: 'text.primary' }}
            >
              Price increases
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            To continue providing the best service, MUI may implement an annual price increase of up
            to 7% at the time of renewal.
          </Typography>
        </Paper>
      </Box>
    </Section>
  );
}
