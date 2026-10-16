import { describe, beforeEach, it, expect, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, screen, waitFor } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import DemoContentLoading from './DemoContentLoading';

const mocks = vi.hoisted(() => ({
  canLoadContent: false,
  loadDemoContent: vi.fn(() => Promise.resolve({ default: () => null })),
}));

vi.mock('@mui/internal-docs-infra/CodeHighlighter', () => ({
  useCodeFallback: () => ({ canLoadContent: mocks.canLoadContent }),
}));

vi.mock('./loadDemoContent', () => ({
  loadDemoContent: mocks.loadDemoContent,
}));

describe('DemoContentLoading client behavior', () => {
  const { render } = createRenderer();

  function renderLoading() {
    return (
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContentLoading component={null} hideToolbar />
        </ThemeProvider>
      </UserLanguageProvider>
    );
  }

  beforeEach(() => {
    mocks.canLoadContent = false;
    mocks.loadDemoContent.mockClear();
  });

  it('renders inert toolbar controls until live content is ready', () => {
    render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContentLoading component={null} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    const toolbar = screen.getByRole('toolbar', { hidden: true });

    expect(toolbar).to.have.attribute('aria-busy', 'true');
    expect(toolbar).to.have.attribute('inert');
    expect(screen.getByRole('button', { name: 'Show code', hidden: true })).not.to.equal(null);
    expect(screen.getByRole('button', { name: 'Copy the source', hidden: true })).not.to.equal(
      null,
    );
  });

  // Landing on a source deep link expands the skeleton at hydration, so the
  // page settles before the live content (and its language swap) arrives.
  it('expands the skeleton when the hash targets its source anchor', () => {
    window.location.hash = '#Probe.jsx';
    try {
      const { container } = render(
        <UserLanguageProvider defaultUserLanguage="en">
          <ThemeProvider theme={brandingLightTheme}>
            <DemoContentLoading component={null} fileNames={['Probe.tsx']} />
          </ThemeProvider>
        </UserLanguageProvider>,
      );

      expect(container.querySelector('[data-code-expanded]')).not.to.equal(null);
    } finally {
      window.history.replaceState(null, '', window.location.pathname);
    }
  });

  it('starts loading content only when deferred precompute starts', async () => {
    const { rerender } = render(renderLoading());

    expect(mocks.loadDemoContent.mock.calls.length).to.equal(0);

    mocks.canLoadContent = true;
    rerender(renderLoading());

    await waitFor(() => expect(mocks.loadDemoContent.mock.calls.length).to.equal(1));
  });
});
