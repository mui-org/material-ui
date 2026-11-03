/**
 * Exact WCAG 2.x contrast math for the accessibility conformance guards.
 *
 * The conformance reports (`src/<Component>/accessibility.md`) document which
 * theme color pairs fail 1.4.3 Contrast (Minimum). These helpers let tests
 * recompute those facts from `createTheme()` so a palette change cannot leave
 * a report stale.
 *
 * Deliberately not `getContrastRatio` from `@mui/system`: `getLuminance`
 * truncates luminance at three digits, which can flip a classification right
 * at the 4.5:1 boundary (`success` on the filled surface sits at 4.4992:1).
 */
import { decomposeColor, hslToRgb } from '@mui/system/colorManipulator';

interface Rgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

function parseColor(color: string): Rgba {
  let parsed = decomposeColor(color);
  if (parsed.type === 'hsl' || parsed.type === 'hsla') {
    parsed = decomposeColor(hslToRgb(color));
  }
  if (parsed.type !== 'rgb' && parsed.type !== 'rgba') {
    throw new Error(
      `Unsupported color format: "${color}". The exact WCAG math covers sRGB colors only.`,
    );
  }
  const [r, g, b, a = 1] = parsed.values;
  return { r, g, b, a };
}

function toHex({ r, g, b }: Rgba): string {
  return `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, '0')).join('')}`;
}

/** Parses a color that must be opaque, quoting the input when it is not. */
function parseOpaqueColor(color: string, requirement: string): Rgba {
  const parsed = parseColor(color);
  if (parsed.a !== 1) {
    throw new Error(`${requirement}, got "${color}". Resolve it against a surface first.`);
  }
  return parsed;
}

/**
 * Composites `foreground` at `alpha` (multiplied with the color's own alpha)
 * over an opaque `background`. Channels stay fractional: nothing is quantized
 * until a value leaves this module as hex.
 */
function compose(foreground: Rgba, alpha: number, background: Rgba): Rgba {
  const effectiveAlpha = alpha * foreground.a;
  return {
    r: foreground.r * effectiveAlpha + background.r * (1 - effectiveAlpha),
    g: foreground.g * effectiveAlpha + background.g * (1 - effectiveAlpha),
    b: foreground.b * effectiveAlpha + background.b * (1 - effectiveAlpha),
    a: 1,
  };
}

/** WCAG 2.x relative luminance of an opaque color. */
function luminance({ r, g, b }: Rgba): number {
  const [lr, lg, lb] = [r, g, b]
    .map((channel) => channel / 255)
    .map((channel) => (channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/**
 * Composites `foreground` at `alpha` over an opaque `background`, as hex. Use
 * it for surfaces the browser composes at paint time: a placeholder rendered
 * at `opacity`, a selected-state tint of `alpha(main, selectedOpacity)`, the
 * filled input surface. The hex is 8-bit, the precision a stylesheet holds.
 * Rating that surface stays exact anyway: `contrastRatio` composites its own
 * foreground internally rather than round-tripping through this.
 */
export function blend(foreground: string, alpha: number, background: string): string {
  const resolvedBackground = parseOpaqueColor(background, 'blend() needs an opaque background');
  return toHex(compose(parseColor(foreground), alpha, resolvedBackground));
}

/** WCAG 2.x relative luminance of an opaque color. */
export function wcagLuminance(color: string): number {
  return luminance(parseOpaqueColor(color, 'wcagLuminance() needs an opaque color'));
}

/**
 * WCAG 2.x contrast ratio. A translucent foreground (an rgba text color, for
 * example `text.secondary`) is composited onto the background first, matching
 * what the browser paints. The composite keeps fractional channels, so the
 * ratio stays exact for threshold classification.
 */
export function contrastRatio(foreground: string, background: string): number {
  const resolvedBackground = parseOpaqueColor(
    background,
    'contrastRatio() needs an opaque background',
  );
  const [hi, lo] = [
    luminance(compose(parseColor(foreground), 1, resolvedBackground)),
    luminance(resolvedBackground),
  ].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Rounds a ratio to two decimals — the precision the reports and public
 * checkers display. Display only: WCAG classification must compare the exact
 * ratio, because rounding can flip a value at a threshold (a true 4.4992:1
 * fails 1.4.3 but rounds to 4.5).
 */
export function roundRatio(ratio: number): number {
  return Math.round(ratio * 100) / 100;
}

/** `contrastRatio` rounded to two decimals, the precision the reports use. */
export function roundedContrastRatio(foreground: string, background: string): number {
  return roundRatio(contrastRatio(foreground, background));
}

export interface TypographyStyleLike {
  fontSize?: string | number;
  fontWeight?: string | number;
}

/**
 * The two 1.4.3 thresholds. Named so a test states which one it means instead
 * of repeating a bare number that reads as a magic constant.
 */
export const WCAG_MINIMUM_RATIO = {
  /** Text below the WCAG "large text" cutoff. */
  normalText: 4.5,
  /** At least 24px, or at least 18.66px at weight 700+. */
  largeText: 3,
} as const;

/** CSS keywords `fontWeight` accepts that map to a fixed numeric weight. */
const ABSOLUTE_FONT_WEIGHTS: Record<string, number> = { normal: 400, bold: 700 };

function toPx(fontSize: string | number, htmlFontSize: number): number {
  if (typeof fontSize === 'number') {
    return fontSize;
  }
  const match = /^(\d*\.?\d+)(px|rem)$/.exec(fontSize.trim());
  if (!match) {
    throw new Error(
      `requiredRatio() cannot size "${fontSize}". Pass px, rem, or a number: any other ` +
        'unit depends on the render tree, which a theme value cannot tell us.',
    );
  }
  const value = parseFloat(match[1]);
  return match[2] === 'rem' ? value * htmlFontSize : value;
}

function toWeight(fontWeight: string | number | undefined): number {
  if (fontWeight == null) {
    return 400;
  }
  if (typeof fontWeight === 'number') {
    return fontWeight;
  }
  const keyword = ABSOLUTE_FONT_WEIGHTS[fontWeight.trim()];
  if (keyword !== undefined) {
    return keyword;
  }
  const numeric = Number(fontWeight);
  if (Number.isNaN(numeric)) {
    throw new Error(
      `requiredRatio() cannot weigh "${fontWeight}". Pass a number, "normal", or "bold": ` +
        '"bolder" and "lighter" are relative to the parent, which a theme value cannot tell us.',
    );
  }
  return numeric;
}

/**
 * The 1.4.3 threshold a text style must meet: 3:1 for WCAG "large text"
 * (at least 24px, or at least 18.66px at weight 700+), 4.5:1 otherwise.
 * Pass a theme typography variant (`theme.typography.button`) so the
 * threshold derives from the same tokens the component renders with.
 *
 * Throws on a size or weight it cannot resolve rather than guessing. A silent
 * fallback here misclassifies the threshold, which is the one number the whole
 * conformance guard rests on.
 */
export function requiredRatio(style: TypographyStyleLike, htmlFontSize = 16): 4.5 | 3 {
  if (style.fontSize == null) {
    throw new Error('requiredRatio() needs a style with a fontSize to derive the threshold.');
  }
  const px = toPx(style.fontSize, htmlFontSize);
  const weight = toWeight(style.fontWeight);
  const isLargeText = px >= 24 || (px >= 18.66 && weight >= 700);
  return isLargeText ? WCAG_MINIMUM_RATIO.largeText : WCAG_MINIMUM_RATIO.normalText;
}
