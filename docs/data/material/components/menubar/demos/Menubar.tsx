import * as React from 'react';
import { Menu } from '@base-ui/react/menu';
import { Menubar as BaseMenubar } from '@base-ui/react/menubar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import type { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import type { ListSubheaderProps } from '@mui/material/ListSubheader';
import ListSubheader from '@mui/material/ListSubheader';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import type { DividerProps } from '@mui/material/Divider';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const StyledMenubar = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '1px',
  p: 0.25,
  background: (theme.vars || theme).palette.grey[100],
  ...theme.applyStyles('dark', {
    background: (theme.vars || theme).palette.grey[800],
  }),
  '&[aria-orientation="vertical"]': {
    flexDirection: 'column',
  },
}));
export function Menubar(props: React.ComponentProps<typeof BaseMenubar>) {
  return (
    // @focus @padding 2
    <BaseMenubar render={<StyledMenubar />} {...props} />
  );
}

export function MenuRoot(props: React.ComponentProps<typeof Menu.Root>) {
  return <Menu.Root {...props} />;
}

const StyledTrigger = styled(Button)(({ theme }) => ({
  paddingInline: theme.spacing(2),
  color: (theme.vars || theme).palette.text.secondary,
  fontWeight: 500,
  transition: 'none',
  textTransform: 'capitalize',
  letterSpacing: 0,
  fontSize: '0.875rem',
  '&[data-popup-open]': {
    backgroundColor: (theme.vars || theme).palette.action.focus,
  },
  '&.Mui-focusVisible': {
    backgroundColor: (theme.vars || theme).palette.action.focus,
  },
  '[aria-orientation="vertical"] &': {
    justifyContent: 'initial',
  },
}));
export function MenuTrigger(props: React.ComponentProps<typeof Menu.Trigger>) {
  return (
    <Menu.Trigger
      render={<StyledTrigger size="small" color="inherit" disableRipple />}
      {...props}
    />
  );
}

export function MenuPortal(props: React.ComponentProps<typeof Menu.Portal>) {
  return <Menu.Portal {...props} />;
}

export function MenuPositioner(props: React.ComponentProps<typeof Menu.Positioner>) {
  return <Menu.Positioner {...props} />;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  minWidth: 160,
  paddingBlock: theme.spacing(0.5),
  transformOrigin: 'var(--transform-origin)',
  '&[data-starting-style], &[data-ending-style]': {
    opacity: 0,
    transform: 'scale(0.95)',
  },
}));
export function MenuPopup(props: React.ComponentProps<typeof Menu.Popup>) {
  return (
    <Menu.Popup
      render={(renderProps) => (
        <StyledPaper elevation={8}>
          <List
            component="div"
            disablePadding
            sx={{ outline: 'none' }}
            {...renderProps}
          >
            {props.children}
          </List>
        </StyledPaper>
      )}
      {...props}
    />
  );
}

interface MenuItemExtendedProps {
  icon?: React.ReactNode;
  secondary?: React.ReactNode;
  hint?: React.ReactNode;
}

export function MenuItem(
  props: React.ComponentProps<typeof Menu.Item> &
    Pick<ListItemButtonProps, 'sx'> &
    MenuItemExtendedProps,
) {
  const { sx = [], icon, hint, children, secondary, ...other } = props;
  return (
    <Menu.Item
      render={<ListItemButton dense sx={[{ gap: 1.5 }, ...[sx].flat()]} />}
      {...other}
    >
      {icon && <ListItemIcon sx={{ minWidth: 'unset' }}>{icon}</ListItemIcon>}
      <ListItemText secondary={secondary}>{children}</ListItemText>
      {hint && (
        <Typography
          sx={{ flexShrink: 0, color: 'text.secondary', typography: 'body2' }}
        >
          {hint}
        </Typography>
      )}
    </Menu.Item>
  );
}

export function MenuSubmenuRoot(
  props: React.ComponentProps<typeof Menu.SubmenuRoot>,
) {
  return <Menu.SubmenuRoot {...props} />;
}

const StyledHint = styled(Typography)(({ theme }) => ({
  flexShrink: 0,
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.typography.body2,
}));
export function MenuSubmenuTrigger(
  props: React.ComponentProps<typeof Menu.SubmenuTrigger> &
    Pick<ListItemButtonProps, 'sx'> &
    Pick<MenuItemExtendedProps, 'icon' | 'hint'>,
) {
  const { sx, icon, hint, children, ...other } = props;
  return (
    <Menu.SubmenuTrigger render={<ListItemButton dense sx={sx} />} {...other}>
      {icon && <ListItemIcon sx={{ minWidth: 32 }}>{icon}</ListItemIcon>}
      <ListItemText>{children}</ListItemText>
      {hint && <StyledHint>{hint}</StyledHint>}
      <ChevronRightIcon fontSize="small" sx={{ mr: -1 }} />
    </Menu.SubmenuTrigger>
  );
}

export function MenuSeparator(
  props: React.ComponentProps<typeof Menu.Separator> & Pick<DividerProps, 'sx'>,
) {
  const { sx = [], ...other } = props;
  return (
    <Menu.Separator
      render={<Divider sx={[{ my: 0.5 }, ...[sx].flat()]} />}
      {...other}
    />
  );
}

export function MenuCheckboxItem(
  props: React.ComponentProps<typeof Menu.CheckboxItem> &
    Pick<MenuItemExtendedProps, 'hint'>,
) {
  const { hint, children, ...other } = props;
  return (
    <Menu.CheckboxItem render={<ListItemButton dense />} {...other}>
      <ListItemIcon sx={{ minWidth: 32 }}>
        <Menu.CheckboxItemIndicator render={<CheckIcon fontSize="small" />} />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
      {hint && <StyledHint>{hint}</StyledHint>}
    </Menu.CheckboxItem>
  );
}

export function MenuRadioGroup(props: React.ComponentProps<typeof Menu.RadioGroup>) {
  return <Menu.RadioGroup {...props} />;
}

export function MenuRadioItem(
  props: React.ComponentProps<typeof Menu.RadioItem> &
    Pick<MenuItemExtendedProps, 'hint'>,
) {
  const { hint, children, ...other } = props;
  return (
    <Menu.RadioItem render={<ListItemButton dense />} {...other}>
      <ListItemIcon sx={{ minWidth: 32, position: 'relative' }}>
        <RadioButtonUncheckedIcon fontSize="small" />
        <Menu.RadioItemIndicator
          render={
            <RadioButtonCheckedIcon
              fontSize="small"
              sx={{ position: 'absolute', left: 0 }}
            />
          }
        />
      </ListItemIcon>
      <ListItemText>{children}</ListItemText>
      {hint && <StyledHint>{hint}</StyledHint>}
    </Menu.RadioItem>
  );
}

export function MenuGroup(props: React.ComponentProps<typeof Menu.Group>) {
  return <Menu.Group render={<Box sx={{ position: 'relative' }} />} {...props} />;
}

const StyledSubheader = styled(ListSubheader)(({ theme }) => ({
  position: 'initial',
  paddingBlock: theme.spacing(1),
  backgroundColor: 'transparent',
  ...theme.typography.overline,
  lineHeight: '1.5',
}));

export function MenuGroupLabel(
  props: React.ComponentProps<typeof Menu.GroupLabel> &
    Pick<ListSubheaderProps, 'sx'>,
) {
  const { sx, ...other } = props;
  const subheaderProps: ListSubheaderProps = { sx, component: 'div' };
  return (
    <Menu.GroupLabel render={<StyledSubheader {...subheaderProps} />} {...other} />
  );
}
