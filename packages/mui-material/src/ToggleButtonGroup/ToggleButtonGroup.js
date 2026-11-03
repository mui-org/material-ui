'use client';
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import getValidReactChildren from '@mui/utils/getValidReactChildren';
import { useRtl } from '@mui/system/RtlProvider';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { useRovingTabIndexRoot, RovingTabIndexContext } from '../utils/useRovingTabIndex';
import toggleButtonGroupClasses, {
  getToggleButtonGroupUtilityClass,
} from './toggleButtonGroupClasses';
import ToggleButtonGroupContext from './ToggleButtonGroupContext';
import ToggleButtonGroupButtonContext from './ToggleButtonGroupButtonContext';
import toggleButtonClasses from '../ToggleButton/toggleButtonClasses';
import buttonBaseClasses from '../ButtonBase/buttonBaseClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, orientation, fullWidth, disabled } = ownerState;

  const slots = {
    root: ['root', orientation, fullWidth && 'fullWidth'],
    grouped: ['grouped', disabled && 'disabled'],
    firstButton: ['firstButton'],
    lastButton: ['lastButton'],
    middleButton: ['middleButton'],
  };

  return composeClasses(slots, getToggleButtonGroupUtilityClass, classes);
};

const ToggleButtonGroupRoot = styled('div', {
  name: 'MuiToggleButtonGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${toggleButtonGroupClasses.grouped}`]: styles.grouped },
      {
        [`& .${toggleButtonGroupClasses.firstButton}`]: styles.firstButton,
      },
      {
        [`& .${toggleButtonGroupClasses.lastButton}`]: styles.lastButton,
      },
      {
        [`& .${toggleButtonGroupClasses.middleButton}`]: styles.middleButton,
      },
      styles.root,
      ownerState.orientation === 'vertical' && styles.vertical,
      ownerState.fullWidth && styles.fullWidth,
    ];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'inline-flex',
    borderRadius: (theme.vars || theme).shape.borderRadius,
    ...(theme.focusVisible && {
      // paint the focused item above its siblings so a selected sibling's
      // background cannot cover the ring edges
      [`& .${toggleButtonGroupClasses.grouped}.${buttonBaseClasses.focusVisible}`]: {
        zIndex: 1,
      },
    }),
    variants: [
      {
        props: { orientation: 'vertical' },
        style: {
          flexDirection: 'column',
          [`& .${toggleButtonGroupClasses.grouped}`]: {
            [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
              {
                borderTop: 0,
                marginTop: 0,
              },
          },
          [`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]:
            {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          [`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]:
            {
              marginTop: -1,
              borderTop: '1px solid transparent',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            },
          [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
            {
              borderTop: '1px solid transparent',
            },
        },
      },
      {
        props: { fullWidth: true },
        style: {
          width: '100%',
        },
      },
      {
        props: { orientation: 'horizontal' },
        style: {
          [`& .${toggleButtonGroupClasses.grouped}`]: {
            [`&.${toggleButtonGroupClasses.selected} + .${toggleButtonGroupClasses.grouped}.${toggleButtonGroupClasses.selected}`]:
              {
                borderLeft: 0,
                marginLeft: 0,
              },
          },
          [`& .${toggleButtonGroupClasses.firstButton},& .${toggleButtonGroupClasses.middleButton}`]:
            {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          [`& .${toggleButtonGroupClasses.lastButton},& .${toggleButtonGroupClasses.middleButton}`]:
            {
              marginLeft: -1,
              borderLeft: '1px solid transparent',
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
            },
          [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled},& .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
            {
              borderLeft: '1px solid transparent',
            },
        },
      },
    ],
  })),
);

const ToggleButtonGroup = React.forwardRef(function ToggleButtonGroup(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiToggleButtonGroup' });
  const {
    children,
    className,
    color = 'standard',
    disabled = false,
    exclusive = false,
    fullWidth = false,
    onChange,
    orientation = 'horizontal',
    size = 'medium',
    value,
    ...other
  } = props;
  const ownerState = { ...props, disabled, fullWidth, orientation, size };
  const classes = useUtilityClasses(ownerState);
  const isRtl = useRtl();

  const handleChange = React.useCallback(
    (event, buttonValue) => {
      if (!onChange) {
        return;
      }

      const index = value && value.indexOf(buttonValue);
      let newValue;

      if (value && index >= 0) {
        newValue = value.slice();
        newValue.splice(index, 1);
      } else {
        newValue = value ? value.concat(buttonValue) : [buttonValue];
      }

      onChange(event, newValue);
    },
    [onChange, value],
  );

  const handleExclusiveChange = React.useCallback(
    (event, buttonValue) => {
      if (!onChange) {
        return;
      }

      onChange(event, value === buttonValue ? null : buttonValue);
    },
    [onChange, value],
  );

  const context = React.useMemo(
    () => ({
      className: classes.grouped,
      onChange: exclusive ? handleExclusiveChange : handleChange,
      value,
      size,
      fullWidth,
      color,
      disabled,
      isRovingTabIndex: true,
    }),
    [
      classes.grouped,
      exclusive,
      handleExclusiveChange,
      handleChange,
      value,
      size,
      fullWidth,
      color,
      disabled,
    ],
  );

  const validChildren = getValidReactChildren(children);
  const childrenCount = validChildren.length;

  const getButtonPositionClassName = (index) => {
    const isFirstButton = index === 0;
    const isLastButton = index === childrenCount - 1;

    if (isFirstButton && isLastButton) {
      return '';
    }
    if (isFirstButton) {
      return classes.firstButton;
    }
    if (isLastButton) {
      return classes.lastButton;
    }
    return classes.middleButton;
  };

  const rovingTabIndexRoot = useRovingTabIndexRoot({
    orientation,
    isRtl,
  });

  const rovingContainerProps = rovingTabIndexRoot.getContainerProps(
    ref,
    other.onFocus,
    other.onKeyDown,
  );

  return (
    <ToggleButtonGroupRoot
      role="group"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
      {...rovingContainerProps}
    >
      <RovingTabIndexContext.Provider value={rovingTabIndexRoot}>
        <ToggleButtonGroupContext.Provider value={context}>
          {validChildren.map((child, index) => {
            if (process.env.NODE_ENV !== 'production') {
              if (isFragment(child)) {
                console.error(
                  [
                    "MUI: The ToggleButtonGroup component doesn't accept a Fragment as a child.",
                    'Consider providing an array instead.',
                  ].join('\n'),
                );
              }
            }

            return (
              <ToggleButtonGroupButtonContext.Provider
                key={child.key}
                value={getButtonPositionClassName(index)}
              >
                {child}
              </ToggleButtonGroupButtonContext.Provider>
            );
          })}
        </ToggleButtonGroupContext.Provider>
      </RovingTabIndexContext.Provider>
    </ToggleButtonGroupRoot>
  );
});

ToggleButtonGroup.propTypes /* remove-proptypes */ = {
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
   * The color of the button when it is selected.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'standard'
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['standard', 'primary', 'secondary', 'error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * If `true`, the component is disabled. This implies that all ToggleButton children will be disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   * @default false
   */
  exclusive: PropTypes.bool,
  /**
   * If `true`, the button group will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,
  /**
   * Callback fired when the value changes.
   *
   * @param {React.MouseEvent<HTMLElement>} event The event source of the callback.
   * @param {any} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * The size of the component.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['small', 'medium', 'large']),
    PropTypes.string,
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   *
   * The value must have reference equality with the option in order to be selected.
   */
  value: PropTypes.any,
};

export default ToggleButtonGroup;
