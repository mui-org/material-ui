import { createContext } from 'react';

interface DialogContextValue {
  titleId?: string;
}

const DialogContext = createContext<DialogContextValue>({});

if (process.env.NODE_ENV !== 'production') {
  DialogContext.displayName = 'DialogContext';
}

export default DialogContext;
