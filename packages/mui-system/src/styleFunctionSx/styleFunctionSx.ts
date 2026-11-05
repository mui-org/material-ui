import merge from '@mui/utils/fastDeepAssign';
import type * as CSS from 'csstype';
import type { CSSObject } from '@mui/styled-engine';
import { getPath, getStyleValue2 } from '../style';
import {
  hasBreakpoint,
  iterateBreakpoints,
  createEmptyBreakpointObject,
  removeUnusedBreakpoints,
  DEFAULT_BREAKPOINTS,
} from '../breakpoints';
import { sortContainerQueries } from '../cssContainerQueries';
import defaultSxConfig from './defaultSxConfig';
import type { StandardCSSProperties } from './StandardCssProperties';
import type { AliasesCSSProperties } from './AliasesCSSProperties';
import type { OverwriteCSSProperties } from './OverwriteCSSProperties';

/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 */
export type ResponsiveStyleValue<T> = T | ReadonlyArray<T | null> | { [key: string]: T | null };

/**
 * Map of all CSS pseudo selectors (`:hover`, `:focus`, ...).
 */
export type CSSPseudoSelectorProps<Theme extends object = {}> = {
  [K in CSS.Pseudos]?: ((theme: Theme) => SystemStyleObject<Theme>) | SystemStyleObject<Theme>;
};

/**
 * Map all nested selectors.
 */
export interface CSSSelectorObject<Theme extends object = {}> {
  [cssSelector: string]: ((theme: Theme) => SystemStyleObject<Theme>) | SystemStyleObject<Theme>;
}

type CssVariableType = string | number;

/**
 * Map all nested selectors and CSS variables.
 */
export interface CSSSelectorObjectOrCssVariables<Theme extends object = {}> {
  [cssSelectorOrVariable: string]:
    | ((theme: Theme) => SystemStyleObject<Theme> | string | number)
    | SystemStyleObject<Theme>
    | CssVariableType;
}

/**
 * Map of all available CSS properties (including aliases) and their raw value.
 * Only used internally to map CSS properties to input types (responsive value,
 * theme function or nested) in `SystemCssProperties`.
 */
export interface AllSystemCSSProperties
  extends
    Omit<StandardCSSProperties, keyof OverwriteCSSProperties>,
    OverwriteCSSProperties,
    AliasesCSSProperties {}

export type SystemCssProperties<Theme extends object = {}> = {
  [K in keyof AllSystemCSSProperties]:
    | ResponsiveStyleValue<AllSystemCSSProperties[K]>
    | ((theme: Theme) => ResponsiveStyleValue<AllSystemCSSProperties[K]>)
    | null;
};

/**
 * The `SystemStyleObject` defines custom properties that will be transformed to
 * their corresponding values from the `Theme`. Other valid CSS properties are also allowed.
 */
export type SystemStyleObject<Theme extends object = {}> =
  | SystemCssProperties<Theme>
  | CSSPseudoSelectorProps<Theme>
  | CSSSelectorObjectOrCssVariables<Theme>
  | null;

/**
 * The `SxProps` can be either object or function
 */
export type SxProps<Theme extends object = {}> =
  | SystemStyleObject<Theme>
  | ((theme: Theme) => SystemStyleObject<Theme>)
  | ReadonlyArray<
      boolean | SystemStyleObject<Theme> | ((theme: Theme) => SystemStyleObject<Theme>)
    >;

export interface StyleFunctionSx {
  (props: object): CSSObject;
  filterProps?: string[] | undefined;
}

/* eslint-disable guard-for-in */

const EMPTY_THEME = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export function unstable_createStyleFunctionSx(): StyleFunctionSx {
  function styleFunctionSx(props: any) {
    if (!props.sx) {
      return null;
    }

    const { sx, theme = EMPTY_THEME, nested } = props;

    const config = theme.unstable_sxConfig ?? defaultSxConfig;

    // Pass argument without loop allocations
    const wrapper: any = { sx: null, theme, nested: true };

    function process(sxInput: any) {
      let sxObject = sxInput;
      if (typeof sxInput === 'function') {
        sxObject = sxInput(theme);
      } else if (typeof sxInput !== 'object') {
        // value
        return sxInput;
      }
      if (!sxObject) {
        return null;
      }

      const breakpoints = theme.breakpoints ?? DEFAULT_BREAKPOINTS;

      const css: any = createEmptyBreakpointObject(breakpoints);

      for (const styleKey in sxObject) {
        const value = callIfFn(sxObject[styleKey], theme);
        if (value === null || value === undefined) {
          continue;
        }
        if (typeof value !== 'object') {
          setThemeValue(css, styleKey, value, theme, config);
          continue;
        }
        if (config[styleKey]) {
          setThemeValue(css, styleKey, value, theme, config);
          continue;
        }

        if (hasBreakpoint(breakpoints, value)) {
          iterateBreakpoints(css, props.theme, value, (mediaKey: any, finalValue: any) => {
            css[mediaKey][styleKey] = finalValue;
          });
        } else {
          wrapper.sx = value;
          css[styleKey] = styleFunctionSx(wrapper);
        }
      }

      if (!nested && theme.modularCssLayers) {
        return {
          '@layer sx': sortContainerQueries(theme, removeUnusedBreakpoints(breakpoints, css)),
        };
      }

      return sortContainerQueries(theme, removeUnusedBreakpoints(breakpoints, css));
    }

    return Array.isArray(sx) ? sx.map(process) : process(sx);
  }

  (styleFunctionSx as any).filterProps = ['sx'];

  return styleFunctionSx as unknown as StyleFunctionSx;
}

export default unstable_createStyleFunctionSx();

function setThemeValue(css: any, prop: any, value: any, theme: any, config: any) {
  const options = config[prop];

  if (!options) {
    css[prop] = value;
    return;
  }

  if (value == null) {
    return;
  }

  const { themeKey } = options;
  // TODO v6: remove, see https://github.com/mui/material-ui/pull/38123
  if (themeKey === 'typography' && value === 'inherit') {
    css[prop] = value;
    return;
  }

  const { style } = options;
  if (style) {
    merge(
      css,
      style({
        [prop]: value,
        theme,
      }),
    );
    return;
  }

  const { cssProperty = prop, transform } = options;
  const themeMapping: any = getPath(theme, themeKey);

  iterateBreakpoints(css, theme, value, (mediaKey: any, valueFinal: any) => {
    const finalValue = getStyleValue2(themeMapping, transform, valueFinal, prop);

    if (cssProperty === false) {
      if (mediaKey) {
        merge(css[mediaKey], finalValue);
      } else {
        merge(css, finalValue);
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (mediaKey) {
        css[mediaKey][cssProperty] = finalValue;
      } else {
        css[cssProperty] = finalValue;
      }
    }
  });
}

function callIfFn(maybeFn: any, arg: any) {
  return typeof maybeFn === 'function' ? maybeFn(arg) : maybeFn;
}
