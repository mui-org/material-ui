import { describe, beforeAll, beforeEach, afterAll, it, expect, afterEach } from 'vitest';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import { act, createRenderer, fireEvent, within, screen, isJsdom } from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fade from '@mui/material/Fade';
import Modal, { modalClasses as classes } from '@mui/material/Modal';
import describeConformance from '../../test/describeConformance';

describe('<Modal />', () => {
  const { clock, render } = createRenderer();

  let savedBodyStyle;

  beforeAll(() => {
    savedBodyStyle = document.body.style;
  });

  beforeEach(() => {
    document.body.setAttribute('style', savedBodyStyle);
  });

  describeConformance(
    <Modal open>
      <div />
    </Modal>,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      muiName: 'MuiModal',
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { hideBackdrop: true },
      slots: {
        root: { expectedClassName: classes.root },
        backdrop: { expectedClassName: classes.backdrop },
      },
      skip: [
        'rootClass', // portal, can't determine the root
        'themeDefaultProps', // portal, can't determine the root
        'themeStyleOverrides', // portal, can't determine the root
      ],
    }),
  );

  describe('props:', () => {
    let container;

    beforeAll(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterAll(() => {
      document.body.removeChild(container);
    });

    it('should consume theme default props', () => {
      const theme = createTheme({ components: { MuiModal: { defaultProps: { container } } } });
      render(
        <ThemeProvider theme={theme}>
          <Modal open>
            <p id="content">Hello World</p>
          </Modal>
        </ThemeProvider>,
      );

      expect(container).to.have.text('Hello World');
    });
  });

  describe('prop: classes', () => {
    it('adds custom classes to the component', () => {
      render(
        <Modal data-testid="Portal" open classes={{ root: 'custom-root', hidden: 'custom-hidden' }}>
          <div />
        </Modal>,
      );

      expect(screen.getByTestId('Portal')).to.have.class(classes.root);
      expect(screen.getByTestId('Portal')).to.have.class('custom-root');
      expect(screen.getByTestId('Portal')).not.to.have.class('custom-hidden');
    });
  });

  describe('prop: open', () => {
    it('should not render the children by default', () => {
      render(
        <Modal open={false}>
          <p data-testid="content">Hello World</p>
        </Modal>,
      );

      expect(screen.queryByTestId('content')).to.equal(null);
    });

    it('renders the children inside a div through a portal when open', () => {
      render(
        <Modal data-testid="Portal" open>
          <p>Hello World</p>
        </Modal>,
      );

      expect(screen.getByTestId('Portal')).to.have.tagName('div');
    });

    it('makes the child focusable without adding a role', () => {
      render(
        <Modal open>
          <div data-testid="child">Hello World</div>
        </Modal>,
      );

      expect(screen.getByTestId('child')).not.to.have.attribute('role');
      expect(screen.getByTestId('child')).to.have.attribute('tabIndex', '-1');
    });
  });

  describe('backdrop', () => {
    it('can render a custom backdrop component', () => {
      function TestBackdrop(props) {
        const { open } = props;
        if (!open) {
          return null;
        }

        return <div data-testid="backdrop" />;
      }

      render(
        <Modal open slots={{ backdrop: TestBackdrop }}>
          <div />
        </Modal>,
      );

      expect(screen.getByTestId('backdrop')).not.to.equal(null);
    });

    it('should render a backdrop component into the portal before the modal content', () => {
      render(
        <Modal open data-testid="modal">
          <div data-testid="container" />
        </Modal>,
      );

      const modal = screen.getByTestId('modal');
      const container = screen.getByTestId('container');
      expect(modal.children).to.have.length(4);
      expect(modal.children[0]).not.to.equal(undefined);
      expect(modal.children[0]).not.to.equal(null);
      expect(modal.children[2]).to.equal(container);
    });

    it('should pass prop to the transition component', () => {
      function TestBackdrop(props) {
        const { open, transitionDuration } = props;
        if (!open) {
          return null;
        }

        return <div data-testid="backdrop" data-timeout={transitionDuration} />;
      }
      render(
        <Modal
          open
          slots={{ backdrop: TestBackdrop }}
          slotProps={{
            backdrop: {
              transitionDuration: 200,
            },
          }}
        >
          <div />
        </Modal>,
      );

      expect(screen.getByTestId('backdrop')).to.have.attribute('data-timeout', '200');
    });

    it('should attach a handler to the backdrop that fires onClose', () => {
      const onClose = spy();

      render(
        <Modal
          onClose={onClose}
          open
          slotProps={{
            backdrop: {
              'data-testid': 'backdrop',
            },
          }}
        >
          <div />
        </Modal>,
      );

      screen.getByTestId('backdrop').click();

      expect(onClose).to.have.property('callCount', 1);
    });

    it('should let the user disable backdrop click triggering onClose', () => {
      function ModalWithDisabledBackdropClick(props) {
        const { onClose, ...other } = props;
        function handleClose(event, reason) {
          if (reason !== 'backdropClick') {
            onClose(event, reason);
          }
        }

        return <Modal onClose={handleClose} {...other} />;
      }
      const onClose = spy();

      render(
        <ModalWithDisabledBackdropClick
          onClose={onClose}
          open
          slotProps={{ backdrop: { 'data-testid': 'backdrop' } }}
        >
          <div />
        </ModalWithDisabledBackdropClick>,
      );

      screen.getByTestId('backdrop').click();

      expect(onClose).to.have.property('callCount', 0);
    });
  });

  describe('hide backdrop', () => {
    it('should not render a backdrop component into the portal before the modal content', () => {
      render(
        <Modal open hideBackdrop data-testid="modal">
          <div data-testid="container" />
        </Modal>,
      );

      const modal = screen.getByTestId('modal');
      const container = screen.getByTestId('container');
      expect(modal.children).to.have.length(3);
      expect(modal.children[1]).to.equal(container);
    });
  });

  describe('event: keydown', () => {
    it('when mounted, TopModal and event not esc should not call given functions', () => {
      const onCloseSpy = spy();

      render(
        <Modal open onClose={onCloseSpy}>
          <div data-testid="modal" tabIndex={-1} />
        </Modal>,
      );

      act(() => {
        screen.getByTestId('modal').focus();
      });

      fireEvent.keyDown(screen.getByTestId('modal'), {
        key: 'j', // Not escape
      });

      expect(onCloseSpy).to.have.property('callCount', 0);
    });

    it('should call onClose when Esc is pressed and stop event propagation', () => {
      const handleKeyDown = spy();
      const onCloseSpy = spy();

      render(
        <div onKeyDown={handleKeyDown}>
          <Modal open onClose={onCloseSpy}>
            <div data-testid="modal" tabIndex={-1} />
          </Modal>
        </div>,
      );

      act(() => {
        screen.getByTestId('modal').focus();
      });

      fireEvent.keyDown(screen.getByTestId('modal'), {
        key: 'Escape',
      });

      expect(onCloseSpy).to.have.property('callCount', 1);
      expect(handleKeyDown).to.have.property('callCount', 0);
    });

    it('should let the user disable escape key down triggering onClose', () => {
      function ModalWithDisabledEscapeKeyDown(props) {
        const { onClose, ...other } = props;
        function handleClose(event, reason) {
          if (reason !== 'escapeKeyDown') {
            onClose(event, reason);
          }
        }

        return <Modal onClose={handleClose} {...other} />;
      }
      const onClose = spy();

      render(
        <ModalWithDisabledEscapeKeyDown onClose={onClose} open>
          <div data-testid="modal" />
        </ModalWithDisabledEscapeKeyDown>,
      );

      fireEvent.focus(screen.getByTestId('modal'));
      fireEvent.keyDown(screen.getByTestId('modal'), {
        key: 'Escape',
      });

      expect(onClose).to.have.property('callCount', 0);
    });

    it('calls onKeyDown on the Modal', () => {
      const handleKeyDown = spy();

      render(
        <Modal open onKeyDown={handleKeyDown}>
          <button autoFocus data-testid="target" />
        </Modal>,
      );

      fireEvent.keyDown(screen.getByTestId('target'), { key: 'j' });

      expect(handleKeyDown).to.have.property('callCount', 1);
    });
  });

  describe('prop: keepMounted', () => {
    it('should keep the children in the DOM', () => {
      render(
        <Modal keepMounted open={false}>
          <div>
            <p data-testid="children">Hello World</p>
          </div>
        </Modal>,
      );

      expect(screen.getByTestId('children')).not.to.equal(null);
    });

    it('does not include the children in the a11y tree', () => {
      const modalRef = React.createRef();
      const { setProps } = render(
        <Modal keepMounted open={false} ref={modalRef}>
          <div>ModalContent</div>
        </Modal>,
      );
      const modalNode = modalRef.current;
      expect(modalNode).toBeInaccessible();

      setProps({ open: true });
      expect(modalNode).not.toBeInaccessible();
    });

    // Test case for https://github.com/mui/material-ui/issues/15180
    // TODO: how does this relate to `keepMounted`
    // TODO: never finishes
    it('should remove the transition children in the DOM when closed whilst transition status is entering', () => {
      class OpenClose extends React.Component {
        state = {
          open: false,
        };

        handleClick = () => {
          this.setState({ open: true }, () => {
            this.setState({ open: false });
          });
        };

        render() {
          return (
            <div>
              <button type="button" onClick={this.handleClick}>
                Toggle Tooltip
              </button>
              <Modal open={this.state.open}>
                <Fade in={this.state.open}>
                  <span>
                    <p data-testid="children">Hello World</p>
                  </span>
                </Fade>
              </Modal>
            </div>
          );
        }
      }
      render(<OpenClose />);
      expect(screen.queryByTestId('children')).to.equal(null);

      act(() => {
        screen.getByRole('button').click();
      });

      expect(screen.queryByTestId('children')).to.equal(null);
    });

    it('should hide a previously closed keepMounted modal when another modal opens above it', async () => {
      function Test() {
        const [firstOpen, setFirstOpen] = React.useState(false);
        const [secondOpen, setSecondOpen] = React.useState(false);
        const [thirdOpen, setThirdOpen] = React.useState(false);

        return (
          <React.Fragment>
            <button onClick={() => setFirstOpen(true)}>Open first</button>
            <Modal open={firstOpen}>
              <div>
                <button onClick={() => setSecondOpen(true)}>Open second</button>
              </div>
            </Modal>
            <Modal open={secondOpen} keepMounted data-testid="second-modal">
              <div>
                <button onClick={() => setThirdOpen(true)}>Open third</button>
              </div>
            </Modal>
            <Modal open={thirdOpen} data-testid="third-modal">
              <div>Third modal</div>
            </Modal>
          </React.Fragment>
        );
      }

      const { user } = render(<Test />);
      const secondModal = screen.getByTestId('second-modal');

      // Material UI sets this attribute itself while the modal is closed.
      expect(secondModal).to.have.attribute('aria-hidden', 'true');

      await user.click(screen.getByRole('button', { name: 'Open first' }));
      await user.click(screen.getByRole('button', { name: 'Open second' }));
      expect(secondModal).not.toBeInaccessible();

      await user.click(screen.getByRole('button', { name: 'Open third' }));
      expect(screen.getByTestId('third-modal')).not.toBeInaccessible();
      expect(secondModal).toBeInaccessible();
    });
  });

  describe('focus', () => {
    let initialFocus = null;

    beforeEach(() => {
      initialFocus = document.createElement('button');
      initialFocus.tabIndex = 0;
      document.body.appendChild(initialFocus);
      act(() => {
        initialFocus.focus();
      });
    });

    afterEach(() => {
      document.body.removeChild(initialFocus);
    });

    it('should focus on the modal when it is opened', () => {
      const { setProps } = render(
        <Modal open>
          <div data-testid="modal">Foo</div>
        </Modal>,
      );

      expect(screen.getByTestId('modal')).toHaveFocus();

      setProps({ open: false });

      expect(initialFocus).toHaveFocus();
    });

    it('should support autoFocus', () => {
      const { setProps } = render(
        <Modal open>
          <div>
            <input data-testid="auto-focus" type="text" autoFocus />
          </div>
        </Modal>,
        // TODO: https://github.com/reactwg/react-18/discussions/18#discussioncomment-893076
        { strictEffects: false },
      );

      expect(screen.getByTestId('auto-focus')).toHaveFocus();

      setProps({ open: false });

      expect(initialFocus).toHaveFocus();
    });

    it('should keep focus on the modal when it is closed', () => {
      const { setProps } = render(
        <Modal open disableRestoreFocus>
          <div data-testid="modal">Foo</div>
        </Modal>,
      );

      expect(screen.getByTestId('modal')).toHaveFocus();

      setProps({ open: false });

      expect(document.body).toHaveFocus();
    });

    it('should not focus on the modal when disableAutoFocus is true', () => {
      render(
        <Modal open disableAutoFocus>
          <div>Foo</div>
        </Modal>,
      );

      expect(initialFocus).toHaveFocus();
    });

    describe('focus stealing', () => {
      clock.withFakeTimers();

      // TODO: Unclear why this fails. Not important
      // since a browser test gives us more confidence anyway
      it.skipIf(isJsdom())('does not steal focus from other frames', function test() {
        const FrameContext = React.createContext(document);
        // by default Modal will use the document where the module! was initialized
        // which is usually the top document
        function FramedModal(props) {
          const document = React.useContext(FrameContext);

          return <Modal container={document.body} {...props} />;
        }
        // react requires some more work to get <iframe>{children}</iframe> working
        // see "DemoFrame" in our docs for a documented implementation
        function IFrame(props) {
          const { children } = props;
          const frameRef = React.useRef(null);
          const [iframeLoaded, onLoad] = React.useReducer(() => true, false);

          React.useEffect(() => {
            const document = frameRef.current.contentDocument;

            if (document != null && document.readyState === 'complete' && !iframeLoaded) {
              onLoad();
            }
          }, [iframeLoaded]);

          const document = frameRef.current?.contentDocument;
          return (
            <React.Fragment>
              <iframe onLoad={onLoad} ref={frameRef} />
              {iframeLoaded !== false
                ? ReactDOM.createPortal(
                    <FrameContext.Provider value={document}>{children}</FrameContext.Provider>,
                    document.body,
                  )
                : null}
            </React.Fragment>
          );
        }

        render(
          <React.Fragment>
            <input data-testid="foreign-input" type="text" />
            <IFrame>
              <FramedModal open>
                <div data-testid="modal" />
              </FramedModal>
            </IFrame>
          </React.Fragment>,
        );

        act(() => {
          screen.getByTestId('foreign-input').focus();
        });
        // wait for the `contain` interval check to kick in.
        clock.tick(500);

        expect(screen.getByTestId('foreign-input')).toHaveFocus();
      });
    });

    describe('when starting open and closing immediately', () => {
      clock.withFakeTimers();

      // Test case for https://github.com/mui/material-ui/issues/12831
      it('should unmount the children', () => {
        function TestCase() {
          const [open, setOpen] = React.useState(true);

          React.useEffect(() => {
            setOpen(false);
          }, []);

          return (
            <Modal open={open}>
              {/* TODO: Look into why this test started to fail with React 19 when using a transition component as children. */}
              {/* See: https://github.com/mui/material-ui/issues/43312 */}
              <div id="modal-body">hello</div>
            </Modal>
          );
        }
        render(<TestCase />);
        expect(document.querySelector('#modal-body')).to.equal(null);
      });
    });
  });

  describe('two modal at the same time', () => {
    clock.withFakeTimers();

    it('should open and close', () => {
      function TestCase(props) {
        return (
          <React.Fragment>
            <Modal open={props.open}>
              <div>Hello</div>
            </Modal>
            <Modal open={props.open}>
              <div>World</div>
            </Modal>
          </React.Fragment>
        );
      }
      TestCase.propTypes = {
        open: PropTypes.bool,
      };

      const { setProps } = render(<TestCase open={false} />);

      expect(document.body.style).to.have.property('overflow', '');

      setProps({ open: true });

      expect(document.body.style).to.have.property('overflow', 'hidden');

      setProps({ open: false });

      expect(document.body.style).to.have.property('overflow', '');
    });

    it('should open and close with Transitions', () => {
      function TestCase(props) {
        return (
          <React.Fragment>
            <Modal open={props.open}>
              <Fade onEntered={props.onEntered} onExited={props.onExited} in={props.open}>
                <div>Hello</div>
              </Fade>
            </Modal>
            <Modal open={props.open}>
              <div>World</div>
            </Modal>
          </React.Fragment>
        );
      }

      const handleEntered = spy();
      const handleExited = spy();
      const { setProps } = render(
        <TestCase onEntered={handleEntered} onExited={handleExited} open={false} />,
      );

      expect(document.body.style).to.have.property('overflow', '');

      setProps({ open: true });
      clock.runToLast();

      expect(handleEntered.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(0);
      expect(document.body.style).to.have.property('overflow', 'hidden');

      setProps({ open: false });
      clock.runToLast();

      expect(handleEntered.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(1);
      expect(document.body.style).to.have.property('overflow', '');
    });
  });

  it('should support open abort', () => {
    class TestCase extends React.Component {
      state = {
        open: true,
      };

      componentDidMount() {
        this.setState({
          open: false,
        });
      }

      render() {
        return (
          <Modal open={this.state.open}>
            <div>Hello</div>
          </Modal>
        );
      }
    }
    render(<TestCase />);
  });

  describe('prop: closeAfterTransition', () => {
    clock.withFakeTimers();

    it('when true it should close after Transition has finished', () => {
      function TestCase(props) {
        return (
          <Modal open={props.open} closeAfterTransition>
            <Fade
              onEntered={props.onEntered}
              onExiting={props.onExiting}
              onExited={props.onExited}
              in={props.open}
            >
              <div>Hello</div>
            </Fade>
          </Modal>
        );
      }
      const handleEntered = spy();
      const handleExiting = spy();
      const handleExited = spy();

      const { setProps } = render(
        <TestCase
          onEntered={handleEntered}
          onExiting={handleExiting}
          onExited={handleExited}
          open={false}
        />,
      );

      expect(handleEntered.callCount).to.equal(0);
      expect(handleExiting.callCount).to.equal(0);
      expect(handleExited.callCount).to.equal(0);
      expect(document.body.style).to.have.property('overflow', '');

      setProps({ open: true });
      clock.runToLast();

      expect(handleEntered.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(0);
      expect(handleExited.callCount).to.equal(0);
      expect(document.body.style).to.have.property('overflow', 'hidden');

      setProps({ open: false });

      expect(handleEntered.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(0);
      expect(document.body.style).to.have.property('overflow', 'hidden');

      act(() => {
        clock.runToLast();
      });

      expect(handleEntered.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(1);
      expect(document.body.style).to.have.property('overflow', '');
    });

    it('when false it should close before Transition has finished', () => {
      function TestCase(props) {
        return (
          <Modal open={props.open} closeAfterTransition={false}>
            <Fade
              onEntered={props.onEntered}
              onExiting={props.onExiting}
              onExited={props.onExited}
              in={props.open}
            >
              <div>Hello</div>
            </Fade>
          </Modal>
        );
      }
      const handleEntered = spy();
      const handleExiting = spy();
      const handleExited = spy();

      const { setProps } = render(
        <TestCase
          onEntered={handleEntered}
          onExiting={handleExiting}
          onExited={handleExited}
          open={false}
        />,
      );

      expect(handleEntered.callCount).to.equal(0);
      expect(handleExiting.callCount).to.equal(0);
      expect(handleExited.callCount).to.equal(0);
      expect(document.body.style).to.have.property('overflow', '');

      setProps({ open: true });
      clock.runToLast();

      expect(handleEntered.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(0);
      expect(handleExited.callCount).to.equal(0);
      expect(document.body.style).to.have.property('overflow', 'hidden');

      setProps({ open: false });

      expect(handleEntered.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(0);
      expect(document.body.style).to.have.property('overflow', '');

      clock.runToLast();

      expect(handleEntered.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(1);
      expect(document.body.style).to.have.property('overflow', '');
    });
  });

  describe('prop: container', () => {
    clock.withFakeTimers();

    it('should be able to change the container', () => {
      function TestCase(props) {
        const { anchorEl } = props;
        return (
          <Modal open={Boolean(anchorEl)} container={anchorEl}>
            <Fade in={Boolean(anchorEl)}>
              <div>Hello</div>
            </Fade>
          </Modal>
        );
      }

      const { setProps } = render(<TestCase anchorEl={null} />);
      setProps({ anchorEl: document.body });
      setProps({ anchorEl: null });
      setProps({ anchorEl: document.body });
    });

    it('should finish closing when the container changes during the exit transition', () => {
      function TestCase(props) {
        const firstContainerRef = React.useRef(null);
        const secondContainerRef = React.useRef(null);
        const getContainer = React.useCallback(
          () =>
            props.containerIndex === 0 ? firstContainerRef.current : secondContainerRef.current,
          [props.containerIndex],
        );

        return (
          <React.Fragment>
            <div data-testid="first-container" ref={firstContainerRef} />
            <div data-testid="second-container" ref={secondContainerRef} />
            <Modal
              data-testid="modal"
              open={props.open}
              container={getContainer}
              closeAfterTransition
              onTransitionExited={props.onTransitionExited}
            >
              <Fade
                in={props.open}
                timeout={100}
                onExit={props.onExit}
                onExiting={props.onExiting}
                onExited={props.onExited}
              >
                <div>Content</div>
              </Fade>
            </Modal>
          </React.Fragment>
        );
      }

      const handleExit = spy();
      const handleExiting = spy();
      const handleExited = spy();
      const handleTransitionExited = spy();
      const { setProps } = render(
        <TestCase
          open
          containerIndex={0}
          onExit={handleExit}
          onExiting={handleExiting}
          onExited={handleExited}
          onTransitionExited={handleTransitionExited}
        />,
      );

      act(() => {
        clock.runToLast();
      });
      const firstContainer = screen.getByTestId('first-container');
      const secondContainer = screen.getByTestId('second-container');
      expect(within(firstContainer).getByTestId('modal')).not.to.equal(null);

      setProps({ open: false, containerIndex: 0 });
      expect(handleExit.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(0);
      expect(handleTransitionExited.callCount).to.equal(0);

      act(() => {
        clock.tick(50);
      });
      setProps({ open: false, containerIndex: 1 });

      expect(within(firstContainer).getByTestId('modal')).not.to.equal(null);
      expect(within(secondContainer).queryByTestId('modal')).to.equal(null);
      expect(handleExit.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(0);
      expect(handleTransitionExited.callCount).to.equal(0);

      act(() => {
        clock.tick(50);
      });
      expect(screen.queryByTestId('modal')).to.equal(null);
      expect(handleExit.callCount).to.equal(1);
      expect(handleExiting.callCount).to.equal(1);
      expect(handleExited.callCount).to.equal(1);
      expect(handleTransitionExited.callCount).to.equal(1);
      expect(firstContainer.style).to.have.property('overflow', '');

      setProps({ open: true, containerIndex: 1 });
      act(() => {
        clock.runToLast();
      });
      expect(within(firstContainer).queryByTestId('modal')).to.equal(null);
      expect(within(secondContainer).getByTestId('modal')).not.to.equal(null);
    });
  });

  describe('prop: disablePortal', () => {
    it('should render the content into the parent', () => {
      render(
        <div data-testid="parent">
          <Modal open disablePortal>
            <div data-testid="child" />
          </Modal>
        </div>,
      );

      expect(within(screen.getByTestId('parent')).getByTestId('child')).not.to.equal(null);
    });

    it('should keep the modal and its ancestors accessible while hiding their siblings', () => {
      render(
        <div data-testid="outer">
          <div data-testid="outer-sibling" />
          <div data-testid="inner">
            <div data-testid="inner-sibling" />
            <Modal open disablePortal>
              <div data-testid="modal-content" />
            </Modal>
          </div>
        </div>,
      );

      expect(screen.getByTestId('outer')).not.toBeInaccessible();
      expect(screen.getByTestId('inner')).not.toBeInaccessible();
      expect(screen.getByTestId('modal-content')).not.toBeInaccessible();

      expect(screen.getByTestId('outer-sibling')).toBeInaccessible();
      expect(screen.getByTestId('inner-sibling')).toBeInaccessible();
    });
  });

  describe('prop: slotProps.backdrop', () => {
    it('should handle custom className', () => {
      render(
        <Modal
          open
          slotProps={{ backdrop: { className: 'custom-backdrop', 'data-testid': 'backdrop' } }}
        >
          <div />
        </Modal>,
      );

      expect(screen.getByTestId('backdrop')).to.have.class('custom-backdrop');
    });
  });

  it('should not warn when onTransitionEnter and onTransitionExited are provided', () => {
    expect(() => {
      render(
        <Modal open onTransitionEnter={() => {}} onTransitionExited={() => {}}>
          <div />
        </Modal>,
      );
    }).not.toErrorDev();
  });

  it('should not override default onKeyDown', async () => {
    const handleKeyDown = spy();
    const handleClose = spy();

    const { user } = render(
      <Modal open onKeyDown={handleKeyDown} onClose={handleClose}>
        <div tabIndex={-1} />
      </Modal>,
    );

    await user.keyboard('{Escape}');

    expect(handleKeyDown).to.have.property('callCount', 1);
    expect(handleClose).to.have.property('callCount', 1);
  });
});
