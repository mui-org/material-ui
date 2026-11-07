import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import * as React from 'react';
import PropTypes from 'prop-types';
import { describe, it, expect, vi } from 'vitest';
import { act, createRenderer, screen, waitFor, isJsdom } from '@mui/internal-test-utils';
import Menu2 from './Menu2';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2Submenu from '../Unstable_Menu2Submenu';
import Menu2SubmenuTrigger from '../Unstable_Menu2SubmenuTrigger';
import { createTheme, ThemeProvider } from '../styles';
import Fade from '../Fade';
import Grow from '../Grow';
import Zoom from '../Zoom';

describe('Menu2 transition slot validation', () => {
  [
    { Component: Menu2Popup, name: 'Menu2Popup' },
    { Component: Menu2SubmenuPopup, name: 'Menu2SubmenuPopup' },
  ].forEach(({ Component, name }) => {
    function checkTransition(transition: unknown) {
      PropTypes.resetWarningCache();
      // React 19 does not check propTypes when a component renders.
      PropTypes.checkPropTypes(Component.propTypes, { slots: { transition } }, 'prop', name);
    }

    it(`${name} accepts Material transitions and optional slot values`, () => {
      [Grow, Fade, Zoom, null, undefined].forEach((transition) => {
        expect(() => checkTransition(transition)).not.toErrorDev();
      });
    });

    it(`${name} rejects values that are not component types`, () => {
      [42, {}, <div />].forEach((transition) => {
        expect(() => checkTransition(transition)).toErrorDev('Invalid prop `slots.transition`');
      });
    });
  });
});

describe.skipIf(isJsdom())('Menu2 transitions', () => {
  const { render } = createRenderer();
  [
    { duration: { enter: 300, exit: 450 }, slotProps: {}, enter: '0.3s', exit: '0.45s' },
    { duration: 900, slotProps: { transition: { timeout: 300 } }, enter: '0.3s', exit: '0.3s' },
  ].forEach(({ duration, slotProps, enter, exit }, index) => {
    it(`honors configured timing and slot overrides (${index})`, async () => {
      const completed = vi.fn();
      const { user } = render(
        <Menu2 onOpenChangeComplete={completed}>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup transitionDuration={duration} slotProps={slotProps}>
            <Menu2Item>Item</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const popup = await screen.findByRole('menu');
      await waitFor(() =>
        expect(getComputedStyle(popup).transitionDuration.split(',')[0]).to.equal(enter),
      );
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
      completed.mockClear();
      await user.keyboard('{Escape}');
      expect(getComputedStyle(popup).transitionDuration.split(',')[0]).to.equal(exit);
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
    });
  });
  [Fade, Zoom].forEach((TransitionSlot) => {
    it(`supports ${TransitionSlot === Fade ? 'Fade' : 'Zoom'} and transition slot callbacks`, async () => {
      const entering = vi.fn();
      const exiting = vi.fn();
      const completed = vi.fn();
      const { user } = render(
        <Menu2 onOpenChangeComplete={completed}>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup
            slots={{ transition: TransitionSlot }}
            slotProps={{
              transition: (ownerState) => {
                expect(ownerState.slots?.transition).to.equal(TransitionSlot);
                return { onEntering: entering, onExiting: exiting };
              },
            }}
          >
            <Menu2Item>Item</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const popup = await screen.findByRole('menu');
      await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
      expect(entering).toHaveBeenCalledTimes(1);
      completed.mockClear();
      await user.keyboard('{Escape}');
      await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
      expect(exiting).toHaveBeenCalledTimes(1);
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
      await waitFor(() => expect(popup.isConnected).to.equal(false));
    });
  });

  it('supports CSS-only enter and exit without a transition component', async () => {
    const completed = vi.fn();
    const { user } = render(
      <Menu2 onOpenChangeComplete={completed}>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup
          slots={{ transition: null }}
          slotProps={{
            root: {
              sx: {
                transition: 'opacity 300ms linear',
                '&[data-starting-style], &[data-ending-style]': { opacity: 0 },
              },
            },
          }}
        >
          <Menu2Item>Item</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    expect(popup.style.opacity).to.equal('');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
    completed.mockClear();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    expect(popup.isConnected).to.equal(true);
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
    expect(popup.isConnected).to.equal(false);
  });

  it('disables Grow with transitionDuration=0', async () => {
    const completed = vi.fn();
    const { user } = render(
      <Menu2 onOpenChangeComplete={completed}>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup transitionDuration={0}>
          <Menu2Item>Item</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
    expect(getComputedStyle(popup).transitionDuration).to.equal('0s, 0s');
    expect(popup.getAnimations()).to.have.length(0);
    completed.mockClear();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
  });
  [false, true].forEach((keepMounted) => {
    it(`shows a defaultOpen popup without an enter animation, keepMounted=${keepMounted}`, async () => {
      const entering = vi.fn();
      const completed = vi.fn();
      const { user } = render(
        <Menu2 defaultOpen onOpenChangeComplete={completed}>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup keepMounted={keepMounted} slotProps={{ transition: { onEnter: entering } }}>
            <Menu2Item>Item</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );

      // An initially open root popup has no starting state or enter animation.
      const popup = screen.getByRole('menu');
      expect(popup).not.to.have.attribute('data-starting-style');
      expect(popup).toHaveComputedStyle({ opacity: '1', transform: 'none', visibility: 'visible' });
      expect(popup.getAnimations()).to.have.length(0);
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
      expect(entering).not.toHaveBeenCalled();

      async function closeAndReopen() {
        const closingPopup = screen.getByRole('menu');
        completed.mockClear();
        entering.mockClear();
        await user.keyboard('{Escape}');
        await waitFor(() => expect(closingPopup.getAnimations().length).to.be.greaterThan(0));
        await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
        expect(closingPopup.isConnected).to.equal(keepMounted);

        await user.click(screen.getByRole('button', { name: 'Options' }));
        const reopenedPopup = await screen.findByRole('menu');
        await waitFor(() => expect(reopenedPopup.getAnimations().length).to.be.greaterThan(0));
        expect(entering).toHaveBeenCalledTimes(1);
        expect(completed.mock.calls).to.deep.equal([[false]]);
        await waitFor(() => {
          expect(reopenedPopup.getAnimations()).to.have.length(0);
          expect(completed.mock.calls).to.deep.equal([[false], [true]]);
        });
        expect(entering).toHaveBeenCalledTimes(1);
      }
      await closeAndReopen();
      await closeAndReopen();
    });

    it(`animates enter and Escape exit on the actual popup, keepMounted=${keepMounted}`, async () => {
      const completed = vi.fn();
      const entering = vi.fn();
      const { user } = render(
        <Menu2 onOpenChangeComplete={completed}>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup keepMounted={keepMounted} slotProps={{ transition: { onEnter: entering } }}>
            <Menu2Item>Item</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      await user.click(screen.getByRole('button', { name: 'Options' }));
      const popup = await screen.findByRole('menu');
      await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
      expect(entering).toHaveBeenCalledTimes(1);
      expect(completed).not.toHaveBeenCalledWith(true);
      await waitFor(() => {
        expect(popup.getAnimations()).to.have.length(0);
        expect(completed).toHaveBeenCalledExactlyOnceWith(true);
      });
      completed.mockClear();
      await user.keyboard('{Escape}');
      expect(popup).to.have.attribute('data-instant', 'dismiss');
      await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
      expect(popup.isConnected).to.equal(true);
      expect(completed).not.toHaveBeenCalled();
      await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
      expect(popup.isConnected).to.equal(keepMounted);
    });
  });

  it('cancels the pending close when reopened during exit', async () => {
    const completed = vi.fn();
    let updateOpen: React.Dispatch<React.SetStateAction<boolean>>;
    function Demo() {
      const [open, setOpen] = React.useState(false);
      updateOpen = setOpen;
      return (
        <Menu2 open={open} onOpenChange={setOpen} onOpenChangeComplete={completed}>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup>
            <Menu2Item>Item</Menu2Item>
          </Menu2Popup>
        </Menu2>
      );
    }
    const { user } = render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
    completed.mockClear();
    await act(async () => updateOpen(false));
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    await act(async () => updateOpen(true));
    await waitFor(() => {
      expect(completed).toHaveBeenCalledExactlyOnceWith(true);
      expect(popup.getAnimations()).to.have.length(0);
    });
    expect(screen.getByRole('menu')).to.equal(popup);
    expect(popup).not.to.have.attribute('data-ending-style');
    expect(getComputedStyle(popup).opacity).to.equal('1');
  });

  it('honors the theme reduced-motion policy', async () => {
    const completed = vi.fn();
    const { user } = render(
      <ThemeProvider theme={createTheme({ motion: { reducedMotion: 'always' } })}>
        <Menu2 onOpenChangeComplete={completed}>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup>
            <Menu2Item>Item</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(true));
    expect(popup.getAnimations()).to.have.length(0);
    expect(
      getComputedStyle(popup)
        .transitionDuration.split(',')
        .every((duration) => parseFloat(duration) === 0),
    ).to.equal(true);
    completed.mockClear();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(completed).toHaveBeenCalledExactlyOnceWith(false));
  });

  it('does not let a plain sx transition override disable the Grow transition', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup slotProps={{ root: { sx: { transition: 'none' } } }}>
          <Menu2Item>Item</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );
    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    await waitFor(() => expect(popup.getAnimations()).to.have.length(0));
  });

  it('keeps a trigger-less root open when its submenu opens', async () => {
    const changes: unknown[] = [];
    const { user } = render(
      <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
        <Menu2
          defaultOpen
          modal={false}
          onOpenChange={(open, details) => changes.push({ root: open, reason: details.reason })}
        >
          <Menu2Popup anchor={document.body}>
            <Menu2Submenu
              onOpenChange={(open, details) =>
                changes.push({ submenu: open, reason: details.reason })
              }
            >
              <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );
    const trigger = await screen.findByRole('menuitem', { name: 'More' });
    await waitFor(() =>
      expect(trigger.closest('[role="menu"]')!.contains(document.activeElement)).to.equal(true),
    );
    await act(async () => trigger.focus());
    await user.keyboard('{ArrowLeft}');
    expect(changes).to.deep.equal([{ submenu: true, reason: 'list-navigation' }]);
  });
});
