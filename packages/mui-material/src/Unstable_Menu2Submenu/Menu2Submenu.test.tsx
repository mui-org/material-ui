import type { Menu2SubmenuPopupProps } from '@mui/material/Unstable_Menu2SubmenuPopup';
import Menu2SubmenuPopup, {
  menu2SubmenuPopupClasses,
} from '@mui/material/Unstable_Menu2SubmenuPopup';
import type { Menu2PopupProps } from '@mui/material/Unstable_Menu2Popup';
import Menu2Popup, { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger, { menu2TriggerClasses } from '@mui/material/Unstable_Menu2Trigger';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Menu2 from '@mui/material/Unstable_Menu2';
import { resetMenu2WarningFlags } from '@mui/material/Unstable_Menu2/menu2Utils';
import type { Menu2PopupSharedSlotProps } from '@mui/material/Unstable_Menu2/menu2PopupShared';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import type { Menu2SubmenuProps } from '@mui/material/Unstable_Menu2Submenu';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';

interface TestMenuProps
  extends
    Pick<Menu2SubmenuProps, 'open' | 'onOpenChange' | 'loopFocus' | 'highlightItemOnHover'>,
    Omit<Menu2SubmenuPopupProps, 'slotProps'> {
  slotProps?: Menu2PopupSharedSlotProps<Menu2PopupProps | Menu2SubmenuPopupProps> &
    Menu2SubmenuPopupProps['slotProps'];
}

describe('<Menu2Submenu />', () => {
  const { render } = createRenderer();

  it('does not render a DOM wrapper or an implicit submenu popup', () => {
    render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Popup anchor={document.body}>
          <div data-testid="wrapper">
            <Menu2Submenu>
              <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            </Menu2Submenu>
          </div>
        </Menu2Popup>
      </Menu2>,
    );
    const wrapper = screen.getByTestId('wrapper');
    expect(wrapper.firstElementChild).to.equal(screen.getByRole('menuitem', { name: 'More' }));
    expect(wrapper.children).to.have.length(1);
    expect(screen.getAllByRole('menu')).to.have.length(1);
  });

  beforeEach(() => {
    resetMenu2WarningFlags();
  });

  // The popup takes the focus in a frame callback, not with the render. A key
  // that arrives first lands on the body and is lost.
  async function waitForPopupFocus(itemInPopup: HTMLElement) {
    const popup = itemInPopup.closest('[role="menu"]')!;
    await waitFor(() => {
      expect(popup.contains(document.activeElement)).to.equal(true);
    });
  }

  it('renders the trigger element as-is and opens the menu', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    // The caller's component survives; only the trigger behavior is merged in.
    expect(trigger).to.have.class('MuiButton-root');
    expect(trigger).to.have.class(menu2TriggerClasses.root);
    expect(trigger).to.have.attribute('aria-haspopup', 'menu');

    await user.click(trigger);

    const menu = await screen.findByRole('menu');
    expect(menu).to.have.class(menu2PopupClasses.root);
    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.class(menu2ItemClasses.root);
  });

  ['Menu2', 'Menu2Submenu'].forEach((componentName) => {
    describe(`${componentName} popup props`, () => {
      const TestMenu = React.forwardRef(function TestMenu(
        {
          children = (
            <React.Fragment>
              <Menu2Item>Alpha</Menu2Item>
              <Menu2Item>Beta</Menu2Item>
            </React.Fragment>
          ),
          open,
          onOpenChange,
          loopFocus,
          highlightItemOnHover,
          ...props
        }: TestMenuProps,
        ref: React.ForwardedRef<HTMLDivElement>,
      ) {
        if (componentName === 'Menu2Submenu') {
          return (
            <Menu2 defaultOpen modal={false}>
              <Menu2Trigger render={<Button disableRipple>Options</Button>} />
              <Menu2Popup>
                <Menu2Submenu
                  open={open}
                  onOpenChange={onOpenChange}
                  loopFocus={loopFocus}
                  highlightItemOnHover={highlightItemOnHover}
                >
                  <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                  <Menu2SubmenuPopup {...props} ref={ref}>
                    {children}
                  </Menu2SubmenuPopup>
                </Menu2Submenu>
              </Menu2Popup>
            </Menu2>
          );
        }

        return (
          <Menu2
            defaultOpen
            modal={false}
            open={open}
            onOpenChange={onOpenChange}
            loopFocus={loopFocus}
            highlightItemOnHover={highlightItemOnHover}
          >
            <Menu2Popup anchor={document.body} {...props} ref={ref}>
              {children}
            </Menu2Popup>
          </Menu2>
        );
      });

      async function openSubmenu(user: ReturnType<typeof render>['user'], keyboard = false) {
        if (componentName === 'Menu2Submenu') {
          const trigger = screen.getByRole('menuitem', { name: 'More' });
          await waitForPopupFocus(trigger);
          if (keyboard) {
            await act(async () => trigger.focus());
            await user.keyboard('{ArrowRight}');
          } else {
            await user.click(trigger);
          }
          await screen.findByRole('menuitem', { name: 'Alpha' });
        }
      }

      function getPopup() {
        return screen
          .getByRole('menuitem', { name: 'Alpha' })
          .closest<HTMLDivElement>('[role="menu"]')!;
      }

      function getRoot() {
        const rootClass =
          componentName === 'Menu2Submenu'
            ? menu2SubmenuPopupClasses.portal
            : menu2PopupClasses.portal;
        return getPopup().closest<HTMLDivElement>(`.${rootClass}`)!;
      }

      it('uses popup props for variants and slot callbacks without copying root behavior props', async () => {
        const theme = createTheme({
          components: {
            [componentName === 'Menu2' ? 'MuiMenu2Popup' : 'MuiMenu2SubmenuPopup']: {
              variants: [
                { props: { align: 'end' }, style: { paddingLeft: '17px' } },
                { props: { align: 'start' }, style: { paddingLeft: '19px' } },
              ],
            },
          },
        });

        function ControlledMenu() {
          const [open, setOpen] = React.useState(true);
          return (
            <TestMenu
              open={open}
              onOpenChange={setOpen}
              align={open ? 'end' : 'start'}
              loopFocus={false}
              highlightItemOnHover={false}
              keepMounted
              slotProps={{
                portal: (state: Menu2PopupProps | Menu2SubmenuPopupProps) => ({
                  'data-align-prop': state.align,
                }),
                root: (state: Menu2PopupProps | Menu2SubmenuPopupProps) => ({
                  'data-has-root-behavior': String(
                    'open' in state || 'loopFocus' in state || 'highlightItemOnHover' in state,
                  ),
                  style: { transition: 'none' },
                }),
                list: (state: Menu2PopupProps | Menu2SubmenuPopupProps) => ({
                  'data-align-prop': state.align,
                }),
              }}
            >
              <Menu2Item closeOnClick={false} onClick={() => setOpen(false)}>
                Alpha
              </Menu2Item>
            </TestMenu>
          );
        }

        const { user } = render(
          <ThemeProvider theme={theme}>
            <ControlledMenu />
          </ThemeProvider>,
        );
        const item = await screen.findByRole('menuitem', { name: 'Alpha' });
        const root = getRoot();
        const popup = getPopup();
        const list = item.parentElement!;
        expect(getComputedStyle(popup).paddingLeft).to.equal('17px');
        expect(root).to.have.attribute('data-align-prop', 'end');
        expect(popup).to.have.attribute('data-has-root-behavior', 'false');
        expect(list).to.have.attribute('data-align-prop', 'end');
        expect(root).not.to.have.attribute('open');
        expect(root).not.to.have.attribute('loopFocus');
        expect(popup).not.to.have.attribute('open');

        await user.click(item);

        await waitFor(() => {
          expect(root).to.have.attribute('data-align-prop', 'start');
          expect(list).to.have.attribute('data-align-prop', 'start');
          expect(getComputedStyle(popup).paddingLeft).to.equal('19px');
        });
      });

      it('applies className, style, and sx to the semantic popup, not the portal', async () => {
        const { user } = render(
          <TestMenu
            className="custom-root"
            style={{ paddingTop: '3px' }}
            sx={{ paddingBottom: '7px' }}
          />,
        );

        await openSubmenu(user);
        const popup = getPopup();
        const root = getRoot();
        expect(root).not.to.have.class('custom-root');
        expect(root).to.contain(popup);
        expect(popup).to.have.class('custom-root');
        expect(popup).to.have.class('MuiPaper-root');
        expect(root.style.paddingTop).to.equal('');
        expect(popup.style.paddingTop).to.equal('3px');
        expect(getComputedStyle(root).paddingBottom).not.to.equal('7px');
        expect(getComputedStyle(popup).paddingBottom).to.equal('7px');
      });

      it('merges the root slot props and keeps the other slot props separate', async () => {
        const { user } = render(
          <TestMenu
            className="custom-root"
            classes={{
              portal: 'root-class',
              positioner: 'positioner-class',
              root: 'paper-class',
              list: 'list-class',
            }}
            style={{ paddingLeft: '3px' }}
            sx={[{ paddingBottom: '7px' }, (theme) => ({ paddingTop: theme.spacing(1) })]}
            slotProps={{
              portal: {
                className: 'root-slot',
                style: { paddingRight: '5px' },
                sx: [{ paddingBottom: '9px' }],
              },
              positioner: {
                className: 'positioner-slot',
                sx: { paddingTop: '5px' },
                'data-testid': 'positioner',
              },
              root: {
                className: 'paper-slot',
                style: { paddingRight: '4px' },
                sx: { paddingTop: '11px' },
                'data-testid': 'paper',
              },
              list: {
                className: 'list-slot',
                sx: { paddingTop: '13px' },
                'data-testid': 'list',
              },
            }}
          />,
        );

        await openSubmenu(user);
        const root = getRoot();
        const positioner = screen.getByTestId('positioner');
        const paper = screen.getByTestId('paper');
        const list = screen.getByTestId('list');
        expect(paper).to.equal(getPopup());
        expect(paper).to.have.class('custom-root');
        expect(root).to.have.class('root-class');
        expect(root).to.have.class('root-slot');
        expect(positioner).to.have.class('positioner-class');
        expect(positioner).to.have.class('positioner-slot');
        expect(positioner.parentElement).to.equal(root);
        expect(paper.parentElement).to.equal(positioner);
        expect(paper).to.have.class('paper-class');
        expect(paper).to.have.class('paper-slot');
        expect(list).to.have.class('list-class');
        expect(list).to.have.class('list-slot');
        expect(root.style.paddingLeft).to.equal('');
        expect(root.style.paddingRight).to.equal('5px');
        expect(parseFloat(getComputedStyle(root).paddingTop)).to.equal(0);
        expect(getComputedStyle(root).paddingBottom).to.equal('9px');
        expect(getComputedStyle(positioner).paddingTop).to.equal('5px');
        expect(paper.style.paddingRight).to.equal('4px');
        expect(paper.style.paddingLeft).to.equal('3px');
        expect(getComputedStyle(paper).paddingBottom).to.equal('7px');
        expect(getComputedStyle(paper).paddingTop).to.equal('11px');
        expect(getComputedStyle(list).paddingTop).to.equal('13px');
      });

      it('forwards a portal slot ref without a public ref, including a custom portal slot', async () => {
        const slotRef = React.createRef<HTMLDivElement>();
        const { user, unmount } = render(
          <TestMenu slots={{ portal: 'div' }} slotProps={{ portal: () => ({ ref: slotRef }) }} />,
        );

        await openSubmenu(user);
        expect(slotRef.current).to.equal(getRoot());
        expect(slotRef.current).to.contain(getPopup());

        unmount();
        expect(slotRef.current).to.equal(null);
      });

      it('composes public and surface refs, and keeps the positioner and portal refs separate', async () => {
        const publicRef = vi.fn();
        const slotRef = React.createRef<HTMLDivElement>();
        const positionerRef = React.createRef<HTMLDivElement>();
        const paperRef = React.createRef<HTMLDivElement>();
        const { user, unmount } = render(
          <TestMenu
            ref={publicRef}
            slotProps={{
              portal: { ref: slotRef },
              positioner: { ref: positionerRef },
              root: { ref: paperRef },
            }}
          />,
        );

        await openSubmenu(user);
        const popup = getPopup();
        const root = getRoot();
        expect(publicRef).toHaveBeenLastCalledWith(popup);
        expect(slotRef.current).to.equal(root);
        expect(root).to.equal(popup.parentElement!.parentElement);
        expect(positionerRef.current).to.equal(popup.parentElement);
        expect(paperRef.current).to.equal(popup);
        expect(root).not.to.equal(popup);

        unmount();
        expect(publicRef).toHaveBeenLastCalledWith(null);
        expect(slotRef.current).to.equal(null);
        expect(positionerRef.current).to.equal(null);
        expect(paperRef.current).to.equal(null);
      });

      it('updates public and slot refs without replacing the popup', async () => {
        const firstRef = React.createRef<HTMLDivElement>();
        const nextRef = React.createRef<HTMLDivElement>();
        const firstSlotRef = vi.fn();
        const nextSlotRef = vi.fn();

        function ChangeRefs() {
          const [changed, setChanged] = React.useState(false);
          return (
            <TestMenu
              ref={changed ? nextRef : firstRef}
              slotProps={{ root: () => ({ ref: changed ? nextSlotRef : firstSlotRef }) }}
            >
              <Menu2Item closeOnClick={false} onClick={() => setChanged(true)}>
                Alpha
              </Menu2Item>
            </TestMenu>
          );
        }

        const { user, unmount } = render(<ChangeRefs />);
        await openSubmenu(user);
        const popup = getPopup();
        const root = getRoot();
        expect(firstRef.current).to.equal(popup);
        expect(firstSlotRef).toHaveBeenLastCalledWith(popup);

        await user.click(screen.getByRole('menuitem', { name: 'Alpha' }));
        expect(getPopup()).to.equal(popup);
        expect(getRoot()).to.equal(root);
        expect(firstRef.current).to.equal(null);
        expect(firstSlotRef).toHaveBeenLastCalledWith(null);
        expect(nextRef.current).to.equal(popup);
        expect(nextSlotRef).toHaveBeenLastCalledWith(popup);

        unmount();
        expect(nextRef.current).to.equal(null);
        expect(nextSlotRef).toHaveBeenLastCalledWith(null);
      });

      it('forwards HTML attributes to the semantic popup', async () => {
        const { user } = render(
          <TestMenu id="actions-menu" data-testid="actions-root" title="Action menu" />,
        );

        await openSubmenu(user);
        const root = getPopup();
        expect(root).to.equal(screen.getByTestId('actions-root'));
        expect(root).to.have.attribute('id', 'actions-menu');
        expect(root).to.have.attribute('title', 'Action menu');
        expect(getRoot()).not.to.have.attribute('title');
      });

      it('reaches the semantic popup through the root slot', async () => {
        const { user } = render(
          <React.Fragment>
            <span id="actions-description">Available actions</span>
            <TestMenu
              slotProps={{
                root: {
                  id: 'actions-popup',
                  'aria-label': 'Actions',
                  'aria-describedby': 'actions-description',
                },
              }}
            />
          </React.Fragment>,
        );

        await openSubmenu(user);
        const popup = getPopup();
        expect(popup).to.have.attribute('id', 'actions-popup');
        expect(popup).to.have.attribute('aria-label', 'Actions');
        expect(popup).toHaveAccessibleName('Actions');
        expect(popup).to.have.attribute('aria-describedby', 'actions-description');
      });

      it('preserves root slot precedence over forwarded attributes', async () => {
        const { user } = render(
          <TestMenu
            id="top-level-id"
            aria-label="Top-level label"
            title="Forwarded title"
            slotProps={{
              root: {
                id: 'slot-id',
                'aria-label': 'Slot label',
              },
            }}
          />,
        );

        await openSubmenu(user);
        const root = getPopup();
        expect(root).to.have.attribute('id', 'slot-id');
        expect(root).to.have.attribute('aria-label', 'Slot label');
        expect(root).to.have.attribute('title', 'Forwarded title');
      });

      it.skipIf(isJsdom())(
        'forwards keyboard handlers while preserving root behavior',
        async () => {
          const currentTargets: EventTarget[] = [];
          const onKeyDown = vi.fn((event: React.KeyboardEvent<HTMLDivElement>) => {
            currentTargets.push(event.currentTarget);
          });
          const onOpenChange = vi.fn();
          const { user } = render(
            <TestMenu loopFocus={false} onKeyDown={onKeyDown} onOpenChange={onOpenChange} />,
          );
          await openSubmenu(user, true);
          const firstItem = screen.getByRole('menuitem', { name: 'Alpha' });
          const lastItem = screen.getByRole('menuitem', { name: 'Beta' });
          const popup = firstItem.closest('[role="menu"]')!;
          await waitForPopupFocus(firstItem);
          await act(async () => firstItem.focus());

          await user.keyboard('{ArrowDown}{ArrowDown}');

          expect(document.activeElement).to.equal(lastItem);
          expect(onKeyDown).toHaveBeenCalledTimes(2);
          // Popup handlers run before Base UI stops navigation-key propagation.
          expect(currentTargets).to.deep.equal([popup, popup]);
          expect(popup).not.to.have.attribute('loopfocus');

          await user.keyboard('{Escape}');

          expect(onOpenChange).toHaveBeenCalledWith(
            false,
            expect.objectContaining({ reason: 'escape-key' }),
          );
          await waitFor(() =>
            expect(screen.queryByRole('menuitem', { name: 'Alpha' })).to.equal(null),
          );
        },
      );
    });
  });

  it('preserves positioning when the portal slot is a host element', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup slots={{ portal: 'div' }} slotProps={{ portal: { 'data-testid': 'root' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const menu = await screen.findByRole('menu');
    expect(menu).to.have.class(menu2PopupClasses.root);
    expect(menu.parentElement!.parentElement).to.equal(screen.getByTestId('root'));
    expect(menu.parentElement!.style.position).to.equal('absolute');
    expect(screen.getByTestId('root')).to.have.class(menu2PopupClasses.portal);
    expect(screen.getByRole('menuitem', { name: 'Profile' })).not.to.equal(null);
  });

  it('forwards popup refs to the semantic menu surfaces', async () => {
    const menuRef = React.createRef<HTMLDivElement>();
    const submenuRef = React.createRef<HTMLDivElement>();
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup ref={menuRef}>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup ref={submenuRef}>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const menu = await screen.findByRole('menu');
    expect(menuRef.current).to.have.class(menu2PopupClasses.root);
    expect(menuRef.current).to.equal(menu);

    await user.click(screen.getByRole('menuitem', { name: 'More' }));
    await waitFor(() => {
      expect(submenuRef.current).not.to.equal(null);
    });
    expect(submenuRef.current).to.have.class(menu2SubmenuPopupClasses.root);
    expect(submenuRef.current).to.contain(screen.getByRole('menuitem', { name: 'Nested' }));
  });

  [undefined, false, true].forEach((closeParentOnEsc) => {
    it.skipIf(isJsdom())(
      `handles Escape with submenu closeParentOnEsc=${closeParentOnEsc}`,
      async () => {
        const onParentOpenChange = vi.fn();
        const onSubmenuOpenChange = vi.fn();
        const { user } = render(
          <Menu2 defaultOpen modal={false} onOpenChange={onParentOpenChange}>
            <Menu2Trigger render={<Button disableRipple>Options</Button>} />
            <Menu2Popup>
              <Menu2Submenu closeParentOnEsc={closeParentOnEsc} onOpenChange={onSubmenuOpenChange}>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>,
        );
        const parentTrigger = screen.getByRole('button', { name: 'Options' });
        const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });
        const parentPopup = submenuTrigger.closest('[role="menu"]')!;
        await waitForPopupFocus(submenuTrigger);
        await act(async () => submenuTrigger.focus());
        await user.keyboard('{ArrowRight}');
        const nestedItem = await screen.findByRole('menuitem', { name: 'Nested' });
        await waitForPopupFocus(nestedItem);
        await act(async () => nestedItem.focus());
        onSubmenuOpenChange.mockClear();

        await user.keyboard('{Escape}');

        expect(onSubmenuOpenChange).toHaveBeenCalledExactlyOnceWith(
          false,
          expect.objectContaining({ reason: 'escape-key' }),
        );
        await waitFor(() => {
          expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);
        });
        if (closeParentOnEsc) {
          expect(onParentOpenChange).toHaveBeenCalledExactlyOnceWith(
            false,
            expect.objectContaining({ reason: 'escape-key' }),
          );
          await waitFor(() => {
            expect(screen.queryByRole('menu')).to.equal(null);
            expect(document.activeElement).to.equal(parentTrigger);
          });
        } else {
          expect(onParentOpenChange).not.toHaveBeenCalled();
          expect(screen.getByRole('menu')).to.equal(parentPopup);
          await waitFor(() => {
            expect(document.activeElement).to.equal(submenuTrigger);
          });
        }
      },
    );
  });

  it.skipIf(isJsdom())(
    'keeps the open tint on the submenu trigger until focus returns after Escape',
    async () => {
      const { user } = render(
        <Menu2 defaultOpen modal={false}>
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup>
            <Menu2Item>One</Menu2Item>
            <Menu2Submenu>
              <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );
      const trigger = await screen.findByRole('menuitem', { name: 'More' });
      await waitForPopupFocus(trigger);
      await act(async () => trigger.focus());
      await user.keyboard('{ArrowRight}');
      const nested = await screen.findByRole('menuitem', { name: 'Nested' });
      await waitForPopupFocus(nested);
      await act(async () => nested.focus());
      const popup = nested.closest('[role="menu"]')!;
      await waitFor(() => {
        expect(popup.getAnimations()).to.have.length(0);
      });
      expect(trigger).to.have.class(menu2SubmenuTriggerClasses.open);
      expect(trigger).not.to.have.class(menu2SubmenuTriggerClasses.highlighted);

      // Sample the rendered tint at frame boundaries. MutationObserver batches
      // records and cannot reconstruct the state of each individual mutation.
      const backgrounds: string[] = [];
      let frame: number;
      const sample = () => {
        backgrounds.push(getComputedStyle(trigger).backgroundColor);
        frame = requestAnimationFrame(sample);
      };
      frame = requestAnimationFrame(sample);

      try {
        await user.keyboard('{Escape}');
        expect(trigger).not.to.have.class(menu2SubmenuTriggerClasses.open);
        expect(popup).to.have.attribute('data-ending-style');
        await waitFor(() => {
          expect(trigger).to.have.class(menu2SubmenuTriggerClasses.highlighted);
          expect(popup.isConnected).to.equal(false);
        });
      } finally {
        cancelAnimationFrame(frame);
      }

      expect(backgrounds.length).to.be.greaterThan(0);
      expect(backgrounds).not.to.include('rgba(0, 0, 0, 0)');
      expect(backgrounds).not.to.include('transparent');
    },
  );

  // Base UI reports `trigger-hover` for a pointer-opened submenu and
  // `sibling-open` for a keyboard-opened one.
  (['pointer', 'keyboard'] as const).forEach((openMethod) => {
    it.skipIf(isJsdom())(
      `drops the open tint when a sibling hover closes a ${openMethod}-opened submenu`,
      async () => {
        const onOpenChangeComplete = vi.fn();
        const { user } = render(
          <Menu2 defaultOpen modal={false}>
            <Menu2Trigger render={<Button disableRipple>Options</Button>} />
            <Menu2Popup>
              <Menu2Item>One</Menu2Item>
              <Menu2Submenu onOpenChangeComplete={onOpenChangeComplete}>
                <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>,
        );
        const trigger = await screen.findByRole('menuitem', { name: 'More' });
        await waitForPopupFocus(trigger);
        if (openMethod === 'pointer') {
          await user.click(trigger);
        } else {
          await act(async () => trigger.focus());
          await user.keyboard('{ArrowRight}');
        }
        const nested = await screen.findByRole('menuitem', { name: 'Nested' });
        const popup = nested.closest('[role="menu"]')!;
        if (openMethod === 'keyboard') {
          await waitFor(() => expect(nested).toHaveFocus());
        }
        // Let enter finish so the test checks an exit animation, not a canceled enter.
        await waitFor(() => expect(onOpenChangeComplete).toHaveBeenCalledWith(true));
        expect(trigger).to.have.class(menu2SubmenuTriggerClasses.open);

        const closingBackgrounds: string[] = [];
        let frame: number;
        const sample = () => {
          if (popup.isConnected && popup.hasAttribute('data-ending-style')) {
            closingBackgrounds.push(window.getComputedStyle(trigger).backgroundColor);
          }
          frame = requestAnimationFrame(sample);
        };
        frame = requestAnimationFrame(sample);
        const sibling = screen.getByRole('menuitem', { name: 'One' });
        try {
          await user.hover(sibling);
          // user.hover() has no movement delta. Base UI ignores it for focus in WebKit.
          fireEvent.mouseMove(sibling, { movementX: 1, movementY: 0 });
          await waitFor(() => {
            expect(sibling).toHaveFocus();
            expect(sibling).to.have.class(menu2ItemClasses.highlighted);
          });
          await waitFor(() => {
            expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);
            expect(trigger).not.to.have.class(menu2SubmenuTriggerClasses.open);
            expect(onOpenChangeComplete).toHaveBeenCalledWith(false);
          });
          expect(sibling).toHaveFocus();
          expect(window.getComputedStyle(trigger).backgroundColor).to.equal('rgba(0, 0, 0, 0)');
        } finally {
          cancelAnimationFrame(frame);
          // Park the pointer, so it does not leak into the next test.
          await user.unhover(sibling);
        }
        // The sibling shows the highlight, so the trigger must not keep its tint.
        expect(closingBackgrounds).not.to.have.length(0);
        expect(new Set(closingBackgrounds)).to.deep.equal(new Set(['rgba(0, 0, 0, 0)']));
      },
    );
  });

  ['object', 'callback'].forEach((refType) => {
    it(`composes render element and ${refType} adapter refs without warning`, async () => {
      const elementRef = React.createRef<HTMLButtonElement>();
      const slotRef = vi.fn();
      const adapterRef = React.createRef<HTMLButtonElement>();
      const error = vi.spyOn(console, 'error').mockImplementation(() => {});

      try {
        const { user, unmount } = render(
          <Menu2>
            <Menu2Trigger
              ref={refType === 'callback' ? slotRef : adapterRef}
              render={
                <Button ref={elementRef} disableRipple>
                  Options
                </Button>
              }
            />
            <Menu2Popup>
              <Menu2Item>Profile</Menu2Item>
            </Menu2Popup>
          </Menu2>,
        );

        const trigger = screen.getByRole('button', { name: 'Options' });
        expect(elementRef.current).to.equal(trigger);
        if (refType === 'callback') {
          expect(slotRef).toHaveBeenLastCalledWith(trigger);
        } else {
          expect(adapterRef.current).to.equal(trigger);
        }
        expect(error).not.toHaveBeenCalled();

        await user.click(trigger);
        expect(await screen.findByRole('menu')).not.to.equal(null);

        unmount();
        expect(elementRef.current).to.equal(null);
        if (refType === 'callback') {
          expect(slotRef).toHaveBeenLastCalledWith(null);
        } else {
          expect(adapterRef.current).to.equal(null);
        }
        expect(error).not.toHaveBeenCalled();
      } finally {
        error.mockRestore();
      }
    });
  });

  // The parts are internal, so their theme overrides have to resolve through the
  // collapsed component's slots rather than their own component keys.
  it('applies styleOverrides from the collapsed theme slots', async () => {
    const theme = createTheme({
      components: {
        MuiMenu2Popup: {
          styleOverrides: {
            root: { paddingTop: '9px' },
            list: { paddingBottom: '7px' },
          },
        },
        MuiMenu2SubmenuPopup: {
          styleOverrides: {
            root: { paddingTop: '11px' },
          },
        },
      },
    });
    const { user } = render(
      <ThemeProvider theme={theme}>
        <Menu2>
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup slotProps={{ root: { 'data-testid': 'paper' } }}>
            <Menu2Submenu>
              <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup slotProps={{ root: { 'data-testid': 'submenu-paper' } }}>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });

    await user.click(trigger);
    const menu = await screen.findByRole('menu');
    expect(window.getComputedStyle(screen.getByTestId('paper')).paddingTop).to.equal('9px');
    const list = menu.querySelector(`.${menu2PopupClasses.list}`)!;
    expect(window.getComputedStyle(list).paddingBottom).to.equal('7px');

    const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });

    await user.click(submenuTrigger);
    await waitFor(() => {
      expect(screen.queryByTestId('submenu-paper')).not.to.equal(null);
    });
    expect(window.getComputedStyle(screen.getByTestId('submenu-paper')).paddingTop).to.equal(
      '11px',
    );
  });

  it('warns when the trigger is a fragment', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      render(
        <Menu2>
          <Menu2Trigger
            render={
              <React.Fragment>
                <span>Options</span>
                <span>More</span>
              </React.Fragment>
            }
          />
          <Menu2Popup>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );

      expect(
        error.mock.calls.some(([message]) => String(message).includes('cannot be a fragment')),
      ).to.equal(true);
    } finally {
      error.mockRestore();
    }
  });

  it('warns once, however many times the bad trigger renders', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    function Demo({ label }: { label: string }) {
      return (
        <Menu2>
          <Menu2Trigger
            render={
              <React.Fragment>
                <span>{label}</span>
                <span>More</span>
              </React.Fragment>
            }
          />
          <Menu2Popup>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      );
    }

    try {
      const { setProps } = render(<Demo label="Options" />);
      setProps({ label: 'First' });
      setProps({ label: 'Second' });

      expect(
        error.mock.calls.filter(([message]) => String(message).includes('cannot be a fragment')),
      ).to.have.length(1);
    } finally {
      error.mockRestore();
    }
  });

  (['hover', 'click'] as const).forEach((activation) => {
    it.skipIf(isJsdom())(`respects the hover open delay on mouse ${activation}`, async () => {
      const delay = 200;
      let hoveredAt: number | undefined;
      let openedAt: number | undefined;
      const onMouseEnter = vi.fn(() => {
        hoveredAt ??= performance.now();
      });
      const onOpenChange = vi.fn((open: boolean) => {
        if (open) {
          openedAt = performance.now();
        }
      });
      const { user } = render(
        <Menu2 defaultOpen>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup>
            <Menu2Submenu onOpenChange={onOpenChange}>
              <Menu2SubmenuTrigger delay={delay} onMouseEnter={onMouseEnter}>
                More
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );

      const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
      await waitForPopupFocus(submenuTrigger);
      await user[activation](submenuTrigger);

      await waitFor(() => expect(submenuTrigger).to.have.attribute('aria-expanded', 'true'), {
        timeout: 2000,
      });
      expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(
        true,
        expect.objectContaining({ reason: 'trigger-hover' }),
      );
      // Measure logical opening, not Grow's animation or the popup mount.
      expect(openedAt! - hoveredAt!).to.be.at.least(delay - 5);
      expect(onMouseEnter).toHaveBeenCalled();
      expect(await screen.findByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
    });
  });

  it.skipIf(isJsdom())('toggles on repeated touch when hover opening is enabled', async () => {
    const onOpenChange = vi.fn();
    const onOpenChangeComplete = vi.fn();
    const { user } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Submenu onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    const parentPopup = submenuTrigger.closest('[role="menu"]')!;
    await waitForPopupFocus(submenuTrigger);
    await user.pointer({ keys: '[TouchA]', target: submenuTrigger });

    expect(await screen.findByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
    await waitFor(() => expect(onOpenChangeComplete).toHaveBeenCalledWith(true));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(
      true,
      expect.objectContaining({ reason: 'trigger-press' }),
    );
    onOpenChange.mockClear();

    await user.pointer({ keys: '[TouchA]', target: submenuTrigger });

    await waitFor(() => expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(
      false,
      expect.objectContaining({ reason: 'trigger-press' }),
    );
    expect(submenuTrigger).to.have.attribute('aria-expanded', 'false');
    expect(screen.getByRole('menu')).to.equal(parentPopup);
  });

  it.skipIf(isJsdom())('does not open on hover when openOnHover is false', async () => {
    const { user } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Submenu>
            <Menu2SubmenuTrigger delay={0} openOnHover={false}>
              More
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    await user.hover(submenuTrigger);

    expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);

    await user.click(submenuTrigger);
    expect(await screen.findByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
  });

  it.skipIf(isJsdom())('keeps the submenu open during pointer transit', async () => {
    const closeDelay = 150;
    const onOpenChange = vi.fn();
    const onOpenChangeComplete = vi.fn();
    const { user } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Submenu onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
            <Menu2SubmenuTrigger delay={0} closeDelay={closeDelay}>
              More
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    await user.hover(submenuTrigger);
    const nestedItem = await screen.findByRole('menuitem', { name: 'Nested' });
    const popup = nestedItem.closest('[role="menu"]')!;
    await waitFor(() => expect(onOpenChangeComplete).toHaveBeenCalledWith(true));
    onOpenChange.mockClear();
    const triggerRect = submenuTrigger.getBoundingClientRect();
    const popupRect = popup.getBoundingClientRect();

    // Base UI temporarily blocks pointer events outside the trigger and popup
    // while its safe polygon is active, so dispatch the real transit events
    // directly instead of asking user-event to cross the blocked region.
    fireEvent.mouseLeave(submenuTrigger, {
      relatedTarget: document.body,
      clientX: triggerRect.right,
      clientY: triggerRect.top + triggerRect.height / 2,
    });
    fireEvent.mouseMove(popup, {
      clientX: popupRect.left + 1,
      clientY: popupRect.top + 1,
    });
    fireEvent.mouseEnter(popup, {
      relatedTarget: submenuTrigger,
      clientX: popupRect.left + 1,
      clientY: popupRect.top + 1,
    });

    await act(async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, closeDelay + 100);
      });
    });
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(submenuTrigger).to.have.attribute('aria-expanded', 'true');
    expect(popup.isConnected).to.equal(true);
    expect(popup).to.have.attribute('data-open');
    expect(popup).not.to.have.attribute('data-ending-style');
  });

  it.skipIf(isJsdom())('respects the hover close delay without pointer focus changes', async () => {
    const closeDelay = 150;
    let closedAt: number | undefined;
    const onOpenChange = vi.fn((open: boolean) => {
      if (!open && closedAt === undefined) {
        closedAt = performance.now();
      }
    });
    const onOpenChangeComplete = vi.fn();
    const { user } = render(
      <Menu2 defaultOpen highlightItemOnHover={false}>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Submenu onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
            <Menu2SubmenuTrigger delay={0} closeDelay={closeDelay}>
              More
            </Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
          <Menu2Item closeOnClick={false}>Other</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    await user.hover(submenuTrigger);
    const nestedItem = await screen.findByRole('menuitem', { name: 'Nested' });
    const popup = nestedItem.closest('[role="menu"]')!;
    await waitFor(() => expect(onOpenChangeComplete).toHaveBeenCalledWith(true));
    onOpenChange.mockClear();

    // Disable pointer focus changes to isolate the hover timer. A direct synthetic
    // sibling hover can otherwise close through focus-out before the delay expires.
    // Dispatch directly because the safe polygon blocks pointer events on siblings.
    const otherItem = screen.getByRole('menuitem', { name: 'Other' });
    const hoveredAt = performance.now();
    fireEvent.mouseOver(otherItem);
    fireEvent.mouseMove(otherItem, { movementX: 1, movementY: 0 });

    expect(onOpenChange).not.toHaveBeenCalled();
    expect(submenuTrigger).to.have.attribute('aria-expanded', 'true');
    expect(popup).to.have.attribute('data-open');
    expect(popup).not.to.have.attribute('data-ending-style');
    await waitFor(() => expect(submenuTrigger).to.have.attribute('aria-expanded', 'false'));
    expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(
      false,
      expect.objectContaining({ reason: 'sibling-open' }),
    );
    // Measure logical closure, not Grow's exit. Allow for browser timer rounding.
    expect(closedAt! - hoveredAt).to.be.at.least(closeDelay - 5);
    await waitFor(() => expect(popup.isConnected).to.equal(false));
  });

  // The explicit trigger owns its behavior. Its wrapper need not forward props
  // injected by Menu2Submenu, because the submenu renders it as-is.
  it.skipIf(isJsdom())('opens the submenu when the trigger sits inside a wrapper', async () => {
    function Wrapper({ children }: { children: React.ReactElement }) {
      return children;
    }

    const { user } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Submenu>
            <Wrapper>
              <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            </Wrapper>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(await screen.findByRole('menuitem', { name: 'More' }));

    // The submenu opens, and the parent menu stays open.
    expect(await screen.findByRole('menuitem', { name: 'Nested' })).not.to.equal(null);
    expect(screen.queryByRole('menuitem', { name: 'More' })).not.to.equal(null);
  });

  it('warns when a wrapper swallows the trigger ref', () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    // Drops every prop and the ref, the way a hand-written helper easily does.
    function SwallowingWrapper(props: { children: React.ReactElement }) {
      return props.children;
    }

    try {
      render(
        <Menu2 defaultOpen>
          <Menu2Trigger
            render={
              <SwallowingWrapper>
                <button type="button">Options</button>
              </SwallowingWrapper>
            }
          />
          <Menu2Popup>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );

      expect(
        error.mock.calls.some(([message]) => String(message).includes('did not receive a ref')),
      ).to.equal(true);
    } finally {
      error.mockRestore();
    }
  });

  // Submenu triggers and plain items use the same keyboard focus styles.
  it.skipIf(isJsdom())('highlights the submenu trigger like a plain item', async () => {
    const { user } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Item>Plain</Menu2Item>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    const plain = await screen.findByRole('menuitem', { name: 'Plain' });
    const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });
    await waitForPopupFocus(plain);

    // Keyboard: the trigger takes the highlight the same way a plain item does.
    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(plain).to.equal(document.activeElement);
    });
    expect(plain).to.have.class(menu2ItemClasses.highlighted);
    const plainHighlight = window.getComputedStyle(plain).backgroundColor;

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(submenuTrigger).to.equal(document.activeElement);
    });
    expect(submenuTrigger).to.have.class(menu2SubmenuTriggerClasses.highlighted);
    expect(window.getComputedStyle(submenuTrigger).backgroundColor).to.equal(plainHighlight);
  });

  it.skipIf(isJsdom())('overlaps the parent menu by default', async () => {
    // The popup animates, so geometry has to be read after the transition ends.
    async function settle(element: HTMLElement) {
      await act(async () => {
        await Promise.all(
          element.getAnimations().map((animation) => animation.finished.catch(() => {})),
        );
      });
      await waitFor(() => {
        const { transform, opacity } = window.getComputedStyle(element);
        expect(transform === 'none' || transform === 'matrix(1, 0, 0, 1, 0, 0)').to.equal(true);
        expect(Number(opacity)).to.equal(1);
      });
    }

    // `defaultOpen` avoids clicking the trigger Button, whose ripple animates
    // past the end of the test and trips the act() check.
    const { user } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup slotProps={{ root: { 'data-testid': 'paper' } }}>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup slotProps={{ root: { 'data-testid': 'submenu-paper' } }}>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    const menu = await screen.findByRole('menu');
    await settle(menu);
    const parent = screen.getByTestId('paper').getBoundingClientRect();
    const triggerRect = screen.getByRole('menuitem', { name: 'More' }).getBoundingClientRect();

    await user.click(screen.getByRole('menuitem', { name: 'More' }));
    await waitFor(() => {
      expect(screen.queryByTestId('submenu-paper')).not.to.equal(null);
    });
    await settle(document.querySelectorAll('[role="menu"]')[1] as HTMLElement);
    const submenu = screen.getByTestId('submenu-paper').getBoundingClientRect();

    // The submenu starts before the parent's right edge, so the two overlap.
    expect(submenu.left).to.be.lessThan(parent.right);
    // The overlap stays small, so the parent stays readable.
    expect(parent.right - submenu.left).to.be.lessThan(12);
    // The list's top padding is cancelled, so the first item meets the trigger.
    expect(Math.round(submenu.top)).to.equal(Math.round(triggerRect.top) - 8);
  });

  it.skipIf(isJsdom())('positions a submenu at inline-end in an RTL theme', async () => {
    const theme = createTheme({ direction: 'rtl' });
    const { user } = render(
      <ThemeProvider theme={theme}>
        <div dir="rtl" style={{ padding: '96px 400px' }}>
          <Menu2 defaultOpen>
            <Menu2Trigger render={<Button disableRipple>Options</Button>} />
            <Menu2Popup>
              <Menu2Submenu>
                <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup slotProps={{ root: { 'data-testid': 'submenu-paper' } }}>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
        </div>
      </ThemeProvider>,
    );

    const trigger = await screen.findByRole('menuitem', { name: 'More' });
    const triggerRect = trigger.getBoundingClientRect();
    await user.click(trigger);
    const paper = await screen.findByTestId('submenu-paper');
    await waitFor(() => {
      const submenu = paper.getBoundingClientRect();
      expect(submenu.left).to.be.lessThan(triggerRect.left);
      // The 4px overlap stays on the inline-end edge when that edge is left.
      expect(submenu.right).to.be.greaterThan(triggerRect.left);
      expect(submenu.right - triggerRect.left).to.be.lessThan(12);
    });
  });

  // `trigger` takes an element at both levels, and the element the caller passes
  // becomes the trigger itself.
  it('renders the caller element as the trigger at both levels', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.class('MuiButton-root');
    expect(trigger).to.have.class(menu2TriggerClasses.root);

    await user.click(trigger);
    const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
    expect(submenuTrigger).not.to.have.class(menu2ItemClasses.root);
    expect(submenuTrigger).to.have.class(menu2SubmenuTriggerClasses.root);

    // It must lay out as a menu item row, not as inline content. A fragment
    // trigger used to render bare text here.
    const { display } = window.getComputedStyle(submenuTrigger);
    expect(display).to.equal('flex');
    const list = submenuTrigger.parentElement!;
    expect(submenuTrigger.getBoundingClientRect().width).to.be.closeTo(
      list.getBoundingClientRect().width,
      2,
    );
  });

  it('marks the trigger open while the menu is open', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).not.to.have.class(menu2TriggerClasses.open);

    await user.click(trigger);
    await screen.findByRole('menu');

    expect(trigger).to.have.class(menu2TriggerClasses.open);
  });

  it('works without a trigger, driven by open and anchor', async () => {
    function ControlledMenu() {
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      return (
        <React.Fragment>
          <button type="button" onClick={(event) => setAnchorEl(event.currentTarget)}>
            Open
          </button>
          <Menu2 open={Boolean(anchorEl)} onOpenChange={() => setAnchorEl(null)}>
            <Menu2Popup anchor={anchorEl}>
              <Menu2Item>Profile</Menu2Item>
            </Menu2Popup>
          </Menu2>
        </React.Fragment>
      );
    }

    const { user } = render(<ControlledMenu />);

    await user.click(screen.getByRole('button', { name: 'Open' }));

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  // The nested popup needs real layout to mount.
  it.skipIf(isJsdom())('uses the same shape for submenus', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Cut</Menu2Item>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>View</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Zoom in</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const submenuTrigger = await screen.findByRole('menuitem', { name: 'View' });
    expect(submenuTrigger).to.have.attribute('aria-haspopup', 'menu');

    await user.click(submenuTrigger);

    await waitFor(() => {
      expect(screen.getByRole('menuitem', { name: 'Zoom in' })).not.to.equal(null);
    });
  });

  // The submenu trigger renders ButtonBase, so it takes the same non-native
  // keyboard path as a plain item and used to fire twice per press. Each key
  // gets a fresh render, because opening the submenu moves focus into it.
  ['[Space]', '[Enter]'].forEach((key) => {
    it(`fires the submenu trigger once per ${key} press`, async () => {
      const onClick = spy();
      const onOpenChange = vi.fn();
      const { user } = render(
        <Menu2 defaultOpen>
          <Menu2Trigger render={<button type="button">Options</button>} />
          <Menu2Popup>
            <Menu2Submenu onOpenChange={onOpenChange}>
              <Menu2SubmenuTrigger onClick={onClick}>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );

      const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
      await act(async () => {
        submenuTrigger.focus();
      });

      await user.keyboard(key);
      expect(onClick.callCount).to.equal(1);
      expect(onOpenChange).toHaveBeenCalledExactlyOnceWith(
        true,
        expect.objectContaining({ reason: 'trigger-press' }),
      );
    });
  });

  // The focus ring replaces the focus tint for both item types.
  [true, false].forEach((focusVisible) => {
    it.skipIf(isJsdom())(
      `highlights the trigger like a plain item, focusVisible=${focusVisible}`,
      async () => {
        const { user } = render(
          <ThemeProvider theme={createTheme({ focusVisible })}>
            <Menu2 defaultOpen modal={false}>
              <Menu2Popup anchor={document.body}>
                <Menu2Item>Plain</Menu2Item>
                <Menu2Submenu>
                  <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
                  <Menu2SubmenuPopup>
                    <Menu2Item>Nested</Menu2Item>
                  </Menu2SubmenuPopup>
                </Menu2Submenu>
              </Menu2Popup>
            </Menu2>
          </ThemeProvider>,
        );

        const plain = await screen.findByRole('menuitem', { name: 'Plain' });
        const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });
        await waitForPopupFocus(plain);

        await user.keyboard('{ArrowDown}');
        await waitFor(() => {
          expect(plain).to.equal(document.activeElement);
        });
        const plainHighlight = window.getComputedStyle(plain).backgroundColor;

        await user.keyboard('{ArrowDown}');
        await waitFor(() => {
          expect(submenuTrigger).to.equal(document.activeElement);
        });
        expect(window.getComputedStyle(submenuTrigger).backgroundColor).to.equal(plainHighlight);
      },
    );
  });

  // Open is a state, not a focus cue. The tint stays below the highlight, so an
  // open parent stays visible without reading as the focused item.
  it.skipIf(isJsdom())('tints an open trigger below the highlight', async () => {
    const { user } = render(
      <Menu2 defaultOpen modal={false}>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Item>Plain</Menu2Item>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    const plain = await screen.findByRole('menuitem', { name: 'Plain' });
    const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });
    await waitForPopupFocus(plain);

    await user.keyboard('{ArrowDown}');
    await waitFor(() => {
      expect(plain).to.equal(document.activeElement);
    });
    const highlighted = window.getComputedStyle(plain).backgroundColor;

    await user.keyboard('{ArrowDown}{ArrowRight}');
    const nested = await screen.findByRole('menuitem', { name: 'Nested' });
    await waitFor(() => expect(nested).toHaveFocus());
    // `action.hover` against `action.focus`, after focus moves into the submenu.
    await waitFor(() => {
      expect(window.getComputedStyle(submenuTrigger).backgroundColor).to.equal(
        'rgba(0, 0, 0, 0.04)',
      );
    });
    expect(highlighted).to.equal('rgba(0, 0, 0, 0.12)');
  });

  // The trigger node also renders the caller's `Menu.Item`, which reads the
  // highlight from the submenu store with its index in the parent list. When the
  // two indices match, the open parent used to paint the full focus tint and
  // became indistinguishable from the child trigger the reader is on.
  // The menu keeps a real trigger. Anchored to the body it has nothing to give
  // the focus back to, and it closes itself about 200ms after a submenu opens.
  const nestedChain = (
    <Menu2 defaultOpen modal={false}>
      <Menu2Trigger render={<Button disableRipple>Options</Button>} />
      <Menu2Popup>
        {/* Each trigger is index 0 of its own list, so the indices collide. */}
        <Menu2Submenu>
          <Menu2SubmenuTrigger>View options</Menu2SubmenuTrigger>
          <Menu2SubmenuPopup>
            <Menu2Submenu>
              <Menu2SubmenuTrigger>More tools</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Leaf</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2SubmenuPopup>
        </Menu2Submenu>
      </Menu2Popup>
    </Menu2>
  );

  // `action.hover` for the open parent trail, `action.focus` for the item the
  // reader is on.
  const OPEN_TINT = 'rgba(0, 0, 0, 0.04)';
  const FOCUS_TINT = 'rgba(0, 0, 0, 0.12)';

  it.skipIf(isJsdom())('keeps an open parent below the focused child trigger', async () => {
    const { user } = render(nestedChain);

    const parent = await screen.findByRole('menuitem', { name: 'View options' });
    await waitForPopupFocus(parent);

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{ArrowRight}');
    const child = await screen.findByRole('menuitem', { name: 'More tools' });
    await user.keyboard('{ArrowDown}');

    await waitFor(() => {
      expect(child).to.equal(document.activeElement);
    });

    // The parent is open, and only open. The highlight classes are the false
    // highlight that the submenu store used to put on it. A trigger carries the
    // submenu trigger class, so the item class alone misses it.
    expect(parent).to.have.class(menu2SubmenuTriggerClasses.open);
    expect(parent).not.to.have.class(menu2ItemClasses.highlighted);
    expect(parent).not.to.have.class(menu2SubmenuTriggerClasses.highlighted);
    expect(window.getComputedStyle(child).backgroundColor).to.equal(FOCUS_TINT);
    expect(window.getComputedStyle(parent).backgroundColor).to.equal(OPEN_TINT);
  });
});
