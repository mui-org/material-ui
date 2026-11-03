'use client';
// @inheritedComponent IconButton
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import SwitchBase from '../internal/SwitchBase';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import switchClasses, { getSwitchUtilityClass } from './switchClasses';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';
import { outsetFocusRing } from '../styles/focusVisible';
import { mergeSlotProps } from '../utils';
import useSlot from '../utils/useSlot';
import { getTransitionStyles } from '../transitions/utils';

const useUtilityClasses = (ownerState) => {
  const { classes, edge, size, color, checked, disabled } = ownerState;

  const slots = {
    root: ['root', edge && `edge${capitalize(edge)}`, `size${capitalize(size)}`],
    switchBase: [
      'switchBase',
      `color${capitalize(color)}`,
      checked && 'checked',
      disabled && 'disabled',
    ],
    thumb: ['thumb'],
    track: ['track'],
    input: ['input'],
  };

  const composedClasses = composeClasses(slots, getSwitchUtilityClass, classes);

  return {
    ...classes, // forward the disabled and checked classes to the SwitchBase
    ...composedClasses,
  };
};

const SwitchRoot = styled('span', {
  name: 'MuiSwitch',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.edge && styles[`edge${capitalize(ownerState.edge)}`],
      styles[`size${capitalize(ownerState.size)}`],
    ];
  },
})({
  display: 'inline-flex',
  width: 34 + 12 * 2,
  height: 14 + 12 * 2,
  overflow: 'hidden',
  padding: 12,
  boxSizing: 'border-box',
  position: 'relative',
  flexShrink: 0,
  zIndex: 0, // Reset the stacking context.
  verticalAlign: 'middle', // For correct alignment with the text.
  '@media print': {
    colorAdjust: 'exact',
  },
  variants: [
    {
      props: { edge: 'start' },
      style: { marginLeft: -8 },
    },
    {
      props: { edge: 'end' },
      style: { marginRight: -8 },
    },
    {
      props: { size: 'small' },
      style: {
        width: 40,
        height: 24,
        padding: 7,
        [`& .${switchClasses.thumb}`]: {
          width: 16,
          height: 16,
        },
        [`& .${switchClasses.switchBase}`]: {
          padding: 4,
          [`&.${switchClasses.checked}`]: {
            transform: 'translateX(16px)',
          },
        },
      },
    },
  ],
});

const SwitchSwitchBase = styled(SwitchBase, {
  name: 'MuiSwitch',
  slot: 'SwitchBase',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.switchBase,
      { [`& .${switchClasses.input}`]: styles.input },
      ownerState.color !== 'default' && styles[`color${capitalize(ownerState.color)}`],
    ];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Render above the focus ripple.
    color: theme.vars
      ? theme.vars.palette.Switch.defaultColor
      : `${theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.grey[300]}`,
    ...getTransitionStyles(theme, ['left', 'transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    [`&.${switchClasses.checked}`]: {
      transform: 'translateX(20px)',
    },
    [`&.${switchClasses.disabled}`]: {
      color: theme.vars
        ? theme.vars.palette.Switch.defaultDisabledColor
        : `${theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]}`,
    },
    ...(theme.focusVisible
      ? {
          // when focusVisible is enabled, the styles must not rely on `opacity` so that the ring is visible on the track slot.
          [`&.${buttonBaseClasses.focusVisible} ~ .${switchClasses.track}`]: {
            ...outsetFocusRing,
            ...theme.focusVisible,
          },
          // mirrors the non-focusVisible `opacity: 0.5`; must stay BEFORE the disabled rule so
          // disabled wins the checked+disabled combination at equal specificity.
          [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
            backgroundColor: theme.alpha(
              theme.vars
                ? theme.vars.palette.common.onBackground
                : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
              0.5,
            ),
          },
          [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
            backgroundColor: theme.alpha(
              theme.vars
                ? theme.vars.palette.common.onBackground
                : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
              theme.vars
                ? theme.vars.opacity.switchTrackDisabled
                : `${theme.palette.mode === 'light' ? 0.12 : 0.2}`,
            ),
          },
        }
      : {
          [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
            opacity: 0.5,
          },
          [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
            opacity: theme.vars
              ? theme.vars.opacity.switchTrackDisabled
              : `${theme.palette.mode === 'light' ? 0.12 : 0.2}`,
          },
        }),
    [`& .${switchClasses.input}`]: {
      left: '-100%',
      width: '300%',
    },
  })),
  memoTheme(({ theme }) => ({
    '&:hover': {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.action.active,
        (theme.vars || theme).palette.action.hoverOpacity,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter(['light'])) // check all the used fields in the style below
        .map(([color]) => ({
          props: { color },
          style: {
            [`&.${switchClasses.checked}`]: {
              color: (theme.vars || theme).palette[color].main,
              '&:hover': {
                backgroundColor: theme.alpha(
                  (theme.vars || theme).palette[color].main,
                  (theme.vars || theme).palette.action.hoverOpacity,
                ),
                '@media (hover: none)': {
                  backgroundColor: 'transparent',
                },
              },
              [`&.${switchClasses.disabled}`]: {
                color: theme.vars
                  ? theme.vars.palette.Switch[`${color}DisabledColor`]
                  : `${
                      theme.palette.mode === 'light'
                        ? theme.lighten(theme.palette[color].main, 0.62)
                        : theme.darken(theme.palette[color].main, 0.55)
                    }`,
              },
            },
            [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
              backgroundColor: (theme.vars || theme).palette[color].main,
            },
            ...(theme.focusVisible && {
              [`&.${switchClasses.checked} + .${switchClasses.track}`]: {
                backgroundColor: theme.alpha((theme.vars || theme).palette[color].main, 0.5),
              },
              [`&.${switchClasses.disabled} + .${switchClasses.track}`]: {
                backgroundColor: theme.alpha(
                  theme.vars
                    ? theme.vars.palette.common.onBackground
                    : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
                  theme.vars
                    ? theme.vars.opacity.switchTrackDisabled
                    : `${theme.palette.mode === 'light' ? 0.12 : 0.2}`,
                ),
              },
              [`&.${switchClasses.checked}.${switchClasses.disabled} + .${switchClasses.track}`]: {
                backgroundColor: theme.alpha(
                  (theme.vars || theme).palette[color].main,
                  theme.vars
                    ? theme.vars.opacity.switchTrackDisabled
                    : `${theme.palette.mode === 'light' ? 0.12 : 0.2}`,
                ),
              },
            }),
          },
        })),
    ],
  })),
);

const SwitchTrack = styled('span', {
  name: 'MuiSwitch',
  slot: 'Track',
})(
  memoTheme(({ theme }) => ({
    height: '100%',
    width: '100%',
    borderRadius: 14 / 2,
    zIndex: -1,
    ...getTransitionStyles(theme, ['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest,
    }),
    '@media (forced-colors: active)': {
      boxSizing: 'border-box',
      border: '1px solid ButtonBorder',
    },
    ...(theme.focusVisible
      ? {
          backgroundColor: theme.alpha(
            theme.vars
              ? theme.vars.palette.common.onBackground
              : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
            theme.vars
              ? theme.vars.opacity.switchTrack
              : `${theme.palette.mode === 'light' ? 0.38 : 0.3}`,
          ),
        }
      : {
          backgroundColor: theme.vars
            ? theme.vars.palette.common.onBackground
            : `${theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white}`,
          opacity: theme.vars
            ? theme.vars.opacity.switchTrack
            : `${theme.palette.mode === 'light' ? 0.38 : 0.3}`,
        }),
  })),
);

const SwitchThumb = styled('span', {
  name: 'MuiSwitch',
  slot: 'Thumb',
})(
  memoTheme(({ theme }) => ({
    boxShadow: (theme.vars || theme).shadows[1],
    backgroundColor: 'currentColor',
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: 20,
    height: 20,
    borderRadius: '50%',
  })),
);

const Switch = React.forwardRef(function Switch(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSwitch' });
  const {
    className,
    color = 'primary',
    edge = false,
    size = 'medium',
    sx,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    edge,
    size,
  };

  const classes = useUtilityClasses(ownerState);
  const externalInputProps = slotProps.input;

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    className: clsx(classes.root, className),
    elementType: SwitchRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      sx,
    },
  });

  const [ThumbSlot, thumbSlotProps] = useSlot('thumb', {
    className: classes.thumb,
    elementType: SwitchThumb,
    externalForwardedProps,
    ownerState,
  });

  const icon = <ThumbSlot {...thumbSlotProps} />;

  const [TrackSlot, trackSlotProps] = useSlot('track', {
    className: classes.track,
    elementType: SwitchTrack,
    externalForwardedProps,
    ownerState,
  });

  return (
    <RootSlot {...rootSlotProps}>
      <SwitchSwitchBase
        type="checkbox"
        icon={icon}
        checkedIcon={icon}
        ref={ref}
        ownerState={ownerState}
        {...other}
        classes={{
          ...classes,
          root: classes.switchBase,
        }}
        slots={{
          ...(slots.switchBase && { root: slots.switchBase }),
          ...(slots.input && { input: slots.input }),
        }}
        slotProps={{
          ...(slotProps.switchBase && {
            root:
              typeof slotProps.switchBase === 'function'
                ? slotProps.switchBase(ownerState)
                : slotProps.switchBase,
          }),
          input: mergeSlotProps(
            typeof externalInputProps === 'function'
              ? externalInputProps(ownerState)
              : externalInputProps,
            {
              role: 'switch',
            },
          ),
        }}
      />
      <TrackSlot {...trackSlotProps} />
    </RootSlot>
  );
});

Switch.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default checked state. Use when the component is not controlled.
   */
  defaultChecked: PropTypes.bool,
  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: PropTypes.oneOf(['end', 'start', false]),
  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,
  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,
  /**
   * Callback fired when the state is changed.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required: PropTypes.bool,
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    switchBase: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    root: PropTypes.elementType,
    switchBase: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType,
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
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value: PropTypes.any,
};

export default Switch;
