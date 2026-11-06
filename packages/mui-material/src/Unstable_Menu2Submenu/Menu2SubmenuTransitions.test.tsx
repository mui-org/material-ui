import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { act, createRenderer, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2Item from '@mui/material/Unstable_Menu2Item';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses as classes,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';

// Submenus need layout and real CSS transitions.
describe.skipIf(isJsdom())('Menu2 submenu transitions', () => {
  const { render } = createRenderer();

  async function openSubmenu(user: ReturnType<typeof render>['user']) {
    const trigger = await screen.findByRole('menuitem', { name: 'More' });
    await waitFor(() => {
      expect(trigger.closest('[role="menu"]')!.contains(document.activeElement)).to.equal(true);
    });
    await act(async () => trigger.focus());
    await user.keyboard('{ArrowRight}');
    const item = await screen.findByRole('menuitem', { name: 'Nested' });
    await waitFor(() => expect(item).toHaveFocus());
    const popup = item.closest('[role="menu"]')!;
    await waitFor(() => expect(popup.getAnimations()).to.have.length(0));
    return { trigger, item, popup };
  }

  [false, true].forEach((keepMounted) => {
    it(`tracks external controlled closes without returning focus, keepMounted=${keepMounted}`, async () => {
      const onOpenChange = vi.fn();
      const onOpenChangeComplete = vi.fn();
      const renderStates = vi.fn();
      const indicatorOwnerStates = vi.fn();
      function Demo() {
        const [open, setOpen] = React.useState(false);
        return (
          <Menu2 defaultOpen modal={false}>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup>
              <Menu2Submenu
                open={open}
                onOpenChange={(nextOpen, details) => {
                  onOpenChange(nextOpen, details);
                  setOpen(nextOpen);
                }}
                onOpenChangeComplete={onOpenChangeComplete}
              >
                <Menu2SubmenuTrigger
                  openOnHover={false}
                  render={(props, state) => {
                    renderStates(state);
                    return <div {...props} data-owner-open={String(state.open)} />;
                  }}
                  slotProps={{
                    indicator: (state) => {
                      indicatorOwnerStates(state);
                      return { 'data-owner-open': String(state.open) };
                    },
                  }}
                >
                  More
                </Menu2SubmenuTrigger>
                <Menu2SubmenuPopup keepMounted={keepMounted} finalFocus={false}>
                  <Menu2Item
                    onKeyDown={(event) => {
                      if (event.key === 'F2') {
                        setOpen(false);
                      }
                    }}
                  >
                    Nested
                  </Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
        );
      }
      const { user } = render(<Demo />);
      const { trigger, popup } = await openSubmenu(user);
      const indicator = trigger.querySelector(`.${classes.indicator}`)!;
      const openBackground = getComputedStyle(trigger).backgroundColor;
      expect(trigger).to.have.attribute('data-owner-open', 'true');
      expect(indicator).to.have.attribute('data-owner-open', 'true');
      await waitFor(() => expect(onOpenChangeComplete).toHaveBeenCalledWith(true));
      onOpenChange.mockClear();
      onOpenChangeComplete.mockClear();

      // F2 changes the controlled prop without moving focus or requesting a
      // close through Base UI's interaction handlers.
      await user.keyboard('{F2}');
      expect(onOpenChange).not.toHaveBeenCalled();
      expect(popup).to.have.attribute('data-ending-style');
      expect(trigger).not.to.have.class(classes.open);
      expect(trigger).to.have.attribute('data-owner-open', 'false');
      expect(indicator).to.have.attribute('data-owner-open', 'false');
      expect(getComputedStyle(trigger).backgroundColor).not.to.equal('rgba(0, 0, 0, 0)');
      expect(getComputedStyle(trigger).backgroundColor).to.equal(openBackground);
      expect(onOpenChangeComplete).not.toHaveBeenCalled();

      await waitFor(() => {
        expect(onOpenChangeComplete).toHaveBeenCalledExactlyOnceWith(false);
        expect(getComputedStyle(trigger).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
      });
      expect(popup.isConnected).to.equal(keepMounted);
      [renderStates, indicatorOwnerStates].forEach((ownerStates) => {
        expect(ownerStates).toHaveBeenCalled();
        ownerStates.mock.calls.forEach(([state]) => {
          expect(state).not.to.have.property('closing');
          expect(state).not.to.have.property('retainClosingTint');
        });
      });
    });
  });

  ['cancel', 'reject controlled'].forEach((mode) => {
    it(`keeps the submenu open for a ${mode} close`, async () => {
      const onOpenChange = vi.fn();
      function Demo() {
        const [open, setOpen] = React.useState(false);
        return (
          <Menu2 defaultOpen modal={false}>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup>
              <Menu2Submenu
                open={mode === 'reject controlled' ? open : undefined}
                onOpenChange={(nextOpen, details) => {
                  onOpenChange(nextOpen, details);
                  if (nextOpen) {
                    setOpen(true);
                  } else if (mode === 'cancel') {
                    details.cancel();
                  }
                }}
              >
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
        );
      }
      const { user } = render(<Demo />);
      const { trigger, popup } = await openSubmenu(user);
      const openBackground = getComputedStyle(trigger).backgroundColor;
      onOpenChange.mockClear();
      await user.keyboard('{Escape}');
      expect(onOpenChange).toHaveBeenCalledTimes(1);
      expect(trigger).to.have.class(classes.open);
      expect(popup).not.to.have.attribute('data-ending-style');
      expect(getComputedStyle(trigger).backgroundColor).to.equal(openBackground);
    });
  });

  it('keeps the open tint when a controlled submenu reopens during exit', async () => {
    const onOpenChangeComplete = vi.fn();
    function Demo() {
      const [open, setOpen] = React.useState(false);
      return (
        <Menu2 defaultOpen modal={false}>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup>
            <Menu2Submenu
              open={open}
              onOpenChange={setOpen}
              onOpenChangeComplete={onOpenChangeComplete}
            >
              <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup finalFocus={false}>
                <Menu2Item
                  onKeyDown={(event) => {
                    if (event.key === 'F2') {
                      setOpen(false);
                    }
                    if (event.key === 'F3') {
                      setOpen(true);
                    }
                  }}
                >
                  Nested
                </Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>
      );
    }
    const { user } = render(<Demo />);
    const { trigger, popup } = await openSubmenu(user);
    const openBackground = getComputedStyle(trigger).backgroundColor;
    await waitFor(() => expect(onOpenChangeComplete).toHaveBeenCalledWith(true));
    onOpenChangeComplete.mockClear();
    await user.keyboard('{F2}');
    expect(popup).to.have.attribute('data-ending-style');
    expect(trigger).not.to.have.class(classes.open);
    expect(getComputedStyle(trigger).backgroundColor).to.equal(openBackground);
    await user.keyboard('{F3}');
    expect(trigger).to.have.class(classes.open);
    expect(getComputedStyle(trigger).backgroundColor).to.equal(openBackground);
    await waitFor(() => {
      expect(onOpenChangeComplete).toHaveBeenCalledExactlyOnceWith(true);
      expect(trigger).to.have.class(classes.open);
      expect(popup).not.to.have.attribute('data-ending-style');
    });
    expect(popup.isConnected).to.equal(true);
    expect(getComputedStyle(trigger).backgroundColor).to.equal(openBackground);
  });

  it('completes the exit when transitions are disabled', async () => {
    const onFocus = vi.fn();
    const onOpenChangeComplete = vi.fn();
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Submenu onOpenChangeComplete={onOpenChangeComplete}>
            <Menu2SubmenuTrigger openOnHover={false} onFocus={onFocus}>
              More
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup
              keepMounted
              slots={{ transition: null }}
              slotProps={{ root: { sx: { '&, &[data-ending-style]': { transition: 'none' } } } }}
            >
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
          <Menu2Item>Sibling</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );
    const { trigger } = await openSubmenu(user);
    await waitFor(() => expect(onOpenChangeComplete).toHaveBeenCalledWith(true));
    onFocus.mockClear();
    onOpenChangeComplete.mockClear();
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(trigger).toHaveFocus();
      expect(trigger).not.to.have.class(classes.open);
      expect(onOpenChangeComplete).toHaveBeenCalledExactlyOnceWith(false);
      expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);
    });
    expect(onFocus).toHaveBeenCalledTimes(1);
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Sibling' })).toHaveFocus();
    expect(getComputedStyle(trigger).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
  });

  it('keeps the exit transition local to the submenu that closes', async () => {
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Submenu>
            <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
              <Menu2Submenu>
                <Menu2SubmenuTrigger openOnHover={false}>Inner</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item>Deep</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );
    const { trigger, popup } = await openSubmenu(user);
    await user.keyboard('{ArrowDown}{ArrowRight}');
    const deep = await screen.findByRole('menuitem', { name: 'Deep' });
    await waitFor(() => {
      expect(deep).toHaveFocus();
      expect(deep.closest('[role="menu"]')!.getAnimations()).to.have.length(0);
    });
    const inner = screen.getByRole('menuitem', { name: 'Inner' });
    const innerPopup = deep.closest('[role="menu"]')!;
    const openBackground = getComputedStyle(trigger).backgroundColor;
    const innerOpenBackground = getComputedStyle(inner).backgroundColor;
    await user.keyboard('{Escape}');
    expect(innerPopup).to.have.attribute('data-ending-style');
    expect(inner).not.to.have.class(classes.open);
    expect(getComputedStyle(inner).backgroundColor).to.equal(innerOpenBackground);
    expect(trigger).to.have.class(classes.open);
    expect(popup).not.to.have.attribute('data-ending-style');
    expect(getComputedStyle(trigger).backgroundColor).to.equal(openBackground);
    await waitFor(() => {
      expect(inner).toHaveFocus();
      expect(innerPopup.isConnected).to.equal(false);
    });
    expect(trigger).to.have.class(classes.open);
    expect(getComputedStyle(trigger).backgroundColor).to.equal(openBackground);
  });
});
