/// <reference path="./react-transition-group.d.ts" />
'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import useValueAsRef from '@mui/utils/useValueAsRef';
// Material UI transitions must still work inside react-transition-group's TransitionGroup.
// Import only its context module; do not import its Transition or TransitionGroup components.
// Use RTG's explicit CJS file for Node ESM/SSR; package.json's `browser` field redirects
// browser bundles to RTG's ESM file.
// eslint-disable-next-line import/extensions -- Node ESM needs the explicit .js extension.
import TransitionGroupContext from 'react-transition-group/cjs/TransitionGroupContext.js';
import { reflow } from '../transitions/utils';

type RenderedTransitionStatus = 'entering' | 'entered' | 'exiting' | 'exited';
type InternalStatus = RenderedTransitionStatus | 'unmounted';

interface ResolvedTimeouts {
  appear: number | undefined;
  enter: number | undefined;
  exit: number | undefined;
}

interface CancellableCallback {
  (): void;
  cancel: () => void;
}

type TransitionEndListener =
  ((done: () => void) => void) | ((node: HTMLElement, done: () => void) => void);

interface InternalTransitionProps {
  in?: boolean | undefined;
  appear?: boolean | undefined;
  enter?: boolean | undefined;
  exit?: boolean | undefined;
  timeout?:
    | number
    | null
    | { appear?: number | undefined; enter?: number | undefined; exit?: number | undefined }
    | undefined;
  nodeRef: React.RefObject<HTMLElement | null>;
  mountOnEnter?: boolean | undefined;
  unmountOnExit?: boolean | undefined;
  addEndListener?: TransitionEndListener | undefined;
  reduceMotion?: boolean | undefined;
  getAutoTimeout?: (() => number | null | undefined) | undefined;
  onEnter?: ((isAppearing: boolean) => void) | undefined;
  onEntering?: ((isAppearing: boolean) => void) | undefined;
  onEntered?: ((isAppearing: boolean) => void) | undefined;
  onExit?: (() => void) | undefined;
  onExiting?: (() => void) | undefined;
  onExited?: (() => void) | undefined;
  children: (
    status: RenderedTransitionStatus,
    childProps: Record<string, unknown>,
  ) => React.ReactNode;
  [key: string]: unknown;
}

function resolveTimeouts(timeout: InternalTransitionProps['timeout']): ResolvedTimeouts {
  if (timeout == null) {
    return { appear: undefined, enter: undefined, exit: undefined };
  }
  if (typeof timeout === 'number') {
    return { appear: timeout, enter: timeout, exit: timeout };
  }
  const enter = timeout.enter;
  const exit = timeout.exit;
  const appear = timeout.appear !== undefined ? timeout.appear : enter;
  return { appear, enter, exit };
}

/**
 * Resolves the authored completion timeout for the current transition phase.
 * Auto durations are read by the caller at scheduling time so Grow/Collapse
 * can pass the latest measured value without storing it in React state.
 */
function getCompletionTimeout(params: {
  currentStatus: 'entering' | 'exiting';
  isAppearing: boolean;
  timeout: InternalTransitionProps['timeout'];
  autoTimeout?: number | null | undefined;
}): number | null {
  if (params.autoTimeout != null) {
    return params.autoTimeout;
  }

  const resolved = resolveTimeouts(params.timeout);

  if (params.currentStatus === 'entering') {
    return params.isAppearing
      ? (resolved.appear ?? resolved.enter ?? null)
      : (resolved.enter ?? null);
  }

  return resolved.exit ?? null;
}

function Transition(props: InternalTransitionProps): React.ReactNode {
  const {
    in: inProp = false,
    appear = false,
    enter = true,
    exit = true,
    mountOnEnter = false,
    unmountOnExit = false,
    timeout,
    addEndListener,
    reduceMotion = false,
    getAutoTimeout,
    nodeRef,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    children,
    ...childProps
  } = props;

  const parentGroup = React.useContext(TransitionGroupContext);

  // react-transition-group's TransitionGroup tells children whether the group
  // is still mounting. Material UI needs two values from that:
  // - shouldEnterOnMount: whether this child should run an enter animation now.
  // - isAppearing: the value passed to enter callbacks.
  // A child added after the group mounted still enters, but callbacks receive
  // isAppearing=false because the parent group is no longer mounting.
  const shouldEnterOnMount = parentGroup && !parentGroup.isMounting ? enter : appear;

  const [status, setStatus] = React.useState<InternalStatus>(() => {
    if (inProp) {
      return shouldEnterOnMount ? 'exited' : 'entered';
    }
    if (mountOnEnter || unmountOnExit) {
      return 'unmounted';
    }
    return 'exited';
  });

  const statusRef = React.useRef<InternalStatus>(status);
  statusRef.current = status;

  // Opening from `unmounted`: mount the child in the same commit that `in` turns
  // true so its ref is attached before effects run. react-transition-group did
  // this by deriving the status from props during render; handling it in a
  // layout effect instead would add a commit where the child is still null,
  // breaking consumers that read the ref right after `in` flips.
  if (inProp && status === 'unmounted') {
    statusRef.current = 'exited';
    setStatus('exited');
  }

  const shouldAppearOnMountRef = React.useRef(inProp && shouldEnterOnMount);
  const mountedRef = React.useRef(false);
  const nextCallbackRef = React.useRef<CancellableCallback | null>(null);
  // Remember which status already fired lifecycle callbacks. React StrictMode
  // can run effects twice in development; this prevents duplicate callbacks.
  const lastFiredStatusRef = React.useRef<InternalStatus>(status);
  // Store the isAppearing value for the current enter transition. performEnter
  // sets it before the status effect later calls onEntering/onEntered.
  const isAppearingRef = React.useRef(false);
  // Capture reduced motion at the start of each phase so prop updates do not
  // change the completion timing for an active transition.
  const transitionReduceMotionRef = React.useRef(reduceMotion);

  // Transition end callbacks can run after props changed. Read props through
  // this ref so delayed work uses the latest callbacks and timeout settings.
  const propsRef = useValueAsRef({
    timeout,
    addEndListener,
    reduceMotion,
    getAutoTimeout,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
    enter,
    exit,
    mountOnEnter,
    unmountOnExit,
    nodeRef,
    parentGroup,
  });

  // Effects below depend on these helpers. Keep their identity stable; they read
  // changing props through propsRef.
  const cancelPendingCallback = React.useCallback(() => {
    if (nextCallbackRef.current !== null) {
      nextCallbackRef.current.cancel();
      nextCallbackRef.current = null;
    }
  }, []);

  const makeCallback = React.useCallback((handler: () => void): CancellableCallback => {
    let active = true;
    const wrapped = (() => {
      if (active) {
        active = false;
        nextCallbackRef.current = null;
        handler();
      }
    }) as CancellableCallback;
    wrapped.cancel = () => {
      active = false;
    };
    nextCallbackRef.current = wrapped;
    return wrapped;
  }, []);

  const scheduleTransitionEnd = React.useCallback(
    (nextStatus: 'entered' | 'exited', currentStatus: 'entering' | 'exiting') => {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      const clearTimer = () => {
        if (timeoutId !== undefined) {
          clearTimeout(timeoutId);
          timeoutId = undefined;
        }
      };
      const done = makeCallback(() => {
        clearTimer();
        statusRef.current = nextStatus;
        setStatus(nextStatus);
      });
      const cancelDone = done.cancel;
      done.cancel = () => {
        clearTimer();
        cancelDone();
      };
      const node = propsRef.current.nodeRef.current;
      const listener = propsRef.current.addEndListener;
      const hasAutoTimeout = propsRef.current.getAutoTimeout !== undefined;
      const autoTimeout = propsRef.current.getAutoTimeout?.();
      const authoredTimeout = getCompletionTimeout({
        currentStatus,
        isAppearing: isAppearingRef.current,
        timeout: propsRef.current.timeout,
        autoTimeout,
      });
      const transitionReduceMotion = transitionReduceMotionRef.current;
      // Auto-duration consumers may skip measurement under reduced motion, but
      // still need a 0ms timeout when they provide addEndListener.
      const fallbackTimeout =
        authoredTimeout ?? (transitionReduceMotion && hasAutoTimeout ? 0 : null);
      const scheduleTimer = (value: number) => {
        timeoutId = setTimeout(done, value);
      };

      if (!node) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            [
              'MUI: The transition child does not expose a DOM element.',
              'Make sure the child accepts a ref and forwards it to the underlying DOM element.',
              'The transition animation cannot be observed without a DOM element and will be skipped.',
            ].join('\n'),
          );
        }

        // Match react-transition-group: if there is no DOM node, there is no
        // transition to observe, so finish on the next tick.
        scheduleTimer(0);
        return;
      }
      if (listener) {
        if (fallbackTimeout != null) {
          scheduleTimer(transitionReduceMotion ? 0 : fallbackTimeout);
        }

        // With nodeRef, react-transition-group calls addEndListener(done).
        // Material UI has long supported addEndListener(node, done). Keep both call
        // shapes so existing transition wrappers do not have to change.
        if (listener.length >= 2) {
          (listener as (node: HTMLElement, done: () => void) => void)(node, done);
        } else {
          (listener as (done: () => void) => void)(done);
        }

        return;
      }

      scheduleTimer(transitionReduceMotion ? 0 : (authoredTimeout ?? 0));
    },
    [makeCallback, propsRef],
  );

  const performEnter = React.useCallback(
    (mounting: boolean) => {
      const current = propsRef.current;
      const isAppearing = current.parentGroup ? current.parentGroup.isMounting : mounting;
      isAppearingRef.current = isAppearing;

      // On updates, enter=false skips the enter animation. Move straight to
      // entered; the status effect will call onEntered, but onEnter/onEntering
      // must not fire.
      if (!mounting && !current.enter) {
        statusRef.current = 'entered';
        setStatus('entered');
        return;
      }

      transitionReduceMotionRef.current = current.reduceMotion;
      current.onEnter?.(isAppearing);
      statusRef.current = 'entering';
      setStatus('entering');
    },
    [propsRef],
  );

  const performExit = React.useCallback(() => {
    const current = propsRef.current;

    if (!current.exit) {
      statusRef.current = 'exited';
      setStatus('exited');
      return;
    }

    transitionReduceMotionRef.current = current.reduceMotion;
    current.onExit?.();
    statusRef.current = 'exiting';
    setStatus('exiting');
  }, [propsRef]);

  const updateStatus = React.useCallback(
    (mounting: boolean, nextStatus: 'entering' | 'exiting') => {
      cancelPendingCallback();
      if (nextStatus === 'entering') {
        const current = propsRef.current;
        // If the node was just mounted, read layout before entering so the
        // browser applies the starting styles before the animation begins.
        if (current.mountOnEnter || current.unmountOnExit) {
          const node = current.nodeRef.current;
          if (node) {
            reflow(node);
          }
        }
        performEnter(mounting);
      } else {
        performExit();
      }
    },
    [cancelPendingCallback, performEnter, performExit, propsRef],
  );

  // Runs on mount. useEnhancedEffect is needed because the initial appear
  // transition may read layout before paint. In StrictMode development builds,
  // React mounts, cleans up, and mounts again; cleanup cancels pending work and
  // the status effect below restarts an active transition when effects reconnect.
  useEnhancedEffect(() => {
    mountedRef.current = true;
    if (shouldAppearOnMountRef.current) {
      shouldAppearOnMountRef.current = false;
      updateStatus(true, 'entering');
    }
    return () => {
      mountedRef.current = false;
      cancelPendingCallback();
    };
  }, [cancelPendingCallback, updateStatus]);

  // Reconcile the rendered status after `in` or status changes:
  // - opening from unmounted is handled during render (see above) so the child
  //   is committed as exited with its ref attached before this effect runs.
  // - unmountOnExit removes the child after the exited state commits.
  // This matches react-transition-group's observable status steps without
  // running work after unrelated commits.
  useEnhancedEffect(() => {
    if (!mountedRef.current) {
      return;
    }
    const current = statusRef.current;

    if (inProp) {
      if (current !== 'entering' && current !== 'entered') {
        updateStatus(false, 'entering');
      }
    } else if (current === 'entering' || current === 'entered') {
      updateStatus(false, 'exiting');
    } else if (current === 'exited' && unmountOnExit) {
      statusRef.current = 'unmounted';
      setStatus('unmounted');
    }
  }, [inProp, status, unmountOnExit, updateStatus]);

  // Fire lifecycle callbacks for committed status changes. The guard prevents
  // duplicate callbacks in StrictMode; propsRef keeps delayed callbacks fresh.
  // Completion is scheduled outside the guard so an active transition is
  // restarted when React reconnects effects while preserving state.
  useEnhancedEffect(() => {
    // `unmounted` is bookkeeping, not a real transition state. Do not fire
    // callbacks when moving into or out of it; otherwise the first open with
    // mountOnEnter/unmountOnExit would look like a completed exit.
    if (status === 'unmounted' || lastFiredStatusRef.current === 'unmounted') {
      lastFiredStatusRef.current = status;
      return;
    }
    const prev = lastFiredStatusRef.current;
    const statusChanged = prev !== status;
    if (statusChanged) {
      lastFiredStatusRef.current = status;
    }

    const current = propsRef.current;
    if (status === 'entering') {
      if (statusChanged) {
        current.onEntering?.(isAppearingRef.current);
      }
      if (nextCallbackRef.current === null && statusRef.current === status) {
        scheduleTransitionEnd('entered', 'entering');
      }
    } else if (status === 'exiting') {
      if (statusChanged) {
        current.onExiting?.();
      }
      if (nextCallbackRef.current === null && statusRef.current === status) {
        scheduleTransitionEnd('exited', 'exiting');
      }
    } else if (status === 'entered' && statusChanged) {
      current.onEntered?.(isAppearingRef.current);
    } else if (status === 'exited' && statusChanged) {
      current.onExited?.();
    }
  }, [propsRef, scheduleTransitionEnd, status]);

  if (status === 'unmounted') {
    return null;
  }

  // Nested Material UI transitions should not inherit this transition's parent group.
  // A null context keeps an outer TransitionGroup from controlling them.
  return (
    <TransitionGroupContext.Provider value={null}>
      {children(status as RenderedTransitionStatus, childProps)}
    </TransitionGroupContext.Provider>
  );
}

Transition.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  addEndListener: PropTypes.func,
  /**
   * @ignore
   */
  appear: PropTypes.bool,
  /**
   * @ignore
   */
  children: PropTypes.func.isRequired,
  /**
   * @ignore
   */
  enter: PropTypes.bool,
  /**
   * @ignore
   */
  exit: PropTypes.bool,
  /**
   * @ignore
   */
  getAutoTimeout: PropTypes.func,
  /**
   * @ignore
   */
  in: PropTypes.bool,
  /**
   * @ignore
   */
  mountOnEnter: PropTypes.bool,
  /**
   * @ignore
   */
  nodeRef: PropTypes.shape({
    current: (props, propName) => {
      if (props[propName] == null) {
        return null;
      }
      if (typeof props[propName] !== 'object' || props[propName].nodeType !== 1) {
        return new Error(`Expected prop '${propName}' to be of type Element`);
      }
      return null;
    },
  }).isRequired,
  /**
   * @ignore
   */
  onEnter: PropTypes.func,
  /**
   * @ignore
   */
  onEntered: PropTypes.func,
  /**
   * @ignore
   */
  onEntering: PropTypes.func,
  /**
   * @ignore
   */
  onExit: PropTypes.func,
  /**
   * @ignore
   */
  onExited: PropTypes.func,
  /**
   * @ignore
   */
  onExiting: PropTypes.func,
  /**
   * @ignore
   */
  reduceMotion: PropTypes.bool,
  /**
   * @ignore
   */
  timeout: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      appear: PropTypes.number,
      enter: PropTypes.number,
      exit: PropTypes.number,
    }),
  ]),
  /**
   * @ignore
   */
  unmountOnExit: PropTypes.bool,
} as any;

export default Transition;
export type { InternalTransitionProps, RenderedTransitionStatus };
