import Checkbox from '@mui/material/Checkbox';
import { expectType } from '@mui/types';

<Checkbox
  slots={{
    root: 'div',
    input: 'input',
  }}
  slotProps={{
    root: {
      className: 'root',
      disableRipple: true,
      hidden: true,
    },
    input: {
      ref: (elm) => {
        expectType<HTMLInputElement | null, typeof elm>(elm);
      },
      'aria-label': 'Checkbox',
      className: 'input',
    },
  }}
/>;
