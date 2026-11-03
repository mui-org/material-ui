import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { Theme } from '../styles';
import TabScrollButton from '../TabScrollButton';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TabsClasses } from './tabsClasses';
import SvgIcon from '../SvgIcon';

export interface TabsPropsIndicatorColorOverrides {}
export interface TabsPropsVariantOverrides {}

export interface TabsRootSlotPropsOverrides {}
export interface TabsScrollerSlotPropsOverrides {}
export interface TabsListSlotPropsOverrides {}
export interface TabsScrollbarSlotPropsOverrides {}
export interface TabsIndicatorSlotPropsOverrides {}
export interface TabsScrollButtonsSlotPropsOverrides {}
export interface TabsStartScrollButtonIconSlotPropsOverrides {}
export interface TabsEndScrollButtonIconSlotPropsOverrides {}

export interface TabsSlots {
  /**
   * The component used for the popper.
   * @default div
   */
  root: React.ElementType;
  /**
   * The component used for the scroller.
   * @default div
   */
  scroller: React.ElementType;
  /**
   * The component used for the flex container.
   * @default div
   */
  list: React.ElementType;
  /**
   * The component used for the scroller.
   * @default ScrollbarSize
   */
  scrollbar: React.ElementType;
  /**
   * The component used for the tab indicator.
   * @default span
   */
  indicator: React.ElementType;
  /**
   * The component used for the scroll button.
   * @default TabScrollButton
   */
  scrollButtons: React.ElementType;
  /**
   * The component used for the start scroll button icon.
   * @default KeyboardArrowLeft
   */
  startScrollButtonIcon: React.ElementType;
  /**
   * The component used for the end scroll button icon.
   * @default KeyboardArrowRight
   */
  endScrollButtonIcon: React.ElementType;
}

export type TabsSlotsAndSlotProps = CreateSlotsAndSlotProps<
  TabsSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the div element.
     */
    root: SlotProps<'div', TabsRootSlotPropsOverrides, TabsOwnerState>;
    /**
     * Props forwarded to the scroller slot.
     * By default, the available props are based on the div element.
     */
    scroller: SlotProps<'div', TabsScrollerSlotPropsOverrides, TabsOwnerState>;
    /**
     * Props forwarded to the list slot.
     * By default, the available props are based on the div element.
     */
    list: SlotProps<'div', TabsListSlotPropsOverrides, TabsOwnerState>;
    /**
     * Props forwarded to the scrollbar slot.
     * By default, the available props are based on the div element.
     */
    scrollbar: SlotProps<
      'div',
      {
        onChange?: ((scrollbarWidth: undefined | number) => void) | undefined;
      } & TabsScrollbarSlotPropsOverrides,
      TabsOwnerState
    >;
    /**
     * Props forwarded to the indicator slot.
     * By default, the available props are based on the span element.
     */
    indicator: SlotProps<'span', TabsIndicatorSlotPropsOverrides, TabsOwnerState>;
    /**
     * Props forwarded to the scrollButtons slot.
     * By default, the available props are based on the [TabScrollButton](https://mui.com/material-ui/api/tab-scroll-button/#props) component.
     */
    scrollButtons: SlotProps<
      typeof TabScrollButton,
      TabsScrollButtonsSlotPropsOverrides,
      TabsOwnerState
    >;
    /**
     * Props forwarded to the startScrollButtonIcon slot.
     * By default, the available props are based on the [SvgIcon](https://mui.com/material-ui/api/svg-icon/#props) component.
     */
    startScrollButtonIcon: SlotProps<
      typeof SvgIcon,
      TabsStartScrollButtonIconSlotPropsOverrides,
      TabsOwnerState
    >;
    /**
     * Props forwarded to the endScrollButtonIcon slot.
     * By default, the available props are based on the [SvgIcon](https://mui.com/material-ui/api/svg-icon/#props) component.
     */
    endScrollButtonIcon: SlotProps<
      typeof SvgIcon,
      TabsEndScrollButtonIconSlotPropsOverrides,
      TabsOwnerState
    >;
  }
>;

export interface TabsOwnerState extends Omit<TabsProps, 'slots' | 'slotProps'> {
  vertical: boolean;
  fixed: boolean;
  hideScrollbar: boolean;
  scrollableX: boolean;
  scrollableY: boolean;
  centered: boolean;
  scrollButtonsHideMobile: boolean;
}

export interface TabsOwnProps extends TabsSlotsAndSlotProps {
  /**
   * Callback fired when the component mounts.
   * This is useful when you want to trigger an action programmatically.
   * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
   *
   * @param {object} actions This object contains all possible actions
   * that can be triggered programmatically.
   */
  action?: React.Ref<TabsActions> | undefined;
  /**
   * If `true`, the scroll buttons aren't forced hidden on mobile.
   * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
   * @default false
   */
  allowScrollButtonsMobile?: boolean | undefined;
  /**
   * The label for the Tabs as a string.
   */
  'aria-label'?: string | undefined;
  /**
   * An id or list of ids separated by a space that label the Tabs.
   */
  'aria-labelledby'?: string | undefined;
  /**
   * If `true`, the tabs are centered.
   * This prop is intended for large views.
   * @default false
   */
  centered?: boolean | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TabsClasses> | undefined;
  /**
   * Determines the color of the indicator.
   * @default 'primary'
   */
  indicatorColor?:
    OverridableStringUnion<'secondary' | 'primary', TabsPropsIndicatorColorOverrides> | undefined;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child (number)
   */
  onChange?: ((event: React.SyntheticEvent, value: any) => void) | undefined;
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical' | undefined;
  /**
   * Determine behavior of scroll buttons when tabs are set to scroll:
   *
   * - `auto` will only present them when not all the items are visible.
   * - `true` will always present them.
   * - `false` will never present them.
   *
   * By default the scroll buttons are hidden on mobile.
   * This behavior can be disabled with `allowScrollButtonsMobile`.
   * @default 'auto'
   */
  scrollButtons?: 'auto' | true | false | undefined;
  /**
   * If `true` the selected tab changes on focus. Otherwise it only
   * changes on activation.
   */
  selectionFollowsFocus?: boolean | undefined;
  /**
   * Determines the color of the `Tab`.
   * @default 'primary'
   */
  textColor?: 'secondary' | 'primary' | 'inherit' | undefined;
  /**
   * The value of the currently selected `Tab`.
   * If you don't want any selected `Tab`, you can set this prop to `false`.
   */
  value?: any;
  /**
   *  Determines additional display behavior of the tabs:
   *
   *  - `scrollable` will invoke scrolling properties and allow for horizontally
   *  scrolling (or swiping) of the tab bar.
   *  - `fullWidth` will make the tabs grow to use all the available space,
   *  which should be used for small views, like on mobile.
   *  - `standard` will render the default state.
   * @default 'standard'
   */
  variant?:
    | OverridableStringUnion<'standard' | 'scrollable' | 'fullWidth', TabsPropsVariantOverrides>
    | undefined;
  /**
   * If `true`, the scrollbar is visible. It can be useful when displaying
   * a long vertical list of tabs.
   * @default false
   */
  visibleScrollbar?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface TabsTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & TabsOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Tabs](https://next.mui.com/material-ui/react-tabs/)
 *
 * API:
 *
 * - [Tabs API](https://next.mui.com/material-ui/api/tabs/)
 */
declare const Tabs: OverridableComponent<TabsTypeMap>;

export interface TabsActions {
  updateIndicator(): void;
  updateScrollButtons(): void;
}

export type TabsProps<
  RootComponent extends React.ElementType = TabsTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TabsTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Tabs;
