'use client';
import * as React from 'react';
import useEnhancedEffect from '../useEnhancedEffect';

/**
 * Inspired by https://github.com/react/react/issues/14099#issuecomment-440013892
 * See RFC in https://github.com/reactjs/rfcs/pull/220
 */
function useEventCallback<Fn extends (...args: any[]) => any = (...args: unknown[]) => unknown>(
  fn: Fn,
): Fn;
function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Return;
function useEventCallback<Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
): (...args: Args) => Return {
  const ref = React.useRef(fn);
  useEnhancedEffect(() => {
    ref.current = fn;
  });
  return React.useRef((...args: Args) =>
    // @ts-expect-error hide `this`
    (0, ref.current!)(...args),
  ).current;
}

export default useEventCallback;
