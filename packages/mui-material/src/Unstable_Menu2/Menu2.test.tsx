import Menu2Popup, { menu2PopupClasses } from '@mui/material/Unstable_Menu2Popup';
import Menu2Trigger, { menu2TriggerClasses } from '@mui/material/Unstable_Menu2Trigger';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import { describe, it, expect, vi } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, isJsdom, screen, waitFor } from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import { buttonBaseClasses } from '@mui/material/ButtonBase';
import type { ListProps } from '@mui/material/List';
import List, { listClasses } from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ClassicMenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { paperClasses } from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Menu2 from '@mui/material/Unstable_Menu2';
import Menu2CheckboxItem, {
  menu2CheckboxItemClasses,
  menu2CheckboxItemIndicatorClasses,
} from '@mui/material/Unstable_Menu2CheckboxItem';
import Menu2Group from '@mui/material/Unstable_Menu2Group';
import Menu2GroupLabel from '@mui/material/Unstable_Menu2GroupLabel';
import Menu2Item, { menu2ItemClasses } from '@mui/material/Unstable_Menu2Item';
import Menu2LinkItem from '@mui/material/Unstable_Menu2LinkItem';
import Menu2RadioGroup from '@mui/material/Unstable_Menu2RadioGroup';
import Menu2RadioItem from '@mui/material/Unstable_Menu2RadioItem';
import Menu2Separator from '@mui/material/Unstable_Menu2Separator';
import Menu2Submenu from '@mui/material/Unstable_Menu2Submenu';
import Menu2SubmenuTrigger, {
  menu2SubmenuTriggerClasses,
} from '@mui/material/Unstable_Menu2SubmenuTrigger';
import { createTheme, enhanceHighContrast, ThemeProvider } from '@mui/material/styles';

describe('<Menu2 />', () => {
  const { render } = createRenderer();

  it('does not render a DOM wrapper or an implicit popup', () => {
    const { container } = render(
      <Menu2 defaultOpen modal={false}>
        <span data-testid="child">Child</span>
      </Menu2>,
    );

    expect(container.firstElementChild).to.equal(screen.getByTestId('child'));
    expect(container.children).to.have.length(1);
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('keeps behavior defaults separate from popup defaults', () => {
    render(
      <ThemeProvider
        theme={createTheme({
          components: {
            MuiMenu2: { defaultProps: { defaultOpen: true, modal: false } },
            MuiMenu2Popup: { defaultProps: { elevation: 3 } },
          },
        })}
      >
        <Menu2>
          <Menu2Popup anchor={document.body}>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    expect(screen.getByRole('menu')).to.have.class('MuiPaper-elevation3');
  });

  type User = ReturnType<typeof render>['user'];

  async function expectTooltipOnHover(user: User, element: Element, title: string) {
    await user.hover(element);

    expect(await screen.findByRole('tooltip')).to.have.text(title);

    await user.unhover(element);

    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  }

  it('opens from the trigger and keeps Menu.Popup as the semantic menu root', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup
          slotProps={{
            portal: { 'data-testid': 'root' },
            positioner: { 'data-testid': 'positioner' },
            root: { 'data-testid': 'paper' },
          }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.class(menu2TriggerClasses.root);

    await user.click(trigger);

    // The portal wraps the positioner; the public popup is the Paper surface.
    const menu = await screen.findByRole('menu', { name: 'Options' });
    expect(trigger).to.have.attribute('aria-controls', menu.id);
    expect(menu).to.have.attribute('aria-labelledby', trigger.id);
    expect(menu).to.have.class(menu2PopupClasses.root);
    expect(menu).to.have.class(paperClasses.root);
    expect(screen.getByTestId('paper')).to.equal(menu);
    const root = screen.getByTestId('root');
    expect(root).to.have.class(menu2PopupClasses.portal);
    expect(root).to.contain(menu);
    expect(root).not.to.equal(menu);
    const positioner = screen.getByTestId('positioner');
    expect(positioner).to.have.class(menu2PopupClasses.positioner);
    expect(menu.parentElement).to.equal(positioner);
    expect(positioner.parentElement).to.equal(root);

    const list = menu.querySelector(`.${menu2PopupClasses.list}`);
    expect(list).not.to.equal(null);
    expect(list!.tagName).to.equal('DIV');
    expect(list!).to.have.class(listClasses.padding);

    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.class(menu2ItemClasses.root);
  });

  // Theming, classes, slots and the `component` prop are covered per part by
  // the describeConformance suites next to each component; what stays here is
  // Base UI-specific behavior and Material integration.

  it('does not pass ownerState to host portal slots', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup slots={{ portal: 'div' }} slotProps={{ portal: { 'data-testid': 'popup' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('popup')).not.to.have.attribute('ownerState');
  });

  it.skipIf(isJsdom())('opens on hover when openOnHover is set', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger openOnHover delay={0} render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Item>Item</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    await user.hover(trigger);

    expect(await screen.findByRole('menuitem', { name: 'Item' })).not.to.equal(null);
    // Park the pointer away from the trigger, so it does not leak into the next test.
    await user.unhover(trigger);
  });

  it('passes an explicit nativeButton to ButtonBase, not to a custom render element', async () => {
    const NativeButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<'button'>>(
      function NativeButton(props, ref) {
        return <button type="button" ref={ref} {...props} />;
      },
    );
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup>
            <Menu2Item render={<NativeButton />} nativeButton>
              Item
            </Menu2Item>
            <Menu2CheckboxItem render={<NativeButton />} nativeButton>
              Checkbox
            </Menu2CheckboxItem>
            <Menu2RadioGroup defaultValue="a">
              <Menu2RadioItem render={<NativeButton />} nativeButton value="a">
                Radio
              </Menu2RadioItem>
            </Menu2RadioGroup>
            <Menu2Submenu>
              <Menu2SubmenuTrigger render={<NativeButton />} nativeButton>
                More
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
            <Menu2Item nativeButton render={<button type="button" />}>
              Host slot
            </Menu2Item>
          </Menu2Popup>
        </Menu2>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      await screen.findByRole('menu');

      // ButtonBase asks for `nativeButton` when it cannot infer a <button>.
      expect(error).not.toHaveBeenCalled();
      expect(screen.getByRole('menuitem', { name: 'Item' }).tagName).to.equal('BUTTON');
      expect(screen.getByRole('menuitem', { name: 'Host slot' })).not.to.have.attribute(
        'nativebutton',
      );
    } finally {
      error.mockRestore();
    }
  });

  it('derives native button behavior from host render elements', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});

    try {
      const { user } = render(
        <Menu2>
          <Menu2Trigger
            {...{ nativeButton: false }}
            render={
              <div role="button" tabIndex={0}>
                Options
              </div>
            }
          />
          <Menu2Popup>
            <Menu2Item closeOnClick={false} render={<button type="button" />}>
              Native item
            </Menu2Item>
            <Menu2CheckboxItem closeOnClick={false} render={<button type="button" />}>
              Native checkbox
            </Menu2CheckboxItem>
            <Menu2RadioGroup defaultValue="small">
              <Menu2RadioItem closeOnClick={false} render={<button type="button" />} value="large">
                Native radio
              </Menu2RadioItem>
            </Menu2RadioGroup>
            <Menu2Submenu>
              <Menu2SubmenuTrigger render={<button type="button" />}>
                Native submenu trigger
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );

      const trigger = screen.getByRole('button', { name: 'Options' });
      expect(trigger.tagName).to.equal('DIV');

      trigger.focus();
      await user.keyboard('[Enter]');

      expect(await screen.findByRole('menuitem', { name: 'Native item' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(screen.getByRole('menuitemcheckbox', { name: 'Native checkbox' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(screen.getByRole('menuitemradio', { name: 'Native radio' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(screen.getByRole('menuitem', { name: 'Native submenu trigger' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(
        error.mock.calls.some(([message]) => String(message).includes('nativeButton')),
      ).to.equal(false);
    } finally {
      error.mockRestore();
    }
  });

  it('allows nativeButton to override inference for custom render elements', async () => {
    const error = vi.spyOn(console, 'error').mockImplementation(() => {});
    const CustomDivRoot = React.forwardRef<
      HTMLDivElement,
      React.ComponentPropsWithoutRef<'div'> & { ownerState?: unknown }
    >(function CustomDivRoot({ ownerState: _ownerState, ...props }, ref) {
      return <div ref={ref} {...props} />;
    });
    const CustomButtonRoot = React.forwardRef<
      HTMLButtonElement,
      React.ComponentPropsWithoutRef<'button'> & { ownerState?: unknown }
    >(function CustomButtonRoot({ ownerState: _ownerState, ...props }, ref) {
      return <button ref={ref} type="button" {...props} />;
    });

    try {
      const { user } = render(
        <Menu2>
          <Menu2Trigger
            {...{ nativeButton: false }}
            render={
              <CustomDivRoot role="button" tabIndex={0}>
                Options
              </CustomDivRoot>
            }
          />
          <Menu2Popup>
            <Menu2Item closeOnClick={false} nativeButton render={<CustomButtonRoot />}>
              Custom native item
            </Menu2Item>
            <Menu2Submenu>
              <Menu2SubmenuTrigger nativeButton render={<CustomButtonRoot />}>
                Custom native submenu trigger
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );

      const trigger = screen.getByRole('button', { name: 'Options' });
      expect(trigger.tagName).to.equal('DIV');

      trigger.focus();
      await user.keyboard('[Enter]');

      expect(await screen.findByRole('menuitem', { name: 'Custom native item' })).to.have.property(
        'tagName',
        'BUTTON',
      );
      expect(
        screen.getByRole('menuitem', { name: 'Custom native submenu trigger' }),
      ).to.have.property('tagName', 'BUTTON');
      expect(
        error.mock.calls.some(([message]) => String(message).includes('nativeButton')),
      ).to.equal(false);
    } finally {
      error.mockRestore();
    }
  });

  it('keeps List styles and props when the list component changes', async () => {
    const listRef = React.createRef<HTMLUListElement>();
    const handleClick = vi.fn();
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup
          align="end"
          slotProps={{
            list: (ownerState) => ({
              component: 'ul',
              ref: listRef,
              'data-testid': 'list',
              'data-align': ownerState.align,
              className: 'custom-list',
              dense: true,
              disablePadding: true,
              sx: { paddingLeft: '13px' },
              onClick: handleClick,
            }),
          }}
        >
          <Menu2Item closeOnClick={false}>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const list = await screen.findByTestId('list');
    expect(list.tagName).to.equal('UL');
    expect(listRef.current).to.equal(list);
    expect(list).to.have.attribute('data-align', 'end');
    expect(list).to.have.class('custom-list');
    expect(list).to.have.class(menu2PopupClasses.list);
    expect(list).to.have.class(listClasses.root);
    expect(list).to.have.class(listClasses.dense);
    expect(list).not.to.have.class(listClasses.padding);
    expect(list).toHaveComputedStyle({ paddingLeft: '13px' });

    await user.click(screen.getByRole('menuitem', { name: 'Profile' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // The classic `MenuListProps={{ dense: true }}` makes each row dense.
  it('passes the dense state of the list to each item part', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup slotProps={{ list: { dense: true } }}>
          <Menu2Item>
            <ListItemText data-testid="text">Item</ListItemText>
          </Menu2Item>
          <Menu2LinkItem href="/docs">Link</Menu2LinkItem>
          <Menu2CheckboxItem>Checkbox</Menu2CheckboxItem>
          <Menu2RadioGroup defaultValue="a">
            <Menu2RadioItem value="a">Radio</Menu2RadioItem>
          </Menu2RadioGroup>
          <Menu2Submenu>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Nested</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    await screen.findByRole('menu');

    [
      screen.getByRole('menuitem', { name: 'Item' }),
      screen.getByRole('menuitem', { name: 'Link' }),
      screen.getByRole('menuitemcheckbox', { name: 'Checkbox' }),
      screen.getByRole('menuitemradio', { name: 'Radio' }),
      screen.getByRole('menuitem', { name: 'More' }),
    ].forEach((row) => {
      expect(row.className).to.match(/MuiMenu2\w+-dense/);
    });
    // The item gives the resolved value to its children, not its own prop.
    expect(screen.getByTestId('text')).to.have.class('MuiListItemText-dense');
  });

  describe('submenu density', () => {
    it('updates an open submenu when the parent list density changes', async () => {
      function TestMenu() {
        const [dense, setDense] = React.useState(false);
        return (
          <Menu2>
            <Menu2Trigger render={<Button disableRipple>Options</Button>} />
            <Menu2Popup slotProps={{ list: { dense } }}>
              <Menu2Submenu>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup slotProps={{ list: { 'data-testid': 'submenu-list' } }}>
                  <Menu2CheckboxItem
                    checked={dense}
                    onCheckedChange={setDense}
                    closeOnClick={false}
                  >
                    Dense
                  </Menu2CheckboxItem>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
        );
      }

      const { user } = render(<TestMenu />);
      await user.click(screen.getByRole('button', { name: 'Options' }));
      await user.click(await screen.findByRole('menuitem', { name: 'More' }));
      await screen.findByRole('menuitemcheckbox', { name: 'Dense' });

      function expectDensity(dense: boolean) {
        expect(
          screen
            .getByRole('menuitem', { name: 'More' })
            .classList.contains(menu2SubmenuTriggerClasses.dense),
        ).to.equal(dense);
        expect(screen.getByTestId('submenu-list').classList.contains(listClasses.dense)).to.equal(
          dense,
        );
        expect(
          screen
            .getByRole('menuitem', { name: 'Nested' })
            .classList.contains(menu2ItemClasses.dense),
        ).to.equal(dense);
      }

      expectDensity(false);

      await user.click(screen.getByRole('menuitemcheckbox', { name: 'Dense' }));
      expectDensity(true);

      await user.click(screen.getByRole('menuitemcheckbox', { name: 'Dense' }));
      expectDensity(false);
    });

    it('inherits density through custom list slots and multiple submenu levels', async () => {
      const CustomList = React.forwardRef<HTMLUListElement, ListProps & { ownerState: object }>(
        function CustomList({ ownerState, ...props }, ref) {
          return <List {...props} ref={ref} data-dense={props.dense} />;
        },
      );
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<Button>Options</Button>} />
          <Menu2Popup slotProps={{ list: { dense: true } }}>
            <Menu2Submenu>
              <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup
                slots={{ list: CustomList }}
                slotProps={{ list: { component: 'ul', 'data-testid': 'custom-list' } }}
              >
                <Menu2Item>
                  <ListItemText data-testid="nested-text">Nested</ListItemText>
                </Menu2Item>
                <Menu2Submenu>
                  <Menu2SubmenuTrigger openOnHover={false}>Deeper</Menu2SubmenuTrigger>
                  <Menu2SubmenuPopup slotProps={{ list: { 'data-testid': 'deep-list' } }}>
                    <Menu2Item>Deep item</Menu2Item>
                  </Menu2SubmenuPopup>
                </Menu2Submenu>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      await user.click(await screen.findByRole('menuitem', { name: 'More' }));

      expect(await screen.findByTestId('custom-list')).to.have.attribute('data-dense', 'true');
      expect(screen.getByTestId('custom-list')).to.have.class(listClasses.dense);
      expect(screen.getByRole('menuitem', { name: 'Nested' })).to.have.class(
        menu2ItemClasses.dense,
      );
      expect(screen.getByTestId('nested-text')).to.have.class('MuiListItemText-dense');
      expect(screen.getByRole('menuitem', { name: 'Deeper' })).to.have.class(
        menu2SubmenuTriggerClasses.dense,
      );

      await user.click(screen.getByRole('menuitem', { name: 'Deeper' }));

      expect(await screen.findByRole('menuitem', { name: 'Deep item' })).to.have.class(
        menu2ItemClasses.dense,
      );
      expect(screen.getByTestId('deep-list')).to.have.class(listClasses.dense);
    });

    it.each([false, true])(
      'preserves inherited dense=%s despite a submenu list override',
      async (dense) => {
        const { user } = render(
          <Menu2>
            <Menu2Trigger render={<Button>Options</Button>} />
            <Menu2Popup slotProps={{ list: { dense } }}>
              <Menu2Submenu>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup
                  slotProps={{
                    // @ts-expect-error Test an unsupported density override from JavaScript.
                    list: { dense: !dense, 'data-testid': 'overridden-list' },
                  }}
                >
                  <Menu2Item>Nested</Menu2Item>
                  <Menu2Submenu>
                    <Menu2SubmenuTrigger openOnHover={false}>Deeper</Menu2SubmenuTrigger>
                    <Menu2SubmenuPopup slotProps={{ list: { 'data-testid': 'deep-list' } }}>
                      <Menu2Item>Deep item</Menu2Item>
                    </Menu2SubmenuPopup>
                  </Menu2Submenu>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>,
        );

        await user.click(screen.getByRole('button', { name: 'Options' }));
        await user.click(await screen.findByRole('menuitem', { name: 'More' }));

        expect(
          (await screen.findByTestId('overridden-list')).classList.contains(listClasses.dense),
        ).to.equal(dense);
        expect(
          screen
            .getByRole('menuitem', { name: 'Nested' })
            .classList.contains(menu2ItemClasses.dense),
        ).to.equal(dense);

        await user.click(screen.getByRole('menuitem', { name: 'Deeper' }));

        expect(
          (await screen.findByRole('menuitem', { name: 'Deep item' })).classList.contains(
            menu2ItemClasses.dense,
          ),
        ).to.equal(dense);
        expect(screen.getByTestId('deep-list').classList.contains(listClasses.dense)).to.equal(
          dense,
        );
      },
    );

    it.each([false, true])(
      'preserves callback list props and owner state with inherited dense=%s',
      async (dense) => {
        const listRef = React.createRef<HTMLUListElement>();
        const handleClick = vi.fn();
        const { user } = render(
          <Menu2>
            <Menu2Trigger render={<Button>Options</Button>} />
            <Menu2Popup slotProps={{ list: { dense } }}>
              <Menu2Submenu>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup
                  align="end"
                  slotProps={{
                    // @ts-expect-error Test an unsupported density override from JavaScript.
                    list: (ownerState) => ({
                      component: 'ul',
                      ref: listRef,
                      dense: !dense,
                      disablePadding: true,
                      className: 'custom-list',
                      'data-testid': 'callback-list',
                      'data-align': ownerState.align,
                      onClick: handleClick,
                    }),
                  }}
                >
                  <Menu2Item closeOnClick={false}>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>,
        );

        await user.click(screen.getByRole('button', { name: 'Options' }));
        await user.click(await screen.findByRole('menuitem', { name: 'More' }));

        const list = await screen.findByTestId('callback-list');
        expect(list.tagName).to.equal('UL');
        expect(listRef.current).to.equal(list);
        expect(list).to.have.attribute('data-align', 'end');
        expect(list).to.have.class('custom-list');
        expect(list).not.to.have.class(listClasses.padding);
        expect(list.classList.contains(listClasses.dense)).to.equal(dense);
        expect(
          screen
            .getByRole('menuitem', { name: 'Nested' })
            .classList.contains(menu2ItemClasses.dense),
        ).to.equal(dense);

        await user.click(screen.getByRole('menuitem', { name: 'Nested' }));
        expect(handleClick).toHaveBeenCalledTimes(1);
      },
    );

    it('preserves inherited density despite a submenu theme default', async () => {
      const theme = createTheme({
        components: {
          MuiMenu2SubmenuPopup: {
            // @ts-expect-error Test an unsupported density override from JavaScript.
            defaultProps: { slotProps: { list: { dense: false } } },
          },
        },
      });
      const { user } = render(
        <ThemeProvider theme={theme}>
          <Menu2>
            <Menu2Trigger render={<Button>Options</Button>} />
            <Menu2Popup slotProps={{ list: { dense: true } }}>
              <Menu2Submenu>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup slotProps={{ list: { 'data-testid': 'themed-list' } }}>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      await user.click(await screen.findByRole('menuitem', { name: 'More' }));

      expect(await screen.findByTestId('themed-list')).to.have.class(listClasses.dense);
      expect(screen.getByRole('menuitem', { name: 'Nested' })).to.have.class(
        menu2ItemClasses.dense,
      );
    });

    it('keeps a normal-density submenu normal even when its trigger is dense', async () => {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<Button>Options</Button>} />
          <Menu2Popup>
            <Menu2Submenu>
              <Menu2SubmenuTrigger dense openOnHover={false}>
                More
              </Menu2SubmenuTrigger>
              <Menu2SubmenuPopup slotProps={{ list: { 'data-testid': 'normal-list' } }}>
                <Menu2Item>Nested</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      const trigger = await screen.findByRole('menuitem', { name: 'More' });
      expect(trigger).to.have.class(menu2SubmenuTriggerClasses.dense);

      await user.click(trigger);

      expect(await screen.findByTestId('normal-list')).not.to.have.class(listClasses.dense);
      expect(screen.getByRole('menuitem', { name: 'Nested' })).not.to.have.class(
        menu2ItemClasses.dense,
      );
    });
  });

  it('passes the list component, owner state, and ref to a custom slot', async () => {
    const listRef = React.createRef<HTMLUListElement>();
    const CustomList = React.forwardRef<
      HTMLUListElement,
      ListProps & { ownerState: { align?: string | undefined } }
    >(function CustomList({ ownerState, ...props }, ref) {
      return (
        <List {...props} ref={ref} data-align={ownerState.align} data-component={props.component} />
      );
    });
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup
          align="end"
          slots={{ list: CustomList }}
          slotProps={{ list: { component: 'ul', ref: listRef, 'data-testid': 'list' } }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const list = await screen.findByTestId('list');
    expect(list.tagName).to.equal('UL');
    expect(listRef.current).to.equal(list);
    expect(list).to.have.attribute('data-align', 'end');
    expect(list).to.have.class(menu2PopupClasses.list);
    expect(list).to.have.attribute('data-component', 'ul');
    expect(list).to.have.class(listClasses.padding);
  });

  it('does not pass internal props to host paper and list slots', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup
          sx={{ minWidth: 120 }}
          slots={{ root: 'div', list: 'div' }}
          slotProps={{
            root: {
              'data-testid': 'paper',
              classes: { root: 'paper-root' },
              component: 'section',
              elevation: 4,
            },
            list: {
              'data-testid': 'list',
              classes: { root: 'list-root' },
              component: 'ul',
              disablePadding: false,
              sx: { color: 'red' },
            },
          }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const paper = await screen.findByTestId('paper');
    expect(paper).not.to.have.attribute('classes');
    expect(paper).not.to.have.attribute('component');
    expect(paper).not.to.have.attribute('elevation');
    expect(paper).not.to.have.attribute('sx');

    const list = screen.getByTestId('list');
    expect(list.tagName).to.equal('DIV');
    expect(list).not.to.have.attribute('classes');
    expect(list).not.to.have.attribute('component');
    expect(list).not.to.have.attribute('disablePadding');
    expect(list).not.to.have.attribute('disablepadding');
    expect(list).not.to.have.attribute('sx');
  });

  it('defaults the popup surface elevation to 8', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup slotProps={{ root: { 'data-testid': 'paper' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class(paperClasses.elevation8);
  });

  it('forwards a custom elevation to the popup surface', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup elevation={4} slotProps={{ root: { 'data-testid': 'paper' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByTestId('paper')).to.have.class(paperClasses.elevation4);
  });

  it.skipIf(isJsdom())('animates the popup surface by default', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    const popup = await screen.findByRole('menu');

    expect(popup).to.have.class(menu2PopupClasses.root);
    await waitFor(() => expect(popup.getAnimations().length).to.be.greaterThan(0));
    expect(window.getComputedStyle(popup).transitionProperty).to.contain('opacity');
    expect(window.getComputedStyle(popup).transitionProperty).to.contain('transform');
    await waitFor(() => expect(popup.getAnimations()).to.have.length(0));
  });

  it.skipIf(isJsdom())(
    'emits forced-colors rules for items under the contrast enhancer',
    async () => {
      const { user } = render(
        <ThemeProvider theme={enhanceHighContrast(createTheme())}>
          <Menu2>
            <Menu2Trigger render={<Button disableRipple>Options</Button>} />
            <Menu2Popup>
              <Menu2Item>Profile</Menu2Item>
              <Menu2CheckboxItem defaultChecked>Bookmarks</Menu2CheckboxItem>
              <Menu2Submenu>
                <Menu2SubmenuTrigger>View</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item>Zoom in</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      await screen.findByRole('menu');

      // The rules only apply in forced colors, which the runner cannot emulate;
      // assert that the enhancer's overrides reach the stylesheet at all.
      // Look inside the forced-colors media rules specifically: the class names
      // and the media query itself are both emitted without the enhancer, so
      // matching on the whole stylesheet would pass with the overrides removed.
      const menu2ForcedColorsRules = Array.from(document.styleSheets)
        .flatMap((sheet) => {
          try {
            return Array.from(sheet.cssRules);
          } catch {
            return [];
          }
        })
        .filter((rule) => (rule as CSSMediaRule).conditionText?.includes('forced-colors'))
        .flatMap((rule) => Array.from((rule as CSSMediaRule).cssRules ?? []))
        .map((rule) => rule.cssText)
        .filter((text) => text.includes('MuiMenu2'));

      // The CSSOM lowercases system colour keywords.
      expect(menu2ForcedColorsRules.join('\n').toLowerCase()).to.contain('highlighttext');
      const matches = (needle: string) =>
        menu2ForcedColorsRules.some((text) => text.includes(needle));
      for (const componentName of ['MuiMenu2Item', 'MuiMenu2CheckboxItem']) {
        expect(
          menu2ForcedColorsRules.some(
            (text) => text.includes(componentName) && text.includes('.Mui-focusVisible'),
          ),
        ).to.equal(true);
      }
      expect(matches(menu2SubmenuTriggerClasses.open)).to.equal(true);
      const indicator = screen
        .getByRole('menuitemcheckbox', { name: 'Bookmarks' })
        .querySelector(`.${menu2CheckboxItemIndicatorClasses.root}`)!;
      expect(indicator).not.to.equal(null);
      // The item owns the indicator styles; the old indicator root class remains
      // available as a styling hook but no longer names the generated CSS rule.
      const indicatorStyleClass = Array.from(indicator.classList).find(
        (className) =>
          className !== menu2CheckboxItemClasses.indicator &&
          className.endsWith('MuiMenu2CheckboxItem-indicator'),
      )!;
      expect(indicatorStyleClass).not.to.equal(undefined);
      expect(matches(indicatorStyleClass)).to.equal(true);
      // The indicator's own `[data-checked]` colour is (0,2,0). The override has
      // to carry the same attribute, or a checked indicator keeps the MUI blue
      // in forced colors instead of the system colour.
      expect(
        menu2ForcedColorsRules.some(
          (text) =>
            text.includes(`.${indicatorStyleClass}[data-checked]`) &&
            text.includes('color: inherit;') &&
            text.includes('background-color: transparent;'),
        ),
      ).to.equal(true);
    },
  );

  it.skipIf(isJsdom())('lets the default animation be overridden', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup
          slots={{ transition: null }}
          slotProps={{ root: { sx: { transition: 'none' } } }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const popup = await screen.findByRole('menu');
    expect(window.getComputedStyle(popup).transitionProperty).to.equal('none');
  });

  it('renders a transparent backdrop that blocks outside clicks', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup slotProps={{ backdrop: { 'data-testid': 'backdrop' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const backdrop = await screen.findByTestId('backdrop');
    expect(backdrop).to.have.class(menu2PopupClasses.backdrop);
    // The layer is transparent. A modal menu uses it to block outside clicks.
    const { backgroundColor, pointerEvents } = window.getComputedStyle(backdrop);
    expect(backgroundColor).to.equal('rgba(0, 0, 0, 0)');
    expect(pointerEvents).to.equal('auto');
  });

  it('supports dimming through the backdrop slot', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup
          slotProps={{
            backdrop: { 'data-testid': 'backdrop', sx: { backgroundColor: 'rgb(0, 0, 0)' } },
          }}
        >
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const backdrop = await screen.findByTestId('backdrop');
    expect(window.getComputedStyle(backdrop).backgroundColor).to.equal('rgb(0, 0, 0)');
  });

  it.skipIf(isJsdom())('puts the backdrop above an element at the app bar level', async () => {
    const { user } = render(
      <React.Fragment>
        <div
          data-testid="bar"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 56,
            zIndex: createTheme().zIndex.appBar,
          }}
        />
        <div style={{ paddingTop: 96 }}>
          <Menu2 modal={false}>
            <Menu2Trigger render={<Button disableRipple>Options</Button>} />
            <Menu2Popup
              slotProps={{ backdrop: { 'data-testid': 'backdrop', sx: { pointerEvents: 'auto' } } }}
            >
              <Menu2Item>Profile</Menu2Item>
            </Menu2Popup>
          </Menu2>
        </div>
      </React.Fragment>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    await screen.findByRole('menu');

    // The classic backdrop sits in the Modal root, so it covers an AppBar.
    expect(document.elementFromPoint(10, 10)).to.equal(screen.getByTestId('backdrop'));
    // The menu stays above its own backdrop.
    const item = screen.getByRole('menuitem', { name: 'Profile' }).getBoundingClientRect();
    expect(
      screen
        .getByRole('menu')
        .contains(document.elementFromPoint(item.left + 8, item.top + item.height / 2)),
    ).to.equal(true);
  });

  it.skipIf(isJsdom())('stacks the shared root at theme.zIndex.modal', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    // Base UI sets no z-index, so a fixed AppBar would paint over the menu.
    const positioner = (await screen.findByRole('menu')).parentElement!;
    const root = positioner.parentElement!;
    expect(positioner).to.have.class(menu2PopupClasses.positioner);
    expect(root).to.have.class(menu2PopupClasses.portal);
    expect(window.getComputedStyle(root).zIndex).to.equal(String(createTheme().zIndex.modal));
    expect(root).to.contain(positioner.previousElementSibling);
  });

  it.skipIf(isJsdom())('constrains the popup surface to the collision-aware height', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup slotProps={{ root: { 'data-testid': 'paper' } }}>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const paper = await screen.findByTestId('paper');
    const { maxHeight, overflowY } = window.getComputedStyle(paper);
    // Regression: the classic `calc(100% - 96px)` resolved against the
    // content-sized popup instead of the viewport and clipped the end of the
    // menu (separators and trailing items).
    expect(maxHeight).not.to.equal('calc(100% - 96px)');
    expect(maxHeight).not.to.equal('none');
    expect(overflowY).to.equal('auto');
  });

  it('supports controlled open state', async () => {
    const handleOpenChange = spy();

    function ControlledMenu() {
      const [open, setOpen] = React.useState(false);

      return (
        <Menu2
          open={open}
          modal={false}
          onOpenChange={(nextOpen, eventDetails) => {
            handleOpenChange(nextOpen, eventDetails);
            setOpen(nextOpen);
          }}
        >
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      );
    }

    const { user } = render(<ControlledMenu />);
    const trigger = screen.getByRole('button', { name: 'Options' });

    await user.click(trigger);
    await screen.findByRole('menu');

    expect(handleOpenChange.callCount).to.equal(1);
    expect(handleOpenChange.args[0][0]).to.equal(true);
    expect(handleOpenChange.args[0][1].reason).to.equal('trigger-press');

    await user.click(trigger);
    await waitFor(() => {
      expect(screen.queryByRole('menu')).to.equal(null);
    });

    expect(handleOpenChange.callCount).to.equal(2);
    expect(handleOpenChange.args[1][0]).to.equal(false);
    expect(handleOpenChange.args[1][1].reason).to.equal('trigger-press');
  });

  it('supports cancelling an open state change', async () => {
    const handleOpenChange = spy((open: boolean, eventDetails: any) => {
      expect(open).to.equal(true);
      expect(eventDetails.reason).to.equal('trigger-press');
      eventDetails.cancel();
      expect(eventDetails.isCanceled).to.equal(true);
    });

    const { user } = render(
      <Menu2 onOpenChange={handleOpenChange}>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    await waitFor(() => {
      expect(handleOpenChange.callCount).to.equal(1);
    });
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('does not open when the root is disabled', async () => {
    const { user } = render(
      <Menu2 disabled>
        <Menu2Trigger render={<button type="button">Options</button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.attribute('disabled');
    expect(trigger).to.have.attribute('data-disabled', '');
    expect(trigger).to.have.class(menu2TriggerClasses.disabled);
    await user.click(trigger);
    expect(screen.queryByRole('menu')).to.equal(null);
  });

  it('updates the trigger disabled class when the menu is enabled', async () => {
    function TestMenu() {
      const [disabled, setDisabled] = React.useState(true);
      return (
        <React.Fragment>
          <button type="button" onClick={() => setDisabled(false)}>
            Enable menu
          </button>
          <Menu2 disabled={disabled}>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup>
              <Menu2Item>Profile</Menu2Item>
            </Menu2Popup>
          </Menu2>
        </React.Fragment>
      );
    }

    const { user } = render(<TestMenu />);
    const trigger = screen.getByRole('button', { name: 'Options' });
    expect(trigger).to.have.class(menu2TriggerClasses.disabled);

    await user.click(screen.getByRole('button', { name: 'Enable menu' }));
    expect(trigger).not.to.have.class(menu2TriggerClasses.disabled);
    expect(trigger).not.to.have.attribute('data-disabled');
    expect(trigger).not.to.have.attribute('disabled');

    await user.click(trigger);
    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  it('supports defaultOpen', () => {
    render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  it('supports keepMounted', () => {
    render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup keepMounted>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    expect(screen.getByText('Profile')).not.to.equal(null);
    expect(screen.getByRole('button', { name: 'Options' })).to.have.attribute(
      'aria-expanded',
      'false',
    );
  });

  it('supports finalFocus', async () => {
    const finalFocusRef = React.createRef<HTMLButtonElement>();
    const { user } = render(
      <React.Fragment>
        <button ref={finalFocusRef} type="button">
          Final target
        </button>
        <Menu2>
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup finalFocus={finalFocusRef}>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </React.Fragment>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Profile' }));

    await waitFor(() => {
      expect(document.activeElement).to.equal(finalFocusRef.current);
    });
  });

  it('reports dismissal reasons and native events for Escape and outside press', async () => {
    const handleOpenChange = spy();
    const { user } = render(
      <React.Fragment>
        <button type="button">Outside</button>
        <Menu2 onOpenChange={handleOpenChange}>
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </React.Fragment>,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    await user.click(trigger);
    await screen.findByRole('menu');
    handleOpenChange.resetHistory();

    await user.keyboard('[Escape]');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).to.equal(null);
    });
    expect(handleOpenChange.callCount).to.equal(1);
    expect(handleOpenChange.args[0][0]).to.equal(false);
    expect(handleOpenChange.args[0][1].reason).to.equal('escape-key');
    expect(handleOpenChange.args[0][1].event).to.be.instanceOf(KeyboardEvent);
    expect(handleOpenChange.args[0][1].event.type).to.equal('keydown');
    expect(handleOpenChange.args[0][1].event).not.to.have.property('nativeEvent');
    expect(document.activeElement).to.equal(trigger);

    await user.click(trigger);
    await screen.findByRole('menu');
    handleOpenChange.resetHistory();
    await user.click(screen.getByRole('button', { name: 'Outside' }));

    await waitFor(() => {
      expect(screen.queryByRole('menu')).to.equal(null);
    });
    expect(handleOpenChange.callCount).to.equal(1);
    expect(handleOpenChange.args[0][0]).to.equal(false);
    expect(handleOpenChange.args[0][1].reason).to.equal('outside-press');
    expect(handleOpenChange.args[0][1].event).to.be.instanceOf(Event);
    expect(handleOpenChange.args[0][1].event.type).to.equal('pointerdown');
    expect(handleOpenChange.args[0][1].event).not.to.have.property('nativeEvent');
  });

  it('supports cancelling a close state change', async () => {
    const handleOpenChange = spy((open: boolean, eventDetails: any) => {
      expect(open).to.equal(false);
      expect(eventDetails.reason).to.equal('escape-key');
      eventDetails.cancel();
      expect(eventDetails.isCanceled).to.equal(true);
    });
    const { user } = render(
      <Menu2 defaultOpen onOpenChange={handleOpenChange}>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.keyboard('[Escape]');

    await waitFor(() => {
      expect(handleOpenChange.callCount).to.equal(1);
    });
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  [true, false].forEach((modal) => {
    it.skipIf(isJsdom())(`reports focus-out when tabbing away with modal=${modal}`, async () => {
      const handleOpenChange = spy();
      const { user } = render(
        <React.Fragment>
          <Menu2 modal={modal} onOpenChange={handleOpenChange}>
            <Menu2Trigger render={<Button disableRipple>Options</Button>} />
            <Menu2Popup>
              <Menu2Item>Profile</Menu2Item>
            </Menu2Popup>
          </Menu2>
          <button type="button">After</button>
        </React.Fragment>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));
      const item = await screen.findByRole('menuitem', { name: 'Profile' });
      await waitFor(() => {
        expect(item.closest('[role="menu"]')!.contains(document.activeElement)).to.equal(true);
      });
      handleOpenChange.resetHistory();

      await user.tab();

      await waitFor(() => {
        expect(screen.queryByRole('menu')).to.equal(null);
      });
      expect(handleOpenChange.callCount).to.equal(1);
      expect(handleOpenChange.args[0][0]).to.equal(false);
      expect(handleOpenChange.args[0][1].reason).to.equal('focus-out');
      expect(handleOpenChange.args[0][1].event).to.be.instanceOf(FocusEvent);
      expect(handleOpenChange.args[0][1].event).not.to.have.property('nativeEvent');
      expect(screen.getByRole('button', { name: 'After' })).toHaveFocus();
    });
  });

  it('supports touch trigger interactions', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>Profile</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.pointer({
      keys: '[TouchA]',
      target: screen.getByRole('button', { name: 'Options' }),
    });

    expect(await screen.findByRole('menu')).not.to.equal(null);
  });

  it('supports modal backdrop behavior', async () => {
    const { user } = render(
      <React.Fragment>
        <Menu2 modal>
          <Menu2Trigger render={<Button disableRipple>Modal menu</Button>} />
          <Menu2Popup slotProps={{ positioner: { 'data-testid': 'modal-positioner' } }}>
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
        <Menu2 modal={false}>
          <Menu2Trigger render={<Button disableRipple>Non-modal menu</Button>} />
          <Menu2Popup slotProps={{ positioner: { 'data-testid': 'non-modal-positioner' } }}>
            <Menu2Item>Settings</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </React.Fragment>,
    );

    await user.click(screen.getByRole('button', { name: 'Modal menu' }));
    await screen.findByRole('menu');
    expect(screen.getByTestId('modal-positioner').previousElementSibling).to.have.attribute(
      'role',
      'presentation',
    );

    await user.keyboard('[Escape]');
    await waitFor(() => {
      expect(screen.queryByRole('menu')).to.equal(null);
    });

    await user.click(screen.getByRole('button', { name: 'Non-modal menu' }));
    await screen.findByRole('menu');
    expect(screen.getByTestId('non-modal-positioner').previousElementSibling).to.equal(null);
  });

  it.skipIf(isJsdom())(
    'uses the Material theme direction for submenu keyboard navigation',
    async () => {
      const { user } = render(
        <ThemeProvider theme={createTheme({ direction: 'rtl' })}>
          <Menu2 defaultOpen modal={false}>
            <Menu2Trigger render={<button type="button">Options</button>} />
            <Menu2Popup>
              <Menu2Submenu>
                <Menu2SubmenuTrigger openOnHover={false}>More</Menu2SubmenuTrigger>
                <Menu2SubmenuPopup>
                  <Menu2Item>Nested</Menu2Item>
                </Menu2SubmenuPopup>
              </Menu2Submenu>
            </Menu2Popup>
          </Menu2>
        </ThemeProvider>,
      );

      const submenuTrigger = await screen.findByRole('menuitem', { name: 'More' });
      await waitFor(() => {
        expect(submenuTrigger.closest('[role="menu"]')!.contains(document.activeElement)).to.equal(
          true,
        );
      });
      await act(async () => submenuTrigger.focus());
      await user.keyboard('{ArrowLeft}');

      const nestedItem = await screen.findByRole('menuitem', { name: 'Nested' });
      await act(async () => nestedItem.focus());

      await user.keyboard('{ArrowRight}');

      await waitFor(() => {
        expect(screen.queryByRole('menuitem', { name: 'Nested' })).to.equal(null);
      });
      expect(submenuTrigger).to.equal(document.activeElement);
    },
  );

  it.skipIf(isJsdom())('applies Base UI positioning attributes in the browser', async () => {
    const { user } = render(
      <div style={{ padding: 96 }}>
        <Menu2>
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup
            side="bottom"
            align="start"
            sideOffset={4}
            slotProps={{ positioner: { 'data-testid': 'positioner' } }}
          >
            <Menu2Item>Profile</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </div>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const positioner = await screen.findByTestId('positioner');
    expect(positioner).to.have.attribute('data-side', 'bottom');
    expect(positioner).to.have.attribute('data-align', 'start');
    expect(positioner.style.transform).not.to.equal('');
  });

  it('supports checkbox and radio item state', async () => {
    const handleCheckboxChange = spy();
    const handleCheckboxClick = spy();
    const handleRadioChange = spy();
    const handleRadioClick = spy();

    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2CheckboxItem onCheckedChange={handleCheckboxChange} onClick={handleCheckboxClick}>
            Show hidden files
          </Menu2CheckboxItem>
          <Menu2RadioGroup defaultValue="small" onValueChange={handleRadioChange}>
            <Menu2RadioItem value="small">Small</Menu2RadioItem>
            <Menu2RadioItem value="large" onClick={handleRadioClick}>
              Large
            </Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    const checkbox = await screen.findByRole('menuitemcheckbox', { name: /show hidden files/i });
    expect(checkbox).to.have.attribute('aria-checked', 'false');

    await user.click(checkbox);

    expect(checkbox).to.have.attribute('aria-checked', 'true');
    expect(checkbox).to.have.class(menu2CheckboxItemClasses.checked);
    expect(handleCheckboxChange.callCount).to.equal(1);
    expect(handleCheckboxChange.firstCall.args).to.have.length(2);
    const [checked, checkedEventDetails] = handleCheckboxChange.firstCall.args;
    expect(checked).to.equal(true);
    expect(checkedEventDetails.reason).to.equal('item-press');
    expect(checkedEventDetails.event).to.be.instanceOf(Event);
    expect(checkedEventDetails.event).to.equal(handleCheckboxClick.firstCall.args[0].nativeEvent);

    expect(screen.getByRole('menuitemradio', { name: /small/i })).to.have.attribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByRole('menuitemradio', { name: /large/i })).to.have.attribute(
      'aria-checked',
      'false',
    );

    await user.click(screen.getByRole('menuitemradio', { name: /large/i }));

    expect(screen.getByRole('menuitemradio', { name: /large/i })).to.have.attribute(
      'aria-checked',
      'true',
    );
    expect(handleRadioChange.callCount).to.equal(1);
    expect(handleRadioChange.firstCall.args).to.have.length(2);
    const [value, valueEventDetails] = handleRadioChange.firstCall.args;
    expect(value).to.equal('large');
    expect(valueEventDetails.reason).to.equal('item-press');
    expect(valueEventDetails.event).to.be.instanceOf(Event);
    expect(valueEventDetails.event).to.equal(handleRadioClick.firstCall.args[0].nativeEvent);
  });

  it.skipIf(isJsdom())('gives the items a ripple, and disableRipple turns it off', async () => {
    const { user } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item closeOnClick={false}>Profile</Menu2Item>
          <Menu2Item closeOnClick={false} disableRipple>
            No ripple
          </Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    const withRipple = await screen.findByRole('menuitem', { name: 'Profile' });
    const withoutRipple = screen.getByRole('menuitem', { name: 'No ripple' });

    // The items keep their element; ButtonBase renders a <button> by default.
    expect(withRipple.tagName).to.equal('DIV');

    // ButtonBase mounts the ripple lazily, on the first interaction.
    await user.pointer({ keys: '[MouseLeft>]', target: withRipple });
    await waitFor(() => {
      expect(withRipple.querySelectorAll('.MuiTouchRipple-ripple').length).to.be.greaterThan(0);
    });
    await user.pointer({ keys: '[/MouseLeft]', target: withRipple });

    await user.pointer({ keys: '[MouseLeft>]', target: withoutRipple });
    expect(withoutRipple.querySelector('.MuiTouchRipple-root')).to.equal(null);
    await user.pointer({ keys: '[/MouseLeft]', target: withoutRipple });
  });

  // The focus visible docs opt out of the ripple through `MuiButtonBase`
  // default props. An explicit prop on the item would beat them.
  it.skipIf(isJsdom())('lets the MuiButtonBase default props turn the ripple off', async () => {
    const theme = createTheme({
      components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
    });
    const { user } = render(
      <ThemeProvider theme={theme}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Item closeOnClick={false}>Item</Menu2Item>
            <Menu2CheckboxItem>Checkbox item</Menu2CheckboxItem>
            <Menu2RadioGroup defaultValue="one">
              <Menu2RadioItem value="one">Radio item</Menu2RadioItem>
            </Menu2RadioGroup>
            <Menu2LinkItem href="/profile" onClick={(event) => event.preventDefault()}>
              Link item
            </Menu2LinkItem>
            <Menu2Item closeOnClick={false} disableRipple={false}>
              Explicit ripple
            </Menu2Item>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    await screen.findByRole('menuitem', { name: 'Item' });

    const themedItems = [
      screen.getByRole('menuitem', { name: 'Item' }),
      screen.getByRole('menuitemcheckbox', { name: 'Checkbox item' }),
      screen.getByRole('menuitemradio', { name: 'Radio item' }),
      screen.getByRole('menuitem', { name: 'Link item' }),
    ];

    const rippled: (string | null)[] = [];
    for (const item of themedItems) {
      // eslint-disable-next-line no-await-in-loop
      await user.pointer({ keys: '[MouseLeft>]', target: item });
      if (item.querySelector('.MuiTouchRipple-root') !== null) {
        rippled.push(item.textContent);
      }
      // eslint-disable-next-line no-await-in-loop
      await user.pointer({ keys: '[/MouseLeft]', target: item });
    }
    expect(rippled).to.deep.equal([]);

    // An explicit prop still wins over the default props.
    const explicit = screen.getByRole('menuitem', { name: 'Explicit ripple' });
    await user.pointer({ keys: '[MouseLeft>]', target: explicit });
    await waitFor(() => {
      expect(explicit.querySelectorAll('.MuiTouchRipple-ripple').length).to.be.greaterThan(0);
    });
    await user.pointer({ keys: '[/MouseLeft]', target: explicit });
  });

  it('renders the Checkbox and Radio icons for each indicator state', () => {
    render(
      <Menu2 open>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2CheckboxItem slotProps={{ indicator: { 'data-testid': 'unchecked-checkbox' } }}>
            Show hidden files
          </Menu2CheckboxItem>
          <Menu2CheckboxItem
            defaultChecked
            slotProps={{ indicator: { 'data-testid': 'checked-checkbox' } }}
          >
            Show the sidebar
          </Menu2CheckboxItem>
          <Menu2RadioGroup defaultValue="small">
            <Menu2RadioItem
              value="small"
              slotProps={{ indicator: { 'data-testid': 'checked-radio' } }}
            >
              Small
            </Menu2RadioItem>
            <Menu2RadioItem
              value="large"
              slotProps={{ indicator: { 'data-testid': 'unchecked-radio' } }}
            >
              Large
            </Menu2RadioItem>
          </Menu2RadioGroup>
        </Menu2Popup>
      </Menu2>,
    );

    // The checkbox swaps the icon the way the real Checkbox does: an outlined
    // empty box, then the filled box with the check.
    const uncheckedCheckbox = screen.getByTestId('unchecked-checkbox');
    expect(uncheckedCheckbox).to.have.attribute('data-unchecked', '');
    expect(
      uncheckedCheckbox.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]'),
    ).not.to.equal(null);
    expect(uncheckedCheckbox.querySelector('[data-testid="CheckBoxIcon"]')).to.equal(null);

    const checkedCheckbox = screen.getByTestId('checked-checkbox');
    expect(checkedCheckbox).to.have.attribute('data-checked', '');
    expect(checkedCheckbox.querySelector('[data-testid="CheckBoxIcon"]')).not.to.equal(null);
    expect(checkedCheckbox.querySelector('[data-testid="CheckBoxOutlineBlankIcon"]')).to.equal(
      null,
    );

    // The radio keeps both layers of `RadioButtonIcon` mounted, so the dot can
    // animate; only the scale changes with the state.
    const checkedRadio = screen.getByTestId('checked-radio');
    const uncheckedRadio = screen.getByTestId('unchecked-radio');
    expect(checkedRadio).to.have.attribute('data-checked', '');
    expect(uncheckedRadio).to.have.attribute('data-unchecked', '');

    [checkedRadio, uncheckedRadio].forEach((indicator) => {
      expect(indicator.querySelector('[data-testid="RadioButtonUncheckedIcon"]')).not.to.equal(
        null,
      );
      expect(indicator.querySelector('[data-testid="RadioButtonCheckedIcon"]')).not.to.equal(null);
    });

    // A real browser reports the transform as a matrix, jsdom as written.
    const getScale = (element: Element) => {
      const { transform } = window.getComputedStyle(element);
      return Number(/^(?:matrix|scale)\(([^,)]+)/.exec(transform)?.[1]);
    };
    const checkedDot = checkedRadio.querySelector('[data-testid="RadioButtonCheckedIcon"]')!;
    const uncheckedDot = uncheckedRadio.querySelector('[data-testid="RadioButtonCheckedIcon"]')!;
    expect(getScale(checkedDot)).to.equal(1);
    expect(getScale(uncheckedDot)).to.equal(0);
  });

  it('supports groups, labels, separators, link items, and submenus', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Group>
            <Menu2GroupLabel>Account</Menu2GroupLabel>
            <Menu2LinkItem href="/profile">Profile</Menu2LinkItem>
          </Menu2Group>
          <Menu2Separator />
          <Menu2Submenu defaultOpen>
            <Menu2SubmenuTrigger>More</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Archive</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    expect(await screen.findByText('Account')).not.to.equal(null);
    expect(screen.getByRole('separator')).not.to.equal(null);
    expect(screen.getByRole('menuitem', { name: 'Profile' })).to.have.attribute('href', '/profile');
    const submenuTrigger = screen.getByRole('menuitem', { name: 'More' });
    const submenu = screen.getByRole('menu', { name: 'More' });
    expect(submenuTrigger).to.have.attribute('aria-controls', submenu.id);
    expect(submenu).to.have.attribute('aria-labelledby', submenuTrigger.id);
    expect(screen.getByRole('menuitem', { name: 'Archive' })).to.not.equal(null);
  });

  it.skipIf(isJsdom())(
    'restores focus to finalFocus when a detached context menu closes',
    async () => {
      function ContextMenuHarness() {
        const [anchor, setAnchor] = React.useState<{ getBoundingClientRect: () => DOMRect } | null>(
          null,
        );
        const areaRef = React.useRef<HTMLDivElement | null>(null);

        return (
          <div
            ref={areaRef}
            tabIndex={-1}
            data-testid="context-area"
            onContextMenu={(event) => {
              event.preventDefault();
              const { clientX, clientY } = event;
              setAnchor({
                getBoundingClientRect: () =>
                  DOMRect.fromRect({ x: clientX, y: clientY, width: 0, height: 0 }),
              });
            }}
          >
            Context area
            <Menu2
              open={anchor !== null}
              onOpenChange={(nextOpen) => {
                if (!nextOpen) {
                  setAnchor(null);
                }
              }}
            >
              <Menu2Popup anchor={anchor ?? undefined} positionMethod="fixed" finalFocus={areaRef}>
                <Menu2Item>Copy</Menu2Item>
              </Menu2Popup>
            </Menu2>
          </div>
        );
      }

      const { user } = render(
        <React.Fragment>
          <Menu2>
            <Menu2Trigger render={<Button disableRipple>Other menu</Button>} />
            <Menu2Popup>
              <Menu2Item>Other item</Menu2Item>
            </Menu2Popup>
          </Menu2>
          <ContextMenuHarness />
        </React.Fragment>,
      );

      // Seed Base UI's internal previously-focused record with an unrelated
      // trigger by opening and closing that menu first.
      const otherTrigger = screen.getByRole('button', { name: 'Other menu' });
      await user.click(otherTrigger);
      await screen.findByRole('menuitem', { name: 'Other item' });
      await user.keyboard('{Escape}');
      await waitFor(() => {
        expect(otherTrigger).toHaveFocus();
      });

      // A detached menu has no trigger; without finalFocus, closing it restores
      // focus to that stale record instead of the invoked surface.
      const area = screen.getByTestId('context-area');
      fireEvent.contextMenu(area, { clientX: 100, clientY: 100 });
      await screen.findByRole('menuitem', { name: 'Copy' });

      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(area).toHaveFocus();
      });
    },
  );

  it.skipIf(isJsdom())('supports inset list text composed inside items', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Item>
            <ListItemIcon data-testid="icon">i</ListItemIcon>
            <ListItemText>Cut</ListItemText>
          </Menu2Item>
          <Menu2Item>
            <ListItemText inset data-testid="inset-text">
              Paste
            </ListItemText>
          </Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));

    // `inset` is a ListItemText prop, not an item prop: the shared item styles
    // align it with the icon column so icon-less items line up.
    const insetText = await screen.findByTestId('inset-text');
    expect(window.getComputedStyle(insetText).paddingLeft).to.equal('36px');
    expect(window.getComputedStyle(screen.getByTestId('icon')).minWidth).to.equal('36px');
  });

  it.skipIf(isJsdom())('keeps separator spacing stable while a submenu is open', async () => {
    const { user } = render(
      <Menu2>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Submenu defaultOpen>
            <Menu2SubmenuTrigger>View</Menu2SubmenuTrigger>
            <Menu2SubmenuPopup>
              <Menu2Item>Zoom</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
          <Menu2Separator />
          <Menu2Item>After</Menu2Item>
        </Menu2Popup>
      </Menu2>,
    );

    await user.click(screen.getByRole('button', { name: 'Options' }));
    await screen.findByRole('menuitem', { name: 'Zoom' });

    const separator = screen.getByRole('separator');
    const { marginTop, marginBottom } = window.getComputedStyle(separator);
    // Regression: the inline focus-guard nodes of an open submenu broke the
    // legacy `[item] + divider` adjacency rule and collapsed this spacing.
    expect(marginTop).to.equal('8px');
    expect(marginBottom).to.equal('8px');
  });

  it('supports Material UI Tooltip on enabled item flavors', async () => {
    const { user } = render(
      <Menu2 open>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Tooltip title="Create a blank document" describeChild enterDelay={0} leaveDelay={0}>
            <Menu2Item>New document</Menu2Item>
          </Tooltip>
          <Tooltip title="Toggle comments" describeChild enterDelay={0} leaveDelay={0}>
            <Menu2CheckboxItem>Comments</Menu2CheckboxItem>
          </Tooltip>
          <Menu2RadioGroup defaultValue="fit">
            <Tooltip title="Fit to viewport" describeChild enterDelay={0} leaveDelay={0}>
              <Menu2RadioItem value="fit">Fit</Menu2RadioItem>
            </Tooltip>
          </Menu2RadioGroup>
        </Menu2Popup>
      </Menu2>,
    );

    await expectTooltipOnHover(
      user,
      screen.getByRole('menuitem', { name: 'New document' }),
      'Create a blank document',
    );
    await expectTooltipOnHover(
      user,
      screen.getByRole('menuitemcheckbox', { name: 'Comments' }),
      'Toggle comments',
    );
    await expectTooltipOnHover(
      user,
      screen.getByRole('menuitemradio', { name: 'Fit' }),
      'Fit to viewport',
    );
  });

  it('can close a controlled Material UI Tooltip when a submenu trigger opens', async () => {
    interface TooltipChildProps {
      onClickCapture?: React.MouseEventHandler<HTMLElement>;
    }

    // A wrapper used as a trigger must forward the trigger's props and ref to
    // its child, the way Material UI's own Tooltip does.
    const ClickClosingTooltip = React.forwardRef<
      HTMLElement,
      { title: string; children: React.ReactElement<TooltipChildProps> } & Record<string, any>
    >(function ClickClosingTooltip(props, ref) {
      const { title, children, ...forwarded } = props;
      const [open, setOpen] = React.useState(false);

      const child = React.cloneElement(children, {
        ...forwarded,
        ref,
        onClickCapture: (event: React.MouseEvent<HTMLElement>) => {
          setOpen(false);
          children.props.onClickCapture?.(event);
        },
      });

      return (
        <Tooltip
          title={title}
          describeChild
          enterDelay={0}
          leaveDelay={0}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
        >
          {child}
        </Tooltip>
      );
    });

    const { user } = render(
      <Menu2 open>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Menu2Submenu>
            <ClickClosingTooltip title="Open view settings">
              <Menu2SubmenuTrigger openOnHover={false}>View options</Menu2SubmenuTrigger>
            </ClickClosingTooltip>
            <Menu2SubmenuPopup>
              <Menu2Item>Comments</Menu2Item>
            </Menu2SubmenuPopup>
          </Menu2Submenu>
        </Menu2Popup>
      </Menu2>,
    );

    const submenuTrigger = screen.getByRole('menuitem', { name: 'View options' });

    await user.hover(submenuTrigger);
    expect(await screen.findByRole('tooltip')).to.have.text('Open view settings');

    await user.click(submenuTrigger);

    expect(await screen.findByRole('menuitem', { name: 'Comments' })).not.to.equal(null);
    await waitFor(() => {
      expect(screen.queryByRole('tooltip')).to.equal(null);
    });
  });

  it('supports Material UI Tooltip on disabled items through a non-disabled wrapper', async () => {
    const { user } = render(
      <Menu2 defaultOpen>
        <Menu2Trigger render={<Button disableRipple>Options</Button>} />
        <Menu2Popup>
          <Tooltip title="Unavailable while offline" describeChild enterDelay={0} leaveDelay={0}>
            <span data-testid="disabled-item-tooltip-target">
              <Menu2Item disabled>Import from Drive</Menu2Item>
            </span>
          </Tooltip>
        </Menu2Popup>
      </Menu2>,
    );

    expect(screen.getByRole('menuitem', { name: 'Import from Drive' })).to.have.attribute(
      'aria-disabled',
      'true',
    );
    await expectTooltipOnHover(
      user,
      screen.getByTestId('disabled-item-tooltip-target'),
      'Unavailable while offline',
    );
  });

  it('does not warn when a submenu trigger is disabled', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      const { user } = render(
        <Menu2>
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup>
            <Menu2Submenu>
              <Menu2SubmenuTrigger disabled>Add-ons unavailable</Menu2SubmenuTrigger>
              <Menu2SubmenuPopup>
                <Menu2Item>Marketplace</Menu2Item>
              </Menu2SubmenuPopup>
            </Menu2Submenu>
          </Menu2Popup>
        </Menu2>,
      );

      await user.click(screen.getByRole('button', { name: 'Options' }));

      const submenuTrigger = await screen.findByRole('menuitem', {
        name: 'Add-ons unavailable',
      });
      expect(submenuTrigger).to.have.attribute('aria-disabled', 'true');
      expect(
        warn.mock.calls.some(([message]) =>
          String(message).includes('A disabled element was detected on <Menu.SubmenuTrigger>'),
        ),
      ).to.equal(false);
    } finally {
      warn.mockRestore();
    }
  });

  // A menu popup scrolls, so an outset ring gets clipped. The item takes the
  // same inset ring as the classic MenuItem. `Mui-focusVisible` goes on by
  // hand: ButtonBase sets it from `:focus-visible`, a browser heuristic on the
  // input modality that no test event moves.
  it.skipIf(isJsdom())('insets the focus ring under theme.focusVisible', async () => {
    render(
      <ThemeProvider theme={createTheme({ focusVisible: true })}>
        <Menu2 defaultOpen modal={false}>
          <Menu2Popup anchor={document.body}>
            <Menu2Item>Alpha</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    const item = await screen.findByRole('menuitem', { name: 'Alpha' });
    const atRest = window.getComputedStyle(item);
    // The item turns the shared ring inward. A scrolling popup clips an outset
    // ring, so the sign is the whole point of the two variables.
    expect(atRest.getPropertyValue('--_focusVisible-offset').trim()).to.equal('-1');
    expect(atRest.getPropertyValue('--_focusVisible-behavior').trim()).to.equal('inset');

    item.classList.add(buttonBaseClasses.focusVisible);

    const ring = window.getComputedStyle(item);
    expect(ring.outlineStyle).to.equal('solid');
    expect(ring.outlineWidth).to.equal('2px');
    // A negative offset draws the ring inside the item.
    expect(ring.outlineOffset).to.equal('-2px');
  });

  // `theme.focusVisible` swaps the item focus background for an outline ring.
  // Menu2 must match the classic MenuItem: the ring replaces the background.
  it.skipIf(isJsdom())('drops the highlight background under theme.focusVisible', async () => {
    const { user } = render(
      <ThemeProvider theme={createTheme({ focusVisible: true })}>
        <MenuList>
          <ClassicMenuItem>Classic</ClassicMenuItem>
        </MenuList>
        <Menu2 modal={false}>
          <Menu2Trigger render={<Button disableRipple>Options</Button>} />
          <Menu2Popup>
            <Menu2Item>Alpha</Menu2Item>
            <Menu2Item>Beta</Menu2Item>
          </Menu2Popup>
        </Menu2>
      </ThemeProvider>,
    );

    // The classic reference: a keyboard-focused MenuItem under the ring theme.
    await user.tab();
    const classicItem = screen.getByRole('menuitem', { name: 'Classic' });
    expect(classicItem).to.have.class(menuItemClasses.focusVisible);
    const classicBackground = window.getComputedStyle(classicItem).backgroundColor;

    await user.tab();
    expect(screen.getByRole('button', { name: 'Options' })).toHaveFocus();

    // ArrowDown opens the successor menu and highlights the first item.
    await user.keyboard('{ArrowDown}');
    const item = await screen.findByRole('menuitem', { name: 'Alpha' });
    await waitFor(() => {
      expect(item).to.have.class(menu2ItemClasses.highlighted);
    });

    const atRest = window.getComputedStyle(
      screen.getByRole('menuitem', { name: 'Beta' }),
    ).backgroundColor;
    const highlighted = window.getComputedStyle(item);

    // The ring shows, and the 0.12 focus background does not.
    expect(highlighted.outlineWidth).to.equal('2px');
    expect(highlighted.backgroundColor).to.equal(atRest);
    // The classic MenuItem paints the same background in the same state.
    expect(highlighted.backgroundColor).to.equal(classicBackground);
  });
});
