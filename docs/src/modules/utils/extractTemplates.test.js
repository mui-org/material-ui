import { describe, it, expect } from 'vitest';
import extractTemplates from './extractTemplates';

describe('extractTemplates', () => {
  it('get correct templates', () => {
    const result = extractTemplates({
      './email/App.tsx': '',
      './team/App.tsx': '',
      './files/App.tsx': '',
    });
    expect(Object.keys(result)).to.deep.equal(['email', 'team', 'files']);
  });

  it('extract correct template files', () => {
    const result = extractTemplates({
      './email/App.tsx': '',
      './email/components/Layout.tsx': '',
      './email/components/MailContent.tsx': '',
      './email/components/Mails.tsx': '',
      './email/components/Navigation.tsx': '',
      './email/theme.tsx': '',
    });
    expect(result.email.files).to.deep.equal({
      'App.tsx': '',
      'components/Layout.tsx': '',
      'components/MailContent.tsx': '',
      'components/Mails.tsx': '',
      'components/Navigation.tsx': '',
      'theme.tsx': '',
    });
  });

  it('extract code variant', () => {
    const result = extractTemplates({
      './email/App.js': '',
      './email/components/Layout.js': '',
      './email/components/MailContent.js': '',
      './email/components/Mails.js': '',
      './email/components/Navigation.js': '',
      './email/theme.tsx': '',
    });
    expect(result.email.codeVariant).to.equal('TS');
  });
});
