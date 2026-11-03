import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen, supportsTouch } from '@mui/internal-test-utils';
import MenuItem, { menuItemClasses as classes } from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ButtonBase from '@mui/material/ButtonBase';
import ListItemText, { listItemTextClasses } from '@mui/material/ListItemText';
import describeConformance from '../../test/describeConformance';
import * as ripple from '../../test/ripple';

describe('<MenuItem />', () => {
  const { render } = createRenderer();

  describeConformance(<MenuItem />, () => ({
    classes,
    inheritComponent: ButtonBase,
    render: (node) => {
      const { container, ...other } = render(<MenuList>{node}</MenuList>);

      return { container: container.firstChild, ...other };
    },
    refInstanceof: window.HTMLLIElement,
    testComponentPropWith: 'a',
    muiName: 'MuiMenuItem',
    testVariantProps: { dense: true },
    skip: ['componentsProp'],
  }));

  it('should render a focusable menuitem', () => {
    render(
      <MenuList variant="menu">
        <MenuItem />
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.property('tabIndex', -1);
  });

  it('has a ripple when clicked', async () => {
    render(
      <MenuList>
        <MenuItem TouchRippleProps={{ classes: { rippleVisible: 'ripple-visible' } }} />
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitem');

    await ripple.startTouch(menuitem);

    expect(menuitem.querySelectorAll('.ripple-visible')).to.have.length(1);
  });

  it('should render with the selected class but not aria-selected when `selected`', () => {
    render(
      <MenuList>
        <MenuItem selected />
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.selected);
    expect(menuitem).not.to.have.attribute('aria-selected');
    expect(menuitem).not.to.have.attribute('aria-checked');
  });

  it('drives aria-checked from `selected` for `role="menuitemcheckbox"`', () => {
    const { rerender } = render(
      <MenuList>
        <MenuItem role="menuitemcheckbox" selected />
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitemcheckbox');

    expect(menuitem).to.have.attribute('aria-checked', 'true');
    expect(menuitem).not.to.have.attribute('aria-selected');

    rerender(
      <MenuList>
        <MenuItem role="menuitemcheckbox" selected={false} />
      </MenuList>,
    );

    expect(screen.getByRole('menuitemcheckbox')).to.have.attribute('aria-checked', 'false');
  });

  it('sets aria-checked="false" for a `menuitemcheckbox` when `selected` is omitted', () => {
    render(
      <MenuList>
        <MenuItem role="menuitemcheckbox" />
      </MenuList>,
    );

    expect(screen.getByRole('menuitemcheckbox')).to.have.attribute('aria-checked', 'false');
  });

  it('drives aria-checked from `selected` for `role="menuitemradio"`', () => {
    render(
      <MenuList>
        <MenuItem role="menuitemradio" selected />
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitemradio');

    expect(menuitem).to.have.attribute('aria-checked', 'true');
    expect(menuitem).not.to.have.attribute('aria-selected');
  });

  it('keeps `selected` presentational and omits aria-checked for non-checkable roles', () => {
    render(
      <MenuList>
        <MenuItem role="option" selected />
      </MenuList>,
    );
    const option = screen.getByRole('option');

    expect(option).to.have.class(classes.selected);
    expect(option).not.to.have.attribute('aria-checked');
  });

  it('can have a role of option', () => {
    render(
      <MenuList>
        <MenuItem role="option" aria-selected={false} />
      </MenuList>,
    );

    expect(screen.queryByRole('option')).not.to.equal(null);
  });

  it('does not pass classes.root to ButtonBase classes', () => {
    render(
      <MenuList>
        <MenuItem classes={{ root: 'my-root-class' }}>Item</MenuItem>
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitem');
    const classList = menuitem.className.split(' ');
    expect(classList.filter((c) => c === 'my-root-class')).to.have.length(1);
  });

  describe('event callbacks', () => {
    /**
     * @type {Array<keyof typeof fireEvent>}
     */
    const events = ['click', 'mouseDown', 'mouseEnter', 'mouseLeave', 'mouseUp', 'touchEnd'];

    events.forEach((eventName) => {
      it(`should fire ${eventName}`, async () => {
        const handlerName = `on${eventName[0].toUpperCase()}${eventName.slice(1)}`;
        const handler = spy();
        render(
          <MenuList>
            <MenuItem {...{ [handlerName]: handler }} />
          </MenuList>,
        );

        fireEvent[eventName](screen.getByRole('menuitem'));

        expect(handler.callCount).to.equal(1);

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {});
      });
    });

    it(`should fire focus, keydown, keyup and blur`, async () => {
      const handleFocus = spy();
      const handleKeyDown = spy();
      const handleKeyUp = spy();
      const handleBlur = spy();
      render(
        <MenuList>
          <MenuItem
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
          />
        </MenuList>,
      );
      const menuitem = screen.getByRole('menuitem');

      await act(async () => {
        menuitem.focus();
      });

      expect(handleFocus.callCount).to.equal(1);

      fireEvent.keyDown(menuitem);

      expect(handleKeyDown.callCount).to.equal(1);

      fireEvent.keyUp(menuitem);

      expect(handleKeyUp.callCount).to.equal(1);

      await act(async () => menuitem.blur());

      expect(handleKeyDown.callCount).to.equal(1);
    });

    // only run in supported browsers
    it.skipIf(!supportsTouch())('should fire onTouchStart', function touchStartTest() {
      const handleTouchStart = spy();
      render(
        <MenuList>
          <MenuItem onTouchStart={handleTouchStart} />
        </MenuList>,
      );
      const menuitem = screen.getByRole('menuitem');

      const touch = new Touch({ identifier: 0, target: menuitem, clientX: 0, clientY: 0 });
      fireEvent.touchStart(menuitem, { touches: [touch] });

      expect(handleTouchStart.callCount).to.equal(1);
    });
  });

  it('can be disabled', () => {
    render(
      <MenuList>
        <MenuItem disabled />
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.attribute('aria-disabled', 'true');
  });

  it('can be selected', () => {
    render(
      <MenuList>
        <MenuItem selected />
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.selected);
  });

  it('prop: disableGutters', () => {
    const view = render(
      <MenuList>
        <MenuItem />
      </MenuList>,
    );
    const menuitem = screen.getByRole('menuitem');

    expect(menuitem).to.have.class(classes.gutters);

    view.rerender(
      <MenuList>
        <MenuItem disableGutters />
      </MenuList>,
    );

    expect(menuitem).not.to.have.class(classes.gutters);
  });

  describe('prop: nativeButton', () => {
    it('preserves role="menuitem" over pseudo-button role', () => {
      render(
        <MenuList>
          <MenuItem />
        </MenuList>,
      );

      const menuitem = screen.getByRole('menuitem');
      expect(menuitem).to.have.tagName('LI');
      expect(menuitem).not.to.have.attribute('role', 'button');
    });

    it('preserves custom tabIndex over pseudo-button tabIndex', () => {
      render(
        <MenuList variant="menu">
          <MenuItem />
        </MenuList>,
      );

      const menuitem = screen.getByRole('menuitem');
      expect(menuitem).to.have.property('tabIndex', -1);
    });
  });

  describe('prop: dense', () => {
    it('applies dense styles to ListItemText children', () => {
      render(
        <MenuList>
          <MenuItem dense>
            <ListItemText primary="Dense item" />
          </MenuItem>
        </MenuList>,
      );

      expect(screen.getByText('Dense item').parentElement).to.have.class(listItemTextClasses.dense);
    });
  });
});
