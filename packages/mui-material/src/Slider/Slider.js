'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import chainPropTypes from '@mui/utils/chainPropTypes';
import composeClasses from '@mui/utils/composeClasses';
import { useRtl } from '@mui/system/RtlProvider';
import isHostComponent from '@mui/utils/isHostComponent';
import { useSlider, valueToPercent } from './useSlider';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import useSlot from '../utils/useSlot';
import slotShouldForwardProp from '../styles/slotShouldForwardProp';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import BaseSliderValueLabel from './SliderValueLabel';
import sliderClasses, { getSliderUtilityClass } from './sliderClasses';
import { getTransitionStyles } from '../transitions/utils';
import { outsetFocusRing } from '../styles/focusVisible';

function Identity(x) {
  return x;
}

export const SliderRoot = styled('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      styles[`color${capitalize(ownerState.color)}`],
      ownerState.size !== 'medium' && styles[`size${capitalize(ownerState.size)}`],
      ownerState.marked && styles.marked,
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.track === 'inverted' && styles.trackInverted,
      ownerState.track === false && styles.trackFalse,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    borderRadius: 12,
    boxSizing: 'content-box',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    touchAction: 'none',
    WebkitTapHighlightColor: 'transparent',
    '@media print': {
      colorAdjust: 'exact',
    },
    [`&.${sliderClasses.disabled}`]: {
      pointerEvents: 'none',
      cursor: 'default',
      color: (theme.vars || theme).palette.grey[400],
    },
    [`&.${sliderClasses.dragging}`]: {
      [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
        transition: 'none',
      },
    },
    variants: [
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            color: (theme.vars || theme).palette[color].main,
          },
        })),
      {
        props: { orientation: 'horizontal' },
        style: {
          height: 4,
          width: '100%',
          padding: '13px 0',
          // The primary input mechanism of the device includes a pointing device of limited accuracy.
          '@media (pointer: coarse)': {
            // Reach 42px touch target, about ~8mm on screen.
            padding: '20px 0',
          },
        },
      },
      {
        props: { orientation: 'horizontal', size: 'small' },
        style: {
          height: 2,
        },
      },
      {
        props: { orientation: 'horizontal', marked: true },
        style: {
          marginBottom: 20,
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          height: '100%',
          width: 4,
          padding: '0 13px',
          // The primary input mechanism of the device includes a pointing device of limited accuracy.
          '@media (pointer: coarse)': {
            // Reach 42px touch target, about ~8mm on screen.
            padding: '0 20px',
          },
        },
      },
      {
        props: { orientation: 'vertical', size: 'small' },
        style: {
          width: 2,
        },
      },
      {
        props: { orientation: 'vertical', marked: true },
        style: {
          marginRight: 44,
        },
      },
    ],
  })),
);

export const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
})({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
  '@media (forced-colors: active)': {
    border: '1px solid transparent',
    boxSizing: 'border-box',
  },
  variants: [
    {
      props: { orientation: 'horizontal' },
      style: {
        width: '100%',
        height: 'inherit',
        top: '50%',
        transform: 'translateY(-50%)',
      },
    },
    {
      props: { orientation: 'vertical' },
      style: {
        height: '100%',
        width: 'inherit',
        left: '50%',
        transform: 'translateX(-50%)',
      },
    },
    {
      props: { track: 'inverted' },
      style: {
        opacity: 1,
      },
    },
  ],
});

export const SliderTrack = styled('span', {
  name: 'MuiSlider',
  slot: 'Track',
})(
  memoTheme(({ theme }) => {
    return {
      display: 'block',
      position: 'absolute',
      borderRadius: 'inherit',
      border: '1px solid currentColor',
      backgroundColor: 'currentColor',
      ...getTransitionStyles(theme, ['left', 'width', 'bottom', 'height'], {
        duration: theme.transitions.duration.shortest,
      }),
      variants: [
        {
          props: { size: 'small' },
          style: {
            '@media (forced-colors: none)': {
              border: 'none',
            },
          },
        },
        {
          props: { orientation: 'horizontal' },
          style: {
            height: 'inherit',
            top: '50%',
            transform: 'translateY(-50%)',
          },
        },
        {
          props: { orientation: 'vertical' },
          style: {
            width: 'inherit',
            left: '50%',
            transform: 'translateX(-50%)',
          },
        },
        {
          props: { track: false },
          style: {
            display: 'none',
          },
        },
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter())
          .map(([color]) => ({
            props: { color, track: 'inverted' },
            style: {
              ...(theme.vars
                ? {
                    backgroundColor: theme.vars.palette.Slider[`${color}Track`],
                    borderColor: theme.vars.palette.Slider[`${color}Track`],
                  }
                : {
                    backgroundColor: theme.lighten(theme.palette[color].main, 0.62),
                    borderColor: theme.lighten(theme.palette[color].main, 0.62),
                    ...theme.applyStyles('dark', {
                      backgroundColor: theme.darken(theme.palette[color].main, 0.5),
                    }),
                    ...theme.applyStyles('dark', {
                      borderColor: theme.darken(theme.palette[color].main, 0.5),
                    }),
                  }),
            },
          })),
      ],
    };
  }),
);

export const SliderThumb = styled('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    width: 20,
    height: 20,
    boxSizing: 'border-box',
    borderRadius: '50%',
    outline: 0,
    backgroundColor: 'currentColor',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...getTransitionStyles(theme, ['box-shadow', 'left', 'bottom'], {
      duration: theme.transitions.duration.shortest,
    }),
    '@media (forced-colors: active)': {
      border: '1px solid ButtonBorder',
    },
    '&::before': {
      position: 'absolute',
      content: '""',
      borderRadius: 'inherit',
      width: '100%',
      height: '100%',
      boxShadow: (theme.vars || theme).shadows[2],
    },
    '&::after': {
      position: 'absolute',
      content: '""',
      borderRadius: '50%',
      // 42px is the hit target
      width: 42,
      height: 42,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    [`&.${sliderClasses.disabled}`]: {
      '&:hover': {
        boxShadow: 'none',
      },
    },
    ...(theme.focusVisible && {
      [`&.${sliderClasses.focusVisible}`]: { ...outsetFocusRing, ...theme.focusVisible },
    }),
    variants: [
      {
        props: { size: 'small' },
        style: {
          width: 12,
          height: 12,
          '&::before': {
            boxShadow: 'none',
          },
        },
      },
      {
        props: { orientation: 'horizontal' },
        style: {
          top: '50%',
          transform: 'translate(-50%, -50%)',
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          left: '50%',
          transform: 'translate(-50%, 50%)',
        },
      },
      ...Object.entries(theme.palette)
        .filter(createSimplePaletteValueFilter())
        .map(([color]) => ({
          props: { color },
          style: {
            '&:hover': {
              boxShadow: `0px 0px 0px 8px ${theme.alpha((theme.vars || theme).palette[color].main, 0.16)}`,
              '@media (hover: none)': {
                boxShadow: 'none',
              },
            },
            ...(!theme.focusVisible && {
              [`&.${sliderClasses.focusVisible}`]: {
                boxShadow: `0px 0px 0px 8px ${theme.alpha((theme.vars || theme).palette[color].main, 0.16)}`,
                '@media (hover: none)': {
                  boxShadow: 'none',
                },
              },
            }),
            [`&.${sliderClasses.active}`]: {
              boxShadow: `0px 0px 0px 14px ${theme.alpha((theme.vars || theme).palette[color].main, 0.16)}`,
            },
          },
        })),
    ],
  })),
);

const SliderValueLabel = styled(BaseSliderValueLabel, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
})(
  memoTheme(({ theme }) => ({
    zIndex: 1,
    whiteSpace: 'nowrap',
    ...theme.typography.body2,
    fontWeight: 500,
    ...getTransitionStyles(theme, ['transform'], {
      duration: theme.transitions.duration.shortest,
    }),
    position: 'absolute',
    backgroundColor: (theme.vars || theme).palette.grey[600],
    borderRadius: 2,
    color: (theme.vars || theme).palette.common.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem 0.75rem',
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          transform: 'translateY(-100%) scale(0)',
          top: '-10px',
          transformOrigin: 'bottom center',
          '&::before': {
            position: 'absolute',
            content: '""',
            width: 8,
            height: 8,
            transform: 'translate(-50%, 50%) rotate(45deg)',
            backgroundColor: 'inherit',
            bottom: 0,
            left: '50%',
          },
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: 'translateY(-100%) scale(1)',
          },
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          transform: 'translateY(-50%) scale(0)',
          right: '30px',
          top: '50%',
          transformOrigin: 'right center',
          '&::before': {
            position: 'absolute',
            content: '""',
            width: 8,
            height: 8,
            transform: 'translate(-50%, -50%) rotate(45deg)',
            backgroundColor: 'inherit',
            right: -8,
            top: '50%',
          },
          [`&.${sliderClasses.valueLabelOpen}`]: {
            transform: 'translateY(-50%) scale(1)',
          },
        },
      },
      {
        props: { size: 'small' },
        style: {
          fontSize: theme.typography.pxToRem(12),
          padding: '0.25rem 0.5rem',
        },
      },
      {
        props: { orientation: 'vertical', size: 'small' },
        style: {
          right: '20px',
        },
      },
    ],
  })),
);

SliderValueLabel.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.element.isRequired,
  /**
   * @ignore
   */
  index: PropTypes.number.isRequired,
  /**
   * @ignore
   */
  open: PropTypes.bool.isRequired,
  /**
   * @ignore
   */
  value: PropTypes.node,
};

export { SliderValueLabel };

export const SliderMark = styled('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'markActive',
  overridesResolver: (props, styles) => {
    const { markActive } = props;

    return [styles.mark, markActive && styles.markActive];
  },
})(
  memoTheme(({ theme }) => ({
    position: 'absolute',
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: 'currentColor',
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          top: '50%',
          transform: 'translate(-1px, -50%)',
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          left: '50%',
          transform: 'translate(-50%, 1px)',
        },
      },
      {
        props: { markActive: true },
        style: {
          backgroundColor: (theme.vars || theme).palette.background.paper,
          opacity: 0.8,
        },
      },
    ],
  })),
);

export const SliderMarkLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== 'markLabelActive',
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.body2,
    color: (theme.vars || theme).palette.text.secondary,
    position: 'absolute',
    whiteSpace: 'nowrap',
    variants: [
      {
        props: { orientation: 'horizontal' },
        style: {
          top: 30,
          transform: 'translateX(-50%)',
          '@media (pointer: coarse)': {
            top: 40,
          },
        },
      },
      {
        props: { orientation: 'vertical' },
        style: {
          left: 36,
          transform: 'translateY(50%)',
          '@media (pointer: coarse)': {
            left: 44,
          },
        },
      },
      {
        props: { markLabelActive: true },
        style: {
          color: (theme.vars || theme).palette.text.primary,
        },
      },
    ],
  })),
);

const useUtilityClasses = (ownerState) => {
  const { disabled, dragging, marked, orientation, track, classes, color, size } = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      dragging && 'dragging',
      marked && 'marked',
      orientation === 'vertical' && 'vertical',
      track === 'inverted' && 'trackInverted',
      track === false && 'trackFalse',
      color && `color${capitalize(color)}`,
      size && `size${capitalize(size)}`,
    ],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    thumb: ['thumb', disabled && 'disabled'],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible'],
  };

  return composeClasses(slots, getSliderUtilityClass, classes);
};

const Forward = ({ children }) => children;

const Slider = React.forwardRef(function Slider(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSlider' });

  const isRtl = useRtl();

  const {
    'aria-label': ariaLabel,
    'aria-valuetext': ariaValuetext,
    'aria-labelledby': ariaLabelledby,
    color = 'primary',
    classes: classesProp,
    className,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    orientation = 'horizontal',
    shiftStep = 10,
    size = 'medium',
    step = 1,
    scale = Identity,
    slotProps = {},
    slots = {},
    tabIndex,
    track = 'normal',
    value: valueProp,
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity,
    ...other
  } = props;

  const ownerState = {
    ...props,
    isRtl,
    max,
    min,
    classes: classesProp,
    disabled,
    disableSwap,
    orientation,
    marks: marksProp,
    color,
    size,
    step,
    shiftStep,
    scale,
    track,
    valueLabelDisplay,
    valueLabelFormat,
  };

  const {
    axisProps,
    getRootProps,
    getHiddenInputProps,
    getThumbProps,
    open,
    active,
    axis,
    focusedThumbIndex,
    range,
    dragging,
    marks,
    values,
    trackOffset,
    trackLeap,
    getThumbStyle,
  } = useSlider({ ...ownerState, rootRef: ref });

  ownerState.marked = marks.length > 0 && marks.some((mark) => mark.label);
  ownerState.dragging = dragging;
  ownerState.focusedThumbIndex = focusedThumbIndex;

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootProps] = useSlot('root', {
    elementType: SliderRoot,
    getSlotProps: getRootProps,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    ownerState,
    className: [classes.root, className],
  });

  const [RailSlot, railProps] = useSlot('rail', {
    elementType: SliderRail,
    externalForwardedProps,
    ownerState,
    className: classes.rail,
  });

  const [TrackSlot, trackProps] = useSlot('track', {
    elementType: SliderTrack,
    externalForwardedProps,
    additionalProps: {
      style: {
        ...axisProps[axis].offset(trackOffset),
        ...axisProps[axis].leap(trackLeap),
      },
    },
    ownerState,
    className: classes.track,
  });

  const [ThumbSlot, thumbProps] = useSlot('thumb', {
    elementType: SliderThumb,
    getSlotProps: getThumbProps,
    externalForwardedProps,
    ownerState,
    className: classes.thumb,
  });

  const [ValueLabelSlot, valueLabelProps] = useSlot('valueLabel', {
    elementType: SliderValueLabel,
    externalForwardedProps,
    ownerState,
    className: classes.valueLabel,
  });

  const [MarkSlot, markProps] = useSlot('mark', {
    elementType: SliderMark,
    externalForwardedProps,
    ownerState,
    className: classes.mark,
  });

  const [MarkLabelSlot, markLabelProps] = useSlot('markLabel', {
    elementType: SliderMarkLabel,
    externalForwardedProps,
    ownerState,
    className: classes.markLabel,
  });

  const [InputSliderSlot, inputSliderProps] = useSlot('input', {
    elementType: 'input',
    getSlotProps: getHiddenInputProps,
    externalForwardedProps,
    ownerState,
  });

  return (
    <RootSlot {...rootProps}>
      <RailSlot {...railProps} />
      <TrackSlot {...trackProps} />
      {marks
        .filter((mark) => mark.value >= min && mark.value <= max)
        .map((mark, index) => {
          const percent = valueToPercent(mark.value, min, max);
          const style = axisProps[axis].offset(percent);

          let markActive;
          if (track === false) {
            markActive = values.includes(mark.value);
          } else {
            markActive =
              (track === 'normal' &&
                (range
                  ? mark.value >= values[0] && mark.value <= values[values.length - 1]
                  : mark.value <= values[0])) ||
              (track === 'inverted' &&
                (range
                  ? mark.value <= values[0] || mark.value >= values[values.length - 1]
                  : mark.value >= values[0]));
          }

          return (
            <React.Fragment key={index}>
              <MarkSlot
                data-index={index}
                {...markProps}
                {...(!isHostComponent(MarkSlot) && {
                  markActive,
                })}
                style={{ ...style, ...markProps.style }}
                className={clsx(markProps.className, {
                  [classes.markActive]: markActive,
                })}
              />
              {mark.label != null ? (
                <MarkLabelSlot
                  aria-hidden
                  data-index={index}
                  {...markLabelProps}
                  {...(!isHostComponent(MarkLabelSlot) && {
                    markLabelActive: markActive,
                  })}
                  style={{ ...style, ...markLabelProps.style }}
                  className={clsx(classes.markLabel, markLabelProps.className, {
                    [classes.markLabelActive]: markActive,
                  })}
                >
                  {mark.label}
                </MarkLabelSlot>
              ) : null}
            </React.Fragment>
          );
        })}
      {values.map((value, index) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis].offset(percent);

        const ValueLabelComponent = valueLabelDisplay === 'off' ? Forward : ValueLabelSlot;

        return (
          /* TODO v6: Change component structure. It will help in avoiding the complicated React.cloneElement API added in SliderValueLabel component. Should be: Thumb -> Input, ValueLabel. Follow Joy UI's Slider structure. */
          <ValueLabelComponent
            key={index}
            {...(!isHostComponent(ValueLabelComponent) && {
              valueLabelFormat,
              valueLabelDisplay,
              value:
                typeof valueLabelFormat === 'function'
                  ? valueLabelFormat(scale(value), index)
                  : valueLabelFormat,
              index,
              open: open === index || active === index || valueLabelDisplay === 'on',
              disabled,
            })}
            {...valueLabelProps}
          >
            <ThumbSlot
              data-index={index}
              {...thumbProps}
              className={clsx(classes.thumb, thumbProps.className, {
                [classes.active]: active === index,
                [classes.focusVisible]: focusedThumbIndex === index,
              })}
              style={{
                ...style,
                ...getThumbStyle(index),
                ...thumbProps.style,
              }}
            >
              <InputSliderSlot
                data-index={index}
                aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
                aria-valuenow={scale(value)}
                aria-labelledby={ariaLabelledby}
                aria-valuetext={
                  getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext
                }
                value={values[index]}
                {...inputSliderProps}
              />
            </ThumbSlot>
          </ValueLabelComponent>
        );
      })}
    </RootSlot>
  );
});

Slider.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The label of the slider.
   */
  'aria-label': chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error(
        'MUI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
      );
    }

    return null;
  }),
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby': PropTypes.string,
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext': chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-valuetext'] != null) {
      return new Error(
        'MUI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.',
      );
    }

    return null;
  }),
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
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap: PropTypes.bool,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel: PropTypes.func,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText: PropTypes.func,
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node,
        value: PropTypes.number.isRequired,
      }),
    ),
    PropTypes.bool,
  ]),
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min: PropTypes.number,
  /**
   * Name attribute of the hidden `input` element.
   */
  name: PropTypes.string,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {Value} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the pointer or touch interaction ends.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {Value} value The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale: PropTypes.func,
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep: PropTypes.number,
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    mark: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    markLabel: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    rail: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    thumb: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    valueLabel: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        children: PropTypes.element,
        className: PropTypes.string,
        open: PropTypes.bool,
        style: PropTypes.object,
        value: PropTypes.node,
        valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
      }),
    ]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    input: PropTypes.elementType,
    mark: PropTypes.elementType,
    markLabel: PropTypes.elementType,
    rail: PropTypes.elementType,
    root: PropTypes.elementType,
    thumb: PropTypes.elementType,
    track: PropTypes.elementType,
    valueLabel: PropTypes.elementType,
  }),
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step: PropTypes.number,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex: PropTypes.number,
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track: PropTypes.oneOf(['inverted', 'normal', false]),
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default Slider;
