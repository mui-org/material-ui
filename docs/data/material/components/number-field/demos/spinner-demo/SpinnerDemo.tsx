import * as React from 'react';
import Box from '@mui/material/Box';
import NumberSpinner from './NumberSpinner';

export default function SpinnerDemo() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        justifyContent: 'center',
      }}
    >
      {/* @focus-start */}
      <NumberSpinner label="Number Spinner" min={10} max={40} />
      <NumberSpinner label="Number Spinner (Small)" size="small" />
      <NumberSpinner
        label="Spinner with Error"
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
