import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormLabelA11yColorMatrix from './FormLabelA11yColorMatrix';

const theme = createTheme({ palette: { mode: 'dark' } });

// The same labels in dark mode, on the dark default background.
export default function FormLabelA11yColorMatrixDark() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ bgcolor: 'background.default', p: 2 }}>
        <FormLabelA11yColorMatrix />
      </Box>
    </ThemeProvider>
  );
}
