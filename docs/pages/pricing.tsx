import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';

import AppHeader from 'docs/src/layouts/AppHeader';
import HeroPricing from 'docs/src/components/pricing/HeroPricing';
import PricingTable from 'docs/src/components/pricing/PricingTable';
import PricingList from 'docs/src/components/pricing/PricingList';
import Testimonials from 'docs/src/components/home/Testimonials';
import PricingWhatToExpect from 'docs/src/components/pricing/PricingWhatToExpect';
import PricingFAQ from 'docs/src/components/pricing/PricingFAQ';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import { MultiAppProvider } from 'docs/src/components/pricing/MultiAppContext';
import { LicenseModelProvider } from 'docs/src/components/pricing/LicenseModelContext';
import PricingCards from 'docs/src/components/pricing/PricingCards';

export default function Pricing() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Pricing - MUI"
        description="The community edition lets you get going right away. Switch to a commercial plan for more components & technical support."
        card="/static/social-previews/pricing-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <HeroPricing />
        <LicenseModelProvider>
          <MultiAppProvider>
            <Container sx={{ display: { xs: 'none', md: 'block' } }}>
              <PricingCards />
            </Container>
            <Divider />
            {/* Mobile, Tablet */}
            <Container sx={{ display: { xs: 'block', md: 'none' }, pb: 3, mt: '-1px' }}>
              <PricingList />
            </Container>
            {/* Desktop */}
            <Container sx={{ display: { xs: 'none', md: 'block' } }}>
              <PricingTable />
            </Container>
          </MultiAppProvider>
        </LicenseModelProvider>
        <PricingWhatToExpect />
        <Divider />
        <PricingFAQ />
        <Divider />
        <Testimonials />
        <Divider />
        <HeroEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
