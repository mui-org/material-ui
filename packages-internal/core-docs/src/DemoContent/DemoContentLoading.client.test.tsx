import { describe, beforeEach, it, expect, vi } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
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

  // The live toolbar arrives with the code-split `DemoContent` chunk. The
  // skeleton renders the same buttons, inert, so they are visible from first
  // paint instead of popping in once the chunk lands.
  // Skipped in jsdom: without media queries the toolbar stays `display: none`
  // (it shows from the `sm` breakpoint up), which empties the accessible names.
  it.skipIf(isJsdom())('renders the toolbar buttons before the live content mounts', () => {
    render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContentLoading component={null} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    expect(screen.getByRole('toolbar', { name: 'demo source' })).to.have.attribute(
      'aria-busy',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Show code' })).not.to.equal(null);
    expect(screen.getByRole('button', { name: 'Copy the source' })).not.to.equal(null);
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
      expect(screen.getByRole('button', { name: 'Hide code', hidden: true })).not.to.equal(null);
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
