'use client';
import * as React from 'react';
import ownerDocument from '@mui/utils/ownerDocument';
import useForkRef from '@mui/utils/useForkRef';
import useEventCallback from '@mui/utils/useEventCallback';
import createChainedFunction from '@mui/utils/createChainedFunction';
import extractEventHandlers from '@mui/utils/extractEventHandlers';
import type { EventHandlers } from '../utils/types';
import { ModalManager, ariaHidden } from './ModalManager';
import type {
  UseModalParameters,
  UseModalReturnValue,
  UseModalRootSlotProps,
  UseModalBackdropSlotProps,
} from './useModal.types';

function getContainer(container: UseModalParameters['container']) {
  return typeof container === 'function' ? container() : container;
}

function getHasTransition(children: UseModalParameters['children']) {
  return children ? children.props.hasOwnProperty('in') : false;
}

const noop = () => {};

// A modal manager used to track and manage the state of open Modals.
// Modals don't open on the server so this won't conflict with concurrent requests.
const manager = new ModalManager();

function useModal(parameters: UseModalParameters): UseModalReturnValue {
  const {
    container,
    disableScrollLock = false,
    closeAfterTransition = false,
    onTransitionEnter,
    onTransitionExited,
    children,
    onClose,
    open,
    rootRef,
  } = parameters;

  // @ts-expect-error: The modal refs are assigned after render; the initial ref object is empty.
  const modal = React.useRef<{ modalRef: HTMLDivElement; mount: HTMLElement }>({});
  const mountNodeRef = React.useRef<HTMLElement>(null);
  const lastMountNodeRef = React.useRef<HTMLElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const handleRef = useForkRef(modalRef, rootRef);
  const [exited, setExited] = React.useState(!open);
  const hasTransition = getHasTransition(children);

  let ariaHiddenProp = true;
  if (parameters['aria-hidden'] === 'false' || parameters['aria-hidden'] === false) {
    ariaHiddenProp = false;
  }

  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current!;
    modal.current.mount = mountNodeRef.current!;
    return modal.current;
  };

  const handleMounted = () => {
    manager.mount(getModal(), { disableScrollLock });

    // Fix a bug on Chrome where the scroll isn't initially 0.
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  };

  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer(container) || getDoc().body;

    manager.add(getModal(), resolvedContainer as HTMLElement);

    // The element was already mounted.
    if (modalRef.current) {
      handleMounted();
    }
  });

  const isTopModal = () => manager.isTopModal(getModal());

  const handlePortalRef = useEventCallback((node: HTMLElement | null) => {
    mountNodeRef.current = node;

    if (!node) {
      return;
    }

    lastMountNodeRef.current = node;

    if (open && isTopModal()) {
      handleMounted();
    } else if (modalRef.current) {
      ariaHidden(modalRef.current, ariaHiddenProp);
    }
  });

  const handleClose = React.useCallback(() => {
    manager.remove(getModal(), ariaHiddenProp);
  }, [ariaHiddenProp]);

  React.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);

  React.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);

  const createHandleKeyDown = (otherHandlers: EventHandlers) => (event: React.KeyboardEvent) => {
    otherHandlers.onKeyDown?.(event);

    // The handler doesn't take event.defaultPrevented into account:
    //
    // event.preventDefault() is meant to stop default behaviors like
    // clicking a checkbox to check it, hitting a button to submit a form,
    // and hitting left arrow to move the cursor in a text input etc.
    // Only special HTML elements have these default behaviors.
    if (
      event.key !== 'Escape' ||
      event.which === 229 || // Wait until IME is settled.
      !isTopModal()
    ) {
      return;
    }

    // Swallow the event, in case someone is listening for the escape key on the body.
    event.stopPropagation();

    if (onClose) {
      onClose(event, 'escapeKeyDown');
    }
  };

  const createHandleBackdropClick = (otherHandlers: EventHandlers) => (event: React.MouseEvent) => {
    otherHandlers.onClick?.(event);

    if (event.target !== event.currentTarget) {
      return;
    }

    if (onClose) {
      onClose(event, 'backdropClick');
    }
  };

  const getRootProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseModalRootSlotProps<TOther> => {
    const propsEventHandlers = extractEventHandlers(parameters) as Partial<UseModalParameters>;

    // The custom event handlers shouldn't be spread on the root element
    delete propsEventHandlers.onTransitionEnter;
    delete propsEventHandlers.onTransitionExited;

    const externalEventHandlers = {
      ...propsEventHandlers,
      ...otherHandlers,
    };

    return {
      /*
       * Marking an element with the role presentation indicates to assistive technology
       * that this element should be ignored; it exists to support the web application and
       * is not meant for humans to interact with directly.
       * https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
       */
      role: 'presentation',
      ...externalEventHandlers,
      onKeyDown: createHandleKeyDown(externalEventHandlers),
      ref: handleRef,
    };
  };

  const getBackdropProps = <TOther extends EventHandlers = {}>(
    otherHandlers: TOther = {} as TOther,
  ): UseModalBackdropSlotProps<TOther> => {
    const externalEventHandlers = otherHandlers;

    return {
      'aria-hidden': true,
      ...externalEventHandlers,
      onClick: createHandleBackdropClick(externalEventHandlers),
      open,
    };
  };

  const getTransitionProps = () => {
    const handleEnter = () => {
      setExited(false);

      if (onTransitionEnter) {
        onTransitionEnter();
      }
    };

    const handleExited = () => {
      setExited(true);

      if (onTransitionExited) {
        onTransitionExited();
      }

      if (closeAfterTransition) {
        handleClose();
      }
    };

    return {
      onEnter: createChainedFunction(handleEnter, children?.props.onEnter ?? noop),
      onExited: createChainedFunction(handleExited, children?.props.onExited ?? noop),
    };
  };

  // Changing a portal's container remounts its children. Keep an exiting transition in its
  // current container so it can finish and notify the modal that it is safe to unmount.
  const portalContainer =
    !open && hasTransition && !exited ? (lastMountNodeRef.current ?? container) : container;

  return {
    getRootProps,
    getBackdropProps,
    getTransitionProps,
    rootRef: handleRef,
    portalRef: handlePortalRef,
    portalContainer,
    isTopModal,
    exited,
    hasTransition,
  };
}

export default useModal;
