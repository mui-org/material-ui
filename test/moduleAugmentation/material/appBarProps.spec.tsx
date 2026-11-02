import * as React from 'react';
import { AppBar } from '@mui/material';

declare module '@mui/material/AppBar' {
  interface AppBarPropsColorOverrides {
    customAppBarColor: true;
  }
}

<AppBar color="customAppBarColor" />;

// @ts-expect-error unknown color
<AppBar color="foo" />;
