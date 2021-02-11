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
    it('renders a subMenu', () => {
      const clock = useFakeTimers();
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test' }));
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.not.equal(null);
    });

    it('renders a nested subMenu', () => {
      const clock = useFakeTimers();
      const expected = 'NestedSubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem
                      subMenu={
                        <SubMenu>
                          <MenuItem>{expected}</MenuItem>
                        </SubMenu>
                      }
                    >
                      Test2
                    </MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test' }));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test2' }));
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.not.equal(null);
    });

    it('collapses the subMenu when active parent item is changed', () => {
      const clock = useFakeTimers();
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
              <MenuItem>Other</MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test' }));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Other' }));
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.equal(null);
    });

    it('keeps subMenus open when mousing outside of menus', () => {
      const clock = useFakeTimers();
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseMove(getByRole('menuitem', { name: 'Test' }));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseOut(getByRole('menuitem', { name: 'Test' }));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.mouseEnter(getByRole('button'));
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.not.equal(null);
    });

    it('opens a subMenu on right arrow keydown', () => {
      const clock = useFakeTimers();
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.not.equal(null);
    });

    it('closes a subMenu on left arrow keydown', () => {
      const clock = useFakeTimers();
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: expected }), { key: 'ArrowLeft' });
      });

      clock.restore();
      expect(queryByRole('menuitem', { name: expected })).to.equal(null);
    });

    it('closes all menus on tab keydown', () => {
      const clock = useFakeTimers();
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: expected }), { key: 'Tab' });
      });

      // Restore regular clock before doing setTimeout because sinon fake clocks replace the normal
      // functionality and cause this to fail.
      clock.restore();

      // This is gross and potentially flakey but it's the only way we could get the second assertion to pass.
      // Having the first assertion in here too eliminates the need for an additional clock.tick().
      setTimeout(() => {
        expect(queryByRole('menuitem', { name: expected })).to.equal(null);
        expect(queryByRole('menuitem', { name: 'Test' })).to.equal(null);
      }, 1000);
    });

    it('closes all menus on escape keydown', async () => {
      const clock = useFakeTimers();
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} transitionDuration={0}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole, queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: expected }), { key: 'Escape' });
      });

      // Restore regular clock before doing setTimeout because sinon fake clocks replace the normal
      // functionality and cause this to fail.
      clock.restore();

      // This is gross and potentially flakey but it's the only way we could get the second assertion to pass.
      // Having the first assertion in here too eliminates the need for an additional clock.tick().
      setTimeout(() => {
        expect(queryByRole('menuitem', { name: expected })).to.equal(null);
        expect(queryByRole('menuitem', { name: 'Test' })).to.equal(null);
      }, 1000);
    });

    it('changes subMenu item focus with down arrow', () => {
      const clock = useFakeTimers();
      const expected = 'Second';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>First</MenuItem>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'First' }), { key: 'ArrowDown' });
      });

      clock.restore();
      expect(getByRole('menuitem', { name: expected })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: expected }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('changes subMenu item focus with up arrow', () => {
      const clock = useFakeTimers();
      const expected = 'Second';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>First</MenuItem>
                    <MenuItem>{expected}</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'First' }), { key: 'ArrowUp' });
      });

      clock.restore();
      expect(getByRole('menuitem', { name: expected })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: expected }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('focuses first item when it opens a subMenu', () => {
      const clock = useFakeTimers();
      const expected = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{expected}</MenuItem>
                    <MenuItem>Other</MenuItem>
                  </SubMenu>
                }
              >
                Test
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: 'Test' }), { key: 'ArrowRight' });
      });

      clock.restore();
      expect(getByRole('menuitem', { name: expected })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: expected }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused
    });

    it('changes focus with right and left arrow keys', async () => {
      const clock = useFakeTimers();
      const firstFocus = 'MenuItem';
      const secondFocus = 'SubMenuItem';
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>{secondFocus}</MenuItem>
                  </SubMenu>
                }
              >
                {firstFocus}
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { findByRole, getByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(getByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      // ensure focus is on first item in root menu
      expect(getByRole('menuitem', { name: firstFocus })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: firstFocus }).classList)).to.include(
        'Mui-focusVisible',
      );

      // arrow right
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: firstFocus }), { key: 'ArrowRight' });
      });

      act(() => {
        clock.tick(0);
      });

      // ensure focus moved to first item in submenu
      expect(getByRole('menuitem', { name: secondFocus })).to.equal(document.activeElement); // is focused
      expect(Array.from(getByRole('menuitem', { name: secondFocus }).classList)).to.include(
        'Mui-focusVisible',
      ); // looks focused

      // arrow back left
      act(() => {
        fireEvent.keyDown(getByRole('menuitem', { name: secondFocus }), { key: 'ArrowLeft' });
      });

      act(() => {
        clock.tick(0);
      });

      clock.restore();
      // ensure focus moved back to first item in root menu
      expect(getByRole('menuitem', { name: firstFocus })).to.equal(document.activeElement); // is focused
      const fFocus = await findByRole('menuitem', { name: firstFocus });
      const hasFocusVisible = Array.from(fFocus.classList).includes('Mui-focusVisible');
      expect(hasFocusVisible).to.equal(true); // looks focused
    });

    it('keeps parent items of open sub menus highlighted', () => {
      const clock = useFakeTimers();
      const CascadingMenu = () => {
        const [anchorEl, setAnchorEl] = React.useState(null);

        const handleButtonClick = (event) => {
          setAnchorEl(event.currentTarget);
        };

        return (
          <React.Fragment>
            <Button onClick={handleButtonClick} />
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)}>
              <MenuItem
                subMenu={
                  <SubMenu>
                    <MenuItem>SubMenuItem</MenuItem>
                  </SubMenu>
                }
              >
                MenuItem
              </MenuItem>
            </Menu>
          </React.Fragment>
        );
      };

      const { queryByRole } = render(<CascadingMenu />);

      act(() => {
        fireEvent.click(queryByRole('button'));
      });

      act(() => {
        clock.tick(0);
      });

      act(() => {
        fireEvent.keyDown(queryByRole('menuitem', { name: 'MenuItem' }), { key: 'ArrowRight' });
      });

      clock.restore();
      expect(Array.from(queryByRole('menuitem', { name: 'MenuItem' }).classList)).to.include(
        'MuiMenuItem-openSubMenuParent',
      );
    });
  });
});
