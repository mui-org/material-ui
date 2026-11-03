import SpeedDial from '@mui/material/SpeedDial';

// slotProps.transition should reject unknown props
<SpeedDial
  ariaLabel="SpeedDial"
  slotProps={{
    // @ts-expect-error — unknown props should be rejected
    transition: { randomInvalidProp: 'test' },
  }}
/>;
