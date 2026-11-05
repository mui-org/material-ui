import * as React from 'react';
import { expectType } from '@mui/types';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import type { Menu2TriggerProps } from '@mui/material/Unstable_Menu2Trigger';
import Menu2Trigger from '@mui/material/Unstable_Menu2Trigger';
import { createTheme } from '@mui/material/styles';
import {
  // @ts-expect-error Menu2Trigger is not exported from the root barrel for this POC.
  Menu2Trigger as RootBarrelMenu2Trigger,
} from '@mui/material';

<Menu2Trigger
  id="profile-trigger"
  className="profile-trigger"
  title="Profile actions"
  aria-label="Profile actions"
  data-testid="profile-trigger"
  disabled={false}
  nativeButton
  openOnHover
  delay={100}
  closeDelay={50}
  ref={(node) => expectType<HTMLElement | null, typeof node>(node)}
  render={
    <Button variant="outlined" size="small" sx={{ color: 'primary.main' }}>
      Profile
    </Button>
  }
/>;

<Menu2Trigger render={<button type="button">Profile</button>} />;

<Menu2Trigger
  nativeButton={false}
  ref={React.createRef<HTMLAnchorElement>()}
  render={<a href="/profile">Profile</a>}
/>;

<Menu2Trigger render={<Button />}>Profile</Menu2Trigger>;

<Menu2Trigger
  render={(props, { open }) => <Button {...props}>{open ? 'Close' : 'Open'}</Button>}
/>;

<Menu2Trigger render={(props) => <IconButton {...props} aria-label="Profile actions" />} />;

<Menu2Trigger
  nativeButton={false}
  render={(props) => (
    <Button {...props} component="a" href="/profile">
      Profile
    </Button>
  )}
/>;

<Menu2Trigger
  render={(props, state) => {
    expectType<boolean, typeof state.open>(state.open);
    expectType<boolean, typeof state.disabled>(state.disabled);
    // @ts-expect-error The render element owns its color prop, not the trigger.
    props.color;
    return (
      <button type="button" {...props}>
        {state.open ? 'Close profile' : 'Open profile'}
      </button>
    );
  }}
/>;

const triggerProps: Menu2TriggerProps = {
  render: <button type="button">Profile</button>,
  onClick: (event) => {
    expectType<EventTarget & HTMLElement, typeof event.currentTarget>(event.currentTarget);
  },
};
<Menu2Trigger {...triggerProps} ref={React.createRef<HTMLButtonElement>()} />;

createTheme({
  components: {
    MuiMenu2Trigger: {
      defaultProps: {
        openOnHover: true,
        delay: 200,
        closeDelay: 100,
        nativeButton: false,
        disabled: false,
        className: 'menu-trigger',
      },
    },
  },
});

createTheme({
  components: {
    MuiMenu2Trigger: {
      // @ts-expect-error The render element owns the trigger styles.
      styleOverrides: { root: { color: 'red' } },
    },
  },
});

createTheme({
  components: {
    MuiMenu2Trigger: {
      // @ts-expect-error The render element owns the trigger variants.
      variants: [],
    },
  },
});

<Menu2Trigger
  // @ts-expect-error Detached triggers are not part of the Menu2 API.
  handle={{}}
  render={<button type="button">Profile</button>}
/>;

<Menu2Trigger
  // @ts-expect-error Trigger payloads are not part of the Menu2 API.
  payload={{ id: 1, label: 'Profile' }}
  render={<button type="button">Profile</button>}
/>;

// @ts-expect-error A trigger requires a render element or function.
<Menu2Trigger />;
// @ts-expect-error An element child does not replace the required render prop.
<Menu2Trigger>
  <Button>Profile</Button>
</Menu2Trigger>;
// @ts-expect-error A render element cannot be plain text.
<Menu2Trigger render="Profile" />;
// @ts-expect-error A render element cannot be null.
<Menu2Trigger render={null} />;
// @ts-expect-error The render prop cannot be undefined.
<Menu2Trigger render={undefined} />;
<Menu2Trigger
  // @ts-expect-error The render prop cannot be an array of elements.
  render={[
    <button type="button" key="one">
      One
    </button>,
    <button type="button" key="two">
      Two
    </button>,
  ]}
/>;

<Menu2Trigger
  // @ts-expect-error Set visual props on the render element.
  variant="outlined"
  render={<button type="button">Profile</button>}
/>;

<Menu2Trigger
  // @ts-expect-error Set sx on the render element.
  sx={{ color: 'primary.main' }}
  render={<Button>Profile</Button>}
/>;

<Menu2Trigger
  // @ts-expect-error Set color on the render element.
  color="primary"
  render={<Button>Profile</Button>}
/>;

<Menu2Trigger
  // @ts-expect-error The render prop determines the element type.
  component="button"
  render={<button type="button">Profile</button>}
/>;

<Menu2Trigger
  // @ts-expect-error The ref points to a DOM element.
  ref={React.createRef<SVGSVGElement>()}
  render={<button type="button">Profile</button>}
/>;
