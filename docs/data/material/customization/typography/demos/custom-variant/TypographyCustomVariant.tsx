import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    // @ts-expect-error: This demo adds poster without globally augmenting TypographyVariantsOptions.
    poster: {
      fontSize: '4rem',
      color: 'indianred',
    },
    // Disable v3 variant
    h3: undefined,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // @ts-expect-error: This demo maps poster without globally augmenting TypographyPropsVariantOverrides.
          poster: 'h1', // map our new variant to render an <h1> by default
        },
      },
    },
  },
});

export default function TypographyCustomVariant() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Box sx={{ '& > *': { display: 'block' } }}>
        {/* @ts-expect-error: This demo uses poster without globally augmenting TypographyPropsVariantOverrides. */}
        <Typography variant="poster">poster</Typography>
        <Typography variant="h3">h3</Typography>
      </Box>
    </ThemeProvider>
    // @focus-end
  );
}
