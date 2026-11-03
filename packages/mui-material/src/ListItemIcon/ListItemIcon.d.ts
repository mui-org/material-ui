import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { ListItemIconClasses } from './listItemIconClasses';

export interface ListItemIconProps extends StandardProps<React.HTMLAttributes<HTMLDivElement>> {
  /**
   * The content of the component, normally `Icon`, `SvgIcon`,
   * or a `@mui/icons-material` SVG icon element.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemIconClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 * A simple wrapper to apply `List` styles to an `Icon` or `SvgIcon`.
 *
 * Demos:
 *
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 * - [Menubar](https://next.mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [ListItemIcon API](https://next.mui.com/material-ui/api/list-item-icon/)
 */
export default function ListItemIcon(props: ListItemIconProps): React.JSX.Element;
