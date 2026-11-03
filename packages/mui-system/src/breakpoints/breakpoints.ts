import PropTypes from 'prop-types';
import isObjectEmpty from '@mui/utils/isObjectEmpty';
import fastDeepAssign from '@mui/utils/fastDeepAssign';
import deepmerge from '@mui/utils/deepmerge';
import type { CSSObject } from '@mui/styled-engine';
import merge from '../merge';
import { isCqShorthand, getContainerQuery } from '../cssContainerQueries';
import createBreakpoints from '../createBreakpoints/createBreakpoints';
import type { Breakpoints } from '../createBreakpoints/createBreakpoints';
import type { Breakpoint, Theme } from '../createTheme';
import type { ResponsiveStyleValue } from '../styleFunctionSx';
import type { StyleFunction } from '../style';

const EMPTY_THEME = {};

// The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.
/** @internal */
export const values: Record<string, number> = {
  xs: 0, // phone
  sm: 600, // tablet
  md: 900, // small laptop
  lg: 1200, // desktop
  xl: 1536, // large screen
};

export const DEFAULT_BREAKPOINTS: Breakpoints = createBreakpoints({ values: values as any });

const defaultContainerQueries = {
  containerQueries: (containerName: string) => ({
    up: (key: string | number) => {
      let result = typeof key === 'number' ? key : (values as any)[key as any] || (key as any);
      if (typeof result === 'number') {
        result = `${result}px`;
      }
      return containerName
        ? `@container ${containerName} (min-width:${result})`
        : `@container (min-width:${result})`;
    },
  }),
};

export function handleBreakpoints<Props>(
  props: Props,
  propValue: any,
  styleFromPropValue: (value: any, breakpoint?: Breakpoint) => any,
): any {
  const result: Record<string, any> = {};
  return iterateBreakpoints(
    result,
    (props as any).theme,
    propValue,
    (mediaKey: string | undefined, value: any, initialKey?: string) => {
      const finalValue = styleFromPropValue(value, initialKey as Breakpoint | undefined);
      if (mediaKey) {
        result[mediaKey] = finalValue;
      } else {
        fastDeepAssign(result, finalValue);
      }
    },
  );
}

export function iterateBreakpoints(
  target: any,
  theme: Theme | undefined,
  propValue: any,
  callback: (mediaKey: string | undefined, value: any, initialKey?: string) => any,
): any {
  theme ??= EMPTY_THEME as Theme;

  if (Array.isArray(propValue)) {
    const breakpoints = (theme as any).breakpoints ?? DEFAULT_BREAKPOINTS;
    for (let i = 0; i < propValue.length; i += 1) {
      buildBreakpoint(
        target,
        breakpoints.up(breakpoints.keys[i]),
        propValue[i],
        undefined,
        callback,
      );
    }
    return target;
  }

  if (typeof propValue === 'object') {
    const breakpoints = (theme as any).breakpoints ?? DEFAULT_BREAKPOINTS;
    const breakpointValues = breakpoints.values ?? values;

    for (const key in propValue) {
      if (isCqShorthand(breakpoints.keys, key)) {
        const containerKey = getContainerQuery(
          ((theme as any).containerQueries ? theme : defaultContainerQueries) as any,
          key,
        );
        if (containerKey) {
          buildBreakpoint(target, containerKey, propValue[key], key, callback);
        }
      } else if (key in breakpointValues) {
        const mediaKey = breakpoints.up(key);
        buildBreakpoint(target, mediaKey, propValue[key], key, callback);
      } else {
        const cssKey = key;
        target[cssKey] = propValue[cssKey];
      }
    }

    return target;
  }

  callback(undefined, propValue);

  return target;
}

function buildBreakpoint(
  target: any,
  mediaKey: string,
  value: any,
  initialKey: string | undefined,
  callback: (mediaKey: string | undefined, value: any, initialKey?: string) => any,
) {
  target[mediaKey] ??= {};
  callback(mediaKey, value, initialKey);
}

type DefaultBreakPoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

function setupBreakpoints<Props, BreakpointsInput extends string = DefaultBreakPoints>(
  styleFunction: StyleFunction<Props>,
): StyleFunction<Partial<Record<BreakpointsInput, Props>> & Props> {
  const newStyleFunction = ((props: any) => {
    const theme = props.theme || {};
    const base = (styleFunction as any)(props);
    const themeBreakpoints = theme.breakpoints || DEFAULT_BREAKPOINTS;

    const extended = themeBreakpoints.keys.reduce((acc: any, key: string) => {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = (styleFunction as any)({ theme, ...props[key] });
      }
      return acc;
    }, null);

    return merge(base, extended);
  }) as StyleFunction<Partial<Record<BreakpointsInput, Props>> & Props> & {
    propTypes?: any;
    filterProps?: string[] | undefined;
  };

  newStyleFunction.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          ...(styleFunction as any).propTypes,
          xs: PropTypes.object,
          sm: PropTypes.object,
          md: PropTypes.object,
          lg: PropTypes.object,
          xl: PropTypes.object,
        }
      : {};

  newStyleFunction.filterProps = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    ...((styleFunction as any).filterProps as string[]),
  ];

  return newStyleFunction;
}

/** @internal */
export function createEmptyBreakpointObject(
  breakpoints: Breakpoints = DEFAULT_BREAKPOINTS,
): Record<string, object> {
  const { internal_mediaKeys: mediaKeys } = breakpoints;
  const result: Record<string, object> = {};
  for (let i = 0; i < mediaKeys.length; i += 1) {
    result[mediaKeys[i]] = {};
  }
  return result;
}

/** @internal */
export function removeUnusedBreakpoints(
  breakpoints: Breakpoints,
  style: Record<string, any>,
): Record<string, any> {
  const breakpointKeys = breakpoints.internal_mediaKeys;

  for (let i = 0; i < breakpointKeys.length; i += 1) {
    const key = breakpointKeys[i];

    if (isObjectEmpty(style[key])) {
      delete style[key];
    }
  }

  return style;
}

export function mergeBreakpointsInOrder(
  breakpoints: Breakpoints,
  ...styles: CSSObject[]
): CSSObject {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpoints);
  const mergedOutput = [emptyBreakpoints, ...styles].reduce(
    (prev, next) => deepmerge(prev, next),
    {} as any,
  );
  return removeUnusedBreakpoints(breakpoints, mergedOutput) as CSSObject;
}

/** @internal */
export function computeBreakpointsBase(
  breakpointValues: any,
  themeBreakpoints: Record<string, number>,
): Record<string, true> {
  if (typeof breakpointValues !== 'object') {
    return {};
  }
  const base: Record<string, true> = {};
  const breakpointsKeys = Object.keys(themeBreakpoints);
  if (Array.isArray(breakpointValues)) {
    breakpointsKeys.forEach((breakpoint, i) => {
      if (i < breakpointValues.length) {
        base[breakpoint] = true;
      }
    });
  } else {
    breakpointsKeys.forEach((breakpoint) => {
      if (breakpointValues[breakpoint] != null) {
        base[breakpoint] = true;
      }
    });
  }
  return base;
}

export interface ResolveBreakpointValuesOptions<T> {
  values: ResponsiveStyleValue<T>;
  breakpoints?: Breakpoints['values'] | undefined;
  base?: Record<string, boolean> | undefined;
}

export function resolveBreakpointValues<T>(
  options: ResolveBreakpointValuesOptions<T>,
): Record<string, T> {
  const { values: breakpointValues, breakpoints: themeBreakpoints, base: customBase } = options;
  const base =
    customBase ||
    computeBreakpointsBase(breakpointValues, themeBreakpoints as Record<string, number>);
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return breakpointValues as unknown as Record<string, T>;
  }

  let previous: any;

  return keys.reduce<Record<string, T>>((acc, breakpoint, i) => {
    if (Array.isArray(breakpointValues)) {
      acc[breakpoint] =
        breakpointValues[i] != null ? breakpointValues[i] : breakpointValues[previous];
      previous = i;
    } else if (typeof breakpointValues === 'object' && breakpointValues) {
      const bv = breakpointValues as Record<string, T>;
      acc[breakpoint] = bv[breakpoint] != null ? bv[breakpoint] : bv[previous];
      previous = breakpoint;
    } else {
      acc[breakpoint] = breakpointValues as unknown as T;
    }
    return acc;
  }, {});
}

export function hasBreakpoint(breakpoints: Breakpoints, value: any): boolean {
  if (Array.isArray(value)) {
    return true;
  }
  if (typeof value === 'object' && value !== null) {
    for (let i = 0; i < breakpoints.keys.length; i += 1) {
      if (breakpoints.keys[i] in value) {
        return true;
      }
    }
    const valueKeys = Object.keys(value);
    for (let i = 0; i < valueKeys.length; i += 1) {
      if (isCqShorthand(breakpoints.keys, valueKeys[i])) {
        return true;
      }
    }
  }
  return false;
}

export default setupBreakpoints;
