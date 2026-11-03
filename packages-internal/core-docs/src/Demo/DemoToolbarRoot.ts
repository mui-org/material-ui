import { styled, alpha } from '@mui/material/styles';

export interface DemoToolbarRootProps {
  demoOptions: any;
  openDemoSource: any;
}

export const DemoToolbarRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'demoOptions' && prop !== 'openDemoSource',
})<DemoToolbarRootProps>(({ theme }) => [
  {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      top: 0,
      maxHeight: 50,
      display: 'block',
      marginTop: -1,
      padding: theme.spacing('2px', 1),
      border: `1px solid ${(theme.vars || theme).palette.divider}`,
      borderTopWidth: 0,
      backgroundColor: alpha(theme.palette.grey[50], 0.2),
      borderRadius: '0 0 12px 12px',
      transition: theme.transitions.create('border-radius'),
      ...(theme.direction === 'rtl' && {
        left: theme.spacing(1),
      }),
      ...(theme.direction !== 'rtl' && {
        right: theme.spacing(1),
      }),
    },
    variants: [
      {
        props: ({ demoOptions }) => demoOptions.bg === 'inline',
        style: {
          [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(1),
            borderTopWidth: 1,
          },
        },
      },
      {
        props: ({ openDemoSource }) => openDemoSource,
        style: {
          [theme.breakpoints.up('sm')]: {
            borderRadius: 0,
          },
        },
      },
    ],
  },
  theme.applyDarkStyles({
    [theme.breakpoints.up('sm')]: {
      backgroundColor: alpha(theme.palette.primaryDark[800], 0.2),
    },
  }),
]);
