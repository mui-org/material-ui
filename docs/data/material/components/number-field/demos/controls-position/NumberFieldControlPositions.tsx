import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldControlPositions() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField label="End" controlsPosition="end" defaultValue={5} />
      <NumberField label="Start" controlsPosition="start" defaultValue={5} />
      <NumberField label="Split" controlsPosition="split" defaultValue={5} />
      {/* @focus-end */}
    </Box>
  );
}
