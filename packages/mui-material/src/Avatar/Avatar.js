'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Person from '../internal/svg-icons/Person';
import { getAvatarUtilityClass } from './avatarClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, variant, colorDefault } = ownerState;

  const slots = {
    root: ['root', variant, colorDefault && 'colorDefault'],
    img: ['img'],
    fallback: ['fallback'],
  };

  return composeClasses(slots, getAvatarUtilityClass, classes);
};

const AvatarRoot = styled('div', {
  name: 'MuiAvatar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[ownerState.variant],
      ownerState.colorDefault && styles.colorDefault,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    lineHeight: 1,
    borderRadius: '50%',
    overflow: 'hidden',
    userSelect: 'none',
    variants: [
      {
        props: { variant: 'rounded' },
        style: {
          borderRadius: (theme.vars || theme).shape.borderRadius,
        },
      },
      {
        props: { variant: 'square' },
        style: {
          borderRadius: 0,
        },
      },
      {
        props: { colorDefault: true },
        style: {
          color: (theme.vars || theme).palette.background.default,
          '@media (forced-colors: active)': {
            boxSizing: 'border-box',
            border: '1px solid ButtonBorder',
          },
          ...(theme.vars
            ? {
                backgroundColor: theme.vars.palette.Avatar.defaultBg,
              }
            : {
                backgroundColor: theme.palette.grey[400],
                ...theme.applyStyles('dark', { backgroundColor: theme.palette.grey[600] }),
              }),
        },
      },
    ],
  })),
);

const AvatarImg = styled('img', {
  name: 'MuiAvatar',
  slot: 'Img',
})({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  // Handle non-square image.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000,
});

const AvatarFallback = styled(Person, {
  name: 'MuiAvatar',
  slot: 'Fallback',
})({
  width: '75%',
  height: '75%',
});

function useLoaded(src, srcSet, crossOrigin, referrerPolicy) {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoaded(false);

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy;
    image.src = src;
    if (srcSet) {
      image.srcset = srcSet;
    }

    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);

  return loaded;
}

const Avatar = React.forwardRef(function Avatar(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiAvatar' });
  const {
    alt,
    children: childrenProp,
    className,
    component = 'div',
    slots = {},
    slotProps = {},
    sizes,
    src,
    srcSet,
    variant = 'circular',
    ...other
  } = props;

  let children = null;

  const ownerState = {
    ...props,
    component,
    variant,
  };

  const { crossOrigin, referrerPolicy } =
    (typeof slotProps.img === 'function' ? slotProps.img(ownerState) : slotProps.img) ?? {};
  // Use a hook instead of onError on the img element to support server-side rendering.
  const loaded = useLoaded(src, srcSet, crossOrigin, referrerPolicy);
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && loaded !== 'error';

  ownerState.colorDefault = !hasImgNotFailing;
  // This issue explains why this is required: https://github.com/mui/material-ui/issues/42184
  delete ownerState.ownerState;

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: AvatarRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      component,
      ...other,
    },
    ownerState,
  });

  const [ImgSlot, imgSlotProps] = useSlot('img', {
    className: classes.img,
    elementType: AvatarImg,
    externalForwardedProps,
    additionalProps: { alt, src, srcSet, sizes },
    ownerState,
  });

  const [FallbackSlot, fallbackSlotProps] = useSlot('fallback', {
    className: classes.fallback,
    elementType: AvatarFallback,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    ownerState,
  });

  if (hasImgNotFailing) {
    children = <ImgSlot {...imgSlotProps} />;
    // We only render valid children, non valid children are rendered with a fallback
    // We consider that invalid children are all falsy values, except 0, which is valid.
  } else if (!!childrenProp || childrenProp === 0) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = <FallbackSlot {...fallbackSlotProps} />;
  }

  return <RootSlot {...rootSlotProps}>{children}</RootSlot>;
});

Avatar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: PropTypes.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
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
   * The `sizes` attribute for the `img` element.
   */
  sizes: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    fallback: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    img: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    fallback: PropTypes.elementType,
    img: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The `src` attribute for the `img` element.
   */
  src: PropTypes.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['circular', 'rounded', 'square']),
    PropTypes.string,
  ]),
};

export default Avatar;
