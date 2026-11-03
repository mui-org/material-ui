import Divider from '@mui/material/Divider';

import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import DesignKitHero from 'docs/src/components/productDesignKit/DesignKitHero';
import DesignKitValues from 'docs/src/components/productDesignKit/DesignKitValues';
import DesignKitDemo from 'docs/src/components/productDesignKit/DesignKitDemo';
import DesignKitFAQ from 'docs/src/components/productDesignKit/DesignKitFAQ';
import MaterialEnd from 'docs/src/components/productMaterial/MaterialEnd';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import References, { DESIGNKITS_CUSTOMERS } from 'docs/src/components/home/References';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

export default function DesignKits() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Material UI in your favorite design tool"
        description="Pick your favorite design tool to enjoy and use Material UI components. Boost consistency and facilitate communication when working with developers."
        card="/static/social-previews/designkits-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/mui-design-kits" />
      <main id="main-content" tabIndex={-1}>
        <DesignKitHero />
        <References companies={DESIGNKITS_CUSTOMERS} />
        <Divider />
        <DesignKitValues />
        <Divider />
        <DesignKitDemo />
        <Divider />
        <Divider />
        <DesignKitFAQ />
        <Divider />
        <MaterialEnd noFaq />
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
