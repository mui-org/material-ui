import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function FormattedNumberFields() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      <NumberField
        label="Price in dollars"
        defaultValue={1234.5}
        locale="en-US"
        format={{ style: 'currency', currency: 'USD' }}
      />
      <NumberField
        label="Price in euros"
        defaultValue={1234.5}
        locale="de-DE"
        format={{ style: 'currency', currency: 'EUR' }}
      />
      <NumberField
        label="Percentage"
        defaultValue={0.125}
        locale="en-US"
        step={0.01}
        format={{ style: 'percent', maximumFractionDigits: 1 }}
      />
      {/* @focus-end */}
    </Box>
  );
}
