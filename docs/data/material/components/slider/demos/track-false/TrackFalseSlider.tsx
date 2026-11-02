import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

const Separator = styled('div')(
  ({ theme }) => `
  height: ${theme.spacing(3)};
`,
);

const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value: number) {
  return `${value}°C`;
}

export default function TrackFalseSlider() {
  // @focus-start @padding 1
  const id = React.useId();
  const rangeId = React.useId();
  return (
    <Box sx={{ width: 250 }}>
      <Typography id={`${id}-label`} gutterBottom>
        Removed track
      </Typography>
      <Slider
        track={false}
        aria-labelledby={`${id}-label`}
        getAriaValueText={valuetext}
        defaultValue={30}
        marks={marks}
      />
      <Separator />
      <Typography id={`${rangeId}-label`} gutterBottom>
        Removed track range slider
      </Typography>
      <Slider
        track={false}
        aria-labelledby={`${rangeId}-label`}
        getAriaValueText={valuetext}
        defaultValue={[20, 37, 50]}
        marks={marks}
      />
    </Box>
  );
  // @focus-end
}
