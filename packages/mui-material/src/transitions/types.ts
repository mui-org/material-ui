import type * as React from 'react';

export type TransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited' | 'unmounted';

export interface TransitionActions {
  appear?: boolean | undefined;
  enter?: boolean | undefined;
  exit?: boolean | undefined;
}

export type TransitionHandlerKeys =
  'onEnter' | 'onEntering' | 'onEntered' | 'onExit' | 'onExiting' | 'onExited';

export type EnterHandler = (node: HTMLElement, isAppearing: boolean) => void;

export type ExitHandler = (node: HTMLElement) => void;

export interface TransitionHandlerProps {
  /**
   * @ignore
   */
  onEnter?: EnterHandler | undefined;
  /**
   * @ignore
   */
  onEntering?: EnterHandler | undefined;
  /**
   * @ignore
   */
  onEntered?: EnterHandler | undefined;
  /**
   * @ignore
   */
  onExit?: ExitHandler | undefined;
  /**
   * @ignore
   */
  onExiting?: ExitHandler | undefined;
  /**
   * @ignore
   */
  onExited?: ExitHandler | undefined;
}

export interface EasingProps {
  easing: string | { enter?: string | undefined; exit?: string | undefined };
}

export type TransitionKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'timeout'
  | 'easing'
  | 'addEndListener'
  | 'disablePrefersReducedMotion'
  | TransitionHandlerKeys;

interface ConsumerTransitionProps extends TransitionHandlerProps {
  in?: boolean | undefined;
  mountOnEnter?: boolean | undefined;
  unmountOnExit?: boolean | undefined;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout?:
    | number
    | { appear?: number | undefined; enter?: number | undefined; exit?: number | undefined }
    | undefined;
  /**
   * Add a custom transition end trigger.
   * Use it when you need custom logic to decide when the transition has ended.
   * Note: Timeouts are still used as a fallback if provided.
   *
   * @param {HTMLElement} node The transitioning DOM node.
   * @param {Function} done Call this when the transition has finished.
   */
  addEndListener?: ((node: HTMLElement, done: () => void) => void) | undefined;
  /**
   * If `true`, the transition ignores `theme.motion.reducedMotion` and keeps its normal timing.
   * @default false
   */
  disablePrefersReducedMotion?: boolean | undefined;
}

export interface TransitionProps
  extends
    TransitionActions,
    Partial<Pick<ConsumerTransitionProps & EasingProps, TransitionKeys>>,
    React.HTMLAttributes<HTMLElement> {}
