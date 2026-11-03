import { CSSProperties } from './createMixins';

export function isUnitless(value: string): boolean;

export function getUnit(input: string): string;

export function toUnitless(value: string): number;

export function convertLength(baseFontSize: string): (length: string, toUnit: string) => string;

export interface AlignPropertyParams {
  size: number;
  grid: number;
}
export function alignProperty(params: AlignPropertyParams): number;

export interface FontGridParams {
  lineHeight: number;
  pixels: number;
  htmlFontSize: number;
}
export function fontGrid(params: FontGridParams): number;

export interface ResponsivePropertyParams {
  cssProperty: string;
  min: number;
  max: number;
  unit?: string | undefined;
  breakpoints?: number[] | undefined;
  transform?: ((value: number) => number) | undefined;
}
export function responsiveProperty(params: ResponsivePropertyParams): CSSProperties;
