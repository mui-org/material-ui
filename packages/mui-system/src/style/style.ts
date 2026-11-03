import capitalize from '@mui/utils/capitalize';
import type { CSSObject } from '@mui/styled-engine';
import responsivePropType from '../responsivePropType';
import { handleBreakpoints } from '../breakpoints';

export type StyleFunction<Props> = (props: Props) => any;

export type PropsFor<SomeStyleFunction> =
  SomeStyleFunction extends StyleFunction<infer Props> ? Props : never;

export type SimpleStyleFunction<PropKey extends keyof any> = StyleFunction<
  Partial<Record<PropKey, any>>
> & { filterProps: string[] };

export type TransformFunction = (
  cssValue: unknown,
  userValue: unknown,
  transform: object | ((arg: any) => any) | undefined | null,
) => number | string | React.CSSProperties | CSSObject;

export interface StyleOptions<PropKey> {
  cssProperty?: PropKey | keyof React.CSSProperties | false | undefined;
  prop: PropKey;
  /**
   * dot access in `Theme`
   */
  themeKey?: string | undefined;
  transform?: TransformFunction | undefined;
}

/**
 * TODO(v7): Keep either this one or `getStyleValue2`
 */
export function getStyleValue(
  themeMapping: object | ((arg: any) => any) | null | undefined,
  transform: TransformFunction | null | undefined,
  valueFinal: unknown,
  userValue: unknown = valueFinal,
): any {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(valueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[valueFinal as any] || userValue;
  } else if (typeof valueFinal === 'string') {
    value = getPath(themeMapping, valueFinal) || userValue;
  } else {
    value = userValue;
  }

  if (transform) {
    value = transform(value, userValue, themeMapping);
  }

  return value;
}

/**
 * HACK: The `alternateProp` logic is there because our theme looks like this:
 * {
 *   typography: {
 *     fontFamily: 'comic sans',
 *     fontFamilyCode: 'courrier new',
 *   }
 * }
 * And we support targetting:
 * - `typography.fontFamily`     with `sx={{ fontFamily: 'default' }}`
 * - `typography.fontFamilyCode` with `sx={{ fontFamily: 'code' }}`
 *
 * TODO(v7): Refactor our theme to look like this and remove the horrendous logic:
 * {
 *   typography: {
 *     fontFamily: {
 *       default: 'comic sans',
 *       code: 'courrier new',
 *     }
 *   }
 * }
 */
export function getStyleValue2(
  themeMapping: object | ((arg: any) => any) | null | undefined,
  transform: TransformFunction | null | undefined,
  userValue: unknown,
  alternateProp: string | undefined,
): any {
  let value;

  if (typeof themeMapping === 'function') {
    value = themeMapping(userValue);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[userValue as any] || userValue;
  } else if (typeof userValue === 'string') {
    value = getPath(themeMapping, userValue, true, alternateProp) || userValue;
  } else {
    value = userValue;
  }

  if (transform) {
    value = transform(value, userValue, themeMapping);
  }

  return value;
}

export function getPath<T extends Record<string, any> | undefined | null>(
  obj: T,
  pathInput: string | undefined,
  checkVars: boolean = true,
  alternateProp: string | undefined = undefined,
): null | unknown {
  if (!obj || !pathInput) {
    return null;
  }

  const path = pathInput.split('.');

  // Check if CSS variables are used
  if (obj.vars && checkVars) {
    const val = getPathImpl(obj.vars, path, alternateProp);
    if (val != null) {
      return val;
    }
  }

  return getPathImpl(obj, path, alternateProp);
}

function getPathImpl(object: any, path: string[], alternateProp: string | undefined = undefined) {
  let lastResult = undefined;
  let result = object;
  let index = 0;

  while (index < path.length) {
    if (result === null || result === undefined) {
      return result;
    }

    lastResult = result;
    result = result[path[index]];
    index += 1;
  }

  if (alternateProp && result === undefined) {
    const lastKey = path[path.length - 1];
    const alternateKey = `${alternateProp}${lastKey === 'default' ? '' : capitalize(lastKey)}`;
    return lastResult?.[alternateKey];
  }

  return result;
}

type StyleResult<PropKey extends string | number | symbol, Theme> = StyleFunction<
  { [K in PropKey]?: unknown } & { theme?: Theme | undefined }
> & { filterProps: string[]; propTypes: any };

export default function style<PropKey extends string, Theme extends object>(
  options: StyleOptions<PropKey>,
): StyleResult<PropKey, Theme> {
  const { prop, cssProperty = options.prop, themeKey, transform } = options;

  // eslint-disable-next-line react/function-component-definition
  const fn: StyleResult<PropKey, Theme> = (props) => {
    if (props[prop] == null) {
      return null;
    }

    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (valueFinal: any) => {
      const value = getStyleValue2(themeMapping, transform, valueFinal, prop);
      return cssProperty === false
        ? value
        : {
            [cssProperty]: value,
          };
    };

    return handleBreakpoints(props, propValue, styleFromPropValue);
  };

  fn.propTypes =
    process.env.NODE_ENV !== 'production'
      ? {
          [prop]: responsivePropType,
        }
      : {};

  fn.filterProps = [prop];

  return fn;
}
