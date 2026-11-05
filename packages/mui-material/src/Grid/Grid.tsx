'use client';
import PropTypes from 'prop-types';
import { createGrid } from '@mui/system/Grid';
import type { SxProps } from '@mui/system';
import type { OverridableComponent, OverrideProps } from '@mui/types';
import requirePropFactory from '../utils/requirePropFactory';
import type { Theme, Breakpoint } from '../styles';
import { styled } from '../styles';
import { useDefaultProps } from '../DefaultPropsProvider';
import useTheme from '../styles/useTheme';

type ResponsiveStyleValue<T> = T | ReadonlyArray<T | null> | { [key in Breakpoint]?: T | null };

export type GridDirection = 'row' | 'row-reverse';

export type GridSpacing = number | string;

export type GridWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type GridSize = 'auto' | 'grow' | number | false;

export type GridOffset = 'auto' | number;

export interface GridBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * The number of columns.
   * @default 12
   */
  columns?: ResponsiveStyleValue<number> | undefined;
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing?: ResponsiveStyleValue<GridSpacing> | undefined;
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container?: boolean | undefined;
  /**
   * Defines the `flex-direction` style property for the container.
   *
   * ⚠️ Only `row` and `row-reverse` are supported. `column` and `column-reverse` are not supported,
   * because the Grid component is designed to subdivide layouts into **columns**, not rows.
   *
   * For vertical layouts, use `Stack` instead.
   *
   * @default 'row'
   */
  direction?: ResponsiveStyleValue<GridDirection> | undefined;
  /**
   * Defines the offset value for the type `item` components.
   */
  offset?: ResponsiveStyleValue<GridOffset> | undefined;
  /**
   * @internal
   * The level of the grid starts from `0` and increases when the grid nests
   * inside another grid. Nesting is defined as a container Grid being a direct
   * child of a container Grid.
   *
   * ```js
   * <Grid container> // level 0
   *   <Grid container> // level 1
   *     <Grid container> // level 2
   * ```
   *
   * Only consecutive grid is considered nesting. A grid container will start at
   * `0` if there are non-Grid container element above it.
   *
   * ```js
   * <Grid container> // level 0
   *   <div>
   *     <Grid container> // level 0
   * ```
   *
   * ```js
   * <Grid container> // level 0
   *   <Grid>
   *     <Grid container> // level 0
   * ```
   */
  unstable_level?: number | undefined;
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing?: ResponsiveStyleValue<GridSpacing> | undefined;
  /**
   * Defines the size of the the type `item` components.
   */
  size?: ResponsiveStyleValue<GridSize> | undefined;
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<GridSpacing> | undefined;
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap?: GridWrap | undefined;
}

export interface GridTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P & GridBaseProps & { sx?: SxProps<Theme> | undefined };
  defaultComponent: D;
}

export type GridProps<
  D extends React.ElementType = GridTypeMap['defaultComponent'],
  P = {
    component?: React.ElementType | undefined;
  },
> = OverrideProps<GridTypeMap<P, D>, D>;

/**
 *
 * Demos:
 *
 * - [Grid](https://next.mui.com/material-ui/react-grid/)
 *
 * API:
 *
 * - [Grid API](https://next.mui.com/material-ui/api/grid/)
 */
const Grid = createGrid({
  createStyledComponent: styled('div', {
    name: 'MuiGrid',
    slot: 'Root',
    overridesResolver: (props, styles) => {
      const { ownerState } = props;
      return [styles.root, ownerState.container && styles.container];
    },
  }),
  componentName: 'MuiGrid',
  useThemeProps: (inProps) => useDefaultProps({ props: inProps, name: 'MuiGrid' }),
  useTheme,
}) as OverridableComponent<GridTypeMap>;

Grid.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The number of columns.
   * @default 12
   */
  columns: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.number,
    PropTypes.object,
  ]),
  /**
   * Defines the horizontal space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  columnSpacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * If `true`, the component will have the flex *container* behavior.
   * You should be wrapping *items* with a *container*.
   * @default false
   */
  container: PropTypes.bool,
  /**
   * Defines the `flex-direction` style property for the container.
   *
   * ⚠️ Only `row` and `row-reverse` are supported. `column` and `column-reverse` are not supported,
   * because the Grid component is designed to subdivide layouts into **columns**, not rows.
   *
   * For vertical layouts, use `Stack` instead.
   *
   * @default 'row'
   */
  direction: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['row-reverse', 'row']),
    PropTypes.arrayOf(PropTypes.oneOf(['row-reverse', 'row'])),
    PropTypes.object,
  ]),
  /**
   * Defines the offset value for the type `item` components.
   */
  offset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    PropTypes.object,
  ]),
  /**
   * Defines the vertical space between the type `item` components.
   * It overrides the value of the `spacing` prop.
   */
  rowSpacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * Defines the size of the the type `item` components.
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])),
    PropTypes.object,
  ]),
  /**
   * Defines the space between the type `item` components.
   * It can only be used on a type `container` component.
   * @default 0
   */
  spacing: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * @internal
   * The level of the grid starts from `0` and increases when the grid nests
   * inside another grid. Nesting is defined as a container Grid being a direct
   * child of a container Grid.
   *
   * ```js
   * <Grid container> // level 0
   *   <Grid container> // level 1
   *     <Grid container> // level 2
   * ```
   *
   * Only consecutive grid is considered nesting. A grid container will start at
   * `0` if there are non-Grid container element above it.
   *
   * ```js
   * <Grid container> // level 0
   *   <div>
   *     <Grid container> // level 0
   * ```
   *
   * ```js
   * <Grid container> // level 0
   *   <Grid>
   *     <Grid container> // level 0
   * ```
   */
  unstable_level: PropTypes.number,
  /**
   * Defines the `flex-wrap` style property.
   * It's applied for all screen sizes.
   * @default 'wrap'
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
} as any;

if (process.env.NODE_ENV !== 'production') {
  const Component = Grid as any;
  const requireProp = requirePropFactory('Grid', Component);
  // eslint-disable-next-line no-useless-concat
  Component['propTypes' + ''] = {
    // eslint-disable-next-line react/forbid-foreign-prop-types
    ...Component.propTypes,
    direction: requireProp('container'),
    spacing: requireProp('container'),
    wrap: requireProp('container'),
  };
}

export default Grid;
