import Checkbox from '@mui/material/Checkbox';
import { Checkbox as MyCheckbox } from '@mui/material';

<Checkbox inputProps={{ 'aria-label': 'Checkbox' }} />;
<Checkbox inputRef={ref} />;
<Checkbox inputProps={{ 'aria-label': 'Checkbox' }} inputRef={ref} />;
<Checkbox
  inputProps={{ 'aria-label': 'Checkbox' }}
  inputRef={ref}
  slotProps={{ root: { id: 'test' } }}
/>;
<MyCheckbox inputProps={{ 'aria-label': 'Checkbox' }} />;
<MyCheckbox inputRef={ref} />;
<MyCheckbox inputProps={{ 'aria-label': 'Checkbox' }} inputRef={ref} />;
