import NoSsr from '@mui/material/NoSsr';
import Divider from '@mui/material/Divider';

import AppHeader from 'docs/src/layouts/AppHeader';
import Hero from 'docs/src/components/home/Hero';
import References, { CORE_CUSTOMERS } from 'docs/src/components/home/References';
import ProductSuite from 'docs/src/components/home/ProductSuite';
import ValueProposition from 'docs/src/components/home/ValueProposition';
import DesignSystemComponents from 'docs/src/components/home/DesignSystemComponents';
import Testimonials from 'docs/src/components/home/Testimonials';
import Sponsors from 'docs/src/components/home/Sponsors';
import HeroEnd from 'docs/src/components/home/HeroEnd';
import AppFooter from 'docs/src/layouts/AppFooter';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import NewsletterToast from 'docs/src/components/home/NewsletterToast';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

export default function Home() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="MUI: The React component library you always wanted"
        description="MUI provides a simple, customizable, and accessible library of React components. Follow your own design system, or start with Material Design."
        card="/static/social-previews/home-preview.jpg"
      >
        {/* Organization schema for Google Knowledge Panel and entity recognition.
          https://developers.google.com/search/docs/appearance/structured-data/organization */}
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MUI',
              url: 'https://mui.com/',
              logo: 'https://mui.com/static/favicon.svg',
              sameAs: [
                'https://github.com/mui/',
                'https://x.com/MUI_hq',
                'https://www.npmjs.com/package/@mui/material',
              ],
            }),
          }}
        />
      </Head>
      <NoSsr>
        <NewsletterToast />
      </NoSsr>
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <References companies={CORE_CUSTOMERS} />
        <Divider />
        <ProductSuite />
        <Divider />
        <ValueProposition />
        <Divider />
        <DesignSystemComponents />
        <Divider />
        <Testimonials />
        <Divider />
        <Sponsors />
        <Divider />
        <HeroEnd />
        <Divider />
      </main>
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
