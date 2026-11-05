import * as React from 'react';
import {
  ThemeOptions as SystemThemeOptions,
  Theme as SystemTheme,
  SxProps,
  CSSObject,
  SxConfig,
  ApplyStyles,
} from '@mui/system';
import { Mixins, MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { TypographyVariants, TypographyVariantsOptions } from './createTypography';
import { Shadows } from './shadows';
import { Motion, MotionOptions } from './createMotion';
import { Transitions, TransitionsOptions } from './createTransitions';
import { ZIndex, ZIndexOptions } from './zIndex';
import { Components } from './components';
import {
  CssVarsTheme,
  CssVarsPalette,
  ColorSystemOptions,
  Shape,
  ShapeOptions,
  SupportedColorScheme,
} from './createThemeFoundation';

/**
 * To disable custom properties, use module augmentation
 *
 * @example
 * declare module '@mui/material/styles' {
 *   interface CssThemeVariables {
 *     enabled: true;
 *   }
 * }
 */
export interface CssThemeVariables {}

/**
 * CSS of the keyboard focus ring, spread onto the `Mui-focusVisible` state. An object merges
 * over the curated default (`solid` style, `palette.primary.main` color, `2px` width, `2px`
 * offset); set `outlineColor: 'transparent'` to drop the outline for a box-shadow-only ring.
 */
export type FocusVisible = React.CSSProperties;

/**
 * The `focusVisible` theme option. `insetOverrides` holds the styles that change on components that
 * draw the ring inside their edge. Without it, those components use `outlineOffset: -outlineWidth`
 * and the same `boxShadow` drawn `inset`.
 */
export type FocusVisibleOptions = React.CSSProperties & {
  insetOverrides?: React.CSSProperties | undefined;
};

type CssVarsOptions = CssThemeVariables extends {
  enabled: true;
}
  ? ColorSystemOptions
  : {};

export interface ThemeOptions extends Omit<SystemThemeOptions, 'zIndex'>, CssVarsOptions {
  mixins?: MixinsOptions | undefined;
  components?: Components<Omit<Theme, 'components'>> | undefined;
  motion?: MotionOptions | undefined;
  palette?: PaletteOptions | undefined;
  shadows?: Shadows | undefined;
  shape?: ShapeOptions | undefined;
  transitions?: TransitionsOptions | undefined;
  typography?:
    TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions) | undefined;
  zIndex?: ZIndexOptions | undefined;
  focusVisible?: boolean | FocusVisibleOptions | undefined;
  unstable_strictMode?: boolean | undefined;
  unstable_sxConfig?: SxConfig | undefined;
  modularCssLayers?: boolean | string | undefined;
}

export interface BaseTheme extends SystemTheme {
  mixins: Mixins;
  motion: Motion;
  palette: Palette & (CssThemeVariables extends { enabled: true } ? CssVarsPalette : {});
  shadows: Shadows;
  shape: Shape;
  transitions: Transitions;
  typography: TypographyVariants;
  zIndex: ZIndex;
  focusVisible?: FocusVisible | false | undefined;
  unstable_strictMode?: boolean | undefined;
  applyStyles: ApplyStyles<SupportedColorScheme>;
  /**
   * Returns the `theme.focusVisible` ring for a focus selector. `'outside'` is `theme.focusVisible`,
   * and `'inside'` merges the inset ring over it. Returns `{}` when `theme.focusVisible` is off.
   * Call it on the theme (`theme.applyFocusVisible(…)`), not destructured.
   *
   * @param position `'outside'` or `'inside'`.
   * @example
   * styleOverrides: {
   *   root: ({ theme }) => ({ '&.Mui-focusVisible': theme.applyFocusVisible('outside') }),
   * }
   */
  applyFocusVisible: (position: 'inside' | 'outside') => CSSObject;
  /** The `focusVisible.insetOverrides` the theme was created with. */
  unstable_focusVisibleInsetOverrides?: React.CSSProperties | undefined;
}

// shut off automatic exporting for the `BaseTheme` above
export {};

type CssVarsProperties = CssThemeVariables extends { enabled: true }
  ? Pick<
      CssVarsTheme,
      | 'colorSchemes'
      | 'colorSchemeSelector'
      | 'rootSelector'
      | 'cssVarPrefix'
      | 'defaultColorScheme'
      | 'getCssVar'
      | 'getColorSchemeSelector'
      | 'generateThemeVars'
      | 'generateStyleSheets'
      | 'generateSpacing'
      | 'shouldSkipGeneratingVar'
      | 'vars'
    >
  : Partial<Pick<CssVarsTheme, 'vars'>>;

/**
 * Our [TypeScript guide on theme customization](https://mui.com/material-ui/guides/typescript/#customization-of-theme) explains in detail how you would add custom properties.
 */
export interface Theme extends BaseTheme, CssVarsProperties {
  cssVariables?: false | undefined;
  components?: Components<BaseTheme> | undefined;
  unstable_sx: (props: SxProps<Theme>) => CSSObject;
  unstable_sxConfig: SxConfig;
  alpha: (color: string, value: number | string) => string;
  lighten: (color: string, coefficient: number | string) => string;
  darken: (color: string, coefficient: number | string) => string;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createThemeNoVars(options?: ThemeOptions, ...args: object[]): Theme;
