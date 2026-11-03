import Switch from '@mui/material/Switch';
import { Switch as MySwitch } from '@mui/material';

<Switch slotProps={{
  input: { 'aria-label': 'Switch' }
}} />;
<Switch slotProps={{
  input: {
    ref: ref
  }
}} />;
<Switch
  slotProps={{
    input: {
      'aria-label': 'Switch',
      ref: ref
    }
  }} />;
<Switch
  slotProps={{
    root: { id: 'test' },

    input: {
      'aria-label': 'Switch',
      ref: ref
    }
  }} />;
<MySwitch slotProps={{
  input: { 'aria-label': 'Switch' }
}} />;
<MySwitch slotProps={{
  input: {
    ref: ref
  }
}} />;
<MySwitch
  slotProps={{
    input: {
      'aria-label': 'Switch',
      ref: ref
    }
  }} />;
