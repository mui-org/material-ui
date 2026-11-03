import { alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export type AdBodyStyles = Record<string, Record<string, unknown>>;

export const adBodyImageStyles = (theme: Theme): AdBodyStyles => ({
  root: {
    display: 'block',
    overflow: 'hidden',
    border: '1px dashed',
    borderColor: (theme.vars || theme).palette.divider,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    padding: 8,
    paddingLeft: 8 + 130,
    [theme.breakpoints.up('sm')]: {
      padding: 12,
      paddingLeft: 12 + 130,
    },
  },
  imgWrapper: {
    float: 'left',
    marginLeft: -130,
    width: 130,
    height: 100,
  },
  img: {
    verticalAlign: 'middle',
  },
  a: {
    color: (theme.vars || theme).palette.text.primary,
    textDecoration: 'none',
  },
  description: {
    ...theme.typography.body2,
    [theme.breakpoints.up('sm')]: {
      ...theme.typography.body1,
    },
    display: 'block',
    marginLeft: theme.spacing(1.5),
  },
  poweredby: {
    ...theme.typography.caption,
    marginLeft: theme.spacing(1.5),
    color: (theme.vars || theme).palette.text.secondary,
    display: 'block',
    marginTop: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

export const adBodyInlineStyles = (theme: Theme): AdBodyStyles => {
  const baseline: AdBodyStyles = adBodyImageStyles(theme);

  return {
    ...baseline,
    root: {
      display: 'block',
      paddingTop: 8,
    },
    imgWrapper: {
      display: 'none',
    },
    description: {
      ...baseline.description,
      marginLeft: 0,
      '&::before': {
        border: '1px solid #3e8e41',
        color: '#3e8e41',
        marginRight: 6,
        padding: '1px 5px',
        borderRadius: 3,
        content: '"Ad"',
        fontSize: theme.typography.pxToRem(14),
      },
      '&::after': {
        // Link
        marginLeft: 4,
        content: '"Get started"',
        // Style taken from the Link component & MarkdownElement.
        color: (theme.vars || theme).palette.primary[600],
        textDecoration: 'underline',
        textDecorationColor: alpha(theme.palette.primary.main, 0.4),
        ...theme.applyStyles('dark', {
          color: (theme.vars || theme).palette.primary[300],
        }),
      },
    },
    poweredby: {
      ...baseline.poweredby,
      marginTop: 2,
      marginLeft: 0,
    },
    link: {
      display: 'none',
    },
  };
};
