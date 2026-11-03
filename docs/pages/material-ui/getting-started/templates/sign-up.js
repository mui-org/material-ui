import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import SignUp from 'docs/data/material/getting-started/templates/sign-up/SignUp';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <SignUp />
      </TemplateFrame>
    </AppTheme>
  );
}
