import * as React from 'react';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha, styled } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { samePageLinkNavigation, Link } from '../../Link';
import type { LinkProps } from '../../Link';
import type { MuiPageIcon } from '../../MuiPage';
import { standardNavIcons } from '../icons/navIcons';

interface ItemBaseProps {
  component?: React.ElementType;
  depth: number;
  subheader?: boolean;
  hasIcon?: boolean;
}

function ItemBase({ component: Component = 'div', ...props }: ItemBaseProps) {
  return <Component {...props} />;
}

const Item = styled(ItemBase, {
  shouldForwardProp: (prop) =>
    prop !== 'depth' && prop !== 'hasIcon' && prop !== 'subheader' && prop !== 'expandable',
})(({ theme }) => {
  return [
    {
      ...theme.typography.body2,
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      borderRadius: 6,
      color: `var(--_color, ${(theme.vars || theme).palette.text.secondary})`,
      outline: 0,
      width: '100%',
      padding: 6,
      justifyContent: 'flex-start',
      fontWeight: theme.typography.fontWeightSemiBold,
      transition: theme.transitions.create(['color', 'background-color'], {
        duration: theme.transitions.duration.shortest,
      }),
      fontSize: theme.typography.pxToRem(14),
      textDecoration: 'none',
      paddingLeft: `calc(10px + (var(--_depth) + 1) * 13px - (var(--_expandable) * 21px))`,
      '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: 1,
        left: 9.5,
        height: '100%',
        width: 1,
        opacity: 0,
        background: (theme.vars || theme).palette.grey[100],
      },
      variants: [
        {
          props: ({ depth }) => depth === 0,
          style: { '--_color': (theme.vars || theme).palette.text.primary },
        },
        {
          props: ({ depth }) => depth !== 0,
          style: {
            fontWeight: theme.typography.fontWeightMedium,
            '&::before': {
              opacity: 1,
            },
          },
        },
        {
          props: ({ subheader }) => !subheader,
          style: [
            {
              '&:hover': {
                color: (theme.vars || theme).palette.common.black,
                backgroundColor: (theme.vars || theme).palette.grey[50],
                '@media (hover: none)': {
                  color: 'var(--_color)',
                  backgroundColor: 'transparent',
                },
              },
            },
            theme.applyDarkStyles({
              '&:hover': {
                color: '#fff',
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
                '@media (hover: none)': {
                  color: 'var(--_color)',
                  backgroundColor: 'transparent',
                },
              },
            }),
          ],
        },
        {
          props: ({ subheader }) => !!subheader,
          style: [
            {
              '--_color': (theme.vars || theme).palette.text.tertiary,
              marginTop: theme.spacing(1),
              textTransform: 'uppercase',
              letterSpacing: '.1rem',
              fontWeight: theme.typography.fontWeightSemiBold,
              fontSize: theme.typography.pxToRem(11),
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                zIndex: 1,
                left: 9.5,
                height: '55%',
                top: 16,
                width: 1,
                opacity: 0,
                background: (theme.vars || theme).palette.grey[100],
              },
              '&::after': {
                content: '""',
                display: 'block',
                position: 'absolute',
                zIndex: 5,
                left: 6,
                height: 8,
                width: 8,
                borderRadius: 2,
                opacity: 0,
                background: alpha(theme.palette.grey[50], 0.5),
                border: '1px solid',
                borderColor: (theme.vars || theme).palette.grey[200],
              },
            },
            theme.applyDarkStyles({
              '&::before': {
                background: (theme.vars || theme).palette.primaryDark[700],
              },
              '&::after': {
                background: alpha(theme.palette.primaryDark[700], 0.8),
                borderColor: alpha(theme.palette.primaryDark[600], 0.6),
              },
            }),
          ],
        },
        {
          props: ({ depth, subheader }) => depth !== 0 && subheader,
          style: {
            '&::after': {
              opacity: 1,
            },
            '&::before': {
              opacity: 1,
            },
          },
        },
        {
          props: ({ hasIcon }) => !!hasIcon,
          style: {
            paddingLeft: 0,
          },
        },
      ],
      '&.app-drawer-active': {
        // To match browserUrlPreviewMarge
        scrollMarginBottom: 120,
        color: (theme.vars || theme).palette.primary[600],
        backgroundColor: (theme.vars || theme).palette.primary[50],
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary[100], 0.8),
          color: (theme.vars || theme).palette.primary[700],
          '@media (hover: none)': {
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.primary.mainChannel} / ${theme.vars.palette.action.selectedOpacity})`
              : alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
          },
        },
        '&::before': {
          background: (theme.vars || theme).palette.primary[400],
        },
      },
      '& .MuiChip-root': {
        marginTop: '2px',
      },
      [theme.breakpoints.up('md')]: {
        paddingTop: 4,
        paddingBottom: 4,
      },
      '& .ItemButtonIcon': {
        marginRight: '6px',
        color: (theme.vars || theme).palette.primary.main,
      },
      '&:hover .ItemButtonIcon': {
        color: (theme.vars || theme).palette.primary.light,
        '@media (hover: none)': {
          color: (theme.vars || theme).palette.primary.main,
        },
      },
    },
    theme.applyDarkStyles({
      color: `var(--_color, ${(theme.vars || theme).palette.text.secondary})`,
      '&::before': {
        background: (theme.vars || theme).palette.primaryDark[700],
      },
      '&.app-drawer-active': {
        color: (theme.vars || theme).palette.primary[300],
        backgroundColor: (theme.vars || theme).palette.primaryDark[700],
        '&:hover': {
          backgroundColor: (theme.vars || theme).palette.primaryDark[600],
          color: (theme.vars || theme).palette.primary[200],
        },
        '&::before': {
          background: (theme.vars || theme).palette.primary[400],
        },
      },
    }),
  ];
});

const ItemButtonIcon = styled(KeyboardArrowRightRoundedIcon, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>({
  fontSize: '1rem',
  '&&:last-child': {
    // overrides https://github.com/mui/material-ui/blob/ca7c5c63e64b6a7f55255981f1836a565927b56c/docs/src/modules/brandingTheme.ts#L757-L759
    marginLeft: 0,
  },
  variants: [
    {
      props: { open: true },
      style: {
        transform: 'rotate(90deg)',
      },
    },
  ],
});

const StyledLi = styled('li', { shouldForwardProp: (prop) => prop !== 'depth' })<{ depth: number }>(
  ({ theme }) => ({
    display: 'block',
    variants: [
      {
        props: {
          depth: 0,
        },
        style: {
          padding: theme.spacing(1, '10px', 0, '10px'),
        },
      },
      {
        props: ({ depth }) => depth !== 0,
        style: {
          padding: 0,
        },
      },
    ],
  }),
);

const sxChip = (color: 'warning' | 'success' | 'grey' | 'primary'): SxProps<Theme> => [
  (theme) => ({
    ml: 1,
    fontSize: theme.typography.pxToRem(10),
    fontWeight: 'semiBold',
    textTransform: 'uppercase',
    letterSpacing: '.04rem',
    height: '16px',
    border: 1,
    borderColor: (theme.vars || theme).palette[color][300],
    bgcolor: alpha(theme.palette[color][100], 0.5),
    color: (theme.vars || theme).palette[color][900],
    '&:hover': {
      bgcolor: alpha(theme.palette[color][100], 0.5),
    },
    '& .MuiChip-label': {
      px: '4px',
    },
  }),
  (theme) =>
    theme.applyDarkStyles({
      borderColor: alpha(theme.palette[color][800], 0.5),
      bgcolor: alpha(theme.palette[color][900], 0.5),
      color: (theme.vars || theme).palette[color][300],
      '&:hover': {
        bgcolor: alpha(theme.palette[color][900], 0.5),
      },
    }),
];

function DeadLink(props: LinkProps & React.HTMLProps<HTMLDivElement>) {
  const { activeClassName, href, noLinkStyle, prefetch, ...other } = props;
  return <div {...other} />;
}

export interface AppNavDrawerItemProps {
  beta?: boolean;
  children?: React.ReactNode;
  deprecated?: boolean;
  depth: number;
  expandable?: boolean;
  href?: string | object;
  icon?: MuiPageIcon;
  initiallyExpanded?: boolean;
  legacy?: boolean;
  linkProps?: Record<string, unknown> | undefined;
  newFeature?: boolean;
  onClick?: (event: MouseEvent) => void;
  planned?: boolean;
  subheader: boolean;
  title?: string | null;
  topLevel?: boolean;
  unstable?: boolean;
  plan?: 'community' | 'pro' | 'premium';
}

export function AppNavDrawerItem(props: AppNavDrawerItemProps) {
  const {
    beta,
    children,
    deprecated,
    depth,
    href,
    icon,
    legacy,
    newFeature,
    planned,
    unstable,
    linkProps,
    onClick,
    initiallyExpanded = false,
    expandable = false,
    plan = 'community',
    subheader,
    title,
    topLevel = false,
    ...other
  } = props;
  const [open, setOpen] = React.useState(initiallyExpanded);
  const handleClick = (event: MouseEvent) => {
    // Ignore click events meant for native link handling, for example open in new tab
    if (samePageLinkNavigation(event)) {
      return;
    }

    if (onClick) {
      onClick(event);
    }

    if (expandable) {
      event.preventDefault();
      setOpen((oldOpen) => !oldOpen);
    }
  };

  const IconComponent = typeof icon === 'string' ? standardNavIcons[icon] : icon;
  const hasIcon = !!IconComponent;
  const iconElement = hasIcon ? (
    <Box
      component="span"
      sx={{
        '& svg': { fontSize: (theme) => theme.typography.pxToRem(16.5) },
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginRight: '6px',
      }}
    >
      <IconComponent fontSize="small" color="primary" />
    </Box>
  ) : null;

  return (
    <StyledLi {...other} depth={depth}>
      {/* Fix overloading with prefetch={false}, only prefetch on hover */}
      <Item
        component={subheader ? DeadLink : Link}
        depth={depth}
        hasIcon={hasIcon}
        // @ts-expect-error: The actual DeadLink or Link component accepts href, unlike the inferred root element.
        href={href}
        prefetch={false}
        subheader={subheader}
        expandable={expandable}
        activeClassName={initiallyExpanded ? null : 'app-drawer-active'}
        className={topLevel ? 'algolia-lvl0' : null}
        onClick={handleClick}
        {...linkProps}
        style={{
          ...(linkProps?.style ?? {}),
          '--_depth': depth,
          '--_expandable': expandable ? 1 : 0,
        }}
      >
        {iconElement}
        {expandable && <ItemButtonIcon className="ItemButtonIcon" open={open} />}
        {title}
        {plan === 'pro' && <span className="plan-pro" title="Pro plan" />}
        {plan === 'premium' && <span className="plan-premium" title="Premium plan" />}
        {legacy && <Chip label="Legacy" sx={sxChip('warning')} />}
        {newFeature && <Chip label="New" sx={sxChip('success')} />}
        {planned && <Chip label="Planned" sx={sxChip('grey')} />}
        {unstable && <Chip label="Preview" sx={sxChip('primary')} />}
        {beta && <Chip label="Beta" sx={sxChip('primary')} />}
        {deprecated && <Chip label="Deprecated" sx={sxChip('warning')} />}
      </Item>
      {expandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      ) : (
        children
      )}
    </StyledLi>
  );
}
