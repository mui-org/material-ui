import * as React from 'react';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import { act, createMount, createClientRender, describeConformanceV5, screen } from 'test/utils';
import PropTypes from 'prop-types';
import Grow from '@material-ui/core/Grow';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Popover, { popoverClasses as classes } from '@material-ui/core/Popover';
import { getOffsetLeft, getOffsetTop } from './Popover';
import useForkRef from '../utils/useForkRef';

const FakePaper = React.forwardRef(function FakeWidthPaper(props, ref) {
  const handleMocks = React.useCallback((paperInstance) => {
    if (paperInstance) {
      // For jsdom
      Object.defineProperty(paperInstance, 'offsetWidth', { value: 0 });
      Object.defineProperty(paperInstance, 'offsetHeight', { value: 0 });
    }
  }, []);
  const handleRef = useForkRef(ref, handleMocks);

  return (
    <div
      tabIndex={-1}
      ref={handleRef}
      style={{
        width: 0,
        height: 0,
      }}
      {...props}
    />
  );
});

describe('<Popover />', () => {
  /**
   * @type {ReturnType<typeof useFakeTimers>}
   */
  let clock;
  beforeEach(() => {
    clock = useFakeTimers();
  });
  afterEach(() => {
    clock.restore();
  });

  const mount = createMount();
  const render = createClientRender();

  describeConformanceV5(<Popover anchorEl={() => document.createElement('div')} open />, () => ({
    classes,
    inheritComponent: Modal,
    render,
    muiName: 'MuiPopover',
    refInstanceof: window.HTMLDivElement,
    testDeepOverrides: { slotName: 'paper', slotClassName: classes.paper },
    skip: [
      'rootClass', // portal, can't determin the root
      'componentProp',
      'componentsProp',
      'themeDefaultProps', // portal, can't determin the root
      'themeStyleOverrides', // portal, can't determin the root
      'themeVariants',
      'reactTestRenderer', // react-transition-group issue
    ],
  }));

  describe('root node', () => {
    it('should render a Modal with an invisible backdrop as the root node', () => {
      function TestBackdrop(props) {
        const { open, invisible } = props;
        if (!open) {
          return null;
        }
        return <div data-testid="backdrop" data-invisible={invisible} />;
      }
      render(
        <Popover open anchorEl={document.createElement('div')} BackdropComponent={TestBackdrop}>
          <div />
        </Popover>,
      );

      expect(screen.getByTestId('backdrop')).to.have.attribute('data-invisible', 'true');
    });

    it('should only render its children when open', () => {
      const { setProps } = render(
        <Popover open={false} anchorEl={document.createElement('div')}>
          <div data-testid="children" />
        </Popover>,
      );

      expect(screen.queryByTestId('children')).to.equal(null);

      setProps({ open: true });

      expect(screen.getByTestId('children')).not.to.equal(null);
    });

    it('hide its children immediately when closing but transition them out', () => {
      const { setProps } = render(
        <Popover open anchorEl={document.createElement('div')} transitionDuration={1974}>
          <div data-testid="children" />
        </Popover>,
      );

      setProps({ open: false });

      expect(screen.getByTestId('children')).toBeInaccessible();

      act(() => {
        clock.tick(1974);
      });

      expect(screen.queryByTestId('children')).to.equal(null);
    });

    describe('getOffsetTop', () => {
      it('should return vertical when vertical is a number', () => {
        const vertical = 1;
        const offsetTop = getOffsetTop('', vertical);
        expect(offsetTop).to.equal(vertical);
      });

      it("should return half of rect.height if vertical is 'center'", () => {
        const vertical = 'center';
        const rect = { height: 1 };
        const offsetTop = getOffsetTop(rect, vertical);
        expect(offsetTop).to.equal(rect.height / 2);
      });

      it("should return rect.height if vertical is 'bottom'", () => {
        const vertical = 'bottom';
        const rect = { height: 1 };
        const offsetTop = getOffsetTop(rect, vertical);
        expect(offsetTop).to.equal(rect.height);
      });

      it('should return zero if vertical is something else', () => {
        const vertical = undefined;
        const rect = { height: 1 };
        const offsetTop = getOffsetTop(rect, vertical);
        expect(offsetTop).to.equal(0);
      });
    });

    describe('getOffsetLeft', () => {
      it('should return horizontal when horizontal is a number', () => {
        const horizontal = 1;
        const offsetLeft = getOffsetLeft('', horizontal);
        expect(offsetLeft).to.equal(horizontal);
      });

      it("should return half of rect.width if horizontal is 'center'", () => {
        const horizontal = 'center';
        const rect = { width: 1 };
        const offsetLeft = getOffsetLeft(rect, horizontal);
        expect(offsetLeft).to.equal(rect.width / 2);
      });

      it("should return rect.width if horizontal is 'right'", () => {
        const horizontal = 'right';
        const rect = { width: 1 };
        const offsetLeft = getOffsetLeft(rect, horizontal);
        expect(offsetLeft).to.equal(rect.width);
      });

      it('should return zero if horizontal is something else', () => {
        const horizontal = undefined;
        const rect = { width: 1 };
        const offsetLeft = getOffsetLeft(rect, horizontal);
        expect(offsetLeft).to.equal(0);
      });
    });
  });

  describe('transition', () => {
    it('appears on mount', () => {
      const handleEnter = spy();
      render(
        <Popover
          anchorEl={document.createElement('div')}
          open
          TransitionProps={{ onEnter: handleEnter }}
        >
          <div />
        </Popover>,
      );

      expect(handleEnter.callCount).to.equal(1);
    });

    it('should fire Popover transition event callbacks', () => {
      const handleEnter = spy();
      const handleEntering = spy();
      const handleEntered = spy();
      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();

      const { setProps } = render(
        <Popover
          anchorEl={document.createElement('div')}
          open
          transitionDuration={0}
          TransitionProps={{
            onEnter: handleEnter,
            onEntering: handleEntering,
            onEntered: handleEntered,
            onExit: handleExit,
            onExiting: handleExiting,
            onExited: handleExited,
          }}
        >
          <div />
        </Popover>,
      );

      expect({
        onEnter: handleEnter.callCount,
        onEntered: handleEntered.callCount,
        onEntering: handleEntering.callCount,
        onExit: handleExit.callCount,
        onExited: handleExited.callCount,
        onExiting: handleExiting.callCount,
      }).to.deep.equal({
        onEnter: 1,
        onEntering: 1,
        onEntered: 0,
        onExit: 0,
        onExiting: 0,
        onExited: 0,
      });

      act(() => {
        clock.tick(0);
      });

      expect({
        onEnter: handleEnter.callCount,
        onEntered: handleEntered.callCount,
        onEntering: handleEntering.callCount,
        onExit: handleExit.callCount,
        onExited: handleExited.callCount,
        onExiting: handleExiting.callCount,
      }).to.deep.equal({
        onEnter: 1,
        onEntering: 1,
        onEntered: 1,
        onExit: 0,
        onExiting: 0,
        onExited: 0,
      });

      setProps({ open: false });

      expect({
        onEnter: handleEnter.callCount,
        onEntered: handleEntered.callCount,
        onEntering: handleEntering.callCount,
        onExit: handleExit.callCount,
        onExited: handleExited.callCount,
        onExiting: handleExiting.callCount,
      }).to.deep.equal({
        onEnter: 1,
        onEntering: 1,
        onEntered: 1,
        onExit: 1,
        onExiting: 1,
        onExited: 0,
      });

      act(() => {
        clock.tick(0);
      });

      expect({
        onEnter: handleEnter.callCount,
        onEntered: handleEntered.callCount,
        onEntering: handleEntering.callCount,
        onExit: handleExit.callCount,
        onExited: handleExited.callCount,
        onExiting: handleExiting.callCount,
      }).to.deep.equal({
        onEnter: 1,
        onEntering: 1,
        onEntered: 1,
        onExit: 1,
        onExiting: 1,
        onExited: 1,
      });
    });
  });

  describe('paper', () => {
    it('should have Paper as a child of Transition', () => {
      render(
        <Popover
          anchorEl={document.createElement('div')}
          open
          PaperProps={{ 'data-testid': 'paper' }}
        >
          <div />
        </Popover>,
      );

      expect(screen.getByTestId('paper')).not.to.equal(null);
    });

    it('should have the paper class', () => {
      render(
        <Popover
          anchorEl={document.createElement('div')}
          open
          PaperProps={{ 'data-testid': 'paper' }}
        >
          <div />
        </Popover>,
      );

      expect(screen.getByTestId('paper')).to.have.class(classes.paper);
    });

    it('should have a elevation prop passed down', () => {
      const wrapper = mount(
        <Popover anchorEl={document.createElement('div')} open>
          <div />
        </Popover>,
      );

      expect(wrapper.find(Paper).props().elevation).to.equal(8);

      wrapper.setProps({ elevation: 16 });
      expect(wrapper.find(Paper).props().elevation).to.equal(16);
    });
  });

  describe('PaperProps.ref', () => {
    it('should position popover correctly', () => {
      const handleEntering = spy();
      render(
        <Popover
          anchorEl={document.createElement('div')}
          open
          PaperProps={{ 'data-testid': 'Popover', ref: () => null }}
          TransitionProps={{ onEntering: handleEntering }}
        >
          <div />
        </Popover>,
      );
      expect(handleEntering.args[0][0]).toHaveInlineStyle({ top: '16px', left: '16px' });
    });
  });

  describe('transition lifecycle', () => {
    describe('handleEntering(element)', () => {
      it('should set the inline styles for the enter phase', () => {
        const handleEntering = spy();
        const { setProps } = render(
          <Popover
            anchorEl={document.createElement('div')}
            open={false}
            TransitionProps={{ onEntering: handleEntering }}
          >
            <div />
          </Popover>,
        );

        setProps({
          open: true,
        });

        const element = handleEntering.args[0][0];

        expect(element.style.top === '16px' && element.style.left === '16px').to.equal(true);
        expect(element.style.transformOrigin).to.match(/-16px -16px( 0px)?/);
      });
    });
  });

  describe('prop: anchorEl', () => {
    it('should accept a function', () => {
      const anchorElSpy = spy();
      render(
        <Popover open={false} anchorEl={anchorElSpy}>
          <div />
        </Popover>,
      );
      expect(anchorElSpy.callCount).to.be.greaterThanOrEqual(1);
    });
  });

  describe('positioning on an anchor', () => {
    let anchorEl;

    function openPopover(anchorOrigin) {
      render(
        <Popover
          anchorEl={anchorEl}
          anchorOrigin={anchorOrigin}
          open
          transitionDuration={0}
          PaperProps={{ 'data-testid': 'paper' }}
        >
          <div />
        </Popover>,
      );
      act(() => {
        clock.tick(0);
      });
    }

    beforeEach(() => {
      anchorEl = document.createElement('div');

      anchorEl.style.width = '50px';
      anchorEl.style.height = '50px';
      anchorEl.style.position = 'absolute';
      anchorEl.style.top = '100px';
      anchorEl.style.left = '100px';

      document.body.appendChild(anchorEl);
    });

    afterEach(() => {
      document.body.removeChild(anchorEl);
    });

    it('should be positioned over the top left of the anchor', () => {
      openPopover({ vertical: 'top', horizontal: 'left' });

      const anchorRect = anchorEl.getBoundingClientRect();
      const top = anchorRect.top <= 16 ? 16 : anchorRect.top;
      const left = anchorRect.left <= 16 ? 16 : anchorRect.left;
      expect(screen.getByTestId('paper')).toHaveInlineStyle({ top: `${top}px`, left: `${left}px` });
    });

    it('should be positioned over the center left of the anchor', () => {
      openPopover({ vertical: 'center', horizontal: 'left' });

      const anchorRect = anchorEl.getBoundingClientRect();
      const anchorTop = anchorRect.top + anchorRect.height / 2;
      const top = anchorTop <= 16 ? 16 : anchorTop;
      const left = anchorRect.left <= 16 ? 16 : anchorRect.left;
      expect(screen.getByTestId('paper')).toHaveInlineStyle({ top: `${top}px`, left: `${left}px` });
    });

    it('should be positioned over the bottom left of the anchor', () => {
      openPopover({ vertical: 'bottom', horizontal: 'left' });

      const anchorRect = anchorEl.getBoundingClientRect();
      const top = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
      const left = anchorRect.left <= 16 ? 16 : anchorRect.left;
      expect(screen.getByTestId('paper')).toHaveInlineStyle({ top: `${top}px`, left: `${left}px` });
    });

    it('should be positioned over the center center of the anchor', () => {
      openPopover({ vertical: 'center', horizontal: 'center' });

      const anchorRect = anchorEl.getBoundingClientRect();
      const anchorTop = anchorRect.top + anchorRect.height / 2;
      const anchorLeft = anchorRect.left + anchorRect.height / 2;
      const top = anchorTop <= 16 ? 16 : anchorTop;
      const left = anchorLeft <= 16 ? 16 : anchorLeft;
      expect(screen.getByTestId('paper')).toHaveInlineStyle({ top: `${top}px`, left: `${left}px` });
    });

    it('should be positioned over the top right of the anchor', () => {
      openPopover({ vertical: 'top', horizontal: 'right' });
      const anchorRect = anchorEl.getBoundingClientRect();
      const top = anchorRect.top <= 16 ? 16 : anchorRect.top;
      const left = anchorRect.right <= 16 ? 16 : anchorRect.right;
      expect(screen.getByTestId('paper')).toHaveInlineStyle({ top: `${top}px`, left: `${left}px` });
    });

    it('should be positioned over the bottom right of the anchor', () => {
      openPopover({ vertical: 'bottom', horizontal: 'right' });

      const anchorRect = anchorEl.getBoundingClientRect();
      const top = anchorRect.bottom <= 16 ? 16 : anchorRect.bottom;
      const left = anchorRect.right <= 16 ? 16 : anchorRect.right;
      expect(screen.getByTestId('paper')).toHaveInlineStyle({ top: `${top}px`, left: `${left}px` });
    });
  });

  it('should pass through container prop if container and anchorEl props are provided', () => {
    const container = document.createElement('div');
    const anchorEl = document.createElement('div');
    render(<Popover anchorEl={anchorEl} data-testid="popover" container={container} open />);

    expect(container.querySelector('[data-testid="popover"]').parentElement).to.equal(container);
  });

  it("should use anchorEl's parent body as container if container not provided", () => {
    const anchorEl = document.createElement('div');
    render(<Popover anchorEl={anchorEl} data-testid="popover" open />);

    expect(screen.getByTestId('popover').parentElement).to.equal(anchorEl.ownerDocument.body);
  });

  describe('warnings', () => {
    beforeEach(() => {
      PropTypes.resetWarningCache();
    });

    it('should warn if anchorEl is not valid', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Popover.propTypes,
          { classes: {}, open: true },
          'prop',
          'MockedPopover',
        );
      }).toErrorDev('It should be an Element instance');
    });

    it('warns if a component for the Paper is used that cant hold a ref', () => {
      expect(() => {
        PropTypes.checkPropTypes(
          Popover.propTypes,
          {
            anchorEl: document.createElement('div'),
            classes: {},
            open: false,
            PaperProps: { component: () => <div />, elevation: 4 },
          },
          'prop',
          'MockedPopover',
        );
      }).toErrorDev(
        'Warning: Failed prop type: Invalid prop `PaperProps.component` supplied to `MockedPopover`. Expected an element type that can hold a ref.',
      );
    });
  });

  describe('prop anchorReference="anchorPosition"', () => {
    const anchorPosition = { top: 300, left: 500 };

    function openPopover(anchorOrigin) {
      render(
        <Popover
          anchorEl={document.createElement('div')}
          anchorReference="anchorPosition"
          anchorPosition={anchorPosition}
          anchorOrigin={anchorOrigin}
          open
          transitionDuration={0}
          PaperProps={{ 'data-testid': 'paper' }}
        >
          <div />
        </Popover>,
      );
      act(() => {
        clock.tick(0);
      });
    }

    it('should be positioned according to the passed coordinates', () => {
      openPopover();

      expect(screen.getByTestId('paper')).toHaveInlineStyle({
        top: `${anchorPosition.top}px`,
        left: `${anchorPosition.left}px`,
      });
    });

    it('should ignore the anchorOrigin prop when being positioned', () => {
      openPopover({ vertical: 'top', horizontal: 'right' });

      expect(screen.getByTestId('paper')).toHaveInlineStyle({
        top: `${anchorPosition.top}px`,
        left: `${anchorPosition.left}px`,
      });
    });
  });

  describe('prop anchorReference="none"', () => {
    it('should not try to change the position', () => {
      const anchorEl = document.createElement('div');
      render(
        <Popover
          anchorEl={anchorEl}
          anchorReference="none"
          open
          transitionDuration={0}
          PaperProps={{
            'data-testid': 'paper',
            style: {
              top: 11,
              left: 12,
            },
          }}
        >
          <div />
        </Popover>,
      );

      expect(screen.getByTestId('paper')).toHaveInlineStyle({
        top: `11px`,
        left: `12px`,
      });
    });
  });

  describe('update position', () => {
    let windowInnerHeight;

    beforeEach(() => {
      windowInnerHeight = window.innerHeight;
      window.innerHeight = 8;
    });

    afterEach(() => {
      window.innerHeight = windowInnerHeight;
    });

    it('should recalculate position if the popover is open', () => {
      let element;
      const anchorEl = document.createElement('div');
      stub(anchorEl, 'getBoundingClientRect').callsFake(() => ({
        left: 0,
        top: 9,
      }));
      render(
        <Popover
          anchorEl={anchorEl}
          open
          TransitionProps={{
            onEntering: (node) => {
              element = node;
            },
          }}
          transitionDuration={0}
          marginThreshold={8}
        >
          <div />
        </Popover>,
      );
      const beforeStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };

      window.innerHeight = windowInnerHeight * 2;
      window.dispatchEvent(new window.Event('resize'));
      act(() => {
        clock.tick(166);
      });

      const afterStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      expect(beforeStyle).not.to.deep.equal(afterStyle);
    });

    it('should not recalculate position if the popover is closed', () => {
      let element;
      const mockedAnchor = document.createElement('div');
      stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
        left: 0,
        top: 9,
      }));
      const { setProps } = render(
        <Popover
          anchorEl={mockedAnchor}
          open
          TransitionProps={{
            onEntering: (node) => {
              element = node;
            },
          }}
          transitionDuration={0}
          marginThreshold={8}
        >
          <div />
        </Popover>,
      );
      const beforeStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };

      window.innerHeight = windowInnerHeight * 2;
      window.dispatchEvent(new window.Event('resize'));
      setProps({ open: false });
      act(() => {
        clock.tick(166);
      });

      const afterStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      expect(beforeStyle).to.deep.equal(afterStyle);
    });

    it('should be able to manually recalculate position', () => {
      let element;
      const mockedAnchor = document.createElement('div');
      stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
        left: 0,
        top: 9,
      }));
      const { setProps } = render(
        <Popover
          anchorEl={mockedAnchor}
          open
          TransitionProps={{
            onEntering: (node) => {
              element = node;
            },
          }}
          transitionDuration={0}
          marginThreshold={8}
        >
          <div />
        </Popover>,
      );
      let popoverActions;
      setProps({
        action: (actions) => {
          popoverActions = actions;
        },
      });
      const beforeStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      window.innerHeight = windowInnerHeight * 2;

      expect(typeof popoverActions.updatePosition === 'function').to.equal(true);

      popoverActions.updatePosition();
      clock.tick(166);

      const afterStyle = {
        top: element.style.top,
        left: element.style.left,
        transformOrigin: element.style.transformOrigin,
      };
      expect(beforeStyle).not.to.deep.equal(afterStyle);
    });
  });

  [0, 18, 16].forEach((marginThreshold) => {
    describe(`positioning when \`marginThreshold=${marginThreshold}\``, () => {
      function getElementStyleOfOpenPopover(anchorEl = document.createElement('svg')) {
        let style;
        render(
          <Popover
            anchorEl={anchorEl}
            open
            TransitionProps={{
              onEntering: (node) => {
                style = node.style;
              },
            }}
            marginThreshold={marginThreshold}
            PaperProps={{ component: FakePaper }}
          >
            <div />
          </Popover>,
        );
        return style;
      }

      specify('when no movement is needed', () => {
        const negative = marginThreshold === 0 ? '' : '-';
        const positioningStyle = getElementStyleOfOpenPopover();

        expect(positioningStyle.top).to.equal(`${marginThreshold}px`);
        expect(positioningStyle.left).to.equal(`${marginThreshold}px`);
        expect(positioningStyle.transformOrigin).to.match(
          new RegExp(`${negative}${marginThreshold}px ${negative}${marginThreshold}px( 0px)?`),
        );
      });

      specify('top < marginThreshold', () => {
        const mockedAnchor = document.createElement('div');
        stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
          left: marginThreshold,
          top: marginThreshold - 1,
        }));
        const positioningStyle = getElementStyleOfOpenPopover(mockedAnchor);

        expect(positioningStyle.top).to.equal(`${marginThreshold}px`);
        expect(positioningStyle.left).to.equal(`${marginThreshold}px`);
        expect(positioningStyle.transformOrigin).to.match(/0px -1px( 0ms)?/);
      });

      describe('bottom > heightThreshold', () => {
        let windowInnerHeight;

        before(() => {
          windowInnerHeight = window.innerHeight;
          window.innerHeight = marginThreshold * 2;
        });

        after(() => {
          window.innerHeight = windowInnerHeight;
        });

        specify('test', () => {
          const mockedAnchor = document.createElement('div');
          stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
            left: marginThreshold,
            top: marginThreshold + 1,
          }));

          const positioningStyle = getElementStyleOfOpenPopover(mockedAnchor);

          expect(positioningStyle.top).to.equal(`${marginThreshold}px`);
          expect(positioningStyle.left).to.equal(`${marginThreshold}px`);
          expect(positioningStyle.transformOrigin).to.match(/0px 1px( 0px)?/);
        });
      });

      specify('left < marginThreshold', () => {
        const mockedAnchor = document.createElement('div');
        stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
          left: marginThreshold - 1,
          top: marginThreshold,
        }));

        const positioningStyle = getElementStyleOfOpenPopover(mockedAnchor);

        expect(positioningStyle.top).to.equal(`${marginThreshold}px`);

        expect(positioningStyle.left).to.equal(`${marginThreshold}px`);

        expect(positioningStyle.transformOrigin).to.match(/-1px 0px( 0px)?/);
      });

      describe('right > widthThreshold', () => {
        let innerWidthContainer;

        before(() => {
          innerWidthContainer = window.innerWidth;
          window.innerWidth = marginThreshold * 2;
        });

        after(() => {
          window.innerWidth = innerWidthContainer;
        });

        specify('test', () => {
          const mockedAnchor = document.createElement('div');
          stub(mockedAnchor, 'getBoundingClientRect').callsFake(() => ({
            left: marginThreshold + 1,
            top: marginThreshold,
          }));

          const positioningStyle = getElementStyleOfOpenPopover(mockedAnchor);

          expect(positioningStyle.top).to.equal(`${marginThreshold}px`);
          expect(positioningStyle.left).to.equal(`${marginThreshold}px`);
          expect(positioningStyle.transformOrigin).to.match(/1px 0px( 0px)?/);
        });
      });
    });
  });

  describe('prop: transitionDuration', () => {
    it('should apply the auto prop if supported', () => {
      const wrapper = mount(
        <Popover anchorEl={document.createElement('div')} open>
          <div />
        </Popover>,
      );
      expect(wrapper.find(Grow).props().timeout).to.equal('auto');
    });

    it('should not apply the auto prop if not supported', () => {
      const TransitionComponent = React.forwardRef((props, ref) => (
        <div data-testid="transition" data-timeout={props.timeout} ref={ref} tabIndex={-1} />
      ));
      render(
        <Popover
          anchorEl={document.createElement('div')}
          open
          TransitionComponent={TransitionComponent}
        >
          <div />
        </Popover>,
      );
      expect(screen.getByTestId('transition')).not.to.have.attribute('data-timeout');
    });
  });
});
