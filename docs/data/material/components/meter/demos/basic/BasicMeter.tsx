import Box from '@mui/material/Box';
import Meter from '@mui/material/Meter';

export default function BasicMeter() {
  return (
    <Box sx={{ width: 280 }}>
      {/* @focus-start */}
      <Meter value={24} label="Storage used" showValue locale="en-US" />
      {/* @focus-end */}
    </Box>
  );
}
