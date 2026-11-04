import type * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';
import type { FocusVisibleOptions } from './createThemeNoVars';

const focusVisibleShadowVar = '--_focusVisible-shadow';
const outlineOffsetVar = '--_focusVisible-outlineOffset';
const boxShadowVar = '--_focusVisible-boxShadow';
const insideOutlineOffsetVar = '--_focusVisible-inside-outlineOffset';
const insideBoxShadowVar = '--_focusVisible-inside-boxShadow';

const defaultOutlineOffset = 2;
const defaultBoxShadow = `var(${focusVisibleShadowVar}, 0 0)`;

export function applyFocusVisibleOffset(offset: 'inside' | 'outside') {
  if (offset === 'inside') {
    return {
      [outlineOffsetVar]: `var(${insideOutlineOffsetVar})`,
      [boxShadowVar]: `var(${insideBoxShadowVar})`,
    };
  }
  return {
    [outlineOffsetVar]: 'initial',
    [boxShadowVar]: 'initial',
  };
}

export const outsetFocusRing = applyFocusVisibleOffset('outside');

export function applyInsetFocusVisible(scale: number) {
  const inside = applyFocusVisibleOffset('inside');
  return scale === 1
    ? inside
    : { ...inside, [outlineOffsetVar]: `calc(var(${insideOutlineOffsetVar}) * ${scale})` };
}

export function applyInsetFocusVisibleAtLeast(depth: number) {
  return {
    ...applyFocusVisibleOffset('inside'),
    [outlineOffsetVar]: `min(var(${insideOutlineOffsetVar}), ${-depth}px)`,
  };
}

// Used by the colored-background surfaces (AppBar, Alert, SnackbarContent) to make the focus visible appear through box-shadow
export function applyChildrenFocusVisible(color: string) {
  return {
    [focusVisibleShadowVar]: color,
  };
}

export type FocusVisibleInput = boolean | FocusVisibleOptions | null | undefined;

// Merge the raw `focusVisible` input across `createTheme(options, ...args)` with the theme's own
// deep-merge semantics. The single-key wrapper is load-bearing — a raw value hits deepmerge's
// top-level plain-object guard (`deepmerge(true, obj)` drops the object).
export function mergeFocusVisibleInput(
  optionsFocusVisible: FocusVisibleInput,
  args: readonly any[],
): FocusVisibleInput {
  return args.reduce(
    (acc, arg) =>
      arg && 'focusVisible' in arg ? deepmerge(acc, { focusVisible: arg.focusVisible }) : acc,
    { focusVisible: optionsFocusVisible },
  ).focusVisible;
}

/**
 * Whether an input is this module's own output. Only `wireFocusVisibleVars` emits the offset switch var,
 * so it identifies a ring fed back in by `createTheme(existingTheme, …)`.
 */
export function isResolvedFocusVisible(input: FocusVisibleInput): boolean {
  return (
    input != null &&
    typeof input === 'object' &&
    typeof input.outlineOffset === 'string' &&
    input.outlineOffset.includes(outlineOffsetVar)
  );
}

/**
 * Resolve the opt-in ring, wiring in the private inset vars. `outlineColor` is the caller's default
 * — a hex, the palette var, or a scheme's primary — overridden by a user-provided `outlineColor`.
 */
export function resolveFocusVisible(
  input: true | FocusVisibleOptions,
  outlineColor: string,
): React.CSSProperties {
  return wireFocusVisibleVars({
    outlineStyle: 'solid',
    outlineColor,
    outlineWidth: 2,
    outlineOffset: defaultOutlineOffset,
    // invisible shadow for parent component with solid background (AppBar, Snackbar, Alert) can control the ring color.
    boxShadow: defaultBoxShadow,
    ...(input === true ? null : input),
  });
}

const toPx = (value: string | number) => (typeof value === 'number' ? `${value}px` : value);

const outlineWidthKeywords = new Set([
  'thin',
  'medium',
  'thick',
  'inherit',
  'initial',
  'unset',
  'revert',
  'revert-layer',
]);

const standaloneBoxShadows = new Set([
  'none',
  'initial',
  'inherit',
  'unset',
  'revert',
  'revert-layer',
]);

function toInsetBoxShadow(boxShadow: string) {
  return standaloneBoxShadows.has(boxShadow.trim().toLowerCase()) || /\binset\b/.test(boxShadow)
    ? boxShadow
    : `inset ${boxShadow}`;
}

function splitBoxShadow(boxShadow: FocusVisibleOptions['boxShadow']) {
  if (boxShadow != null && typeof boxShadow === 'object') {
    const { outside = defaultBoxShadow, inside = outside } = boxShadow;
    return { outside, inside };
  }
  return { outside: boxShadow, inside: boxShadow };
}

function deriveInsideOutlineOffset(
  outside: string | number,
  width: React.CSSProperties['outlineWidth'],
): string | number {
  if (typeof outside === 'number' && typeof width === 'number') {
    return -Math.max(outside, width);
  }
  if (width == null || (typeof width === 'string' && outlineWidthKeywords.has(width.trim()))) {
    return typeof outside === 'number' ? -outside : `calc(-1 * ${outside})`;
  }
  return `calc(-1 * max(${toPx(outside)}, ${toPx(width)}))`;
}

/**
 * Wire the private offset vars into a resolved `theme.focusVisible`: the outside values stay the
 * declared defaults, and the inside values ride along as private custom properties that
 * `applyFocusVisibleOffset('inside')` switches to.
 */
export function wireFocusVisibleVars({
  outlineOffset = defaultOutlineOffset,
  ...ring
}: FocusVisibleOptions): React.CSSProperties {
  const wired: Record<string, unknown> = { ...ring };
  if (typeof outlineOffset === 'string' && outlineOffset.includes(outlineOffsetVar)) {
    wired.outlineOffset = outlineOffset;
  } else {
    const {
      outside = defaultOutlineOffset,
      inside = deriveInsideOutlineOffset(outside, ring.outlineWidth),
    } = typeof outlineOffset === 'object' ? outlineOffset : { outside: outlineOffset };
    wired[insideOutlineOffsetVar] = toPx(inside);
    wired.outlineOffset = `var(${outlineOffsetVar}, ${toPx(outside)})`;
  }
  const { outside: outsideShadow, inside: insideShadow } = splitBoxShadow(ring.boxShadow);
  wired.boxShadow = outsideShadow;
  if (
    typeof outsideShadow === 'string' &&
    typeof insideShadow === 'string' &&
    !outsideShadow.includes(boxShadowVar)
  ) {
    const insetShadow = toInsetBoxShadow(insideShadow);
    if (insetShadow !== outsideShadow) {
      wired[insideBoxShadowVar] = insetShadow;
      wired.boxShadow = `var(${boxShadowVar}, ${outsideShadow})`;
    }
  }
  return wired as React.CSSProperties;
}
