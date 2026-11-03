import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import MarketingPage from 'docs/data/material/getting-started/templates/marketing-page/MarketingPage';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <MarketingPage />
      </TemplateFrame>
    </AppTheme>
  );
}
