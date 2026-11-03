import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue, purple, red, green, orange, brown } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  cssVariables: {
    nativeColor: true,
    // This is for the demo only, you don't need to set this to use the feature
    cssVarPrefix: 'demo',
    colorSchemeSelector: 'data',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
});

const colorSwatches = [
  { color: blue[500] },
  { color: purple[500] },
  { color: red[500] },
  { color: brown[600] },
  { color: green[600] },
  { color: orange[500] },
];

function ColorDisplay({ color }: { color: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          bgcolor: color,
          borderRadius: 1,
          border: '1px solid',
          borderColor: 'divider',
        }}
      />
      <Typography
        variant="caption"
        sx={{
          color: 'text.secondary',
          fontFamily: 'monospace',
          wordBreak: 'break-all',
        }}
      >
        {color}
      </Typography>
    </Box>
  );
}

export default function ThemeColorFunctions() {
  // @focus-start @padding 1
  const [selectedColor, setSelectedColor] = React.useState(colorSwatches[0]);

  const colorValues = {
    alpha: theme.alpha(selectedColor.color, 0.5),
    lighten: theme.lighten(selectedColor.color, 0.5),
    darken: theme.darken(selectedColor.color, 0.5),
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 3, flexWrap: 'wrap' }}>
          {colorSwatches.map((swatch) => {
            const isSelected = selectedColor.color === swatch.color;
            return (
              <Button
                key={swatch.color}
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => setSelectedColor(swatch)}
                sx={(t) => ({
                  width: 56,
                  height: 56,
                  minWidth: 56,
                  p: 0,
                  fontSize: '0.625rem',
                  fontFamily: 'monospace',
                  borderColor: isSelected ? 'transparent' : swatch.color,
                  bgcolor: isSelected ? swatch.color : 'transparent',
                  color: isSelected
                    ? t.palette.getContrastText(swatch.color)
                    : swatch.color,
                })}
              >
                {swatch.color}
              </Button>
            );
          })}
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          }}
        >
          <div>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 'medium' }}
            >
              theme.alpha(color, 0.5)
            </Typography>
            <ColorDisplay color={colorValues.alpha} />
          </div>
          <div>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 'medium' }}
            >
              theme.lighten(color, 0.5)
            </Typography>
            <ColorDisplay color={colorValues.lighten} />
          </div>
          <div>
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ fontWeight: 'medium' }}
            >
              theme.darken(color, 0.5)
            </Typography>
            <ColorDisplay color={colorValues.darken} />
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
  // @focus-end
}
