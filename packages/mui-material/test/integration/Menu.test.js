import { describe, it, expect } from 'vitest';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  act,
  createRenderer,
  fireEvent,
  isJsdom,
  programmaticFocusTriggersFocusVisible,
  screen,
} from '@mui/internal-test-utils';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
];

function ButtonMenu(props) {
  const { selectedIndex: selectedIndexProp, ...other } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(selectedIndexProp || null);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-controls="lock-menu"
        aria-label="open menu"
        disableRipple
        onClick={handleClickListItem}
      >
        {`selectedIndex: ${selectedIndex}, open: ${open}`}
      </Button>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        transitionDuration={0}
        slotProps={{ backdrop: { 'data-testid': 'Backdrop' } }}
        {...other}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disableRipple
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

ButtonMenu.propTypes = { selectedIndex: PropTypes.number };

function FocusVisibleButtonMenu(props) {
  const { selectedIndex: selectedIndexProp, ...other } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(selectedIndexProp || null);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button
        aria-haspopup="true"
        aria-controls="focus-visible-menu"
        aria-label="open focus visible menu"
        disableRipple
        onClick={handleClickListItem}
      >
        {`selectedIndex: ${selectedIndex}, open: ${open}`}
      </Button>
      <Menu
        id="focus-visible-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        transitionDuration={0}
        {...other}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disableRipple
            focusVisibleClassName="focus-visible"
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

FocusVisibleButtonMenu.propTypes = { selectedIndex: PropTypes.number };

const NextLinkLike = React.forwardRef(function NextLinkLike(props, ref) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a ref={ref} {...props} />
  );
});

function LinkMenu(props) {
  const { items } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return (
    <div>
      <Button aria-label="open link menu" onClick={(event) => setAnchorEl(event.currentTarget)}>
        Open link menu
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        transitionDuration={0}
      >
        {items.map((item) => {
          const { label, ...other } = item;

          return (
            <li key={label} role="none">
              <MenuItem {...other}>{label}</MenuItem>
            </li>
          );
        })}
      </Menu>
    </div>
  );
}

describe('<Menu /> integration', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });
  const { render: renderRealTime } = createRenderer();

  it('is part of the DOM by default but hidden', () => {
    render(<ButtonMenu />);

    expect(screen.getByRole('menu', { hidden: true })).toBeInaccessible();
  });

  it('does not gain any focus when mounted', () => {
    render(<ButtonMenu />);

    expect(screen.getByRole('menu', { hidden: true })).not.to.contain(document.activeElement);
  });

  it('should focus the first item on open', async () => {
    render(<ButtonMenu />);

    const button = screen.getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });

    expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('changes focus according to keyboard navigation', async () => {
    render(<ButtonMenu />);

    const button = screen.getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });
    const menuitems = screen.getAllByRole('menuitem');

    fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();

    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[0]).toHaveFocus();

    fireEvent.keyDown(menuitems[0], { key: 'ArrowUp' });
    expect(menuitems[2]).toHaveFocus();

    fireEvent.keyDown(menuitems[2], { key: 'Home' });
    expect(menuitems[0]).toHaveFocus();

    fireEvent.keyDown(menuitems[0], { key: 'End' });
    expect(menuitems[2]).toHaveFocus();

    fireEvent.keyDown(menuitems[2], { key: 'ArrowRight' });
    expect(menuitems[2], 'no change on unassociated keys').toHaveFocus();
  });

  it('supports keyboard navigation after opening with click only', async () => {
    render(<ButtonMenu />);

    await act(async () => {
      screen.getByRole('button', { name: 'open menu' }).click();
    });

    const menuitems = screen.getAllByRole('menuitem');
    expect(menuitems[0]).toHaveFocus();

    fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();

    fireEvent.keyDown(menuitems[1], { key: 'ArrowUp' });
    expect(menuitems[0]).toHaveFocus();
  });

  it('focuses the selected item when opening', async () => {
    render(<ButtonMenu selectedIndex={2} />);

    const button = screen.getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });

    expect(screen.getAllByRole('menuitem')[2]).toHaveFocus();
  });

  it.skipIf(isJsdom())(
    'applies focusVisible styling to the initial focused item in selectedMenu mode',
    async function test() {
      render(<FocusVisibleButtonMenu />);

      const button = screen.getByRole('button', { name: 'open focus visible menu' });
      await act(async () => {
        button.focus();
        button.click();
      });

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[0]).toHaveFocus();
      if (programmaticFocusTriggersFocusVisible()) {
        expect(menuitems[0]).to.have.class('focus-visible');
      } else {
        expect(menuitems[0]).not.to.have.class('focus-visible');
      }
    },
  );

  it.skipIf(isJsdom())(
    'does not apply focusVisible styling to the initial focused item in menu mode when another item is selected',
    async function test() {
      render(<FocusVisibleButtonMenu selectedIndex={2} variant="menu" />);

      const button = screen.getByRole('button', { name: 'open focus visible menu' });
      await act(async () => {
        button.focus();
        button.click();
      });

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).not.to.have.class('focus-visible');
      expect(menuitems[2]).not.toHaveFocus();
    },
  );

  it('closes the menu when a menu item is clicked', async () => {
    render(<ButtonMenu />);

    const button = screen.getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });

    const menuitem = screen.getByRole('menuitem', { name: options[0] });
    await act(async () => {
      menuitem.click();
    });
    clock.tick(0);

    expect(screen.getByRole('menu', { hidden: true })).toBeInaccessible();
    screen.getByText('selectedIndex: 0, open: false');
  });

  it('closes the menu when Enter activates a menu item', async () => {
    render(<ButtonMenu />);

    const button = screen.getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });

    const menuitem = screen.getByRole('menuitem', { name: options[0] });
    expect(menuitem).toHaveFocus();

    // eslint-disable-next-line testing-library/no-unnecessary-act -- ButtonBase's keyboard activation schedules ripple updates that must be flushed inside the same act.
    act(() => {
      fireEvent.keyDown(menuitem, { key: 'Enter' });
      clock.tick(0);
    });

    expect(screen.getByRole('menu', { hidden: true })).toBeInaccessible();
    screen.getByText('selectedIndex: 0, open: false');
  });

  it('closes the menu when Space activates a menu item', async () => {
    render(<ButtonMenu />);

    const button = screen.getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });

    const menuitem = screen.getByRole('menuitem', { name: options[0] });
    expect(menuitem).toHaveFocus();

    // eslint-disable-next-line testing-library/no-unnecessary-act -- ButtonBase's keyboard activation schedules ripple updates that must be flushed inside the same act.
    act(() => {
      fireEvent.keyDown(menuitem, { key: ' ' });
      fireEvent.keyUp(menuitem, { key: ' ' });
      clock.tick(0);
    });

    expect(screen.getByRole('menu', { hidden: true })).toBeInaccessible();
    screen.getByText('selectedIndex: 0, open: false');
  });

  describe('Menu variant differences', () => {
    function OpenMenu(props) {
      return <Menu anchorEl={document.body} open {...props} />;
    }

    it('[variant=menu] will focus the first item if nothing is selected', () => {
      render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('[variant=selectedMenu] will focus the first item if nothing is selected', () => {
      render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </OpenMenu>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', 0);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    // no case for variant=selectedMenu
    it('[variant=menu] prioritizes `autoFocus` on `MenuItem`', () => {
      render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem />
          <MenuItem autoFocus />
        </OpenMenu>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[2]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('[variant=menu] ignores `selected` on `MenuItem`', () => {
      render(
        <OpenMenu variant="menu">
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[0]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', -1);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('[variant=selectedMenu] focuses the `selected` `MenuItem`', () => {
      render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('[variant=selectedMenu] allows overriding `tabIndex` on `MenuItem`', () => {
      render(
        <OpenMenu variant="selectedMenu">
          <MenuItem />
          <MenuItem selected tabIndex={2} />
          <MenuItem />
        </OpenMenu>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 2);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    // falling back to the menu immediately so that we don't have to come up
    // with custom fallbacks (for example what happens if the first item is also selected)
    // it's debatable whether disabled items should still be focusable
    it('[variant=selectedMenu] focuses the first non-disabled item if the selected menuitem is disabled', () => {
      render(
        <OpenMenu variant="selectedMenu">
          <MenuItem disabled />
          <MenuItem />
          <MenuItem disabled selected />
          <MenuItem />
        </OpenMenu>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
      expect(menuitems[3]).to.have.property('tabIndex', -1);
    });

    // no case for menu
    // TODO: should this even change focus? I would guess that autoFocus={false}
    // means "developer: I take care of focus don't steal it from me"
    it('[variant=selectedMenu] focuses no part of the menu when `autoFocus={false}`', () => {
      render(
        <OpenMenu
          autoFocus={false}
          variant="selectedMenu"
          slotProps={{ paper: { 'data-testid': 'Paper' } }}
        >
          <MenuItem />
          <MenuItem selected />
          <MenuItem />
        </OpenMenu>,
      );

      const menuitems = screen.getAllByRole('menuitem');

      expect(screen.getByTestId('Paper')).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });

    it('[variant=selectedMenu] focuses nothing when it is closed and mounted', () => {
      render(<ButtonMenu selectedIndex={1} variant="selectedMenu" />);

      expect(screen.getByRole('menu', { hidden: true })).not.to.contain(document.activeElement);
    });

    it('[variant=selectedMenu] focuses the selected item when opening when it was already mounted', async () => {
      render(<ButtonMenu selectedIndex={1} variant="selectedMenu" />);

      await act(async () => {
        screen.getByRole('button').focus();
        screen.getByRole('button').click();
      });
      const menuitems = screen.getAllByRole('menuitem');

      expect(menuitems[1]).toHaveFocus();
      expect(menuitems[0]).to.have.property('tabIndex', -1);
      expect(menuitems[1]).to.have.property('tabIndex', 0);
      expect(menuitems[2]).to.have.property('tabIndex', -1);
    });
  });

  it('skips Divider during keyboard navigation', async () => {
    function ButtonMenuWithDivider() {
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);

      return (
        <div>
          <Button
            aria-haspopup="true"
            aria-label="open menu"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            Open
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
            transitionDuration={0}
          >
            <MenuItem>Item 1</MenuItem>
            <Divider />
            <MenuItem>Item 2</MenuItem>
            <MenuItem>Item 3</MenuItem>
          </Menu>
        </div>
      );
    }

    render(<ButtonMenuWithDivider />);

    const button = screen.getByRole('button', { name: 'open menu' });
    await act(async () => {
      button.focus();
      button.click();
    });

    const menuitems = screen.getAllByRole('menuitem');
    expect(menuitems[0]).toHaveFocus();

    fireEvent.keyDown(menuitems[0], { key: 'ArrowDown' });
    expect(menuitems[1]).toHaveFocus();

    fireEvent.keyDown(menuitems[1], { key: 'ArrowDown' });
    expect(menuitems[2]).toHaveFocus();

    expect(screen.getByRole('separator')).not.to.have.attribute('tabIndex');
  });

  it('closes the menu when Tabbing while the list is active', async () => {
    render(<ButtonMenu />);

    const trigger = screen.getByRole('button');
    await act(async () => {
      trigger.focus();
    });
    await act(async () => {
      trigger.click();
    });

    // eslint-disable-next-line testing-library/no-unnecessary-act -- react-transition-group uses one commit per state transition so we need to wait a bit
    await act(async () => {
      fireEvent.keyDown(screen.getAllByRole('menuitem')[0], { key: 'Tab' });
    });
    clock.tick(0);

    expect(screen.getByRole('menu', { hidden: true })).toBeInaccessible();
  });

  it('closes the menu when the backdrop is clicked', async () => {
    render(<ButtonMenu />);
    const button = screen.getByRole('button');
    await act(async () => {
      button.focus();
      button.click();
      screen.getByTestId('Backdrop').click();
    });

    expect(screen.getByRole('menu', { hidden: true })).toBeInaccessible();
  });

  describe('link items', () => {
    const plainAnchorItems = [
      {
        label: 'Plain same-page anchor',
        component: 'a',
        href: '#plain-anchor-target',
      },
      {
        label: 'Plain external anchor',
        component: 'a',
        href: 'https://mui.com/material-ui/react-menu/',
        target: '_blank',
        rel: 'noreferrer',
      },
    ];

    const nextLinkItems = [
      {
        label: 'Next.js same-page anchor',
        component: NextLinkLike,
        href: '#nextjs-anchor-target',
      },
      {
        label: 'Next.js internal link',
        component: NextLinkLike,
        href: '/material-ui/react-menu/',
      },
    ];

    async function openLinkMenu(items) {
      // `userEvent` requires real timers in this file because the parent suite uses fake timers.
      clock.restore();

      const view = renderRealTime(<LinkMenu items={items} />);

      await view.user.click(screen.getByRole('button', { name: 'open link menu' }));

      return {
        menuitems: screen.getAllByRole('menuitem'),
        user: view.user,
      };
    }

    it('renders component="a" MenuItems as anchors inside list item wrappers', async () => {
      const { menuitems } = await openLinkMenu(plainAnchorItems);

      expect(menuitems[0]).to.have.tagName('A');
      expect(menuitems[0]).to.have.attribute('href', '#plain-anchor-target');
      expect(menuitems[0].parentElement).to.have.tagName('LI');
      expect(menuitems[0].parentElement).to.have.attribute('role', 'none');

      expect(menuitems[1]).to.have.tagName('A');
      expect(menuitems[1]).to.have.attribute('href', 'https://mui.com/material-ui/react-menu/');
      expect(menuitems[1].parentElement).to.have.tagName('LI');
      expect(menuitems[1].parentElement).to.have.attribute('role', 'none');
    });

    it('renders Next.js-style MenuItems as anchors inside list item wrappers', async () => {
      const { menuitems } = await openLinkMenu(nextLinkItems);

      expect(menuitems[0]).to.have.tagName('A');
      expect(menuitems[0]).to.have.attribute('href', '#nextjs-anchor-target');
      expect(menuitems[0].parentElement).to.have.tagName('LI');
      expect(menuitems[0].parentElement).to.have.attribute('role', 'none');

      expect(menuitems[1]).to.have.tagName('A');
      expect(menuitems[1]).to.have.attribute('href', '/material-ui/react-menu/');
      expect(menuitems[1].parentElement).to.have.tagName('LI');
      expect(menuitems[1].parentElement).to.have.attribute('role', 'none');
    });

    it('keeps wrapped anchor and Next.js-style MenuItems in the same keyboard navigation order', async () => {
      const { menuitems, user } = await openLinkMenu([...plainAnchorItems, ...nextLinkItems]);

      expect(menuitems[0]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(menuitems[1]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(menuitems[2]).toHaveFocus();

      await user.keyboard('{ArrowDown}');
      expect(menuitems[3]).toHaveFocus();

      await user.keyboard('{Home}');
      expect(menuitems[0]).toHaveFocus();

      await user.keyboard('{End}');
      expect(menuitems[3]).toHaveFocus();

      await user.keyboard('{ArrowUp}');
      expect(menuitems[2]).toHaveFocus();
    });
  });
});
