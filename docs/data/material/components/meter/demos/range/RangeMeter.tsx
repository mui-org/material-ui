import Box from '@mui/material/Box';
import Meter from '@mui/material/Meter';

export default function RangeMeter() {
  return (
    <Box sx={{ width: 280 }}>
      {/* @focus-start */}
      <Meter
        value={1.8}
        min={0}
        max={4}
        label="Memory"
        showValue
        locale="en-US"
        format={{ style: 'unit', unit: 'gigabyte', maximumFractionDigits: 1 }}
      />
      {/* @focus-end */}
    </Box>
  );
}
