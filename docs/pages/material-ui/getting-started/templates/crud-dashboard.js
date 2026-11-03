import dynamic from 'next/dynamic';
import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';

const CrudDashboard = dynamic(
  () => import('../../../../data/material/getting-started/templates/crud-dashboard/CrudDashboard'),
  { ssr: false },
);

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <CrudDashboard />
      </TemplateFrame>
    </AppTheme>
  );
}
