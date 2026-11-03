import OutlinedInput from '@mui/material/OutlinedInput';

function NoNotched() {
  return null;
}

<OutlinedInput
  slots={{
    notchedOutline: NoNotched,
  }}
/>;
<OutlinedInput
  slotProps={{
    notchedOutline: {
      className: 'hidden',
    },
  }}
/>;
