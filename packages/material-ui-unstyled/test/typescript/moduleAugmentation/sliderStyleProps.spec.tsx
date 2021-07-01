import * as React from 'react';
import { SliderUnstyled } from '@material-ui/unstyled';

declare module '@material-ui/unstyled' {
  interface SliderStylePropsOverrides {
    color?: 'primary' | 'secondary';
  }
}

<SliderUnstyled componentsProps={{ root: { styleProps: { color: 'primary' } } }} />;

// @ts-expect-error unknown color
<SliderUnstyled componentsProps={{ root: { styleProps: { color: 'inherit' } } }} />;
