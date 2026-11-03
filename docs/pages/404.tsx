import Divider from '@mui/material/Divider';

import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import NotFoundHero from 'docs/src/components/NotFoundHero';

export default function Custom404() {
  return (
    <BrandingCssVarsProvider>
      <Head title="404: This page could not be found - MUI" description="" />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <NotFoundHero />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
