import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as React from 'react';
import { spy, stub } from 'sinon';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import describeConformance from '../../test/describeConformance';

function setStyleWidthForJsdomOrBrowser(style, width) {
  style.width = '';
  style.width = 'calc(100% + 0px)';
  if (style.width !== 'calc(100% + 0px)') {
    // For jsdom
    Object.defineProperty(style, 'width', { writable: true, value: '' });
  }
  style.width = width;
}

describe('<MenuList />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuList />, () => ({
    render,
    classes: {},
    inheritComponent: List,
    refInstanceof: window.HTMLUListElement,
    muiName: 'MuiMenuList',
    skip: ['componentProp', 'themeStyleOverrides', 'themeVariants'],
  }));

  it('should render a list with role menu and tabIndex -1', () => {
    render(
      <MenuList>
        <MenuItem>one</MenuItem>
        <MenuItem>two</MenuItem>
      </MenuList>,
    );

    expect(screen.getByRole('menu')).to.have.attribute('tabIndex', '-1');
  });

  describe('prop: children', () => {
    it('should support null children', () => {
      render(
        <MenuList>
          <MenuItem>one</MenuItem>
          <MenuItem>two</MenuItem>
          {null}
        </MenuList>,
      );

      expect(screen.getAllByRole('menuitem')).to.have.length(2);
    });

    it('supports MenuItems wrapped in a Fragment', async () => {
      const { user } = render(
        <MenuList>
          <React.Fragment>
            <MenuItem>one</MenuItem>
            <MenuItem>two</MenuItem>
          </React.Fragment>
        </MenuList>,
      );

      const itemElements = screen.getAllByRole('menuitem');

      expect(itemElements[0]).to.have.attribute('tabIndex', '0');

      await user.tab();
      expect(itemElements[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(itemElements[1]).toHaveFocus();
    });

    it('should not add tabIndex to presentation elements like Divider when all Menu Items are disabled', () => {
      render(
        <MenuList>
          <MenuItem>one</MenuItem>
          <Divider />
          <MenuItem>two</MenuItem>
        </MenuList>,
      );

      expect(screen.getByRole('separator')).not.to.have.attribute('tabIndex');
    });

    it('should not add tabIndex to wrapped Divider components', () => {
      const BaseDivider = React.forwardRef(function BaseDivider(props, ref) {
        return <Divider ref={ref} {...props} />;
      });

      render(
        <MenuList>
          <MenuItem>one</MenuItem>
          <BaseDivider />
          <MenuItem>two</MenuItem>
        </MenuList>,
      );

      expect(screen.getByRole('separator')).not.to.have.attribute('tabIndex');
    });
  });

  describe('actions: adjustStyleForScrollbar', () => {
    const defaultScrollbarSize = 15;
    const expectedPadding = `${defaultScrollbarSize}px`;
    // Headless Chromium runs with `--hide-scrollbars`, so the real scrollbar width is 0 there.
    // Force a width through `window.innerWidth` to keep the assertions environment independent.
    let scrollbarSize;
    let innerWidthStub;

    beforeEach(() => {
      scrollbarSize = defaultScrollbarSize;
      innerWidthStub = stub(window, 'innerWidth').get(
        () => document.documentElement.clientWidth + scrollbarSize,
      );
    });

    afterEach(() => {
      innerWidthStub.restore();
    });

    it('should not adjust style when container element height is greater', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 20 },
        { direction: 'ltr' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');
    });

    it('should adjust style when container element height is less', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      stub(list, 'clientHeight').get(() => 11);

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'ltr' },
      );

      expect(list.style).to.have.property('paddingRight', expectedPadding);
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', `calc(100% + ${expectedPadding})`);
    });

    it('should adjust paddingLeft when direction=rtl', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      stub(list, 'clientHeight').get(() => 11);

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', expectedPadding);
      expect(list.style).to.have.property('width', `calc(100% + ${expectedPadding})`);
    });

    it('should add scrollbar width to existing padding-right rather than replacing it', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      // Use Object.defineProperty so the stub is reliable in jsdom (clientHeight defaults to 0).
      Object.defineProperty(list, 'clientHeight', { value: 11, configurable: true });

      // Simulate padding-right applied via a theme/CSS override (e.g. 8px)
      list.style.paddingRight = '8px';

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'ltr' },
      );

      // The scrollbar width should be added on top of the existing 8px, not replace it
      expect(list.style).to.have.property('paddingRight', `${8 + defaultScrollbarSize}px`);
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', `calc(100% + ${expectedPadding})`);
    });

    it('should add scrollbar width to existing padding-left rather than replacing it (RTL)', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      Object.defineProperty(list, 'clientHeight', { value: 11, configurable: true });

      // Simulate padding-left applied via a theme/CSS override (e.g. 8px)
      list.style.paddingLeft = '8px';

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', `${8 + defaultScrollbarSize}px`);
      expect(list.style).to.have.property('width', `calc(100% + ${expectedPadding})`);
    });

    it('should not adjust styles when the scrollbar has zero width (overlay scrollbars)', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '');
      Object.defineProperty(list, 'clientHeight', { value: 11, configurable: true });

      // Overlay scrollbars (macOS, Windows 11) take up no space
      scrollbarSize = 0;

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'ltr' },
      );

      // There is no scrollbar width to compensate for, so inline styles must not be
      // written at all — writing them would override theme/CSS padding.
      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '');
    });

    it('should not adjust styles when width already specified', () => {
      const menuListActionsRef = React.createRef();
      const listRef = React.createRef();
      render(<MenuList ref={listRef} actions={menuListActionsRef} />);
      const list = listRef.current;
      setStyleWidthForJsdomOrBrowser(list.style, '10px');
      Object.defineProperty(list, 'clientHeight', { value: 11 });

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '10px');

      menuListActionsRef.current.adjustStyleForScrollbar(
        { clientHeight: 10 },
        { direction: 'rtl' },
      );

      expect(list.style).to.have.property('paddingRight', '');
      expect(list.style).to.have.property('paddingLeft', '');
      expect(list.style).to.have.property('width', '10px');
    });
  });

  describe('keyboard navigation', () => {
    it('does not focus the list container when autoFocusItem is true', () => {
      const handleFocus = spy();

      render(
        <MenuList autoFocus autoFocusItem onFocus={handleFocus}>
          <MenuItem>one</MenuItem>
        </MenuList>,
      );

      const list = screen.getByRole('menu');
      expect(screen.getByRole('menuitem')).toHaveFocus();
      expect(handleFocus.args.some(([event]) => event.target === list)).to.equal(false);
    });

    it('should move focus to the next item when pressing the right arrow key', async () => {
      const { user } = render(
        <MenuList>
          <MenuItem>one</MenuItem>
          <Divider />
          <MenuItem disabled>two</MenuItem>
          <MenuItem>three</MenuItem>
        </MenuList>,
      );

      const itemElements = screen.getAllByRole('menuitem');

      await user.tab();
      expect(itemElements[0]).toHaveFocus();
      expect(itemElements[0]).to.have.attribute('tabIndex', '0');
      expect(itemElements[1]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowDown}');
      expect(itemElements[2]).toHaveFocus();
      expect(itemElements[2]).to.have.attribute('tabIndex', '0');
      expect(itemElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowDown}');
      expect(itemElements[0]).toHaveFocus();
      expect(itemElements[0]).to.have.attribute('tabIndex', '0');
      expect(itemElements[1]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowUp}');
      expect(itemElements[2]).toHaveFocus();
      expect(itemElements[2]).to.have.attribute('tabIndex', '0');
      expect(itemElements[0]).to.have.attribute('tabIndex', '-1');

      await user.keyboard('{ArrowUp}');
      expect(itemElements[0]).toHaveFocus();
      expect(itemElements[0]).to.have.attribute('tabIndex', '0');
      expect(itemElements[1]).to.have.attribute('tabIndex', '-1');
    });

    it('should add tabindex="0" to the focused item', async () => {
      const { user } = render(
        <MenuList>
          <MenuItem>one</MenuItem>
          <Divider />
          <MenuItem>two</MenuItem>
        </MenuList>,
      );

      const tabElements = screen.getAllByRole('menuitem');

      fireEvent.focus(tabElements[1]);
      expect(tabElements[1]).to.have.attribute('tabIndex', '0');
      expect(tabElements[0]).to.have.attribute('tabIndex', '-1');

      await user.click(tabElements[0]);
      expect(tabElements[0]).to.have.attribute('tabIndex', '0');
      expect(tabElements[1]).to.have.attribute('tabIndex', '-1');
    });

    it('should compose the onFocus and onKeyDown props', async () => {
      const onFocusSpy = spy();
      const onKeyDownSpy = spy();
      const { user } = render(
        <MenuList onFocus={onFocusSpy} onKeyDown={onKeyDownSpy}>
          <MenuItem>one</MenuItem>
          <Divider />
          <MenuItem>two</MenuItem>
        </MenuList>,
      );

      await user.tab();
      expect(screen.getByRole('menuitem', { name: 'one' })).toHaveFocus();

      expect(onFocusSpy.callCount).to.equal(1);

      await user.keyboard('{ArrowDown}');
      expect(screen.getByRole('menuitem', { name: 'two' })).toHaveFocus();

      expect(onKeyDownSpy.callCount).to.equal(1);

      await user.keyboard('{ArrowUp}');
      expect(screen.getByRole('menuitem', { name: 'one' })).toHaveFocus();

      expect(onKeyDownSpy.callCount).to.equal(2);
    });

    it('should not hang on the up arrow key when focus is on a non-item element and no item is focusable', async () => {
      const { user } = render(
        <MenuList>
          <li>
            <input aria-label="search" />
          </li>
          <MenuItem disabled>No results</MenuItem>
        </MenuList>,
      );

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.keyboard('{ArrowUp}');

      expect(input).toHaveFocus();
    });
  });
});
