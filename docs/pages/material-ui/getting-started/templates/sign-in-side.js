import AppTheme from 'docs/src/modules/components/AppTheme';
import TemplateFrame from 'docs/src/modules/components/TemplateFrame';
import SignInSide from 'docs/data/material/getting-started/templates/sign-in-side/SignInSide';

export default function Page() {
  return (
    <AppTheme>
      <TemplateFrame>
        <SignInSide />
      </TemplateFrame>
    </AppTheme>
  );
}
