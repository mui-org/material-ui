import { beforeEach, afterEach, it, expect, describe, vi } from 'vitest';
import * as React from 'react';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import DemoContext from '../DemoContext';
import type { DemoContextValue } from '../DemoContext';
import PageContext from '../PageContext';
import { OpenInMUIChatButton } from './OpenInMUIChatButton';
import type { DemoData } from '../sandbox/types';

const mocks = vi.hoisted(() => ({
  openSandbox: vi.fn(async () => {}),
}));

vi.mock('../sandbox/MuiChat', () => ({
  createMuiChat: () => ({ openSandbox: mocks.openSandbox }),
}));

const pageContext = {
  activePage: null,
  pages: [],
  productId: 'material-ui',
  productCategoryId: 'core',
  productIdentifier: { metadata: '', name: 'Material UI', versions: [] },
  activePageParents: [],
} satisfies React.ContextType<typeof PageContext>;

const demoContext = {
  productDisplayName: 'Material UI',
  csb: { primaryPackage: '@mui/material' },
} satisfies DemoContextValue;

const demoData: DemoData = {
  title: 'BasicTabs',
  language: 'tsx',
  raw: '',
  codeVariant: 'TS',
  githubLocation: 'docs/data/material/components/tabs/BasicTabs.tsx',
  productId: 'material-ui',
};

function createDeferredPromise() {
  let resolve!: () => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<void>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });

  return { promise, resolve, reject };
}

describe.skipIf(!isJsdom())('OpenInMUIChatButton', () => {
  const { render } = createRenderer();

  function renderButton(children?: React.ReactNode) {
    return render(
      <PageContext.Provider value={pageContext}>
        <DemoContext.Provider value={demoContext}>
          <ThemeProvider theme={brandingLightTheme}>
            <OpenInMUIChatButton demoData={demoData} />
            {children}
          </ThemeProvider>
        </DemoContext.Provider>
      </PageContext.Provider>,
    );
  }

  beforeEach(() => {
    mocks.openSandbox.mockReset();
    vi.stubEnv('MUI_CHAT_API_BASE_URL', 'https://chat.example.com');
    vi.stubEnv('MUI_CHAT_SCOPES', 'material-ui');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('restores focus after opening MUI Chat', async () => {
    const deferred = createDeferredPromise();
    mocks.openSandbox.mockImplementation(() => deferred.promise);
    const { user } = renderButton();
    const chatButton = screen.getByRole('button', { name: 'Edit in Chat' });

    await user.click(chatButton);
    expect(chatButton).to.have.property('disabled', true);

    act(() => document.documentElement.focus());
    expect(document.activeElement).not.to.equal(chatButton);

    await act(async () => deferred.resolve());

    expect(chatButton).to.have.property('disabled', false);
    expect(document.activeElement).to.equal(chatButton);
  });

  it('restores focus when opening MUI Chat fails', async () => {
    const deferred = createDeferredPromise();
    mocks.openSandbox.mockImplementation(() => deferred.promise);
    const { user } = renderButton();
    const chatButton = screen.getByRole('button', { name: 'Edit in Chat' });

    await user.click(chatButton);
    expect(chatButton).to.have.property('disabled', true);

    act(() => document.documentElement.focus());
    expect(document.activeElement).not.to.equal(chatButton);

    await act(async () => deferred.reject(new Error('Unable to open MUI Chat')));

    expect(chatButton).to.have.property('disabled', false);
    expect(document.activeElement).to.equal(chatButton);
    expect(screen.getByRole('alert')).to.have.text('Unable to open MUI Chat');
  });

  it('does not restore focus if the user moves it while loading', async () => {
    const deferred = createDeferredPromise();
    mocks.openSandbox.mockImplementation(() => deferred.promise);
    const { user } = renderButton(<button type="button">Other action</button>);
    const chatButton = screen.getByRole('button', { name: 'Edit in Chat' });
    const otherButton = screen.getByRole('button', { name: 'Other action' });

    await user.click(chatButton);
    await user.click(otherButton);
    expect(document.activeElement).to.equal(otherButton);

    await act(async () => deferred.resolve());

    expect(chatButton).to.have.property('disabled', false);
    expect(document.activeElement).to.equal(otherButton);
  });
});
