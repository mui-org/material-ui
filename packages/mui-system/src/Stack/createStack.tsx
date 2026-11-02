'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import type { OverridableComponent } from '@mui/types';
import deepmerge from '@mui/utils/deepmerge';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import composeClasses from '@mui/utils/composeClasses';
import systemStyled from '../styled';
import useThemePropsSystem from '../useThemeProps';
import createTheme from '../createTheme';
import type { CreateMUIStyled } from '../createStyled';
import type { StackTypeMap, StackOwnerState } from './StackProps';
import type { Breakpoint } from '../createTheme';
import type { Breakpoints } from '../createBreakpoints/createBreakpoints';
import {
  handleBreakpoints,
  mergeBreakpointsInOrder,
  resolveBreakpointValues,
} from '../breakpoints';
import { createUnarySpacing, getValue } from '../spacing';
import type { Spacing } from '../createTheme/createSpacing';

const defaultTheme = createTheme();

interface StyleFunctionProps {
  theme: { breakpoints: Breakpoints; spacing: Spacing };
  ownerState: StackOwnerState;
}

// widening Theme to any so that the consumer can own the theme structure.
const defaultCreateStyledComponent = (systemStyled as CreateMUIStyled<any>)('div', {
  name: 'MuiStack',
  slot: 'Root',
});

function useThemePropsDefault<T extends {}>(props: T) {
  return useThemePropsSystem({
    props,
    name: 'MuiStack',
    defaultTheme,
  });
}

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
function joinChildren(children: React.ReactNode, separator: React.ReactElement<unknown>) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return childrenArray.reduce<React.ReactNode[]>((output, child, index) => {
    output.push(child);

    if (index < childrenArray.length - 1) {
      output.push(React.cloneElement(separator, { key: `separator-${index}` }));
    }

    return output;
  }, []);
}

const getSideFromDirection = (direction: StackOwnerState['direction']) => {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom',
  }[direction as string];
};

export const style = ({ ownerState, theme }: StyleFunctionProps) => {
  let styles = {
    display: 'flex',
    flexDirection: 'column',
    ...handleBreakpoints(
      { theme },
      resolveBreakpointValues({
        values: ownerState.direction,
        breakpoints: theme.breakpoints.values,
      }),
      (propValue: string) => ({
        flexDirection: propValue,
      }),
    ),
  };

  if (ownerState.spacing) {
    const transformer = createUnarySpacing(theme);

    const base = Object.keys(theme.breakpoints.values).reduce<Record<string, boolean>>(
      (acc, breakpoint) => {
        if (
          (typeof ownerState.spacing === 'object' &&
            (ownerState.spacing as any)[breakpoint] != null) ||
          (typeof ownerState.direction === 'object' &&
            (ownerState.direction as any)[breakpoint] != null)
        ) {
          acc[breakpoint] = true;
        }
        return acc;
      },
      {},
    );

    const directionValues = resolveBreakpointValues({
      values: ownerState.direction,
      base,
    });

    const spacingValues = resolveBreakpointValues({
      values: ownerState.spacing,
      base,
    });

    if (typeof directionValues === 'object') {
      Object.keys(directionValues).forEach((breakpoint, index, breakpoints) => {
        const directionValue = directionValues[breakpoint];
        if (!directionValue) {
          const previousDirectionValue =
            index > 0 ? directionValues[breakpoints[index - 1]] : 'column';
          directionValues[breakpoint] = previousDirectionValue;
        }
      });
    }

    const styleFromPropValue = (propValue: string | number | null, breakpoint?: Breakpoint) => {
      if (ownerState.useFlexGap) {
        return { gap: getValue(transformer, propValue) };
      }
      return {
        // The useFlexGap={false} implement relies on each child to give up control of the margin.
        // We need to reset the margin to avoid double spacing.
        '& > :not(style):not(style)': {
          margin: 0,
        },
        '& > :not(style) ~ :not(style)': {
          [`margin${getSideFromDirection(
            breakpoint ? directionValues[breakpoint] : ownerState.direction,
          )}`]: getValue(transformer, propValue),
        },
      };
    };
    styles = deepmerge(styles, handleBreakpoints({ theme }, spacingValues, styleFromPropValue));
  }

  styles = mergeBreakpointsInOrder(theme.breakpoints, styles);

  return styles;
};

export default function createStack(
  options: {
    createStyledComponent?: typeof defaultCreateStyledComponent | undefined;
    useThemeProps?: typeof useThemePropsDefault | undefined;
    componentName?: string | undefined;
  } = {},
) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent = defaultCreateStyledComponent,
    useThemeProps = useThemePropsDefault,
    componentName = 'MuiStack',
  } = options;

  const useUtilityClasses = () => {
    const slots = {
      root: ['root'],
    };

    return composeClasses(slots, (slot) => generateUtilityClass(componentName, slot), {});
  };

  const StackRoot = createStyledComponent<{
    ownerState: StackOwnerState;
  }>(style);

  const Stack = React.forwardRef(function Grid(inProps, ref) {
    const themeProps = useThemeProps<
      typeof inProps & { component?: React.ElementType | undefined }
    >(inProps);
    const {
      component = 'div',
      direction = 'column',
      spacing = 0,
      divider,
      children,
      className,
      useFlexGap = false,
      ...other
    } = themeProps;

    const ownerState = {
      direction,
      spacing,
      useFlexGap,
    };

    const classes = useUtilityClasses();

    return (
      <StackRoot
        as={component}
        ownerState={ownerState}
        ref={ref}
        className={clsx(classes.root, className)}
        {...other}
      >
        {divider ? joinChildren(children, divider as React.ReactElement<unknown>) : children}
      </StackRoot>
    );
  }) as OverridableComponent<StackTypeMap>;

  Stack.propTypes /* remove-proptypes */ = {
    children: PropTypes.node,
    direction: PropTypes.oneOfType([
      PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
      PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
      PropTypes.object,
    ]),
    divider: PropTypes.node,
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
  };

  return Stack;
}
