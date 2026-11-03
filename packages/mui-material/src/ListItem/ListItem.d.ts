import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ListItemClasses } from './listItemClasses';
import { SlotProps } from '../utils/types';

export interface ListItemRootSlotPropsOverrides {}

export interface ListItemSecondaryActionSlotPropsOverrides {}

/**
 * This type is kept for compatibility. Use `ListItemOwnProps` instead.
 */
export interface ListItemBaseProps {
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems?: 'flex-start' | 'center' | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListItemClasses> | undefined;
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense?: boolean | undefined;
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean | undefined;
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding?: boolean | undefined;
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider?: boolean | undefined;
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ListItemOwnerState extends Omit<ListItemProps, 'slots' | 'slotProps'> {}

export interface ListItemOwnProps extends ListItemBaseProps {
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps?:
    | {
        root?:
          | SlotProps<
              React.ElementType<React.HTMLAttributes<HTMLDivElement>>,
              ListItemRootSlotPropsOverrides,
              ListItemOwnerState
            >
          | undefined;
        secondaryAction?:
          | SlotProps<
              React.ElementType<React.HTMLAttributes<HTMLDivElement>>,
              ListItemSecondaryActionSlotPropsOverrides,
              ListItemOwnerState
            >
          | undefined;
      }
    | undefined;
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots?:
    | {
        root?: React.ElementType | undefined;
        secondaryAction?: React.ElementType | undefined;
      }
    | undefined;
}

export interface ListItemTypeMap<AdditionalProps, RootComponent extends React.ElementType> {
  props: AdditionalProps & ListItemOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 * - [Transfer List](https://next.mui.com/material-ui/react-transfer-list/)
 *
 * API:
 *
 * - [ListItem API](https://next.mui.com/material-ui/api/list-item/)
 */
declare const ListItem: OverridableComponent<ListItemTypeMap<{}, 'li'>>;

export type ListItemProps<
  RootComponent extends React.ElementType = 'li',
  AdditionalProps = {},
> = OverrideProps<ListItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default ListItem;
