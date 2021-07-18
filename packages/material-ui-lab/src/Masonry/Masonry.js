// A masonry component using the following libs as inspiration.
// - https://github.com/STRML/react-grid-layout
// - https://next.material-ui.com/components/image-list/#masonry-image-list
// - https://github.com/desandro/masonry
// - https://w3bits.com/css-grid-masonry

import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { getMasonryUtilityClass } from './masonryClasses';
import MasonryContext from './MasonryContext';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryUtilityClass, classes);
};

const MasonryRoot = styled('div', {
  name: 'MuiMasonry',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})(({ styleProps, theme }) => {
  /* Styles applied to the root element. */
  return {
    display: 'grid',
    gridAutoRows: 0,
    padding: 0,
    width: '100%',
    gap: theme.spacing(styleProps.spacing),
    gridTemplateColumns: `repeat(${styleProps.cols}, 1fr)`,
  };
});

const Masonry = React.forwardRef(function Masonry(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonry',
  });

  const { children, className, component = 'div', cols = 4, spacing = 1, style, ...other } = props;
  const styleProps = { ...props, spacing, cols };
  const classes = useUtilityClasses(styleProps);

  return (
    <MasonryRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      style={props.style}
      styleProps={styleProps}
      {...other}
    >
      <MasonryContext.Provider value={{ spacing }}>{children}</MasonryContext.Provider>
    </MasonryRoot>
  );
});

Masonry.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally `MasonryItem`s.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Number of columns.
   * @default 4
   */
  cols: PropTypes.number,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Defines the space between children.
   * @default 1
   */
  spacing: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
    PropTypes.number,
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default Masonry;
