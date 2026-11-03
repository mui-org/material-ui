import type { OverridableStringUnion } from '@mui/types';

export interface BreakpointOverrides {}

export type Breakpoint = OverridableStringUnion<
  'xs' | 'sm' | 'md' | 'lg' | 'xl',
  BreakpointOverrides
>;

// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
export const breakpointKeys = ['xs', 'sm', 'md', 'lg', 'xl'] as unknown as Breakpoint[];

// Keep in sync with docs/src/pages/customization/breakpoints/breakpoints.md
// #host-reference
export interface Breakpoints {
  keys: Breakpoint[];
  values: { [key in Breakpoint]: number };
  up: (key: Breakpoint | number) => string;
  down: (key: Breakpoint | number) => string;
  between: (start: Breakpoint | number, end: Breakpoint | number) => string;
  only: (key: Breakpoint) => string;
  not: (key: Breakpoint) => string;
  unit?: string | undefined;
  /**
   * @ignore - Do not document.
   */
  internal_mediaKeys: string[];
}

export interface BreakpointsOptions extends Partial<Breakpoints> {
  /**
   * The increment divided by 100 used to implement exclusive breakpoints.
   * For example, `step: 5` means that `down(500)` will result in `'(max-width: 499.95px)'`.
   * @default 5
   */
  step?: number | undefined;
  /**
   * The unit used for the breakpoint's values.
   * @default 'px'
   */
  unit?: string | undefined;
}

const sortBreakpointsValues = (values: Record<string, number>): Record<string, number> => {
  const breakpointsAsArray = Object.keys(values).map((key) => ({ key, val: values[key] })) || [];
  // Sort in ascending order
  breakpointsAsArray.sort((breakpoint1, breakpoint2) => breakpoint1.val - breakpoint2.val);
  return breakpointsAsArray.reduce<Record<string, number>>((acc, obj) => {
    return { ...acc, [obj.key]: obj.val };
  }, {});
};

// Keep in mind that @media is inclusive by the CSS specification.
export default function createBreakpoints(breakpoints: BreakpointsOptions): Breakpoints {
  const {
    values = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    } as Record<string, number>,
    unit = 'px',
    step = 5,
    ...other
  } = breakpoints as BreakpointsOptions & { values?: Record<string, number> | undefined };

  const sortedValues = sortBreakpointsValues(values as Record<string, number>);
  const keys = Object.keys(sortedValues);

  function up(key: Breakpoint | number) {
    const value =
      typeof (values as any)[key as any] === 'number' ? (values as any)[key as any] : key;
    return `@media (min-width:${value}${unit})`;
  }

  function down(key: Breakpoint | number) {
    const value =
      typeof (values as any)[key as any] === 'number' ? (values as any)[key as any] : key;
    return `@media (max-width:${(value as number) - step / 100}${unit})`;
  }

  function between(start: Breakpoint | number, end: Breakpoint | number) {
    const endIndex = keys.indexOf(end as string);

    return (
      `@media (min-width:${
        typeof (values as any)[start as any] === 'number' ? (values as any)[start as any] : start
      }${unit}) and ` +
      `(max-width:${
        (endIndex !== -1 && typeof (values as any)[keys[endIndex]] === 'number'
          ? (values as any)[keys[endIndex]]
          : (end as number)) -
        step / 100
      }${unit})`
    );
  }

  function only(key: Breakpoint): string {
    if (keys.indexOf(key) + 1 < keys.length) {
      return between(key, keys[keys.indexOf(key) + 1] as Breakpoint);
    }

    return up(key);
  }

  function not(key: Breakpoint): string {
    // handle first and last key separately, for better readability
    const keyIndex = keys.indexOf(key);
    if (keyIndex === 0) {
      return up(keys[1] as Breakpoint);
    }
    if (keyIndex === keys.length - 1) {
      return down(keys[keyIndex] as Breakpoint);
    }

    return between(key, keys[keys.indexOf(key) + 1] as Breakpoint).replace(
      '@media',
      '@media not all and',
    );
  }

  const mediaKeys: string[] = [];
  for (let i = 0; i < keys.length; i += 1) {
    mediaKeys.push(up(keys[i] as Breakpoint));
  }

  return {
    keys: keys as Breakpoint[],
    values: sortedValues as Breakpoints['values'],
    up,
    down,
    between,
    only,
    not,
    unit,
    internal_mediaKeys: mediaKeys,
    ...other,
  };
}
