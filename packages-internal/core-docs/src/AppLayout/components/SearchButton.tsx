import * as React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import { useTranslate } from '../../i18n';

const SearchButtonStyled = styled('button')(({ theme }) => [
  {
    minHeight: 32,
    minWidth: 32,
    margin: 0,
    paddingLeft: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    [theme.breakpoints.only('xs')]: {
      backgroundColor: 'transparent',
      padding: 0,
      justifyContent: 'center',
      '& > *:not(.MuiSvgIcon-root)': {
        display: 'none',
      },
    },
    position: 'relative',
    backgroundColor: alpha(theme.palette.grey[50], 0.6),
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(14),
    color: (theme.vars || theme).palette.text.secondary,
    border: `1px solid ${(theme.vars || theme).palette.grey[200]}`,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    boxShadow: `hsl(200, 0%, 100%) 0 1px 0 inset, ${alpha(theme.palette.grey[100], 0.4)} 0 -1px 0 inset, ${alpha(theme.palette.grey[200], 0.5)} 0 1px 2px 0`,
    '&:hover': {
      background: alpha(theme.palette.grey[100], 0.5),
      borderColor: (theme.vars || theme).palette.grey[300],
      boxShadow: 'none',
    },
    '&:focus-visible': {
      outline: `3px solid ${alpha(theme.palette.primary[500], 0.5)}`,
      outlineOffset: '2px',
    },
  },
  theme.applyDarkStyles({
    backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
    borderColor: alpha(theme.palette.primaryDark[600], 0.4),
    boxShadow: `${alpha(theme.palette.primaryDark[600], 0.1)} 0 1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 -1px 0 inset, ${(theme.vars || theme).palette.common.black} 0 1px 2px 0`,
    '&:hover': {
      background: (theme.vars || theme).palette.primaryDark[700],
      borderColor: (theme.vars || theme).palette.primaryDark[600],
      boxShadow: 'none',
    },
  }),
]);

const SearchLabel = styled('span')(({ theme }) => ({
  marginRight: 'auto',
  marginBottom: '1px', // optical alignment
  color: (theme.vars || theme).palette.text.tertiary,
  lineHeight: 1,
}));

const Shortcut = styled('kbd')(({ theme }) => {
  return {
    all: 'unset',
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    lineHeight: '19px',
    marginLeft: theme.spacing(0.5),
    border: `1px solid ${(theme.vars || theme).palette.grey[200]}`,
    backgroundColor: '#FFF',
    padding: theme.spacing(0, 0.5),
    borderRadius: 7,
    ...theme.applyDarkStyles({
      borderColor: (theme.vars || theme).palette.primaryDark[600],
      backgroundColor: (theme.vars || theme).palette.primaryDark[800],
    }),
  };
});

interface SearchButtonProps {
  onClick?: () => void;
  onRef?: React.Ref<HTMLButtonElement>;
  [key: string]: any;
}

const subscribe = () => () => {};
const getSnapshot = () =>
  window.navigator.platform.toUpperCase().includes('MAC') ? '⌘K' : 'Ctrl+K';
const getServerSnapshot = () => null;

function useShortcut() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function SearchButton({ onClick, onRef, ...props }: SearchButtonProps) {
  const t = useTranslate();
  const shortcut = useShortcut();
  const labelId = React.useId();

  return (
    <SearchButtonStyled
      ref={onRef}
      onClick={onClick}
      disabled={!onClick}
      aria-labelledby={labelId}
      {...props}
    >
      <SearchIcon color="primary" sx={{ fontSize: '1.125rem' }} />
      <SearchLabel id={labelId}>{t('searchButton')}</SearchLabel>
      {shortcut && <Shortcut aria-hidden="true">{shortcut}</Shortcut>}
    </SearchButtonStyled>
  );
}
