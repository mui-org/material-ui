import Menu2Trigger, { menu2TriggerClasses } from '@mui/material/Unstable_Menu2Trigger';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';

describe('Menu2 keyboard accessibility', () => {
  const { render } = createRenderer();

  ['{ArrowDown}', '{ArrowUp}', '{Enter}', ' '].forEach((key) => {
    it(`opens with ${key === ' ' ? 'Space' : key} and returns focus to the trigger`, async () => {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<Button disableRipple>Actions</Button>} />
          <Menu2Popup transitionDuration={0}>
            <Menu2Item disabled>Unavailable first action</Menu2Item>
            <Menu2Item>Profile</Menu2Item>
            <Menu2Item>Settings</Menu2Item>
            <Menu2Item disabled>Unavailable last action</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );
      const trigger = screen.getByRole('button', { name: 'Actions' });

      expect(trigger).to.have.attribute('aria-haspopup', 'menu');
      expect(trigger).to.have.attribute('aria-expanded', 'false');
      await act(async () => trigger.focus());
      await user.keyboard(key);

      const popup = await screen.findByRole('menu', { name: 'Actions' });
      await waitFor(() =>
        expect(document.activeElement).to.equal(
          screen.getByRole('menuitem', { name: key === '{ArrowUp}' ? 'Settings' : 'Profile' }),
        ),
      );
      expect(trigger.id).not.to.equal('');
      expect(popup.id).not.to.equal('');
      expect(popup).to.have.attribute('aria-labelledby', trigger.id);
      expect(trigger).to.have.attribute('aria-controls', popup.id);
      expect(trigger).to.have.attribute('aria-expanded', 'true');
      expect(trigger).to.have.class(menu2TriggerClasses.open);

      await user.keyboard('{Escape}');

      await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
      await waitFor(() => expect(trigger).toHaveFocus());
      expect(trigger).to.have.attribute('aria-expanded', 'false');
      expect(trigger).not.to.have.class(menu2TriggerClasses.open);
    });
  });

  [false, true].forEach((shift) => {
    it.skipIf(isJsdom())(
      `moves focus past the popup guards with ${shift ? 'Shift+Tab' : 'Tab'}`,
      async () => {
        const { user } = render(
          <React.Fragment>
            <Button disableRipple>Before</Button>
            <Menu2 modal={false}>
              <Menu2Trigger render={<Button disableRipple>Actions</Button>} />
              <Menu2Popup transitionDuration={0}>
                <Menu2Item>Profile</Menu2Item>
              </Menu2Popup>
            </Menu2>
            <Button disableRipple>After</Button>
          </React.Fragment>,
        );
        const trigger = screen.getByRole('button', { name: 'Actions' });
        await act(async () => trigger.focus());
        await user.keyboard('{ArrowDown}');
        await waitFor(() =>
          expect(screen.getByRole('menuitem', { name: 'Profile' })).toHaveFocus(),
        );

        await user.keyboard(shift ? '{Shift>}{Tab}{/Shift}' : '{Tab}');

        await waitFor(() =>
          expect(screen.getByRole('button', { name: shift ? 'Actions' : 'After' })).toHaveFocus(),
        );
        await waitFor(() => expect(screen.queryByRole('menu')).to.equal(null));
        expect(trigger).to.have.attribute('aria-expanded', 'false');
      },
    );
  });
});
