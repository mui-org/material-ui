import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, fireEvent, isJsdom, screen } from '@mui/internal-test-utils';
import PreviewCard from '@mui/material/PreviewCard';
import PreviewCardTrigger from '@mui/material/PreviewCardTrigger';
import PreviewCardPopup, {
  previewCardPopupClasses,
  PreviewCardPopupDataAttributes,
  PreviewCardPositionerDataAttributes,
} from '@mui/material/PreviewCardPopup';
import Paper, { paperClasses } from '@mui/material/Paper';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { TransitionProps } from '@mui/material/transitions';
import describeConformance from '../../test/describeConformance';

function renderOpen(popup: React.ReactElement) {
  return (
    <PreviewCard defaultOpen>
      <PreviewCardTrigger render={<a href="#">Link</a>} />
      {popup}
    </PreviewCard>
  );
}

describe('<PreviewCardPopup />', () => {
  const { render } = createRenderer();

  describeConformance(<PreviewCardPopup>Content</PreviewCardPopup>, () => ({
    classes: previewCardPopupClasses,
    render: (node) => render(renderOpen(node)),
    getRootElement: () => screen.getByText('Content').closest(`.${previewCardPopupClasses.root}`),
    inheritComponent: Paper,
    muiName: 'MuiPreviewCardPopup',
    refInstanceof: window.HTMLDivElement,
    testVariantProps: { elevation: 2 },
    skip: ['componentProp'],
    slots: {
      portal: { expectedClassName: previewCardPopupClasses.portal },
      positioner: { expectedClassName: previewCardPopupClasses.positioner },
    },
  }));

  function getPopup() {
    return screen.getByText('Content').closest<HTMLElement>(`.${previewCardPopupClasses.root}`)!;
  }

  it('renders a Paper with elevation 8 and the open class', async () => {
    await render(renderOpen(<PreviewCardPopup>Content</PreviewCardPopup>));
    const popup = getPopup();
    expect(popup).to.have.class(paperClasses.root);
    expect(popup).to.have.class(paperClasses.elevation8);
    expect(popup).to.have.class(previewCardPopupClasses.open);
  });

  it('sets the Base UI data attributes on the popup and the positioner', async () => {
    await render(renderOpen(<PreviewCardPopup side="top">Content</PreviewCardPopup>));
    const popup = getPopup();
    const positioner = popup.parentElement!;
    expect(popup).to.have.attribute(PreviewCardPopupDataAttributes.open);
    expect(popup).not.to.have.attribute(PreviewCardPopupDataAttributes.closed);
    expect(popup).to.have.attribute(PreviewCardPopupDataAttributes.side);
    expect(popup).to.have.attribute(PreviewCardPopupDataAttributes.align, 'center');
    expect(positioner).to.have.class(previewCardPopupClasses.positioner);
    expect(positioner).to.have.attribute(PreviewCardPositionerDataAttributes.open);
    expect(positioner).to.have.attribute(PreviewCardPositionerDataAttributes.side);
    expect(positioner).to.have.attribute(PreviewCardPositionerDataAttributes.align, 'center');
    expect(positioner).not.to.have.attribute(PreviewCardPositionerDataAttributes.anchorHidden);
  });

  it('keeps the attributes Base UI computes', async () => {
    await render(renderOpen(<PreviewCardPopup>Content</PreviewCardPopup>));
    expect(getPopup().parentElement).to.have.attribute('role', 'presentation');
  });

  it('does not leak internal props to the DOM', async () => {
    await render(
      renderOpen(
        <PreviewCardPopup
          elevation={4}
          sideOffset={12}
          keepMounted
          transitionDuration={100}
          classes={{ root: 'custom-root' }}
        >
          Content
        </PreviewCardPopup>,
      ),
    );
    const popup = getPopup();
    ['render', 'classes', 'ownerstate', 'elevation', 'sideoffset', 'side', 'keepmounted'].forEach(
      (attribute) => {
        expect(popup).not.to.have.attribute(attribute);
      },
    );
    expect(popup).not.to.have.attribute('transitionduration');
    expect(popup).to.have.class('custom-root');
  });

  it('sets the direction on the positioner', async () => {
    await render(
      <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
        {renderOpen(<PreviewCardPopup>Content</PreviewCardPopup>)}
      </ThemeProvider>,
    );
    expect(getPopup().parentElement).to.have.attribute('dir', 'rtl');
  });

  describe('prop: render', () => {
    it('keeps the Material base when the element changes', async () => {
      await render(renderOpen(<PreviewCardPopup render={<section />}>Content</PreviewCardPopup>));
      const popup = getPopup();
      expect(popup.tagName).to.equal('SECTION');
      expect(popup).to.have.class(previewCardPopupClasses.root);
      expect(popup).to.have.class(paperClasses.root);
      expect(popup).to.have.class(paperClasses.elevation8);
      expect(popup).to.have.attribute(PreviewCardPopupDataAttributes.open);
      expect(popup).not.to.have.attribute('elevation');
      expect(popup).not.to.have.attribute('renderstate');
    });

    it('passes the Base UI state to a render function', async () => {
      const states: Array<{ open: boolean; side: string }> = [];
      await render(
        renderOpen(
          <PreviewCardPopup
            render={(props, state) => {
              states.push({ open: state.open, side: state.side });
              return <article {...props} />;
            }}
          >
            Content
          </PreviewCardPopup>,
        ),
      );
      expect(getPopup().tagName).to.equal('ARTICLE');
      expect(states.at(-1)).to.deep.equal({ open: true, side: 'bottom' });
    });

    it("uses the render element's own children", async () => {
      await render(
        renderOpen(
          <PreviewCardPopup render={<section>Replaced</section>}>Content</PreviewCardPopup>,
        ),
      );
      expect(screen.queryByText('Content')).to.equal(null);
      expect(screen.getByText('Replaced')).to.have.class(previewCardPopupClasses.root);
    });

    it('does not pass render wiring to a custom root slot', async () => {
      const receivedProps: Array<Record<string, unknown>> = [];
      const CustomRoot = React.forwardRef<HTMLDivElement, Record<string, unknown>>(
        function CustomRoot(props, ref) {
          receivedProps.push(props);
          const { children, className } = props as {
            children: React.ReactNode;
            className: string;
          };
          return (
            <div ref={ref} className={className} data-testid="custom-root">
              {children}
            </div>
          );
        },
      );
      await render(
        renderOpen(
          <PreviewCardPopup render={<section />} slots={{ root: CustomRoot }}>
            Content
          </PreviewCardPopup>,
        ),
      );
      expect(screen.getByTestId('custom-root').tagName).to.equal('DIV');
      receivedProps.forEach((props) => {
        expect(props).not.to.have.property('render');
        expect(props).not.to.have.property('renderState');
        expect(props).not.to.have.property('component');
        expect(props).not.to.have.property('as');
      });
    });
  });

  it('ignores the component prop', async () => {
    await render(
      renderOpen(
        // @ts-expect-error component is not supported
        <PreviewCardPopup component="section">Content</PreviewCardPopup>,
      ),
    );
    const popup = getPopup();
    expect(popup.tagName).to.equal('DIV');
    expect(popup).not.to.have.attribute('component');
  });

  describe('slots', () => {
    it('gives the portal slot no live state', async () => {
      const ownerStates: Array<Record<string, unknown>> = [];
      await render(
        renderOpen(
          <PreviewCardPopup
            slotProps={{
              portal: (ownerState) => {
                ownerStates.push(ownerState as unknown as Record<string, unknown>);
                return {};
              },
            }}
          >
            Content
          </PreviewCardPopup>,
        ),
      );
      expect(ownerStates.length).to.be.greaterThan(0);
      ownerStates.forEach((ownerState) => {
        expect(ownerState).not.to.have.property('open');
      });
    });

    it('renders the root without Grow when slots.transition is null', async () => {
      await render(
        renderOpen(<PreviewCardPopup slots={{ transition: null }}>Content</PreviewCardPopup>),
      );
      const popup = getPopup();
      expect(popup.style.opacity).to.equal('');
      expect(popup.style.transform).to.equal('');
    });

    it('applies the Grow styles to the popup', async () => {
      await render(renderOpen(<PreviewCardPopup>Content</PreviewCardPopup>));
      const popup = getPopup();
      expect(popup.style.opacity).to.equal('1');
      expect(popup.style.transform).not.to.equal('');
    });

    it('drops transitionDuration="auto" for a transition without auto support', async () => {
      const timeouts: Array<TransitionProps['timeout']> = [];
      function CustomTransition(props: TransitionProps & { children: React.ReactElement }) {
        timeouts.push(props.timeout);
        return props.children;
      }
      await render(
        renderOpen(
          <PreviewCardPopup slots={{ transition: CustomTransition }} transitionDuration="auto">
            Content
          </PreviewCardPopup>,
        ),
      );
      expect(getPopup()).not.to.equal(null);
      expect(timeouts.length).to.be.greaterThan(0);
      timeouts.forEach((timeout) => {
        expect(timeout).to.equal(undefined);
      });
    });
  });

  it.skipIf(isJsdom())('uses the tooltip stacking layer', async () => {
    const theme = createTheme();
    await render(renderOpen(<PreviewCardPopup>Content</PreviewCardPopup>));
    const portal = document.querySelector(`.${previewCardPopupClasses.portal}`)!;
    expect(portal).toHaveComputedStyle({ zIndex: String(theme.zIndex.tooltip) });
  });

  it.skipIf(isJsdom())('hides the portal of a closed keepMounted popup', async () => {
    await render(
      <PreviewCard>
        <PreviewCardTrigger render={<a href="#">Link</a>} />
        <PreviewCardPopup keepMounted>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    const portal = document.querySelector(`.${previewCardPopupClasses.portal}`)!;
    expect(portal).not.to.equal(null);
    expect(portal).toHaveComputedStyle({ display: 'none' });
  });

  it.skipIf(isJsdom())('applies a theme style override that targets the open class', async () => {
    const theme = createTheme({
      components: {
        MuiPreviewCardPopup: {
          styleOverrides: {
            root: {
              [`&.${previewCardPopupClasses.open}`]: { mixBlendMode: 'darken' },
              [`&[${PreviewCardPopupDataAttributes.open}]`]: { fontVariantCaps: 'all-petite-caps' },
            },
          },
        },
      },
    });
    await render(
      <ThemeProvider theme={theme}>
        {renderOpen(<PreviewCardPopup>Content</PreviewCardPopup>)}
      </ThemeProvider>,
    );
    expect(getPopup()).toHaveComputedStyle({
      mixBlendMode: 'darken',
      fontVariantCaps: 'all-petite-caps',
    });
  });

  it('closes on Escape', async () => {
    const handleOpenChange = spy();
    await render(
      <PreviewCard defaultOpen onOpenChange={handleOpenChange}>
        <PreviewCardTrigger render={<a href="#">Link</a>} />
        <PreviewCardPopup>Content</PreviewCardPopup>
      </PreviewCard>,
    );
    fireEvent.keyDown(document.body, { key: 'Escape' });
    expect(handleOpenChange.callCount).to.equal(1);
    expect(handleOpenChange.args[0][0]).to.equal(false);
    expect(handleOpenChange.args[0][1].reason).to.equal('escape-key');
    const popup = screen.queryByText('Content');
    if (popup) {
      expect(popup.closest(`.${previewCardPopupClasses.root}`)).to.have.attribute(
        PreviewCardPopupDataAttributes.closed,
      );
    }
  });
});
