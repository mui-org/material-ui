import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { Theme } from '../styles';
import ButtonBase from '../ButtonBase';
import { TabScrollButtonProps } from '../TabScrollButton';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { TabsClasses } from './tabsClasses';

export interface TabsTypeMap<P = {}, D extends React.ElementType = typeof ButtonBase> {
  props: P & {
    /**
     * Callback fired when the component mounts.
     * This is useful when you want to trigger an action programmatically.
     * It supports two actions: `updateIndicator()` and `updateScrollButtons()`
     *
     * @param {object} actions This object contains all possible actions
     * that can be triggered programmatically.
     */
    action?: React.Ref<TabsActions>;
    /**
     * If `true`, the scroll buttons aren't forced hidden on mobile.
     * By default the scroll buttons are hidden on mobile and takes precedence over `scrollButtons`.
     * @default false
     */
    allowScrollButtonsMobile?: boolean;
    /**
     * The label for the Tabs as a string.
     */
    'aria-label'?: string;
    /**
     * An id or list of ids separated by a space that label the Tabs.
     */
    'aria-labelledby'?: string;
    /**
     * If `true`, the tabs are centered.
     * This prop is intended for large views.
     * @default false
     */
    centered?: boolean;
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<TabsClasses>;
    /**
     * Determines the color of the indicator.
     * @default 'primary'
     */
    indicatorColor?: 'secondary' | 'primary';
    /**
     * Callback fired when the value changes.
     *
     * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
     * @param {any} value We default to the index of the child (number)
     */
    onChange?: (event: React.SyntheticEvent, value: any) => void;
    /**
     * The component orientation (layout flow direction).
     * @default 'horizontal'
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * The component used to render the scroll buttons.
     * @default TabScrollButton
     */
    ScrollButtonComponent?: React.ElementType;
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
    scrollButtons?: 'auto' | true | false;
    /**
     * If `true` the selected tab changes on focus. Otherwise it only
     * changes on activation.
     */
    selectionFollowsFocus?: boolean;
    /**
     * Props applied to the tab indicator element.
     * @default  {}
     */
    TabIndicatorProps?: Partial<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Props applied to the [`TabScrollButton`](/api/tab-scroll-button/) element.
     * @default {}
     */
    TabScrollButtonProps?: Partial<TabScrollButtonProps>;
    /**
     * Determines the color of the `Tab`.
     * @default 'primary'
     */
    textColor?: 'secondary' | 'primary' | 'inherit';
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
     *  -`fullWidth` will make the tabs grow to use all the available space,
     *  which should be used for small views, like on mobile.
     *  - `standard` will render the default state.
     * @default 'standard'
     */
    variant?: 'standard' | 'scrollable' | 'fullWidth';
    /**
     * If `true`, the scrollbar is visible. It can be useful when displaying
     * a long vertical list of tabs.
     * @default false
     */
    visibleScrollbar?: boolean;
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
 * - [Tabs](https://material-ui.com/components/tabs/)
 *
 * API:
 *
 * - [Tabs API](https://material-ui.com/api/tabs/)
 */
declare const Tabs: OverridableComponent<TabsTypeMap>;

export interface TabsActions {
  updateIndicator(): void;
  updateScrollButtons(): void;
}

export type TabsProps<
  D extends React.ElementType = TabsTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabsTypeMap<P, D>, D>;

export default Tabs;
