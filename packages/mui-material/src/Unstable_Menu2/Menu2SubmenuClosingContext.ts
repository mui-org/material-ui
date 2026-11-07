'use client';
import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

export interface Menu2SubmenuClosingContextValue {
  /**
   * Whether the popup is closed and running its exit transition.
   */
  closing: boolean;
  retainClosingTint: boolean;
  onClosingChange?: ((closing: boolean) => void) | undefined;
}

const Menu2SubmenuClosingContext = React.createContext<Menu2SubmenuClosingContextValue>({
  closing: false,
  retainClosingTint: true,
});

export interface Menu2SubmenuClosingStateProps {
  children: React.ReactElement;
  closing: boolean;
  onClosingChange: (closing: boolean) => void;
}

/** Reports committed popup state, including retained popups and unmounts. */
export function Menu2SubmenuClosingState({
  children,
  closing,
  onClosingChange,
}: Menu2SubmenuClosingStateProps) {
  // A layout effect bridges the two parts before paint. The popup owns this
  // lifetime, not an open-change request (which can be canceled or controlled).
  useEnhancedEffect(() => {
    onClosingChange(closing);
    return () => onClosingChange(false);
  }, [closing, onClosingChange]);

  return children;
}

if (process.env.NODE_ENV !== 'production') {
  Menu2SubmenuClosingContext.displayName = 'Menu2SubmenuClosingContext';
}

export default Menu2SubmenuClosingContext;
