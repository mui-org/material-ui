import * as React from 'react';
import { SxProps } from '@mui/system';
import { SlotComponentProps } from '../utils/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { BreadcrumbsClasses } from './breadcrumbsClasses';
import SvgIcon from '../SvgIcon';

export interface BreadcrumbsCollapsedIconSlotPropsOverrides {}

export interface BreadcrumbsOwnerState extends BreadcrumbsProps {
  expanded: boolean;
}

export interface BreadcrumbsOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<BreadcrumbsClasses> | undefined;
  /**
   * The components used for each slot inside the Breadcumb.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?:
    | {
        CollapsedIcon?: React.ElementType | undefined;
      }
    | undefined;
  /**
   * The props used for each slot inside the Breadcumb.
   * @default {}
   */
  slotProps?:
    | {
        /**
         * Props applied to the CollapsedIcon slot.
         * @default {}
         */
        collapsedIcon?:
          | SlotComponentProps<
              typeof SvgIcon,
              BreadcrumbsCollapsedIconSlotPropsOverrides,
              BreadcrumbsOwnerState
            >
          | undefined;
      }
    | undefined;
  /**
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Show path'
   */
  expandText?: string | undefined;
  /**
   * If max items is exceeded, the number of items to show after the ellipsis.
   * @default 1
   */
  itemsAfterCollapse?: number | undefined;
  /**
   * If max items is exceeded, the number of items to show before the ellipsis.
   * @default 1
   */
  itemsBeforeCollapse?: number | undefined;
  /**
   * Specifies the maximum number of breadcrumbs to display. When there are more
   * than the maximum number, only the first `itemsBeforeCollapse` and last `itemsAfterCollapse`
   * will be shown, with an ellipsis in between.
   * @default 8
   */
  maxItems?: number | undefined;
  /**
   * Custom separator node.
   * @default '/'
   */
  separator?: React.ReactNode;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface BreadcrumbsTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'nav',
> {
  props: AdditionalProps & BreadcrumbsOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://next.mui.com/material-ui/react-breadcrumbs/)
 *
 * API:
 *
 * - [Breadcrumbs API](https://next.mui.com/material-ui/api/breadcrumbs/)
 * - inherits [Typography API](https://next.mui.com/material-ui/api/typography/)
 */
declare const Breadcrumbs: OverridableComponent<BreadcrumbsTypeMap>;

export type BreadcrumbsProps<
  RootComponent extends React.ElementType = BreadcrumbsTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BreadcrumbsTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Breadcrumbs;
