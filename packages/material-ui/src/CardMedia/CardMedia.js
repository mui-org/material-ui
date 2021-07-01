import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getCardMediaUtilityClass } from './cardMediaClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, isMediaComponent, isImageComponent } = styleProps;

  const slots = {
    root: ['root', isMediaComponent && 'media', isImageComponent && 'img'],
  };

  return composeClasses(slots, getCardMediaUtilityClass, classes);
};

const CardMediaRoot = styled('div', {
  name: 'MuiCardMedia',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;
    const { isMediaComponent, isImageComponent } = styleProps;

    return [styles.root, isMediaComponent && styles.media, isImageComponent && styles.img];
  },
})(({ styleProps }) => ({
  /* Styles applied to the root element. */
  display: 'block',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  /* Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
  ...(styleProps.isMediaComponent && {
    width: '100%',
  }),
  /* Styles applied to the root element if `component="picture or img"`. */
  ...(styleProps.isImageComponent && {
    // ⚠️ object-fit is not supported by IE11.
    objectFit: 'cover',
  }),
}));

const MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];
const IMAGE_COMPONENTS = ['picture', 'img'];

const CardMedia = React.forwardRef(function CardMedia(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiCardMedia' });
  const { children, className, component = 'div', image, src, style, ...other } = props;

  const isMediaComponent = MEDIA_COMPONENTS.indexOf(component) !== -1;
  const composedStyle =
    !isMediaComponent && image ? { backgroundImage: `url("${image}")`, ...style } : style;

  const styleProps = {
    ...props,
    component,
    isMediaComponent,
    isImageComponent: IMAGE_COMPONENTS.indexOf(component) !== -1,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <CardMediaRoot
      className={clsx(classes.root, className)}
      as={component}
      ref={ref}
      style={composedStyle}
      styleProps={styleProps}
      src={isMediaComponent ? image || src : undefined}
      {...other}
    >
      {children}
    </CardMediaRoot>
  );
});

CardMedia.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: chainPropTypes(PropTypes.node, (props) => {
    if (!props.children && !props.image && !props.src && !props.component) {
      return new Error(
        'Material-UI: Either `children`, `image`, `src` or `component` prop must be specified.',
      );
    }
    return null;
  }),
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
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default CardMedia;
