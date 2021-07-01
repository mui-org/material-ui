import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiListItem from '@material-ui/core/ListItem';
import MuiListItemIcon from '@material-ui/core/ListItemIcon';
import MuiListItemAvatar from '@material-ui/core/ListItemAvatar';
// import MuiListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MuiListItemText from '@material-ui/core/ListItemText';
import MuiCheckbox from '@material-ui/core/Checkbox';
import MuiSwitch from '@material-ui/core/Switch';
import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { IconButton } from './IconButton';

interface Props {
  alignItems: 'center' | 'flex-start';
  autoFocus: boolean;
  button: boolean;
  dense: boolean;
  disabled: boolean;
  disableGutters: boolean;
  disablePadding: boolean;
  divider: boolean;
  secondaryAction?: 'none' | 'iconButton' | 'checkbox' | 'switch';
  selected: boolean;
  width: number | string;
  height: number;
  inset: boolean;
  label: string;
  secondaryLabel: string;
  primaryAction: 'none' | 'icon' | 'avatar' | 'checkbox';
  primaryIcon: string;
  imageFile: string;
  imageUrl: string;
  secondaryIcon: string;
}

export function ListItem(props: Props): JSX.Element {
  const {
    button,
    height,
    imageFile,
    imageUrl,
    inset,
    label,
    primaryAction,
    primaryIcon,
    secondaryAction,
    secondaryIcon,
    secondaryLabel,
    width,
    ...other
  } = props;

  let primary = null;
  let secondary = null;

  switch (primaryAction) {
    case 'icon':
      primary = (
        <MuiListItemIcon>
          <Icon icon={primaryIcon} />
        </MuiListItemIcon>
      );
      break;
    case 'avatar':
      primary = (
        <MuiListItemAvatar>
          <Avatar icon={primaryIcon} avatarImageFile={imageFile} avatarImageUrl={imageUrl} />
        </MuiListItemAvatar>
      );
      break;
    case 'checkbox':
      primary = (
        <MuiListItemIcon>
          <MuiCheckbox edge="start" />
        </MuiListItemIcon>
      );
      break;
    default:
      primary = null;
      break;
  }

  switch (secondaryAction) {
    case 'iconButton':
      secondary = <IconButton icon={secondaryIcon} edge="end" />;
      break;
    case 'checkbox':
      secondary = <MuiCheckbox edge="end" />;
      break;
    case 'switch':
      secondary = <MuiSwitch edge="end" />;
      break;
    default:
      secondary = null;
      break;
  }

  return (
    <MuiListItem button={button as any} {...other}>
      {primary}
      <MuiListItemText
        inset={inset}
        primary={label}
        secondary={secondaryLabel.length > 0 ? secondaryLabel : undefined}
      />
      {/* MuiListItemSecondaryAction causes the text to have a bullet. No idea why! */}
      {/* <MuiListItemSecondaryAction> */}
      {secondary}
      {/* </MuiListItemSecondaryAction> */}
    </MuiListItem>
  );
}

ListItem.defaultProps = {
  alignItems: 'center' as 'center',
  autoFocus: false,
  button: false,
  dense: false,
  disabled: false,
  disableGutters: false,
  disablePadding: false,
  divider: false,
  selected: false,
  width: 568,
  height: 48,
  inset: false,
  label: 'Primary label',
  secondaryLabel: '',
  primaryAction: 'icon' as 'icon',
  primaryIcon: 'star',
  imageFile: '',
  imageUrl: '',
  secondaryIcon: '',
};

addPropertyControls(ListItem, {
  alignItems: {
    type: ControlType.Enum,
    title: 'Align items',
    options: ['center', 'flex-start'],
  },
  autoFocus: {
    type: ControlType.Boolean,
    title: 'Auto focus',
  },
  button: {
    type: ControlType.Boolean,
    title: 'Button',
  },
  dense: {
    type: ControlType.Boolean,
    title: 'Dense',
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  disableGutters: {
    type: ControlType.Boolean,
    title: 'Disable gutters',
  },
  disablePadding: {
    type: ControlType.Boolean,
    title: 'Disable padding',
  },
  divider: {
    type: ControlType.Boolean,
    title: 'Divider',
  },
  secondaryAction: {
    type: ControlType.Enum,
    title: 'Secondary action',
    options: ['none', 'iconButton', 'checkbox', 'switch'],
  },
  selected: {
    type: ControlType.Boolean,
    title: 'Selected',
  },
  inset: {
    type: ControlType.Boolean,
    title: 'Inset',
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
  secondaryLabel: {
    type: ControlType.String,
    title: 'Secondary label',
  },
  primaryAction: {
    type: ControlType.Enum,
    title: 'Primary action',
    options: ['none', 'icon', 'avatar', 'checkbox'],
  },
  primaryIcon: {
    type: ControlType.String,
    title: 'Primary icon',
    hidden(props) {
      return (
        (props.primaryAction !== 'icon' && props.primaryAction !== 'avatar') ||
        props.imageFile !== '' ||
        props.imageUrl !== ''
      );
    },
  },
  imageFile: {
    type: ControlType.Image,
    title: 'Image File',
    hidden(props) {
      return props.primaryAction !== undefined && props.primaryAction !== 'avatar';
    },
  },
  imageUrl: {
    type: ControlType.String,
    title: 'Image URL',
    hidden(props) {
      return (
        props.imageFile !== '' ||
        (props.primaryAction !== undefined && props.primaryAction !== 'avatar')
      );
    },
  },
  secondaryIcon: {
    type: ControlType.String,
    title: 'Secondary icon',
    hidden(props) {
      return props.secondaryAction !== 'iconButton';
    },
  },
});
