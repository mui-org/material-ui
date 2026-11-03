import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function GroupedSelect() {
  // @focus-start @padding 1
  const nativeId = React.useId();
  const id = React.useId();
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel htmlFor={`${nativeId}-select`}>Grouping</InputLabel>
        <Select native defaultValue="" id={`${nativeId}-select`} label="Grouping">
          <option aria-label="None" value="" />
          <optgroup label="Category 1">
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
          </optgroup>
          <optgroup label="Category 2">
            <option value={3}>Option 3</option>
            <option value={4}>Option 4</option>
          </optgroup>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id={`${id}-label`}>Grouping</InputLabel>
        <Select
          defaultValue=""
          id={`${id}-select`}
          label="Grouping"
          SelectDisplayProps={{
            'aria-labelledby': `${id}-label`,
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <ListSubheader>Category 1</ListSubheader>
          <MenuItem value={1}>Option 1</MenuItem>
          <MenuItem value={2}>Option 2</MenuItem>
          <ListSubheader>Category 2</ListSubheader>
          <MenuItem value={3}>Option 3</MenuItem>
          <MenuItem value={4}>Option 4</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
  // @focus-end
}
