import * as React from 'react';
import { reactBenchmark } from '@mui/internal-benchmark/page';
import Autocomplete from '@mui/material/Autocomplete';
import type { AutocompleteProps } from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

const options = Array.from({ length: 1000 }, (_, index) => `Option ${index}`);

const renderOption: AutocompleteProps<string, true, false, false>['renderOption'] = (
  props,
  option,
  { selected },
) => {
  const { key, ...optionProps } = props;
  return (
    <li key={key} {...optionProps}>
      <Checkbox checked={selected} />
      {option}
    </li>
  );
};

// The checkbox list of a multiple selection, as in mui/material-ui#34712.
function CheckboxesAutocomplete() {
  return (
    <Autocomplete
      multiple
      open
      disableCloseOnSelect
      options={options}
      renderOption={renderOption}
      renderInput={(params) => <TextField {...params} label="Options" />}
    />
  );
}

const setInputValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!;

reactBenchmark(
  'Autocomplete type',
  () => <CheckboxesAutocomplete />,
  async ({ resumeReactRecording }) => {
    const input = document.querySelector('input')!;
    resumeReactRecording();
    setInputValue.call(input, '1');
    input.dispatchEvent(new Event('input', { bubbles: true }));
  },
  { reactRecordingPaused: true },
);
