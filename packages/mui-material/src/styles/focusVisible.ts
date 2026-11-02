import type * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';

const focusVisibleOffsetVar = '--_focusVisible-offset';
const focusVisibleBehaviorVar = '--_focusVisible-behavior';
const focusVisibleShadowVar = '--_focusVisible-shadow';
const focusVisibleInsetVar = '--_focusVisible-inset';

const offsetValue = `var(${focusVisibleOffsetVar}, 1)`;
const behaviorValue = `var(${focusVisibleBehaviorVar}, )`;
const insetValue = `var(${focusVisibleInsetVar}, 0)`;

export function scaleFocusVisibleOffset(scale: number) {
  return {
    [focusVisibleOffsetVar]: scale,
    // `initial` reverts the var to guaranteed-invalid so `var(--_focusVisible-behavior, )` falls back to empty — there is no explicit `outset` keyword.
    [focusVisibleBehaviorVar]: scale < 0 ? 'inset' : 'initial',
    [focusVisibleInsetVar]: scale < 0 ? 1 : 0,
  };
}

export const outsetFocusRing = scaleFocusVisibleOffset(1);

export function applyInsetFocusVisible(offset: number) {
  return scaleFocusVisibleOffset(-offset);
}

// Used by the colored-background surfaces (AppBar, Alert, SnackbarContent) to make the focus visible appear through box-shadow
export function applyChildrenFocusVisible(color: string) {
  return {
    [focusVisibleShadowVar]: color,
  };
}

export type FocusVisibleInput = boolean | React.CSSProperties | null | undefined;

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
 * Whether an input is this module's own output. Only `wireFocusVisibleVars` emits the offset calc,
 * so it identifies a ring fed back in by `createTheme(existingTheme, …)`.
 */
export function isResolvedFocusVisible(input: FocusVisibleInput): boolean {
  return (
    input != null &&
    typeof input === 'object' &&
    typeof input.outlineOffset === 'string' &&
    input.outlineOffset.includes(focusVisibleOffsetVar)
  );
}

/**
 * Resolve the opt-in ring, wiring in the private inset vars. `outlineColor` is the caller's default
 * — a hex, the palette var, or a scheme's primary — overridden by a user-provided `outlineColor`.
 */
export function resolveFocusVisible(
  input: true | React.CSSProperties,
  outlineColor: string,
): React.CSSProperties {
  return wireFocusVisibleVars({
    outlineStyle: 'solid',
    outlineColor,
    outlineWidth: 2,
    outlineOffset: 2,
    // invisible shadow for parent component with solid background (AppBar, Snackbar, Alert) can control the ring color.
    boxShadow: `var(${focusVisibleShadowVar}, 0 0)`,
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

function getInsetWidthGap(
  offset: string | number,
  width: React.CSSProperties['outlineWidth'],
): string | null {
  if (width == null || (typeof width === 'string' && outlineWidthKeywords.has(width.trim()))) {
    return null;
  }
  if (typeof width === 'number' && typeof offset === 'number') {
    return width > offset ? `${width - offset}px` : null;
  }
  return `max(0px, ${toPx(width)} - (${toPx(offset)}))`;
}

/**
 * Wire the private inset vars into a resolved `theme.focusVisible` so a custom `outlineOffset` or
 * `boxShadow` insets automatically on clip-prone components. Mutates and returns the object.
 */
export function wireFocusVisibleVars(resolved: React.CSSProperties): React.CSSProperties {
  // Multiply the offset by the sign var so it flips to inset on clip-prone components. Skip if
  // already wired: re-composing a resolved theme must not wrap the calc twice and invert the sign.
  const offset = resolved.outlineOffset ?? 0;
  if (typeof offset !== 'string' || !offset.includes(focusVisibleOffsetVar)) {
    const offsetPx = toPx(offset);
    const widthGap = getInsetWidthGap(offset, resolved.outlineWidth);
    resolved.outlineOffset = widthGap
      ? `calc(${offsetValue} * (${offsetPx} + ${insetValue} * ${widthGap}))`
      : `calc(${offsetValue} * ${offsetPx})`;
  }
  // Prefix a box-shadow with the behavior var so it insets there too, unless it already opts in.
  // Standalone keywords are complete values — prefixing would produce an invalid `inset none`.
  const standaloneBoxShadows = new Set([
    'none',
    'initial',
    'inherit',
    'unset',
    'revert',
    'revert-layer',
  ]);
  if (
    typeof resolved.boxShadow === 'string' &&
    !standaloneBoxShadows.has(resolved.boxShadow.trim().toLowerCase()) &&
    !/\binset\b/.test(resolved.boxShadow) &&
    !resolved.boxShadow.includes(focusVisibleBehaviorVar)
  ) {
    resolved.boxShadow = `${behaviorValue} ${resolved.boxShadow}`;
  }
  return resolved;
}
