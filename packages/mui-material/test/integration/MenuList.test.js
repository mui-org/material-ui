import { describe, it, expect, beforeAll } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import {
  act,
  createRenderer,
  fireEvent,
  screen,
  programmaticFocusTriggersFocusVisible,
  isJsdom,
} from '@mui/internal-test-utils';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

describe('<MenuList> integration', () => {
  const { clock, render } = createRenderer();

  it('the MenuItems have the `menuitem` role', () => {
    render(
      <MenuList>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem>Menu Item 3</MenuItem>
      </MenuList>,
    );

    expect(screen.getAllByRole('menuitem')).to.have.length(3);
  });

  describe('keyboard controls and tabIndex manipulation', () => {
    it('the specified item should be in tab order while the rest is focusable', () => {
      render(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('focuses the specified item on mount', () => {
      render(
        <MenuList autoFocusItem>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
    });

    it('should select the last item when pressing up if the first item is focused', () => {
      render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');
      fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', 0);
    });

    it('should select the second item when pressing down if the first item is selected', () => {
      render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');
      fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should still be focused and focusable when going back and forth', () => {
      render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');
      fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
      fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should leave tabIndex on the first item after blur', () => {
      const handleBlur = spy();

      render(
        <MenuList autoFocusItem onBlur={handleBlur}>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      expect(document.activeElement).not.to.equal(null);

      act(() => {
        document.activeElement.blur();
      });

      const menuitems = screen.getAllByRole('menuitem');
      expect(handleBlur.callCount).to.equal(1);
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
      expect(menuitems[0]).not.toHaveFocus();
      expect(menuitems[1]).not.toHaveFocus();
      expect(menuitems[2]).not.toHaveFocus();
    });

    it('can imperatively focus the first item', () => {
      render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      act(() => {
        menuitems[0].focus();
      });

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('down arrow can go to all items while changing tabIndex', () => {
      render(
        <MenuList autoFocusItem>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);

      fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', 0);
    });

    describe('when a modifier key is pressed', () => {
      it('should not move the focus', () => {
        render(
          <MenuList autoFocusItem>
            <MenuItem selected>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
          </MenuList>,
        );

        const menuitems = screen.getAllByRole('menuitem');
        fireEvent.keyDown(menuitems[0], { key: 'ArrowDown', ctrlKey: true });
        expect(menuitems[0]).toHaveFocus();
        expect(menuitems[1]).not.toHaveFocus();

        fireEvent.keyDown(menuitems[0], { key: 'ArrowDown', altKey: true });
        expect(menuitems[0]).toHaveFocus();
        expect(menuitems[1]).not.toHaveFocus();

        fireEvent.keyDown(menuitems[0], { key: 'ArrowDown', metaKey: true });
        expect(menuitems[0]).toHaveFocus();
        expect(menuitems[1]).not.toHaveFocus();
      });

      it('should call the onKeyDown and not prevent default on the event', () => {
        const onKeyDown = spy();

        render(
          <MenuList autoFocusItem onKeyDown={onKeyDown}>
            <MenuItem selected>Menu Item 1</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
            <MenuItem>Menu Item 3</MenuItem>
          </MenuList>,
        );

        const menuitems = screen.getAllByRole('menuitem');
        fireEvent.keyDown(menuitems[0], { key: 'ArrowDown', ctrlKey: true });

        expect(onKeyDown.callCount).to.equal(1);
        expect(onKeyDown.firstCall.args[0]).to.have.property('ctrlKey', true);
        expect(onKeyDown.firstCall.args[0]).to.have.property('defaultPrevented', false);
      });
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item', () => {
    it('should auto focus the second item', () => {
      render(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem autoFocus selected>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should focus next item on ArrowDown', () => {
      render(
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem autoFocus selected>
            Menu Item 2
          </MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', 0);
    });
  });

  describe('keyboard controls and tabIndex manipulation - preselected item, no item autoFocus', () => {
    it('should focus the first item if no item is focused when pressing ArrowDown', () => {
      render(
        <MenuList autoFocus>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = screen.getAllByRole('menuitem');

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('should focus the third item if no item is focused when pressing ArrowUp', () => {
      render(
        <MenuList autoFocus>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected>Menu Item 2</MenuItem>
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>,
      );
      const menuitems = screen.getAllByRole('menuitem');

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowUp' });

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', 0);
    });
  });

  it('initial focus is controlled by setting the selected prop when `autoFocusItem` is enabled', () => {
    render(
      <MenuList autoFocusItem>
        <MenuItem>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem selected>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </MenuList>,
    );

    const menuitems = screen.getAllByRole('menuitem');

    expect(menuitems[2]).toHaveFocus();
    expect(menuitems[0]).to.have.property('tabIndex', -1);
    expect(menuitems[1]).to.have.property('tabIndex', -1);
    expect(menuitems[2]).to.have.property('tabIndex', 0);
    expect(menuitems[3]).to.have.property('tabIndex', -1);
  });

  it('does not steal focus when conditional items are added after mount', async () => {
    function ConditionalMenuList(props) {
      const { showPrependedItem = false } = props;

      return (
        <MenuList>
          {showPrependedItem ? <MenuItem>Prepended item</MenuItem> : null}
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </MenuList>
      );
    }

    const { setProps, user } = render(<ConditionalMenuList showPrependedItem={false} />);

    const initialItems = screen.getAllByRole('menuitem');
    await user.click(initialItems[1]);

    setProps({ showPrependedItem: true });

    const updatedItems = screen.getAllByRole('menuitem');
    expect(updatedItems[2]).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(updatedItems[1]).toHaveFocus();
  });

  it('supports keyboard navigation with wrapped MenuItem components', async () => {
    const WrappedMenuItem = React.forwardRef(function WrappedMenuItem(props, ref) {
      return <MenuItem ref={ref} {...props} />;
    });

    const { user } = render(
      <MenuList autoFocusItem>
        <WrappedMenuItem>Item 1</WrappedMenuItem>
        <WrappedMenuItem>Item 2</WrappedMenuItem>
        <WrappedMenuItem>Item 3</WrappedMenuItem>
      </MenuList>,
    );

    const menuitems = screen.getAllByRole('menuitem');
    expect(menuitems[0]).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(menuitems[1]).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(menuitems[0]).toHaveFocus();
  });

  it('handles removal of the focused item gracefully', async () => {
    function ConditionalMenuList(props) {
      const { showSecondItem = true } = props;

      return (
        <MenuList>
          <MenuItem>Menu Item 1</MenuItem>
          {showSecondItem ? <MenuItem>Menu Item 2</MenuItem> : null}
          <MenuItem>Menu Item 3</MenuItem>
        </MenuList>
      );
    }

    const { setProps, user } = render(<ConditionalMenuList />);

    const initialItems = screen.getAllByRole('menuitem');
    await user.click(initialItems[1]);
    expect(initialItems[1]).toHaveFocus();

    setProps({ showSecondItem: false });

    const menu = screen.getByRole('menu');
    const updatedItems = screen.getAllByRole('menuitem');
    expect(updatedItems).to.have.length(2);

    act(() => {
      menu.focus();
    });

    await user.keyboard('{ArrowDown}');
    expect(updatedItems[0]).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(updatedItems[1]).toHaveFocus();
  });

  describe('MenuList with disableListWrap', () => {
    it('should not wrap focus with ArrowUp from first', () => {
      render(
        <MenuList autoFocusItem disableListWrap>
          <MenuItem selected>Menu Item 1</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
    });

    it('should not wrap focus with ArrowDown from last', () => {
      render(
        <MenuList autoFocusItem disableListWrap>
          <MenuItem>Menu Item 1</MenuItem>
          <MenuItem selected>Menu Item 2</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
    });
  });

  it('should skip divider and disabled menu item', () => {
    render(
      <MenuList autoFocus>
        <MenuItem>Menu Item 1</MenuItem>
        <Divider component="li" />
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem>Menu Item 4</MenuItem>
      </MenuList>,
    );
    const menuitems = screen.getAllByRole('menuitem');

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(menuitems[0]).toHaveFocus();
    fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[3]).toHaveFocus();
    fireEvent.keyDown(menuitems[3], { key: 'ArrowDown' });
    expect(menuitems[0]).toHaveFocus();

    // and ArrowUp again
    fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });
    expect(menuitems[3]).toHaveFocus();
    fireEvent.keyDown(menuitems[3], { key: 'ArrowUp' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[0]).toHaveFocus();
    fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });
    expect(menuitems[3]).toHaveFocus();
  });

  it('should stay on a single item if it is the only focusable one', () => {
    render(
      <MenuList autoFocus>
        <MenuItem disabled>Menu Item 1</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem disabled>Menu Item 4</MenuItem>
      </MenuList>,
    );
    const menuitems = screen.getAllByRole('menuitem');

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[1]).toHaveFocus();
  });

  it('should keep focus on the menu if all items are disabled', () => {
    render(
      <MenuList autoFocus>
        <MenuItem disabled>Menu Item 1</MenuItem>
        <MenuItem disabled>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem disabled>Menu Item 4</MenuItem>
      </MenuList>,
    );

    const menu = screen.getByRole('menu');

    fireEvent.keyDown(menu, { key: 'Home' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'End' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(menu).toHaveFocus();
  });

  it('should not infinite loop on keyboard navigation when there are no children', () => {
    render(<MenuList autoFocus />);

    const menu = screen.getByRole('menu');

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'Home' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'End' });
    expect(menu).toHaveFocus();
  });

  it('should not infinite loop on keyboard navigation when children are removed', () => {
    function DynamicMenuList() {
      const [items, setItems] = React.useState(['Item 1', 'Item 2']);

      return (
        <React.Fragment>
          <button data-testid="clear" onClick={() => setItems([])}>
            Clear
          </button>
          <MenuList autoFocus>
            {items.map((item) => (
              <MenuItem key={item}>{item}</MenuItem>
            ))}
          </MenuList>
        </React.Fragment>
      );
    }

    render(<DynamicMenuList />);

    const menu = screen.getByRole('menu');
    const menuitems = screen.getAllByRole('menuitem');

    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menuitems[0]).toHaveFocus();

    // Remove all children
    fireEvent.click(screen.getByTestId('clear'));

    act(() => {
      menu.focus();
    });

    // Should not hang
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(menu).toHaveFocus();
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    expect(menu).toHaveFocus();
  });

  it('should allow focus on disabled items when disabledItemsFocusable=true', () => {
    render(
      <MenuList autoFocus disabledItemsFocusable>
        <MenuItem disabled>Menu Item 1</MenuItem>
        <MenuItem disabled>Menu Item 2</MenuItem>
        <MenuItem disabled>Menu Item 3</MenuItem>
        <MenuItem disabled>Menu Item 4</MenuItem>
      </MenuList>,
    );

    const menuitems = screen.getAllByRole('menuitem');

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Home' });
    expect(menuitems[0]).toHaveFocus();
    fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();
    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[2]).toHaveFocus();
    fireEvent.keyDown(menuitems[2], { key: 'End' });
    expect(menuitems[3]).toHaveFocus();
    fireEvent.keyDown(menuitems[3], { key: 'ArrowUp' });
    expect(menuitems[2]).toHaveFocus();
  });

  describe('MenuList text-based keyboard controls', () => {
    let innerTextSupported;

    beforeAll(() => {
      const element = document.createElement('div');
      element.appendChild(document.createTextNode('Hello, Dave!'));
      innerTextSupported = element.innerText !== undefined;
    });

    it('selects the first item starting with the character', () => {
      render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>Berizona</MenuItem>
        </MenuList>,
      );

      const menu = screen.getByRole('menu');
      act(() => {
        menu.focus();
      });

      fireEvent.keyDown(menu, { key: 'a' });

      expect(screen.getByText('Arizona')).toHaveFocus();
    });

    it('should cycle through items when repeating initial character', () => {
      render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>aardvark</MenuItem>
          <MenuItem>Colorado</MenuItem>
          <MenuItem>Argentina</MenuItem>
        </MenuList>,
      );

      const menuitems = screen.getAllByRole('menuitem');
      act(() => {
        menuitems[0].focus();
      });

      fireEvent.keyDown(screen.getByText('Arizona'), { key: 'a' });
      expect(screen.getByText('aardvark')).toHaveFocus();

      fireEvent.keyDown(screen.getByText('aardvark'), { key: 'a' });
      expect(screen.getByText('Argentina')).toHaveFocus();

      fireEvent.keyDown(screen.getByText('Argentina'), { key: 'r' });
      expect(screen.getByText('aardvark')).toHaveFocus();
    });

    it('selects the next item starting with the typed character', () => {
      render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>Arcansas</MenuItem>
        </MenuList>,
      );

      act(() => {
        screen.getByText('Arizona').focus();
      });

      fireEvent.keyDown(screen.getByText('Arizona'), { key: 'a' });

      expect(screen.getByText('Arcansas')).toHaveFocus();
    });

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())('should not get focusVisible class on click', async function test() {
      const { user } = render(
        <MenuList>
          <MenuItem focusVisibleClassName="focus-visible">Arizona</MenuItem>
        </MenuList>,
      );

      const menuitem = screen.getByText('Arizona');

      await user.click(menuitem);

      expect(menuitem).toHaveFocus();
      if (programmaticFocusTriggersFocusVisible()) {
        expect(menuitem).to.have.class('focus-visible');
      } else {
        expect(menuitem).not.to.have.class('focus-visible');
      }
    });

    it('should not move focus when no match', () => {
      render(
        <MenuList>
          <MenuItem autoFocus>Arizona</MenuItem>
          <MenuItem>Berizona</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(screen.getByText('Arizona'), { key: 'c' });

      expect(screen.getByText('Arizona')).toHaveFocus();
    });

    it('should not move focus when keys match current focus', () => {
      render(
        <MenuList>
          <MenuItem autoFocus>Arizona</MenuItem>
          <MenuItem>Berizona</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(screen.getByText('Arizona'), { key: 'A' });

      expect(screen.getByText('Arizona')).toHaveFocus();

      fireEvent.keyDown(screen.getByText('Arizona'), { key: 'r' });

      expect(screen.getByText('Arizona')).toHaveFocus();
    });

    it("should not move focus if focus starts on descendant and the key doesn't match", () => {
      render(
        <MenuList>
          <MenuItem>Arizona</MenuItem>
          <MenuItem>
            <button type="button">Focusable Descendant</button>
          </MenuItem>
        </MenuList>,
      );

      const button = screen.getByText('Focusable Descendant');
      act(() => {
        button.focus();
      });

      fireEvent.keyDown(button, { key: 'z' });

      expect(button).toHaveFocus();
    });

    it('matches rapidly typed text', () => {
      render(
        <MenuList autoFocus>
          <MenuItem>War</MenuItem>
          <MenuItem>Worm</MenuItem>
          <MenuItem>Ordinary</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'W' });
      fireEvent.keyDown(screen.getByText('War'), { key: 'o' });

      expect(screen.getByText('Worm')).toHaveFocus();
    });

    describe('time', () => {
      clock.withFakeTimers();

      it('should reset the character buffer after 500ms', () => {
        render(
          <MenuList autoFocus>
            <MenuItem>Worm</MenuItem>
            <MenuItem>Ordinary</MenuItem>
          </MenuList>,
        );

        fireEvent.keyDown(screen.getByRole('menu'), { key: 'W' });
        clock.tick(501);
        fireEvent.keyDown(screen.getByText('Worm'), { key: 'o' });
        expect(screen.getByText('Ordinary')).toHaveFocus();
      });
    });

    // Will only be executed in browser tests, since jsdom doesn't support innerText
    it.skipIf(!innerTextSupported)('should match ignoring hidden text', function testHiddenText() {
      render(
        <MenuList autoFocus>
          <MenuItem>
            W<span style={{ display: 'none' }}>Should not block type focus</span>orm
          </MenuItem>
          <MenuItem>Ordinary</MenuItem>
        </MenuList>,
      );

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'W' });
      fireEvent.keyDown(screen.getByText('Worm'), { key: 'o' });

      expect(screen.getByText('Worm')).toHaveFocus();
    });
  });
});
