import * as React from 'react';
import { spy, useFakeTimers } from 'sinon';
import { expect } from 'chai';
import {
  act,
  createClientRender,
  createMount,
  describeConformance,
  fireEvent,
  getClasses,
} from 'test/utils';
import Button from '../Button';
import Popover from '../Popover';
import Menu from './Menu';
import SubMenu from '../SubMenu';
import MenuItem from '../MenuItem';
import MenuList from '../MenuList';

const MENU_LIST_HEIGHT = 100;

describe('<Menu />', () => {
  let classes;
  // StrictModeViolation: Not using act(), prefer using createClientRender from test/utils
  const mount = createMount({ strict: false });
  const render = createClientRender();
  const defaultProps = {
    open: false,
    anchorEl: () => document.createElement('div'),
  };

  before(() => {
    classes = getClasses(<Menu {...defaultProps} />);
  });

  describeConformance(<Menu {...defaultProps} open />, () => ({
    classes,
    inheritComponent: Popover,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: [
      'componentProp',
      // react-transition-group issue
      'reactTestRenderer',
    ],
  }));

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', (done) => {
        const handleEnter = spy();
        const handleEntering = spy();

        const wrapper = mount(
          <Menu
            TransitionProps={{
              onEnter: handleEnter,
              onEntering: handleEntering,
              onEntered: () => {
                expect(handleEnter.callCount).to.equal(1);
                expect(handleEnter.args[0].length).to.equal(2);
                expect(handleEntering.callCount).to.equal(1);
                expect(handleEntering.args[0].length).to.equal(2);
                done();
              },
            }}
            {...defaultProps}
          />,
        );

        wrapper.setProps({
          open: true,
        });
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', (done) => {
        const handleExit = spy();
        const handleExiting = spy();

        const wrapper = mount(
          <Menu
            TransitionProps={{
              onExit: handleExit,
              onExiting: handleExiting,
              onExited: () => {
                expect(handleExit.callCount).to.equal(1);
                expect(handleExit.args[0].length).to.equal(1);
                expect(handleExiting.callCount).to.equal(1);
                expect(handleExiting.args[0].length).to.equal(1);
                done();
              },
            }}
            {...defaultProps}
            open
          />,
        );

        wrapper.setProps({
          open: false,
        });
      });
    });
  });

  it('should pass `classes.paper` to the Popover', () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    expect(wrapper.find(Popover).props().PaperProps.classes.root).to.equal(classes.paper);
  });

  describe('prop: PopoverClasses', () => {
    it('should be able to change the Popover style', () => {
      const wrapper = mount(<Menu {...defaultProps} PopoverClasses={{ paper: 'bar' }} />);
      expect(wrapper.find(Popover).props().classes.paper).to.equal('bar');
    });
  });

  it('should pass the instance function `getContentAnchorEl` to Popover', () => {
    const menuRef = React.createRef();
    const wrapper = mount(<Menu ref={menuRef} {...defaultProps} />);
    expect(wrapper.find(Popover).props().getContentAnchorEl != null).to.equal(true);
  });

  it('should pass onClose prop to Popover', () => {
    const fn = () => {};
    const wrapper = mount(<Menu {...defaultProps} onClose={fn} />);
    expect(wrapper.find(Popover).props().onClose).to.equal(fn);
  });

  it('should pass anchorEl prop to Popover', () => {
    const el = document.createElement('div');
    const wrapper = mount(<Menu {...defaultProps} anchorEl={el} />);
    expect(wrapper.find(Popover).props().anchorEl).to.equal(el);
  });

  it('should pass through the `open` prop to Popover', () => {
    const wrapper = mount(<Menu {...defaultProps} />);
    expect(wrapper.find(Popover).props().open).to.equal(false);
    wrapper.setProps({ open: true });
    expect(wrapper.find(Popover).props().open).to.equal(true);
  });

  describe('list node', () => {
    it('should render a MenuList inside the Popover', () => {
      const wrapper = mount(<Menu {...defaultProps} className="test-class" data-test="hi" open />);
      expect(wrapper.find(Popover).find(MenuList).exists()).to.equal(true);
    });
  });

  it('should open during the initial mount', () => {
    const wrapper = mount(
      <Menu {...defaultProps} open>
        <div role="menuitem" tabIndex={-1}>
          one
        </div>
      </Menu>,
    );

    const popover = wrapper.find(Popover);
    expect(popover.props().open).to.equal(true);
    expect(wrapper.find('[role="menuitem"]').props().autoFocus).to.equal(true);
  });

  it('should not focus list if autoFocus=false', () => {
    const wrapper = mount(
      <Menu {...defaultProps} autoFocus={false} open>
        <div tabIndex={-1} />
      </Menu>,
    );
    const popover = wrapper.find(Popover);
    expect(popover.props().open).to.equal(true);
    const menuEl = document.querySelector('[role="menu"]');
    expect(document.activeElement).not.to.equal(menuEl);
    expect(false).to.equal(menuEl.contains(document.activeElement));
  });

  it('should call TransitionProps.onEntering with element if exists', () => {
    const onEnteringSpy = spy();
    const wrapper = mount(
      <Menu {...defaultProps} TransitionProps={{ onEntering: onEnteringSpy }} />,
    );
    const popover = wrapper.find(Popover);

    const elementForHandleEnter = { clientHeight: MENU_LIST_HEIGHT };

    popover.props().TransitionProps.onEntering(elementForHandleEnter);
    expect(onEnteringSpy.callCount).to.equal(1);
    expect(onEnteringSpy.args[0][0]).to.equal(elementForHandleEnter);
  });

  it('should call TransitionProps.onEntering, disableAutoFocusItem', () => {
    const onEnteringSpy = spy();
    const wrapper = mount(
      <Menu
        disableAutoFocusItem
        {...defaultProps}
        TransitionProps={{ onEntering: onEnteringSpy }}
      />,
    );
    const popover = wrapper.find(Popover);

    const elementForHandleEnter = { clientHeight: MENU_LIST_HEIGHT };

    popover.props().TransitionProps.onEntering(elementForHandleEnter);
    expect(onEnteringSpy.callCount).to.equal(1);
    expect(onEnteringSpy.args[0][0]).to.equal(elementForHandleEnter);
  });

  it('should call onClose on tab', () => {
    const onCloseSpy = spy();
    const wrapper = mount(
      <Menu {...defaultProps} open onClose={onCloseSpy}>
        <span>hello</span>
      </Menu>,
    );
    wrapper.find('span').simulate('keyDown', {
      key: 'Tab',
    });
    expect(onCloseSpy.callCount).to.equal(1);
    expect(onCloseSpy.args[0][1]).to.equal('tabKeyDown');
  });

  it('ignores invalid children', () => {
    const wrapper = mount(
      <Menu {...defaultProps} open>
        {null}
        <span role="menuitem">hello</span>
        {/* testing conditional rendering */}
        {false && <span role="menuitem">hello</span>}
        {undefined}
        foo
      </Menu>,
    );

    expect(wrapper.find('span[role="menuitem"]')).to.have.length(1);
  });

  describe('warnings', () => {
    it('warns a Fragment is passed as a child', () => {
      expect(() => {
        mount(
          <Menu anchorEl={document.createElement('div')} open>
            <React.Fragment />
          </Menu>,
        );
      }).toErrorDev([
        "Material-UI: The Menu component doesn't accept a Fragment as a child.",
        // twice in StrictMode
        "Material-UI: The Menu component doesn't accept a Fragment as a child.",
      ]);
    });
  });

  describe('cascading menu', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    const CascadingMenu = (props) => {
      const [anchorEl, setAnchorEl] = React.useState(null);

      const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

      const handleItemClick = () => {
        setAnchorEl(null);
      };

      return (
        <div>
          <Button onClick={handleButtonClick}>Open Menu</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleItemClick}
            transitionDuration={0}
            {...props}
          >
            <MenuItem
              id="settings-item"
              subMenu={
                <SubMenu>
                  <MenuItem id="regular-item" onClick={handleItemClick}>
                    Regular item
                  </MenuItem>
                  <MenuItem
                    id="go-deeper-1"
                    subMenu={
                      <SubMenu>
                        <MenuItem key="deeper2" id="go-deeper-2">
                          Bottom depth
                        </MenuItem>
                      </SubMenu>
                    }
                  >
                    Go deeper
                  </MenuItem>
                </SubMenu>
              }
            >
              Settings
            </MenuItem>
            <MenuItem
              id="account-item"
              subMenu={
                <SubMenu>
                  <MenuItem id="reset-password" onClick={handleItemClick}>
                    Reset password
                  </MenuItem>
                  <MenuItem id="change-username" onClick={handleItemClick}>
                    Change username
                  </MenuItem>
                  <MenuItem onClick={handleItemClick}>Delete account</MenuItem>
                </SubMenu>
              }
            >
              My account
            </MenuItem>
          </Menu>
        </div>
      );
    };

    it('displays a sub menu level 1', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Settings' }));
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
    });

    it('displays a sub menu level 2', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Settings' }));
      });

      clock.tick(0);

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Go deeper' }));
      });

      clock.tick(500);

      expect(queryByRole('menuitem', { name: 'Bottom depth' })).to.not.equal(null);
    });

    it('sub menus collapse when active parent item is changed', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'My account' }));
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Change username' })).to.not.equal(null);
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Settings' }));
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Change username' })).to.equal(null);
    });

    it('sub menu stays open when mouse is outside of menu', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Settings' }));
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Regular item' }));
      });
      act(() => {
        fireEvent.mouseOut(getByRole('menuitem', { name: 'Regular item' }));
      });
      act(() => {
        fireEvent.mouseEnter(getByRole('button'));
      });

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
    });

    it('opens a sub Menu on RightArrow keydown', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
    });

    it('closes current sub Menu on LeftArrow keydown', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Regular item' }), { key: 'ArrowLeft' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.equal(null);
    });

    it('closes all menus on Tab keydown', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Regular item' }), { key: 'Tab' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.equal(null);
      expect(queryByRole('menuitem', { name: 'Settings' })).to.equal(null);
    });

    it('closes all menus on Escape keydown', () => {
      const { getByRole, queryByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.not.equal(null);
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Regular item' }), { key: 'Escape' });
      });

      clock.tick(0);

      expect(queryByRole('menuitem', { name: 'Regular item' })).to.equal(null);
      expect(queryByRole('menuitem', { name: 'Settings' })).to.equal(null);
    });

    it('changes focus with up and down arrow buttons', () => {
      const { getByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(getByRole('menuitem', { name: 'Regular item' })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: 'Regular item' }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Regular item' }), { key: 'ArrowDown' });
      });

      clock.tick(0);

      expect(getByRole('menuitem', { name: 'Go deeper' })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: 'Go deeper' }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Go deeper' }), { key: 'ArrowUp' });
      });

      clock.tick(0);

      expect(getByRole('menuitem', { name: 'Regular item' })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: 'Regular item' }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('changes focus with left and right arrow buttons', async () => {
      const { findByRole, getByRole } = render(<CascadingMenu />);
      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      let regularItem = getByRole('menuitem', { name: 'Regular item' });
      expect(regularItem).to.equal(document.activeElement); // is focused
      expect(Array.from(regularItem.classList)).to.include('Mui-focusVisible'); // looks focused
      act(() => {
        fireEvent.keyDown(regularItem, { key: 'ArrowLeft' });
      });

      clock.tick(0);

      // There is an async element to the way this works, so we must test asyncronously.
      const settings = await findByRole('menuitem', { name: 'Settings' });
      expect(settings).to.equal(document.activeElement); // is focused
      expect(Array.from(settings.classList)).to.include('Mui-focusVisible'); // looks focused

      act(() => {
        fireEvent.keyDown(settings, { key: 'ArrowRight' });
      });

      clock.tick(0);

      regularItem = getByRole('menuitem', { name: 'Regular item' });
      expect(regularItem).to.equal(document.activeElement); // is focused
      expect(Array.from(regularItem.classList)).to.include('Mui-focusVisible'); // looks focused
    });

    it('keeps parent items of open sub menus highlighted', () => {
      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Settings' }), { key: 'ArrowRight' });
      });

      clock.tick(0);

      expect(Array.from(getByRole('menuitem', { name: 'Settings' }).classList)).to.include(
        'MuiMenuItem-openSubMenuParent',
      );
    });
  });
});
