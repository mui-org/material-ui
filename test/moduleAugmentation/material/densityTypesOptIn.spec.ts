import type {} from '@mui/material/themeDensityAugmentation';
import { createTheme, unstable_enhanceDensity as enhanceDensity } from '@mui/material/styles';
import type { SpacingKey } from '@mui/system';

const keys: SpacingKey[] = ['xxSmall', 'small', 'xxLarge', '-xSmall', '-xxLarge'];

// @ts-expect-error Not a registered spacing key
const unknownKey: SpacingKey = 'tiny';

// @ts-expect-error Sizing constants are not spacing keys
const sizingKey: SpacingKey = 'touchTarget';

const varsTheme = createTheme({ cssVariables: true });
const touchTarget: string | undefined = (varsTheme.vars || varsTheme).touchTarget;
const iconSize: string | undefined = (varsTheme.vars || varsTheme).iconSize;

const enhanced = enhanceDensity(createTheme());
const enhancedTouchTarget: string = enhanced.touchTarget;
const resolvedTouchTarget: number = enhanced.unstable_densityScale.touchTarget;

export {
  keys,
  unknownKey,
  sizingKey,
  touchTarget,
  iconSize,
  enhancedTouchTarget,
  resolvedTouchTarget,
};
