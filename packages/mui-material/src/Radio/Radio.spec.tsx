import Radio from '@mui/material/Radio';
import { expectType } from '@mui/types';

<Radio
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
      'aria-label': 'Radio',
      className: 'input',
    },
  }}
/>;
