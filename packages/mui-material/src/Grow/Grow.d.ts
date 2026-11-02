import * as React from 'react';
import { TransitionProps } from '../transitions/types';

export interface GrowProps extends Omit<TransitionProps, 'timeout'> {
  /**
   * Add a custom transition end trigger.
   * Use it when you need custom logic to decide when the transition has ended.
   * Note: Timeouts are still used as a fallback if provided.
   *
   * @param {HTMLElement} node The transitioning DOM node.
   * @param {Function} done Call this when the transition has finished.
   */
  addEndListener?: TransitionProps['addEndListener'] | undefined;
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear?: boolean | undefined;
  /**
   * A single child content element.
   */
  children: React.ReactElement<unknown, any>;
  /**
   * If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
   * @default false
   */
  disablePrefersReducedMotion?: boolean | undefined;
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing?: TransitionProps['easing'] | undefined;
  /**
   * If `true`, the component will transition in.
   */
  in?: boolean | undefined;
  ref?: React.Ref<unknown> | undefined;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout?: TransitionProps['timeout'] | 'auto' | undefined;
}

/**
 * The Grow transition is used by the [Tooltip](https://next.mui.com/material-ui/react-tooltip/) and
 * [Popover](https://next.mui.com/material-ui/react-popover/) components.
 *
 * Demos:
 *
 * - [Popover](https://next.mui.com/material-ui/react-popover/)
 * - [Transitions](https://next.mui.com/material-ui/transitions/)
 *
 * API:
 *
 * - [Grow API](https://next.mui.com/material-ui/api/grow/)
 * - inherits [Transition API](https://reactcommunity.org/react-transition-group/transition/#Transition-props)
 */
export default function Grow(props: GrowProps): React.JSX.Element;
