import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldConstraints() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField
        label="Clamped to range"
        defaultValue={5}
        min={1}
        max={10}
        helperText="Type 11, then leave the field."
      />
      <NumberField
        label="Allow out of range"
        defaultValue={5}
        min={1}
        max={10}
        allowOutOfRange
        helperText="Typed values outside 1–10 are kept."
      />
      {/* @focus-end */}
    </Box>
  );
}
