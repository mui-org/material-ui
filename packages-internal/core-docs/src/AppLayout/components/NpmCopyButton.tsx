/* eslint-disable react/prop-types */
import * as React from 'react';
import copy from 'clipboard-copy';
import { visuallyHidden } from '@mui/utils';
import type { SxProps } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';

const Root = styled('span')(({ theme }) => ({
  boxSizing: 'border-box',
  minWidth: 64,
  margin: 0,
  marginTop: 16,
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  verticalAlign: 'middle',
  gap: 8,
  fontFamily: theme.typography.fontFamilyCode,
  fontSize: theme.typography.pxToRem(12),
  lineHeight: 1.5,
  letterSpacing: 0,
  transition: theme.transitions.create('color', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.shortest,
  }),
  WebkitFontSmoothing: 'subpixel-antialiased',
  color: (theme.vars || theme).palette.text.tertiary,
  '& code': {
    fontFamily: 'inherit',
  },
  '&:hover': {
    color: (theme.vars || theme).palette.primary.main,
    '@media (hover: none)': {
      color: (theme.vars || theme).palette.text.tertiary,
    },
  },
  '&:focus-within': {
    color: (theme.vars || theme).palette.primary.main,
  },
  '& svg': {
    display: 'inline-block',
    position: 'absolute',
    right: -24,
    top: 1,
    opacity: 0,
    transition: theme.transitions.create('opacity', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
  },
  '&:hover svg, &:focus-within svg': {
    opacity: 1,
  },
}));

const CopyButton = styled('button')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  margin: 0,
  padding: 0,
  border: 0,
  outline: 0,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  cursor: 'copy',
  WebkitTapHighlightColor: 'transparent',
  '&:focus-visible': {
    outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
    outlineOffset: '2px',
  },
}));

export function NpmCopyButton(
  props: React.HTMLAttributes<HTMLButtonElement> & { installation: string; sx?: SxProps<Theme> },
) {
  const { installation, onClick, sx, ...other } = props;
  const [copied, setCopied] = React.useState(false);
  const handleCopy = () => {
    setCopied(true);
    copy(installation).then(() => {
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <Root sx={sx}>
      <code>$ {installation}</code>
      <CopyButton
        type="button"
        onClick={(event: any) => {
          handleCopy();
          onClick?.(event);
        }}
        {...other}
      >
        <span style={visuallyHidden}>Copy Material UI installation command</span>
        {copied ? (
          <CheckRounded color="inherit" sx={{ fontSize: 15 }} />
        ) : (
          <ContentCopyRounded color="inherit" sx={{ fontSize: 15 }} />
        )}
      </CopyButton>
      <span style={visuallyHidden} role="status" aria-live="polite">
        {copied ? 'Copied command to clipboard' : ''}
      </span>
    </Root>
  );
}
