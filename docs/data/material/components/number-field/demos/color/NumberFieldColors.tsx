import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldColors() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField label="Secondary" color="secondary" defaultValue={5} focused />
      <NumberField label="Success" color="success" defaultValue={5} focused />
      {/* @focus-end */}
    </Box>
  );
}
