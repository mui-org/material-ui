'use client';
import composeClasses from '@mui/utils/composeClasses';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import capitalize from '../utils/capitalize';
import { getImageListItemBarUtilityClass } from './imageListItemBarClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, position, actionPosition } = ownerState;

  const slots = {
    root: [
      'root',
      `position${capitalize(position)}`,
      `actionPosition${capitalize(actionPosition)}`,
    ],
    titleWrap: ['titleWrap'],
    title: ['title'],
    subtitle: ['subtitle'],
    actionIcon: ['actionIcon'],
  };

  return composeClasses(slots, getImageListItemBarUtilityClass, classes);
};

const ImageListItemBarRoot = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, styles[`position${capitalize(ownerState.position)}`]];
  },
})(
  memoTheme(({ theme }) => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      variants: [
        {
          props: {
            position: 'bottom',
          },
          style: {
            bottom: 0,
          },
        },
        {
          props: {
            position: 'top',
          },
          style: {
            top: 0,
          },
        },
        {
          props: {
            position: 'below',
          },
          style: {
            position: 'relative',
            background: 'transparent',
            alignItems: 'normal',
          },
        },
      ],
    };
  }),
);

const ImageListItemBarTitleWrap = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'TitleWrap',
})(
  memoTheme(({ theme }) => {
    return {
      flexGrow: 1,
      padding: '12px 16px',
      color: (theme.vars || theme).palette.common.white,
      overflow: 'hidden',
      variants: [
        {
          props: {
            position: 'below',
          },
          style: {
            padding: '6px 0 12px',
            color: 'inherit',
          },
        },
        {
          props: ({ ownerState }) => ownerState.actionIcon && ownerState.actionPosition === 'left',
          style: {
            paddingLeft: 0,
          },
        },
        {
          props: ({ ownerState }) => ownerState.actionIcon && ownerState.actionPosition === 'right',
          style: {
            paddingRight: 0,
          },
        },
      ],
    };
  }),
);

const ImageListItemBarTitle = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Title',
})(
  memoTheme(({ theme }) => {
    return {
      fontSize: theme.typography.pxToRem(16),
      lineHeight: '24px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    };
  }),
);

const ImageListItemBarSubtitle = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'Subtitle',
})(
  memoTheme(({ theme }) => {
    return {
      fontSize: theme.typography.pxToRem(12),
      lineHeight: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    };
  }),
);

const ImageListItemBarActionIcon = styled('div', {
  name: 'MuiImageListItemBar',
  slot: 'ActionIcon',
})({
  variants: [
    {
      props: {
        actionPosition: 'left',
      },
      style: {
        order: -1,
      },
    },
  ],
});

const ImageListItemBar = React.forwardRef(function ImageListItemBar(inProps, ref) {
  const props = useDefaultProps({
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

  const ownerState = { ...props, position, actionPosition };

  const classes = useUtilityClasses(ownerState);

  return (
    <ImageListItemBarRoot
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      <ImageListItemBarTitleWrap ownerState={ownerState} className={classes.titleWrap}>
        <ImageListItemBarTitle className={classes.title}>{title}</ImageListItemBarTitle>
        {subtitle ? (
          <ImageListItemBarSubtitle className={classes.subtitle}>
            {subtitle}
          </ImageListItemBarSubtitle>
        ) : null}
      </ImageListItemBarTitleWrap>
      {actionIcon ? (
        <ImageListItemBarActionIcon ownerState={ownerState} className={classes.actionIcon}>
          {actionIcon}
        </ImageListItemBarActionIcon>
      ) : null}
    </ImageListItemBarRoot>
  );
});

ImageListItemBar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Title to be displayed.
   */
  title: PropTypes.node,
};

export default ImageListItemBar;
