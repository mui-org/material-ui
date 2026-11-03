import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import Blog from 'docs/data/material/getting-started/templates/blog/Blog';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <Blog />
      </TemplateFrame>
    </AppTheme>
  );
}
