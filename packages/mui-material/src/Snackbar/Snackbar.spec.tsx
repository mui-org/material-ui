import { mergeSlotProps } from '@mui/material/utils';
import type { SnackbarProps } from '@mui/material/Snackbar';
import Snackbar from '@mui/material/Snackbar';
import { expectType } from '@mui/types';

// slotProps.transition should reject unknown props
<Snackbar
  slotProps={{
    // @ts-expect-error — unknown props should be rejected
    transition: { randomInvalidProp: 'test' },
  }}
/>;

<Snackbar
  slots={{
    root: 'dialog',
    content: 'span',
    clickAwayListener: 'div',
    transition: 'span',
  }}
/>;

<Snackbar
  slotProps={{
    root: {
      className: 'flex',
      sx: { color: 'red' },
    },
    content: {
      action: null,
      className: 'flex',
      sx: { color: 'red' },
    },
    clickAwayListener: {
      onClickAway(event) {
        expectType<MouseEvent | TouchEvent, typeof event>(event);
      },
    },
    transition: {
      timeout: 1000,
      onEnter(node, isAppearing) {
        expectType<HTMLElement, typeof node>(node);
        expectType<boolean, typeof isAppearing>(isAppearing);
      },
    },
  }}
/>;

function Custom(props: SnackbarProps) {
  const { slotProps, ...other } = props;
  return (
    <Snackbar
      slotProps={{
        ...slotProps,
        transition: (ownerState) => {
          const transitionProps =
            typeof slotProps?.transition === 'function'
              ? slotProps.transition(ownerState)
              : slotProps?.transition;
          return {
            ...transitionProps,
            onExited: (node) => {
              transitionProps?.onExited?.(node);
            },
          };
        },
      }}
      {...other}
    />
  );
}

function Custom2(props: SnackbarProps) {
  const { slotProps, ...other } = props;
  return (
    <Snackbar
      slotProps={{
        ...slotProps,
        transition: mergeSlotProps(slotProps?.transition, {
          onExited: (node) => {
            expectType<HTMLElement, typeof node>(node);
          },
        }),
      }}
      {...other}
    />
  );
}

const snackbarCloseEvent: Parameters<NonNullable<SnackbarProps['onClose']>>[0] = null;

function handleSnackbarClose(event: React.SyntheticEvent | Event, reason?: string) {}
<Snackbar open onClose={handleSnackbarClose} />;
