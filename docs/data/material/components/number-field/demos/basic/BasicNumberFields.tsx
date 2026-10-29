import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function BasicNumberFields() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        '& > .MuiNumberField-root': { width: '25ch' },
      }}
    >
      {/* @focus-start */}
      <NumberField label="Outlined" defaultValue={5} />
      <NumberField label="Filled" variant="filled" defaultValue={5} />
      <NumberField label="Standard" variant="standard" defaultValue={5} />
      {/* @focus-end */}
    </Box>
  );
}
