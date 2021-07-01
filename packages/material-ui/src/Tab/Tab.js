import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import ButtonBase from '../ButtonBase';
import capitalize from '../utils/capitalize';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import unsupportedProp from '../utils/unsupportedProp';
import tabClasses, { getTabUtilityClass } from './tabClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, textColor, fullWidth, wrapped, icon, label, selected, disabled } = styleProps;

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
  };

  return composeClasses(slots, getTabUtilityClass, classes);
};

const TabRoot = styled(ButtonBase, {
  name: 'MuiTab',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styleProps.label && styleProps.icon && styles.labelIcon,
      styles[`textColor${capitalize(styleProps.textColor)}`],
      styleProps.fullWidth && styles.fullWidth,
      styleProps.wrapped && styles.wrapped,
    ];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
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
  flexDirection: 'column',
  lineHeight: 1.25,
  /* Styles applied to the root element if both `icon` and `label` are provided. */
  ...(styleProps.icon &&
    styleProps.label && {
      minHeight: 72,
      paddingTop: 9,
      paddingBottom: 9,
      [`& > *:first-child`]: {
        marginBottom: 6,
      },
    }),
  /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="inherit"`. */
  ...(styleProps.textColor === 'inherit' && {
    color: 'inherit',
    opacity: 0.6, // same opacity as theme.palette.text.secondary
    [`&.${tabClasses.selected}`]: {
      opacity: 1,
    },
    [`&.${tabClasses.disabled}`]: {
      opacity: theme.palette.action.disabledOpacity,
    },
  }),
  /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`. */
  ...(styleProps.textColor === 'primary' && {
    color: theme.palette.text.secondary,
    [`&.${tabClasses.selected}`]: {
      color: theme.palette.primary.main,
    },
    [`&.${tabClasses.disabled}`]: {
      color: theme.palette.text.disabled,
    },
  }),
  /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="secondary"`. */
  ...(styleProps.textColor === 'secondary' && {
    color: theme.palette.text.secondary,
    [`&.${tabClasses.selected}`]: {
      color: theme.palette.secondary.main,
    },
    [`&.${tabClasses.disabled}`]: {
      color: theme.palette.text.disabled,
    },
  }),
  /* Styles applied to the root element if `fullWidth={true}` */
  ...(styleProps.fullWidth && {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 0,
    maxWidth: 'none',
  }),
  /* Styles applied to the root element if `wrapped={true}`. */
  ...(styleProps.wrapped && {
    fontSize: theme.typography.pxToRem(12),
  }),
}));

const Tab = React.forwardRef(function Tab(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTab' });
  const {
    className,
    disabled = false,
    disableFocusRipple = false,
    // eslint-disable-next-line react/prop-types
    fullWidth,
    icon,
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

  const styleProps = {
    ...props,
    disabled,
    disableFocusRipple,
    selected,
    icon: !!icon,
    label: !!label,
    fullWidth,
    textColor,
    wrapped,
  };

  const classes = useUtilityClasses(styleProps);

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
      focusRipple={!disableFocusRipple}
      className={clsx(classes.root, className)}
      ref={ref}
      role="tab"
      aria-selected={selected}
      disabled={disabled}
      onClick={handleClick}
      onFocus={handleFocus}
      styleProps={styleProps}
      tabIndex={selected ? 0 : -1}
      {...other}
    >
      {icon}
      {label}
      {indicator}
    </TabRoot>
  );
});

Tab.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
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
   * to highlight the element by applying separate styles with the `.Mui-focusedVisible` class.
   * @default false
   */
  disableRipple: PropTypes.bool,
  /**
   * The icon to display.
   */
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
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
  sx: PropTypes.object,
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
