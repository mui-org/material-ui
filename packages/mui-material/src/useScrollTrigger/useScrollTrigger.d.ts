export interface UseScrollTriggerOptions {
  disableHysteresis?: boolean | undefined;
  target?: Node | Window | null | undefined;
  threshold?: number | undefined;
}

export default function useScrollTrigger(options?: UseScrollTriggerOptions): boolean;
