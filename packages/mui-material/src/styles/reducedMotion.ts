import type { ReducedMotionMode } from './createMotion';

export const defaultStyles = {
  transition: 'none',
};

export function resolveReducedMotionStyles<Styles extends object>(
  reducedMotion: ReducedMotionMode | undefined,
  styles: Styles,
): Styles | { '@media (prefers-reduced-motion: reduce)': Styles } | null {
  if (reducedMotion === 'always') {
    return styles;
  }

  if (reducedMotion === 'system') {
    return {
      '@media (prefers-reduced-motion: reduce)': styles,
    };
  }

  return null;
}
