import type { DensityKey, DensitySizingKey } from '../styles/densityScale';

export {};
/**
 * Enhance the theme types with what `unstable_enhanceDensity` adds:
 * `theme.touchTarget` and `theme.iconSize` (and their `theme.vars` references),
 * and the scale steps as named `theme.spacing()` keys.
 */
declare module '@mui/material/styles' {
  interface Theme extends Partial<Record<DensitySizingKey, string>> {}

  interface ThemeVars extends Partial<Record<DensitySizingKey, string>> {}
}

declare module '@mui/system' {
  interface SpacingKeyOverrides extends Record<DensityKey | `-${DensityKey}`, true> {}
}
