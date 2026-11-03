// testing docs/src/pages/customization/typography/typography.md
import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
    h3: false;
  }
}

const theme = createTheme({
  typography: {
    poster: {
      color: 'red',
    },
    // Disable h3 variant
    h3: undefined,
  },
});

<Typography variant="poster">poster</Typography>;

/* This variant is no longer supported */
// @ts-expect-error: This module augmentation explicitly disables the h3 variant.
<Typography variant="h3">h3</Typography>;
