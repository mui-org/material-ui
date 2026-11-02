import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { ListItemAvatarClasses } from './listItemAvatarClasses';

export interface ListItemAvatarProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component, normally an `Avatar`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemAvatarClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 *
 * Demos:
 *
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 *
 * API:
 *
 * - [ListItemAvatar API](https://next.mui.com/material-ui/api/list-item-avatar/)
 */
export default function ListItemAvatar(props: ListItemAvatarProps): React.JSX.Element;
