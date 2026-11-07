import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';

// Exercises the labelling states axe can assert on FormControlLabel: the
// accessible name comes from the visible string label, the required and
// disabled states, and a long label that has to reflow. labelPlacement is left
// out on purpose: it changes only the visual order, not the accessibility tree,
// so it adds no axe assertion.
export default function FormControlLabelA11yStates() {
  return (
    <Stack spacing={1}>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Email notifications" />
        <FormControlLabel control={<Switch />} label="Dark mode" />
        <FormControlLabel required control={<Checkbox />} label="Accept the terms of service" />
        <FormControlLabel disabled control={<Checkbox />} label="Unavailable option" />
        <FormControlLabel
          control={<Checkbox />}
          label="Send me product updates, occasional survey invitations, and the monthly newsletter"
        />
      </FormGroup>
      <RadioGroup defaultValue="standard" name="shipping-speed">
        <FormControlLabel value="standard" control={<Radio />} label="Standard shipping" />
        <FormControlLabel value="express" control={<Radio />} label="Express shipping" />
      </RadioGroup>
    </Stack>
  );
}
