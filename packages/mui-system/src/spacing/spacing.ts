import responsivePropType from '../responsivePropType';
import { iterateBreakpoints } from '../breakpoints';
import { getPath } from '../style';
import type { SimpleStyleFunction, PropsFor } from '../style';

/* eslint-disable guard-for-in */

export type SpacingValueType = string | number | null | undefined;

const EMPTY_THEME = { internal_cache: {} };

const properties: Record<string, string> = {
  m: 'margin',
  p: 'padding',
};

const directions: Record<string, string | string[]> = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom'],
};

const aliases: Record<string, string> = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py',
};

const CSS_PROPERTIES: Record<string, string[]> = {};
for (const key in properties) {
  CSS_PROPERTIES[key] = [properties[key]];
}
for (const keyProperty in properties) {
  for (const keyDirection in directions) {
    const property = properties[keyProperty];
    const direction = directions[keyDirection];
    const value = Array.isArray(direction)
      ? direction.map((dir) => property + dir)
      : [property + direction];
    CSS_PROPERTIES[keyProperty + keyDirection] = value;
  }
}
for (const key in aliases) {
  CSS_PROPERTIES[key] = CSS_PROPERTIES[aliases[key]];
}

/** @internal */
export const marginKeys = new Set([
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'marginInline',
  'marginInlineStart',
  'marginInlineEnd',
  'marginBlock',
  'marginBlockStart',
  'marginBlockEnd',
]);

/** @internal */
export const paddingKeys = new Set([
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'paddingX',
  'paddingY',
  'paddingInline',
  'paddingInlineStart',
  'paddingInlineEnd',
  'paddingBlock',
  'paddingBlockStart',
  'paddingBlockEnd',
]);

const spacingKeys = new Set([...marginKeys, ...paddingKeys]);

function createBaseUnit<Spacing>(
  theme: { spacing: Spacing },
  themeKey: string,
  defaultValue: Spacing,
  propName: string,
): Spacing extends number
  ? (abs: SpacingValueType) => number | number
  : Spacing extends any[]
    ? <Index extends number>(abs: Index | string) => Spacing[Index] | string
    : Spacing extends (...args: unknown[]) => unknown
      ? Spacing
      : () => undefined {
  const themeSpacing = (getPath(theme as any, themeKey, true) ?? defaultValue) as any;

  if (typeof themeSpacing === 'number' || typeof themeSpacing === 'string') {
    return ((val: any) => {
      if (typeof val === 'string') {
        return val;
      }

      if (process.env.NODE_ENV !== 'production') {
        if (typeof val !== 'number') {
          console.error(
            `MUI: Expected ${propName} argument to be a number or a string, got ${val}.`,
          );
        }
      }

      if (typeof themeSpacing === 'string') {
        if (themeSpacing.startsWith('var(') && val === 0) {
          return 0;
        }
        if (themeSpacing.startsWith('var(') && val === 1) {
          return themeSpacing;
        }
        return `calc(${val} * ${themeSpacing})`;
      }
      return themeSpacing * val;
    }) as any;
  }

  if (Array.isArray(themeSpacing)) {
    return ((val: any) => {
      if (typeof val === 'string') {
        return val;
      }
      const abs = Math.abs(val);

      if (process.env.NODE_ENV !== 'production') {
        if (!Number.isInteger(abs)) {
          console.error(
            [
              `MUI: The \`theme.${themeKey}\` array type cannot be combined with non integer values.` +
                `You should either use an integer value that can be used as index, or define the \`theme.${themeKey}\` as a number.`,
            ].join('\n'),
          );
        } else if (abs > themeSpacing.length - 1) {
          console.error(
            [
              `MUI: The value provided (${abs}) overflows.`,
              `The supported values are: ${JSON.stringify(themeSpacing)}.`,
              `${abs} > ${themeSpacing.length - 1}, you need to add the missing values.`,
            ].join('\n'),
          );
        }
      }

      const transformed = themeSpacing[abs];

      if (val >= 0) {
        return transformed;
      }

      if (typeof transformed === 'number') {
        return -transformed;
      }

      if (typeof transformed === 'string' && transformed.startsWith('var(')) {
        return `calc(-1 * ${transformed})`;
      }

      return `-${transformed}`;
    }) as any;
  }

  if (typeof themeSpacing === 'function') {
    return themeSpacing as any;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(
      [
        `MUI: The \`theme.${themeKey}\` value (${themeSpacing}) is invalid.`,
        'It should be a number, an array or a function.',
      ].join('\n'),
    );
  }

  return (() => undefined) as any;
}

// Keyed on the theme, not the scale: a scale function can be shared by two
// themes whose `vars.spacing` differ, and the closure below captures `base`.
const keyedTransformers = new WeakMap<
  object,
  { scale: SpacingTransformer; byProp: Record<string, SpacingTransformer> }
>();

export function createUnaryUnit<Spacing>(
  theme: { spacing: Spacing },
  themeKey: string,
  defaultValue: Spacing,
  propName: string,
): Spacing extends number
  ? (abs: SpacingValueType) => number | number
  : Spacing extends any[]
    ? <Index extends number>(abs: Index | string) => Spacing[Index] | string
    : Spacing extends (...args: unknown[]) => unknown
      ? Spacing
      : () => undefined {
  const base = createBaseUnit(theme, themeKey, defaultValue, propName);
  const scale = (theme as any)?.[themeKey] as SpacingTransformer | undefined;

  // On a CSS variables theme `getPath` resolves `theme.vars.spacing` — a string,
  // which cannot resolve names. Keep that transformer for every numeric value and
  // route only registered names back through the scale-aware function.
  if (typeof scale === 'function' && scale.keys && (base as unknown) !== scale) {
    // Built once per theme: this runs for every spacing prop of every render.
    let cache = keyedTransformers.get(theme);
    if (!cache || cache.scale !== scale) {
      cache = { scale, byProp: {} };
      keyedTransformers.set(theme, cache);
    }
    if (!cache.byProp[propName]) {
      const keyed = ((value: SpacingValueType) =>
        typeof value === 'string' && scale.keys!.has(value)
          ? scale(value)
          : (base as SpacingTransformer)(value)) as SpacingTransformer;
      keyed.keys = scale.keys;
      cache.byProp[propName] = keyed;
    }
    return cache.byProp[propName] as any;
  }

  return base;
}

export function createUnarySpacing<Spacing>(theme: {
  spacing: Spacing;
}): Spacing extends number
  ? (abs: number | string) => number | number
  : Spacing extends any[]
    ? <Index extends number>(abs: Index | string) => Spacing[Index] | string
    : Spacing extends (...args: unknown[]) => unknown
      ? Spacing
      : () => undefined {
  return createUnaryUnit(theme, 'spacing', 8 as any, 'spacing') as any;
}

/**
 * A spacing transformer, optionally advertising the named scale values it can
 * resolve (registered through `SpacingKeyOverrides`). Without `keys` the
 * behavior is unchanged: every string is raw CSS.
 */
export type SpacingTransformer = ((prop: SpacingValueType) => SpacingValueType) & {
  keys?: ReadonlySet<string> | undefined;
};

export function getValue(
  transformer: SpacingTransformer,
  propValue: SpacingValueType,
): SpacingValueType {
  if (propValue == null) {
    return propValue;
  }
  if (typeof propValue === 'string') {
    // Raw CSS values (`auto`, `2rem`, `50%`) must reach the stylesheet
    // untouched — only registered scale names go through the transformer.
    return transformer.keys?.has(propValue) ? transformer(propValue) : propValue;
  }
  return transformer(propValue);
}

// Avoid allocations
const container: [string] = [''];

function style(props: any, keys: Set<string>) {
  const theme = props.theme ?? EMPTY_THEME;
  const transformer = theme?.internal_cache?.unarySpacing ?? createUnarySpacing(theme);

  const result: Record<string, any> = {};
  for (const prop in props) {
    if (!keys.has(prop)) {
      continue;
    }

    const cssProperties = CSS_PROPERTIES[prop] ?? ((container[0] = prop), container);
    const propValue = props[prop];

    iterateBreakpoints(result, props.theme, propValue, (mediaKey, value) => {
      const target = mediaKey ? result[mediaKey] : result;
      for (let i = 0; i < cssProperties.length; i += 1) {
        target[cssProperties[i]] = getValue(transformer as any, value);
      }
    });
  }

  return result;
}

function marginFn(props: any) {
  return style(props, marginKeys);
}
(marginFn as any).propTypes =
  process.env.NODE_ENV !== 'production'
    ? Array.from(marginKeys).reduce<Record<string, any>>((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};
(marginFn as any).filterProps = marginKeys;
export const margin = marginFn as unknown as SimpleStyleFunction<
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'margin'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginX'
  | 'marginY'
  | 'marginInline'
  | 'marginInlineStart'
  | 'marginInlineEnd'
  | 'marginBlock'
  | 'marginBlockStart'
  | 'marginBlockEnd'
>;

export type MarginProps = PropsFor<typeof margin>;

function paddingFn(props: any) {
  return style(props, paddingKeys);
}
(paddingFn as any).propTypes =
  process.env.NODE_ENV !== 'production'
    ? Array.from(paddingKeys).reduce<Record<string, any>>((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};
(paddingFn as any).filterProps = paddingKeys;
export const padding = paddingFn as unknown as SimpleStyleFunction<
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingX'
  | 'paddingY'
  | 'paddingInline'
  | 'paddingInlineStart'
  | 'paddingInlineEnd'
  | 'paddingBlock'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
>;

export type PaddingProps = PropsFor<typeof padding>;

function spacingFn(props: any) {
  return style(props, spacingKeys);
}
(spacingFn as any).propTypes =
  process.env.NODE_ENV !== 'production'
    ? Array.from(spacingKeys).reduce<Record<string, any>>((obj, key) => {
        obj[key] = responsivePropType;
        return obj;
      }, {})
    : {};
(spacingFn as any).filterProps = spacingKeys;

const spacing = spacingFn as unknown as SimpleStyleFunction<
  | 'm'
  | 'mt'
  | 'mr'
  | 'mb'
  | 'ml'
  | 'mx'
  | 'my'
  | 'p'
  | 'pt'
  | 'pr'
  | 'pb'
  | 'pl'
  | 'px'
  | 'py'
  | 'margin'
  | 'marginTop'
  | 'marginRight'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginX'
  | 'marginY'
  | 'marginInline'
  | 'marginInlineStart'
  | 'marginInlineEnd'
  | 'marginBlock'
  | 'marginBlockStart'
  | 'marginBlockEnd'
  | 'padding'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingX'
  | 'paddingY'
  | 'paddingInline'
  | 'paddingInlineStart'
  | 'paddingInlineEnd'
  | 'paddingBlock'
  | 'paddingBlockStart'
  | 'paddingBlockEnd'
>;

export type SpacingProps = PropsFor<typeof spacing>;

export default spacing;
