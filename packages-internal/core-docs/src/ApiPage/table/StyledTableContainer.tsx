import { styled, alpha } from '@mui/material/styles';
import { brandingDarkTheme as darkTheme } from '../../branding';

export const StyledTableContainer = styled('div')(
  ({ theme }) => ({
    borderRadius: 12,
    overflowX: 'auto',
    '& table': {
      marginLeft: -1,
      marginRight: -1,
      background: [
        'linear-gradient(to right, rgb(255, 255, 255) 5%, transparent 90%) local',
        'linear-gradient(to right, transparent, rgb(255, 255, 255) 100%) 100% center local',
        `linear-gradient(to right, ${alpha(theme.palette.grey[500], 0.5)}, transparent 5%) scroll`,
        `linear-gradient(to left, ${alpha(theme.palette.grey[500], 0.2)}, transparent 5%) scroll`,
      ].join(', '),
    },
    '&& th': {
      paddingTop: 8,
      paddingBottom: 8,
      textAlign: 'left',
      fontWeight: theme.typography.fontWeightSemiBold,
      fontSize: theme.typography.pxToRem(14),
    },
    '& tr': {
      scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)',
      '&:hover': {
        backgroundColor: alpha(darkTheme.palette.grey[50], 0.5),
      },
      '& .MuiPropTable-description-column': {
        minWidth: 300,
      },
    },
  }),
  ({ theme }) => ({
    [`*:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& table': {
        background: [
          `linear-gradient(to right, ${theme.palette.primaryDark[900]} 5%, transparent 80%) local`,
          `linear-gradient(to right, transparent, ${theme.palette.primaryDark[900]} 100%) 100% center local`,
          `linear-gradient(to right, rgba(0, 0, 0, 0.8), transparent 10%) scroll`,
          'linear-gradient(to left, rgba(0, 0, 0, 0.8), transparent 10%) scroll',
        ].join(', '),
      },
      '& tr': {
        '&:hover': {
          backgroundColor: alpha(darkTheme.palette.primaryDark[800], 0.5),
        },
      },
    },
  }),
);
