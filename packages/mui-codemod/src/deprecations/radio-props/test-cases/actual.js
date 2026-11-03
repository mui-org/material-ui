import Radio from '@mui/material/Radio';
import { Radio as MyRadio } from '@mui/material';

<Radio inputProps={{ 'aria-label': 'Radio' }} />;
<Radio inputRef={ref} />;
<Radio inputProps={{ 'aria-label': 'Radio' }} inputRef={ref} />;
<Radio
  inputProps={{ 'aria-label': 'Radio' }}
  inputRef={ref}
  slotProps={{ root: { id: 'test' } }}
/>;
<MyRadio inputProps={{ 'aria-label': 'Radio' }} />;
<MyRadio inputRef={ref} />;
<MyRadio inputProps={{ 'aria-label': 'Radio' }} inputRef={ref} />;
