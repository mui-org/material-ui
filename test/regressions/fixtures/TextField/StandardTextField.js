import * as React from 'react';
import TextField from '@mui/material/TextField';

export default function StandardTextField() {
  return (
    <div>
      <div>
        <TextField label="Standard" variant="standard" />
        <TextField label="Standard disabled" variant="standard" disabled />
        <TextField label="Standard error" variant="standard" error />
        <TextField label="Standard required" variant="standard" required />
      </div>
      <div>
        <TextField value="Material" label="Standard" variant="standard" />
        <TextField value="Material" label="Standard disabled" variant="standard" disabled />
        <TextField value="Material" label="Standard error" variant="standard" error />
        <TextField value="Material" label="Standard required" variant="standard" required />
      </div>
    </div>
  );
}
