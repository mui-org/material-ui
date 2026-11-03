import Autocomplete from '@mui/material/Autocomplete';
import {Autocomplete as MyAutocomplete} from '@mui/material';
import Chip from '@mui/material/Chip';
import useAutocomplete from '@mui/material/useAutocomplete';

<Autocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
  componentsProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>;

<Autocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
  slotProps={{
    popupIndicator: { width: 20 }
  }}
  componentsProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>;

<MyAutocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
  componentsProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>;

<CustomAutocomplete
  componentsProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>;

<CustomAutocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
/>;

<Autocomplete
  multiple
  options={options}
  renderTags={(value, getTagProps, ownerState) =>
    value.map((option, index) => (
      <Chip label={option.label} data-focused={ownerState.focused} {...getTagProps({ index })} />
    ))
  }
/>;

const { getTagProps, focusedTag } = useAutocomplete(props);

<Chip {...getTagProps({ index: focusedTag })} />;

const { getTagProps: getAutocompleteTagProps, focusedTag: focusedAutocompleteTag } =
  useAutocomplete(props);

<Chip {...getAutocompleteTagProps({ index: focusedAutocompleteTag })} />;
