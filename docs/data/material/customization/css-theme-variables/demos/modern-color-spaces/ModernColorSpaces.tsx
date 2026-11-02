import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function ModernColorSpaces() {
  // @focus-start @padding 1
  const colorSpaces = [
    'color(display-p3 0.7 0.5 0)', // Mud
    'oklch(0.62 0.25 29)', // Orange
    'oklab(0.59 0.1 -0.14)', // Purple
    'hsl(141, 70%, 48%)', // Green
    'rgb(25, 118, 210)', // Blue
  ];

  const [selectedColor, setSelectedColor] = React.useState(colorSpaces[0]);

  const theme = React.useMemo(
    () =>
      createTheme({
        cssVariables: {
          nativeColor: true,
          cssVarPrefix: 'modern-color-spaces',
        },
        palette: {
          primary: {
            main: selectedColor,
          },
        },
      }),
    [selectedColor],
  );

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
      <FormControl>
        <FormLabel>Main color</FormLabel>
        <RadioGroup
          value={selectedColor}
          onChange={(event) => setSelectedColor(event.target.value)}
        >
          {colorSpaces.map((value) => (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio />}
              label={value}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <ThemeProvider theme={theme}>
        <Button variant="contained" size="large">
          Button
        </Button>
      </ThemeProvider>
    </Box>
  );
  // @focus-end
}
