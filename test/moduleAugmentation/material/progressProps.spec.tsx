import * as React from 'react';
import { CircularProgress, LinearProgress } from '@mui/material';

declare module '@mui/material/CircularProgress' {
  interface CircularProgressPropsColorOverrides {
    customCircularColor: true;
  }
  interface CircularProgressPropsVariantOverrides {
    dashed: true;
  }
}
declare module '@mui/material/LinearProgress' {
  interface LinearProgressPropsColorOverrides {
    customLinearColor: true;
  }
  interface LinearProgressPropsVariantOverrides {
    dashed: true;
  }
}

<CircularProgress color="customCircularColor" />;
<CircularProgress variant="dashed" />;

// @ts-expect-error unknown color
<CircularProgress color="foo" />;

<LinearProgress color="customLinearColor" />;
<LinearProgress variant="dashed" />;

// @ts-expect-error unknown color
<LinearProgress color="foo" />;
