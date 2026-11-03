export interface StorageManager {
  (options: { key: string; storageWindow?: Window | null | undefined }): {
    /**
     * Function to get the value from the storage
     * @param defaultValue The default value to be returned if the key is not found
     * @returns The value from the storage or the default value
     */
    get(defaultValue: any): any;
    /**
     * Function to set the value in the storage
     * @param value The value to be set
     * @returns void
     */
    set(value: any): void;
    /**
     * Function to subscribe to the value of the specified key triggered by external events
     * @param handler The function to be called when the value changes
     * @returns A function to unsubscribe the handler
     * @example
     * React.useEffect(() => {
     *  const unsubscribe = storageManager.subscribe((value) => {
     *    console.log(value);
     *  });
     *  return unsubscribe;
     * }, []);
     */
    subscribe(handler: (value: any) => void): () => void;
  };
}

function noop() {}

const localStorageManager: StorageManager = ({ key, storageWindow }) => {
  if (!storageWindow && typeof window !== 'undefined') {
    storageWindow = window;
  }
  return {
    get(defaultValue) {
      if (typeof window === 'undefined') {
        return undefined;
      }
      if (!storageWindow) {
        return defaultValue;
      }
      let value;
      try {
        value = storageWindow.localStorage.getItem(key);
      } catch {
        // Unsupported
      }
      return value || defaultValue;
    },
    set: (value) => {
      if (storageWindow) {
        try {
          storageWindow.localStorage.setItem(key, value);
        } catch {
          // Unsupported
        }
      }
    },
    subscribe: (handler) => {
      if (!storageWindow) {
        return noop;
      }
      const listener = (event: StorageEvent) => {
        const value = event.newValue;
        if (event.key === key) {
          handler(value);
        }
      };
      storageWindow.addEventListener('storage', listener);
      return () => {
        storageWindow.removeEventListener('storage', listener);
      };
    },
  };
};

export default localStorageManager;
