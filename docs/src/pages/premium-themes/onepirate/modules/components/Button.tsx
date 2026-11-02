import * as React from 'react';
import { styled } from '@mui/material/styles';
import type { ButtonProps } from '@mui/material/Button';
import MuiButton from '@mui/material/Button';

const ButtonRoot = styled(MuiButton)(({ theme }) => ({
  borderRadius: 0,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: theme.typography.h1.fontFamily,
  padding: theme.spacing(2, 4),
  fontSize: theme.typography.pxToRem(14),
  boxShadow: 'none',
  '&:active, &:focus': {
    boxShadow: 'none',
  },
  variants: [
    {
      props: {
        size: 'small',
      },
      style: {
        padding: theme.spacing(1, 3),
        fontSize: theme.typography.pxToRem(13),
      },
    },
    {
      props: {
        size: 'large',
      },
      style: {
        padding: theme.spacing(2, 5),
        fontSize: theme.typography.pxToRem(16),
      },
    },
  ],
}));

// See https://mui.com/guides/typescript/#usage-of-component-prop for why the types uses `C`.
function Button<C extends React.ElementType>(
  props: ButtonProps<C, { component?: C }>,
) {
  return <ButtonRoot {...props} />;
}

export default Button;
