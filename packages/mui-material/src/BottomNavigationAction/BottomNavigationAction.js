'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { applyInsetFocusVisible } from '../styles/focusVisible';
import { useDefaultProps } from '../DefaultPropsProvider';
import ButtonBase from '../ButtonBase';
import unsupportedProp from '../utils/unsupportedProp';
import { getTransitionStyles } from '../transitions/utils';
import bottomNavigationActionClasses, {
  getBottomNavigationActionUtilityClass,
} from './bottomNavigationActionClasses';
import useSlot from '../utils/useSlot';

const useUtilityClasses = (ownerState) => {
  const { classes, showLabel, selected } = ownerState;

  const slots = {
    root: ['root', !showLabel && !selected && 'iconOnly', selected && 'selected'],
    label: ['label', !showLabel && !selected && 'iconOnly', selected && 'selected'],
  };

  return composeClasses(slots, getBottomNavigationActionUtilityClass, classes);
};

const BottomNavigationActionRoot = styled(ButtonBase, {
  name: 'MuiBottomNavigationAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, !ownerState.showLabel && !ownerState.selected && styles.iconOnly];
  },
})(
  memoTheme(({ theme }) => ({
    ...getTransitionStyles(theme, ['color', 'padding-top'], {
      duration: theme.transitions.duration.short,
    }),
    padding: '0px 12px',
    minWidth: 80,
    maxWidth: 168,
    color: (theme.vars || theme).palette.text.secondary,
    flexDirection: 'column',
    flex: '1',
    [`&.${bottomNavigationActionClasses.selected}`]: {
      color: (theme.vars || theme).palette.primary.main,
    },
    ...(theme.focusVisible && applyInsetFocusVisible(1)),
    variants: [
      {
        props: ({ showLabel, selected }) => !showLabel && !selected,
        style: {
          paddingTop: 14,
        },
      },
      {
        props: ({ showLabel, selected, label }) => !showLabel && !selected && !label,
        style: {
          paddingTop: 0,
        },
      },
    ],
  })),
);

const BottomNavigationActionLabel = styled('span', {
  name: 'MuiBottomNavigationAction',
  slot: 'Label',
})(
  memoTheme(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    opacity: 1,
    ...getTransitionStyles(theme, ['font-size', 'opacity'], {
      duration: '0.2s',
      easing: 'ease',
    }),
    transitionDelay: '0.1s',
    [`&.${bottomNavigationActionClasses.selected}`]: {
      fontSize: theme.typography.pxToRem(14),
    },
    variants: [
      {
        props: ({ showLabel, selected }) => !showLabel && !selected,
        style: {
          opacity: 0,
          transitionDelay: '0s',
        },
      },
    ],
  })),
);

const BottomNavigationAction = React.forwardRef(function BottomNavigationAction(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiBottomNavigationAction' });
  const {
    className,
    icon,
    label,
    onChange,
    onClick,
    selected,
    showLabel,
    value,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const handleChange = (event) => {
    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootProps] = useSlot('root', {
    elementType: BottomNavigationActionRoot,
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
      focusRipple: true,
    },
    getSlotProps: (handlers) => ({
      ...handlers,
      onClick: (event) => {
        handlers.onClick?.(event);
        handleChange(event);
      },
    }),
  });

  const [LabelSlot, labelProps] = useSlot('label', {
    elementType: BottomNavigationActionLabel,
    externalForwardedProps,
    ownerState,
    className: classes.label,
  });

  return (
    <RootSlot {...rootProps}>
      {icon}
      <LabelSlot {...labelProps}>{label}</LabelSlot>
    </RootSlot>
  );
});

BottomNavigationAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * This prop isn't supported.
   * Use the `component` prop if you need to change the children structure.
   */
  children: unsupportedProp,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The icon to display.
   */
  icon: PropTypes.node,
  /**
   * The label element.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
  /**
   * If `true`, the component appears selected.
   *
   * `BottomNavigation` sets this on each child from its own `value`.
   */
  selected: PropTypes.bool,
  /**
   * If `true`, the `BottomNavigationAction` will show its label.
   * By default, only the selected `BottomNavigationAction`
   * inside `BottomNavigation` will show its label.
   *
   * The prop defaults to the value (`false`) inherited from the parent BottomNavigation component.
   */
  showLabel: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    label: PropTypes.elementType,
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
  /**
   * You can provide your own value. Otherwise, we fallback to the child position index.
   */
  value: PropTypes.any,
};

export default BottomNavigationAction;
