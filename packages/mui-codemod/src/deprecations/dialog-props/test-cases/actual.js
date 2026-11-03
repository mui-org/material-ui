import Dialog from '@mui/material/Dialog';
import { Dialog as MyDialog } from '@mui/material';

<Dialog
  BackdropComponent={CustomBackdrop}
  BackdropProps={CustomBackdropProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  PaperProps={PaperProps}
/>;
<MyDialog
  BackdropComponent={CustomBackdrop}
  BackdropProps={CustomBackdropProps}
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  PaperProps={PaperProps}
/>;
<Dialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
  }}
  PaperProps={PaperProps}
/>;
<MyDialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    ...outerSlots,
  }}
  PaperProps={PaperProps}
/>;
<Dialog
  TransitionComponent={ComponentTransition}
  TransitionProps={CustomTransitionProps}
  slots={{
    root: 'div',
    transition: SlotTransition,
  }}
  PaperProps={PaperProps}
/>;
// should skip non MUI components
<NonMuiDialog
  TransitionComponent={CustomTransition}
  TransitionProps={CustomTransitionProps}
  PaperProps={PaperProps}
/>;
