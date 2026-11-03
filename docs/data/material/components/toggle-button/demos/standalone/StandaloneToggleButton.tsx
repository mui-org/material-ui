import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';

export default function StandaloneToggleButton() {
  const [selected, setSelected] = React.useState(false);

  return (
    // @focus-start @padding 2
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => setSelected((prevSelected) => !prevSelected)}
      aria-label="mark as done"
    >
      <CheckIcon />
    </ToggleButton>
    // @focus-end
  );
}
