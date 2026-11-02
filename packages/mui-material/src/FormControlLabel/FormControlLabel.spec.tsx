import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// @ts-expect-error `inputRef` is not supported, use the control's `slotProps.input.ref`
<FormControlLabel control={<Checkbox />} label="Label" inputRef={React.createRef()} />;

<FormControlLabel
  control={<Checkbox slotProps={{ input: { ref: React.createRef<HTMLInputElement>() } }} />}
  label="Label"
/>;
