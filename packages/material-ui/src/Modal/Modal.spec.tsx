import * as React from 'react';
import Modal, { ModalProps } from '@material-ui/core/Modal';

const backdropProps: ModalProps['BackdropProps'] = {
  onEntered: () => console.log('entered'),
};

<Modal open BackdropProps={{ onEntered: () => console.log('entered') }}>
  <div />
</Modal>;
