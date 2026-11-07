'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getCardMediaUtilityClass } from './cardMediaClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, isMediaComponent, isImageComponent } = ownerState;

  const slots = {
    root: ['root', isMediaComponent && 'media', isImageComponent && 'img'],
  };

  return composeClasses(slots, getCardMediaUtilityClass, classes);
};

const CardMediaRoot = styled('div', {
  name: 'MuiCardMedia',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;
    const { isMediaComponent, isImageComponent } = ownerState;

    return [styles.root, isMediaComponent && styles.media, isImageComponent && styles.img];
  },
})({
  display: 'block',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  variants: [
    {
      props: { isMediaComponent: true },
      style: {
        width: '100%',
      },
    },
    {
      props: { isImageComponent: true },
      style: {
        objectFit: 'cover',
      },
    },
  ],
});

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];
const IMAGE_COMPONENTS = ['picture', 'img'];

const CardMedia = React.forwardRef(function CardMedia(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCardMedia' });
  const { children, className, component = 'div', image, src, style, ...other } = props;

  const isMediaComponent = MEDIA_COMPONENTS.includes(component);
  const composedStyle =
    !isMediaComponent && image ? { backgroundImage: `url("${image}")`, ...style } : style;

  const ownerState = {
    ...props,
    component,
    isMediaComponent,
    isImageComponent: IMAGE_COMPONENTS.includes(component),
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <CardMediaRoot
      className={clsx(classes.root, className)}
      as={component}
      role={!isMediaComponent && image ? 'img' : undefined}
      ref={ref}
      style={composedStyle}
      ownerState={ownerState}
      src={isMediaComponent ? image || src : undefined}
      {...other}
    >
      {children}
    </CardMediaRoot>
  );
});

CardMedia.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node, (props) => {
    if (!props.children && !props.image && !props.src && !props.component) {
      return new Error(
        'MUI: Either `children`, `image`, `src` or `component` prop must be specified.',
      );
    }
    return null;
  }),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * A CSS class name applied to the root element.
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: PropTypes.string,
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: PropTypes.string,
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

export default CardMedia;
