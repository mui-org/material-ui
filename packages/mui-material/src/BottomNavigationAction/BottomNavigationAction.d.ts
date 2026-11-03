import * as React from 'react';
import { SxProps } from '@mui/system';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { Theme } from '../styles';
import {
  ButtonBaseProps,
  ButtonBaseTypeMap,
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { BottomNavigationActionClasses } from './bottomNavigationActionClasses';

export interface BottomNavigationActionRootSlotPropsOverrides {}
export interface BottomNavigationActionLabelSlotPropsOverrides {}

export interface BottomNavigationActionSlots {
  /**
   * The component that renders the root.
   * @default ButtonBase
   */
  root: React.ElementType;
  /**
   * The component that renders the label.
   * @default span
   */
  label: React.ElementType;
}

export type BottomNavigationActionSlotsAndSlotProps = CreateSlotsAndSlotProps<
  BottomNavigationActionSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the ButtonBase element.
     */
    root: SlotProps<
      React.ElementType<ButtonBaseProps>,
      BottomNavigationActionRootSlotPropsOverrides,
      BottomNavigationActionOwnerState
    >;
    /**
     * Props forwarded to the label slot.
     * By default, the available props are based on the span element.
     */
    label: SlotProps<
      'span',
      BottomNavigationActionLabelSlotPropsOverrides,
      BottomNavigationActionOwnerState
    >;
  }
>;

export interface BottomNavigationActionOwnProps extends BottomNavigationActionSlotsAndSlotProps {
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<BottomNavigationActionClasses> | undefined;
  /**
   * The icon to display.
   */
  icon?: React.ReactNode;
  /**
   * The label element.
   */
  label?: React.ReactNode;
  /**
   * If `true`, the component appears selected.
   *
   * `BottomNavigation` sets this on each child from its own `value`.
   */
  selected?: boolean | undefined;
  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value?: any;
}

export type BottomNavigationActionTypeMap<
  AdditionalProps,
  RootComponent extends React.ElementType,
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & BottomNavigationActionOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Bottom Navigation](https://next.mui.com/material-ui/react-bottom-navigation/)
 *
 * API:
 *
 * - [BottomNavigationAction API](https://next.mui.com/material-ui/api/bottom-navigation-action/)
 * - inherits [ButtonBase API](https://next.mui.com/material-ui/api/button-base/)
 */
declare const BottomNavigationAction: ExtendButtonBase<
  BottomNavigationActionTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type BottomNavigationActionProps<
  RootComponent extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BottomNavigationActionTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export interface BottomNavigationActionOwnerState extends Omit<
  BottomNavigationActionProps,
  'slots' | 'slotProps'
> {}

export default BottomNavigationAction;
