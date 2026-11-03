export type PaletteMode = 'light' | 'dark';
export interface Color {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
}

export {};
// use standalone interface over typeof colors/commons
// to enable module augmentation
export interface CommonColors {
  black: string;
  white: string;
}

export type ColorPartial = Partial<Color>;

export interface TypeText {
  primary: string;
  secondary: string;
  disabled: string;
}

export interface TypeAction {
  active: string;
  hover: string;
  hoverOpacity: number;
  selected: string;
  selectedOpacity: number;
  disabled: string;
  disabledOpacity: number;
  disabledBackground: string;
  focus: string;
  focusOpacity: number;
  activatedOpacity: number;
}

export interface TypeBackground {
  default: string;
  paper: string;
}

export type TypeDivider = string;

export type PaletteColorOptions = SimplePaletteColorOptions | ColorPartial;

export interface SimplePaletteColorOptions {
  light?: string | undefined;
  main: string;
  dark?: string | undefined;
  contrastText?: string | undefined;
}

export interface PaletteColor {
  light: string;
  main: string;
  dark: string;
  contrastText: string;
}

export interface TypeObject {
  text: TypeText;
  action: TypeAction;
  divider: TypeDivider;
  background: TypeBackground;
}

export type PaletteTonalOffset =
  | number
  | {
      light: number;
      dark: number;
    };

export const light: TypeObject;
export const dark: TypeObject;

export interface PaletteAugmentColorOptions {
  color: PaletteColorOptions;
  mainShade?: number | string | undefined;
  lightShade?: number | string | undefined;
  darkShade?: number | string | undefined;
  name?: number | string | undefined;
}

export interface Palette {
  common: CommonColors;
  mode: PaletteMode;
  contrastThreshold: number;
  tonalOffset: PaletteTonalOffset;
  primary: PaletteColor;
  secondary: PaletteColor;
  error: PaletteColor;
  warning: PaletteColor;
  info: PaletteColor;
  success: PaletteColor;
  grey: Color;
  text: TypeText;
  divider: TypeDivider;
  action: TypeAction;
  background: TypeBackground;
  getContrastText: (background: string) => string;
  augmentColor: (options: PaletteAugmentColorOptions) => PaletteColor;
}

export interface Channels {
  mainChannel: string;
  lightChannel: string;
  darkChannel: string;
  contrastTextChannel: string;
}

export type PartialTypeObject = { [P in keyof TypeObject]?: Partial<TypeObject[P]> };

export interface PaletteOptions {
  primary?: PaletteColorOptions | undefined;
  secondary?: PaletteColorOptions | undefined;
  error?: PaletteColorOptions | undefined;
  warning?: PaletteColorOptions | undefined;
  info?: PaletteColorOptions | undefined;
  success?: PaletteColorOptions | undefined;
  mode?: PaletteMode | undefined;
  tonalOffset?: PaletteTonalOffset | undefined;
  contrastThreshold?: number | undefined;
  common?: Partial<CommonColors> | undefined;
  grey?: ColorPartial | undefined;
  text?: Partial<TypeText> | undefined;
  divider?: string | undefined;
  action?: Partial<TypeAction> | undefined;
  background?: Partial<TypeBackground> | undefined;
  getContrastText?: ((background: string) => string) | undefined;
}

export default function createPalette(palette: PaletteOptions): Palette;
