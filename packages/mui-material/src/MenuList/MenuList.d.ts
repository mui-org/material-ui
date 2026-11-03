import * as React from 'react';
import { ExtendList, ExtendListTypeMap } from '../List';
import { OverrideProps } from '../OverridableComponent';

export interface MenuListOwnProps {
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus?: boolean | undefined;
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem?: boolean | undefined;
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children?: React.ReactNode;
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean | undefined;
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap?: boolean | undefined;
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant?: 'menu' | 'selectedMenu' | undefined;
}

export type MenuListTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'ul',
> = ExtendListTypeMap<{
  props: AdditionalProps & MenuListOwnProps;
  defaultComponent: RootComponent;
}>;

export type MenuListClassKey = keyof NonNullable<MenuListTypeMap['props']['classes']>;

/**
 * A permanently displayed menu following https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/.
 * It's exposed to help customization of the [`Menu`](https://next.mui.com/material-ui/api/menu/) component if you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 *
 * Demos:
 *
 * - [Menu](https://next.mui.com/material-ui/react-menu/)
 *
 * API:
 *
 * - [MenuList API](https://next.mui.com/material-ui/api/menu-list/)
 * - inherits [List API](https://next.mui.com/material-ui/api/list/)
 */
declare const MenuList: ExtendList<MenuListTypeMap>;

export type MenuListProps<
  RootComponent extends React.ElementType = MenuListTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<MenuListTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default MenuList;
