import Divider from '@mui/material/Divider';

import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import AppHeader from 'docs/src/layouts/AppHeader';
import CoreHero from 'docs/src/components/productCore/CoreHero';
import CoreProducts from 'docs/src/components/productCore/CoreProducts';
import AppFooter from 'docs/src/layouts/AppFooter';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import Testimonials from 'docs/src/components/home/Testimonials';

export default function Core() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="MUI Core: Ready-to-use React components, free forever"
        description="Get a growing list of React components, ready-to-use, free forever and with accessibility always in mind."
        card="/static/social-previews/core-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content" tabIndex={-1}>
        <CoreHero />
        <CoreProducts />
        <Divider />
        <Testimonials />
        <Divider />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/material-ui" />
    </BrandingCssVarsProvider>
  );
}
