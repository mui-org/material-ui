'use client';
import useEnhancedEffect from '../useEnhancedEffect/useEnhancedEffect';
import useLazyRef from '../useLazyRef/useLazyRef';

interface ValueRef<T> {
  current: T;
  next: T;
  effect: () => void;
}

/**
 * Copied from `@base-ui/utils/useValueAsRef`.
 *
 * Stores the latest value in a stable ref. The ref updates after React commits,
 * so effects and delayed callbacks can read the current value without depending
 * on it and rerunning.
 */
export default function useValueAsRef<T>(value: T) {
  const latest = useLazyRef(() => createValueRef(value)).current;
  latest.next = value;

  // eslint-disable-next-line react-hooks/exhaustive-deps -- effect never changes; it reads latest.next.
  useEnhancedEffect(latest.effect);

  return latest;
}

function createValueRef<T>(value: T): ValueRef<T> {
  const latest: ValueRef<T> = {
    current: value,
    next: value,
    effect: () => {
      latest.current = latest.next;
    },
  };

  return latest;
}
