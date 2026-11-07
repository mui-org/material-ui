import Box from '@mui/material/Box';
import Meter from '@mui/material/Meter';

export default function ValueTextMeter() {
  return (
    <Box sx={{ width: 280 }}>
      {/* @focus-start */}
      <Meter
        value={3}
        max={4}
        label="Tasks completed"
        locale="en-US"
        renderValue={(formattedValue, value) => `${value} of 4`}
        getAriaValueText={(formattedValue, value) => `${value} of 4`}
      />
      {/* @focus-end */}
    </Box>
  );
}
