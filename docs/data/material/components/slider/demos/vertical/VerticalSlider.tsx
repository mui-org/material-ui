import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';

export default function VerticalSlider() {
  return (
    <Stack sx={{ height: 300 }} spacing={1} direction="row">
      {/* @focus-start */}
      <Slider
        aria-label="Temperature"
        orientation="vertical"
        getAriaValueText={getAriaValueText}
        valueLabelDisplay="auto"
        defaultValue={30}
      />
      <Slider
        aria-label="Temperature"
        orientation="vertical"
        defaultValue={30}
        valueLabelDisplay="auto"
        disabled
      />
      <Slider
        getAriaLabel={() => 'Temperature'}
        orientation="vertical"
        getAriaValueText={getAriaValueText}
        defaultValue={[20, 37]}
        valueLabelDisplay="auto"
        marks={marks}
      />
      {/* @focus-end */}
    </Stack>
  );
}

function getAriaValueText(value: number) {
  return `${value}°C`;
}

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
