import Divider from '@mui/material/Divider';

import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';
import References, { ADVANCED_CUSTOMERS } from 'docs/src/components/home/References';
import XHero from 'docs/src/components/productX/XHero';
import XComponents from 'docs/src/components/productX/XComponents';
import XDataGrid from 'docs/src/components/productX/XDataGrid';
import XPlans from 'docs/src/components/productX/XPlans';
import XTheming from 'docs/src/components/productX/XTheming';
import XRoadmap from 'docs/src/components/productX/XRoadmap';

export default function X() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="MUI X: Advanced React components for complex use cases"
        description="Build complex and data-rich applications using a growing list of advanced React
        components, like the Data Grid, Date and Time Pickers, Charts, and more!"
        card="/static/social-previews/muix-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader gitHubRepository="https://github.com/mui/mui-x" />
      <main id="main-content" tabIndex={-1}>
        <XHero />
        <References companies={ADVANCED_CUSTOMERS} />
        <Divider />
        <XComponents />
        <Divider />
        <XDataGrid />
        <Divider />
        <XTheming />
        <Divider />
        <XPlans />
        <Divider />
        <XRoadmap />
        <Divider />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/mui-x-charts+or+mui-x-data-grid+or+mui-x-date-picker+or+mui-x-tree-view" />
    </BrandingCssVarsProvider>
  );
}
