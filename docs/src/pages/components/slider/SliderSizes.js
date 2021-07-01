import React from 'react';

import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';

export default function SliderSizes() {
  return (
    <Box width={300}>
      <Slider
        size="small"
        defaultValue={70}
        aria-label="Small"
        valueLabelDisplay="auto"
      />
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
    </Box>
  );
}
