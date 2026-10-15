import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import DemoContentLoading from './DemoContentLoading';

vi.mock('@mui/internal-docs-infra/CodeHighlighter', () => ({
  useCodeFallback: () => ({ canLoadContent: false }),
}));

describe('DemoContentLoading SSR', () => {
  it('reserves toolbar space without rendering unavailable actions', () => {
    const view = ReactDOM.renderToString(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContentLoading component={<span>Demo preview</span>} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    expect(view).to.contain('Demo preview');
    expect(view).to.contain('aria-busy="true"');
    expect(view).to.contain('height:42px');
    expect(view).not.to.contain('aria-label="Copy the source"');
    expect(view).not.to.contain('aria-label="Show code"');
  });
});
