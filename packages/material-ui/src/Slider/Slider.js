import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes } from '@material-ui/utils';
import { generateUtilityClasses, isHostComponent } from '@material-ui/unstyled';
import SliderUnstyled, {
  SliderValueLabelUnstyled,
  sliderUnstyledClasses,
  getSliderUtilityClass,
} from '@material-ui/unstyled/SliderUnstyled';
import { alpha, lighten, darken } from '@material-ui/system';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import useTheme from '../styles/useTheme';
import capitalize from '../utils/capitalize';

export const sliderClasses = {
  ...sliderUnstyledClasses,
  ...generateUtilityClasses('MuiSlider', [
    'colorPrimary',
    'colorSecondary',
    'thumbColorPrimary',
    'thumbColorSecondary',
    'sizeSmall',
    'thumbSizeSmall',
  ]),
};

export const SliderRoot = styled('span', {
  name: 'MuiSlider',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    const marks =
      styleProps.marksProp === true && styleProps.step !== null
        ? [...Array(Math.floor((styleProps.max - styleProps.min) / styleProps.step) + 1)].map(
            (_, index) => ({
              value: styleProps.min + styleProps.step * index,
            }),
          )
        : styleProps.marksProp || [];

    const marked = marks.length > 0 && marks.some((mark) => mark.label);

    return [
      styles.root,
      styles[`color${capitalize(styleProps.color)}`],
      styleProps.size !== 'medium' && styles[`size${capitalize(styleProps.size)}`],
      marked && styles.marked,
      styleProps.orientation === 'vertical' && styles.vertical,
      styleProps.track === 'inverted' && styles.trackInverted,
      styleProps.track === false && styles.trackFalse,
    ];
  },
})(({ theme, styleProps }) => ({
  borderRadius: 12,
  boxSizing: 'content-box',
  display: 'inline-block',
  position: 'relative',
  cursor: 'pointer',
  touchAction: 'none',
  color: theme.palette[styleProps.color].main,
  WebkitTapHighlightColor: 'transparent',
  ...(styleProps.orientation === 'horizontal' && {
    height: 4,
    width: '100%',
    padding: '13px 0',
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '20px 0',
    },
    ...(styleProps.size === 'small' && {
      height: 2,
    }),
    ...(styleProps.marked && {
      marginBottom: 20,
    }),
  }),
  ...(styleProps.orientation === 'vertical' && {
    height: '100%',
    width: 4,
    padding: '0 13px',
    // The primary input mechanism of the device includes a pointing device of limited accuracy.
    '@media (pointer: coarse)': {
      // Reach 42px touch target, about ~8mm on screen.
      padding: '0 20px',
    },
    ...(styleProps.size === 'small' && {
      width: 2,
    }),
    ...(styleProps.marked && {
      marginRight: 44,
    }),
  }),
  '@media print': {
    colorAdjust: 'exact',
  },
  [`&.${sliderClasses.disabled}`]: {
    pointerEvents: 'none',
    cursor: 'default',
    color: theme.palette.grey[400],
  },
  [`&.${sliderClasses.dragging}`]: {
    [`& .${sliderClasses.thumb}, & .${sliderClasses.track}`]: {
      transition: 'none',
    },
  },
}));

export const SliderRail = styled('span', {
  name: 'MuiSlider',
  slot: 'Rail',
  overridesResolver: (props, styles) => styles.rail,
})(({ styleProps }) => ({
  display: 'block',
  position: 'absolute',
  borderRadius: 'inherit',
  backgroundColor: 'currentColor',
  opacity: 0.38,
  ...(styleProps.orientation === 'horizontal' && {
    width: '100%',
    height: 'inherit',
    top: '50%',
    transform: 'translateY(-50%)',
  }),
  ...(styleProps.orientation === 'vertical' && {
    height: '100%',
    width: 'inherit',
    left: '50%',
    transform: 'translateX(-50%)',
  }),
  ...(styleProps.track === 'inverted' && {
    opacity: 1,
  }),
}));

export const SliderTrack = styled('span', {
  name: 'MuiSlider',
  slot: 'Track',
  overridesResolver: (props, styles) => styles.track,
})(({ theme, styleProps }) => {
  const color = // Same logic as the LinearProgress track color
    theme.palette.mode === 'light'
      ? lighten(theme.palette[styleProps.color].main, 0.62)
      : darken(theme.palette[styleProps.color].main, 0.5);
  return {
    display: 'block',
    position: 'absolute',
    borderRadius: 'inherit',
    border: '1px solid currentColor',
    backgroundColor: 'currentColor',
    transition: theme.transitions.create(['left', 'width', 'bottom', 'height'], {
      duration: theme.transitions.duration.shortest,
    }),
    ...(styleProps.size === 'small' && {
      border: 'none',
    }),
    ...(styleProps.orientation === 'horizontal' && {
      height: 'inherit',
      top: '50%',
      transform: 'translateY(-50%)',
    }),
    ...(styleProps.orientation === 'vertical' && {
      width: 'inherit',
      left: '50%',
      transform: 'translateX(-50%)',
    }),
    ...(styleProps.track === false && {
      display: 'none',
    }),
    ...(styleProps.track === 'inverted' && {
      backgroundColor: color,
      borderColor: color,
    }),
  };
});

export const SliderThumb = styled('span', {
  name: 'MuiSlider',
  slot: 'Thumb',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;
    return [
      styles.thumb,
      styles[`thumbColor${capitalize(styleProps.color)}`],
      styleProps.size !== 'medium' && styles[`thumbSize${capitalize(styleProps.size)}`],
    ];
  },
})(({ theme, styleProps }) => ({
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
  transition: theme.transitions.create(['box-shadow', 'left', 'bottom'], {
    duration: theme.transitions.duration.shortest,
  }),
  ...(styleProps.size === 'small' && {
    width: 12,
    height: 12,
  }),
  ...(styleProps.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-50%, -50%)',
  }),
  ...(styleProps.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 50%)',
  }),
  '&:before': {
    position: 'absolute',
    content: '""',
    borderRadius: 'inherit',
    width: '100%',
    height: '100%',
    boxShadow: theme.shadows[2],
    ...(styleProps.size === 'small' && {
      boxShadow: 'none',
    }),
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
  [`&:hover, &.${sliderClasses.focusVisible}`]: {
    boxShadow: `0px 0px 0px 8px ${alpha(theme.palette[styleProps.color].main, 0.16)}`,
    '@media (hover: none)': {
      boxShadow: 'none',
    },
  },
  [`&.${sliderClasses.active}`]: {
    boxShadow: `0px 0px 0px 14px ${alpha(theme.palette[styleProps.color].main, 0.16)}`,
  },
  [`&.${sliderClasses.disabled}`]: {
    '&:hover': {
      boxShadow: 'none',
    },
  },
}));

export const SliderValueLabel = styled(SliderValueLabelUnstyled, {
  name: 'MuiSlider',
  slot: 'ValueLabel',
  overridesResolver: (props, styles) => styles.valueLabel,
})(({ theme, styleProps }) => ({
  [`&.${sliderClasses.valueLabelOpen}`]: {
    transform: 'translateY(-100%) scale(1)',
  },
  zIndex: 1,
  whiteSpace: 'nowrap',
  ...theme.typography.body2,
  fontWeight: 500,
  transition: theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.shortest,
  }),
  top: -10,
  transformOrigin: 'bottom center',
  transform: 'translateY(-100%) scale(0)',
  position: 'absolute',
  backgroundColor: theme.palette.grey[600],
  borderRadius: 2,
  color: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.25rem 0.75rem',
  ...(styleProps.size === 'small' && {
    fontSize: theme.typography.pxToRem(12),
    padding: '0.25rem 0.5rem',
  }),
  '&:before': {
    position: 'absolute',
    content: '""',
    width: 8,
    height: 8,
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 50%) rotate(45deg)',
    backgroundColor: 'inherit',
  },
}));

export const SliderMark = styled('span', {
  name: 'MuiSlider',
  slot: 'Mark',
  overridesResolver: (props, styles) => styles.mark,
})(({ theme, styleProps }) => ({
  position: 'absolute',
  width: 2,
  height: 2,
  borderRadius: 1,
  backgroundColor: 'currentColor',
  ...(styleProps.orientation === 'horizontal' && {
    top: '50%',
    transform: 'translate(-1px, -50%)',
  }),
  ...(styleProps.orientation === 'vertical' && {
    left: '50%',
    transform: 'translate(-50%, 1px)',
  }),
  ...(styleProps.markActive && {
    backgroundColor: theme.palette.background.paper,
    opacity: 0.8,
  }),
}));

export const SliderMarkLabel = styled('span', {
  name: 'MuiSlider',
  slot: 'MarkLabel',
  overridesResolver: (props, styles) => styles.markLabel,
})(({ theme, styleProps }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  position: 'absolute',
  whiteSpace: 'nowrap',
  ...(styleProps.orientation === 'horizontal' && {
    top: 30,
    transform: 'translateX(-50%)',
    '@media (pointer: coarse)': {
      top: 40,
    },
  }),
  ...(styleProps.orientation === 'vertical' && {
    left: 36,
    transform: 'translateY(50%)',
    '@media (pointer: coarse)': {
      left: 44,
    },
  }),
  ...(styleProps.markLabelActive && {
    color: theme.palette.text.primary,
  }),
}));

SliderRoot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  styleProps: PropTypes.shape({
    'aria-label': PropTypes.string,
    'aria-labelledby': PropTypes.string,
    'aria-valuetext': PropTypes.string,
    classes: PropTypes.object,
    color: PropTypes.oneOf(['primary', 'secondary']),
    defaultValue: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    disabled: PropTypes.bool,
    getAriaLabel: PropTypes.func,
    getAriaValueText: PropTypes.func,
    isRtl: PropTypes.bool,
    marks: PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.node,
          value: PropTypes.number.isRequired,
        }),
      ),
      PropTypes.bool,
    ]),
    max: PropTypes.number,
    min: PropTypes.number,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onChangeCommitted: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
    scale: PropTypes.func,
    step: PropTypes.number,
    track: PropTypes.oneOf(['inverted', 'normal', false]),
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
    valueLabelDisplay: PropTypes.oneOf(['auto', 'off', 'on']),
    valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  }),
};

const extendUtilityClasses = (styleProps) => {
  const { color, size, classes = {} } = styleProps;

  return {
    ...classes,
    root: clsx(
      classes.root,
      getSliderUtilityClass(`color${capitalize(color)}`),
      classes[`color${capitalize(color)}`],
      size && getSliderUtilityClass(`size${capitalize(size)}`),
      size && classes[`size${capitalize(size)}`],
    ),
    thumb: clsx(
      classes.thumb,
      getSliderUtilityClass(`thumbColor${capitalize(color)}`),
      classes[`thumbColor${capitalize(color)}`],
      size && getSliderUtilityClass(`thumbSize${capitalize(size)}`),
      size && classes[`thumbSize${capitalize(size)}`],
    ),
  };
};

const shouldSpreadStyleProps = (Component) => {
  return !Component || !isHostComponent(Component);
};

const Slider = React.forwardRef(function Slider(inputProps, ref) {
  const props = useThemeProps({ props: inputProps, name: 'MuiSlider' });

  const theme = useTheme();
  const isRtl = theme.direction === 'rtl';

  const {
    components = {},
    componentsProps = {},
    color = 'primary',
    size = 'medium',
    ...other
  } = props;

  const styleProps = { ...props, color, size };

  const classes = extendUtilityClasses(styleProps);

  return (
    <SliderUnstyled
      {...other}
      isRtl={isRtl}
      components={{
        Root: SliderRoot,
        Rail: SliderRail,
        Track: SliderTrack,
        Thumb: SliderThumb,
        ValueLabel: SliderValueLabel,
        Mark: SliderMark,
        MarkLabel: SliderMarkLabel,
        ...components,
      }}
      componentsProps={{
        ...componentsProps,
        root: {
          ...componentsProps.root,
          ...(shouldSpreadStyleProps(components.Root) && {
            styleProps: { ...componentsProps.root?.styleProps, color, size },
          }),
        },
        thumb: {
          ...componentsProps.thumb,
          ...(shouldSpreadStyleProps(components.Thumb) && {
            styleProps: { ...componentsProps.thumb?.styleProps, color, size },
          }),
        },
        track: {
          ...componentsProps.track,
          ...(shouldSpreadStyleProps(components.Track) && {
            styleProps: { ...componentsProps.track?.styleProps, color, size },
          }),
        },
        valueLabel: {
          ...componentsProps.valueLabel,
          ...(shouldSpreadStyleProps(components.ValueLabel) && {
            styleProps: { ...componentsProps.valueLabel?.styleProps, color, size },
          }),
        },
      }}
      classes={classes}
      ref={ref}
    />
  );
});

Slider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The label of the slider.
   */
  'aria-label': chainPropTypes(PropTypes.string, (props) => {
    const range = Array.isArray(props.value || props.defaultValue);

    if (range && props['aria-label'] != null) {
      return new Error(
        'Material-UI: You need to use the `getAriaLabel` prop instead of `aria-label` when using a range slider.',
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
        'Material-UI: You need to use the `getAriaValueText` prop instead of `aria-valuetext` when using a range slider.',
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['primary', 'secondary']),
    PropTypes.string,
  ]),
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes.shape({
    Mark: PropTypes.elementType,
    MarkLabel: PropTypes.elementType,
    Rail: PropTypes.elementType,
    Root: PropTypes.elementType,
    Thumb: PropTypes.elementType,
    Track: PropTypes.elementType,
    ValueLabel: PropTypes.elementType,
  }),
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */
  componentsProps: PropTypes.object,
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
   * Indicates whether the theme context has rtl direction. It is set automatically.
   * @default false
   */
  isRtl: PropTypes.bool,
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
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {object} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted: PropTypes.func,
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * A transformation function, to change the scale of the slider.
   * @default (x) => x
   */
  scale: PropTypes.func,
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['medium', 'small']),
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
  sx: PropTypes.object,
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
   * @default (x) => x
   */
  valueLabelFormat: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export default Slider;
