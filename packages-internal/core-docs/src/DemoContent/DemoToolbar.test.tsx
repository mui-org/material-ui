import { describe, it, expect } from 'vitest';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import { DemoToolbar, useToolbarKeyboard } from './DemoToolbar';
import type { DemoToolbarProps } from './DemoToolbar';

const noop = () => {};
const asyncNoop = async () => {};

function Toolbar(props: Partial<DemoToolbarProps>) {
  const keyboard = useToolbarKeyboard();
  return (
    <div
      ref={keyboard.toolbarRef}
      role="toolbar"
      aria-label="Demo actions"
      onKeyDown={keyboard.handleKeyDown}
      onFocus={keyboard.handleFocus}
    >
      <DemoToolbar
        gaLabel="example-demo"
        demoSourceId="demo-source"
        expanded={false}
        onToggleExpand={noop}
        toggleRef={React.createRef()}
        showCodeLabel="Show source"
        hasJsTransform
        isJsSelected={false}
        onLanguageClick={noop}
        variants={['Default']}
        selectedVariant="Default"
        onSelectVariant={noop}
        openMuiChat={asyncNoop}
        onOpenStackBlitz={noop}
        onOpenCodeSandbox={noop}
        onCopySource={asyncNoop}
        onResetFocus={noop}
        {...props}
      />
    </div>
  );
}

describe('DemoToolbar', () => {
  const { render } = createRenderer();

  function renderToolbar(props: Partial<DemoToolbarProps> = {}) {
    return render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <Toolbar {...props} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );
  }

  it('uses one roving tab stop across all toolbar controls', () => {
    renderToolbar();
    const toolbar = screen.getByRole('toolbar');
    const buttons = Array.from(toolbar.querySelectorAll('button'));

    expect(buttons.filter((button) => button.tabIndex === 0)).to.have.length(1);
    act(() => buttons[0].focus());
    fireEvent.keyDown(buttons[0], { key: 'ArrowRight' });
    const expand = screen.getByRole('button', { name: 'Show source' });
    expect(document.activeElement).to.equal(expand);
    expect(expand.tabIndex).to.equal(0);
  });

  it('marks a single tab stop in the server markup', () => {
    // Master baked `tabIndex` into the markup; querying visibility after mount
    // forces a style flush per button on every demo.
    const buttons =
      ReactDOMServer.renderToStaticMarkup(
        <UserLanguageProvider defaultUserLanguage="en">
          <ThemeProvider theme={brandingLightTheme}>
            <Toolbar />
          </ThemeProvider>
        </UserLanguageProvider>,
      ).match(/<button[^>]*>/g) ?? [];
    const tabStops = buttons.filter((button) => !button.includes('tabindex="-1"'));

    expect(buttons.length).to.be.greaterThan(2);
    expect(tabStops).to.have.length(1);
  });

  it('routes reset controls and preserves legacy analytics actions', async () => {
    let resetCount = 0;
    let resetFocusCount = 0;
    const onReset = () => {
      resetCount += 1;
    };
    const onResetFocus = () => {
      resetFocusCount += 1;
    };
    const { user } = renderToolbar({ onReset, onResetFocus });

    const expand = screen.getByRole('button', { name: 'Show source' });
    expect(expand.getAttribute('data-ga-event-action')).to.equal('expand');
    expect(
      screen.getByRole('button', { name: 'Edit in Chat' }).getAttribute('data-ga-event-category'),
    ).to.equal('mui-chat');

    await user.click(screen.getByRole('button', { name: /Reset focus/ }));
    await user.click(screen.getByRole('button', { name: 'Reset demo' }));
    expect(resetFocusCount).to.equal(1);
    expect(resetCount).to.equal(1);
  });

  it('renders deployment links with legacy analytics actions', async () => {
    const { user } = renderToolbar({
      deploymentLinks: {
        pullRequest: 'https://preview.example.com/guide/#ExampleDemo',
        next: 'https://next.example.com/guide/#ExampleDemo',
        permalink: 'https://deploy.example.com/guide/#ExampleDemo',
        master: 'https://master.example.com/guide/#ExampleDemo',
      },
    });

    await user.click(screen.getByRole('button', { name: 'See more' }));
    expect(
      screen.getByRole('menuitem', { name: 'demo on PR' }).getAttribute('data-ga-event-action'),
    ).to.equal('link-deploy-preview');
    expect(screen.getByRole('menuitem', { name: 'demo permalink' }).getAttribute('href')).to.equal(
      'https://deploy.example.com/guide/#ExampleDemo',
    );
  });
});
