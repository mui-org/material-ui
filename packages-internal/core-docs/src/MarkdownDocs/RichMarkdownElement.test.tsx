import * as React from 'react';
import * as ReactDOM from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import { act, createRenderer, screen } from '@mui/internal-test-utils';
import { UserLanguageProvider } from '../i18n';
import { RichMarkdownElement } from './RichMarkdownElement';

vi.mock('../Demo/Demo', () => ({
  Demo: ({ demo }: { demo: { raw: string } }) => <span>{demo.raw}</span>,
}));

describe('RichMarkdownElement', () => {
  const { render } = createRenderer();

  it('renders migrated components synchronously on the server', () => {
    const view = ReactDOM.renderToString(
      <RichMarkdownElement
        demoComponents={{}}
        localizedDoc={{ location: '/docs/data/test.md' }}
        renderedMarkdownOrDemo={{ component: 'probe', label: 'Component content' }}
        srcComponents={{ probe: ({ label }) => <span>{label}</span> }}
      />,
    );

    expect(view).to.equal('<span>Component content</span>');
  });

  it('loads legacy demos when a legacy directive is encountered', async () => {
    render(
      <UserLanguageProvider defaultUserLanguage="en">
        <RichMarkdownElement
          demoComponents={{}}
          demos={{ 'Legacy.js': { raw: 'Legacy source' } }}
          localizedDoc={{ location: '/docs/data/test.md' }}
          renderedMarkdownOrDemo={{ demo: 'Legacy.js' }}
        />
      </UserLanguageProvider>,
    );

    await act(async () => {
      await vi.dynamicImportSettled();
    });

    expect(await screen.findByText('Legacy source')).not.to.equal(null);
  });
});
