import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import Dashboard from 'docs/data/material/getting-started/templates/dashboard/Dashboard';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <Dashboard />
      </TemplateFrame>
    </AppTheme>
  );
}
