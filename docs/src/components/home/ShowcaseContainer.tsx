import * as React from 'react';
import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import NoSsr from '@mui/material/NoSsr';
import { Frame } from '@mui/internal-core-docs/AppLayout';

export function ShowcaseCodeWrapper({
  children,
  clip,
  hasDesignToggle,
  maxHeight,
  sx,
}: {
  clip?: boolean;
  children: React.ReactNode;
  hasDesignToggle?: boolean;
  maxHeight: number | string;
  sx?: BoxProps['sx'];
}) {
  return (
    <Box
      sx={{
        p: 2,
        pt: hasDesignToggle ? 7 : 2,
        maxHeight: { xs: 'auto', sm: maxHeight },
        position: 'relative',
        display: 'flex',
        overflow: clip ? 'clip' : 'auto',
        flexGrow: 1,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

export default function ShowcaseContainer({
  code,
  noPadding,
  preview,
  sx,
}: {
  code?: React.ReactNode;
  noPadding?: boolean;
  preview?: React.ReactNode;
  sx?: BoxProps['sx'];
}) {
  return (
    <Fade in timeout={700}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          '& > div:first-of-type': {
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          },
          '& > div:last-of-type': {
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
          },
          ...sx,
        }}
      >
        <Frame.Demo
          sx={{
            p: noPadding ? 0 : 2,
            minHeight: 220,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {preview}
        </Frame.Demo>
        {code ? (
          <Frame.Info data-mui-color-scheme="dark" sx={{ p: 0 }}>
            <NoSsr>{code}</NoSsr>
          </Frame.Info>
        ) : null}
      </Box>
    </Fade>
  );
}
