import type { Interpolation } from '@mui/system';
import { createTheme, styled } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Mixins {
    customMixin: Interpolation<{}>;
  }
}

// ensure MixinsOptions work
const theme = createTheme({ mixins: { customMixin: { paddingLeft: 2 } } });

// ensure Mixins work
const Example = styled('div')(({ theme: t }) => t.mixins.customMixin);
