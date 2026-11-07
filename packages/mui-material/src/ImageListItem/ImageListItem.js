'use client';
import composeClasses from '@mui/utils/composeClasses';
import integerPropType from '@mui/utils/integerPropType';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { isFragment } from 'react-is';
import ImageListContext from '../ImageList/ImageListContext';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import isMuiElement from '../utils/isMuiElement';
import imageListItemClasses, { getImageListItemUtilityClass } from './imageListItemClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, variant } = ownerState;

  const slots = {
    root: ['root', variant],
    img: ['img'],
  };

  return composeClasses(slots, getImageListItemUtilityClass, classes);
};

const ImageListItemRoot = styled('li', {
  name: 'MuiImageListItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${imageListItemClasses.img}`]: styles.img },
      styles.root,
      styles[ownerState.variant],
    ];
  },
})({
  display: 'block',
  position: 'relative',
  [`& .${imageListItemClasses.img}`]: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    display: 'block',
  },
  variants: [
    {
      props: {
        variant: 'standard',
      },
      style: {
        // For titlebar under list item
        display: 'flex',
        flexDirection: 'column',
      },
    },
    {
      props: {
        variant: 'woven',
      },
      style: {
        height: '100%',
        alignSelf: 'center',
        '&:nth-of-type(even)': {
          height: '70%',
        },
      },
    },
    {
      props: {
        variant: 'standard',
      },
      style: {
        [`& .${imageListItemClasses.img}`]: {
          height: 'auto',
          flexGrow: 1,
        },
      },
    },
  ],
});

const ImageListItem = React.forwardRef(function ImageListItem(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiImageListItem',
  });

  // TODO: - Use jsdoc @default?: "cols rows default values are for docs only"
  const { children, className, cols = 1, component = 'li', rows = 1, style, ...other } = props;

  const { rowHeight = 'auto', gap, variant } = React.useContext(ImageListContext);

  let height = 'auto';
  if (variant === 'woven') {
    height = undefined;
  } else if (rowHeight !== 'auto') {
    height = rowHeight * rows + gap * (rows - 1);
  }

  const ownerState = {
    ...props,
    cols,
    component,
    gap,
    rowHeight,
    rows,
    variant,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ImageListItemRoot
      as={component}
      className={clsx(classes.root, classes[variant], className)}
      ref={ref}
      style={{
        height,
        gridColumnEnd: variant !== 'masonry' ? `span ${cols}` : undefined,
        gridRowEnd: variant !== 'masonry' ? `span ${rows}` : undefined,
        marginBottom: variant === 'masonry' ? gap : undefined,
        breakInside: variant === 'masonry' ? 'avoid' : undefined,
        ...style,
      }}
      ownerState={ownerState}
      {...other}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }

        if (process.env.NODE_ENV !== 'production') {
          if (isFragment(child)) {
            console.error(
              [
                "MUI: The ImageListItem component doesn't accept a Fragment as a child.",
                'Consider providing an array instead.',
              ].join('\n'),
            );
          }
        }

        if (child.type === 'img' || isMuiElement(child, ['Image'])) {
          return React.cloneElement(child, {
            className: clsx(classes.img, child.props.className),
          });
        }

        return child;
      })}
    </ImageListItemRoot>
  );
});

ImageListItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `<img>`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * A CSS class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * Width of the item in number of grid columns.
   * @default 1
   */
  cols: integerPropType,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Height of the item in number of grid rows.
   * @default 1
   */
  rows: integerPropType,
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ImageListItem;
