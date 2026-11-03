import Radio from '@org/ui/material/Radio';
import { Radio as MyRadio } from '@org/ui/material';

<Radio slotProps={{
  input: { 'aria-label': 'Radio' }
}} />;
<Radio slotProps={{
  input: {
    ref: ref
  }
}} />;
<Radio
  slotProps={{
    input: {
      'aria-label': 'Radio',
      ref: ref
    }
  }} />;
<MyRadio slotProps={{
  input: { 'aria-label': 'Radio' }
}} />;
<MyRadio slotProps={{
  input: {
    ref: ref
  }
}} />;
<MyRadio
  slotProps={{
    input: {
      'aria-label': 'Radio',
      ref: ref
    }
  }} />;
