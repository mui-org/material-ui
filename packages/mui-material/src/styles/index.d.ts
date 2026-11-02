import { DistributiveOmit } from '@mui/types';

export { default as THEME_ID } from './identifier';
export {
  default as createTheme,
  default as unstable_createMuiStrictModeTheme,
  ThemeOptions,
  Theme,
  CssThemeVariables,
  FocusVisible,
} from './createTheme';
export { default as enhanceHighContrast, HighContrastTokens } from './enhanceHighContrast';
export { default as adaptV4Theme, DeprecatedThemeOptions } from './adaptV4Theme';
export { Shadows } from './shadows';
export { ZIndex } from './zIndex';
export {
  CommonColors,
  Palette,
  PaletteColor,
  PaletteColorOptions,
  PaletteOptions,
  SimplePaletteColorOptions,
  TypeText,
  TypeAction,
  TypeBackground,
  PaletteMode,
  Color,
} from './createPalette';
export { default as createColorScheme } from './createColorScheme';
export { default as createStyles } from './createStyles';
export {
  TypographyVariants,
  TypographyVariantsOptions,
  TypographyStyle,
  TypographyVariant,
} from './createTypography';
export { default as responsiveFontSizes } from './responsiveFontSizes';
export { ReducedMotionMode, Motion, MotionOptions } from './createMotion';
export {
  Duration,
  Easing,
  Transitions,
  TransitionsOptions,
  duration,
  easing,
} from './createTransitions';
export { Mixins, CSSProperties, MixinsOptions } from './createMixins';
export {
  Direction,
  Breakpoint,
  BreakpointOverrides,
  Breakpoints,
  BreakpointsOptions,
  CreateMUIStyled,
  Interpolation,
  CSSInterpolation,
  CSSObject,
  css,
  keyframes,
  // color manipulators
  hexToRgb,
  rgbToHex,
  hslToRgb,
  decomposeColor,
  recomposeColor,
  getContrastRatio,
  getLuminance,
  emphasize,
  alpha,
  darken,
  lighten,
  ColorFormat,
  ColorObject,
  StyledEngineProvider,
  SxProps,
} from '@mui/system';
export { unstable_createBreakpoints } from '@mui/system/createBreakpoints';
// TODO: Remove this function in v6.
// eslint-disable-next-line @typescript-eslint/naming-convention
export function experimental_sx(): any;
export { default as useTheme } from './useTheme';
export { default as useThemeProps } from './useThemeProps';
export * from './useThemeProps';
export { default as styled } from './styled';
export { default as ThemeProvider, ThemeProviderProps } from './ThemeProvider';
export { ComponentsProps, ComponentsPropsList } from './props';
export { ComponentsVariants } from './variants';
export { ComponentsOverrides, ComponentNameToClassKey } from './overrides';
export { Components } from './components';
export { getUnit as unstable_getUnit, toUnitless as unstable_toUnitless } from './cssUtils';

export type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;

export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>> | undefined;
}

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 * @deprecated will be removed in v5 for internal usage only
 */
export type StandardProps<
  ComponentProps,
  ClassKey extends string,
  Removals extends keyof ComponentProps = never,
> = DistributiveOmit<ComponentProps, 'classes' | Removals> &
  StyledComponentProps<ClassKey> & {
    className?: string | undefined;
    ref?:
      | (ComponentProps extends { ref?: infer RefType | undefined } ? RefType : React.Ref<unknown>)
      | undefined;
    style?: React.CSSProperties | undefined;
  };

export namespace PropTypes {
  // keeping the type structure for backwards compat
  type Color = 'inherit' | 'primary' | 'secondary' | 'default';
}

export { default as makeStyles } from './makeStyles';
export { default as withStyles } from './withStyles';
export { default as withTheme } from './withTheme';

export * from './ThemeProviderWithVars';
export type { StorageManager } from '@mui/system/cssVars';

export { default as extendTheme } from './createThemeWithVars';

export type {
  ColorSchemeOverrides,
  SupportedColorScheme,
  ColorSystem,
  CssVarsPalette,
  Opacity,
  Overlays,
  PaletteAlert,
  PaletteActionChannel,
  PaletteAppBar,
  PaletteAvatar,
  PaletteChip,
  PaletteColorChannel,
  PaletteCommonChannel,
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
  PaletteTextChannel,
  PaletteTooltip,
  CssVarsThemeOptions,
  CssVarsTheme,
  ThemeVars,
  ThemeCssVar,
  ThemeCssVarOverrides,
  ColorSystemOptions,
  Shape,
  ShapeOptions,
} from './createThemeWithVars';
export { default as getOverlayAlpha } from './getOverlayAlpha';
export { default as shouldSkipGeneratingVar } from './shouldSkipGeneratingVar';

// Private methods for creating parts of the theme
export { default as private_createTypography } from './createTypography';
export { default as private_excludeVariablesFromRoot } from './excludeVariablesFromRoot';
export {
  applyInsetFocusVisible as private_applyInsetFocusVisible,
  applyChildrenFocusVisible as private_applyChildrenFocusVisible,
  outsetFocusRing as private_outsetFocusRing,
} from './focusVisible';
