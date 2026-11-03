'use client';
import * as React from 'react';
import ownerDocument from '@mui/utils/ownerDocument';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useForkRef from '@mui/utils/useForkRef';
import chainPropTypes from '@mui/utils/chainPropTypes';
import HTMLElementType from '@mui/utils/HTMLElementType';
import refType from '@mui/utils/refType';
import type { Instance, Modifier, Placement, State, VirtualElement } from '@popperjs/core';
import { createPopper } from '@popperjs/core';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import useSlotProps from '@mui/utils/useSlotProps';
import isLayoutSupported from '../utils/isLayoutSupported';
import Portal from '../Portal';
import { getPopperUtilityClass } from './popperClasses';
import type { WithOptionalOwnerState } from '../utils/types';
import type { PolymorphicComponent } from '../utils/PolymorphicComponent';
import type {
  PopperPlacementType,
  PopperTooltipProps,
  PopperTooltipTypeMap,
  PopperChildrenProps,
  PopperProps,
  PopperRootSlotProps,
  PopperTransitionProps,
  PopperTypeMap,
} from './BasePopper.types';

function flipPlacement(placement?: PopperPlacementType, direction?: 'ltr' | 'rtl') {
  if (direction === 'ltr') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

function resolveAnchorEl(
  anchorEl:
    VirtualElement | (() => VirtualElement) | HTMLElement | (() => HTMLElement) | null | undefined,
): HTMLElement | VirtualElement | null | undefined {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

function isHTMLElement(element: HTMLElement | VirtualElement): element is HTMLElement {
  return (element as HTMLElement).nodeType !== undefined;
}

function isVirtualElement(element: HTMLElement | VirtualElement): element is VirtualElement {
  return !isHTMLElement(element);
}

const useUtilityClasses = (ownerState: any) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getPopperUtilityClass, classes);
};

const defaultPopperOptions = {};

const PopperTooltip = React.forwardRef<HTMLDivElement, PopperTooltipProps>(function PopperTooltip<
  RootComponentType extends React.ElementType,
>(props: PopperTooltipProps<RootComponentType>, forwardedRef: React.ForwardedRef<HTMLDivElement>) {
  const {
    anchorEl,
    children,
    direction,
    disablePortal,
    modifiers,
    open,
    placement: initialPlacement,
    popperOptions,
    popperRef: popperRefProp,
    slotProps = {},
    slots = {},
    TransitionProps,
    ownerState: ownerStateProp, // prevent from spreading to DOM, it can come from the parent component e.g. Select.
    ...other
  } = props;

  const tooltipRef = React.useRef<HTMLElement>(null);
  const ownRef = useForkRef(tooltipRef, forwardedRef);

  const popperRef = React.useRef<Instance>(null);
  const handlePopperRef = useForkRef(popperRef, popperRefProp);
  const handlePopperRefRef = React.useRef(handlePopperRef);
  useEnhancedEffect(() => {
    handlePopperRefRef.current = handlePopperRef;
  }, [handlePopperRef]);
  React.useImperativeHandle(popperRefProp, () => popperRef.current!, []);

  const rtlPlacement = flipPlacement(initialPlacement, direction);
  /**
   * placement initialized from prop but can change during lifetime if modifiers.flip.
   * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
   */
  const [placement, setPlacement] = React.useState<Placement | undefined>(rtlPlacement);
  const resolvedAnchorElement = React.useMemo<HTMLElement | VirtualElement | null | undefined>(
    () => resolveAnchorEl(anchorEl),
    [anchorEl],
  );

  React.useEffect(() => {
    if (popperRef.current) {
      popperRef.current.forceUpdate();
    }
  });

  useEnhancedEffect(() => {
    if (!resolvedAnchorElement || !open) {
      return undefined;
    }

    const handlePopperUpdate = (data: State) => {
      setPlacement(data.placement);
    };

    if (process.env.NODE_ENV !== 'production') {
      if (
        resolvedAnchorElement &&
        isHTMLElement(resolvedAnchorElement) &&
        resolvedAnchorElement.nodeType === 1
      ) {
        const box = resolvedAnchorElement.getBoundingClientRect();

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
    }

    let popperModifiers: Partial<Modifier<any, any>>[] = [
      {
        name: 'preventOverflow',
        options: {
          altBoundary: disablePortal,
        },
      },
      {
        name: 'flip',
        options: {
          altBoundary: disablePortal,
        },
      },
      {
        name: 'onUpdate',
        enabled: true,
        phase: 'afterWrite',
        fn: ({ state }) => {
          handlePopperUpdate(state);
        },
      },
    ];

    if (modifiers != null) {
      popperModifiers = popperModifiers.concat(modifiers);
    }
    if (popperOptions && popperOptions.modifiers != null) {
      popperModifiers = popperModifiers.concat(popperOptions.modifiers);
    }

    const popper = createPopper(resolvedAnchorElement, tooltipRef.current!, {
      placement: rtlPlacement,
      ...popperOptions,
      modifiers: popperModifiers,
    });

    handlePopperRefRef.current!(popper);

    const popperElement = tooltipRef.current;

    return () => {
      // popper.destroy() clears all inline positioning via the applyStyles
      // modifier cleanup, which causes the element to jump to its static
      // position. Snapshot and restore only the positioning properties so the
      // element stays in place during the destroy/recreate gap (prevents scroll
      // jumps when a child focuses between the two).
      // https://github.com/mui/mui-x/issues/21839
      if (popperElement) {
        const { style } = popperElement;
        const position = style.position;
        const top = style.top;
        const left = style.left;
        const transform = style.transform;

        popper.destroy();

        style.position = position;
        style.top = top;
        style.left = left;
        style.transform = transform;
      } else {
        popper.destroy();
      }
      handlePopperRefRef.current!(null);
    };
  }, [resolvedAnchorElement, disablePortal, modifiers, open, popperOptions, rtlPlacement]);

  const childProps: PopperChildrenProps = { placement: placement! };

  if (TransitionProps !== null) {
    childProps.TransitionProps = TransitionProps;
  }

  const classes = useUtilityClasses(props);
  const Root = slots.root ?? 'div';

  const rootProps: WithOptionalOwnerState<PopperRootSlotProps> = useSlotProps({
    elementType: Root,
    externalSlotProps: slotProps.root,
    externalForwardedProps: other,
    additionalProps: {
      role: 'tooltip',
      ref: ownRef,
    },
    ownerState: props,
    className: classes.root,
  });

  return (
    <Root {...rootProps}>{typeof children === 'function' ? children(childProps) : children}</Root>
  );
}) as PolymorphicComponent<PopperTooltipTypeMap>;

/**
 * @ignore - internal component.
 */
const Popper = React.forwardRef<HTMLDivElement, PopperProps>(function Popper<
  RootComponentType extends React.ElementType,
>(props: PopperProps<RootComponentType>, forwardedRef: React.ForwardedRef<HTMLDivElement>) {
  const {
    anchorEl,
    children,
    container: containerProp,
    direction = 'ltr',
    disablePortal = false,
    keepMounted = false,
    modifiers,
    open,
    placement = 'bottom',
    popperOptions = defaultPopperOptions,
    popperRef,
    style,
    transition = false,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const [exited, setExited] = React.useState(true);

  const handleEnter = () => {
    setExited(false);
  };

  const handleExited = () => {
    setExited(true);
  };

  if (!keepMounted && !open && (!transition || exited)) {
    return null;
  }

  // If the container prop is provided, use that
  // If the anchorEl prop is provided, use its parent body element as the container
  // If neither are provided let the Modal take care of choosing the container
  let container;
  if (containerProp) {
    container = containerProp;
  } else if (anchorEl) {
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    container =
      resolvedAnchorEl && isHTMLElement(resolvedAnchorEl)
        ? ownerDocument(resolvedAnchorEl).body
        : ownerDocument(null).body;
  }
  const display = !open && keepMounted && (!transition || exited) ? 'none' : undefined;
  const transitionProps: PopperTransitionProps | undefined = transition
    ? {
        in: open,
        onEnter: handleEnter,
        onExited: handleExited,
      }
    : undefined;

  return (
    <Portal disablePortal={disablePortal} container={container}>
      <PopperTooltip
        anchorEl={anchorEl}
        direction={direction}
        disablePortal={disablePortal}
        modifiers={modifiers}
        ref={forwardedRef}
        open={transition ? !exited : open}
        placement={placement}
        popperOptions={popperOptions}
        popperRef={popperRef}
        slotProps={slotProps}
        slots={slots}
        {...other}
        style={{
          // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
          position: 'fixed',
          // Fix Popper.js display issue
          top: 0,
          left: 0,
          display,
          ...style,
        }}
        TransitionProps={transitionProps}
      >
        {children}
      </PopperTooltip>
    </Portal>
  );
}) as PolymorphicComponent<PopperTypeMap>;

Popper.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/virtual-elements.md),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: chainPropTypes(
    PropTypes.oneOfType([HTMLElementType, PropTypes.object, PropTypes.func]),
    (props) => {
      if (props.open) {
        const resolvedAnchorEl = resolveAnchorEl(props.anchorEl);

        if (
          resolvedAnchorEl &&
          isHTMLElement(resolvedAnchorEl) &&
          resolvedAnchorEl.nodeType === 1
        ) {
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
        } else if (
          !resolvedAnchorEl ||
          typeof resolvedAnchorEl.getBoundingClientRect !== 'function' ||
          (isVirtualElement(resolvedAnchorEl) &&
            resolvedAnchorEl.contextElement != null &&
            resolvedAnchorEl.contextElement.nodeType !== 1)
        ) {
          return new Error(
            [
              'MUI: The `anchorEl` prop provided to the component is invalid.',
              'It should be an HTML element instance or a virtualElement ',
              '(https://github.com/floating-ui/popper-docs/blob/main/docs/v2/virtual-elements.md).',
            ].join('\n'),
          );
        }
      }

      return null;
    },
  ),
  /**
   * Popper render function or node.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    HTMLElementType,
    PropTypes.func,
  ]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: PropTypes.oneOf(['ltr', 'rtl']),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: PropTypes.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: PropTypes.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/modifiers/index.md).
   */
  modifiers: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object,
      effect: PropTypes.func,
      enabled: PropTypes.bool,
      fn: PropTypes.func,
      name: PropTypes.any,
      options: PropTypes.object,
      phase: PropTypes.oneOf([
        'afterMain',
        'afterRead',
        'afterWrite',
        'beforeMain',
        'beforeRead',
        'beforeWrite',
        'main',
        'read',
        'write',
      ]),
      requires: PropTypes.arrayOf(PropTypes.string),
      requiresIfExists: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: PropTypes.oneOf([
    'auto-end',
    'auto-start',
    'auto',
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * Options provided to the [`Popper.js`](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/constructors.md#options) instance.
   * @default {}
   */
  popperOptions: PropTypes.shape({
    modifiers: PropTypes.array,
    onFirstUpdate: PropTypes.func,
    placement: PropTypes.oneOf([
      'auto-end',
      'auto-start',
      'auto',
      'bottom-end',
      'bottom-start',
      'bottom',
      'left-end',
      'left-start',
      'left',
      'right-end',
      'right-start',
      'right',
      'top-end',
      'top-start',
      'top',
    ]),
    strategy: PropTypes.oneOf(['absolute', 'fixed']),
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: refType,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: PropTypes.bool,
} as any;

export default Popper;
