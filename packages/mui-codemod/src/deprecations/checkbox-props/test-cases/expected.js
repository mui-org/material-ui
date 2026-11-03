import Checkbox from '@mui/material/Checkbox';
import { Checkbox as MyCheckbox } from '@mui/material';

<Checkbox slotProps={{
  input: { 'aria-label': 'Checkbox' }
}} />;
<Checkbox slotProps={{
  input: {
    ref: ref
  }
}} />;
<Checkbox
  slotProps={{
    input: {
      'aria-label': 'Checkbox',
      ref: ref
    }
  }} />;
<Checkbox
  slotProps={{
    root: { id: 'test' },

    input: {
      'aria-label': 'Checkbox',
      ref: ref
    }
  }} />;
<MyCheckbox slotProps={{
  input: { 'aria-label': 'Checkbox' }
}} />;
<MyCheckbox slotProps={{
  input: {
    ref: ref
  }
}} />;
<MyCheckbox
  slotProps={{
    input: {
      'aria-label': 'Checkbox',
      ref: ref
    }
  }} />;
