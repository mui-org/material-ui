'use client';
// @inheritedComponent Tooltip
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { emphasize } from '@mui/system/colorManipulator';
import { styled, useTheme } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Fab from '../Fab';
import Tooltip from '../Tooltip';
import { getReducedMotionStyles, getTransitionStyles } from '../transitions/utils';
import useReducedMotion from '../transitions/useReducedMotion';
import capitalize from '../utils/capitalize';
import speedDialActionClasses, { getSpeedDialActionUtilityClass } from './speedDialActionClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { open, tooltipPlacement, classes } = ownerState;

  const slots = {
    fab: ['fab', !open && 'fabClosed'],
    staticTooltip: [
      'staticTooltip',
      `tooltipPlacement${capitalize(tooltipPlacement)}`,
      !open && 'staticTooltipClosed',
    ],
    staticTooltipLabel: ['staticTooltipLabel'],
  };

  return composeClasses(slots, getSpeedDialActionUtilityClass, classes);
};

const SpeedDialActionFab = styled(Fab, {
  name: 'MuiSpeedDialAction',
  slot: 'Fab',
  skipVariantsResolver: false,
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.fab, !ownerState.open && styles.fabClosed];
  },
})(
  memoTheme(({ theme }) => ({
    margin: 8,
    color: (theme.vars || theme).palette.text.secondary,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    '&:hover': {
      backgroundColor: theme.vars
        ? theme.vars.palette.SpeedDialAction.fabHoverBg
        : emphasize(theme.palette.background.paper, 0.15),
    },
    transition: `${theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
    })}, opacity 0.8s`,
    ...getReducedMotionStyles(theme),
    opacity: 1,
    variants: [
      {
        props: ({ ownerState }) => !ownerState.open,
        style: {
          opacity: 0,
          transform: 'scale(0)',
        },
      },
    ],
  })),
);

const SpeedDialActionStaticTooltip = styled('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltip',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.staticTooltip,
      !ownerState.open && styles.staticTooltipClosed,
      styles[`tooltipPlacement${capitalize(ownerState.tooltipPlacement)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
      ...getTransitionStyles(theme, ['transform', 'opacity'], {
        duration: theme.transitions.duration.shorter,
      }),
      opacity: 1,
    },
    variants: [
      {
        props: ({ ownerState }) => !ownerState.open,
        style: {
          [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
            opacity: 0,
            transform: 'scale(0.5)',
          },
        },
      },
      {
        props: {
          tooltipPlacement: 'left',
        },
        style: {
          [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
            transformOrigin: '100% 50%',
            right: '100%',
            marginRight: 8,
          },
        },
      },
      {
        props: {
          tooltipPlacement: 'right',
        },
        style: {
          [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
            transformOrigin: '0% 50%',
            left: '100%',
            marginLeft: 8,
          },
        },
      },
      {
        props: {
          tooltipPlacement: 'top',
        },
        style: {
          // The label sits in a zero-height row, so it widens the action to keep
          // neighboring labels apart without making the action taller.
          display: 'grid',
          gridTemplateRows: '0 auto',
          justifyItems: 'center',
          // Stay as tall as the Fab when a sibling action is larger.
          alignSelf: 'center',
          [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
            position: 'static',
            alignSelf: 'end',
            transformOrigin: '50% 100%',
            marginBottom: 8,
            marginLeft: 8,
            marginRight: 8,
          },
        },
      },
      {
        props: {
          tooltipPlacement: 'bottom',
        },
        style: {
          display: 'grid',
          gridTemplateRows: 'auto 0',
          justifyItems: 'center',
          alignSelf: 'center',
          [`& .${speedDialActionClasses.staticTooltipLabel}`]: {
            position: 'static',
            gridRow: 2,
            alignSelf: 'start',
            transformOrigin: '50% 0%',
            marginTop: 8,
            marginLeft: 8,
            marginRight: 8,
          },
        },
      },
    ],
  })),
);

const SpeedDialActionStaticTooltipLabel = styled('span', {
  name: 'MuiSpeedDialAction',
  slot: 'StaticTooltipLabel',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    ...theme.typography.body1,
    backgroundColor: (theme.vars || theme).palette.background.paper,
    borderRadius: (theme.vars || theme).shape.borderRadius,
    boxShadow: (theme.vars || theme).shadows[1],
    color: (theme.vars || theme).palette.text.secondary,
    padding: '4px 16px',
    wordBreak: 'keep-all',
  })),
);

const SpeedDialAction = React.forwardRef(function SpeedDialAction(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSpeedDialAction' });
  const { className, delay = 0, icon, id, open, slots = {}, slotProps = {}, ...other } = props;
  const theme = useTheme();
  const reducedMotion = useReducedMotion(theme.motion.reducedMotion, false);

  const resolvedTooltipSlotProps =
    typeof slotProps.tooltip === 'function' ? slotProps.tooltip(props) : (slotProps.tooltip ?? {});
  // The label is styled per side: compound placements like `top-start` use their side,
  // and placements without one, like `auto`, fall back to the left.
  const placementSide = String(resolvedTooltipSlotProps.placement).split('-')[0];
  const tooltipPlacement = ['top', 'right', 'bottom', 'left'].includes(placementSide)
    ? placementSide
    : 'left';

  const ownerState = { ...props, tooltipPlacement };
  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [tooltipOpen, setTooltipOpen] = React.useState(resolvedTooltipSlotProps.open ?? false);

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const transitionTiming = reducedMotion.getTransitionTiming({
    duration: 0,
    delay: `${delay}ms`,
  });

  const transitionStyle = {
    transitionDelay: transitionTiming.delay,
  };

  const [FabSlot, fabSlotProps] = useSlot('fab', {
    elementType: SpeedDialActionFab,
    externalForwardedProps,
    ownerState,
    shouldForwardComponentProp: true,
    className: clsx(classes.fab, className),
    additionalProps: {
      style: transitionStyle,
      tabIndex: -1,
      role: 'menuitem',
      size: 'small',
    },
  });

  const [TooltipSlot, tooltipSlotProps] = useSlot('tooltip', {
    elementType: Tooltip,
    externalForwardedProps,
    shouldForwardComponentProp: true,
    ref,
    additionalProps: {
      id,
    },
    ownerState,
    getSlotProps: (handlers) => ({
      ...handlers,
      onClose: (event) => {
        handlers.onClose?.(event);
        handleTooltipClose();
      },
      onOpen: (event) => {
        handlers.onOpen?.(event);
        handleTooltipOpen();
      },
    }),
  });

  const [StaticTooltipSlot, staticTooltipSlotProps] = useSlot('staticTooltip', {
    elementType: SpeedDialActionStaticTooltip,
    externalForwardedProps,
    ownerState,
    ref,
    className: classes.staticTooltip,
    additionalProps: {
      id,
    },
  });

  const [StaticTooltipLabelSlot, staticTooltipLabelSlotProps] = useSlot('staticTooltipLabel', {
    elementType: SpeedDialActionStaticTooltipLabel,
    externalForwardedProps,
    ownerState,
    className: classes.staticTooltipLabel,
    additionalProps: {
      style: transitionStyle,
      id: `${id}-label`,
    },
  });

  const fab = <FabSlot {...fabSlotProps}>{icon}</FabSlot>;

  if (tooltipSlotProps.open) {
    return (
      <StaticTooltipSlot {...staticTooltipSlotProps} {...other}>
        <StaticTooltipLabelSlot {...staticTooltipLabelSlotProps}>
          {tooltipSlotProps.title}
        </StaticTooltipLabelSlot>
        {React.cloneElement(fab, {
          'aria-labelledby': `${id}-label`,
        })}
      </StaticTooltipSlot>
    );
  }

  if (!open && tooltipOpen) {
    setTooltipOpen(false);
  }

  return (
    <TooltipSlot
      {...tooltipSlotProps}
      title={tooltipSlotProps.title}
      open={open && tooltipOpen}
      placement={tooltipSlotProps.placement}
      classes={tooltipSlotProps.classes}
      {...other}
    >
      {fab}
    </TooltipSlot>
  );
});

SpeedDialAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * Adds a transition delay, to allow a series of SpeedDialActions to be animated.
   * @default 0
   */
  delay: PropTypes.number,
  /**
   * The icon to display in the SpeedDial Fab.
   */
  icon: PropTypes.node,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: PropTypes.string,
  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    fab: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    staticTooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    staticTooltipLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    tooltip: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    fab: PropTypes.elementType,
    staticTooltip: PropTypes.elementType,
    staticTooltipLabel: PropTypes.elementType,
    tooltip: PropTypes.elementType,
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

export default SpeedDialAction;
