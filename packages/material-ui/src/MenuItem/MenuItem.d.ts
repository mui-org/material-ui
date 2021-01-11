import { SxProps } from '@material-ui/system';
import { Theme } from '@material-ui/core/styles';
import { DistributiveOmit } from '@material-ui/types';
import { ListItemTypeMap, ListItemProps } from '../ListItem';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ExtendButtonBase } from '../ButtonBase';

export type MenuItemClassKey = keyof NonNullable<MenuItemTypeMap['props']['classes']>;

export interface MenuItemTypeMap<P = {}, D extends React.ElementType = 'li'> {
  props: P &
    DistributiveOmit<ListItemTypeMap<P, D>['props'], 'children'> & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: {
        /** Styles applied to the root element. */
        root?: string;
        /** Styles applied to the root element unless `disableGutters={true}`. */
        gutters?: string;
        /** Styles applied to the root element if `selected={true}`. */
        selected?: string;
        /** Styles applied to the root element if dense. */
        dense?: string;
        /** Styles applied to a Menu Item's children when a subMenu is present */
        subMenuItemWrapper?: string;
        /** Styles applied to the subMenuIcon when it is present */
        subMenuIcon?: string;
        /** Styles applied to subMenuIcon when dirction is 'rtl' */
        rtlSubMenuIcon?: string;
      };
      /**
       * `classes` prop applied to the [`ListItem`](/api/list-item/) element.
       */
      ListItemClasses?: ListItemProps['classes'];
      onArrowRightKeydown?: React.KeyboardEventHandler<any>;
      onKeyDown?: React.KeyboardEventHandler<any>;
      onMouseEnter?: React.MouseEventHandler<any>;
      onParentClose?: React.ReactEventHandler<{}>;
      /**
       * When `true`, opens the subMenu, if provided.
       * @default false
       */
      openSubMenu?: boolean;
      setParentOpenSubMenuIndex?: (index: number) => void;
      /**
       * Menu to display as a sub-menu.
       */
      subMenu?: React.ReactNode;
      /**
       * Normally `Icon`, `SvgIcon`, or a `@material-ui/icons`
       * SVG icon element rendered on a MenuItem that
       * contains a subMenu
       * @default KeyboardArrowRight
       */
      subMenuIcon?: React.ReactNode;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Menus](https://material-ui.com/components/menus/)
 *
 * API:
 *
 * - [MenuItem API](https://material-ui.com/api/menu-item/)
 * - inherits [ListItem API](https://material-ui.com/api/list-item/)
 */
declare const MenuItem: OverridableComponent<
  MenuItemTypeMap<{ button: false }, MenuItemTypeMap['defaultComponent']>
> &
  ExtendButtonBase<MenuItemTypeMap<{ button?: true }, MenuItemTypeMap['defaultComponent']>>;

export type MenuItemProps<
  D extends React.ElementType = MenuItemTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<MenuItemTypeMap<P, D>, D>;

export default MenuItem;
