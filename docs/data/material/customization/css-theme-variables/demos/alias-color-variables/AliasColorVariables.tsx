import { ThemeProvider, createTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const theme = createTheme({
  cssVariables: {
    nativeColor: true,
    cssVarPrefix: 'alias', // This is for the demo only, you don't need to set this to use the feature
  },
  palette: {
    primary: {
      main: 'var(--colors-brand-primary)',
    },
  },
});

export default function AliasColorVariables() {
  return (
    <div>
      {/* @focus-start */}
      {/* This is just a demo to replicate the global CSS file */}
      <GlobalStyles
        styles={{
          ':root': {
            '--colors-brand-primary': 'oklch(0.85 0.2 83.89)',
          },
        }}
      />

      {/* Your App */}
      <ThemeProvider theme={theme}>
        <Box sx={{ p: 2 }}>
          <Button variant="contained">Branded Button</Button>
        </Box>
      </ThemeProvider>
      {/* @focus-end */}
    </div>
  );
}
