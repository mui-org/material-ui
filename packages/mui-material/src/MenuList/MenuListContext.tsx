'use client';
import * as React from 'react';

/**
 * @ignore - internal component.
 */

export interface MenuListContextValue {
  itemsFocusableWhenDisabled: boolean;
  suppressInitialFocusVisible: boolean;
  variant: 'menu' | 'selectedMenu';
}

export const MenuListContext = React.createContext<MenuListContextValue | undefined>(undefined);

if (process.env.NODE_ENV !== 'production') {
  MenuListContext.displayName = 'MenuListContext';
}

export function useMenuListContext() {
  const context = React.useContext(MenuListContext);

  if (context === undefined) {
    throw new Error(
      'MUI: MenuListContext is missing. MenuItems must be placed within Menu or MenuList.',
    );
  }

  return context;
}
