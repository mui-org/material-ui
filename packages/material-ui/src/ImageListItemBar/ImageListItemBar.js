import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import { getImageListItemBarUtilityClass } from './imageListItemBarClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, position, actionIcon, actionPosition } = styleProps;

  const slots = {
    root: ['root', `position${capitalize(position)}`],
    titleWrap: [
      'titleWrap',
      `titleWrap${capitalize(position)}`,
      actionIcon && `titleWrapActionPos${capitalize(actionPosition)}`,
    ],
    title: ['title'],
    subtitle: ['subtitle'],
    actionIcon: ['actionIcon', `actionIconActionPos${capitalize(actionPosition)}`],
  };

  return composeClasses(slots, getImageListItemBarUtilityClass, classes);
};

const ImageListItemBarRoot = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styles[`position${capitalize(styleProps.position)}`]];
  },
})(({ theme, styleProps }) => {
  return {
    /* Styles applied to the root element. */
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily,
    /* Styles applied to the root element if `position="bottom"`. */
    ...(styleProps.position === 'bottom' && {
      bottom: 0,
    }),
    /* Styles applied to the root element if `position="top"`. */
    ...(styleProps.position === 'top' && {
      top: 0,
    }),
    /* Styles applied to the root element if `position="below"`. */
    ...(styleProps.position === 'below' && {
      position: 'relative',
      background: 'transparent',
      alignItems: 'normal',
    }),
  };
});

const ImageListItemBarTitleWrap = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'TitleWrap',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.titleWrap,
      styles[`titleWrap${capitalize(styleProps.position)}`],
      styleProps.actionIcon && styles[`titleWrapActionPos${capitalize(styleProps.actionPosition)}`],
    ];
  },
})(({ theme, styleProps }) => {
  return {
    /* Styles applied to the title and subtitle container element. */
    flexGrow: 1,
    padding: '12px 16px',
    color: theme.palette.common.white,
    overflow: 'hidden',
    /* Styles applied to the title and subtitle container element if `position="below"`. */
    ...(styleProps.position === 'below' && {
      padding: '6px 0 12px',
      color: 'inherit',
    }),
    /* Styles applied to the container element if `actionPosition="left"`. */
    ...(styleProps.actionIcon &&
      styleProps.actionPosition === 'left' && {
        paddingLeft: 0,
      }),
    /* Styles applied to the container element if `actionPosition="right"`. */
    ...(styleProps.actionIcon &&
      styleProps.actionPosition === 'right' && {
        paddingRight: 0,
      }),
  };
});

const ImageListItemBarTitle = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Title',
  overridesResolver: (props, styles) => styles.title,
})(({ theme }) => {
  return {
    /* Styles applied to the title container element. */
    fontSize: theme.typography.pxToRem(16),
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };
});

const ImageListItemBarSubtitle = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Subtitle',
  overridesResolver: (props, styles) => styles.subtitle,
})(({ theme }) => {
  return {
    /* Styles applied to the subtitle container element. */
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };
});

const ImageListItemBarActionIcon = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'ActionIcon',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.actionIcon,
      styles[`actionIconActionPos${capitalize(styleProps.actionPosition)}`],
    ];
  },
})(({ styleProps }) => {
  return {
    /* Styles applied to the actionIcon if `actionPosition="left"`. */
    ...(styleProps.actionPosition === 'left' && {
      order: -1,
    }),
  };
});

const ImageListItemBar = React.forwardRef(function ImageListItemBar(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: 'MuiImageListItemBar',
  });

  const {
    actionIcon,
    actionPosition = 'right',
    className,
    subtitle,
    title,
    position = 'bottom',
    ...other
  } = props;

  const styleProps = { ...props, position, actionPosition };

  const classes = useUtilityClasses(styleProps);

  return (
    <ImageListItemBarRoot
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      <ImageListItemBarTitleWrap styleProps={styleProps} className={classes.titleWrap}>
        <ImageListItemBarTitle className={classes.title}>{title}</ImageListItemBarTitle>
        {subtitle ? (
          <ImageListItemBarSubtitle className={classes.subtitle}>
            {subtitle}
          </ImageListItemBarSubtitle>
        ) : null}
      </ImageListItemBarTitleWrap>
      {actionIcon ? (
        <ImageListItemBarActionIcon styleProps={styleProps} className={classes.actionIcon}>
          {actionIcon}
        </ImageListItemBarActionIcon>
      ) : null}
    </ImageListItemBarRoot>
  );
});

ImageListItemBar.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the item itself).
   */
  actionIcon: PropTypes.node,
  /**
   * Position of secondary action IconButton.
   * @default 'right'
   */
  actionPosition: PropTypes.oneOf(['left', 'right']),
  /**
   * @ignore
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
   * Position of the title bar.
   * @default 'bottom'
   */
  position: PropTypes.oneOf(['below', 'bottom', 'top']),
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * Title to be displayed.
   */
  title: PropTypes.node,
};

export default ImageListItemBar;
