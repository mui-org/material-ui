import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, isJsdom, screen } from '@mui/internal-test-utils';
import PreviewCard, { createPreviewCardHandle } from '@mui/material/PreviewCard';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import PreviewCardPopup, { PreviewCardPopupDataAttributes } from '@mui/material/PreviewCardPopup';
import { ThemeProvider, createTheme } from '@mui/material/styles';

function expectClosed(text: string) {
  const content = screen.queryByText(text);
  if (content) {
    expect(content).to.have.attribute(PreviewCardPopupDataAttributes.closed);
  }
}

describe('<PreviewCard />', () => {
  const { render, renderToString } = createRenderer();

  it('renders the popup when defaultOpen is set', async () => {
    await render(
      <PreviewCard defaultOpen>
        <PreviewCardTrigger render={<a href="#">Link</a>} />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    expect(screen.getByText('Content')).to.have.attribute(PreviewCardPopupDataAttributes.open);
  });

  it('is controlled by open', async () => {
    const { setProps } = await render(
      <PreviewCard open={false}>
        <PreviewCardTrigger render={<a href="#">Link</a>} />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    expect(screen.queryByText('Content')).to.equal(null);
    await act(async () => {
      setProps({ open: true });
    });
    expect(screen.getByText('Content')).not.to.equal(null);
    await act(async () => {
      setProps({ open: false });
    });
    expectClosed('Content');
  });

  it('calls onOpenChange with the Base UI event details', async () => {
    const handleOpenChange = spy();
    const actionsRef = React.createRef<{ close: () => void; unmount: () => void }>();
    await render(
      <PreviewCard defaultOpen onOpenChange={handleOpenChange} actionsRef={actionsRef}>
        <PreviewCardTrigger render={<a href="#">Link</a>} />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    await act(async () => {
      actionsRef.current!.close();
    });
    expect(handleOpenChange.callCount).to.equal(1);
    expect(handleOpenChange.args[0][0]).to.equal(false);
    expect(handleOpenChange.args[0][1].reason).to.equal('imperative-action');
    expectClosed('Content');
  });

  it('opens from a detached trigger with a handle and passes its payload', async () => {
    const handle = createPreviewCardHandle<string>();
    await render(
      <React.Fragment>
        <PreviewCardTrigger
          handle={handle}
          id="detached"
          payload="From payload"
          render={<a href="#">Link</a>}
        />
        <PreviewCard handle={handle}>
          {({ payload }) => <PreviewCardPopup>{payload as string}</PreviewCardPopup>}
        </PreviewCard>
      </React.Fragment>,
    );
    expect(screen.queryByText('From payload')).to.equal(null);
    await act(async () => {
      handle.open('detached');
    });
    expect(screen.getByText('From payload')).not.to.equal(null);
    expect(handle.isOpen).to.equal(true);
  });

  it('reads defaultProps from the theme', async () => {
    const theme = createTheme({
      components: { MuiPreviewCard: { defaultProps: { defaultOpen: true } } },
    });
    await render(
      <ThemeProvider theme={theme}>
        <PreviewCard>
          <PreviewCardTrigger render={<a href="#">Link</a>} />
          <PreviewCardPopup>Content</PreviewCardPopup>
        </PreviewCard>
      </ThemeProvider>,
    );
    expect(screen.getByText('Content')).not.to.equal(null);
  });

  it.skipIf(!isJsdom())('renders the trigger on the server', () => {
    const { container } = renderToString(
      <PreviewCard defaultOpen>
        <PreviewCardTrigger render={<a href="#">Link</a>} />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    expect(container).to.have.text('Link');
  });
});
