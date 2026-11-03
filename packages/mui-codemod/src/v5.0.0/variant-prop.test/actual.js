import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

import MuiTextField2 from '@mui/material/TextField';
import MuiSelect2 from '@mui/material/Select';
import { FormControl as MuiFormControl2 } from '@mui/material';

const Select2 = () => <MuiSelect2 />;

export default function TextFieldComponent(props) {
  return (
    <div>
      <TextField {...props} />
      <TextField variant="outlined" />
      <TextField variant="standard" />
      <TextField variant="filled" />
      <Select {...props} />
      <Select variant="outlined" />
      <Select variant="standard" />
      <Select variant="filled" />
      <FormControl {...props} />
      <FormControl variant="outlined" />
      <FormControl variant="standard" />
      <FormControl variant="filled" />
      <Autocomplete
        options={[]}
        getOptionLabel={(option) => option.title}
        renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
      />
      <CustomSelect />
      <SelectedRoute />
      <FromToSelect />
      <FromToSelectDrawer />
      <MuiTextField2 />
      <Select2 />
      <MuiFormControl2 />
    </div>
  );
}
