import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { createRenderer, screen, fireEvent, isJsdom } from '@mui/internal-test-utils';
import Menu, { menuClasses as classes } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { modalClasses } from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';
import { paperClasses } from '../Paper';

const CustomTransition = React.forwardRef(function CustomTransition(
  { in: inProp, appear, onEnter, onEntering, onExited, ownerState, ...props },
  ref,
) {
  return <div data-testid="custom" ref={ref} {...props} />;
});

describe('<Menu />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  let defaultAnchorEl;
  beforeAll(() => {
    defaultAnchorEl = document.createElement('div');
    document.body.appendChild(defaultAnchorEl);
  });
  afterAll(() => {
    document.body.removeChild(defaultAnchorEl);
    defaultAnchorEl = null;
  });

  describeConformance(<Menu anchorEl={() => defaultAnchorEl} open />, () => ({
    classes,
    inheritComponent: Popover,
    render,
    muiName: 'MuiMenu',
    refInstanceof: window.HTMLDivElement,
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      paper: {
        expectedClassName: classes.paper,
      },
      list: {
        expectedClassName: classes.list,
        testWithElement: null, // already tested with `testWithComponent`
      },
      backdrop: {
        expectedClassName: modalClasses.backdrop,
        testWithElement: React.forwardRef(({ invisible, ownerState, ...props }, ref) => (
          <i ref={ref} {...props} />
        )),
      },
      transition: {
        expectedClassName: null,
        testWithComponent: CustomTransition,
        testWithElement: CustomTransition,
      },
    },
    testDeepOverrides: { slotName: 'list', slotClassName: classes.list },
    testRootOverrides: { slotName: 'root', slotClassName: classes.root },
    testVariantProps: { variant: 'menu' },
    skip: [
      'rootClass', // portal, can't determine the root
      'componentProp',
      'themeDefaultProps', // portal, can't determine the root
    ],
  }));

  describe('event callbacks', () => {
    describe('entering', () => {
      it('should fire callbacks', () => {
        const handleEnter = spy();
        const handleEntering = spy();
        render(
          <Menu
            anchorEl={defaultAnchorEl}
            open
            slotProps={{
              transition: {
                onEnter: handleEnter,
                onEntering: handleEntering,
              },
            }}
          />,
        );

        expect(handleEnter.callCount).to.equal(1);
        expect(handleEnter.args[0].length).to.equal(2);
        expect(handleEntering.callCount).to.equal(1);
        expect(handleEntering.args[0].length).to.equal(2);
      });
    });

    describe('exiting', () => {
      it('should fire callbacks', () => {
        const handleExit = spy();
        const handleExiting = spy();

        const { setProps } = render(
          <Menu
            slotProps={{
              transition: {
                onExit: handleExit,
                onExiting: handleExiting,
              },
            }}
            anchorEl={defaultAnchorEl}
            open
          />,
        );

        setProps({
          open: false,
        });

        expect(handleExit.callCount).to.equal(1);
        expect(handleExit.args[0].length).to.equal(1);
        expect(handleExiting.callCount).to.equal(1);
        expect(handleExiting.args[0].length).to.equal(1);
      });
    });
  });

  it('should pass `classes.paper` to the Paper', () => {
    render(
      <Menu anchorEl={defaultAnchorEl} open slotProps={{ paper: { 'data-testid': 'paper' } }} />,
    );

    expect(screen.getByTestId('paper')).to.have.class(classes.paper);
  });

  describe('prop: PopoverClasses', () => {
    it('should be able to change the Popover style', () => {
      render(
        <Menu
          anchorEl={defaultAnchorEl}
          open
          slotProps={{ paper: { 'data-testid': 'paper' } }}
          PopoverClasses={{ paper: 'bar' }}
        />,
      );

      expect(screen.getByTestId('paper')).to.have.class('bar');
    });

    it('should be able to change the Popover root element style when Menu classes prop is also provided', () => {
      render(
        <Menu
          anchorEl={defaultAnchorEl}
          open
          data-testid="popover"
          classes={{ paper: 'bar' }}
          PopoverClasses={{ root: 'foo' }}
        />,
      );
      expect(screen.getByTestId('popover')).to.have.class('foo');
    });
  });

  describe('slotProps: paper', () => {
    it('should be passed to the paper component', () => {
      const customElevation = 12;
      const customClasses = { rounded: 'custom-rounded' };

      render(
        <Menu
          anchorEl={defaultAnchorEl}
          open
          slotProps={{
            paper: {
              'data-testid': 'paper',
              elevation: customElevation,
              classes: customClasses,
            },
          }}
        />,
      );

      expect(screen.getByTestId('paper')).to.have.class(paperClasses.elevation12);
      expect(screen.getByTestId('paper')).to.have.class(customClasses.rounded);
    });
  });

  it('should pass onClose prop to Popover', () => {
    const handleClose = spy();
    render(<Menu anchorEl={defaultAnchorEl} open onClose={handleClose} />);

    fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });

    expect(handleClose.callCount).to.equal(1);
  });

  it('renders its children only when open', () => {
    const { setProps } = render(
      <Menu anchorEl={defaultAnchorEl} open={false}>
        <div data-testid="children" />
      </Menu>,
    );

    expect(screen.queryByTestId('children')).to.equal(null);

    setProps({ open: true });

    expect(screen.getByTestId('children')).not.to.equal(null);
  });

  describe('list node', () => {
    it('should render a menu inside the Popover', () => {
      render(<Menu anchorEl={defaultAnchorEl} open data-testid="popover" />);

      expect(screen.getByTestId('popover').querySelector('[role="menu"]')).not.to.equal(null);
    });
  });

  it('should open during the initial mount', () => {
    function WrappedMenuItem(props) {
      return <MenuItem {...props} />;
    }

    render(
      <Menu anchorEl={defaultAnchorEl} open>
        <WrappedMenuItem>one</WrappedMenuItem>
      </Menu>,
    );

    expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('should not focus list if autoFocus=false', () => {
    render(
      <Menu anchorEl={defaultAnchorEl} autoFocus={false} open>
        <MenuItem>one</MenuItem>
      </Menu>,
    );

    expect(screen.getByRole('menu')).not.toHaveFocus();
  });

  it('should call slotProps.transition.onEntering', () => {
    const onEnteringSpy = spy();
    render(
      <Menu
        anchorEl={defaultAnchorEl}
        open
        slotProps={{ transition: { onEntering: onEnteringSpy } }}
      />,
    );

    expect(onEnteringSpy.callCount).to.equal(1);
  });

  it('should call slotProps.transition.onEntering, disableAutoFocusItem', () => {
    const onEnteringSpy = spy();
    render(
      <Menu
        anchorEl={defaultAnchorEl}
        disableAutoFocusItem
        open
        slotProps={{ transition: { onEntering: onEnteringSpy } }}
      />,
    );

    expect(onEnteringSpy.callCount).to.equal(1);
  });

  it('opens on the next task when reduced motion is always', () => {
    const handleEntered = spy();
    const theme = createTheme({
      motion: {
        reducedMotion: 'always',
      },
    });

    function Test(props) {
      return (
        <ThemeProvider theme={theme}>
          <Menu
            anchorEl={defaultAnchorEl}
            open={props.open}
            transitionDuration={250}
            slotProps={{ transition: { onEntered: handleEntered } }}
          >
            <MenuItem>one</MenuItem>
          </Menu>
        </ThemeProvider>
      );
    }

    const { setProps } = render(<Test open={false} />);

    setProps({ open: true });

    expect(handleEntered.callCount).to.equal(0);
    clock.tick(0);
    expect(handleEntered.callCount).to.equal(1);
    expect(screen.getByRole('menu')).not.to.equal(null);
  });

  it('should call onClose on tab', () => {
    function WrappedMenuItem(props) {
      return <MenuItem {...props} />;
    }

    const onCloseSpy = spy();
    render(
      <Menu anchorEl={defaultAnchorEl} open onClose={onCloseSpy}>
        <WrappedMenuItem>hello</WrappedMenuItem>
      </Menu>,
    );

    expect(screen.getByRole('menuitem')).toHaveFocus();
    fireEvent.keyDown(screen.getByRole('menuitem'), { key: 'Tab' });

    expect(onCloseSpy.callCount).to.equal(1);
    expect(onCloseSpy.args[0][1]).to.equal('tabKeyDown');
  });

  it('ignores invalid children', () => {
    render(
      <Menu anchorEl={defaultAnchorEl} open>
        {null}
        <span role="menuitem">hello</span>
        {/* testing conditional rendering */}
        {/* eslint-disable-next-line no-constant-binary-expression */}
        {false && <span role="menuitem">hello</span>}
        {undefined}
        foo
      </Menu>,
    );

    expect(screen.getAllByRole('menuitem')).to.have.length(1);
  });

  it('supports MenuItems wrapped in a Fragment', () => {
    render(
      <Menu anchorEl={defaultAnchorEl} open>
        <React.Fragment>
          <MenuItem>one</MenuItem>
          <MenuItem>two</MenuItem>
        </React.Fragment>
      </Menu>,
    );

    expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
  });

  describe('theme customization', () => {
    it.skipIf(isJsdom())(
      'should override Menu Paper styles following correct precedence',
      function test() {
        const menuPaperOverrides = { borderRadius: 4 };
        const popoverPaperOverrides = { borderRadius: 8, height: 100 };
        const rootPaperOverrides = { borderRadius: 16, height: 200, width: 200 };

        const theme = createTheme({
          components: {
            MuiMenu: { styleOverrides: { paper: menuPaperOverrides } },
            MuiPopover: { styleOverrides: { paper: popoverPaperOverrides } },
            MuiPaper: { styleOverrides: { root: rootPaperOverrides } },
          },
        });

        render(
          <ThemeProvider theme={theme}>
            <Menu
              anchorEl={defaultAnchorEl}
              open
              slotProps={{ paper: { 'data-testid': 'paper' } }}
            />
          </ThemeProvider>,
        );

        const paper = screen.getByTestId('paper');
        expect(paper).toHaveComputedStyle({
          borderTopLeftRadius: `${menuPaperOverrides.borderRadius}px`,
          borderBottomLeftRadius: `${menuPaperOverrides.borderRadius}px`,
          borderTopRightRadius: `${menuPaperOverrides.borderRadius}px`,
          borderBottomRightRadius: `${menuPaperOverrides.borderRadius}px`,
          height: `${popoverPaperOverrides.height}px`,
          width: `${rootPaperOverrides.width}px`,
        });
      },
    );

    it.skipIf(isJsdom())(
      'should override Menu Paper styles using styles in MuiPaper slot',
      function test() {
        const theme = createTheme({
          components: {
            MuiPaper: { styleOverrides: { rounded: { borderRadius: 90 } } },
          },
        });

        render(
          <ThemeProvider theme={theme}>
            <Menu
              anchorEl={defaultAnchorEl}
              open
              slotProps={{ paper: { 'data-testid': 'paper' } }}
            />
          </ThemeProvider>,
        );

        const paper = screen.getByTestId('paper');
        expect(paper).toHaveComputedStyle({
          borderTopLeftRadius: '90px',
          borderBottomLeftRadius: '90px',
          borderTopRightRadius: '90px',
          borderBottomRightRadius: '90px',
        });
      },
    );
  });

  describe('slots', () => {
    it('should merge slots with existing values', () => {
      render(
        <Menu
          slots={{ root: 'span' }}
          slotProps={{ paper: { 'data-testid': 'paper' } }}
          anchorEl={defaultAnchorEl}
          open
        >
          <div />
        </Menu>,
      );

      expect(screen.getByTestId('paper')).to.have.length(1);
    });
  });
});
