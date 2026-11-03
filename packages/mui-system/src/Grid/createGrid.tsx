'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import type { OverridableComponent } from '@mui/types';
import isMuiElement from '@mui/utils/isMuiElement';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import systemStyled from '../styled';
import useThemePropsSystem from '../useThemeProps';
import useThemeSystem from '../useTheme';
import type { Breakpoint, Breakpoints } from '../createTheme';
import createTheme from '../createTheme';
import {
  generateGridStyles,
  generateGridSizeStyles,
  generateGridColumnsStyles,
  generateGridColumnSpacingStyles,
  generateGridRowSpacingStyles,
  generateGridDirectionStyles,
  generateGridOffsetStyles,
  generateSizeClassNames,
  generateSpacingClassNames,
  generateDirectionClasses,
} from './gridGenerator';
import type { CreateMUIStyled } from '../createStyled';
import type { GridTypeMap, GridOwnerState, GridProps, GridOffset, GridSize } from './GridProps';

const defaultTheme = createTheme();

// widening Theme to any so that the consumer can own the theme structure.
const defaultCreateStyledComponent = (systemStyled as CreateMUIStyled<any>)('div', {
  name: 'MuiGrid',
  slot: 'Root',
});

function useThemePropsDefault<T extends {}>(props: T) {
  return useThemePropsSystem({
    props,
    name: 'MuiGrid',
    defaultTheme,
  });
}

export default function createGrid(
  options: {
    createStyledComponent?: typeof defaultCreateStyledComponent | undefined;
    useThemeProps?: typeof useThemePropsDefault | undefined;
    useTheme?: typeof useThemeSystem | undefined;
    componentName?: string | undefined;
  } = {},
) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    useTheme = useThemeSystem,
    componentName = 'MuiGrid',
  } = options;

  const useUtilityClasses = (ownerState: GridOwnerState, theme: typeof defaultTheme) => {
    const { container, direction, spacing, wrap, size } = ownerState;
    const slots = {
      root: [
        'root',
        container && 'container',
        wrap !== 'wrap' && `wrap-xs-${String(wrap)}`,
        ...generateDirectionClasses(direction),
        ...generateSizeClassNames(size),
        ...(container ? generateSpacingClassNames(spacing, theme.breakpoints.keys[0]) : []),
      ],
    };

    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };

  function parseResponsiveProp<T extends GridSize | GridOffset>(
    propValue: T | null | ReadonlyArray<T | null> | { [key in Breakpoint]?: T | null },
    breakpoints: Breakpoints,
    shouldUseValue: (val: T) => boolean = () => true,
  ): { [key in Breakpoint]: T } {
    const parsedProp = {} as { [key in Breakpoint]: T };

    if (propValue === null) {
      return parsedProp;
    }

    if (Array.isArray(propValue)) {
      propValue.forEach((value, index) => {
        if (value !== null && shouldUseValue(value) && breakpoints.keys[index]) {
          parsedProp[breakpoints.keys[index]] = value;
        }
      });
    } else if (typeof propValue === 'object') {
      Object.keys(propValue).forEach((key) => {
        const value = (propValue as { [key in Breakpoint]?: T | null })[key as Breakpoint];
        if (value !== null && value !== undefined && shouldUseValue(value)) {
          parsedProp[key as Breakpoint] = value;
        }
      });
    } else {
      parsedProp[breakpoints.keys[0]] = propValue;
    }

    return parsedProp;
  }

  const GridRoot = createStyledComponent<{
    ownerState: GridOwnerState;
  }>(
    generateGridColumnsStyles,
    generateGridColumnSpacingStyles,
    generateGridRowSpacingStyles,
    generateGridSizeStyles,
    generateGridDirectionStyles,
    generateGridStyles,
    generateGridOffsetStyles,
  );

  const Grid = React.forwardRef(function Grid(inProps, ref) {
    const theme = useTheme();
    const themeProps = useThemeProps<
      typeof inProps & { component?: React.ElementType | undefined }
    >(inProps);
    const props = themeProps as typeof themeProps & GridOwnerState;

    const {
      className,
      children,
      columns: columnsProp = 12,
      container = false,
      component = 'div',
      direction = 'row',
      wrap = 'wrap',
      size: sizeProp = {},
      offset: offsetProp = {},
      spacing: spacingProp = 0,
      rowSpacing: rowSpacingProp = spacingProp,
      columnSpacing: columnSpacingProp = spacingProp,
      unstable_level: level = 0,
      ...other
    } = props;
    const size = parseResponsiveProp<GridSize>(sizeProp, theme.breakpoints, (val) => val !== false);
    const offset = parseResponsiveProp<GridOffset>(offsetProp, theme.breakpoints);

    const columns = inProps.columns ?? (level ? undefined : columnsProp);
    const spacing = inProps.spacing ?? (level ? undefined : spacingProp);
    const rowSpacing =
      inProps.rowSpacing ?? inProps.spacing ?? (level ? undefined : rowSpacingProp);
    const columnSpacing =
      inProps.columnSpacing ?? inProps.spacing ?? (level ? undefined : columnSpacingProp);
    const ownerState = {
      ...props,
      level,
      columns,
      container,
      direction,
      wrap,
      spacing,
      rowSpacing,
      columnSpacing,
      size,
      offset,
    };

    const classes = useUtilityClasses(ownerState, theme);

    return (
      <GridRoot
        ref={ref}
        as={component}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        {...other}
      >
        {React.Children.map(children, (child) => {
          if (
            React.isValidElement<{ container?: unknown }>(child) &&
            isMuiElement(child, ['Grid']) &&
            container &&
            child.props.container
          ) {
            return React.cloneElement(child, {
              unstable_level: (child.props as GridProps)?.unstable_level ?? level + 1,
            } as GridProps);
          }
          return child;
        })}
      </GridRoot>
    );
  }) as OverridableComponent<GridTypeMap>;

  Grid.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    className: PropTypes.string,
    columns: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.number),
      PropTypes.number,
      PropTypes.object,
    ]),
    columnSpacing: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    component: PropTypes.elementType,
    container: PropTypes.bool,
    direction: PropTypes.oneOfType([
      PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
      PropTypes.object,
    ]),
    offset: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      PropTypes.object,
    ]),
    rowSpacing: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])),
      PropTypes.object,
    ]),
    spacing: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
      PropTypes.number,
      PropTypes.object,
      PropTypes.string,
    ]),
    sx: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
      PropTypes.func,
      PropTypes.object,
    ]),
    wrap: PropTypes.oneOf(['nowrap', 'wrap-reverse', 'wrap']),
  };

  // @ts-expect-error internal logic for nested grid
  Grid.muiName = 'Grid';

  return Grid;
}
