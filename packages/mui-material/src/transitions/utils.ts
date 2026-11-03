import type * as React from 'react';
import { defaultStyles, resolveReducedMotionStyles } from '../styles/reducedMotion';
import type { ReducedMotionMode } from '../styles/createMotion';

export const reflow = (node: Element) => node.scrollTop;

interface ComponentProps {
  easing: string | { enter?: string | undefined; exit?: string | undefined } | undefined;
  style: React.CSSProperties | undefined;
  timeout: number | { enter?: number | undefined; exit?: number | undefined };
}

interface Options {
  mode: 'enter' | 'exit';
}

interface TransitionProps {
  duration: string | number;
  easing: string | undefined;
  delay: string | undefined;
}

interface TransitionCreateOptions {
  duration: number | string;
  easing: string;
  delay: number | string;
}

interface TranslateOffset {
  offsetX: number;
  offsetY: number;
}

const DEFAULT_TRANSLATE_OFFSET = { offsetX: 0, offsetY: 0 };
const EMPTY_STYLE: React.CSSProperties = {};
const DEFAULT_TRANSITION_PROPS = ['all'];
const EMPTY_OPTIONS: Partial<TransitionCreateOptions> = {};

const transformOffsetIndexes: Record<string, readonly [number | null, number | null]> = {
  matrix: [4, 5],
  matrix3d: [12, 13],
  translate: [0, 1],
  translate3d: [0, 1],
  translateX: [0, null],
  translateY: [null, 0],
};

function parseTranslateValue(value: string | undefined): number {
  const parsedValue = parseFloat(value ?? '');
  return Number.isNaN(parsedValue) ? 0 : parsedValue;
}

function parseTransform(transform: string): { type: string; values: number[] } | null {
  const match = transform.match(
    /^(matrix|matrix3d|translate|translate3d|translateX|translateY)\((.+)\)$/,
  );

  if (!match) {
    return null;
  }

  return {
    type: match[1],
    values: match[2].split(',').map(parseTranslateValue),
  };
}

function getTranslateOffsetValue(values: number[], index: number | null): number {
  return index === null ? 0 : values[index] || 0;
}

/**
 * Extracts the x/y translation from a CSS transform string.
 *
 * Transition components use these offsets when calculating off-screen positions:
 * if an element is already translated, the distance needed to hide it must start
 * from that visual position instead of its untransformed layout position.
 *
 * CSSOM commonly serializes translations as matrix() or matrix3d(), while inline
 * gesture styles may use translate(), translate3d(), translateX(), or
 * translateY(). This helper normalizes those supported forms into numeric pixel
 * offsets and returns zero offsets for empty, none, or unsupported transforms.
 */
export function getTranslateOffsets(transform: string | undefined): TranslateOffset {
  if (!transform || transform === 'none') {
    return DEFAULT_TRANSLATE_OFFSET;
  }

  const parsedTransform = parseTransform(transform);
  if (!parsedTransform) {
    return DEFAULT_TRANSLATE_OFFSET;
  }

  const { type, values } = parsedTransform;
  const offsetIndexes = transformOffsetIndexes[type];

  if (!offsetIndexes) {
    return DEFAULT_TRANSLATE_OFFSET;
  }

  return {
    offsetX: getTranslateOffsetValue(values, offsetIndexes[0]),
    offsetY: getTranslateOffsetValue(values, offsetIndexes[1]),
  };
}

export function normalizedTransitionCallback(
  nodeRef: React.RefObject<HTMLElement | null>,
  callback: ((node: HTMLElement, isAppearing?: boolean) => void) | undefined,
): (maybeIsAppearing?: boolean) => void {
  return (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current!;
      // Enter callbacks receive isAppearing; exit callbacks do not.
      if (maybeIsAppearing === undefined) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
}
type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

/**
 * Return the child style for a transition. Reuse predefined style objects when
 * no custom styles are present so memoized children see the same object.
 */
export function getTransitionChildStyle(
  state: TransitionState,
  inProp: boolean | undefined,
  baseStyles: Record<string, React.CSSProperties>,
  hiddenStyles: React.CSSProperties,
  styleProp: React.CSSProperties | undefined,
  childStyle: React.CSSProperties | undefined,
): React.CSSProperties | undefined {
  const base =
    state === 'exited' && !inProp ? hiddenStyles : baseStyles[state] || baseStyles.exited;
  return styleProp || childStyle ? { ...base, ...styleProp, ...childStyle } : base;
}

export function getTransitionProps(props: ComponentProps, options: Options): TransitionProps {
  const { timeout, easing, style = EMPTY_STYLE } = props;

  return {
    duration:
      style.transitionDuration ??
      (typeof timeout === 'number' ? timeout : timeout[options.mode] || 0),
    easing:
      style.transitionTimingFunction ??
      (typeof easing === 'object' ? easing[options.mode] : easing),
    delay: style.transitionDelay,
  };
}

/**
 * Returns CSS that disables component-owned transitions when reduced motion is active.
 * Pass custom styles only when the default `transition: none` reset is not enough.
 */
export function getReducedMotionStyles<Styles extends object = typeof defaultStyles>(
  theme: {
    motion?: { reducedMotion?: ReducedMotionMode | undefined } | undefined;
  },
  styles?: Styles,
): Styles | { '@media (prefers-reduced-motion: reduce)': Styles } | null {
  const resolvedStyles = (styles ?? defaultStyles) as Styles;

  return resolveReducedMotionStyles(theme.motion?.reducedMotion, resolvedStyles);
}

export function getTransitionStyles(
  theme: {
    transitions?:
      | {
          create: (props?: string | string[], options?: Partial<TransitionCreateOptions>) => string;
        }
      | undefined;
    motion?: { reducedMotion?: ReducedMotionMode | undefined } | undefined;
  },
  props: string | string[] = DEFAULT_TRANSITION_PROPS,
  options: Partial<TransitionCreateOptions> = EMPTY_OPTIONS,
) {
  const transition = theme.transitions?.create?.(props, options);
  const reducedMotionStyles = getReducedMotionStyles(theme);

  if (transition === undefined) {
    return reducedMotionStyles ?? EMPTY_STYLE;
  }

  const transitionStyles = { transition };

  return reducedMotionStyles ? { ...transitionStyles, ...reducedMotionStyles } : transitionStyles;
}
