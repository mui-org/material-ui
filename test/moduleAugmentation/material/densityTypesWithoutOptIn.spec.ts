import type { Theme } from '@mui/material/styles';
import type { SpacingKey } from '@mui/system';

declare module '@mui/material/styles' {
  interface Theme {
    iconSize: number;
  }
}

declare const theme: Theme;

const iconSize: number = theme.iconSize;

// @ts-expect-error Spacing keys are registered only by the opt-in density types
const key: SpacingKey = 'small';

export { iconSize, key };
