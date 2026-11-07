import type * as React from 'react';
import deepmerge from '@mui/utils/deepmerge';
import type { FocusVisibleOptions } from './createThemeNoVars';

const focusVisibleShadowVar = '--_focusVisible-shadow';

const defaultOutlineOffset = 2;

// Used by the colored-background surfaces (AppBar, Alert, SnackbarContent) to make the focus visible appear through box-shadow
export function applyChildrenFocusVisible(color: string) {
  return {
    [focusVisibleShadowVar]: color,
  };
}

export type FocusVisibleInput = boolean | FocusVisibleOptions | null | undefined;

interface FocusVisibleTheme {
  focusVisible?: React.CSSProperties | false | undefined;
  unstable_focusVisibleInsetOverrides?: React.CSSProperties | undefined;
}

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

export function mergeFocusVisibleInsetOverrides(
  sources: readonly any[],
): React.CSSProperties | undefined {
  return sources.reduce<React.CSSProperties | undefined>((merged, source) => {
    if (!source) {
      return merged;
    }
    const inputOverrides =
      source.focusVisible && typeof source.focusVisible === 'object'
        ? source.focusVisible.insetOverrides
        : undefined;
    return [source.unstable_focusVisibleInsetOverrides, inputOverrides].reduce(
      (acc, overrides) => (overrides ? deepmerge(acc ?? {}, overrides) : acc),
      merged,
    );
  }, undefined);
}

const resolvedRings = new WeakSet<object>();

/**
 * Whether an input is this module's own output, which identifies a ring fed back in by
 * `createTheme(existingTheme, …)`.
 */
export function isResolvedFocusVisible(input: FocusVisibleInput): boolean {
  return input != null && typeof input === 'object' && resolvedRings.has(input);
}

/**
 * Resolve the opt-in outer ring. `outlineColor` is the caller's default — a hex, the palette var,
 * or a scheme's primary — overridden by a user-provided `outlineColor`.
 */
export function resolveFocusVisible(
  input: true | FocusVisibleOptions,
  outlineColor: string,
): React.CSSProperties {
  const ring: Record<string, unknown> = {
    outlineStyle: 'solid',
    outlineColor,
    outlineWidth: 2,
    outlineOffset: defaultOutlineOffset,
    // invisible shadow for parent component with solid background (AppBar, Snackbar, Alert) can control the ring color.
    boxShadow: `var(${focusVisibleShadowVar}, 0 0)`,
    ...(input === true ? null : input),
  };
  delete ring.insetOverrides;
  resolvedRings.add(ring);
  return ring as React.CSSProperties;
}

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

function getInsetOutlineOffset(
  outlineWidth: React.CSSProperties['outlineWidth'],
  outlineOffset: React.CSSProperties['outlineOffset'] = defaultOutlineOffset,
): React.CSSProperties['outlineOffset'] {
  if (typeof outlineWidth === 'number') {
    return -outlineWidth;
  }
  if (typeof outlineWidth === 'string' && !outlineWidthKeywords.has(outlineWidth.trim())) {
    return `calc(-1 * ${outlineWidth})`;
  }
  return typeof outlineOffset === 'number' ? -outlineOffset : `calc(-1 * ${outlineOffset})`;
}

function getDefaultInsetRing({ outlineOffset, outlineWidth, boxShadow }: React.CSSProperties) {
  return {
    outlineOffset: getInsetOutlineOffset(outlineWidth, outlineOffset),
    ...(typeof boxShadow === 'string' && { boxShadow: toInsetBoxShadow(boxShadow) }),
  };
}

export function applyFocusVisible(
  this: FocusVisibleTheme,
  position: 'inside' | 'outside',
): React.CSSProperties {
  const ring = this.focusVisible;
  if (!ring) {
    return {};
  }
  if (position === 'outside') {
    return ring;
  }
  return { ...ring, ...getDefaultInsetRing(ring), ...this.unstable_focusVisibleInsetOverrides };
}

export function insetFocusVisibleAtLeast(
  ring: React.CSSProperties,
  depth: number,
): React.CSSProperties {
  const { outlineOffset = 0 } = ring;
  return {
    ...ring,
    outlineOffset:
      typeof outlineOffset === 'number'
        ? Math.min(outlineOffset, -depth)
        : `min(${outlineOffset}, ${-depth}px)`,
  };
}
