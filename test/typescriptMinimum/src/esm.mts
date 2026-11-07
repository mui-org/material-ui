import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import type { Menu2Props } from '@mui/material/Unstable_Menu2';
import Menu2 from '@mui/material/Unstable_Menu2';
import type { Menu2PopupProps } from '@mui/material/Unstable_Menu2Popup';
import Menu2Popup from '@mui/material/Unstable_Menu2Popup';
import Menu2SubmenuPopup from '@mui/material/Unstable_Menu2SubmenuPopup';
import type { Menu2TriggerProps } from '@mui/material/Unstable_Menu2Trigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';

export { Button, Menu } from '@mui/material';
export { createTheme } from '@mui/material/styles';
export { Menu2, Menu2Trigger, Menu2Popup, Menu2SubmenuPopup };

export const triggerProps: Menu2TriggerProps = {
  disabled: false,
  render: React.createElement('button', { type: 'button' }, 'Profile'),
  onClick: (event) => {
    event.currentTarget satisfies HTMLElement;
    // @ts-expect-error The trigger event targets an HTML element.
    event.currentTarget satisfies SVGElement;
  },
};

export const callbackTriggerProps: Menu2TriggerProps = {
  render: (props, state) => {
    state.open satisfies boolean;
    state.disabled satisfies boolean;
    return React.createElement(
      'button',
      { type: 'button', ...props },
      state.open ? 'Close' : 'Open',
    );
  },
};

export const buttonCallbackTriggerProps: Menu2TriggerProps = {
  render: (props, state) => {
    state.open satisfies boolean;
    state.disabled satisfies boolean;
    // @ts-expect-error The callback props do not include the legacy HTML color attribute.
    props.color satisfies string | undefined;
    return React.createElement(Button, { ...props }, state.open ? 'Close' : 'Open');
  },
};

export const iconButtonCallbackTriggerProps: Menu2TriggerProps = {
  render: (props, state) => {
    state.open satisfies boolean;
    state.disabled satisfies boolean;
    return React.createElement(IconButton, {
      ...props,
      'aria-label': state.open ? 'Close menu' : 'Open menu',
    });
  },
};

export const invalidColorTriggerProps: Menu2TriggerProps = {
  ...triggerProps,
  // @ts-expect-error Set color on the render element.
  color: 'primary',
};

export const invalidComponentTriggerProps: Menu2TriggerProps = {
  ...triggerProps,
  // @ts-expect-error Use render to select the trigger component.
  component: 'button',
};

export const invalidTriggerProps: Menu2TriggerProps = {
  ...triggerProps,
  // @ts-expect-error Trigger payloads are not part of the Menu2 API.
  payload: { id: 1, label: 'Profile' },
};

export const menuProps: Menu2Props = {
  open: true,
  children: React.createElement(Menu2Popup, null, 'Profile'),
};

export const popupProps: Menu2PopupProps = {
  anchor: React.createRef<HTMLButtonElement>(),
  finalFocus: React.createRef<HTMLButtonElement>(),
  children: 'Profile',
};

// Check callback types through the ESM component declaration.
Menu2({
  ...menuProps,
  onOpenChange: (open, eventDetails) => {
    open satisfies boolean;
    // @ts-expect-error The open state is a boolean.
    open satisfies string;
    eventDetails.cancel();
  },
  onOpenChangeComplete: (open) => {
    open satisfies boolean;
  },
});
