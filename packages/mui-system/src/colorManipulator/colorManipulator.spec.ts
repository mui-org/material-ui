import { expectType } from '@mui/types';
import type { ColorFormat, ColorObject } from '@mui/system';

import {
  hexToRgb,
  rgbToHex,
  hslToRgb,
  decomposeColor,
  colorChannel,
  recomposeColor,
  getContrastRatio,
  getLuminance,
  emphasize,
  alpha,
  lighten,
  darken,
} from '@mui/system/colorManipulator';

expectType<(color: string) => string, typeof hexToRgb>(hexToRgb);

expectType<(color: string) => string, typeof rgbToHex>(rgbToHex);

expectType<(color: string) => string, typeof hslToRgb>(hslToRgb);

expectType<(color: string) => ColorObject, typeof decomposeColor>(decomposeColor);

expectType<(color: string) => string, typeof colorChannel>(colorChannel);

expectType<(color: ColorObject) => string, typeof recomposeColor>(recomposeColor);

expectType<(foreground: string, background: string) => number, typeof getContrastRatio>(
  getContrastRatio,
);

expectType<(color: string) => number, typeof getLuminance>(getLuminance);

expectType<(color: string, coefficient?: number) => string, typeof emphasize>(emphasize);

expectType<(color: string, value: number) => string, typeof alpha>(alpha);

expectType<(color: string, coefficient: number) => string, typeof darken>(darken);

expectType<(color: string, coefficient: number) => string, typeof lighten>(lighten);

recomposeColor({
  type: 'color',
  colorSpace: 'display-p3',
  values: [0.5, 0.3, 0.2],
});

const color = decomposeColor('color(display-p3 0 1 0)');

type Color = 'color' extends typeof color.type ? true : false;

expectType<Color, true>(true);
expectType<ColorFormat, typeof color.type>(color.type);
