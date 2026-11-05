import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import type { Menu2PopupProps } from '@mui/material/Unstable_Menu2Popup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Dialog from '../Dialog';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Menu2Item from '../Unstable_Menu2Item';
import Menu2 from './Menu2';

describe.skipIf(isJsdom())('Menu2 opening a Material Dialog', () => {
  const { render } = createRenderer();

  [
    { name: 'default Grow', props: {} },
    { name: 'default Grow with keepMounted', props: { keepMounted: true } },
    { name: 'no menu transition', props: { slots: { transition: null } } },
    {
      name: 'zero-duration menu and dialog transitions',
      props: { transitionDuration: 0 },
      dialogTransitionDuration: 0,
    },
  ].forEach(
    ({
      name,
      props,
      dialogTransitionDuration,
    }: {
      name: string;
      props: Partial<Menu2PopupProps>;
      dialogTransitionDuration?: number;
    }) => {
      [false, true].forEach((autoFocus) => {
        it(`returns focus to an explicit target with ${name}, child autoFocus=${autoFocus}`, async () => {
          const menuCompleted = vi.fn();
          const dialogExited = vi.fn();

          function Demo() {
            const [dialogOpen, setDialogOpen] = React.useState(false);
            const triggerRef = React.useRef<HTMLButtonElement>(null);

            return (
              <React.Fragment>
                <Menu2 onOpenChangeComplete={menuCompleted}>
                  <Menu2Trigger
                    render={
                      <button type="button" ref={triggerRef}>
                        Options
                      </button>
                    }
                  />
                  <Menu2Popup {...props}>
                    <Menu2Item onClick={() => setDialogOpen(true)}>Open dialog</Menu2Item>
                  </Menu2Popup>
                </Menu2>
                <Dialog
                  open={dialogOpen}
                  transitionDuration={dialogTransitionDuration}
                  disableRestoreFocus
                  slotProps={{
                    transition: {
                      onExited: () => {
                        triggerRef.current?.focus({ preventScroll: true });
                        dialogExited();
                      },
                    },
                  }}
                >
                  <button type="button" autoFocus={autoFocus} onClick={() => setDialogOpen(false)}>
                    Close dialog
                  </button>
                </Dialog>
              </React.Fragment>
            );
          }

          const { user } = render(<Demo />);
          const trigger = screen.getByRole('button', { name: 'Options' });
          await user.tab();
          expect(trigger).toHaveFocus();
          await user.keyboard('{Enter}');
          const menu = await screen.findByRole('menu');
          await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(true));
          expect(screen.getByRole('menuitem', { name: 'Open dialog' })).toHaveFocus();
          menuCompleted.mockClear();

          await user.keyboard('{Enter}');
          const dialog = await screen.findByRole('dialog');
          const closeButton = screen.getByRole('button', { name: 'Close dialog' });
          expect(dialog.contains(document.activeElement)).to.equal(true);

          // The menu's completed exit must not take focus from the open dialog.
          await waitFor(() => expect(menuCompleted).toHaveBeenCalledExactlyOnceWith(false));
          expect(menu.isConnected).to.equal(Boolean(props.keepMounted));
          expect(dialog.contains(document.activeElement)).to.equal(true);
          expect(dialogExited).not.toHaveBeenCalled();

          if (!autoFocus) {
            await user.tab();
          }
          expect(closeButton).toHaveFocus();
          await user.keyboard('{Enter}');
          await waitFor(() => expect(dialogExited).toHaveBeenCalledTimes(1));
          expect(dialog.isConnected).to.equal(false);
          expect(trigger).toHaveFocus();
        });
      });
    },
  );

  [false, true].forEach((autoFocus) => {
    it(`restores focus with classic Menu without an explicit target, child autoFocus=${autoFocus}`, async () => {
      const menuExited = vi.fn();

      function Demo() {
        const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
        const [dialogOpen, setDialogOpen] = React.useState(false);

        return (
          <React.Fragment>
            <button type="button" onClick={(event) => setAnchorEl(event.currentTarget)}>
              Options
            </button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              slotProps={{ transition: { onExited: menuExited } }}
            >
              <MenuItem
                onClick={() => {
                  setAnchorEl(null);
                  setDialogOpen(true);
                }}
              >
                Open dialog
              </MenuItem>
            </Menu>
            <Dialog open={dialogOpen}>
              <button type="button" autoFocus={autoFocus} onClick={() => setDialogOpen(false)}>
                Close dialog
              </button>
            </Dialog>
          </React.Fragment>
        );
      }

      const { user } = render(<Demo />);
      const trigger = screen.getByRole('button', { name: 'Options' });
      await user.tab();
      expect(trigger).toHaveFocus();
      await user.keyboard('{Enter}');
      const menu = await screen.findByRole('menu');
      expect(screen.getByRole('menuitem', { name: 'Open dialog' })).toHaveFocus();

      await user.keyboard('{Enter}');
      const dialog = await screen.findByRole('dialog');
      const closeButton = screen.getByRole('button', { name: 'Close dialog' });
      expect(dialog.contains(document.activeElement)).to.equal(true);

      await waitFor(() => expect(menuExited).toHaveBeenCalledTimes(1));
      expect(menu.isConnected).to.equal(false);
      expect(dialog.contains(document.activeElement)).to.equal(true);

      if (document.activeElement !== closeButton) {
        await user.tab();
      }
      expect(closeButton).toHaveFocus();
      await user.keyboard('{Enter}');
      await waitFor(() => expect(dialog.isConnected).to.equal(false));
      expect(trigger).toHaveFocus();
    });
  });
});
