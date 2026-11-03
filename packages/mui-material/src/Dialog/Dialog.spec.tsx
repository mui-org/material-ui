import * as React from 'react';
import { expectType } from '@mui/types';
import { mergeSlotProps } from '@mui/material/utils';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import type { PaperProps } from '@mui/material/Paper';

const paperProps: PaperProps<'span'> = {
  component: 'span',
  onClick: (event) => {
    expectType<React.MouseEvent<HTMLSpanElement, MouseEvent>, typeof event>(event);
  },
};
function Test() {
  return (
    <React.Fragment>
      <Dialog open />;
      <Dialog open slotProps={{ paper: paperProps }} />;
      <Dialog
        open
        slotProps={{
          // @ts-expect-error — unknown props should be rejected
          transition: { randomInvalidProp: 'test' },
        }}
      />
      ;
    </React.Fragment>
  );
}

function DialogWithAlertRole() {
  return <Dialog open role="alertdialog" />;
}

function Custom(props: DialogProps) {
  const { slotProps, ...other } = props;
  return (
    <Dialog
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
    >
      test
    </Dialog>
  );
}

function Custom2(props: DialogProps) {
  const { slotProps, ...other } = props;
  return (
    <Dialog
      slotProps={{
        ...slotProps,
        transition: mergeSlotProps(slotProps?.transition, {
          onExited: (node) => {
            expectType<HTMLElement, typeof node>(node);
          },
        }),
      }}
      {...other}
    >
      test
    </Dialog>
  );
}
