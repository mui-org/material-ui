'use client';
import * as React from 'react';
import useEnhancedEffect from '../useEnhancedEffect';

// storage events only work across tabs, we'll use an event emitter to announce within the current tab
const currentTabChangeListeners = new Map<string, Set<() => void>>();

function onCurrentTabStorageChange(key: string, handler: () => void) {
  let listeners = currentTabChangeListeners.get(key);

  if (!listeners) {
    listeners = new Set();
    currentTabChangeListeners.set(key, listeners);
  }

  listeners.add(handler);
}

function offCurrentTabStorageChange(key: string, handler: () => void) {
  const listeners = currentTabChangeListeners.get(key);
  if (!listeners) {
    return;
  }

  listeners.delete(handler);

  if (listeners.size === 0) {
    currentTabChangeListeners.delete(key);
  }
}

function emitCurrentTabStorageChange(key: string) {
  const listeners = currentTabChangeListeners.get(key);
  if (listeners) {
    listeners.forEach((listener) => listener());
  }
}

function subscribe(area: Storage, key: string | null, callback: () => void): () => void {
  if (!key) {
    return () => {};
  }
  const storageHandler = (event: StorageEvent) => {
    if (event.storageArea === area && event.key === key) {
      callback();
    }
  };
  window.addEventListener('storage', storageHandler);
  onCurrentTabStorageChange(key, callback);
  return () => {
    window.removeEventListener('storage', storageHandler);
    offCurrentTabStorageChange(key, callback);
  };
}

function getSnapshot(area: Storage, key: string | null): string | null {
  if (!key) {
    return null;
  }
  try {
    return area.getItem(key);
  } catch {
    // ignore
    // See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
    return null;
  }
}

function setValue(area: Storage, key: string | null, value: string | null) {
  if (!key) {
    return;
  }
  try {
    if (value === null) {
      area.removeItem(key);
    } else {
      area.setItem(key, String(value));
    }
  } catch {
    // ignore
    // See https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API#feature-detecting_localstorage
    return;
  }
  emitCurrentTabStorageChange(key);
}

type Initializer = () => string | null;

type UseStorageStateHookResult = [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
];

// TODO React 17: Remove `useSyncExternalStoreOld` once React 17 support is removed
function useSyncExternalStoreOld(
  subscribeToStore: (onStoreChange: () => void) => () => void,
  getStoreSnapshot: () => string | null,
  getServerSnapshot: () => string | null,
): string | null {
  // Start with the server snapshot so that hydration matches, then read the store before paint.
  const [snapshot, setSnapshot] = React.useState(getServerSnapshot);

  useEnhancedEffect(() => {
    const update = () => {
      setSnapshot(getStoreSnapshot());
    };

    update();
    return subscribeToStore(update);
  }, [getStoreSnapshot, subscribeToStore]);

  return snapshot;
}

// See https://github.com/mui/material-ui/issues/41190#issuecomment-2040873379 for why
const safeReact = { ...React };
const maybeReactUseSyncExternalStore: undefined | any = safeReact.useSyncExternalStore;
const useStoreSnapshot: typeof useSyncExternalStoreOld =
  maybeReactUseSyncExternalStore ?? useSyncExternalStoreOld;

const serverValue: UseStorageStateHookResult = [null, () => {}];

function useLocalStorageStateServer(): UseStorageStateHookResult {
  return serverValue;
}

/**
 * Sync state to local storage so that it persists through a page refresh. Usage is
 * similar to useState except we pass in a storage key so that we can default
 * to that value on page load instead of the specified initial value.
 *
 * Since the storage API isn't available in server-rendering environments, we
 * return null during SSR and hydration.
 */
function useLocalStorageStateBrowser(
  key: string | null,
  initializer: string | null | Initializer = null,
): UseStorageStateHookResult {
  const [initialValue] = React.useState(initializer);
  const area = window.localStorage;
  const subscribeKey = React.useCallback(
    (callback: () => void) => subscribe(area, key, callback),
    [area, key],
  );
  const getKeySnapshot = React.useCallback(
    () => getSnapshot(area, key) ?? initialValue,
    [area, initialValue, key],
  );

  // Start with null for the hydration, and then switch to the actual value.
  const getKeyServerSnapshot = () => null;

  const storedValue = useStoreSnapshot(subscribeKey, getKeySnapshot, getKeyServerSnapshot);

  const setStoredValue = React.useCallback(
    (value: React.SetStateAction<string | null>) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setValue(area, key, valueToStore);
    },
    [area, key, storedValue],
  );

  const [nonStoredValue, setNonStoredValue] = React.useState(initialValue);

  if (!key) {
    return [nonStoredValue, setNonStoredValue];
  }

  return [storedValue, setStoredValue];
}

export default typeof window === 'undefined'
  ? useLocalStorageStateServer
  : useLocalStorageStateBrowser;
