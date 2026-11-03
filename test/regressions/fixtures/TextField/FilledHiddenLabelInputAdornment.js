import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export default function FilledHiddenLabelInputAdornment() {
  return (
    <TextField
      hiddenLabel
      id="filled-hidden-label"
      defaultValue="Value"
      variant="filled"
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">kg</InputAdornment>,
        },
      }}
    />
  );
}
