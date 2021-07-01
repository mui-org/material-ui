import * as React from 'react';
import { TabsTypeMap } from '@material-ui/core/Tabs';
import { DistributiveOmit } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

export interface TabListTypeMap<
  P = {},
  D extends React.ElementType = TabsTypeMap['defaultComponent'],
> {
  props: P & {
    /**
     * A list of `<Tab />` elements.
     */
    children?: React.ReactNode;
  } & DistributiveOmit<TabsTypeMap['props'], 'children' | 'value'>;
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
 * - [TabList API](https://material-ui.com/api/tab-list/)
 * - inherits [Tabs API](https://material-ui.com/api/tabs/)
 */
declare const TabList: OverridableComponent<TabListTypeMap>;

export type TabListClassKey = keyof NonNullable<TabListTypeMap['props']['classes']>;

export type TabListProps<
  D extends React.ElementType = TabListTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<TabListTypeMap<P, D>, D>;

export default TabList;
