import * as React from 'react';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import CustomersHero from 'docs/src/components/customers/CustomersHero';
import AppHeader from 'docs/src/layouts/AppHeader';

import Box from '@mui/material/Box';
import AppFooter from 'docs/src/layouts/AppFooter';
import Divider from '@mui/material/Divider';
import CustomersSpotlight from 'docs/src/components/customers/CustomersSpotlight';
import CustomersLogoSlider from 'docs/src/components/customers/CustomersLogoSlider';
import { getCaseStudies } from 'docs/lib/sourcing';
import type { InferGetStaticPropsType } from 'next';
import CustomersTestimonials from 'docs/src/components/customers/CustomersTestimonials';
import CustomersHeroEnd from 'docs/src/components/customers/CustomersHeroEnd';

export const getStaticProps = () => {
  const customers = getCaseStudies();
  return {
    props: {
      customers,
    },
  };
};

export default function Customers(props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <BrandingCssVarsProvider>
      <Head title="Customers - MUI" description="Meet the teams powered by MUI" />
      <AppHeaderBanner />
      <AppHeader />
      <Divider />
      <main id="main-content" tabIndex={-1}>
        <CustomersHero />
        <CustomersLogoSlider />
        <Box
          component="ul"
          sx={{
            display: 'grid',
            m: 0,
            p: 0,
            gap: 2,
          }}
        >
          <CustomersSpotlight customers={props.customers} />
        </Box>
        <CustomersTestimonials />
        <Divider />
        <CustomersHeroEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
