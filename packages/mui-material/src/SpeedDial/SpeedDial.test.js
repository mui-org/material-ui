import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { spy } from 'sinon';
import {
  createRenderer,
  act,
  fireEvent,
  screen,
  flushEffects,
  isJsdom,
} from '@mui/internal-test-utils';
import Icon from '@mui/material/Icon';
import Fab from '@mui/material/Fab';
import SpeedDial, { speedDialClasses as classes } from '@mui/material/SpeedDial';
import SpeedDialAction, { speedDialActionClasses } from '@mui/material/SpeedDialAction';
import { tooltipClasses } from '@mui/material/Tooltip';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import describeConformance from '../../test/describeConformance';

const CustomFab = React.forwardRef(({ ownerState, ...props }, ref) => (
  <Fab ref={ref} {...props} data-testid="custom" />
));

describe('<SpeedDial />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  const icon = <Icon>font_icon</Icon>;
  function FakeAction() {
    return <div />;
  }
  const defaultProps = {
    open: true,
    icon,
    ariaLabel: 'mySpeedDial',
  };

  describeConformance(<SpeedDial {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiSpeedDial',
    testVariantProps: { direction: 'right' },
    slots: {
      transition: { testWithElement: null },
      root: { expectedClassName: classes.root },
      fab: {
        expectedClassName: classes.fab,
        testWithElement: null,
        testWithComponent: CustomFab,
      },
    },
    skip: [
      'componentProp', // react-transition-group issue
    ],
  }));

  it('should render a Fade transition', () => {
    const { container } = render(
      <SpeedDial {...defaultProps}>
        <FakeAction />
      </SpeedDial>,
    );

    expect(container.firstChild.tagName).to.equal('DIV');
  });

  it('should render a Fab', () => {
    render(
      <SpeedDial {...defaultProps}>
        <FakeAction />
      </SpeedDial>,
    );

    expect(screen.getByRole('button', { expanded: true })).not.to.equal(null);
  });

  it('should render with a null child', () => {
    render(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'One' } }} />
        {null}
        <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'Three' } }} />
      </SpeedDial>,
    );

    expect(screen.getByRole('menu').children).to.have.lengthOf(2);
    expect(screen.getAllByRole('menuitem')).to.have.lengthOf(2);
  });

  describe('slotProps.fab', () => {
    it('calls the click handler and requests closing the dial', async () => {
      clock.restore();
      const handleClick = spy();
      const handleClose = spy();
      const { user } = render(
        <SpeedDial
          {...defaultProps}
          onClose={handleClose}
          slotProps={{ fab: { onClick: handleClick } }}
        />,
      );

      const button = screen.getByRole('button');
      await user.click(button, { skipHover: true });

      expect(handleClick.callCount).to.equal(1);
      expect(handleClose.callCount).to.equal(1);
      expect(handleClose.args[0][1]).to.equal('toggle');
    });

    it('resolves callback props using the owner state', () => {
      render(
        <SpeedDial
          {...defaultProps}
          className="custom-root"
          direction="left"
          slotProps={{
            fab: (ownerState) => ({ title: `${ownerState.direction}-${ownerState.open}` }),
          }}
        />,
      );

      expect(screen.getByRole('button')).to.have.attribute('title', 'left-true');
      expect(screen.getByRole('button')).not.to.have.class('custom-root');
    });

    it('preserves the FabProps ref and the slot ref', () => {
      const legacyRef = React.createRef();
      const slotRef = React.createRef();
      render(
        <SpeedDial
          {...defaultProps}
          FabProps={{ ref: legacyRef }}
          slotProps={{ fab: { ref: slotRef } }}
        />,
      );

      expect(legacyRef.current).to.equal(screen.getByRole('button'));
      expect(slotRef.current).to.equal(screen.getByRole('button'));
    });

    it('overrides FabProps while preserving other legacy props', () => {
      render(
        <SpeedDial
          {...defaultProps}
          FabProps={{ color: 'secondary', title: 'legacy' }}
          slotProps={{ fab: { color: 'success' } }}
        />,
      );

      expect(screen.getByRole('button')).to.have.class('MuiFab-success');
      expect(screen.getByRole('button')).to.have.attribute('title', 'legacy');
    });

    it('forwards the component prop to the Fab', () => {
      render(
        <SpeedDial {...defaultProps} slotProps={{ fab: { component: 'a', href: '#actions' } }} />,
      );

      expect(screen.getByRole('link')).to.have.class('MuiFab-root');
      expect(screen.getByRole('link')).to.have.attribute('href', '#actions');
    });
  });

  it('should preserve object refs passed to action fab slots', () => {
    const actionRef = React.createRef();

    render(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction
          icon={icon}
          slotProps={{ fab: { ref: actionRef }, tooltip: { title: 'Action' } }}
        />
      </SpeedDial>,
    );

    expect(actionRef.current).to.equal(screen.getByRole('menuitem'));
  });

  it('should pass the open prop to its children', () => {
    const actionClasses = { fabClosed: 'is-closed' };

    render(
      <SpeedDial {...defaultProps}>
        <SpeedDialAction
          classes={actionClasses}
          icon={icon}
          slotProps={{ tooltip: { title: 'SpeedDialAction1' } }}
        />
        <SpeedDialAction
          classes={actionClasses}
          icon={icon}
          slotProps={{ tooltip: { title: 'SpeedDialAction2' } }}
        />
      </SpeedDial>,
    );

    const actions = screen.getAllByRole('menuitem');
    expect(actions).to.have.lengthOf(2);
    expect(actions.map((element) => element.className)).not.to.contain('is-closed');
  });

  it('should reset the state of the tooltip when the speed dial is closed while it is open', () => {
    render(
      <SpeedDial icon={icon} ariaLabel="mySpeedDial">
        <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'SpeedDialAction1' } }} />
        <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'SpeedDialAction2' } }} />
      </SpeedDial>,
    );

    const fab = screen.getByRole('button');
    const actions = screen.getAllByRole('menuitem');

    fireEvent.mouseEnter(fab);
    clock.runAll();
    expect(fab).to.have.attribute('aria-expanded', 'true');

    fireEvent.mouseOver(actions[0]);
    clock.runAll();
    expect(screen.queryByRole('tooltip')).not.to.equal(null);

    fireEvent.mouseLeave(actions[0]);
    clock.runAll();
    expect(fab).to.have.attribute('aria-expanded', 'false');

    fireEvent.mouseEnter(fab);
    clock.runAll();
    expect(screen.queryByRole('tooltip')).to.equal(null);
    expect(fab).to.have.attribute('aria-expanded', 'true');
  });

  describe('prop: onKeyDown', () => {
    it('should be called when a key is pressed', async () => {
      const handleKeyDown = spy();

      render(
        <SpeedDial {...defaultProps} onKeyDown={handleKeyDown}>
          <FakeAction />
        </SpeedDial>,
      );

      const buttonWrapper = screen.getByRole('button', { expanded: true });

      fireEvent.keyDown(document.body, { key: 'TAB' });

      await act(async () => {
        buttonWrapper.focus();
      });

      fireEvent.keyDown(buttonWrapper, { key: ' ' });

      expect(handleKeyDown.callCount).to.equal(1);
      expect(handleKeyDown.args[0][0]).to.have.property('key', ' ');

      await flushEffects();
    });
  });

  describe('prop: direction', () => {
    [
      ['up', 'directionUp'],
      ['down', 'directionDown'],
      ['left', 'directionLeft'],
      ['right', 'directionRight'],
    ].forEach(([direction, className]) => {
      it(`should place actions in the correct position when direction=${direction}`, () => {
        render(
          <SpeedDial {...defaultProps} direction={direction.toLowerCase()}>
            <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'action1' } }} />
            <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'action2' } }} />
          </SpeedDial>,
        );

        expect(screen.getByRole('presentation')).to.have.class(classes[className]);
      });
    });

    [
      ['up', 'tooltipPlacementLeft'],
      ['down', 'tooltipPlacementLeft'],
      ['left', 'tooltipPlacementTop'],
      ['right', 'tooltipPlacementTop'],
    ].forEach(([direction, className]) => {
      it(`should place the tooltip in the correct position when direction=${direction}`, () => {
        render(
          <SpeedDial {...defaultProps} open direction={direction.toLowerCase()}>
            <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'action1' } }} />
            <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'action2' } }} />
          </SpeedDial>,
        );

        const actions = screen.getAllByRole('menuitem');
        fireEvent.mouseOver(actions[0]);
        clock.runAll();
        expect(screen.getByRole('tooltip').firstChild).to.have.class(tooltipClasses[className]);
      });

      it(`should place the persistent tooltip in the correct position when direction=${direction}`, () => {
        const { container } = render(
          <SpeedDial {...defaultProps} direction={direction}>
            <SpeedDialAction
              icon={icon}
              slotProps={{ tooltip: { open: true, title: 'action1' } }}
            />
          </SpeedDial>,
        );

        expect(container.querySelector(`.${speedDialActionClasses.staticTooltip}`)).to.have.class(
          speedDialActionClasses[className],
        );
      });
    });
  });

  describe('keyboard', () => {
    it('should open the speed dial and move to the first action without closing', async () => {
      const handleOpen = spy();

      render(
        <SpeedDial ariaLabel="mySpeedDial" onOpen={handleOpen}>
          <SpeedDialAction slotProps={{ tooltip: { title: 'action1' } }} />
          <SpeedDialAction slotProps={{ tooltip: { title: 'action2' } }} />
        </SpeedDial>,
      );

      const fab = screen.getByRole('button');
      await act(async () => {
        fab.focus();
      });
      clock.tick();

      expect(handleOpen.callCount).to.equal(1);
      const actions = screen.getAllByRole('menuitem');
      expect(actions.length).to.equal(2);
      fireEvent.keyDown(fab, { key: 'ArrowUp' });
      expect(document.activeElement).to.equal(actions[0]);
      expect(fab).to.have.attribute('aria-expanded', 'true');

      await flushEffects();
    });

    // JSDOM doesn't support :focus-visible
    it.skipIf(isJsdom())(
      'should reset the state of the tooltip when the speed dial is closed while it is open',
      async function test() {
        const handleOpen = spy();

        render(
          <SpeedDial ariaLabel="mySpeedDial" onOpen={handleOpen}>
            <SpeedDialAction slotProps={{ tooltip: { title: 'action1' } }} />
            <SpeedDialAction slotProps={{ tooltip: { title: 'action2' } }} />
          </SpeedDial>,
        );

        const fab = screen.getByRole('button');
        const actions = screen.getAllByRole('menuitem');

        await act(async () => {
          fab.focus();
        });
        clock.runAll();

        expect(fab).to.have.attribute('aria-expanded', 'true');

        fireEvent.keyDown(fab, { key: 'ArrowUp' });
        clock.runAll();
        expect(screen.queryByRole('tooltip')).not.to.equal(null);

        fireEvent.keyDown(actions[0], { key: 'Escape' });

        clock.runAll();

        expect(screen.queryByRole('tooltip')).to.equal(null);
        expect(fab).to.have.attribute('aria-expanded', 'false');
        expect(fab).toHaveFocus();

        clock.runAll();

        expect(screen.queryByRole('tooltip')).to.equal(null);
        expect(fab).to.have.attribute('aria-expanded', 'false');
        expect(fab).toHaveFocus();

        await flushEffects();
      },
    );
  });

  describe('dial focus', () => {
    let actionButtons;
    let fabButton;

    function NoTransition(props) {
      const { children, in: inProp } = props;

      if (!inProp) {
        return null;
      }
      return children;
    }

    const renderSpeedDial = async (direction = 'up', actionCount = 4) => {
      actionButtons = [];
      fabButton = undefined;

      render(
        <SpeedDial
          ariaLabel={`${direction}-actions-${actionCount}`}
          FabProps={{
            ref: (element) => {
              fabButton = element;
            },
          }}
          open
          direction={direction}
          slots={{ transition: NoTransition }}
        >
          {Array.from({ length: actionCount }, (_, index) => (
            <SpeedDialAction
              key={index}
              slotProps={{
                fab: {
                  ref: (element) => {
                    actionButtons[index] = element;
                  },
                },
                tooltip: { title: `action${index}` },
              }}
              icon={icon}
            />
          ))}
        </SpeedDial>,
      );
      await act(async () => {
        fabButton.focus();
      });

      return screen;
    };

    /**
     *
     * @param actionIndex
     * @returns the button of the nth SpeedDialAction or the Fab if -1
     */
    const getActionButton = (actionIndex) => {
      if (actionIndex === -1) {
        return fabButton;
      }
      return actionButtons[actionIndex];
    };
    /**
     * @returns true if the button of the nth action is focused
     */
    const isActionFocused = (index) => {
      const expectedFocusedElement = index === -1 ? fabButton : actionButtons[index];
      return expectedFocusedElement === document.activeElement;
    };

    it('displays the actions on focus gain', async () => {
      await renderSpeedDial();
      expect(screen.getAllByRole('menuitem')).to.have.lengthOf(4);
      expect(fabButton).to.have.attribute('aria-expanded', 'true');
    });

    it('considers arrow keys with the same initial orientation', async () => {
      await renderSpeedDial();
      fireEvent.keyDown(fabButton, { key: 'left' });
      expect(isActionFocused(0)).to.equal(true);
      fireEvent.keyDown(getActionButton(0), { key: 'up' });
      expect(isActionFocused(0)).to.equal(true);
      fireEvent.keyDown(getActionButton(0), { key: 'left' });
      expect(isActionFocused(1)).to.equal(true);
      fireEvent.keyDown(getActionButton(1), { key: 'right' });
      expect(isActionFocused(0)).to.equal(true);

      await flushEffects();
    });

    describe('actions navigation', () => {
      /**
       * tests a combination of arrow keys on a focused SpeedDial
       */
      const itTestCombination = (dialDirection, keys, expected) => {
        it(`start dir ${dialDirection} with keys ${keys.join(',')}`, async () => {
          const [firstKey, ...combination] = keys;
          const [firstFocusedAction, ...foci] = expected;

          await renderSpeedDial(dialDirection);

          fireEvent.keyDown(fabButton, { key: firstKey });
          expect(isActionFocused(firstFocusedAction)).to.equal(
            true,
            `focused action initial ${firstKey} should be ${firstFocusedAction}`,
          );

          for (let i = 0; i < combination.length; i += 1) {
            const arrowKey = combination[i];
            const previousFocusedAction = foci[i - 1] || firstFocusedAction;
            const expectedFocusedAction = foci[i];
            const combinationUntilNot = [firstKey, ...combination.slice(0, i + 1)];

            fireEvent.keyDown(getActionButton(previousFocusedAction), {
              key: arrowKey,
            });
            expect(isActionFocused(expectedFocusedAction)).to.equal(
              true,
              `focused action after ${combinationUntilNot.join(
                ',',
              )} should be ${expectedFocusedAction}`,
            );
          }

          await flushEffects();
        });
      };

      describe('considers the first arrow key press as forward navigation', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, 1, 2, 1]);
        itTestCombination('up', ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, 1, 2, 1]);

        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, 1, 2, 1],
        );
        itTestCombination(
          'right',
          ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, 1, 2, 1],
        );

        itTestCombination('down', ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, 1, 2, 1]);
        itTestCombination('down', ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, 1, 2, 1]);

        itTestCombination(
          'left',
          ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, 1, 2, 1],
        );
        itTestCombination(
          'left',
          ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, 1, 2, 1],
        );
      });

      describe('ignores array keys orthogonal to the direction', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowUp'], [0, 0, 0, 1]);
        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowUp', 'ArrowDown', 'ArrowRight'],
          [0, 0, 0, 1],
        );
        itTestCombination(
          'down',
          ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowDown'],
          [0, 0, 0, 1],
        );
        itTestCombination('left', ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowLeft'], [0, 0, 0, 1]);
      });

      describe('does not wrap around', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, -1, -1, 0]);
        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, -1, -1, 0],
        );
        itTestCombination('down', ['ArrowDown', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, -1, -1, 0]);
        itTestCombination(
          'left',
          ['ArrowLeft', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, -1, -1, 0],
        );
      });
    });
  });

  describe('dial focus with slotProps.fab', () => {
    let actionButtons;
    let fabButton;

    function NoTransition(props) {
      const { children, in: inProp } = props;

      if (!inProp) {
        return null;
      }
      return children;
    }

    const renderSpeedDial = async (direction = 'up', actionCount = 4) => {
      actionButtons = [];
      fabButton = undefined;

      render(
        <SpeedDial
          ariaLabel={`${direction}-actions-${actionCount}`}
          slotProps={{
            fab: {
              ref: (element) => {
                fabButton = element;
              },
            },
          }}
          open
          direction={direction}
          slots={{ transition: NoTransition }}
        >
          {Array.from({ length: actionCount }, (_, index) => (
            <SpeedDialAction
              key={index}
              slotProps={{
                fab: {
                  ref: (element) => {
                    actionButtons[index] = element;
                  },
                },
                tooltip: { title: `action${index}` },
              }}
              icon={icon}
            />
          ))}
        </SpeedDial>,
      );
      await act(async () => {
        fabButton.focus();
      });
    };

    /**
     *
     * @param actionIndex
     * @returns the button of the nth SpeedDialAction or the Fab if -1
     */
    const getActionButton = (actionIndex) => {
      if (actionIndex === -1) {
        return fabButton;
      }
      return actionButtons[actionIndex];
    };
    /**
     * @returns true if the button of the nth action is focused
     */
    const isActionFocused = (index) => {
      const expectedFocusedElement = index === -1 ? fabButton : actionButtons[index];
      return expectedFocusedElement === document.activeElement;
    };

    it('displays the actions on focus gain', async () => {
      await renderSpeedDial();
      expect(screen.getAllByRole('menuitem')).to.have.lengthOf(4);
      expect(fabButton).to.have.attribute('aria-expanded', 'true');
    });

    it('considers arrow keys with the same initial orientation', async () => {
      await renderSpeedDial();
      fireEvent.keyDown(fabButton, { key: 'left' });
      expect(isActionFocused(0)).to.equal(true);
      fireEvent.keyDown(getActionButton(0), { key: 'up' });
      expect(isActionFocused(0)).to.equal(true);
      fireEvent.keyDown(getActionButton(0), { key: 'left' });
      expect(isActionFocused(1)).to.equal(true);
      fireEvent.keyDown(getActionButton(1), { key: 'right' });
      expect(isActionFocused(0)).to.equal(true);

      await flushEffects();
    });

    describe('actions navigation', () => {
      /**
       * tests a combination of arrow keys on a focused SpeedDial
       */
      const itTestCombination = (dialDirection, keys, expected) => {
        it(`start dir ${dialDirection} with keys ${keys.join(',')}`, async () => {
          const [firstKey, ...combination] = keys;
          const [firstFocusedAction, ...foci] = expected;

          await renderSpeedDial(dialDirection);
          fireEvent.keyDown(fabButton, { key: firstKey });
          expect(isActionFocused(firstFocusedAction)).to.equal(
            true,
            `focused action initial ${firstKey} should be ${firstFocusedAction}`,
          );

          for (let i = 0; i < combination.length; i += 1) {
            const arrowKey = combination[i];
            const previousFocusedAction = foci[i - 1] || firstFocusedAction;
            const expectedFocusedAction = foci[i];
            const combinationUntilNot = [firstKey, ...combination.slice(0, i + 1)];
            fireEvent.keyDown(getActionButton(previousFocusedAction), {
              key: arrowKey,
            });
            expect(isActionFocused(expectedFocusedAction)).to.equal(
              true,
              `focused action after ${combinationUntilNot.join(
                ',',
              )} should be ${expectedFocusedAction}`,
            );
          }
          await flushEffects();
        });
      };

      describe('considers the first arrow key press as forward navigation', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, 1, 2, 1]);
        itTestCombination('up', ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, 1, 2, 1]);

        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, 1, 2, 1],
        );
        itTestCombination(
          'right',
          ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, 1, 2, 1],
        );

        itTestCombination('down', ['ArrowDown', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, 1, 2, 1]);
        itTestCombination('down', ['ArrowUp', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, 1, 2, 1]);

        itTestCombination(
          'left',
          ['ArrowLeft', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, 1, 2, 1],
        );
        itTestCombination(
          'left',
          ['ArrowRight', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, 1, 2, 1],
        );
      });

      describe('ignores array keys orthogonal to the direction', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowLeft', 'ArrowRight', 'ArrowUp'], [0, 0, 0, 1]);
        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowUp', 'ArrowDown', 'ArrowRight'],
          [0, 0, 0, 1],
        );
        itTestCombination(
          'down',
          ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowDown'],
          [0, 0, 0, 1],
        );
        itTestCombination('left', ['ArrowLeft', 'ArrowUp', 'ArrowDown', 'ArrowLeft'], [0, 0, 0, 1]);
      });

      describe('does not wrap around', () => {
        itTestCombination('up', ['ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowUp'], [0, -1, -1, 0]);
        itTestCombination(
          'right',
          ['ArrowRight', 'ArrowLeft', 'ArrowLeft', 'ArrowRight'],
          [0, -1, -1, 0],
        );
        itTestCombination('down', ['ArrowDown', 'ArrowUp', 'ArrowUp', 'ArrowDown'], [0, -1, -1, 0]);
        itTestCombination(
          'left',
          ['ArrowLeft', 'ArrowRight', 'ArrowRight', 'ArrowLeft'],
          [0, -1, -1, 0],
        );
      });
    });
  });

  describe('prop: transitionDuration', () => {
    it.skipIf(isJsdom())('should render the default theme values by default', function test() {
      const theme = createTheme();
      const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;
      render(<SpeedDial data-testid="speedDial" {...defaultProps} />);

      const child = screen.getByTestId('speedDial').firstChild;
      expect(child).toHaveComputedStyle({
        transitionDuration: `${enteringScreenDurationInSeconds}s`,
      });
    });

    it.skipIf(isJsdom())('should render the custom theme values', function test() {
      const theme = createTheme({
        transitions: {
          duration: {
            enteringScreen: 1,
          },
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <SpeedDial data-testid="speedDial" {...defaultProps} />,
        </ThemeProvider>,
      );

      const child = screen.getByTestId('speedDial').firstChild;
      expect(child).toHaveComputedStyle({ transitionDuration: '0.001s' });
    });

    it.skipIf(isJsdom())('should render the values provided via prop', function test() {
      render(<SpeedDial data-testid="speedDial" {...defaultProps} transitionDuration={1} />);

      const child = screen.getByTestId('speedDial').firstChild;
      expect(child).toHaveComputedStyle({ transitionDuration: '0.001s' });
    });

    it('enters on the next task when reduced motion is always', () => {
      const handleEntered = spy();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <SpeedDial
            data-testid="speedDial"
            {...defaultProps}
            hidden={false}
            transitionDuration={250}
            slotProps={{ transition: { onEntered: handleEntered } }}
          />
        </ThemeProvider>,
      );

      expect(handleEntered.callCount).to.equal(0);
      clock.tick(0);
      expect(handleEntered.callCount).to.equal(1);
      expect(screen.getByTestId('speedDial')).not.to.equal(null);
    });

    it.skipIf(isJsdom())('disables actions CSS transition when reduced motion is always', () => {
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <SpeedDial data-testid="speedDial" {...defaultProps} open={false}>
            <SpeedDialAction icon={icon} slotProps={{ tooltip: { title: 'action1' } }} />
          </SpeedDial>
        </ThemeProvider>,
      );

      expect(screen.getByRole('menu')).toHaveComputedStyle({
        transitionDuration: '0s',
        transitionDelay: '0s',
      });
    });
  });
});
