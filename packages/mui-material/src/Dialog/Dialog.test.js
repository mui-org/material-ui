import { describe, it, expect } from 'vitest';
import * as React from 'react';
import { spy } from 'sinon';
import { act, createRenderer, fireEvent, screen, isJsdom } from '@mui/internal-test-utils';
import Modal from '@mui/material/Modal';
import Dialog, { dialogClasses as classes } from '@mui/material/Dialog';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import describeConformance from '../../test/describeConformance';

const isFirefox = /firefox/i.test(navigator.userAgent);

/**
 * more comprehensive simulation of a user click (mousedown + click)
 * @param {HTMLElement} element
 */
function userClick(element) {
  fireEvent.mouseDown(element);
  fireEvent.mouseUp(element);
  act(() => {
    element.click();
  });
}

/**
 * @param {typeof import('@mui/internal-test-utils').screen}
 */
function findBackdrop() {
  return screen.getByRole('dialog').parentElement;
}

function clickBackdrop() {
  userClick(findBackdrop());
}

const CustomFade = React.forwardRef(function CustomFade(props, ref) {
  return <Fade {...props} ref={ref} data-testid="custom" />;
});

describe('<Dialog />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describeConformance(
    <Dialog open disablePortal>
      foo
    </Dialog>,
    () => ({
      classes,
      inheritComponent: Modal,
      muiName: 'MuiDialog',
      render,
      testVariantProps: { variant: 'foo' },
      testDeepOverrides: { slotName: 'paper', slotClassName: classes.paper },
      refInstanceof: window.HTMLDivElement,
      slots: {
        transition: {
          expectedClassName: classes.transition,
          testWithComponent: CustomFade,
          testWithElement: null,
        },
        root: {
          expectedClassName: classes.root,
          testWithElement: null,
        },
        backdrop: {
          expectedClassName: classes.backdrop,
          testWithElement: null,
        },
        container: {
          expectedClassName: classes.container,
          testWithElement: null,
          testWithComponent: CustomFade,
        },
        paper: {
          expectedClassName: classes.paper,
          testWithElement: null,
        },
      },
      skip: ['componentProp', 'themeVariants'],
    }),
  );

  it('should work correctly when using css selectors for scroll="body"', () => {
    render(
      <Dialog open scroll="body">
        foo
      </Dialog>,
    );

    expect(document.querySelector(`.${classes.scrollBody} > .${classes.paper}`)).not.to.equal(null);
  });

  it('should work correctly when using css selectors for scroll="paper"', () => {
    render(
      <Dialog open scroll="paper">
        foo
      </Dialog>,
    );

    expect(document.querySelector(`.${classes.scrollPaper} > .${classes.paper}`)).not.to.equal(
      null,
    );
  });

  it('should render with slots.transition', () => {
    const Transition = React.forwardRef(() => <div data-testid="Transition" tabIndex={-1} />);

    render(
      <Dialog open slots={{ transition: Transition }}>
        foo
      </Dialog>,
    );

    expect(screen.getAllByTestId('Transition')).to.have.lengthOf(1);
  });

  it('calls onClose when pressing Esc and removes the content after the specified duration', () => {
    const onClose = spy();
    function TestCase() {
      const [open, close] = React.useReducer(() => false, true);
      const handleClose = (...args) => {
        close();
        onClose(...args);
      };

      return (
        <Dialog open={open} transitionDuration={100} onClose={handleClose}>
          foo
        </Dialog>
      );
    }
    render(<TestCase />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.to.equal(null);

    act(() => {
      dialog.click();
    });

    // keyDown not targeted at anything specific
    // eslint-disable-next-line mui/disallow-active-element-as-key-event-target
    fireEvent.keyDown(document.activeElement, { key: 'Escape' });
    expect(onClose.calledOnce).to.equal(true);

    clock.tick(100);

    expect(screen.queryByRole('dialog')).to.equal(null);
  });

  it('should focus the Paper element (role="dialog") on open', () => {
    render(
      <Dialog open transitionDuration={0}>
        <p>Hello World</p>
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveFocus();
    expect(dialog.tagName).to.equal('DIV');
    expect(dialog).to.have.attribute('tabindex', '-1');
    if (!isJsdom()) {
      expect(dialog).toHaveComputedStyle({ outlineWidth: '0px' });
    }
  });

  it('should focus the Paper element (role="alertdialog") on open', () => {
    render(
      <Dialog open transitionDuration={0} role="alertdialog">
        <p>Hello World</p>
      </Dialog>,
    );

    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveFocus();
    expect(dialog).to.have.attribute('tabindex', '-1');
  });

  it('should focus a custom PaperComponent on open', () => {
    render(
      <Dialog open transitionDuration={0} PaperComponent="span">
        <p>Hello World</p>
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveFocus();
    expect(dialog.tagName).to.equal('SPAN');
    expect(dialog).to.have.attribute('tabindex', '-1');
  });

  it('should respect slotProps.paper.tabIndex while still focusing the Paper', () => {
    render(
      <Dialog open transitionDuration={0} slotProps={{ paper: { tabIndex: 0 } }}>
        <p>Hello World</p>
      </Dialog>,
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveFocus();
    expect(dialog).to.have.attribute('tabindex', '0');
  });

  it('should not close until the IME is cancelled', () => {
    const onClose = spy();

    render(
      <Dialog open transitionDuration={0} onClose={onClose}>
        <input type="text" autoFocus />
      </Dialog>,
    );

    const textbox = screen.getByRole('textbox');

    // Actual Behavior when "あ" (Japanese) is entered and press the Esc for IME cancellation.
    fireEvent.change(textbox, { target: { value: 'あ' } });
    fireEvent.keyDown(textbox, { key: 'Escape', keyCode: 229 });
    expect(onClose.callCount).to.equal(0);

    fireEvent.keyDown(textbox, { key: 'Escape' });
    expect(onClose.callCount).to.equal(1);
  });

  it('can ignore backdrop click and Esc keydown', () => {
    function DialogWithBackdropClickDisabled(props) {
      const { onClose, ...other } = props;
      function handleClose(event, reason) {
        if (!['backdropClick', 'escapeKeyDown'].includes(reason)) {
          onClose(event, reason);
        }
      }

      return <Dialog onClose={handleClose} {...other} />;
    }
    const onClose = spy();
    render(
      <DialogWithBackdropClickDisabled open onClose={onClose} transitionDuration={0}>
        foo
      </DialogWithBackdropClickDisabled>,
    );
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.to.equal(null);

    act(() => {
      dialog.click();
    });
    // keyDown is not targeted at anything specific.
    // eslint-disable-next-line mui/disallow-active-element-as-key-event-target
    fireEvent.keyDown(document.activeElement, { key: 'Escape' });

    expect(onClose.callCount).to.equal(0);

    clickBackdrop();
    expect(onClose.callCount).to.equal(0);
  });

  describe('backdrop', () => {
    it('does have `role` `presentation`', () => {
      render(<Dialog open>foo</Dialog>);

      expect(findBackdrop()).to.have.attribute('role', 'presentation');
    });

    it('calls onClose when clicked', () => {
      const onClose = spy();
      render(
        <Dialog onClose={onClose} open>
          foo
        </Dialog>,
      );

      clickBackdrop();
      expect(onClose.callCount).to.equal(1);
    });

    it('should not close if the target changes between the mousedown and the click', () => {
      render(
        <Dialog open>
          <h2>my dialog</h2>
        </Dialog>,
      );

      fireEvent.mouseDown(screen.getByRole('heading'));
      clickBackdrop();
      expect(screen.getByRole('dialog')).not.to.equal(null);
    });
  });

  describe('prop: classes', () => {
    it('should add the class on the Paper element', () => {
      render(
        <Dialog
          open
          classes={{ paper: 'my-paperclass' }}
          slotProps={{ paper: { 'data-testid': 'paper' } }}
        >
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).to.have.class('my-paperclass');
    });
  });

  describe('prop: maxWidth', () => {
    it('should use the right className', () => {
      render(
        <Dialog open maxWidth="xs" slotProps={{ paper: { 'data-testid': 'paper' } }}>
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).to.have.class(classes.paperWidthXs);
    });

    it('should use the right className when maxWidth={false}', () => {
      render(
        <Dialog open maxWidth={false} slotProps={{ paper: { 'data-testid': 'paper' } }}>
          foo
        </Dialog>,
      );
      expect(screen.getByTestId('paper')).to.have.class(classes.paperWidthFalse);
    });

    it('should apply the correct max-width styles when maxWidth={false}', () => {
      render(
        <Dialog open maxWidth={false} slotProps={{ paper: { 'data-testid': 'paper' } }}>
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).toHaveComputedStyle({
        maxWidth: 'calc(100% - 64px)',
      });
    });
  });

  describe('prop: fullWidth', () => {
    it('should set `fullWidth` class if specified', () => {
      render(
        <Dialog open fullWidth slotProps={{ paper: { 'data-testid': 'paper' } }}>
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).to.have.class(classes.paperFullWidth);
    });

    it('should not set `fullWidth` class if not specified', () => {
      render(
        <Dialog open slotProps={{ paper: { 'data-testid': 'paper' } }}>
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).not.to.have.class(classes.paperFullWidth);
    });
  });

  describe('prop: fullScreen', () => {
    it('can render fullScreen if true', () => {
      render(
        <Dialog open fullScreen slotProps={{ paper: { 'data-testid': 'paper' } }}>
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).to.have.class(classes.paperFullScreen);
    });

    it('does not render fullScreen by default', () => {
      render(
        <Dialog open slotProps={{ paper: { 'data-testid': 'paper' } }}>
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).not.to.have.class(classes.paperFullScreen);
    });

    // Firefox reports a fractional `scrollTop` in Vitest browser mode, failing the exact
    // assertion below. See https://github.com/vitest-dev/vitest/issues/9223
    it.skipIf(isJsdom() || isFirefox)('scrolls if overflown on the Y axis', function test() {
      const ITEM_HEIGHT = 100;
      const ITEM_COUNT = 10;

      render(
        <Dialog
          open
          fullScreen
          slotProps={{ paper: { 'data-testid': 'paper', sx: { height: ITEM_HEIGHT } } }}
        >
          {Array.from(Array(ITEM_COUNT).keys()).map((item) => (
            <div key={item} style={{ flexShrink: 0, height: ITEM_HEIGHT }}>
              {item}
            </div>
          ))}
        </Dialog>,
      );

      const paperElement = screen.getByTestId('paper');
      expect(paperElement.scrollTop).to.equal(0);
      expect(paperElement.clientHeight).to.equal(ITEM_HEIGHT);
      expect(paperElement.scrollHeight).to.equal(ITEM_HEIGHT * ITEM_COUNT);
      fireEvent.scroll(paperElement, { target: { scrollTop: ITEM_HEIGHT } });
      expect(paperElement.scrollTop).to.equal(ITEM_HEIGHT);
    });
  });

  describe('prop: slotProps.paper.className', () => {
    it('should merge the className', () => {
      render(
        <Dialog
          open
          slotProps={{ paper: { className: 'custom-paper-class', 'data-testid': 'paper' } }}
        >
          foo
        </Dialog>,
      );

      expect(screen.getByTestId('paper')).to.have.class(classes.paper);
      expect(screen.getByTestId('paper')).to.have.class('custom-paper-class');
    });
  });

  describe('a11y', () => {
    it('can be labelled by another element', () => {
      render(
        <Dialog open aria-labelledby="dialog-title">
          <h1 id="dialog-title">Choose either one</h1>
          <div>Actually you cant</div>
        </Dialog>,
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).to.have.attr('aria-labelledby', 'dialog-title');
      const label = document.getElementById(dialog.getAttribute('aria-labelledby'));
      expect(label).to.have.text('Choose either one');
    });

    it('should be described by another element', () => {
      render(
        <Dialog open aria-describedby="dialog-description">
          <h1>Choose either one</h1>
          <div id="dialog-description">Actually no</div>
        </Dialog>,
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).to.have.attr('aria-describedby', 'dialog-description');
    });

    it('should add the aria-modal="true" by default', function test() {
      render(<Dialog open />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).to.have.attr('aria-modal', 'true');
    });

    it('should render the custom aria-modal prop if provided', function test() {
      render(<Dialog aria-modal="false" open />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).to.have.attr('aria-modal', 'false');
    });

    it('should override the role if provided', function test() {
      render(<Dialog role="alertdialog" open />);

      expect(screen.getByRole('alertdialog')).not.to.equal(null);
    });
  });

  describe('prop: transitionDuration', () => {
    it.skipIf(isJsdom())('should render the default theme values by default', function test() {
      const theme = createTheme();
      const enteringScreenDurationInSeconds = theme.transitions.duration.enteringScreen / 1000;
      render(<Dialog open />);

      const container = document.querySelector(`.${classes.container}`);
      expect(container).toHaveComputedStyle({
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
          <Dialog open />
        </ThemeProvider>,
      );

      const container = document.querySelector(`.${classes.container}`);
      expect(container).toHaveComputedStyle({ transitionDuration: '0.001s' });
    });

    it.skipIf(isJsdom())('should render the values provided via prop', function test() {
      render(<Dialog open transitionDuration={{ enter: 1 }} />);

      const container = document.querySelector(`.${classes.container}`);
      expect(container).toHaveComputedStyle({
        transitionDuration: '0.001s',
      });
    });

    it('opens on the next task when reduced motion is always', () => {
      const handleEntered = spy();
      const theme = createTheme({
        motion: {
          reducedMotion: 'always',
        },
      });

      render(
        <ThemeProvider theme={theme}>
          <Dialog
            open
            transitionDuration={250}
            slotProps={{ transition: { onEntered: handleEntered } }}
          >
            content
          </Dialog>
        </ThemeProvider>,
      );

      expect(handleEntered.callCount).to.equal(0);
      clock.tick(0);
      expect(handleEntered.callCount).to.equal(1);
      expect(screen.getByRole('dialog')).not.to.equal(null);
    });
  });
});
