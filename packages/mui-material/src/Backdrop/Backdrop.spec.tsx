import Backdrop from '@mui/material/Backdrop';

// slotProps.transition should reject unknown props
<Backdrop
  open
  slotProps={{
    // @ts-expect-error — unknown props should be rejected
    transition: { randomInvalidProp: 'test' },
  }}
/>;
