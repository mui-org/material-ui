import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { chainPropTypes, visuallyHidden } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { useTheme } from '../styles';
import {
  capitalize,
  useForkRef,
  useIsFocusVisible,
  useControlled,
  unstable_useId as useId,
} from '../utils';
import Star from '../internal/svg-icons/Star';
import StarBorder from '../internal/svg-icons/StarBorder';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import ratingClasses, { getRatingUtilityClass } from './ratingClasses';

function clamp(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function getDecimalPrecision(num) {
  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

function roundValueToPrecision(value, precision) {
  if (value == null) {
    return value;
  }

  const nearest = Math.round(value / precision) * precision;
  return Number(nearest.toFixed(getDecimalPrecision(precision)));
}

const useUtilityClasses = (styleProps) => {
  const { classes, size, readOnly, disabled, emptyValueFocused, focusVisible } = styleProps;

  const slots = {
    root: [
      'root',
      `size${capitalize(size)}`,
      disabled && 'disabled',
      focusVisible && 'focusVisible',
      readOnly && 'readyOnly',
    ],
    label: ['label', 'pristine'],
    labelEmptyValue: [emptyValueFocused && 'labelEmptyValueActive'],
    icon: ['icon'],
    iconEmpty: ['iconEmpty'],
    iconFilled: ['iconFilled'],
    iconHover: ['iconHover'],
    iconFocus: ['iconFocus'],
    iconActive: ['iconActive'],
    decimal: ['decimal'],
    visuallyHidden: ['visuallyHidden'],
  };

  return composeClasses(slots, getRatingUtilityClass, classes);
};

const RatingRoot = styled('span', {
  name: 'MuiRating',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      { [`& .${ratingClasses.visuallyHidden}`]: styles.visuallyHidden },
      styles.root,
      styles[`size${capitalize(styleProps.size)}`],
      styleProps.readOnly && styles.readOnly,
    ];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  display: 'inline-flex',
  // Required to position the pristine input absolutely
  position: 'relative',
  fontSize: theme.typography.pxToRem(24),
  color: '#faaf00',
  cursor: 'pointer',
  textAlign: 'left',
  WebkitTapHighlightColor: 'transparent',
  [`&.${ratingClasses.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity,
    pointerEvents: 'none',
  },
  [`&.${ratingClasses.focusVisible} .${ratingClasses.iconActive}`]: {
    outline: '1px solid #999',
  },
  [`& .${ratingClasses.visuallyHidden}`]: visuallyHidden,
  /* Styles applied to the root element if `size="small"`. */
  ...(styleProps.size === 'small' && {
    fontSize: theme.typography.pxToRem(18),
  }),
  /* Styles applied to the root element if `size="large"`. */
  ...(styleProps.size === 'large' && {
    fontSize: theme.typography.pxToRem(30),
  }),
  /* Styles applied to the root element if `readOnly={true}`. */
  ...(styleProps.readOnly && {
    pointerEvents: 'none',
  }),
}));

const RatingLabel = styled('label', {
  name: 'MuiRating',
  slot: 'Label',
  overridesResolver: (props, styles) => styles.label,
})(({ styleProps }) => ({
  /* Styles applied to the label elements. */
  cursor: 'inherit',
  /* Styles applied to the label of the "no value" input when it is active. */
  ...(styleProps.emptyValueFocused && {
    top: 0,
    bottom: 0,
    position: 'absolute',
    outline: '1px solid #999',
    width: '100%',
  }),
}));

const RatingIcon = styled('span', {
  name: 'MuiRating',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.icon,
      styleProps.iconEmpty && styles.iconEmpty,
      styleProps.iconFilled && styles.iconFilled,
      styleProps.iconHover && styles.iconHover,
      styleProps.iconFocus && styles.iconFocus,
      styleProps.iconActive && styles.iconActive,
    ];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the icon wrapping elements. */
  // Fit wrapper to actual icon size.
  display: 'flex',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  // Fix mouseLeave issue.
  // https://github.com/facebook/react/issues/4492
  pointerEvents: 'none',
  /* Styles applied to the icon wrapping elements when active. */
  ...(styleProps.iconActive && {
    transform: 'scale(1.2)',
  }),
  /* Styles applied to the icon wrapping elements when empty. */
  ...(styleProps.iconEmpty && {
    color: theme.palette.action.disabled,
  }),
}));

const RatingDecimal = styled('span', {
  name: 'MuiRating',
  slot: 'Decimal',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.decimal, styleProps.iconActive && styles.iconActive];
  },
})(({ styleProps }) => ({
  /* Styles applied to the icon wrapping elements when decimals are necessary. */
  position: 'relative',
  /* Styles applied to the icon wrapping elements when active. */
  ...(styleProps.iconActive && {
    transform: 'scale(1.2)',
  }),
}));

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other} />;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function RatingItem(props) {
  const {
    classes,
    disabled,
    emptyIcon,
    focus,
    getLabelText,
    highlightSelectedOnly,
    hover,
    icon,
    IconContainerComponent,
    isActive,
    itemValue,
    labelProps,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    readOnly,
    styleProps,
    ratingValue,
    ratingValueRounded,
  } = props;

  const isFilled = highlightSelectedOnly ? itemValue === ratingValue : itemValue <= ratingValue;
  const isHovered = itemValue <= hover;
  const isFocused = itemValue <= focus;
  const isChecked = itemValue === ratingValueRounded;

  const id = useId();
  const container = (
    <RatingIcon
      as={IconContainerComponent}
      value={itemValue}
      className={clsx(classes.icon, {
        [classes.iconEmpty]: !isFilled,
        [classes.iconFilled]: isFilled,
        [classes.iconHover]: isHovered,
        [classes.iconFocus]: isFocused,
        [classes.iconActive]: isActive,
      })}
      styleProps={{
        ...styleProps,
        iconEmpty: !isFilled,
        iconFilled: isFilled,
        iconHover: isHovered,
        iconFocus: isFocused,
        iconActive: isActive,
      }}
    >
      {emptyIcon && !isFilled ? emptyIcon : icon}
    </RatingIcon>
  );

  if (readOnly) {
    return <span {...labelProps}>{container}</span>;
  }

  return (
    <React.Fragment>
      <RatingLabel
        styleProps={{ ...styleProps, emptyValueFocused: undefined }}
        htmlFor={id}
        {...labelProps}
      >
        {container}
        <span className={classes.visuallyHidden}>{getLabelText(itemValue)}</span>
      </RatingLabel>
      <input
        className={classes.visuallyHidden}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        disabled={disabled}
        value={itemValue}
        id={id}
        type="radio"
        name={name}
        checked={isChecked}
      />
    </React.Fragment>
  );
}

RatingItem.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  emptyIcon: PropTypes.node,
  focus: PropTypes.number.isRequired,
  getLabelText: PropTypes.func.isRequired,
  highlightSelectedOnly: PropTypes.bool.isRequired,
  hover: PropTypes.number.isRequired,
  icon: PropTypes.node,
  IconContainerComponent: PropTypes.elementType.isRequired,
  isActive: PropTypes.bool.isRequired,
  itemValue: PropTypes.number.isRequired,
  labelProps: PropTypes.object,
  name: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  ratingValue: PropTypes.number,
  ratingValueRounded: PropTypes.number,
  readOnly: PropTypes.bool.isRequired,
  styleProps: PropTypes.object.isRequired,
};

const defaultIcon = <Star fontSize="inherit" />;
const defaultEmptyIcon = <StarBorder fontSize="inherit" />;

function defaultLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}`;
}

const Rating = React.forwardRef(function Rating(inProps, ref) {
  const props = useThemeProps({ name: 'MuiRating', props: inProps });
  const {
    className,
    defaultValue = null,
    disabled = false,
    emptyIcon = defaultEmptyIcon,
    emptyLabelText = 'Empty',
    getLabelText = defaultLabelText,
    highlightSelectedOnly = false,
    icon = defaultIcon,
    IconContainerComponent = IconContainer,
    max = 5,
    name: nameProp,
    onChange,
    onChangeActive,
    onMouseLeave,
    onMouseMove,
    precision = 1,
    readOnly = false,
    size = 'medium',
    value: valueProp,
    ...other
  } = props;

  const name = useId(nameProp);

  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'Rating',
  });

  const valueRounded = roundValueToPrecision(valueDerived, precision);
  const theme = useTheme();
  const [{ hover, focus }, setState] = React.useState({
    hover: -1,
    focus: -1,
  });

  let value = valueRounded;
  if (hover !== -1) {
    value = hover;
  }
  if (focus !== -1) {
    value = focus;
  }

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = React.useState(false);

  const rootRef = React.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, rootRef);
  const handleRef = useForkRef(handleFocusRef, ref);

  const handleMouseMove = (event) => {
    if (onMouseMove) {
      onMouseMove(event);
    }

    const rootNode = rootRef.current;
    const { right, left } = rootNode.getBoundingClientRect();
    const { width } = rootNode.firstChild.getBoundingClientRect();
    let percent;

    if (theme.direction === 'rtl') {
      percent = (right - event.clientX) / (width * max);
    } else {
      percent = (event.clientX - left) / (width * max);
    }

    let newHover = roundValueToPrecision(max * percent + precision / 2, precision);
    newHover = clamp(newHover, precision, max);

    setState((prev) =>
      prev.hover === newHover && prev.focus === newHover
        ? prev
        : {
            hover: newHover,
            focus: newHover,
          },
    );

    setFocusVisible(false);

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleMouseLeave = (event) => {
    if (onMouseLeave) {
      onMouseLeave(event);
    }

    const newHover = -1;
    setState({
      hover: newHover,
      focus: newHover,
    });

    if (onChangeActive && hover !== newHover) {
      onChangeActive(event, newHover);
    }
  };

  const handleChange = (event) => {
    let newValue = event.target.value === '' ? null : parseFloat(event.target.value);

    // Give mouse priority over keyboard
    // Fix https://github.com/mui-org/material-ui/issues/22827
    if (hover !== -1) {
      newValue = hover;
    }

    setValueState(newValue);

    if (onChange) {
      onChange(event, newValue);
    }
  };

  const handleClear = (event) => {
    // Ignore keyboard events
    // https://github.com/facebook/react/issues/7407
    if (event.clientX === 0 && event.clientY === 0) {
      return;
    }

    setState({
      hover: -1,
      focus: -1,
    });

    setValueState(null);

    if (onChange && parseFloat(event.target.value) === valueRounded) {
      onChange(event, null);
    }
  };

  const handleFocus = (event) => {
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
    }

    const newFocus = parseFloat(event.target.value);
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));
  };

  const handleBlur = (event) => {
    if (hover !== -1) {
      return;
    }

    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }

    const newFocus = -1;
    setState((prev) => ({
      hover: prev.hover,
      focus: newFocus,
    }));
  };

  const [emptyValueFocused, setEmptyValueFocused] = React.useState(false);

  const styleProps = {
    ...props,
    defaultValue,
    disabled,
    emptyIcon,
    emptyLabelText,
    emptyValueFocused,
    focusVisible,
    getLabelText,
    icon,
    IconContainerComponent,
    max,
    precision,
    readOnly,
    size,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <RatingRoot
      ref={handleRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={clsx(classes.root, className)}
      styleProps={styleProps}
      role={readOnly ? 'img' : null}
      aria-label={readOnly ? getLabelText(value) : null}
      {...other}
    >
      {Array.from(new Array(max)).map((_, index) => {
        const itemValue = index + 1;

        const ratingItemProps = {
          classes,
          disabled,
          emptyIcon,
          focus,
          getLabelText,
          highlightSelectedOnly,
          hover,
          icon,
          IconContainerComponent,
          name,
          onBlur: handleBlur,
          onChange: handleChange,
          onClick: handleClear,
          onFocus: handleFocus,
          ratingValue: value,
          ratingValueRounded: valueRounded,
          readOnly,
          styleProps,
        };

        const isActive = itemValue === Math.ceil(value) && (hover !== -1 || focus !== -1);
        if (precision < 1) {
          const items = Array.from(new Array(1 / precision));
          return (
            <RatingDecimal
              key={itemValue}
              className={clsx(classes.decimal, { [classes.iconActive]: isActive })}
              styleProps={{
                ...styleProps,
                iconActive: isActive,
              }}
            >
              {items.map(($, indexDecimal) => {
                const itemDecimalValue = roundValueToPrecision(
                  itemValue - 1 + (indexDecimal + 1) * precision,
                  precision,
                );

                return (
                  <RatingItem
                    key={itemDecimalValue}
                    {...ratingItemProps}
                    // The icon is already displayed as active
                    isActive={false}
                    itemValue={itemDecimalValue}
                    labelProps={{
                      style:
                        items.length - 1 === indexDecimal
                          ? {}
                          : {
                              width:
                                itemDecimalValue === value
                                  ? `${(indexDecimal + 1) * precision * 100}%`
                                  : '0%',
                              overflow: 'hidden',
                              zIndex: 1,
                              position: 'absolute',
                            },
                    }}
                  />
                );
              })}
            </RatingDecimal>
          );
        }

        return (
          <RatingItem
            key={itemValue}
            {...ratingItemProps}
            isActive={isActive}
            itemValue={itemValue}
          />
        );
      })}
      {!readOnly && !disabled && (
        <RatingLabel
          className={clsx(classes.label, classes.labelEmptyValue)}
          styleProps={styleProps}
        >
          <input
            className={classes.visuallyHidden}
            value=""
            id={`${name}-empty`}
            type="radio"
            name={name}
            checked={valueRounded == null}
            onFocus={() => setEmptyValueFocused(true)}
            onBlur={() => setEmptyValueFocused(false)}
            onChange={handleChange}
          />
          <span className={classes.visuallyHidden}>{emptyLabelText}</span>
        </RatingLabel>
      )}
    </RatingRoot>
  );
});

Rating.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The default value. Use when the component is not controlled.
   * @default null
   */
  defaultValue: PropTypes.number,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * The icon to display when empty.
   * @default <StarBorder fontSize="inherit" />
   */
  emptyIcon: PropTypes.node,
  /**
   * The label read when the rating input is empty.
   * @default 'Empty'
   */
  emptyLabelText: PropTypes.node,
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the rating.
   * This is important for screen reader users.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @param {number} value The rating label's value to format.
   * @returns {string}
   * @default function defaultLabelText(value) {
   *   return `${value} Star${value !== 1 ? 's' : ''}`;
   * }
   */
  getLabelText: PropTypes.func,
  /**
   * If `true`, only the selected icon will be highlighted.
   * @default false
   */
  highlightSelectedOnly: PropTypes.bool,
  /**
   * The icon to display.
   * @default <Star fontSize="inherit" />
   */
  icon: PropTypes.node,
  /**
   * The component containing the icon.
   * @default function IconContainer(props) {
   *   const { value, ...other } = props;
   *   return <span {...other} />;
   * }
   */
  IconContainerComponent: PropTypes.elementType,
  /**
   * Maximum rating.
   * @default 5
   */
  max: PropTypes.number,
  /**
   * The name attribute of the radio `input` elements.
   * This input `name` should be unique within the page.
   * Being unique within a form is insufficient since the `name` is used to generated IDs.
   */
  name: PropTypes.string,
  /**
   * Callback fired when the value changes.
   * @param {object} event The event source of the callback.
   * @param {number|null} value The new value.
   */
  onChange: PropTypes.func,
  /**
   * Callback function that is fired when the hover state changes.
   * @param {object} event The event source of the callback.
   * @param {number} value The new value.
   */
  onChangeActive: PropTypes.func,
  /**
   * @ignore
   */
  onMouseLeave: PropTypes.func,
  /**
   * @ignore
   */
  onMouseMove: PropTypes.func,
  /**
   * The minimum increment value change allowed.
   * @default 1
   */
  precision: chainPropTypes(PropTypes.number, (props) => {
    if (props.precision < 0.1) {
      return new Error(
        [
          'Material-UI: The prop `precision` should be above 0.1.',
          'A value below this limit has an imperceptible impact.',
        ].join('\n'),
      );
    }
    return null;
  }),
  /**
   * Removes all hover effects and pointer events.
   * @default false
   */
  readOnly: PropTypes.bool,
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['large', 'medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The rating value.
   */
  value: PropTypes.number,
};

export default Rating;
