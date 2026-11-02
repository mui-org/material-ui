import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';

declare module '@mui/material/InputLabel' {
  interface InputLabelPropsSizeOverrides {
    customSize: true;
  }
}

<InputLabel size="customSize" />;

// @ts-expect-error unknown size
<InputLabel size="foo" />;
