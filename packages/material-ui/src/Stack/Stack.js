import * as React from 'react';
import PropTypes from 'prop-types';
import {
  createUnarySpacing,
  getValue,
  handleBreakpoints,
  unstable_extendSxProp as extendSxProp,
} from '@material-ui/system';
import { deepmerge } from '@material-ui/utils';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';

/**
 * Return an array with the separator React element interspersed between
 * each React node of the input children.
 *
 * > joinChildren([1,2,3], 0)
 * [1,0,2,0,3]
 */
function joinChildren(children, separator) {
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  return childrenArray.reduce((output, child, index) => {
    output.push(child);

    if (index < childrenArray.length - 1) {
      output.push(React.cloneElement(separator, { key: `separator-${index}` }));
    }

    return output;
  }, []);
}

// Duplicated with Grid.js
function resolveBreakpointValues({ values, base }) {
  const keys = Object.keys(base);

  if (keys.length === 0) {
    return values;
  }

  let previous;

  return keys.reduce((acc, breakpoint) => {
    if (typeof values === 'object') {
      acc[breakpoint] = values[breakpoint] != null ? values[breakpoint] : values[previous];
    } else {
      acc[breakpoint] = values;
    }
    previous = breakpoint;
    return acc;
  }, {});
}

const getSideFromDirection = (direction) => {
  return {
    row: 'Left',
    'row-reverse': 'Right',
    column: 'Top',
    'column-reverse': 'Bottom',
  }[direction];
};

export const style = ({ styleProps, theme }) => {
  let styles = {
    display: 'flex',
    ...handleBreakpoints({ theme }, styleProps.direction, (propValue) => ({
      flexDirection: propValue,
    })),
  };

  if (styleProps.spacing) {
    const transformer = createUnarySpacing(theme);

    const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
      if (styleProps.spacing[breakpoint] != null || styleProps.direction[breakpoint] != null) {
        acc[breakpoint] = true;
      }
      return acc;
    }, {});

    const directionValues = resolveBreakpointValues({ values: styleProps.direction, base });
    const spacingValues = resolveBreakpointValues({ values: styleProps.spacing, base });

    const styleFromPropValue = (propValue, breakpoint) => {
      return {
        '& > :not(style) + :not(style)': {
          margin: 0,
          [`margin${getSideFromDirection(
            breakpoint ? directionValues[breakpoint] : styleProps.direction,
          )}`]: getValue(transformer, propValue),
        },
      };
    };
    styles = deepmerge(styles, handleBreakpoints({ theme }, spacingValues, styleFromPropValue));
  }

  return styles;
};

const StackRoot = styled('div', { name: 'Stack' })(style);

const Stack = React.forwardRef(function Stack(inProps, ref) {
  const themeProps = useThemeProps({ props: inProps, name: 'MuiStack' });
  const props = extendSxProp(themeProps);
  const {
    component = 'div',
    direction = 'column',
    spacing = 0,
    divider,
    children,
    ...other
  } = props;
  const styleProps = {
    direction,
    spacing,
  };

  return (
    <StackRoot as={component} styleProps={styleProps} ref={ref} {...other}>
      {divider ? joinChildren(children, divider) : children}
    </StackRoot>
  );
});

Stack.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: PropTypes.oneOfType([
    PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row']),
    PropTypes.arrayOf(PropTypes.oneOf(['column-reverse', 'column', 'row-reverse', 'row'])),
    PropTypes.object,
  ]),
  /**
   * Add an element between each child.
   */
  divider: PropTypes.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default Stack;
