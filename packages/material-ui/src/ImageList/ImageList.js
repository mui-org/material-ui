import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { integerPropType } from '@material-ui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getImageListUtilityClass } from './imageListClasses';
import ImageListContext from './ImageListContext';

const useUtilityClasses = (styleProps) => {
  const { classes, variant } = styleProps;

  const slots = {
    root: ['root', variant],
  };

  return composeClasses(slots, getImageListUtilityClass, classes);
};

const ImageListRoot = styled('ul', {
  name: 'MuiImageList',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styles[styleProps.variant]];
  },
})(({ styleProps }) => {
  /* Styles applied to the root element. */
  return {
    display: 'grid',
    overflowY: 'auto',
    listStyle: 'none',
    padding: 0,
    // Add iOS momentum scrolling for iOS < 13.0
    WebkitOverflowScrolling: 'touch',
    /* Styles applied to the root element if `variant="masonry"`. */
    ...(styleProps.variant === 'masonry' && {
      display: 'block',
    }),
  };
});

const ImageList = React.forwardRef(function ImageList(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiImageList',
  });

  const {
    children,
    className,
    cols = 2,
    component = 'ul',
    rowHeight = 'auto',
    gap = 4,
    style: styleProp,
    variant = 'standard',
    ...other
  } = props;

  const contextValue = React.useMemo(
    () => ({ rowHeight, gap, variant }),
    [rowHeight, gap, variant],
  );

  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      // Detect Internet Explorer 8+
      if (document !== undefined && 'objectFit' in document.documentElement.style === false) {
        console.error(
          [
            'Material-UI: ImageList v5+ no longer natively supports Internet Explorer.',
            'Use v4 of this component instead, or polyfill CSS object-fit.',
          ].join('\n'),
        );
      }
    }
  }, []);

  const style =
    variant === 'masonry'
      ? { columnCount: cols, columnGap: gap, ...styleProp }
      : { gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...styleProp };

  const styleProps = { ...props, component, gap, rowHeight, variant };

  const classes = useUtilityClasses(styleProps);

  return (
    <ImageListRoot
      as={component}
      className={clsx(classes.root, classes[variant], className)}
      ref={ref}
      style={style}
      styleProps={styleProps}
      {...other}
    >
      <ImageListContext.Provider value={contextValue}>{children}</ImageListContext.Provider>
    </ImageListRoot>
  );
});

ImageList.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component, normally `ImageListItem`s.
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
   * @default 2
   */
  cols: integerPropType,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The gap between items in px.
   * @default 4
   */
  gap: PropTypes.number,
  /**
   * The height of one row in px.
   * @default 'auto'
   */
  rowHeight: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number]),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['masonry', 'quilted', 'standard', 'woven']),
    PropTypes.string,
  ]),
};

export default ImageList;
