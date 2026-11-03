import { BreakpointsOptions, ShapeOptions, SpacingOptions } from '@mui/system';
import { MixinsOptions } from './createMixins';
import { Palette, PaletteOptions } from './createPalette';
import { TypographyVariantsOptions } from './createTypography';
import { Shadows } from './shadows';
import { TransitionsOptions } from './createTransitions';
import { ZIndexOptions } from './zIndex';
import { ComponentsOverrides } from './overrides';
import { ComponentsVariants } from './variants';
import { ComponentsProps } from './props';
import { Theme } from './createTheme';

export type Direction = 'ltr' | 'rtl';

export interface DeprecatedThemeOptions {
  shape?: ShapeOptions | undefined;
  breakpoints?: BreakpointsOptions | undefined;
  direction?: Direction | undefined;
  mixins?: MixinsOptions | undefined;
  overrides?: ComponentsOverrides | undefined;
  palette?: PaletteOptions | undefined;
  props?: ComponentsProps | undefined;
  shadows?: Shadows | undefined;
  spacing?: SpacingOptions | undefined;
  transitions?: TransitionsOptions | undefined;
  typography?:
    TypographyVariantsOptions | ((palette: Palette) => TypographyVariantsOptions) | undefined;
  variants?: ComponentsVariants | undefined;
  zIndex?: ZIndexOptions | undefined;
  unstable_strictMode?: boolean | undefined;
}

/**
 * Generate a theme base on the V4 theme options received.
 * @deprecated Follow the upgrade guide on https://mui.com/r/migration-v4#theme
 * @param options Takes an incomplete theme object and adds the missing parts.
 * @returns A complete, ready-to-use theme object.
 */
export default function adaptV4Theme(options?: DeprecatedThemeOptions): Theme;
