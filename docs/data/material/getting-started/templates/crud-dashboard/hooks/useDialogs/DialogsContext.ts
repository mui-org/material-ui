import * as React from 'react';
import type { OpenDialog, CloseDialog } from './useDialogs';

const DialogsContext = React.createContext<{
  open: OpenDialog;
  close: CloseDialog;
} | null>(null);

export default DialogsContext;
