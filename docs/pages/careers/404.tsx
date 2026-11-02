import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import Section from 'docs/src/layouts/Section';

export default function CareerNotFound() {
  return (
    <BrandingCssVarsProvider>
      <Head title="Job not found - MUI" description="This job is no longer available.">
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <Section bg="gradient" sx={{ minHeight: '50vh', textAlign: 'center' }}>
          <SectionHeadline
            alwaysCenter
            title={
              <Typography component="h1" variant="h3" sx={{ fontWeight: 'extraBold' }}>
                This job doesn&apos;t exist
              </Typography>
            }
            description="This role is no longer available, or the link may be incorrect. Explore our current openings to find another opportunity."
          />
          <Button component="a" href="/careers/#open-roles" variant="contained" sx={{ mt: 3 }}>
            View open roles
          </Button>
        </Section>
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
