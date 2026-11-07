import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function FullWidthNumberField() {
  return (
    <Box sx={{ width: 500, maxWidth: '100%' }}>
      {/* @focus */}
      <NumberField label="Quantity" defaultValue={5} fullWidth />
    </Box>
  );
}
