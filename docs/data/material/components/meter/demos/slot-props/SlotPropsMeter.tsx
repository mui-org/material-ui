import Box from '@mui/material/Box';
import Meter from '@mui/material/Meter';

export default function SlotPropsMeter() {
  return (
    <Box sx={{ width: 280 }}>
      {/* @focus-start */}
      <Meter
        value={72}
        label="Upload"
        showValue
        locale="en-US"
        slotProps={{
          track: { sx: { height: 10, borderRadius: 5 } },
          indicator: { sx: { borderRadius: 5 } },
          value: { sx: { fontWeight: 'bold' } },
        }}
      />
      {/* @focus-end */}
    </Box>
  );
}
