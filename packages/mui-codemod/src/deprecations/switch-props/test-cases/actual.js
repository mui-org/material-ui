import Switch from '@mui/material/Switch';
import { Switch as MySwitch } from '@mui/material';

<Switch inputProps={{ 'aria-label': 'Switch' }} />;
<Switch inputRef={ref} />;
<Switch inputProps={{ 'aria-label': 'Switch' }} inputRef={ref} />;
<Switch
  inputProps={{ 'aria-label': 'Switch' }}
  inputRef={ref}
  slotProps={{ root: { id: 'test' } }}
/>;
<MySwitch inputProps={{ 'aria-label': 'Switch' }} />;
<MySwitch inputRef={ref} />;
<MySwitch inputProps={{ 'aria-label': 'Switch' }} inputRef={ref} />;
