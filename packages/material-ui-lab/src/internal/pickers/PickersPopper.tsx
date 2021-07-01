import * as React from 'react';
import Grow from '@material-ui/core/Grow';
import Paper, { PaperProps as MuiPaperProps } from '@material-ui/core/Paper';
import Popper, { PopperProps as MuiPopperProps } from '@material-ui/core/Popper';
import TrapFocus, {
  TrapFocusProps as MuiTrapFocusProps,
} from '@material-ui/core/Unstable_TrapFocus';
import { useForkRef, useEventCallback, ownerDocument } from '@material-ui/core/utils';
import { styled } from '@material-ui/core/styles';
import { TransitionProps as MuiTransitionProps } from '@material-ui/core/transitions';

export interface ExportedPickerPopperProps {
  /**
   * Popper props passed down to [Popper](https://material-ui.com/api/popper/) component.
   */
  PopperProps?: Partial<MuiPopperProps>;
  /**
   * Custom component for popper [Transition](https://material-ui.com/components/transitions/#transitioncomponent-prop).
   */
  TransitionComponent?: React.JSXElementConstructor<MuiTransitionProps>;
}

export interface PickerPopperProps extends ExportedPickerPopperProps, MuiPaperProps {
  role: 'tooltip' | 'dialog';
  TrapFocusProps?: Partial<MuiTrapFocusProps>;
  anchorEl: MuiPopperProps['anchorEl'];
  open: MuiPopperProps['open'];
  containerRef?: React.Ref<HTMLDivElement>;
  onClose: () => void;
}

const PickersPopperRoot = styled(Popper, { skipSx: true })<{ styleProps: PickerPopperProps }>(
  ({ theme }) => ({
    zIndex: theme.zIndex.modal,
  }),
);

const PickersPopperPaper = styled(Paper, { skipSx: true })<{
  styleProps: PickerPopperProps & Pick<MuiPopperProps, 'placement'>;
}>(({ styleProps }) => ({
  transformOrigin: 'top center',
  outline: 0,
  ...(styleProps.placement === 'top' && {
    transformOrigin: 'bottom center',
  }),
}));

function clickedRootScrollbar(event: MouseEvent, doc: Document) {
  return (
    doc.documentElement.clientWidth < event.clientX ||
    doc.documentElement.clientHeight < event.clientY
  );
}

/**
 * Based on @material-ui/core/ClickAwayListener without the customization.
 * We can probably strip away even more since children won't be portaled.
 *
 * @param onClickAway
 * @param onClick
 * @param onTouchStart
 */
function useClickAwayListener(
  active: boolean,
  onClickAway: (event: MouseEvent | TouchEvent) => void,
): [React.Ref<Element>, React.MouseEventHandler, React.TouchEventHandler] {
  const movedRef = React.useRef(false);
  const syntheticEventRef = React.useRef(false);

  const nodeRef = React.useRef<Element>(null);

  const activatedRef = React.useRef(false);
  React.useEffect(() => {
    if (!active) {
      return undefined;
    }

    // Ensure that this hook is not "activated" synchronously.
    // https://github.com/facebook/react/issues/20074
    function armClickAwayListener() {
      activatedRef.current = true;
    }

    document.addEventListener('mousedown', armClickAwayListener, true);
    document.addEventListener('touchstart', armClickAwayListener, true);

    return () => {
      document.removeEventListener('mousedown', armClickAwayListener, true);
      document.removeEventListener('touchstart', armClickAwayListener, true);
      activatedRef.current = false;
    };
  }, [active]);

  // The handler doesn't take event.defaultPrevented into account:
  //
  // event.preventDefault() is meant to stop default behaviors like
  // clicking a checkbox to check it, hitting a button to submit a form,
  // and hitting left arrow to move the cursor in a text input etc.
  // Only special HTML elements have these default behaviors.
  const handleClickAway = useEventCallback((event: MouseEvent | TouchEvent) => {
    if (!activatedRef.current) {
      return;
    }

    // Given developers can stop the propagation of the synthetic event,
    // we can only be confident with a positive value.
    const insideReactTree = syntheticEventRef.current;
    syntheticEventRef.current = false;

    const doc = ownerDocument(nodeRef.current);

    // 1. IE11 support, which trigger the handleClickAway even after the unbind
    // 2. The child might render null.
    // 3. Behave like a blur listener.
    if (
      !nodeRef.current ||
      // is a TouchEvent?
      ('clientX' in event && clickedRootScrollbar(event, doc))
    ) {
      return;
    }

    // Do not act if user performed touchmove
    if (movedRef.current) {
      movedRef.current = false;
      return;
    }

    let insideDOM;

    // If not enough, can use https://github.com/DieterHolvoet/event-propagation-path/blob/master/propagationPath.js
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(nodeRef.current) > -1;
    } else {
      insideDOM =
        !doc.documentElement.contains(event.target as Node | null) ||
        nodeRef.current.contains(event.target as Node | null);
    }

    if (!insideDOM && !insideReactTree) {
      onClickAway(event);
    }
  });

  // Keep track of mouse/touch events that bubbled up through the portal.
  const handleSynthetic = () => {
    syntheticEventRef.current = true;
  };

  React.useEffect(() => {
    if (active) {
      const doc = ownerDocument(nodeRef.current);

      const handleTouchMove = () => {
        movedRef.current = true;
      };

      doc.addEventListener('touchstart', handleClickAway);
      doc.addEventListener('touchmove', handleTouchMove);

      return () => {
        doc.removeEventListener('touchstart', handleClickAway);
        doc.removeEventListener('touchmove', handleTouchMove);
      };
    }
    return undefined;
  }, [active, handleClickAway]);

  React.useEffect(() => {
    // TODO This behavior is not tested automatically
    // It's unclear whether this is due to different update semantics in test (batched in act() vs discrete on click).
    // Or if this is a timing related issues due to different Transition components
    // Once we get rid of all the manual scheduling (e.g. setTimeout(update, 0)) we can revisit this code+test.
    if (active) {
      const doc = ownerDocument(nodeRef.current);

      doc.addEventListener('click', handleClickAway);

      return () => {
        doc.removeEventListener('click', handleClickAway);
      };
    }
    return undefined;
  }, [active, handleClickAway]);

  return [nodeRef, handleSynthetic, handleSynthetic];
}

const PickersPopper = (props: PickerPopperProps) => {
  const {
    anchorEl,
    children,
    containerRef = null,
    onClose,
    open,
    PopperProps,
    role,
    TransitionComponent = Grow,
    TrapFocusProps,
  } = props;

  React.useEffect(() => {
    function handleKeyDown(nativeEvent: KeyboardEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const lastFocusedElementRef = React.useRef<Element | null>(null);
  React.useEffect(() => {
    if (role === 'tooltip') {
      return;
    }

    if (open) {
      lastFocusedElementRef.current = document.activeElement;
    } else if (
      lastFocusedElementRef.current &&
      lastFocusedElementRef.current instanceof HTMLElement
    ) {
      lastFocusedElementRef.current.focus();
    }
  }, [open, role]);

  const [clickAwayRef, onPaperClick, onPaperTouchStart] = useClickAwayListener(open, onClose);
  const paperRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(paperRef, containerRef);
  const handlePaperRef = useForkRef(handleRef, clickAwayRef as React.Ref<HTMLDivElement>);

  const styleProps = props;

  return (
    <PickersPopperRoot
      transition
      role={role}
      open={open}
      anchorEl={anchorEl}
      styleProps={styleProps}
      {...PopperProps}
    >
      {({ TransitionProps, placement }) => (
        <TrapFocus
          open={open}
          disableAutoFocus
          disableEnforceFocus={role === 'tooltip'}
          isEnabled={() => true}
          {...TrapFocusProps}
        >
          <TransitionComponent {...TransitionProps}>
            <PickersPopperPaper
              tabIndex={-1}
              elevation={8}
              ref={handlePaperRef}
              onClick={onPaperClick}
              onTouchStart={onPaperTouchStart}
              styleProps={{ ...styleProps, placement }}
            >
              {children}
            </PickersPopperPaper>
          </TransitionComponent>
        </TrapFocus>
      )}
    </PickersPopperRoot>
  );
};

export default PickersPopper;
