import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function FormPropsNumberFields() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField label="Required" required defaultValue={5} />
      <NumberField label="Disabled" disabled defaultValue={5} />
      <NumberField label="Read only" readOnly defaultValue={5} />
      <NumberField
        label="Quantity"
        defaultValue={5}
        helperText="Number of items to order."
      />
      {/* @focus-end */}
    </Box>
  );
}
