export type SnackbarCloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';

export interface UseSnackbarParameters {
  /**
   * The number of milliseconds to wait before automatically calling the
   * `onClose` function. `onClose` should then set the state of the `open`
   * prop to hide the Snackbar. This behavior is disabled by default with
   * the `null` value.
   * @default null
   */
  autoHideDuration?: number | null | undefined;
  /**
   * If `true`, the `autoHideDuration` timer will expire even if the window is not focused.
   * @default false
   */
  disableWindowBlurListener?: boolean | undefined;
  /**
   * Callback fired when the component requests to be closed.
   * Typically `onClose` is used to set state in the parent component,
   * which is used to control the `Snackbar` `open` prop.
   * The `reason` parameter can optionally be used to control the response to `onClose`,
   * for example ignoring `clickaway`.
   *
   * @param {React.SyntheticEvent<any> | Event} event The event source of the callback.
   * @param {string} reason Can be: `"timeout"` (`autoHideDuration` expired), `"clickaway"`, or `"escapeKeyDown"`.
   */
  onClose?:
    | ((event: React.SyntheticEvent<any> | Event | null, reason: SnackbarCloseReason) => void)
    | undefined;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean | undefined;
  /**
   * The number of milliseconds to wait before dismissing after user interaction.
   * If `autoHideDuration` prop isn't specified, it does nothing.
   * If `autoHideDuration` prop is specified but `resumeHideDuration` isn't,
   * we default to `autoHideDuration / 2` ms.
   */
  resumeHideDuration?: number | undefined;
}

export type UseSnackbarRootSlotProps<ExternalProps = {}> = ExternalProps &
  UseSnackbarRootSlotOwnProps;

export interface UseSnackbarRootSlotOwnProps {
  onBlur: React.FocusEventHandler;
  onFocus: React.FocusEventHandler;
  onMouseEnter: React.MouseEventHandler;
  onMouseLeave: React.MouseEventHandler;
  ref?: React.RefCallback<Element> | undefined;
  role: React.AriaRole;
}

export interface UseSnackbarReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseSnackbarRootSlotProps<ExternalProps>;
  /**
   * Callback fired when a "click away" event is detected.
   */
  onClickAway: (event: React.SyntheticEvent<any> | Event) => void;
}
