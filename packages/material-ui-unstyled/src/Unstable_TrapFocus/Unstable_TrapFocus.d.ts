/* eslint-disable @typescript-eslint/naming-convention */
import * as React from 'react';

export interface TrapFocusProps {
  /**
   * If `true`, focus is locked.
   */
  open: boolean;
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable?: (root: HTMLElement) => string[];
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple trap focus mounted at the same time.
   * @default function defaultIsEnabled() {
   *   return true;
   * }
   */
  isEnabled?: () => boolean;
  /**
   * A single child content element.
   */
  children?: React.ReactElement<any, any>;
  /**
   * If `true`, the trap focus will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any trap focus children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus?: boolean;
  /**
   * If `true`, the trap focus will not prevent focus from leaving the trap focus while open.
   *
   * Generally this should never be set to `true` as it makes the trap focus less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus?: boolean;
  /**
   * If `true`, the trap focus will not restore focus to previously focused element once
   * trap focus is hidden.
   * @default false
   */
  disableRestoreFocus?: boolean;
}

/**
 * Utility component that locks focus inside the component.
 *
 * Demos:
 *
 * - [Trap Focus](https://material-ui.com/components/trap-focus/)
 *
 * API:
 *
 * - [Unstable_TrapFocus API](https://material-ui.com/api/unstable-trap-focus/)
 */
export default function Unstable_TrapFocus(props: TrapFocusProps): JSX.Element;
