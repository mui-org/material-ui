'use client';
import * as React from 'react';
import useFocusableWhenDisabled from '../utils/useFocusableWhenDisabled';

export interface UseButtonBaseParameters {
  /**
   * Whether the root should be treated as a native `<button>` for render-time semantics.
   */
  nativeButton: boolean;
  /**
   * The explicit `nativeButton` value provided by the caller, if any.
   */
  nativeButtonProp?: boolean | undefined;
  /**
   * Whether the default rendered element is expected to be a native button when
   * `nativeButton` was not explicitly provided.
   * @default nativeButton
   */
  internalNativeButton?: boolean | undefined;
  /**
   * Whether to perform additional checks in dev mode on whether the resolved element
   * matches the default native or non-native button expectation.
   * Set to `true` to allow hook callers bypass this check, e.g. when the `component`
   * prop is a string.
   * @default false
   */
  allowInferredHostMismatch?: boolean | undefined;
  /**
   * The disabled state of the component.
   */
  disabled: boolean;
  /**
   * The `type` attribute for the element.
   */
  type?: string | undefined;
  /**
   * Whether the element has a `formAction` attribute. When true, the hook
   * will not default `type` to `'button'` for native buttons so the browser
   * can use its natural submit behaviour.
   * @default false
   */
  hasFormAction?: boolean | undefined;
  /**
   * The `tabIndex` attribute for the element.
   * @default 0
   */
  tabIndex?: number | undefined;
  /**
   * When `true`, a disabled root can remain focusable.
   * When `undefined`, the feature is not enabled.
   */
  focusableWhenDisabled?: boolean | undefined;
  /**
   * When `true`, calls `event.stopPropagation()` on click before the disabled guard runs.
   * @default false
   */
  stopEventPropagation?: boolean | undefined;
  /**
   * An additional function that will run before the user's `onKeyDown`, e.g.
   * to trigger the ripple effect in `<ButtonBase>`.
   */
  onBeforeKeyDown?: React.KeyboardEventHandler<HTMLElement> | undefined;
  /**
   * An additional function that will run before the user's `onKeyUp`, e.g.
   * to control the ripple effect in `<ButtonBase>`.
   */
  onBeforeKeyUp?: React.KeyboardEventHandler<HTMLElement> | undefined;
}

export interface ButtonBaseButtonProps {
  role?: string | undefined;
  'aria-disabled'?: boolean | undefined;
  type?: string | undefined;
  disabled?: boolean | undefined;
  tabIndex: number;
}

export interface ButtonBaseExternalProps extends React.HTMLAttributes<any> {
  'aria-disabled'?: boolean | undefined;
  disabled?: boolean | undefined;
  type?: string | undefined;
}

export interface ButtonBaseEventHandlers {
  onClick: React.MouseEventHandler<HTMLElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLElement>;
  onKeyUp: React.KeyboardEventHandler<HTMLElement>;
}

export interface UseButtonBaseReturnValue {
  /**
   * @param externalProps additional props for the button
   * @returns props that should be spread on the button
   */
  getButtonProps: <ExternalProps extends ButtonBaseExternalProps = ButtonBaseExternalProps>(
    externalProps?: ExternalProps,
  ) => Omit<ExternalProps, keyof ButtonBaseEventHandlers> &
    ButtonBaseButtonProps &
    ButtonBaseEventHandlers;
  rootRef: React.RefObject<HTMLElement | null>;
}

const EMPTY = {};

export default function useButtonBase(
  parameters: UseButtonBaseParameters,
): UseButtonBaseReturnValue {
  const {
    nativeButton,
    nativeButtonProp,
    internalNativeButton = nativeButton,
    allowInferredHostMismatch = false,
    disabled,
    type,
    hasFormAction = false,
    tabIndex = 0,
    focusableWhenDisabled: focusableWhenDisabledParam,
    stopEventPropagation = false,
    onBeforeKeyDown,
    onBeforeKeyUp,
  } = parameters;

  const rootRef = React.useRef<HTMLElement | null>(null);
  const focusableWhenDisabled = focusableWhenDisabledParam === true;
  const focusableWhenDisabledProps = useFocusableWhenDisabled({
    focusableWhenDisabled,
    disabled,
    isNativeButton: nativeButton,
    tabIndex,
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      const root = rootRef.current;
      if (root == null) {
        return;
      }

      const isButtonTag = root.tagName === 'BUTTON';

      if (nativeButtonProp !== undefined) {
        if (nativeButtonProp && !isButtonTag) {
          const message =
            'MUI: A component that acts as a button expected a native <button> because the ' +
            '`nativeButton` prop is true. Rendering a non-<button> removes native button ' +
            'semantics, which can impact forms and accessibility. Render a real <button> ' +
            'or set `nativeButton` to `false`.';
          console.error(message);
        }

        if (!nativeButtonProp && isButtonTag) {
          const message =
            'MUI: A component that acts as a button expected a non-<button> because the `nativeButton` ' +
            'prop is false. Rendering a <button> keeps native behavior while additionally applies ' +
            'non-native attributes and handlers, which can add unintended extra attributes (such ' +
            'as `role` or `aria-disabled`). Render a non-<button> such as <div>, or set ' +
            '`nativeButton` to `true`.';
          console.error(message);
        }

        return;
      }

      if (allowInferredHostMismatch) {
        return;
      }

      // warn when expecting a native <button> element but a non-string `component` prop resolved to a non-button element
      if (internalNativeButton && !isButtonTag) {
        const message =
          'MUI: A component rendering a native <button> resolved to a non-<button> element, ' +
          'but `nativeButton={false}` was not specified and the resolved root is a non-<button>. ' +
          'When rendering a custom component, set `nativeButton={false}` explicitly or render a <button> element.';
        console.error(message);
      }

      // warn when expecting a non-button but a non-string `component` prop resolved to a native <button> element
      if (!internalNativeButton && isButtonTag) {
        const message =
          'MUI: A component that acts as a non-native button resolved to a native <button> element, ' +
          'but `nativeButton={true}` was not specified. ' +
          'When rendering a custom component, set `nativeButton={true}` explicitly or render a non-<button> element.';
        console.error(message);
      }
    }, [allowInferredHostMismatch, internalNativeButton, nativeButtonProp]);
  }

  // A helper for event handlers to determine whether to use browser-defined keyboard activation
  // for native elements like <button> and <a href>, or synthesize Enter/Space clicks for non-native
  // elements like `<div role="button">`.
  // This is UNSAFE TO USE outside of event handers, e.g. in render.
  const hasNativeKeyboardActivation = React.useCallback(() => {
    const root = rootRef.current;

    if (root == null) {
      return nativeButton;
    }

    if (root.tagName === 'BUTTON') {
      return true;
    }

    // Although this hook is not intended for links, this check is for
    // backward compatibility with `<ButtonBase href="#" />` since ButtonBase
    // uses the returned event handlers.
    return Boolean(root.tagName === 'A' && (root as HTMLAnchorElement).href);
  }, [nativeButton]);

  const buttonProps = React.useMemo(() => {
    const resolvedButtonProps: ButtonBaseButtonProps = focusableWhenDisabled
      ? ({} as ButtonBaseButtonProps)
      : { tabIndex: disabled ? -1 : tabIndex };

    if (nativeButton) {
      resolvedButtonProps.type = type === undefined && !hasFormAction ? 'button' : type;
      if (!focusableWhenDisabled) {
        resolvedButtonProps.disabled = disabled;
      }
    } else {
      resolvedButtonProps.role = 'button';
      if (!focusableWhenDisabled && disabled) {
        resolvedButtonProps['aria-disabled'] = disabled;
      }
    }

    if (focusableWhenDisabled) {
      return {
        ...resolvedButtonProps,
        ...focusableWhenDisabledProps,
      };
    }

    return resolvedButtonProps;
  }, [
    disabled,
    focusableWhenDisabled,
    focusableWhenDisabledProps,
    hasFormAction,
    nativeButton,
    tabIndex,
    type,
  ]);

  const getButtonProps = React.useCallback(
    <ExternalProps extends ButtonBaseExternalProps = ButtonBaseExternalProps>(
      externalProps = EMPTY as ExternalProps,
    ) => {
      const {
        onClick: externalOnClick,
        onKeyDown: externalOnKeyDown,
        onKeyUp: externalOnKeyUp,
        ...otherExternalProps
      } = externalProps;

      const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
        if (stopEventPropagation) {
          event.stopPropagation();
        }

        if (disabled) {
          event.preventDefault();
          return;
        }

        externalOnClick?.(event);
      };

      const handleKeyDown: React.KeyboardEventHandler<HTMLElement> = (event) => {
        if (focusableWhenDisabled) {
          focusableWhenDisabledProps.onKeyDown(event);
        }

        if (disabled) {
          return;
        }

        onBeforeKeyDown?.(event);
        externalOnKeyDown?.(event);

        if (event.target !== event.currentTarget || hasNativeKeyboardActivation()) {
          return;
        }

        if (event.key === ' ') {
          event.preventDefault();
          return;
        }

        if (event.key === 'Enter') {
          event.preventDefault();
          event.currentTarget.click();
        }
      };

      const handleKeyUp: React.KeyboardEventHandler<HTMLElement> = (event) => {
        if (disabled) {
          return;
        }

        onBeforeKeyUp?.(event);
        externalOnKeyUp?.(event);

        if (
          event.target === event.currentTarget &&
          !hasNativeKeyboardActivation() &&
          event.key === ' ' &&
          !event.defaultPrevented
        ) {
          event.currentTarget.click();
        }
      };

      return {
        ...buttonProps,
        ...otherExternalProps,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
      };
    },
    [
      buttonProps,
      disabled,
      focusableWhenDisabled,
      focusableWhenDisabledProps,
      hasNativeKeyboardActivation,
      onBeforeKeyDown,
      onBeforeKeyUp,
      stopEventPropagation,
    ],
  );

  return {
    getButtonProps,
    rootRef,
  };
}
