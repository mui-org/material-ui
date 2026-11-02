import * as React from 'react';
import { expectType } from '@mui/types';
import Box from '@mui/material/Box';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import type { TooltipProps } from '@mui/material/Tooltip';
import Tooltip from '@mui/material/Tooltip';
import type { SlotComponentProps } from '@mui/material/utils';
import { mergeSlotProps } from '@mui/material/utils';

// without explicit type
const slotProps = mergeSlotProps(undefined, { className: 'foo', 'aria-label': 'bar' });
expectType<SlotComponentProps<React.ElementType, {}, {}>, typeof slotProps>(slotProps);

// explicit external slot props type
const defaultProps = mergeSlotProps<{ foo: string }>(undefined, { foo: 'bar' });
expectType<{ foo: string }, typeof defaultProps>(defaultProps);

// explicit slot props type with function
const externalSlotProps = mergeSlotProps<
  (ownerState: { foo: string }) => { foo: string },
  { foo: string }
>(() => ({ foo: 'external' }), { foo: 'default' })({ foo: '' });
expectType<{ foo: string }, typeof externalSlotProps>(externalSlotProps);

export const CustomTooltip = (props: TooltipProps) => {
  const { children, title } = props;

  return (
    <Tooltip
      {...props}
      title={<Box sx={{ p: 4 }}>{title}</Box>}
      slotProps={{
        ...props.slotProps,
        popper: mergeSlotProps(props.slotProps?.popper, {
          className: 'custom-tooltip',
          disablePortal: true,
          placement: 'top',
        }),
      }}
    >
      {children}
    </Tooltip>
  );
};

export const CustomTooltip2 = (props: TooltipProps) => {
  const { children, title } = props;

  // to ensure that the return type of `mergeSlotProps` is correctly inferred
  const popperProps = mergeSlotProps(props.slotProps?.popper, {
    className: 'custom-tooltip',
    disablePortal: true,
    placement: 'top',
  });
  return (
    <Tooltip
      {...props}
      title={<Box sx={{ p: 4 }}>{title}</Box>}
      slotProps={{
        ...props.slotProps,
        popper: popperProps,
      }}
    >
      {children}
    </Tooltip>
  );
};

type SimpleDialogProps = Omit<DialogProps, 'children' | 'onClose'> & {
  onClose: () => void;
};
function UserDetailsDialog(props: SimpleDialogProps) {
  const { onClose, slotProps: dialogSlotProps, ...dialogProps } = props;

  return (
    <Dialog
      onClose={() => onClose()}
      slotProps={{
        ...dialogSlotProps,
        transition: mergeSlotProps(dialogSlotProps?.transition, {
          onExited: (node) => {
            expectType<HTMLElement, typeof node>(node);
          },
        }),
      }}
      {...dialogProps}
    >
      content
    </Dialog>
  );
}
