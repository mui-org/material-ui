import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styled from '@material-ui/styled-engine';
import styleFunctionSx, { extendSxProp } from './styleFunctionSx';
import useTheme from './useTheme';

export default function createBox(options = {}) {
  const { defaultTheme } = options;
  const BoxRoot = styled('div')(styleFunctionSx);

  const Box = React.forwardRef(function Box(inProps, ref) {
    const theme = useTheme(defaultTheme);
    const { className, component = 'div', ...other } = extendSxProp(inProps);

    return (
      <BoxRoot
        as={component}
        ref={ref}
        className={clsx(className, 'MuiBox-root')}
        theme={theme}
        {...other}
      />
    );
  });

  Box.propTypes /* remove-proptypes */ = {
    // ----------------------------- Warning --------------------------------
    // | These PropTypes are generated from the TypeScript type definitions |
    // |     To update them edit the d.ts file and run "yarn proptypes"     |
    // ----------------------------------------------------------------------
    /**
     * @ignore
     */
    children: PropTypes.node,
    /**
     * The component used for the root node.
     * Either a string to use a HTML element or a component.
     */
    component: PropTypes.elementType,
    /**
     * @ignore
     */
    sx: PropTypes.object,
  };

  return Box;
}
