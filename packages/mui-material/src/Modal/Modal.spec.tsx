import Modal, { ModalProps } from '@mui/material/Modal';

<Modal open slotProps={{ backdrop: { onEntered: () => console.log('entered') } }}>
  <div />
</Modal>;

// slotProps slots as object
<Modal open slotProps={{ backdrop: { invisible: true }, root: { id: 'modal' } }}>
  <div />
</Modal>;

// slotProps slots as function
<Modal
  open
  slotProps={{
    root: ({ disableAutoFocus }) => ({ className: disableAutoFocus ? '' : 'focused' }),
    backdrop: ({ exited }) => ({ className: exited ? 'hidden' : '' }),
  }}
>
  <div />
</Modal>;
