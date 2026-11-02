import { extendTheme } from '@mui/material/styles';
import type {} from '@mui/material/themeCssVarsAugmentation';

declare module '@mui/material/styles' {
  interface ThemeCssVarOverrides {
    'custom-color': true;
  }
}

const theme = extendTheme();

theme.getCssVar('custom-color');
