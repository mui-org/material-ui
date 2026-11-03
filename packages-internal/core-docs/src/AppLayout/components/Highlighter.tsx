import * as React from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import { alpha } from '@mui/material/styles';

export function Highlighter({
  disableBorder = false,
  selected = false,
  sx,
  ...props
}: {
  disableBorder?: boolean;
  selectedBg?: 'white' | 'comfort';
  selected?: boolean;
} & ButtonBaseProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ButtonBase
      component="span"
      ref={ref}
      {...props}
      onClick={(event: any) => {
        if (ref.current) {
          ref.current.scrollIntoView({ block: 'nearest' });
        }
        if (props.onClick) {
          props.onClick(event);
        }
      }}
      onFocusVisible={(event) => {
        if (ref.current) {
          ref.current.scrollIntoView({ block: 'nearest' });
        }
        if (props.onFocusVisible) {
          props.onFocusVisible(event);
        }
      }}
      sx={[
        (theme) => ({
          justifyContent: 'flex-start',
          textAlign: 'left',
          alignItems: 'center',
          borderRadius: 1,
          height: '100%',
          border: '1px solid transparent',
          transitionProperty: 'all',
          transitionDuration: '100ms',
          color: 'primary.300',
          ...((!disableBorder || selected) && {
            borderColor: 'grey.100',
          }),
          ...(selected && {
            bgcolor: `${alpha(theme.palette.primary[50], 0.5)}`,
            borderColor: 'primary.300',
            boxShadow: `${alpha(theme.palette.primary[100], 0.5)} 0 -3px 1px inset, ${alpha(
              theme.palette.primary[100],
              0.3,
            )} 0 2px 4px 0`,
            color: 'primary.500',
          }),
          ...(!selected && {
            '&:hover': {
              bgcolor: 'primary.50',
              borderColor: 'primary.100',
              '@media (hover: none)': {
                bgcolor: 'transparent',
              },
            },
            '&:focus': {
              bgcolor: 'transparent',
            },
          }),
          ...theme.applyDarkStyles({
            color: 'primary.800',
            ...((!disableBorder || selected) && {
              borderColor: alpha(theme.palette.primaryDark[600], 0.3),
            }),
            ...(!selected && {
              '&:hover': {
                bgcolor: alpha(theme.palette.primary[900], 0.1),
                borderColor: alpha(theme.palette.primary[800], 0.4),
                '@media (hover: none)': {
                  bgcolor: 'transparent',
                },
              },
              '&:focus': {
                bgcolor: 'transparent',
              },
            }),
            ...(selected && {
              bgcolor: alpha(theme.palette.primary[800], 0.2),
              borderColor: alpha(theme.palette.primary[700], 0.8),
              color: 'primary.300',
              boxShadow: `${alpha(theme.palette.common.black, 0.2)} 0 -3px 1px inset, ${
                theme.palette.primaryDark[900]
              } 0 2px 3px 0`,
            }),
          }),
          '&.Mui-disabled': {
            opacity: 0.4,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}
