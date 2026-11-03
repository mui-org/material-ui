import Autocomplete from '@org/ui/material/Autocomplete';
import {Autocomplete as MyAutocomplete} from '@org/ui/material';
import Chip from '@org/ui/material/Chip';

<Autocomplete
  slots={{
    paper: CustomPaper,
    popper: CustomPopper
  }}
  slotProps={{
    chip: { height: 10 },
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },

    listbox: {
      component: CustomListbox,
      ...{ height: 12 }
    }
  }} />;

<Autocomplete
  slotProps={{
    chip: { height: 10 },
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },

    popupIndicator: {
      ...{ width: 16 },
      ...{ width: 20 }
    },

    listbox: {
      component: CustomListbox,
      ...{ height: 12 }
    }
  }}
  slots={{
    paper: CustomPaper,
    popper: CustomPopper
  }} />;

<MyAutocomplete
  slots={{
    paper: CustomPaper,
    popper: CustomPopper
  }}
  slotProps={{
    chip: { height: 10 },
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },

    listbox: {
      component: CustomListbox,
      ...{ height: 12 }
    }
  }} />;

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
  renderValue={(value, getItemProps) =>
    value.map((option, index) => <Chip label={option.label} {...getItemProps({ index })} />)
  }
/>
