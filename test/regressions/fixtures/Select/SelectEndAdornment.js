import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

// https://github.com/mui/material-ui/issues/45270
// The endAdornment sits left of the chevron (not over it) and the value clears
// both, across variants, with a start adornment present, and when a long value
// in a narrow field must clip without overlapping the chevron/adornment.
// NativeSelect is covered too since its end-adornment styles changed as well.
const variants = ['outlined', 'filled', 'standard'];

const nativeInputs = {
  outlined: <OutlinedInput label="Label" />,
  filled: <FilledInput />,
  standard: <Input />,
};

const endAdornment = (
  <InputAdornment position="end">
    <InfoOutlined />
  </InputAdornment>
);

const startAdornment = (
  <InputAdornment position="start">
    <InfoOutlined />
  </InputAdornment>
);

export default function SelectEndAdornment() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 320, p: 2 }}>
      {variants.map((variant) => (
        <FormControl key={variant} variant={variant}>
          <InputLabel id={`select-${variant}-label`}>Label</InputLabel>
          <Select
            labelId={`select-${variant}-label`}
            id={`select-${variant}`}
            label="Label"
            value="Twenty"
            endAdornment={endAdornment}
          >
            <MenuItem value="Twenty">Twenty</MenuItem>
          </Select>
        </FormControl>
      ))}
      <FormControl variant="outlined">
        <InputLabel id="select-start-end-label">Label</InputLabel>
        <Select
          labelId="select-start-end-label"
          id="select-start-end"
          label="Label"
          value="Twenty"
          startAdornment={startAdornment}
          endAdornment={endAdornment}
        >
          <MenuItem value="Twenty">Twenty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={{ width: 140 }}>
        <InputLabel id="select-overflow-label">Label</InputLabel>
        <Select
          labelId="select-overflow-label"
          id="select-overflow"
          label="Label"
          value="Twenty"
          endAdornment={endAdornment}
        >
          <MenuItem value="Twenty">Twenty thousand and twenty two</MenuItem>
        </Select>
      </FormControl>
      {variants.map((variant) => (
        <FormControl key={`native-${variant}`} variant={variant}>
          <InputLabel htmlFor={`native-${variant}`}>Label</InputLabel>
          <NativeSelect
            input={nativeInputs[variant]}
            inputProps={{ id: `native-${variant}` }}
            defaultValue="Twenty"
            endAdornment={endAdornment}
          >
            <option value="Twenty">Twenty</option>
          </NativeSelect>
        </FormControl>
      ))}
    </Box>
  );
}
