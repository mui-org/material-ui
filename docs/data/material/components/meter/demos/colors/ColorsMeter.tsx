import Stack from '@mui/material/Stack';
import Meter from '@mui/material/Meter';

export default function ColorsMeter() {
  return (
    <Stack spacing={3} sx={{ width: 280 }}>
      {/* @focus-start */}
      <Meter
        value={30}
        color="secondary"
        label="Secondary"
        showValue
        locale="en-US"
      />
      <Meter value={60} color="success" label="Success" showValue locale="en-US" />
      <Meter value={90} color="error" label="Error" showValue locale="en-US" />
      <Meter value={45} color="inherit" label="Inherit" showValue locale="en-US" />
      {/* @focus-end */}
    </Stack>
  );
}
