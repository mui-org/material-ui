'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import type { TabsTypeMap } from '@mui/material/Tabs';
import type { DistributiveOmit } from '@mui/types';
import type { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import { useTabContext, getTabId, getPanelId } from '../TabContext';

interface TabListOwnProps extends DistributiveOmit<TabsTypeMap['props'], 'children' | 'value'> {
  /**
   * A list of `<Tab />` elements.
   */
  children?: React.ReactNode;
}

export interface TabListTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = TabsTypeMap['defaultComponent'],
> {
  props: AdditionalProps & TabListOwnProps;
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
 * - [TabList API](https://next.mui.com/material-ui/api/tab-list/)
 * - inherits [Tabs API](https://next.mui.com/material-ui/api/tabs/)
 */
const TabList = React.forwardRef(function TabList(
  props: TabListOwnProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const { children: childrenProp, ...other } = props;
  const context = useTabContext();
  if (context === null) {
    throw /* minify-error */ new TypeError(
      'MUI: No TabContext provided. ' +
        'TabList must be used within a TabContext. ' +
        'Wrap your Tabs with <TabContext value={...}>. ' +
        'See https://mui.com/material-ui/react-tabs/#experimental-api for more info.',
    );
  }
  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement<{ value?: string | number | undefined }>(child)) {
      return null;
    }

    return React.cloneElement(child, {
      // SOMEDAY: `Tabs` will set those themselves
      'aria-controls': getPanelId(context, child.props.value as string),
      id: getTabId(context, child.props.value as string),
    } as any);
  });

  return (
    <Tabs {...(other as any)} ref={ref} value={context.value}>
      {children}
    </Tabs>
  );
}) as OverridableComponent<TabListTypeMap>;

TabList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A list of `<Tab />` elements.
   */
  children: PropTypes.node,
} as any;

export type TabListClassKey = keyof NonNullable<TabListTypeMap['props']['classes']>;

export type TabListProps<
  RootComponent extends React.ElementType = TabListTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TabListTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export default TabList;
