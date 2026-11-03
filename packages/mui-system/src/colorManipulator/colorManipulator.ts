/* eslint-disable @typescript-eslint/naming-convention */
import clamp from '@mui/utils/clamp';

export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'color';
export interface ColorObject {
  type: ColorFormat;
  values: [number, number, number] | [number, number, number, number];
  colorSpace?: 'srgb' | 'display-p3' | 'a98-rgb' | 'prophoto-rgb' | 'rec-2020' | undefined;
}

/**
 * Returns a number whose value is limited to the given range.
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clampWrapper(value: number, min = 0, max = 1) {
  if (process.env.NODE_ENV !== 'production') {
    if (value < min || value > max) {
      console.error(`MUI: The value provided ${value} is out of range [${min}, ${max}].`);
    }
  }

  return clamp(value, min, max);
}

/**
 * Converts a color from CSS hex format to CSS rgb format.
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */
export function hexToRgb(color: string): string {
  color = color.slice(1);

  const re = new RegExp(`.{1,${color.length >= 6 ? 2 : 1}}`, 'g');
  let colors: string[] | null = color.match(re);

  if (colors && colors[0].length === 1) {
    colors = colors.map((n) => n + n);
  }

  if (process.env.NODE_ENV !== 'production') {
    if (color.length !== color.trim().length) {
      console.error(
        `MUI: The color: "${color}" is invalid. Make sure the color input doesn't contain leading/trailing space.`,
      );
    }
  }

  return colors
    ? `rgb${colors.length === 4 ? 'a' : ''}(${colors
        .map((n, index) => {
          return index < 3 ? parseInt(n, 16) : Math.round((parseInt(n, 16) / 255) * 1000) / 1000;
        })
        .join(', ')})`
    : '';
}

function intToHex(int: number) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */
export function decomposeColor(color: string): ColorObject {
  // Idempotent
  if ((color as any).type) {
    return color as unknown as ColorObject;
  }

  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }

  const marker = color.indexOf('(');
  const type = color.substring(0, marker);

  if (!['rgb', 'rgba', 'hsl', 'hsla', 'color'].includes(type)) {
    throw /* minify-error */ new Error(
      `MUI: Unsupported \`${color}\` color.\n` +
        'The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().',
    );
  }

  let values: any = color.substring(marker + 1, color.length - 1);
  let colorSpace: string | undefined;

  if (type === 'color') {
    values = values.split(' ');
    colorSpace = values.shift();
    if (values.length === 4 && values[3].charAt(0) === '/') {
      values[3] = values[3].slice(1);
    }
    if (!['srgb', 'display-p3', 'a98-rgb', 'prophoto-rgb', 'rec-2020'].includes(colorSpace!)) {
      throw /* minify-error */ new Error(
        `MUI: unsupported \`${colorSpace}\` color space.\n` +
          'The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.',
      );
    }
  } else {
    values = values.split(',');
  }
  values = values.map((value: string) => parseFloat(value));

  return { type, values, colorSpace } as unknown as ColorObject;
}

/**
 * Returns a channel created from the input color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {string} - The channel for the color, that can be used in rgba or hsla colors
 */
export const colorChannel = (color: string): string => {
  const decomposedColor = decomposeColor(color);
  return decomposedColor.values
    .slice(0, 3)
    .map((val, idx) => (decomposedColor.type.includes('hsl') && idx !== 0 ? `${val}%` : val))
    .join(' ');
};
export const private_safeColorChannel = (color: string, warning?: string): string => {
  try {
    return colorChannel(color);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
};

/**
 * Converts a color object with type and values to a string.
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla', 'color'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */
export function recomposeColor(color: ColorObject): string {
  const { type, colorSpace } = color;
  let { values } = color as any;

  if (type.includes('rgb')) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map((n: any, i: number) => (i < 3 ? parseInt(n, 10) : n));
  } else if (type.includes('hsl')) {
    values[1] = `${values[1]}%`;
    values[2] = `${values[2]}%`;
  }
  if (type.includes('color')) {
    values = `${colorSpace} ${values.join(' ')}`;
  } else {
    values = `${values.join(', ')}`;
  }

  return `${type}(${values})`;
}

/**
 * Converts a color from CSS rgb format to CSS hex format.
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */
export function rgbToHex(color: string): string {
  // Idempotent
  if (color.startsWith('#')) {
    return color;
  }

  const { values } = decomposeColor(color);
  return `#${values.map((n, i) => intToHex(i === 3 ? Math.round(255 * n) : n)).join('')}`;
}

/**
 * Converts a color from hsl format to rgb format.
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */
export function hslToRgb(color: string): string {
  color = decomposeColor(color) as any;
  const { values } = color as any;
  const h = values[0];
  const s = values[1] / 100;
  const l = values[2] / 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);

  let type = 'rgb';
  const rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];

  if ((color as any).type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }

  return recomposeColor({ type, values: rgb } as any);
}
/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */
export function getLuminance(color: string): number {
  color = decomposeColor(color) as any;

  let rgb =
    (color as any).type === 'hsl' || (color as any).type === 'hsla'
      ? decomposeColor(hslToRgb(color)).values
      : (color as any).values;
  rgb = rgb.map((val: any) => {
    if ((color as any).type !== 'color') {
      val /= 255; // normalized
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });

  // Truncate at 3 digits
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}

/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */
export function getContrastRatio(foreground: string, background: string): number {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}

/**
 * Sets the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} value - value to set the alpha channel to in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function alpha(color: string, value: number): string {
  color = decomposeColor(color) as any;
  value = clampWrapper(value);

  if ((color as any).type === 'rgb' || (color as any).type === 'hsl') {
    (color as any).type += 'a';
  }
  if ((color as any).type === 'color') {
    (color as any).values[3] = `/${value}`;
  } else {
    (color as any).values[3] = value;
  }

  return recomposeColor(color as any);
}
export function private_safeAlpha(color: string, value: number, warning?: string): string {
  try {
    return alpha(color, value);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Darkens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function darken(color: string, coefficient: number): string {
  color = decomposeColor(color) as any;
  coefficient = clampWrapper(coefficient);

  if ((color as any).type.includes('hsl')) {
    (color as any).values[2] *= 1 - coefficient;
  } else if ((color as any).type.includes('rgb') || (color as any).type.includes('color')) {
    for (let i = 0; i < 3; i += 1) {
      (color as any).values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color as any);
}
export function private_safeDarken(color: string, coefficient: number, warning?: string): string {
  try {
    return darken(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Lightens a color.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function lighten(color: string, coefficient: number): string {
  color = decomposeColor(color) as any;
  coefficient = clampWrapper(coefficient);

  if ((color as any).type.includes('hsl')) {
    (color as any).values[2] += (100 - (color as any).values[2]) * coefficient;
  } else if ((color as any).type.includes('rgb')) {
    for (let i = 0; i < 3; i += 1) {
      (color as any).values[i] += (255 - (color as any).values[i]) * coefficient;
    }
  } else if ((color as any).type.includes('color')) {
    for (let i = 0; i < 3; i += 1) {
      (color as any).values[i] += (1 - (color as any).values[i]) * coefficient;
    }
  }

  return recomposeColor(color as any);
}
export function private_safeLighten(color: string, coefficient: number, warning?: string): string {
  try {
    return lighten(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */
export function emphasize(color: string, coefficient = 0.15): string {
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
export function private_safeEmphasize(
  color: string,
  coefficient?: number,
  warning?: string,
): string {
  try {
    return emphasize(color, coefficient);
  } catch (error) {
    if (warning && process.env.NODE_ENV !== 'production') {
      console.warn(warning);
    }
    return color;
  }
}

/**
 * Blend a transparent overlay color with a background color, resulting in a single
 * RGB color.
 * @param {string} background - CSS color
 * @param {string} overlay - CSS color
 * @param {number} opacity - Opacity multiplier in the range 0 - 1
 * @param {number} [gamma=1.0] - Gamma correction factor. For gamma-correct blending, 2.2 is usual.
 */
export function blend(background: string, overlay: string, opacity: number, gamma = 1.0): string {
  const blendChannel = (b: number, o: number) =>
    Math.round((b ** (1 / gamma) * (1 - opacity) + o ** (1 / gamma) * opacity) ** gamma);

  const backgroundColor = decomposeColor(background);
  const overlayColor = decomposeColor(overlay);

  const rgb: [number, number, number] = [
    blendChannel(backgroundColor.values[0], overlayColor.values[0]),
    blendChannel(backgroundColor.values[1], overlayColor.values[1]),
    blendChannel(backgroundColor.values[2], overlayColor.values[2]),
  ];

  return recomposeColor({
    type: 'rgb',
    values: rgb,
  });
}
