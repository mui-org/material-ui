import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import Fab from '@mui/material/Fab';

<SpeedDial
  ariaLabel="SpeedDial"
  slots={{ fab: Fab }}
  slotProps={{
    fab: {
      color: 'secondary',
      component: 'a',
      href: '#actions',
      ref: React.createRef<HTMLButtonElement>(),
      onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        const button: HTMLButtonElement = event.currentTarget;
        button.focus();
      },
    },
  }}
/>;

<SpeedDial
  ariaLabel="SpeedDial"
  slotProps={{
    fab: (ownerState) => ({
      color: ownerState.open ? 'secondary' : 'primary',
    }),
  }}
/>;

<SpeedDial
  ariaLabel="SpeedDial"
  slotProps={{
    // @ts-expect-error unknown props should be rejected
    fab: { randomInvalidProp: 'test' },
  }}
/>;

// slotProps.transition should reject unknown props
<SpeedDial
  ariaLabel="SpeedDial"
  slotProps={{
    // @ts-expect-error — unknown props should be rejected
    transition: { randomInvalidProp: 'test' },
  }}
/>;
