'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import ButtonBase, { buttonBaseClasses } from '../ButtonBase';
import capitalize from '../utils/capitalize';
import { applyInsetFocusVisible } from '../styles/focusVisible';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import unsupportedProp from '../utils/unsupportedProp';
import { useRovingTabIndexContext, useRovingTabIndexItem } from '../utils/useRovingTabIndex';
import tabClasses, { getTabUtilityClass } from './tabClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, textColor, fullWidth, wrapped, icon, label, selected, disabled } = ownerState;

  const slots = {
    root: [
      'root',
      icon && label && 'labelIcon',
      `textColor${capitalize(textColor)}`,
      fullWidth && 'fullWidth',
      wrapped && 'wrapped',
      selected && 'selected',
      disabled && 'disabled',
    ],
    icon: ['icon'],
  };

  return composeClasses(slots, getTabUtilityClass, classes);
};

const TabRoot = styled(ButtonBase, {
  name: 'MuiTab',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      ownerState.label && ownerState.icon && styles.labelIcon,
      styles[`textColor${capitalize(ownerState.textColor)}`],
      ownerState.fullWidth && styles.fullWidth,
      ownerState.wrapped && styles.wrapped,
      {
        [`& .${tabClasses.icon}`]: styles.icon,
      },
    ];
  },
})(
  memoTheme(({ theme }) => ({
    ...theme.typography.button,
    maxWidth: 360,
    minWidth: 90,
    position: 'relative',
    minHeight: 48,
    flexShrink: 0,
    padding: '12px 16px',
    overflow: 'hidden',
    whiteSpace: 'normal',
    textAlign: 'center',
    lineHeight: 1.25,
    // Inset the ring: the Tabs scroller clips an outset ring.
    ...(theme.focusVisible && applyInsetFocusVisible(3)),
    variants: [
      {
        props: ({ ownerState }) =>
          ownerState.label &&
          (ownerState.iconPosition === 'top' || ownerState.iconPosition === 'bottom'),
        style: {
          flexDirection: 'column',
        },
      },
      {
        props: ({ ownerState }) =>
          ownerState.label &&
          ownerState.iconPosition !== 'top' &&
          ownerState.iconPosition !== 'bottom',
        style: {
          flexDirection: 'row',
        },
      },
      {
        props: ({ ownerState }) => ownerState.icon && ownerState.label,
        style: {
          minHeight: 72,
          paddingTop: 9,
          paddingBottom: 9,
        },
      },
      {
        props: ({ ownerState, iconPosition }) =>
          ownerState.icon && ownerState.label && iconPosition === 'top',
        style: {
          [`& > .${tabClasses.icon}`]: {
            marginBottom: 6,
          },
        },
      },
      {
        props: ({ ownerState, iconPosition }) =>
          ownerState.icon && ownerState.label && iconPosition === 'bottom',
        style: {
          [`& > .${tabClasses.icon}`]: {
            marginTop: 6,
          },
        },
      },
      {
        props: ({ ownerState, iconPosition }) =>
          ownerState.icon && ownerState.label && iconPosition === 'start',
        style: {
          [`& > .${tabClasses.icon}`]: {
            marginRight: theme.spacing(1),
          },
        },
      },
      {
        props: ({ ownerState, iconPosition }) =>
          ownerState.icon && ownerState.label && iconPosition === 'end',
        style: {
          [`& > .${tabClasses.icon}`]: {
            marginLeft: theme.spacing(1),
          },
        },
      },
      {
        props: {
          textColor: 'inherit',
        },
        style: {
          color: 'inherit',
          opacity: 0.6, // same opacity as theme.palette.text.secondary
          [`&.${tabClasses.selected}`]: {
            opacity: 1,
          },
          ...(theme.focusVisible && {
            [`&.${buttonBaseClasses.focusVisible}`]: {
              opacity: 1,
            },
          }),
          [`&.${tabClasses.disabled}`]: {
            opacity: (theme.vars || theme).palette.action.disabledOpacity,
          },
        },
      },
      {
        props: {
          textColor: 'primary',
        },
        style: {
          color: (theme.vars || theme).palette.text.secondary,
          [`&.${tabClasses.selected}`]: {
            color: (theme.vars || theme).palette.primary.main,
          },
          [`&.${tabClasses.disabled}`]: {
            color: (theme.vars || theme).palette.text.disabled,
          },
        },
      },
      {
        props: {
          textColor: 'secondary',
        },
        style: {
          color: (theme.vars || theme).palette.text.secondary,
          [`&.${tabClasses.selected}`]: {
            color: (theme.vars || theme).palette.secondary.main,
          },
          [`&.${tabClasses.disabled}`]: {
            color: (theme.vars || theme).palette.text.disabled,
          },
        },
      },
      {
        props: ({ ownerState }) => ownerState.fullWidth,
        style: {
          flexShrink: 1,
          flexGrow: 1,
          flexBasis: 0,
          maxWidth: 'none',
        },
      },
      {
        props: ({ ownerState }) => ownerState.wrapped,
        style: {
          fontSize: theme.typography.pxToRem(12),
        },
      },
    ],
  })),
);

const Tab = React.forwardRef(function Tab(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTab' });
  const {
    className,
    disabled = false,
    disableFocusRipple = false,
    // eslint-disable-next-line react/prop-types
    fullWidth,
    icon: iconProp,
    iconPosition = 'top',
    // eslint-disable-next-line react/prop-types
    indicator,
    label,
    onChange,
    onClick,
    onFocus,
    // eslint-disable-next-line react/prop-types
    selected,
    // eslint-disable-next-line react/prop-types
    selectionFollowsFocus,
    // eslint-disable-next-line react/prop-types
    textColor = 'inherit',
    value,
    wrapped = false,
    ...other
  } = props;
  const rovingContext = useRovingTabIndexContext();
  const rovingItemProps = useRovingTabIndexItem({
    id: value,
    ref,
    disabled,
    selected,
  });
  // On the server, and on the first client render before registration effects run,
  // the roving item map is still empty. In that window, fall back to `tabIndex={0}`
  // for the selected tab so the rendered markup is immediately keyboard-accessible
  // and hydration stays consistent until item registration takes over.
  const shouldUseSelectedTabStopFallback = rovingContext.getItemMap().size === 0 && selected;
  const tabIndex = shouldUseSelectedTabStopFallback ? 0 : rovingItemProps.tabIndex;

  const ownerState = {
    ...props,
    disabled,
    disableFocusRipple,
    selected,
    icon: !!iconProp,
    iconPosition,
    label: !!label,
    fullWidth,
    textColor,
    wrapped,
  };

  const classes = useUtilityClasses(ownerState);
  const icon =
    iconProp && label && React.isValidElement(iconProp)
      ? React.cloneElement(iconProp, {
          className: clsx(classes.icon, iconProp.props.className),
        })
      : iconProp;
  const handleClick = (event) => {
    if (!selected && onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  const handleFocus = (event) => {
    if (selectionFollowsFocus && !selected && onChange) {
      onChange(event, value);
    }

    if (onFocus) {
      onFocus(event);
    }
  };

  return (
    <TabRoot
      internalNativeButton
      focusRipple={!disableFocusRipple}
      className={clsx(classes.root, className)}
      ref={rovingItemProps.ref}
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={handleClick}
      onFocus={handleFocus}
      tabIndex={tabIndex}
      ownerState={ownerState}
      {...other}
    >
      {iconPosition === 'top' || iconPosition === 'start' ? (
        <React.Fragment>
          {icon}
          {label}
        </React.Fragment>
      ) : (
        <React.Fragment>
          {label}
          {icon}
        </React.Fragment>
      )}

      {indicator}
    </TabRoot>
  );
});

Tab.propTypes /* remove-proptypes */ = {
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: PropTypes.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  /**
   * The position of the icon relative to the label.
   * @default 'top'
   */
  iconPosition: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),
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
   * @ignore
   */
  onFocus: PropTypes.func,
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
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped: PropTypes.bool,
};

export default Tab;
