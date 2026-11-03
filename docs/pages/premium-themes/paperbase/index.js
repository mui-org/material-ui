import AppTheme from 'docs/src/modules/components/AppTheme';
import Paperbase from 'docs/src/pages/premium-themes/paperbase/Paperbase';

export default function Page() {
  return (
    <AppTheme
      title="Paperbase theme - MUI"
      description={`A page that mimics Firebase.
        This item includes theming using the theme provider component.`}
    >
      <Paperbase />
    </AppTheme>
  );
}
