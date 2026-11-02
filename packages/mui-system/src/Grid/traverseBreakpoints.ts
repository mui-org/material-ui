import type { Breakpoints, Breakpoint } from '../createBreakpoints/createBreakpoints';

export const filterBreakpointKeys = (breakpointsKeys: Breakpoint[], responsiveKeys: string[]) =>
  breakpointsKeys.filter((key: string) => responsiveKeys.includes(key));

interface Iterator<T> {
  (appendStyle: (responsiveStyles: Record<string, any>, style: object) => void, value: T): void;
}

export const traverseBreakpoints = <T = unknown>(
  breakpoints: Breakpoints,
  responsive: T | T[] | Record<string, any> | undefined,
  iterator: Iterator<T>,
) => {
  const smallestBreakpoint = breakpoints.keys[0]; // the keys is sorted from smallest to largest by `createBreakpoints`.

  if (Array.isArray(responsive)) {
    responsive.forEach((breakpointValue, index) => {
      iterator((responsiveStyles, style) => {
        if (index <= breakpoints.keys.length - 1) {
          if (index === 0) {
            Object.assign(responsiveStyles, style);
          } else {
            responsiveStyles[breakpoints.up(breakpoints.keys[index])] = style;
          }
        }
      }, breakpointValue as T);
    });
  } else if (responsive && typeof responsive === 'object') {
    // prevent null
    // responsive could be a very big object, pick the smallest responsive values

    const keys =
      Object.keys(responsive).length > breakpoints.keys.length
        ? breakpoints.keys
        : filterBreakpointKeys(breakpoints.keys, Object.keys(responsive));

    keys.forEach((key) => {
      if (breakpoints.keys.includes(key as Breakpoint)) {
        // @ts-expect-error: The object check does not narrow the generic responsive value to a string-indexed record.
        const breakpointValue: T = responsive[key];
        if (breakpointValue !== undefined) {
          iterator((responsiveStyles, style) => {
            if (smallestBreakpoint === key) {
              Object.assign(responsiveStyles, style);
            } else {
              responsiveStyles[breakpoints.up(key as Breakpoint)] = style;
            }
          }, breakpointValue);
        }
      }
    });
  } else if (typeof responsive === 'number' || typeof responsive === 'string') {
    iterator((responsiveStyles, style) => {
      Object.assign(responsiveStyles, style);
    }, responsive);
  }
};
