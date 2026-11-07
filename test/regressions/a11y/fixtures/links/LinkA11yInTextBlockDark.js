import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinkA11yInTextBlock from './LinkA11yInTextBlock';

const theme = createTheme({ palette: { mode: 'dark' } });

// The same links in dark mode, on the dark default background.
export default function LinkA11yInTextBlockDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', color: 'text.primary', p: 2 }}>
        <LinkA11yInTextBlock />
      </Box>
    </ThemeProvider>
  );
}
