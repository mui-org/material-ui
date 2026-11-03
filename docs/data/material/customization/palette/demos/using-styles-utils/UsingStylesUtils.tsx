import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// Augment the palette to include a violet color
declare module '@mui/material/styles' {
  interface Palette {
    violet: Palette['primary'];
  }

  interface PaletteOptions {
    violet?: PaletteOptions['primary'];
  }
}

// Update the Button's color options to include a violet option
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    violet: true;
  }
}

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);

const theme = createTheme({
  palette: {
    violet: {
      main: violetMain,
      light: alpha(violetBase, 0.5),
      dark: alpha(violetBase, 0.9),
      contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
    },
  },
});

export default function UsingStylesUtils() {
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Stack sx={{ gap: 2, alignItems: 'center' }}>
        <Button variant="contained" color="violet">
          Violet
        </Button>
        <Stack direction="row" sx={{ gap: 1 }}>
          <Stack sx={{ alignItems: 'center' }}>
            <Typography variant="body2">light</Typography>
            <Box sx={{ bgcolor: 'violet.light', width: 40, height: 20 }} />
          </Stack>
          <Stack sx={{ alignItems: 'center' }}>
            <Typography variant="body2">main</Typography>
            <Box sx={{ bgcolor: 'violet.main', width: 40, height: 20 }} />
          </Stack>
          <Stack sx={{ alignItems: 'center' }}>
            <Typography variant="body2">dark</Typography>
            <Box sx={{ bgcolor: 'violet.dark', width: 40, height: 20 }} />
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
    // @focus-end
  );
}
