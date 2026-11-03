'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { applyInsetFocusVisible } from '../styles/focusVisible';
import { useDefaultProps } from '../DefaultPropsProvider';
import cardActionAreaClasses, { getCardActionAreaUtilityClass } from './cardActionAreaClasses';
import ButtonBase from '../ButtonBase';
import useSlot from '../utils/useSlot';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    focusHighlight: ['focusHighlight'],
  };

  return composeClasses(slots, getCardActionAreaUtilityClass, classes);
};

const CardActionAreaRoot = styled(ButtonBase, {
  name: 'MuiCardActionArea',
  slot: 'Root',
})(
  memoTheme(({ theme }) => ({
    display: 'block',
    textAlign: 'inherit',
    borderRadius: 'inherit', // for Safari to work https://github.com/mui/material-ui/issues/36285.
    width: '100%',
    [`&:hover .${cardActionAreaClasses.focusHighlight}`]: {
      opacity: (theme.vars || theme).palette.action.hoverOpacity,
      '@media (hover: none)': {
        opacity: 0,
      },
    },
    ...(theme.focusVisible
      ? // Inset the ring: Card sets overflow:hidden, which clips an outset ring.
        applyInsetFocusVisible(1)
      : {
          [`&.${cardActionAreaClasses.focusVisible} .${cardActionAreaClasses.focusHighlight}`]: {
            opacity: (theme.vars || theme).palette.action.focusOpacity,
          },
        }),
  })),
);

const CardActionAreaFocusHighlight = styled('span', {
  name: 'MuiCardActionArea',
  slot: 'FocusHighlight',
})(
  memoTheme(({ theme }) => ({
    overflow: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 'inherit',
    opacity: 0,
    backgroundColor: 'currentcolor',
    ...getTransitionStyles(theme, 'opacity', {
      duration: theme.transitions.duration.short,
    }),
  })),
);

const CardActionArea = React.forwardRef(function CardActionArea(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiCardActionArea' });
  const {
    children,
    className,
    focusVisibleClassName,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootProps] = useSlot('root', {
    elementType: CardActionAreaRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    shouldForwardComponentProp: true,
    ownerState,
    ref,
    className: clsx(classes.root, className),
    additionalProps: {
      internalNativeButton: true,
      focusVisibleClassName: clsx(focusVisibleClassName, classes.focusVisible),
    },
  });

  const [FocusHighlightSlot, focusHighlightProps] = useSlot('focusHighlight', {
    elementType: CardActionAreaFocusHighlight,
    externalForwardedProps,
    ownerState,
    className: classes.focusHighlight,
  });

  return (
    <RootSlot {...rootProps}>
      {children}
      <FocusHighlightSlot {...focusHighlightProps} />
    </RootSlot>
  );
});

CardActionArea.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
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
   * @ignore
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    focusHighlight: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    focusHighlight: PropTypes.elementType,
    root: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default CardActionArea;
