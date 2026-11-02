import * as React from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import Router from 'next/router';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AnalyticsProvider, useAnalyticsConsent } from './AnalyticsProvider';
import type * as BrandingCssVarsProviderModule from '../branding/BrandingCssVarsProvider';

const theme = createTheme();

vi.mock('../branding/BrandingCssVarsProvider', async (importOriginal) => ({
  ...(await importOriginal<typeof BrandingCssVarsProviderModule>()),
  BrandingCssThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

describe('AnalyticsProvider', () => {
  const { render } = createRenderer();
  const doNotTrackDescriptor = Object.getOwnPropertyDescriptor(navigator, 'doNotTrack');

  // WebKit rejects more than 100 history writes per 10 seconds, so write only on a change.
  function resetUrl() {
    if (window.location.pathname !== '/' || window.location.search || window.location.hash) {
      window.history.replaceState(null, '', '/');
    }
  }

  function renderProvider(children: React.ReactNode = null) {
    const view = render(
      <ThemeProvider theme={theme}>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </ThemeProvider>,
    );
    return {
      ...view,
      user: view.user.setup({ advanceTimers: vi.advanceTimersByTimeAsync }),
    };
  }

  async function advanceTimers(milliseconds: number) {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(milliseconds);
    });
  }

  async function findDialog() {
    await advanceTimers(32);
    return screen.getByRole('dialog');
  }

  beforeEach(() => {
    // Control both the opening frames and transition completion, including in background tabs.
    vi.useFakeTimers({
      toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'setTimeout', 'clearTimeout'],
    });
    // Testing Library uses this bridge to drain its async wrapper with fake timers.
    vi.stubGlobal('jest', { advanceTimersByTime: vi.advanceTimersByTime });
    const storage = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    });
    Object.defineProperty(navigator, 'doNotTrack', { configurable: true, value: '0' });
    resetUrl();
    vi.stubGlobal('gtag', vi.fn());
  });

  afterEach(() => {
    window.localStorage.removeItem('docs-cookie-consent');
    resetUrl();
    if (doNotTrackDescriptor) {
      Object.defineProperty(navigator, 'doNotTrack', doNotTrackDescriptor);
    } else {
      Reflect.deleteProperty(navigator, 'doNotTrack');
    }
    vi.useRealTimers();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('reopens saved consent on page load and clears the hash after a choice', async () => {
    window.localStorage.setItem('docs-cookie-consent', 'analytics');
    window.history.replaceState({ existing: true }, '', '/material-ui/?test=1#cookie-preferences');
    const { user } = renderProvider();

    await findDialog();
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription(
      'We use cookies to understand site usage and improve our content. This includes third-party analytics. Current preference: Analytics allowed',
    );
    expect(window.localStorage.getItem('docs-cookie-consent')).to.equal('analytics');
    await user.click(screen.getByRole('button', { name: 'Essential only' }));

    await advanceTimers(theme.transitions.duration.leavingScreen);
    expect(screen.queryByRole('dialog')).to.equal(null);
    expect(window.localStorage.getItem('docs-cookie-consent')).to.equal('essential');
    expect(window.location.pathname + window.location.search).to.equal('/material-ui/?test=1');
    expect(window.location.hash).to.equal('');
    expect(window.history.state).to.deep.equal({ existing: true });
  });

  it('does not show a current preference before the first choice', async () => {
    renderProvider();
    await findDialog();
    expect(screen.queryByText(/Current preference:/)).to.equal(null);
  });

  it('cancels the pending opening frame when consent is given between frames', async () => {
    function ConsentButton() {
      const { setEssentialOnly } = useAnalyticsConsent();
      return <button onClick={setEssentialOnly}>Choose essential cookies</button>;
    }

    const { user } = renderProvider(<ConsentButton />);
    await advanceTimers(16);
    await user.click(screen.getByRole('button', { name: 'Choose essential cookies' }));
    expect(window.localStorage.getItem('docs-cookie-consent')).to.equal('essential');

    await advanceTimers(16);
    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('allows reopening repeatedly through a hash link', async () => {
    window.localStorage.setItem('docs-cookie-consent', 'essential');
    const { user } = renderProvider(<a href="#cookie-preferences">Cookie settings</a>);
    expect(screen.queryByRole('dialog')).to.equal(null);

    const reopenAndAccept = async (currentPreference: string) => {
      const hashChanged = new Promise<void>((resolve) => {
        window.addEventListener('hashchange', () => resolve(), { once: true });
      });
      await user.click(screen.getByRole('link', { name: 'Cookie settings' }));
      await act(async () => {
        // jsdom dispatches hashchange through a nested timeout.
        await vi.advanceTimersByTimeAsync(1);
        await hashChanged;
      });
      await findDialog();
      expect(screen.getByText(`Current preference: ${currentPreference}`)).not.to.equal(null);
      await user.click(screen.getByRole('button', { name: 'Allow analytics' }));
      await advanceTimers(theme.transitions.duration.leavingScreen);
      expect(screen.queryByRole('dialog')).to.equal(null);
      expect(window.localStorage.getItem('docs-cookie-consent')).to.equal('analytics');
    };
    await reopenAndAccept('Essential only');
    await reopenAndAccept('Analytics allowed');
  });

  it.each(['hashChangeComplete', 'routeChangeComplete'] as const)(
    'opens after Next.js %s navigation',
    async (event) => {
      window.localStorage.setItem('docs-cookie-consent', 'essential');
      renderProvider();
      act(() => {
        window.history.pushState(null, '', '/#cookie-preferences');
        Router.events.emit(event, '/#cookie-preferences', { shallow: false });
      });
      await findDialog();
    },
  );
});
