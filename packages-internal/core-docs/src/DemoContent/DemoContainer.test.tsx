import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/material/styles';
import { brandingLightTheme } from '../branding';
import { UserLanguageProvider } from '../i18n';
import { DemoContainer, DemoFileTabBarSkeleton } from './DemoContainer';
import '../ThemeContext/syntax.css';

// Stand-in demo that records the isolation props injected by `IsolatedDemo` via
// `React.cloneElement`. The real demos forward these to `CssVarsProvider`, which
// needs them to attach the `light`/`dark` class to the right node.
function ProbeDemo(props: {
  colorSchemeNode?: Element | null;
  colorSchemeSelector?: string;
  cssVarPrefix?: string;
}) {
  return (
    <div
      data-testid="probe"
      data-has-color-scheme-node={props.colorSchemeNode != null ? 'yes' : 'no'}
      data-color-scheme-selector={props.colorSchemeSelector ?? ''}
      data-css-var-prefix={props.cssVarPrefix ?? ''}
    />
  );
}

function StatefulDemo() {
  const [count, setCount] = React.useState(0);
  return <button onClick={() => setCount((value) => value + 1)}>{count}</button>;
}

describe('DemoContainer', () => {
  const { render } = createRenderer();

  // Regression: the error boundary used to sit between `DemoComponentTheme` and
  // the demo, so the `cloneElement` that injects the isolation props targeted the
  // error boundary (which renders `children` verbatim) and the demo never saw
  // them. The boundary now wraps `DemoComponentTheme` from the outside so the
  // clone reaches the demo element directly.
  it('forwards isolation props to the demo, not the error boundary, when isolated', () => {
    render(
      // `DemoContainer` reads `useTranslate()` (for the initial-focus button's
      // `aria-label`), so it needs a language in scope — the app provides one via
      // `AppFrame`; supply it here so the lookup resolves instead of warning.
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContainer name="probe-demo" isolated preview={<ProbeDemo />} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    const probe = screen.getByTestId('probe');
    expect(probe.getAttribute('data-color-scheme-selector')).to.equal('class');
    expect(probe.getAttribute('data-css-var-prefix')).to.equal('probe-demo');
    // `colorSchemeNode` is wired through the `<div ref>` wrapper after its ref
    // resolves and the component re-renders.
    expect(probe.getAttribute('data-has-color-scheme-node')).to.equal('yes');
  });

  it('assigns the source id to the source region', () => {
    render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContainer
            preview={<div />}
            toolbar={<div />}
            code={<pre>source</pre>}
            codeId="demo-source"
          />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    expect(document.getElementById('demo-source')).to.have.text('source');
  });

  it.skipIf(isJsdom())('separates an inline preview from its toolbar', () => {
    render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContainer
            preview={<div />}
            toolbar={<div />}
            toolbarLabel="Demo actions"
            bg="inline"
          />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    expect(screen.getByRole('toolbar', { hidden: true })).toHaveComputedStyle({
      marginTop: '8px',
      borderTopWidth: '1px',
    });
  });

  // Regression: the off-screen height reservation for a collapsible block keyed
  // its expanded (`data-total-lines`) branch on `data-code-open`, which is set
  // for any visible source — the collapsed focus window included. Every
  // collapsed demo below the fold reserved its full-source height and shrank
  // once scrolled into view, shifting the page after anchor navigation.
  // The reservation is gated behind `@supports` for typed `attr()` (Chromium
  // 133+); older engines skip the optimisation and this test.
  const supportsTypedAttr = () =>
    !isJsdom() && CSS.supports('contain-intrinsic-size', 'calc(attr(x type(<number>), 0) * 1px)');

  it.skipIf(!supportsTypedAttr())('reserves the focus window height for collapsed source', () => {
    function renderSource(expanded: boolean) {
      return (
        <UserLanguageProvider defaultUserLanguage="en">
          <ThemeProvider theme={brandingLightTheme}>
            <DemoContainer
              preview={<div />}
              toolbar={<div />}
              expanded={expanded}
              sourceVisible
              code={
                <pre>
                  <code
                    data-testid="source"
                    data-collapsible=""
                    data-total-lines="12"
                    data-focused-lines="3"
                  >
                    source
                  </code>
                </pre>
              }
            />
          </ThemeProvider>
        </UserLanguageProvider>
      );
    }

    const { rerender } = render(renderSource(false));
    // 3 focused lines × 19.5px line height.
    expect(getComputedStyle(screen.getByTestId('source')).containIntrinsicHeight).to.equal(
      'auto 58.5px',
    );

    rerender(renderSource(true));
    // 12 total lines × 19.5px line height.
    expect(getComputedStyle(screen.getByTestId('source')).containIntrinsicHeight).to.equal(
      'auto 234px',
    );
  });

  // Source deep links (`#<File>.tsx` / `.jsx`) land on the source, so their
  // anchors sit just above the toolbar like master's, not at the demo top.
  it('places source anchors between the preview and the toolbar', () => {
    render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContainer
            anchorId="Probe"
            sourceAnchorIds={['Probe.tsx', 'Probe.jsx']}
            preview={<div data-testid="preview" />}
            toolbar={<div />}
            toolbarLabel="Demo actions"
          />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    const preview = screen.getByTestId('preview');
    const toolbar = screen.getByRole('toolbar', { hidden: true });
    // All siblings under the demo root, so the position is exactly FOLLOWING.
    const follows = (a: Node, b: Node) =>
      a.compareDocumentPosition(b) === Node.DOCUMENT_POSITION_FOLLOWING;
    for (const id of ['Probe.tsx', 'Probe.jsx']) {
      const anchor = document.getElementById(id)!;
      expect(follows(preview, anchor)).to.equal(true);
      expect(follows(anchor, toolbar)).to.equal(true);
    }
    expect(follows(document.getElementById('Probe')!, preview)).to.equal(true);
  });

  it('reserves the full file tab bar height while loading', () => {
    render(
      <ThemeProvider theme={brandingLightTheme}>
        <DemoFileTabBarSkeleton data-testid="file-tabs-loading" />
      </ThemeProvider>,
    );

    expect(getComputedStyle(screen.getByTestId('file-tabs-loading')).minHeight).to.equal('50px');
  });

  it('remounts the outer preview subtree when the preview epoch changes', async () => {
    const { rerender, user } = render(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContainer preview={<StatefulDemo />} previewEpoch={0} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    await user.click(screen.getByRole('button', { name: '0' }));
    expect(screen.getByRole('button', { name: '1' })).not.to.equal(null);

    rerender(
      <UserLanguageProvider defaultUserLanguage="en">
        <ThemeProvider theme={brandingLightTheme}>
          <DemoContainer preview={<StatefulDemo />} previewEpoch={1} />
        </ThemeProvider>
      </UserLanguageProvider>,
    );

    expect(screen.getByRole('button', { name: '0' })).not.to.equal(null);
  });
});
