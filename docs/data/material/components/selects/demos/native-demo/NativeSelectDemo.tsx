import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function NativeSelectDemo() {
  const id = React.useId();
  return (
    <Box sx={{ minWidth: 120 }}>
      {/* @focus-start */}
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor={`${id}-select`}>
          Age
        </InputLabel>
        <NativeSelect
          defaultValue={30}
          inputProps={{
            name: 'age',
            id: `${id}-select`,
          }}
        >
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>
      {/* @focus-end */}
    </Box>
  );
}
