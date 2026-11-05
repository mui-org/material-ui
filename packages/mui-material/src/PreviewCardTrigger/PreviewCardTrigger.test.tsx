import { describe, it, expect } from 'vitest';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen, waitFor } from '@mui/internal-test-utils';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardTrigger, {
  PreviewCardTriggerDataAttributes,
} from '@mui/material/PreviewCardTrigger';
import PreviewCardPopup from '@mui/material/PreviewCardPopup';
import describeConformance from '../../test/describeConformance';

describe('<PreviewCardTrigger />', () => {
  const { render } = createRenderer();

  describeConformance(<PreviewCardTrigger render={<a href="#">Link</a>} />, () => ({
    classes: { root: '' },
    render: (node) => render(<PreviewCard>{node}</PreviewCard>),
    muiName: 'MuiPreviewCardTrigger',
    refInstanceof: window.HTMLAnchorElement,
    only: ['refForwarding'],
  }));

  it("renders the user's element with Base UI attributes and keeps its handlers", async () => {
    const handleClick = spy();
    await render(
      <PreviewCard defaultOpen>
        <PreviewCardTrigger
          render={
            <a href="#" className="user-link" onClick={handleClick}>
              Link
            </a>
          }
        />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    const trigger = screen.getByText('Link');
    expect(trigger.tagName).to.equal('A');
    expect(trigger).to.have.class('user-link');
    expect(trigger).to.have.attribute(PreviewCardTriggerDataAttributes.popupOpen);
    fireEvent.click(trigger);
    expect(handleClick.callCount).to.equal(1);
  });

  it('accepts a render function that receives the Base UI state', async () => {
    const states: boolean[] = [];
    await render(
      <PreviewCard defaultOpen>
        <PreviewCardTrigger
          render={(props, state) => {
            states.push(state.open);
            return (
              <a href="#" {...props}>
                Link
              </a>
            );
          }}
        />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    expect(states.at(-1)).to.equal(true);
  });

  it('opens the popup on focus', async () => {
    const handleOpenChange = spy();
    await render(
      <PreviewCard onOpenChange={handleOpenChange}>
        <PreviewCardTrigger delay={0} render={<a href="#">Link</a>} />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    const trigger = screen.getByText('Link');
    expect(trigger).not.to.have.attribute(PreviewCardTriggerDataAttributes.popupOpen);
    await act(async () => {
      trigger.focus();
    });
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.to.equal(null);
    });
    expect(handleOpenChange.args[0][0]).to.equal(true);
    expect(handleOpenChange.args[0][1].reason).to.equal('trigger-focus');
    expect(trigger).to.have.attribute(PreviewCardTriggerDataAttributes.popupOpen);
  });

  it('opens the popup on hover', async () => {
    const handleOpenChange = spy();
    await render(
      <PreviewCard onOpenChange={handleOpenChange}>
        <PreviewCardTrigger delay={0} render={<a href="#">Link</a>} />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    const trigger = screen.getByText('Link');
    fireEvent.pointerEnter(trigger, { pointerType: 'mouse' });
    fireEvent.mouseEnter(trigger);
    fireEvent.mouseMove(trigger);
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.to.equal(null);
    });
    expect(handleOpenChange.args[0][1].reason).to.equal('trigger-hover');
  });

  it('passes the id to the rendered element', async () => {
    await render(
      <PreviewCard>
        <PreviewCardTrigger id="trigger-id" render={<a href="#">Link</a>} />
      </PreviewCard>,
    );
    expect(screen.getByText('Link')).to.have.attribute('id', 'trigger-id');
  });
});
