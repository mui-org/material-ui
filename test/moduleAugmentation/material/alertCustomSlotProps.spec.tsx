import * as React from 'react';
import Alert from '@mui/material/Alert';
import type { IconButtonProps } from '@mui/material';
import { IconButton, svgIconClasses } from '@mui/material';

declare module '@mui/material/Alert' {
  interface AlertCloseButtonSlotPropsOverrides {
    iconSize: 'small' | 'medium';
  }
}

type MyIconButtonProps = IconButtonProps<
  'button',
  {
    iconSize?: 'small' | 'medium';
  }
>;

const MyIconButton = ({ iconSize, ...other }: MyIconButtonProps) => {
  return (
    <IconButton
      {...other}
      sx={{
        // whatever customization based on iconSize
        [`.${svgIconClasses.root}`]: {
          fontSize: iconSize === 'small' ? '1rem' : '1.5rem',
        },
      }}
    />
  );
};

<Alert
  severity="success"
  slots={{
    closeButton: MyIconButton,
  }}
  slotProps={{
    closeButton: {
      iconSize: 'medium',
    },
  }}
>
  Here is a gentle confirmation that your action was successful.
</Alert>;
