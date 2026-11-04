import * as React from 'react';
import { expectType } from '@mui/types';
import { mergeSlotProps } from '@mui/material/utils';
import type { PaperProps, PopoverProps } from '@mui/material';
import { Popover } from '@mui/material';

const paperProps: PaperProps<'span'> = {
  component: 'span',
  onClick: (event) => {
    expectType<React.MouseEvent<HTMLSpanElement, MouseEvent>, typeof event>(event);
  },
};
function Test() {
  return (
    <React.Fragment>
      <Popover open />;
      <Popover open slotProps={{ paper: paperProps }} />;
      <Popover
        open
        slotProps={{
          // @ts-expect-error — unknown props should be rejected
          transition: { randomInvalidProp: 'test' },
        }}
      />
      ;
      <Popover open disableAutoFocus />;
      <Popover open slotProps={{ paper: paperProps }} />
    </React.Fragment>
  );
}

<Popover
  open
  slotProps={{
    paper: {
      sx: (theme) => ({ backgroundColor: theme.palette.primary.main }),
    },
  }}
/>;

function Custom(props: PopoverProps) {
  const { slotProps, ...other } = props;
  return (
    <Popover
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
    </Popover>
  );
}

function Custom2(props: PopoverProps) {
  const { slotProps, ...other } = props;
  return (
    <Popover
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
    </Popover>
  );
}

function TestAnchorElementFunctionReturnType() {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return <Popover open anchorEl={() => buttonRef.current} />;
}
