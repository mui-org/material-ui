import Divider from '@mui/material/Divider';

import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import AppHeader from 'docs/src/layouts/AppHeader';
import MaterialHero from 'docs/src/components/productMaterial/MaterialHero';
import MaterialComponents from 'docs/src/components/productMaterial/MaterialComponents';
import MaterialTheming from 'docs/src/components/productMaterial/MaterialTheming';
import MaterialStyling from 'docs/src/components/productMaterial/MaterialStyling';
import MaterialTemplates from 'docs/src/components/productMaterial/MaterialTemplates';
import MaterialDesignKits from 'docs/src/components/productMaterial/MaterialDesignKits';
import MaterialEnd from 'docs/src/components/productMaterial/MaterialEnd';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import AppFooter from 'docs/src/layouts/AppFooter';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

export default function MaterialUI() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Material UI: React components that implement Material Design"
        description="Material UI is an open-source React component library that implements Google's Material Design. It's comprehensive and can be used in production out of the box."
        card="/static/social-previews/materialui-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content" tabIndex={-1}>
        <MaterialHero />
        <References companies={CORE_CUSTOMERS} />
        <Divider />
        <MaterialComponents />
        <Divider />
        <MaterialTheming />
        <Divider />
        <MaterialStyling />
        <Divider />
        <MaterialTemplates />
        <Divider />
        <MaterialDesignKits />
        <Divider />
        <MaterialEnd />
        <Divider />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/material-ui" />
    </BrandingCssVarsProvider>
  );
}
