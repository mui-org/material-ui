import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function DiscreteSliderSteps() {
  return (
    <Box sx={{ width: 300 }}>
      {/* @focus-start */}
      <Slider
        aria-label="Small steps"
        defaultValue={0.00000005}
        getAriaValueText={valuetext}
        step={0.00000001}
        marks
        min={-0.00000005}
        max={0.0000001}
        valueLabelDisplay="auto"
      />
      {/* @focus-end */}
    </Box>
  );
}
