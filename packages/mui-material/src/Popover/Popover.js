'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import HTMLElementType from '@mui/utils/HTMLElementType';
import refType from '@mui/utils/refType';
import integerPropType from '@mui/utils/integerPropType';
import chainPropTypes from '@mui/utils/chainPropTypes';
import isHostComponent from '@mui/utils/isHostComponent';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import isLayoutSupported from '../utils/isLayoutSupported';
import debounce from '../utils/debounce';
import ownerDocument from '../utils/ownerDocument';
import ownerWindow from '../utils/ownerWindow';
import Grow from '../Grow';
import Modal from '../Modal';
import PaperBase from '../Paper';
import { getPopoverUtilityClass } from './popoverClasses';
import useSlot from '../utils/useSlot';
import mergeSlotProps from '../utils/mergeSlotProps';

export function getOffsetTop(rect, vertical) {
  let offset = 0;

  if (typeof vertical === 'number') {
    offset = vertical;
  } else if (vertical === 'center') {
    offset = rect.height / 2;
  } else if (vertical === 'bottom') {
    offset = rect.height;
  }

  return offset;
}

export function getOffsetLeft(rect, horizontal) {
  let offset = 0;

  if (typeof horizontal === 'number') {
    offset = horizontal;
  } else if (horizontal === 'center') {
    offset = rect.width / 2;
  } else if (horizontal === 'right') {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === 'number' ? `${n}px` : n))
    .join(' ');
}

function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    paper: ['paper'],
  };

  return composeClasses(slots, getPopoverUtilityClass, classes);
};

export const PopoverRoot = styled(Modal, {
  name: 'MuiPopover',
  slot: 'Root',
})({});

export const PopoverPaper = styled(PaperBase, {
  name: 'MuiPopover',
  slot: 'Paper',
})({
  position: 'absolute',
  overflowY: 'auto',
  overflowX: 'hidden',
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: 'calc(100% - 32px)',
  maxHeight: 'calc(100% - 32px)',
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
});

const Popover = React.forwardRef(function Popover(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPopover' });
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    anchorPosition,
    anchorReference = 'anchorEl',
    children,
    className,
    container: containerProp,
    disableAutoFocus = false,
    elevation = 8,
    marginThreshold = 16,
    open,
    slots = {},
    slotProps = {},
    transformOrigin = {
      vertical: 'top',
      horizontal: 'left',
    },
    transitionDuration: transitionDurationProp = 'auto',
    disableScrollLock = false,
    ...other
  } = props;

  const paperRef = React.useRef();

  const ownerState = {
    ...props,
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    transformOrigin,
    transitionDuration: transitionDurationProp,
  };

  const classes = useUtilityClasses(ownerState);

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  const getAnchorOffset = React.useCallback(() => {
    if (anchorReference === 'anchorPosition') {
      if (process.env.NODE_ENV !== 'production') {
        if (!anchorPosition) {
          console.error(
            'MUI: You need to provide a `anchorPosition` prop when using ' +
              '<Popover anchorReference="anchorPosition" />.',
          );
        }
      }
      return anchorPosition;
    }

    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // If an anchor element wasn't provided, just use the parent body element of this Popover
    const anchorElement =
      resolvedAnchorEl && resolvedAnchorEl.nodeType === 1
        ? resolvedAnchorEl
        : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();

    if (process.env.NODE_ENV !== 'production') {
      const box = anchorElement.getBoundingClientRect();

      if (
        isLayoutSupported() &&
        box.top === 0 &&
        box.left === 0 &&
        box.right === 0 &&
        box.bottom === 0
      ) {
        console.warn(
          [
            'MUI: The `anchorEl` prop provided to the component is invalid.',
            'The anchor element should be part of the document layout.',
            "Make sure the element is present in the document or that it's not display none.",
          ].join('\n'),
        );
      }
    }

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);

  // Returns the base transform origin using the element
  const getTransformOrigin = React.useCallback(
    (elemRect) => {
      return {
        vertical: getOffsetTop(elemRect, transformOrigin.vertical),
        horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
      };
    },
    [transformOrigin.horizontal, transformOrigin.vertical],
  );

  const getPositioningStyle = React.useCallback(
    (element) => {
      const elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      };

      // Get the transform origin point on the element itself
      const elemTransformOrigin = getTransformOrigin(elemRect);

      if (anchorReference === 'none') {
        return {
          top: null,
          left: null,
          transformOrigin: getTransformOriginValue(elemTransformOrigin),
        };
      }

      // Get the offset of the anchoring element
      const anchorOffset = getAnchorOffset();

      // Calculate element positioning
      let top = anchorOffset.top - elemTransformOrigin.vertical;
      let left = anchorOffset.left - elemTransformOrigin.horizontal;
      const bottom = top + elemRect.height;
      const right = left + elemRect.width;

      // Use the parent window of the anchorEl if provided
      const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));

      // Window thresholds taking required margin into account
      const heightThreshold = containerWindow.innerHeight - marginThreshold;
      const widthThreshold = containerWindow.innerWidth - marginThreshold;

      // Check if the vertical axis needs shifting
      if (marginThreshold != null && top < marginThreshold) {
        const diff = top - marginThreshold;

        top -= diff;

        elemTransformOrigin.vertical += diff;
      } else if (marginThreshold != null && bottom > heightThreshold) {
        const diff = bottom - heightThreshold;

        top -= diff;

        elemTransformOrigin.vertical += diff;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (elemRect.height > heightThreshold && elemRect.height && heightThreshold) {
          console.error(
            [
              'MUI: The popover component is too tall.',
              `Some part of it can not be seen on the screen (${
                elemRect.height - heightThreshold
              }px).`,
              'Please consider adding a `max-height` to improve the user-experience.',
            ].join('\n'),
          );
        }
      }

      // Check if the horizontal axis needs shifting
      if (marginThreshold != null && left < marginThreshold) {
        const diff = left - marginThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      } else if (right > widthThreshold) {
        const diff = right - widthThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      }

      return {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        transformOrigin: getTransformOriginValue(elemTransformOrigin),
      };
    },
    [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold],
  );

  const [isPositioned, setIsPositioned] = React.useState(open);

  const setPositioningStyles = React.useCallback(() => {
    const element = paperRef.current;

    if (!element) {
      return;
    }

    const positioning = getPositioningStyle(element);

    if (positioning.top != null) {
      element.style.setProperty('top', positioning.top);
    }
    if (positioning.left != null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
    setIsPositioned(true);
  }, [getPositioningStyle]);

  React.useEffect(() => {
    if (disableScrollLock) {
      window.addEventListener('scroll', setPositioningStyles);
    }
    return () => window.removeEventListener('scroll', setPositioningStyles);
  }, [anchorEl, disableScrollLock, setPositioningStyles]);

  const handleEntering = () => {
    setPositioningStyles();
  };

  const handleExited = () => {
    setIsPositioned(false);
  };

  React.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });

  React.useImperativeHandle(
    action,
    () =>
      open
        ? {
            updatePosition: () => {
              setPositioningStyles();
            },
          }
        : null,
    [open, setPositioningStyles],
  );

  React.useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleResize = debounce(() => {
      setPositioningStyles();
    });

    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);

  let transitionDuration = transitionDurationProp;

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [TransitionSlot, transitionSlotProps] = useSlot('transition', {
    elementType: Grow,
    externalForwardedProps,
    ownerState,
    getSlotProps: (handlers) => ({
      ...handlers,
      onEntering: (element, isAppearing) => {
        handlers.onEntering?.(element, isAppearing);
        handleEntering();
      },
      onExited: (element) => {
        handlers.onExited?.(element);
        handleExited();
      },
    }),
    additionalProps: {
      appear: true,
      in: open,
    },
  });

  if (transitionDurationProp === 'auto' && !TransitionSlot.muiSupportAuto) {
    transitionDuration = undefined;
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  const container =
    containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : undefined);

  const [RootSlot, { slots: rootSlotsProp, slotProps: rootSlotPropsProp, ...rootProps }] = useSlot(
    'root',
    {
      ref,
      elementType: PopoverRoot,
      externalForwardedProps: {
        ...externalForwardedProps,
        ...other,
      },
      shouldForwardComponentProp: true,
      additionalProps: {
        slots: { backdrop: slots.backdrop },
        slotProps: {
          backdrop: mergeSlotProps(
            typeof slotProps.backdrop === 'function'
              ? slotProps.backdrop(ownerState)
              : slotProps.backdrop,
            { invisible: true },
          ),
        },
        container,
        open,
      },
      ownerState,
      className: clsx(classes.root, className),
    },
  );

  const [PaperSlot, paperProps] = useSlot('paper', {
    ref: paperRef,
    className: classes.paper,
    elementType: PopoverPaper,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    additionalProps: {
      elevation,
      style: isPositioned ? undefined : { opacity: 0 },
    },
    ownerState,
  });

  return (
    <RootSlot
      {...rootProps}
      {...(!isHostComponent(RootSlot) && {
        slots: rootSlotsProp,
        slotProps: rootSlotPropsProp,
        disableAutoFocus,
        disableScrollLock,
      })}
    >
      <TransitionSlot {...transitionSlotProps} timeout={transitionDuration}>
        <PaperSlot {...paperProps}>{children}</PaperSlot>
      </TransitionSlot>
    </RootSlot>
  );
});

Popover.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: refType,
  /**
   * An HTML element, [PopoverVirtualElement](https://mui.com/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: chainPropTypes(PropTypes.oneOfType([HTMLElementType, PropTypes.func]), (props) => {
    if (props.open && (!props.anchorReference || props.anchorReference === 'anchorEl')) {
      const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);

      if (resolvedAnchorEl && resolvedAnchorEl.nodeType === 1) {
        const box = resolvedAnchorEl.getBoundingClientRect();

        if (process.env.NODE_ENV !== 'production') {
          if (
            isLayoutSupported() &&
            box.top === 0 &&
            box.left === 0 &&
            box.right === 0 &&
            box.bottom === 0
          ) {
            return new Error(
              [
                'MUI: The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join('\n'),
            );
          }
        }
      } else {
        return new Error(
          [
            'MUI: The `anchorEl` prop provided to the component is invalid.',
            `It should be an Element or PopoverVirtualElement instance but it's \`${resolvedAnchorEl}\` instead.`,
          ].join('\n'),
        );
      }
    }

    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.oneOf(['center', 'left', 'right']),
      PropTypes.number,
    ]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(['bottom', 'center', 'top']), PropTypes.number])
      .isRequired,
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: PropTypes.oneOf(['anchorEl', 'anchorPosition', 'none']),
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: PropTypes.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: PropTypes.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: integerPropType,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: PropTypes.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: PropTypes.func,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    backdrop: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    paper: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    transition: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    backdrop: PropTypes.elementType,
    paper: PropTypes.elementType,
    root: PropTypes.elementType,
    transition: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: PropTypes.shape({
    horizontal: PropTypes.oneOfType([
      PropTypes.oneOf(['center', 'left', 'right']),
      PropTypes.number,
    ]).isRequired,
    vertical: PropTypes.oneOfType([PropTypes.oneOf(['bottom', 'center', 'top']), PropTypes.number])
      .isRequired,
  }),
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([
    PropTypes.oneOf(['auto']),
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
};

export default Popover;
