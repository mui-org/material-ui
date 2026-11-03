import * as React from 'react';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import InputAdornment from '@mui/material/InputAdornment';

export default function BaselineAlignTextField() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        Base
        <TextField
          label="label"
          placeholder="placeholder"
          variant="standard"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Visibility />
                </InputAdornment>
              ),
            },
          }}
        />
        Base
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        Base
        <TextField
          label="label"
          placeholder="placeholder"
          variant="standard"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <Visibility />
                </InputAdornment>
              ),
            },
          }}
        />
        Base
      </div>
    </div>
  );
}
