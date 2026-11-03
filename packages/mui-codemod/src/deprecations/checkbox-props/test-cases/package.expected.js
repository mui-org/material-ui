import Checkbox from '@org/ui/material/Checkbox';
import { Checkbox as MyCheckbox } from '@org/ui/material';

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
