import * as React from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const options = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];

export default function SelectPointerFlow() {
  const [value, setValue] = React.useState(10);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setValue(event.target.value as number);
  };

  return (
    <div style={{ minHeight: 260, paddingTop: 164, paddingLeft: 40 }}>
      <Select<number>
        data-testid="select"
        value={value}
        onChange={handleChange}
        sx={{ width: 180 }}
        MenuProps={{ transitionDuration: 0 }}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <div data-testid="select-value">{value}</div>
    </div>
  );
}
