import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import Checkout from 'docs/data/material/getting-started/templates/checkout/Checkout';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <Checkout />
      </TemplateFrame>
    </AppTheme>
  );
}
