import * as React from 'react';
import Box from '@mui/material/Box';
import NumberField from './NumberField';

export default function FieldDemo() {
  return (
    <Box sx={{ display: 'grid', gap: 4 }}>
      {/* @focus-start */}
      <NumberField label="Number Field" min={10} max={40} />
      <NumberField label="Number Field (Small)" size="small" />
      <NumberField
        label="Number Field with Error"
        min={10}
        max={40}
        defaultValue={100}
        size="small"
        error
      />
      {/* @focus-end */}
    </Box>
  );
}
