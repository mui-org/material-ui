import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { styled, useThemeProps } from '@material-ui/core/styles';
import { getMasonryItemUtilityClass } from './masonryItemClasses';
import MasonryContext from '../Masonry/MasonryContext';

const useUtilityClasses = (styleProps) => {
  const { classes } = styleProps;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getMasonryItemUtilityClass, classes);
};

const MasonryItemRoot = styled('div', {
  name: 'MuiMasonryItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [styles.root];
  },
})(({ styleProps, theme }) => {
  const gap = Number(theme.spacing(styleProps.spacing).replace('px', ''));
  const totalHeight = styleProps.contentHeight + gap;
  const rowSpan = Math.ceil(totalHeight / gap);
  return {
    width: '100%',
    [`& *`]: {
      // all contents should have a width of 100%
      objectFit: 'cover',
      width: '100%',
    },
    gridRowEnd: `span ${styleProps.contentHeight !== undefined ? rowSpan : 0}`,
  };
});

const MasonryItem = React.forwardRef(function MasonryItem(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiMasonryItem',
  });

  const { spacing } = React.useContext(MasonryContext);
  const { children, className, component = 'div', style, ...other } = props;
  const styleProps = {
    ...props,
    spacing,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <MasonryItemRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      style={style}
      styleProps={styleProps}
      {...other}
    >
      {children}
    </MasonryItemRoot>
  );
});

MasonryItem.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally an `<img>` or a `<div>`.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The height of the content of the component in px.
   */
  contentHeight: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * Allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default MasonryItem;
