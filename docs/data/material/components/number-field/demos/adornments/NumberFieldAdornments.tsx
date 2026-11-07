import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldAdornments() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField
        label="Weight"
        defaultValue={5}
        min={0}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        }}
      />
      <NumberField
        label="Price"
        defaultValue={25}
        min={0}
        controlsPosition="split"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
      />
      {/* @focus-end */}
    </Box>
  );
}
