import * as React from 'react';
import { ResponsiveStyleValue, SxProps, SystemProps } from '@material-ui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { GridClasses } from './gridClasses';

export type GridDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type GridSpacing = number | string;

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridSize = 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps<Theme> & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<GridClasses>;
      /**
       * The number of columns.
       * @default 12
       */
      columns?: ResponsiveStyleValue<number>;
      /**
       * Defines the horizontal space between the type `item` components.
       * It overrides the value of the `spacing` prop.
       */
      columnSpacing?: ResponsiveStyleValue<GridSpacing>;
      /**
       * If `true`, the component will have the flex *container* behavior.
       * You should be wrapping *items* with a *container*.
       * @default false
       */
      container?: boolean;
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'row'
       */
      direction?: ResponsiveStyleValue<GridDirection>;
      /**
       * If `true`, the component will have the flex *item* behavior.
       * You should be wrapping *items* with a *container*.
       * @default false
       */
      item?: boolean;
      /**
       * Defines the number of grids the component is going to use.
       * It's applied for the `lg` breakpoint and wider screens if not overridden.
       * @default false
       */
      lg?: boolean | GridSize;
      /**
       * Defines the number of grids the component is going to use.
       * It's applied for the `md` breakpoint and wider screens if not overridden.
       * @default false
       */
      md?: boolean | GridSize;
      /**
       * Defines the vertical space between the type `item` components.
       * It overrides the value of the `spacing` prop.
       */
      rowSpacing?: ResponsiveStyleValue<GridSpacing>;
      /**
       * Defines the number of grids the component is going to use.
       * It's applied for the `sm` breakpoint and wider screens if not overridden.
       * @default false
       */
      sm?: boolean | GridSize;
      /**
       * Defines the space between the type `item` components.
       * It can only be used on a type `container` component.
       * @default 0
       */
      spacing?: ResponsiveStyleValue<GridSpacing>;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
      /**
       * Defines the `flex-wrap` style property.
       * It's applied for all screen sizes.
       * @default 'wrap'
       */
      wrap?: GridWrap;
      /**
       * Defines the number of grids the component is going to use.
       * It's applied for the `xl` breakpoint and wider screens.
       * @default false
       */
      xl?: boolean | GridSize;
      /**
       * Defines the number of grids the component is going to use.
       * It's applied for all the screen sizes with the lowest priority.
       * @default false
       */
      xs?: boolean | GridSize;
      /**
       * If `true`, it sets `min-width: 0` on the item.
       * Refer to the limitations section of the documentation to better understand the use case.
       * @default false
       */
      zeroMinWidth?: boolean;
    };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Grid](https://material-ui.com/components/grid/)
 *
 * API:
 *
 * - [Grid API](https://material-ui.com/api/grid/)
 */
declare const Grid: OverridableComponent<GridTypeMap>;

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<GridTypeMap<P, D>, D>;

export default Grid;
