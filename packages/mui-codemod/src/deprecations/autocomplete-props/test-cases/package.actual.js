import Autocomplete from '@org/ui/material/Autocomplete';
import {Autocomplete as MyAutocomplete} from '@org/ui/material';
import Chip from '@org/ui/material/Chip';

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

<MyAutocomplete
  multiple
  options={options}
  renderTags={(value, getTagProps) =>
    value.map((option, index) => <Chip label={option.label} {...getTagProps({ index })} />)
  }
/>
