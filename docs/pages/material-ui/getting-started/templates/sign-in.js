import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import SignIn from 'docs/data/material/getting-started/templates/sign-in/SignIn';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <SignIn />
      </TemplateFrame>
    </AppTheme>
  );
}
