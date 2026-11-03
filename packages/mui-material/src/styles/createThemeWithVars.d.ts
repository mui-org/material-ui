import { ThemeOptions, Theme } from './createThemeNoVars';
import { Components } from './components';
import {
  DefaultColorScheme,
  ColorSchemeOverrides,
  ExtendedColorScheme,
  SupportedColorScheme,
  Opacity,
  Overlays,
  PaletteBackgroundChannel,
  PaletteCommonChannel,
  PaletteColorChannel,
  PaletteActionChannel,
  PaletteTextChannel,
  PaletteAlert,
  PaletteAppBar,
  PaletteAvatar,
  PaletteButton,
  PaletteChip,
  PaletteFilledInput,
  PaletteInput,
  PaletteLinearProgress,
  PaletteSkeleton,
  PaletteSlider,
  PaletteSnackbarContent,
  PaletteSpeedDialAction,
  PaletteStepConnector,
  PaletteStepContent,
  PaletteSwitch,
  PaletteTableCell,
  PaletteTooltip,
  ColorSystemOptions,
  CssVarsPalette,
  ColorSystem,
  ThemeVars,
  ThemeCssVarOverrides,
  ThemeCssVar,
  CssVarsTheme,
  Shape,
  ShapeOptions,
} from './createThemeFoundation';

// Re-export all types from foundation to maintain backward compatibility
export type {
  DefaultColorScheme,
  ColorSchemeOverrides,
  ExtendedColorScheme,
  SupportedColorScheme,
  Opacity,
  Overlays,
  PaletteBackgroundChannel,
  PaletteCommonChannel,
  PaletteColorChannel,
  PaletteActionChannel,
  PaletteTextChannel,
  PaletteAlert,
  PaletteAppBar,
  PaletteAvatar,
  PaletteButton,
  PaletteChip,
  PaletteFilledInput,
  PaletteInput,
  PaletteLinearProgress,
  PaletteSkeleton,
  PaletteSlider,
  PaletteSnackbarContent,
  PaletteSpeedDialAction,
  PaletteStepConnector,
  PaletteStepContent,
  PaletteSwitch,
  PaletteTableCell,
  PaletteTooltip,
  ColorSystemOptions,
  CssVarsPalette,
  ColorSystem,
  ThemeVars,
  ThemeCssVarOverrides,
  ThemeCssVar,
  CssVarsTheme,
  Shape,
  ShapeOptions,
};

export interface CssVarsThemeOptions extends Omit<ThemeOptions, 'palette' | 'components'> {
  /**
   * The strategy to generate CSS variables
   *
   * @example 'media'
   * Generate CSS variables using [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-color-scheme)
   *
   * @example '.mode-%s'
   * Generate CSS variables within a class .mode-light, .mode-dark
   *
   * @example '[data-mode-%s]'
   * Generate CSS variables within a data attribute [data-mode-light], [data-mode-dark]
   */
  colorSchemeSelector?: 'media' | 'class' | 'data' | string | undefined;
  /**
   * Prefix of the generated CSS variables
   * @default 'mui'
   */
  cssVarPrefix?: string | undefined;
  /**
   * If `true`, the CSS color-scheme will not be set.
   * https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/color-scheme
   * @default false
   */
  disableCssColorScheme?: boolean | undefined;
  /**
   * If `true`, the CSS relative color will be used.
   */
  nativeColor?: boolean | undefined;
  /**
   * The selector to generate the global CSS variables (non-color-scheme related)
   * @default ':root'
   * @example ':host' // (for shadow DOM)
   * @see https://mui.com/material-ui/customization/shadow-dom/#3-css-theme-variables-optional
   */
  rootSelector?: string | undefined;
  /**
   * A function to determine if the key, value should be attached as CSS Variable
   * `keys` is an array that represents the object path keys.
   *  Ex, if the theme is { foo: { bar: 'var(--test)' } }
   *  then, keys = ['foo', 'bar']
   *        value = 'var(--test)'
   */
  shouldSkipGeneratingVar?: ((keys: string[], value: string | number) => boolean) | undefined;
  /**
   * @default 'light'
   */
  defaultColorScheme?: SupportedColorScheme | undefined;
  /**
   * Theme components
   */
  components?: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme> | undefined;
  /**
   * Color schemes configuration
   */
  colorSchemes?:
    | (Partial<Record<DefaultColorScheme, boolean | ColorSystemOptions>> &
        (ExtendedColorScheme extends string ? Record<ExtendedColorScheme, ColorSystemOptions> : {}))
    | undefined;
}

/**
 * Generate a theme base on the options received.
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @param args Deep merge the arguments with the about to be returned theme.
 * @returns A complete, ready-to-use theme object.
 */
export default function createThemeWithVars(
  options?: CssVarsThemeOptions,
  ...args: object[]
): Omit<Theme, 'applyStyles'> & CssVarsTheme;
