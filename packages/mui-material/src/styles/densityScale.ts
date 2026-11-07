import type { Theme, ThemeOptions } from './createTheme';
import type { CssVarsTheme } from './createThemeWithVars';

/** Named steps of the spacing scale, surfaced as `--<prefix>-spacing-*` CSS
 * vars and resolvable through `theme.spacing('<key>')`. */
export const DEFAULT_STEP_PX = {
  xxSmall: 4,
  xSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  xLarge: 32,
  xxLarge: 48,
};

export type DensityKey = keyof typeof DEFAULT_STEP_PX;

export const DENSITY_KEYS = Object.keys(DEFAULT_STEP_PX) as DensityKey[];

/** Values that size a box rather than space one, so they are not spacing keys:
 * `theme.spacing()` does not resolve them and they ship under their own
 * `--<prefix>-<key>` variable, not the spacing namespace. */
export const DEFAULT_SIZING_PX = {
  touchTarget: 32,
  iconSize: 16,
};

export type DensitySizingKey = keyof typeof DEFAULT_SIZING_PX;

export const SIZING_KEYS = Object.keys(DEFAULT_SIZING_PX) as DensitySizingKey[];

/**
 * What `enhanceDensity` accepts as its second argument. The steps nest under
 * `spacing` because that is the surface they land on — `theme.spacing('small')`
 * resolves them — while the sizing constants size a box and sit at the top
 * level. Values are px; anything left out keeps its default.
 */
/** The scale a theme ended up with, in px numbers, for code that needs the
 * values in JS (MUI X derives row heights from `touchTarget + small`). Written
 * to `theme.unstable_densityScale` by `enhanceDensity`. */
export type ResolvedDensityScale = Record<DensitySizingKey, number> & {
  spacing: Record<DensityKey, number>;
};

export type DensityScaleOverrides = Partial<Record<DensitySizingKey, number>> & {
  spacing?: Partial<Record<DensityKey, number>> | undefined;
};

const cssVarName = (theme: EnhanceableTheme, name: string) => {
  const prefix = theme.cssVarPrefix ?? 'mui';
  return `--${prefix ? `${prefix}-` : ''}${name}`;
};

/** The resolved length of a sizing constant — what the theme node carries, and
 * the fallback every reference to it falls back to. */
const sizingPx = (key: DensitySizingKey, overrides?: DensityScaleOverrides) =>
  `${overrides?.[key] ?? DEFAULT_SIZING_PX[key]}px`;

/**
 * What a component emits for a sizing constant: a variable reference on a vars
 * theme, so plain CSS can move every control box at once, and the literal px
 * otherwise. The px stays the fallback either way.
 */
function densitySizing(
  theme: EnhanceableTheme,
  key: DensitySizingKey,
  overrides?: DensityScaleOverrides,
): string {
  const px = sizingPx(key, overrides);
  return theme.vars ? `var(${cssVarName(theme, key)}, ${px})` : px;
}

/** A real `createTheme()` result. The CSS-vars machinery is `Partial`-picked
 * because `CssVarsProperties` hides it behind the `CssThemeVariables` flag
 * while a `cssVariables: true` theme still carries it at runtime. */
export type EnhanceableTheme = Theme &
  Partial<
    Pick<
      CssVarsTheme,
      'rootSelector' | 'cssVarPrefix' | 'generateThemeVars' | 'generateStyleSheets'
    >
  > &
  Pick<ThemeOptions, 'modularCssLayers'>;

export type DensityEnhancedTheme<T extends EnhanceableTheme> = T & {
  components: NonNullable<EnhanceableTheme['components']>;
  vars?: Partial<Record<DensitySizingKey, string>> | undefined;
} & Record<DensitySizingKey, string>;

/**
 * PRIVATE density core behind `enhanceDensity`: the keyed `theme.spacing`
 * wrapper + the `--<prefix>-spacing-*` step emission. No `theme.density` node.
 */
export function applyDensity<T extends EnhanceableTheme>(
  themeInput: T,
  /** Per-value replacement in px. Numbers keep every step resolvable in JS too
   * (MUI X derives virtualized heights off the same ladder). */
  scaleOverrides?: DensityScaleOverrides,
) {
  const theme = { ...themeInput } as DensityEnhancedTheme<T> & {
    unstable_densityScale: ResolvedDensityScale;
  };
  theme.components = { ...themeInput.components };

  // The Spacing interface is overloaded (0-4 fixed args) — widen to the rest
  // shape once so per-arg delegation and whole-call spreads both type.
  const prevSpacing = themeInput.spacing as (
    ...args: ReadonlyArray<number | string>
  ) => string | number;

  const stepVarName = (key: DensityKey) => cssVarName(themeInput, `spacing-${key}`);

  // The ladder is absolute px: a `scale` override is a number, which can only
  // mean px (MUI X reads those same numbers to derive sizes in JS), so a step
  // never rides the spacing unit — not even on a vars theme, where restating
  // it against `--<prefix>-spacing` would let a CSS-level unit override move
  // every step despite the documented "12px whatever `spacing` is".
  const stepValue = (px: number) => `${px}px`;

  const overrides = scaleOverrides ?? {};

  const stepValues = {} as Record<DensityKey, string>;
  // Every key AND its negated pull resolved once per theme, so the wrapper is a
  // hash lookup instead of per-call key parsing. Null-prototype: on a bare `{}`
  // inherited members (`toString`) would read as steps.
  const resolved: Record<string, string> = Object.create(null);
  DENSITY_KEYS.forEach((key) => {
    const px = overrides.spacing?.[key] ?? DEFAULT_STEP_PX[key];
    stepValues[key] = stepValue(px);

    if (themeInput.vars) {
      // Fallback to the computed step: the definitions only mount through
      // `generateStyleSheets()`, which a nested provider reusing the prefix or
      // `disableStyleSheetGeneration` skips — a bare ref would then compute
      // to unset in every emission.
      const ref = `var(${stepVarName(key)}, ${stepValues[key]})`;
      resolved[key] = ref;
      resolved[`-${key}`] = `calc(${ref} * -1)`;
      return;
    }
    resolved[key] = stepValues[key];
    resolved[`-${key}`] = stepValue(-px);
  });

  const stepKeys = new Set(Object.keys(resolved));

  // Key-free calls are the hot path (sx/gap/Stack route every spacing value
  // through here at style-computation time) — delegate wholesale so the
  // wrapper adds one function hop, not a second map/join pass.
  const makeKeyedSpacing = (
    base: (...args: ReadonlyArray<number | string>) => string | number,
  ): T['spacing'] => {
    const spacing = (...args: ReadonlyArray<number | string>): string => {
      if (args.length === 1) {
        const only = args[0];
        const step = typeof only === 'string' ? resolved[only] : undefined;
        return step === undefined ? String(base(only)) : step;
      }
      let keyed = false;
      for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];
        if (typeof arg === 'string' && resolved[arg] !== undefined) {
          keyed = true;
          break;
        }
      }
      if (!keyed) {
        return String(base(...args));
      }
      let out = '';
      for (let i = 0; i < args.length; i += 1) {
        const arg = args[i];
        const step = typeof arg === 'string' ? resolved[arg] : undefined;
        out += (i === 0 ? '' : ' ') + (step === undefined ? String(base(arg)) : step);
      }
      return out;
    };
    // `createSpacing` early-returns on this flag, so re-running createTheme
    // over an enhanced theme keeps the wrapper.
    (spacing as any).mui = true;
    // `createUnaryUnit` hands this very function to the sx spacing props, so
    // advertising the step names is what lets `sx={{ p: 'small' }}` resolve.
    (spacing as any).keys = stepKeys;
    return spacing as T['spacing'];
  };
  theme.spacing = makeKeyedSpacing(prevSpacing);

  // `CssVarsProvider` rebuilds `theme.spacing = theme.generateSpacing()` on
  // mount — without wrapping the generator too, the rebuilt function has no
  // `keys` and `sx={{ p: 'small' }}` emits the raw name.
  const prevGenerateSpacing = (themeInput as any).generateSpacing;
  if (typeof prevGenerateSpacing === 'function') {
    (theme as any).generateSpacing = function generateSpacing(this: unknown) {
      return makeKeyedSpacing(
        prevGenerateSpacing.call(this ?? themeInput) as (
          ...args: ReadonlyArray<number | string>
        ) => string | number,
      );
    };
  }

  // Read as `(theme.vars || theme).touchTarget`: the plain theme carries the
  // resolved length, the vars node the reference to it.
  SIZING_KEYS.forEach((key) => {
    theme[key] = sizingPx(key, scaleOverrides);
  });
  theme.unstable_densityScale = {
    spacing: Object.fromEntries(
      DENSITY_KEYS.map((key) => [key, overrides.spacing?.[key] ?? DEFAULT_STEP_PX[key]]),
    ) as Record<DensityKey, number>,
    touchTarget: overrides.touchTarget ?? DEFAULT_SIZING_PX.touchTarget,
    iconSize: overrides.iconSize ?? DEFAULT_SIZING_PX.iconSize,
  };

  if (themeInput.vars) {
    const sizingVars = {} as Record<DensitySizingKey, string>;
    SIZING_KEYS.forEach((key) => {
      sizingVars[key] = densitySizing(themeInput, key, scaleOverrides);
    });
    theme.vars = { ...themeInput.vars, ...sizingVars };
    // `CssVarsProvider` swaps `theme.vars` for `generateThemeVars()` on mount,
    // so the generator has to carry them too or they vanish once mounted.
    const prevGenerateThemeVars = themeInput.generateThemeVars;
    if (prevGenerateThemeVars) {
      theme.generateThemeVars = () => ({ ...prevGenerateThemeVars(), ...sizingVars });
    }
  }

  if (theme.generateStyleSheets) {
    // Steps ship as raw declarations only, never onto `theme.vars.spacing`:
    // that stays the unit `getPath` reads straight through — a string, or an
    // array for array spacing — and re-keying it by step name would break
    // every consumer of both shapes.
    const rootVars: Record<string, string> = {};
    DENSITY_KEYS.forEach((key) => {
      rootVars[stepVarName(key)] = stepValues[key];
    });
    SIZING_KEYS.forEach((key) => {
      rootVars[cssVarName(themeInput, key)] = sizingPx(key, scaleOverrides);
    });
    const prevStyleSheets = themeInput.generateStyleSheets;
    const rootSelector = themeInput.rootSelector || ':root';
    theme.generateStyleSheets = () => [
      ...(prevStyleSheets ? prevStyleSheets() : []),
      { [rootSelector]: rootVars },
    ];
  }

  return theme;
}
