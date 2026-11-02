import * as React from 'react';
import NextLink from 'next/link';
import { styled, alpha } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import type { MenuListProps } from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import type { MenuItemProps } from '@mui/material/MenuItem';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import { ROUTES } from '../../constants';
import { MuiLogomarkIcon, BaseUiLogoIcon } from '../../svgIcons';
import PageContext from '../../PageContext';

const iconStyles = {
  fontSize: '.875rem',
  color: 'primary.main',
} as const;

const logoColor = (theme: Theme) => ({
  '& path': {
    ...theme.applyDarkStyles({
      fill: (theme.vars || theme).palette.primary[400],
    }),
  },
});

const NavLabel = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5, 1, 0.5, 1),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightSemiBold,
  textTransform: 'uppercase',
  letterSpacing: '.1rem',
  color: (theme.vars || theme).palette.text.tertiary,
}));

interface ProductItemProps extends MenuItemProps {
  active?: boolean;
  chip?: React.ReactNode;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  name: string;
}

function ProductItem({
  active,
  chip,
  description,
  href,
  icon,
  name,
  sx = [],
  ...other
}: ProductItemProps) {
  return (
    <MenuItem
      component={NextLink} // using the Next link directly here as it accepts, as opposed to the docs Link, passing role="menuitem"
      role="menuitem"
      href={href}
      sx={[
        (theme) => ({
          p: 1,
          pl: '6px',
          display: 'flex',
          alignItems: 'start',
          gap: '8px',
          flexGrow: 1,
          backgroundColor: active ? alpha(theme.palette.primary[50], 0.8) : undefined,
          border: '1px solid',
          borderColor: active ? 'primary.100' : 'transparent',
          borderRadius: '8px',
          transition: '100ms ease-in background-color, border',
          textDecorationLine: 'none',
          '&:hover': {
            backgroundColor: active ? alpha(theme.palette.primary[50], 0.8) : 'grey.50',
            borderColor: 'divider',
          },
          '&.Mui-focusVisible': {
            backgroundColor: active ? (theme.vars || theme).palette.primary[50] : 'transparent',
          },
          ...theme.applyDarkStyles({
            backgroundColor: active ? alpha(theme.palette.primary[900], 0.2) : undefined,
            borderColor: active ? alpha(theme.palette.primary[300], 0.2) : 'transparent',
            '&:hover': {
              backgroundColor: active
                ? alpha(theme.palette.primary[900], 0.3)
                : alpha(theme.palette.primaryDark[700], 0.5),
            },
            '&.Mui-focusVisible': {
              backgroundColor: active ? alpha(theme.palette.primary[900], 0.5) : 'transparent',
            },
          }),
        }),
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          height: 21, // match the Typography line-height
          width: 21,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
            {name}
          </Typography>
          {chip}
        </Box>
        <Typography sx={{ color: 'text.secondary', fontSize: '.813rem' }}>{description}</Typography>
      </div>
    </MenuItem>
  );
}

const coreProducts = [
  {
    id: 'material-ui',
    name: 'Material UI',
    description: 'Comprehensive foundational components.',
    icon: <MuiLogomarkIcon width={14} height={14} sx={logoColor} />,
    href: ROUTES.materialDocs,
  },
  {
    id: 'base-ui',
    name: 'Base UI',
    description: 'Unstyled components for accessible UIs.',
    icon: <BaseUiLogoIcon width={14} height={16} sx={logoColor} />,
    href: ROUTES.baseDocs,
  },
  {
    id: 'system',
    name: 'MUI System',
    description: 'Ergonomic CSS utilities.',
    icon: <StyleRoundedIcon sx={iconStyles} />,
    href: ROUTES.systemDocs,
  },
];

const advancedProducts = [
  {
    id: 'x-data-grid',
    name: 'Data Grid',
    description: 'Fast and extensible data table.',
    icon: <BackupTableRoundedIcon sx={iconStyles} />,
    href: ROUTES.dataGridOverview,
  },
  {
    id: 'x-date-pickers',
    name: 'Date and Time Pickers',
    description: 'Date, time, and range components.',
    icon: <CalendarMonthRoundedIcon sx={iconStyles} />,
    href: ROUTES.datePickersOverview,
  },
  {
    id: 'x-charts',
    name: 'Charts',
    description: 'Data visualization components.',
    icon: <BarChartRoundedIcon sx={iconStyles} />,
    href: ROUTES.chartsOverview,
  },
  {
    id: 'x-tree-view',
    name: 'Tree View',
    description: 'Hierarchical list components.',
    icon: <AccountTreeRoundedIcon sx={iconStyles} />,
    href: ROUTES.treeViewOverview,
  },
  {
    id: 'x-scheduler',
    name: 'Scheduler',
    description: 'Event calendar and timeline.',
    icon: <EventNoteRoundedIcon sx={iconStyles} />,
    href: ROUTES.schedulerOverview,
  },
  {
    id: 'x-chat',
    name: 'Chat',
    description: 'AI-powered chat components.',
    icon: <ForumRoundedIcon sx={iconStyles} />,
    href: ROUTES.chatOverview,
  },
];

export const MuiProductSelector = React.forwardRef(function MuiProductSelector(
  props: MenuListProps<'div'>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const pageContext = React.useContext(PageContext);

  return (
    <MenuList
      {...props}
      component="div"
      ref={forwardedRef}
      sx={{
        p: 1,
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, minmax(0, 1fr))',
          sm: 'repeat(2, minmax(0, 1fr))',
        },
        gap: '4px',
      }}
    >
      {coreProducts.map((product) => (
        <ProductItem
          key={product.name}
          name={product.name}
          description={product.description}
          href={product.href}
          icon={product.icon}
          active={pageContext.productId === product.id}
        />
      ))}
      <Divider
        sx={{
          mx: -1,
          gridColumn: {
            xs: '1 / span 1',
            sm: '1 / span 2',
          },
        }}
      />
      <Box
        key="X components"
        role="none"
        sx={{
          gridColumn: {
            xs: '1 / span 1',
            sm: '1 / span 2',
          },
        }}
      >
        <NavLabel>MUI X Components</NavLabel>
      </Box>
      {advancedProducts.map((product) => (
        <ProductItem
          key={product.name}
          name={product.name}
          description={product.description}
          icon={product.icon}
          href={product.href}
          active={pageContext.productId === product.id}
        />
      ))}
    </MenuList>
  );
});
