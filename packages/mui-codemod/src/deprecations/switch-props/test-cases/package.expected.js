import Switch from '@org/ui/material/Switch';
import { Switch as MySwitch } from '@org/ui/material';

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
