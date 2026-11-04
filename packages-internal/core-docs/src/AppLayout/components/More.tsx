import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';

export const More = function More(props: ButtonBaseProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  return (
    <ButtonBase
      ref={ref}
      {...props}
      onClick={(event) => {
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
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          cursor: 'pointer',
          borderRadius: 1,
          height: '100%',
          border: '1px dashed',
          transitionProperty: 'all',
          transitionDuration: '150ms',
          borderColor: 'grey.200',
          '& * svg': { transition: '0.2s' },
          '&:hover, &:focus': {
            borderColor: 'primary.main',
            bgcolor: alpha(theme.palette.primary[100], 0.4),
            '* .chevron': { transform: 'translateX(2px)' },
            '@media (hover: none)': {
              bgcolor: 'transparent',
            },
          },
          ...theme.applyDarkStyles({
            borderColor: `${alpha(theme.palette.primaryDark[400], 0.3)}`,
            '&:hover, &:focus': {
              bgcolor: alpha(theme.palette.primary[900], 0.4),
            },
          }),
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Box component="span" sx={{ mr: 1, px: '3px', lineHeight: 0 }}>
        <AddCircleRoundedIcon color="primary" fontSize="small" />
      </Box>
      <Typography
        component="span"
        variant="body2"
        sx={{ color: 'primary.main', fontWeight: 'bold', width: '100%' }}
      >
        Much more{' '}
        <KeyboardArrowRightRounded
          className="chevron"
          color="primary"
          fontSize="small"
          sx={{ verticalAlign: 'middle', ml: 'auto' }}
        />
      </Typography>
    </ButtonBase>
  );
} as typeof ButtonBase;
