import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { ExtendButtonBase } from '../ButtonBase';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ListItemClasses } from './listItemClasses';

interface ListItemBaseProps {
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems?: 'flex-start' | 'center';
  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  autoFocus?: boolean;
  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemClasses>;
  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   * @deprecated
   */
  ContainerComponent?: React.ElementType<React.HTMLAttributes<HTMLDivElement>>;
  /**
   * Props applied to the container component if used.
   * @default {}
   * @deprecated
   */
  ContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense?: boolean;
  /**
   * If `true`, the component is disabled.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  disabled?: boolean;
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean;
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding?: boolean;
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider?: boolean;
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction?: React.ReactNode;
  /**
   * Use to apply selected styling.
   * @default false
   * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
   */
  selected?: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface ListItemTypeMap<P, D extends React.ElementType> {
  props: P &
    ListItemBaseProps & {
      /**
       * The components used for each slot inside the InputBase.
       * Either a string to use a HTML element or a component.
       * @default {}
       */
      components?: {
        Root?: React.ElementType;
      };
      /**
       * The props used for each slot inside the Input.
       * @default {}
       */
      componentsProps?: {
        root?: {
          as: React.ElementType;
          styleProps?: Omit<ListItemBaseProps, 'components' | 'componentsProps'> & {
            dense?: boolean;
          };
        };
      };
    };
  defaultComponent: D;
}

/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 *
 * Demos:
 *
 * - [Lists](https://material-ui.com/components/lists/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [ListItem API](https://material-ui.com/api/list-item/)
 */
declare const ListItem: ExtendButtonBase<
  ListItemTypeMap<
    {
      /**
       * If `true`, the list item is a button (using `ButtonBase`). Props intended
       * for `ButtonBase` can then be applied to `ListItem`.
       * @default false
       * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
       *
       */
      button: true;
    },
    'div'
  >
> &
  OverridableComponent<
    ListItemTypeMap<
      {
        /**
         * If `true`, the list item is a button (using `ButtonBase`). Props intended
         * for `ButtonBase` can then be applied to `ListItem`.
         * @default false
         * @deprecated checkout [ListItemButton](/api/list-item-button/) instead
         */
        button?: false;
      },
      'li'
    >
  >;

export type ListItemProps<D extends React.ElementType = 'li', P = {}> = OverrideProps<
  ListItemTypeMap<P, D>,
  D
>;

export default ListItem;
