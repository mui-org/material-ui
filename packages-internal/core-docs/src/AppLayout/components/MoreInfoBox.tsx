import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { Link } from '../../Link';

export function AppearingInfoBox({
  appeared,
  children,
  ...props
}: { appeared: boolean; children: React.ReactNode } & BoxProps) {
  const [hidden, setHidden] = React.useState(false);
  return (
    <Box
      {...props}
      sx={{
        position: 'absolute',
        bottom: 8,
        left: 8,
        right: 8,
        zIndex: 3,
        mx: -1,
        background: ({ palette }) => alpha(palette.common.black, 0.9),
        borderTop: '1px solid',
        borderColor: hidden || !appeared ? 'transparent' : 'primaryDark.700',
        transform: hidden || !appeared ? 'translateY(100%)' : 'translateY(0)',
        transition: '0.2s',
        ...props.sx,
      }}
    >
      <IconButton
        size="small"
        aria-label={hidden ? 'show' : 'hide'}
        onClick={() => setHidden((bool) => !bool)}
        sx={{
          position: 'absolute',
          zIndex: 2,
          transition: '0.3s',
          right: 16,
          bottom: '100%',
          transform: hidden || !appeared ? 'translateY(-10px)' : 'translateY(50%)',
          opacity: appeared ? 1 : 0,
          color: '#FFF',
          backgroundColor: 'primary.500',
          '&:hover': {
            backgroundColor: 'primary.800',
          },
        }}
      >
        {hidden ? (
          <KeyboardArrowUpRounded fontSize="small" />
        ) : (
          <KeyboardArrowDownRounded fontSize="small" />
        )}
      </IconButton>
      <Box sx={{ px: 2, py: 1.5 }}>{children}</Box>
    </Box>
  );
}

export function MoreInfoBox({
  primaryBtnLabel,
  primaryBtnHref,
  secondaryBtnLabel,
  secondaryBtnHref,
  ...props
}: {
  primaryBtnLabel: string;
  primaryBtnHref: string;
  secondaryBtnLabel: string;
  secondaryBtnHref: string;
} & BoxProps) {
  return (
    <Box
      data-mui-color-scheme="dark"
      {...props}
      sx={{
        p: 1.5,
        bottom: 0,
        left: 0,
        right: 0,
        background: ({ palette }) => alpha(palette.primaryDark[800], 0.2),
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1.5, sm: 1 },
        borderTop: '1px solid',
        borderColor: 'divider',
        zIndex: 3,
        ...props.sx,
      }}
    >
      <Button component={Link} noLinkStyle size="small" variant="contained" href={primaryBtnHref}>
        {primaryBtnLabel}
      </Button>
      <Button
        component={Link}
        noLinkStyle
        size="small"
        variant="outlined"
        color="secondary"
        href={secondaryBtnHref}
      >
        {secondaryBtnLabel}
      </Button>
    </Box>
  );
}
