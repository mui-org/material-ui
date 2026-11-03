import { createTheme, responsiveFontSizes } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    poster: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options. Also needed for custom variants options in responsiveFontSizes.
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    poster: true;
  }
}

let theme = createTheme({
  typography: {
    poster: {
      fontSize: '2rem',
      lineHeight: 1,
    },
    h3: {
      fontSize: '2em',
    },
  },
});
theme = responsiveFontSizes(theme, {
  // custom variants
  variants: ['poster'],
});
