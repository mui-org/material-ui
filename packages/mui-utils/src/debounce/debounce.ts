export interface Cancelable {
  clear(): void;
}

// Corresponds to 10 frames at 60 Hz.
// A few bytes payload overhead when lodash/debounce is ~3 kB and debounce ~300 B.
export default function debounce<T extends (...args: any[]) => any>(func: T, wait = 166) {
  let timeout: ReturnType<typeof setTimeout>;
  function debounced(...args: Parameters<T>) {
    const later = () => {
      // @ts-expect-error: The debounced function has no explicit this parameter annotation.
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced as T & Cancelable;
}
