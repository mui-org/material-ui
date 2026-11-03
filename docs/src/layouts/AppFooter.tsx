import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import { MuiLogotypeIcon, StackOverflowIcon } from '@mui/internal-core-docs/svgIcons';
import EmailSubscribe from 'docs/src/components/footer/EmailSubscribe';
import { ROUTES } from '@mui/internal-core-docs/constants';
import { Link } from '@mui/internal-core-docs/Link';

interface AppFooterProps {
  stackOverflowUrl?: string;
}

export default function AppFooter(props: AppFooterProps) {
  const { stackOverflowUrl } = props;

  return (
    <Container component="footer">
      <Box
        sx={{
          py: { xs: 4, sm: 8 },
          display: 'grid',
          gridAutoColumns: '1fr',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 4,
          gridTemplateColumns: { xs: '1fr', sm: '1fr', md: '1fr 1.75fr', lg: '1fr 1fr' },
          gridTemplateRows: 'auto',
          '& a:not(.MuiIconButton-root)': {
            pt: 0.5,
            pb: 0.5,
            color: 'text.secondary',
            typography: 'body2',
            '&:hover': {
              color: 'primary.main',
              textDecoration: 'underline',
            },
          },
        }}
      >
        <div>
          <Link prefetch={false} href="/" aria-label="Go to the homepage" sx={{ mb: 2 }}>
            <MuiLogotypeIcon height={28} width={91} />
          </Link>
          <Typography variant="body2" gutterBottom sx={{ fontWeight: 'semiBold' }}>
            Keep up to date
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            Join our newsletter for regular updates. No spam ever.
          </Typography>
          <EmailSubscribe />
        </div>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gridAutoColumns: '1fr',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" sx={{ fontWeight: 'semiBold', mb: 0.5 }}>
              Products
            </Typography>
            <Link prefetch={false} href={ROUTES.productMaterial}>
              Material UI
            </Link>
            <Link href="https://base-ui.com">Base UI</Link>
            <Link prefetch={false} href={ROUTES.productAdvanced}>
              MUI X
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" sx={{ fontWeight: 'semiBold', mb: 0.5 }}>
              Resources
            </Typography>
            <Link prefetch={false} href={ROUTES.materialIcons}>
              Material Icons
            </Link>
            <Link prefetch={false} href={ROUTES.freeTemplates}>
              Templates
            </Link>
            <Link prefetch={false} href={ROUTES.components}>
              Components
            </Link>
            <Link prefetch={false} href={ROUTES.customization}>
              Customization
            </Link>
            <Link prefetch={false} href={ROUTES.productDesignKits}>
              Design Kits
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" sx={{ fontWeight: 'semiBold', mb: 0.5 }}>
              Explore
            </Typography>
            <Link prefetch={false} href={ROUTES.documentation}>
              Documentation
            </Link>
            <Link prefetch={false} href={ROUTES.store}>
              Store
            </Link>
            <Link prefetch={false} href={ROUTES.blog}>
              Blog
            </Link>
            <Link prefetch={false} href={ROUTES.showcase}>
              Showcase
            </Link>
            <Link prefetch={false} href={ROUTES.coreRoadmap}>
              Roadmap
            </Link>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" sx={{ fontWeight: 'semiBold', mb: 0.5 }}>
              Company
            </Typography>
            <Link prefetch={false} href={ROUTES.about}>
              About
            </Link>
            <Link prefetch={false} href={ROUTES.vision}>
              Vision
            </Link>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Link prefetch={false} href={ROUTES.careers}>
                Careers{' '}
              </Link>
              <Chip
                size="small"
                variant="outlined"
                color="success"
                label="Hiring"
                sx={(theme) => ({
                  height: 18,
                  '& .MuiChip-label': {
                    px: '4px',
                    fontSize: theme.typography.pxToRem(10),
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '.04rem',
                  },
                })}
              />
            </Box>
            <Link prefetch={false} href={ROUTES.support}>
              Support
            </Link>
            <Link prefetch={false} href={ROUTES.privacyPolicy}>
              Privacy policy
            </Link>
            <Link prefetch={false} target="_blank" href="mailto:contact@mui.com">
              Contact us
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          alignItems: 'center',
          justifyContent: { sm: 'space-between' },
          gap: { xs: 2, sm: 1 },
          my: 4,
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.tertiary', fontWeight: 400 }}>
          Copyright © {new Date().getFullYear()} Material UI SAS, trading as MUI.
        </Typography>
        <Stack spacing={1} direction="row" useFlexGap sx={{ flexWrap: 'wrap' }}>
          <IconButton
            target="_blank"
            href="https://github.com/mui"
            aria-label="github"
            title="GitHub"
            size="small"
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            href={ROUTES.rssFeed}
            aria-label="RSS Feed"
            title="RSS Feed"
            size="small"
          >
            <RssFeedIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            href="https://x.com/MUI_hq"
            aria-label="X/twitter"
            title="X"
            size="small"
          >
            <XIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            href="https://www.linkedin.com/company/mui/"
            aria-label="linkedin"
            title="LinkedIn"
            size="small"
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <IconButton
            target="_blank"
            href="https://www.youtube.com/@MUI_hq"
            aria-label="YouTube"
            title="YouTube"
            size="small"
          >
            <YouTubeIcon fontSize="small" />
          </IconButton>
          {stackOverflowUrl ? (
            <IconButton
              target="_blank"
              href={stackOverflowUrl}
              aria-label="Stack Overflow"
              title="Stack Overflow"
              size="small"
            >
              <StackOverflowIcon fontSize="small" />
            </IconButton>
          ) : null}
        </Stack>
      </Stack>
    </Container>
  );
}
