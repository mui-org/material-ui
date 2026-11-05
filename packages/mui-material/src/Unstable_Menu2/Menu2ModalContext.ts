'use client';
import * as React from 'react';

/**
 * Whether the root menu is modal. A menu opened by hover is not modal.
 */
const Menu2ModalContext = React.createContext(false);

if (process.env.NODE_ENV !== 'production') {
  Menu2ModalContext.displayName = 'Menu2ModalContext';
}

export default Menu2ModalContext;
