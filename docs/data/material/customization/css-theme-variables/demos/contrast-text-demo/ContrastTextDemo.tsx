import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const theme = createTheme({
  cssVariables: {
    nativeColor: true,
    cssVarPrefix: 'contrast', // This is for the demo only, you don't need to set this to use the feature
  },
});

export default function ContrastTextDemo() {
  // @focus-start @padding 1
  const [lightness, setLightness] = React.useState(0.65);
  const [chroma, setChroma] = React.useState(0.3);
  const [hue, setHue] = React.useState(29);

  // Create OKLCH color from slider values
  const backgroundColor = `oklch(${lightness} ${chroma} ${hue})`;

  // Get contrast text using theme function
  const contrastText = theme.palette.getContrastText(backgroundColor);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          gap: 5,
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        {/* Live Preview Square */}
        <Box
          sx={{
            mt: 2,
            width: 200,
            height: 200,
            bgcolor: backgroundColor,
            color: contrastText,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'divider',
            flexShrink: 0,
          }}
        >
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            {backgroundColor}
          </Typography>
        </Box>
        {/* Sliders */}
        <Box sx={{ flex: '1 1 300px', maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            OKLCH
          </Typography>
          <div>
            <Typography variant="body2" gutterBottom>
              Lightness: {lightness}
            </Typography>
            <Slider
              value={lightness}
              onChange={(_, value) => setLightness(value)}
              min={0}
              max={1}
              step={0.01}
              valueLabelDisplay="auto"
            />
          </div>

          <div>
            <Typography variant="body2" gutterBottom>
              Chroma: {chroma}
            </Typography>
            <Slider
              value={chroma}
              onChange={(_, value) => setChroma(value)}
              min={0}
              max={0.4}
              step={0.01}
              valueLabelDisplay="auto"
            />
          </div>

          <div>
            <Typography variant="body2" gutterBottom>
              Hue: {hue}°
            </Typography>
            <Slider
              value={hue}
              onChange={(_, value) => setHue(value)}
              min={0}
              max={360}
              step={1}
              valueLabelDisplay="auto"
            />
          </div>
        </Box>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            gap: 3,
          }}
        >
          <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
            <b>Text color:</b> {contrastText}
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
  // @focus-end
}
