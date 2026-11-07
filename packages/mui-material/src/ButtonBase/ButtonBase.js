'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import refType from '@mui/utils/refType';
import elementTypeAcceptingRef from '@mui/utils/elementTypeAcceptingRef';
import composeClasses from '@mui/utils/composeClasses';
import isFocusVisible from '@mui/utils/isFocusVisible';
import useLazyRef from '@mui/utils/useLazyRef';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useButtonBase from './useButtonBase';
import useLazyRipple from '../useLazyRipple';
import TouchRipple from './TouchRipple';
import buttonBaseClasses, { getButtonBaseUtilityClass } from './buttonBaseClasses';
import { outsetFocusRing } from '../styles/focusVisible';

const useUtilityClasses = (ownerState) => {
  const { disabled, focusVisible, focusVisibleClassName, suppressFocusVisible, classes } =
    ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && !suppressFocusVisible && 'focusVisible'],
  };

  const composedClasses = composeClasses(slots, getButtonBaseUtilityClass, classes);

  if (focusVisible && !suppressFocusVisible && focusVisibleClassName) {
    composedClasses.root += ` ${focusVisibleClassName}`;
  }

  return composedClasses;
};

export const ButtonBaseRoot = styled('button', {
  name: 'MuiButtonBase',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    '&::-moz-focus-inner': {
      borderStyle: 'none', // Remove Firefox dotted outline.
    },
    [`&.${buttonBaseClasses.disabled}`]: {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default',
    },
    '@media print': {
      colorAdjust: 'exact',
    },
    variants: [
      {
        props: { internalDisabledThemeFocusVisible: false },
        style: theme.focusVisible && {
          ...outsetFocusRing,
          [`&.${buttonBaseClasses.focusVisible}`]: theme.focusVisible,
        },
      },
    ],
  })),
);

/**
 * `ButtonBase` contains as few styles as possible.
 * It aims to be a simple building block for creating a button.
 * It contains a load of style reset and some focus/ripple logic.
 */
const ButtonBase = React.forwardRef(function ButtonBase(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiButtonBase' });
  const {
    action,
    centerRipple = false,
    children,
    className,
    component = 'button',
    disabled = false,
    disableRipple = false,
    disableTouchRipple = false,
    focusRipple = false,
    focusVisibleClassName,
    /* eslint-disable react/prop-types */
    // replaces internal handling in Chip, other components can opt-in individually to use this in the future
    focusableWhenDisabled,
    // escape hatch to suppress the focusVisible state and callback
    // used by anchored <Menu>s to to suppress focus visible styling when opened with a pointer
    suppressFocusVisible = false,
    // private prop to allow native vs non-native button props to be resolved before mount
    internalNativeButton: internalNativeButtonProp,
    // private prop to let a parent (like SwitchBase) control its own focus visible style
    internalDisabledThemeFocusVisible = false,
    // private props to let a parent render its own styled root, created with `styled(ButtonBaseRoot)`,
    // so the styles of both are serialized together. The parent's owner state takes precedence over
    // an `ownerState` prop it forwards, as with a styled wrapper.
    internalRoot: Root = ButtonBaseRoot,
    internalOwnerState,
    /* eslint-enable react/prop-types */
    LinkComponent = 'a',
    nativeButton: nativeButtonProp,
    onBlur,
    onClick: onClickProp,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    tabIndex = 0,
    TouchRippleProps,
    touchRippleRef,
    type,
    ...other
  } = props;

  const isLink = Boolean(other.href || other.to);
  const hasFormAction = Boolean(other.formAction);

  let ComponentProp = component;
  if (ComponentProp === 'button' && isLink) {
    ComponentProp = LinkComponent;
  }

  const internalNativeButton =
    typeof ComponentProp === 'string'
      ? ComponentProp === 'button'
      : (internalNativeButtonProp ?? false);
  const nativeButton = nativeButtonProp ?? internalNativeButton;
  const ripple = useLazyRipple();
  const handleRippleRef = useForkRef(ripple.ref, touchRippleRef);

  const [focusVisible, setFocusVisible] = React.useState(false);
  if ((disabled || suppressFocusVisible) && focusVisible) {
    setFocusVisible(false);
  }

  // The event handlers are created once and read the values of the last committed render.
  const latestRef = React.useRef(null);
  const handlers = useLazyRef(() =>
    createEventHandlers(latestRef, setFocusVisible, ripple),
  ).current;

  const { getButtonProps, rootRef: buttonRef } = useButtonBase({
    nativeButton,
    nativeButtonProp,
    internalNativeButton,
    allowInferredHostMismatch: isLink || typeof ComponentProp === 'string',
    disabled,
    type,
    hasFormAction,
    tabIndex,
    onBeforeKeyDown: handlers.onBeforeKeyDown,
    onBeforeKeyUp: handlers.onBeforeKeyUp,
  });

  const { onClick, onKeyDown, onKeyUp, ...buttonProps } = getButtonProps({
    onClick: onClickProp,
    onKeyDown: onKeyDownProp,
    onKeyUp: onKeyUpProp,
  });

  React.useImperativeHandle(
    action,
    () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current.focus();
      },
    }),
    [buttonRef],
  );

  const enableTouchRipple = ripple.shouldMount && !disableRipple && !disabled;

  React.useEffect(() => {
    if (focusVisible && focusRipple && !disableRipple) {
      ripple.pulsate();
    }
  }, [disableRipple, focusRipple, focusVisible, ripple]);

  const latest = {
    buttonRef,
    disableTouchRipple,
    focusRipple,
    focusVisible,
    onBlur,
    onContextMenu,
    onDragLeave,
    onFocus,
    onFocusVisible,
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    suppressFocusVisible,
  };
  // Events can fire before the first layout effect, for example when focus moves during commit.
  if (latestRef.current === null) {
    latestRef.current = latest;
  }

  useEnhancedEffect(() => {
    latestRef.current = latest;
  });

  const linkProps = {};
  if (isLink) {
    linkProps.tabIndex = disabled ? -1 : tabIndex;
    if (disabled) {
      linkProps['aria-disabled'] = disabled;
    }
    linkProps.type = type;
  }

  const handleRef = useForkRef(ref, buttonRef);

  const ownerState = {
    ...props,
    centerRipple,
    component,
    disabled,
    disableRipple,
    disableTouchRipple,
    focusRipple,
    suppressFocusVisible,
    tabIndex,
    focusVisible,
    internalDisabledThemeFocusVisible,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <Root
      as={ComponentProp}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      onBlur={handlers.onBlur}
      onClick={onClick}
      onContextMenu={handlers.onContextMenu}
      onFocus={handlers.onFocus}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onMouseDown={handlers.onMouseDown}
      onMouseLeave={handlers.onMouseLeave}
      onMouseUp={handlers.onMouseUp}
      onDragLeave={handlers.onDragLeave}
      onTouchEnd={handlers.onTouchEnd}
      onTouchMove={handlers.onTouchMove}
      onTouchStart={handlers.onTouchStart}
      ref={handleRef}
      {...(isLink ? linkProps : buttonProps)}
      {...other}
      {...(internalOwnerState && { ownerState: { ...ownerState, ...internalOwnerState } })}
    >
      {children}
      {enableTouchRipple ? (
        <TouchRipple ref={handleRippleRef} center={centerRipple} {...TouchRippleProps} />
      ) : null}
    </Root>
  );
});

function createEventHandlers(latestRef, setFocusVisible, ripple) {
  function createRippleHandler(rippleAction, eventCallbackName) {
    return (event) => {
      const latest = latestRef.current;
      const eventCallback = latest[eventCallbackName];
      if (eventCallback) {
        eventCallback(event);
      }

      if (!latest.disableTouchRipple) {
        ripple[rippleAction](event);
      }
    };
  }
  const handleMouseLeave = createRippleHandler('stop', 'onMouseLeave');

  return {
    onBeforeKeyDown(event) {
      const { focusRipple, focusVisible } = latestRef.current;
      // Check if key is already down to avoid repeats being counted as multiple activations
      if (focusRipple && !event.repeat && focusVisible && event.key === ' ') {
        ripple.stop(event, () => {
          ripple.start(event);
        });
      }
    },
    onBeforeKeyUp(event) {
      const { focusRipple, focusVisible } = latestRef.current;
      // calling preventDefault in keyUp on a <button> will not dispatch a click event if Space is pressed
      // https://codesandbox.io/p/sandbox/button-keyup-preventdefault-dn7f0
      if (focusRipple && event.key === ' ' && focusVisible && !event.defaultPrevented) {
        ripple.stop(event, () => {
          ripple.pulsate(event);
        });
      }
    },
    onMouseDown: createRippleHandler('start', 'onMouseDown'),
    onContextMenu: createRippleHandler('stop', 'onContextMenu'),
    onDragLeave: createRippleHandler('stop', 'onDragLeave'),
    onMouseUp: createRippleHandler('stop', 'onMouseUp'),
    onMouseLeave(event) {
      if (latestRef.current.focusVisible) {
        event.preventDefault();
      }
      handleMouseLeave(event);
    },
    onTouchStart: createRippleHandler('start', 'onTouchStart'),
    onTouchEnd: createRippleHandler('stop', 'onTouchEnd'),
    onTouchMove: createRippleHandler('stop', 'onTouchMove'),
    onBlur(event) {
      const { onBlur } = latestRef.current;
      if (!isFocusVisible(event.target)) {
        setFocusVisible(false);
      }
      if (onBlur) {
        onBlur(event);
      }
      ripple.stop(event);
    },
    onFocus(event) {
      const { buttonRef, onFocus, onFocusVisible, suppressFocusVisible } = latestRef.current;
      // Fix for https://github.com/react/react/issues/7769
      if (!buttonRef.current) {
        buttonRef.current = event.currentTarget;
      }

      if (!suppressFocusVisible && isFocusVisible(event.target)) {
        setFocusVisible(true);

        if (onFocusVisible) {
          onFocusVisible(event);
        }
      }

      if (onFocus) {
        onFocus(event);
      }
    },
  };
}

ButtonBase.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: refType,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: PropTypes.bool,
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: elementTypeAcceptingRef,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: PropTypes.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  formAction: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  /**
   * @ignore
   */
  href: PropTypes /* @typescript-to-proptypes-ignore */.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: PropTypes.elementType,
  /**
   * Whether the custom component is expected to render a native `<button>` element
   * when passing a React component to the `component` or `slots` prop.
   */
  nativeButton: PropTypes.bool,
  /**
   * @ignore
   */
  onBlur: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * @ignore
   */
  onContextMenu: PropTypes.func,
  /**
   * @ignore
   */
  onDragLeave: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * @ignore
   */
  onKeyUp: PropTypes.func,
  /**
   * @ignore
   */
  onMouseDown: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseUp: PropTypes.func,
  /**
   * @ignore
   */
  onTouchEnd: PropTypes.func,
  /**
   * @ignore
   */
  onTouchMove: PropTypes.func,
  /**
   * @ignore
   */
  onTouchStart: PropTypes.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: PropTypes.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.shape({
        pulsate: PropTypes.func.isRequired,
        start: PropTypes.func.isRequired,
        stop: PropTypes.func.isRequired,
      }),
    }),
  ]),
  /**
   * The HTML [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type)
   * attribute applied to `button` and `a` elements.
   * Ignored when rendering non-native buttons.
   * @default 'button'
   */
  type: PropTypes.string,
};

export default ButtonBase;
