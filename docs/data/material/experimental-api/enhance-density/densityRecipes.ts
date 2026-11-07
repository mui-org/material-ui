import { createTheme, unstable_enhanceDensity as enhanceDensity } from '@mui/material/styles';
import type { DensityScaleOverrides, TypographyVariantsOptions } from '@mui/material/styles';

const {
  touchTarget,
  iconSize,
  spacing: defaultSteps,
} = enhanceDensity(createTheme()).unstable_densityScale!;

export interface DensityRecipe {
  id: string;
  label: string;
  scale: DensityScaleOverrides;
  typography?: TypographyVariantsOptions;
}

const densityRecipes: DensityRecipe[] = [
  {
    id: 'low',
    label: 'Low',
    scale: {
      spacing: {
        xxSmall: 8,
        xSmall: 12,
        small: 16,
        medium: 24,
        large: 32,
        xLarge: 48,
        xxLarge: 64,
      },
      touchTarget: 44,
      iconSize: 24,
    },
    typography: {
      body1: { fontSize: '1rem', lineHeight: '22px' },
      body2: { fontSize: '0.9375rem', lineHeight: '20px' },
      caption: { fontSize: '0.875rem', lineHeight: '20px' },
      button: { fontSize: '1rem', lineHeight: '22px' },
    },
  },
  {
    id: 'medium',
    label: 'Medium',
    // the shipped defaults, read from the enhancer rather than restated
    scale: { spacing: defaultSteps, touchTarget, iconSize },
  },
  {
    id: 'high',
    label: 'High',
    scale: {
      spacing: {
        xxSmall: 2,
        xSmall: 4,
        small: 8,
        medium: 12,
        large: 16,
        xLarge: 24,
        xxLarge: 32,
      },
      touchTarget: 24,
      iconSize: 12,
    },
    typography: {
      body1: { fontSize: '0.75rem', lineHeight: '16px' },
      body2: { fontSize: '0.6875rem', lineHeight: '14px' },
      caption: { fontSize: '0.6875rem', lineHeight: '14px' },
      button: { fontSize: '0.75rem', lineHeight: '16px' },
    },
  },
];

export default densityRecipes;
