import * as React from 'react';
import { expectType } from '@mui/types';
import Autocomplete from '@mui/material/Autocomplete';
import type { ChipTypeMap } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import useAutocomplete from '@mui/material/useAutocomplete';

declare module '@mui/material/useAutocomplete' {
  interface UseAutocompleteProps<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
  > {
    hookLabel?: string;
  }
}

declare module '@mui/material/Autocomplete' {
  interface AutocompleteProps<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent'],
  > {
    componentLabel?: string;
  }
}

const options = [{ id: 1, label: 'One' }];

const WrappedAutocomplete = styled(Autocomplete)({});

<WrappedAutocomplete
  options={options}
  getOptionValue={() => 1}
  hookLabel="Custom"
  componentLabel="Custom"
  onChange={(event, value) => {
    expectType<React.SyntheticEvent, typeof event>(event);
    expectType<unknown, typeof value>(value);
  }}
  renderInput={() => null}
/>;

// Hook prop augmentations also reach the component props and owner state.
<Autocomplete
  options={options}
  hookLabel="Custom"
  componentLabel="Custom"
  renderInput={() => null}
  renderValue={(value, getItemProps, ownerState) => {
    expectType<string | undefined, typeof ownerState.hookLabel>(ownerState.hookLabel);
    expectType<string | undefined, typeof ownerState.componentLabel>(ownerState.componentLabel);
    return value.label;
  }}
/>;

<Autocomplete
  options={options}
  getOptionValue={(option) => option.id}
  hookLabel="Custom"
  componentLabel="Custom"
  renderInput={() => null}
  onChange={(event, value) => {
    expectType<number | null, typeof value>(value);
  }}
  isOptionEqualToValue={(option, value) => {
    expectType<number, typeof value>(value);
    return option.id === value;
  }}
  renderOption={(props, option, state, ownerState) => {
    expectType<string | undefined, typeof ownerState.hookLabel>(ownerState.hookLabel);
    expectType<string | undefined, typeof ownerState.componentLabel>(ownerState.componentLabel);
    return option.label;
  }}
  slotProps={{
    listbox: (ownerState) => {
      expectType<string | undefined, typeof ownerState.hookLabel>(ownerState.hookLabel);
      expectType<string | undefined, typeof ownerState.componentLabel>(ownerState.componentLabel);
      return {};
    },
  }}
  renderValue={(value, getItemProps, ownerState) => {
    expectType<number, typeof value>(value);
    expectType<string | undefined, typeof ownerState.hookLabel>(ownerState.hookLabel);
    expectType<string | undefined, typeof ownerState.componentLabel>(ownerState.componentLabel);
    return value;
  }}
/>;

function MappedHook() {
  const { value } = useAutocomplete({
    options,
    getOptionValue: (option) => option.id,
    hookLabel: 'Custom',
    onChange: (event, newValue) => {
      expectType<number | null, typeof newValue>(newValue);
    },
    isOptionEqualToValue: (option, selectedValue) => {
      expectType<number, typeof selectedValue>(selectedValue);
      return option.id === selectedValue;
    },
  });
  expectType<number | null, typeof value>(value);
  return null;
}

<MappedHook />;
