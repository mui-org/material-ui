import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function FormControlLabelPlacement() {
  // @focus-start @padding 1
  const id = React.useId();
  return (
    <FormControl>
      <FormLabel id={`${id}-label`}>Label placement</FormLabel>
      <RadioGroup
        row
        aria-labelledby={`${id}-label`}
        name="position"
        defaultValue="top"
      >
        <FormControlLabel
          value="bottom"
          control={<Radio />}
          label="Bottom"
          labelPlacement="bottom"
        />
        <FormControlLabel value="end" control={<Radio />} label="End" />
      </RadioGroup>
    </FormControl>
  );
  // @focus-end
}
