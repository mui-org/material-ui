import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { darken, lighten } from '@material-ui/system';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import Paper from '../Paper';
import alertClasses, { getAlertUtilityClass } from './alertClasses';
import IconButton from '../IconButton';
import SuccessOutlinedIcon from '../internal/svg-icons/SuccessOutlined';
import ReportProblemOutlinedIcon from '../internal/svg-icons/ReportProblemOutlined';
import ErrorOutlineIcon from '../internal/svg-icons/ErrorOutline';
import InfoOutlinedIcon from '../internal/svg-icons/InfoOutlined';
import CloseIcon from '../internal/svg-icons/Close';

const useUtilityClasses = (styleProps) => {
  const { variant, color, severity, classes } = styleProps;

  const slots = {
    root: ['root', `${variant}${capitalize(color || severity)}`, `${variant}`],
    icon: ['icon'],
    message: ['message'],
    action: ['action'],
  };

  return composeClasses(slots, getAlertUtilityClass, classes);
};

const AlertRoot = styled(Paper, {
  name: 'MuiAlert',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styles[styleProps.variant],
      styles[`${styleProps.variant}${capitalize(styleProps.color || styleProps.severity)}`],
    ];
  },
})(({ theme, styleProps }) => {
  const getColor = theme.palette.mode === 'light' ? darken : lighten;
  const getBackgroundColor = theme.palette.mode === 'light' ? lighten : darken;
  const color = styleProps.color || styleProps.severity;

  return {
    /* Styles applied to the root element. */
    ...theme.typography.body2,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'transparent',
    display: 'flex',
    padding: '6px 16px',
    /* Styles applied to the root element if variant="standard". */
    ...(color &&
      styleProps.variant === 'standard' && {
        color: getColor(theme.palette[color].main, 0.6),
        backgroundColor: getBackgroundColor(theme.palette[color].main, 0.9),
        [`& .${alertClasses.icon}`]: {
          color: theme.palette[color].main,
        },
      }),
    /* Styles applied to the root element if variant="outlined". */
    ...(color &&
      styleProps.variant === 'outlined' && {
        color: getColor(theme.palette[color].main, 0.6),
        border: `1px solid ${theme.palette[color].main}`,
        [`& .${alertClasses.icon}`]: {
          color: theme.palette[color].main,
        },
      }),
    /* Styles applied to the root element if variant="filled". */
    ...(color &&
      styleProps.variant === 'filled' && {
        color: '#fff',
        fontWeight: theme.typography.fontWeightMedium,
        backgroundColor: theme.palette[color].main,
      }),
  };
});

/* Styles applied to the icon wrapper element. */
const AlertIcon = styled('div', {
  name: 'MuiAlert',
  slot: 'Icon',
  overridesResolver: (props, styles) => styles.icon,
})({
  marginRight: 12,
  padding: '7px 0',
  display: 'flex',
  fontSize: 22,
  opacity: 0.9,
});

/* Styles applied to the message wrapper element. */
const AlertMessage = styled('div', {
  name: 'MuiAlert',
  slot: 'Message',
  overridesResolver: (props, styles) => styles.message,
})({
  padding: '8px 0',
});

/* Styles applied to the action wrapper element if `action` is provided. */
const AlertAction = styled('div', {
  name: 'MuiAlert',
  slot: 'Action',
  overridesResolver: (props, styles) => styles.action,
})({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '4px 0 0 16px',
  marginLeft: 'auto',
  marginRight: -8,
});

const defaultIconMapping = {
  success: <SuccessOutlinedIcon fontSize="inherit" />,
  warning: <ReportProblemOutlinedIcon fontSize="inherit" />,
  error: <ErrorOutlineIcon fontSize="inherit" />,
  info: <InfoOutlinedIcon fontSize="inherit" />,
};

const Alert = React.forwardRef(function Alert(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAlert' });
  const {
    action,
    children,
    className,
    closeText = 'Close',
    color,
    icon,
    iconMapping = defaultIconMapping,
    onClose,
    role = 'alert',
    severity = 'success',
    variant = 'standard',
    ...other
  } = props;

  const styleProps = {
    ...props,
    color,
    severity,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <AlertRoot
      role={role}
      square
      elevation={0}
      styleProps={styleProps}
      className={clsx(classes.root, className)}
      ref={ref}
      {...other}
    >
      {icon !== false ? (
        <AlertIcon styleProps={styleProps} className={classes.icon}>
          {icon || iconMapping[severity] || defaultIconMapping[severity]}
        </AlertIcon>
      ) : null}
      <AlertMessage styleProps={styleProps} className={classes.message}>
        {children}
      </AlertMessage>
      {action != null ? <AlertAction className={classes.action}>{action}</AlertAction> : null}
      {action == null && onClose ? (
        <AlertAction styleProps={styleProps} className={classes.action}>
          <IconButton
            size="small"
            aria-label={closeText}
            title={closeText}
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </AlertAction>
      ) : null}
    </AlertRoot>
  );
});

Alert.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The action to display. It renders after the message, at the end of the alert.
   */
  action: PropTypes.node,
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
   * Override the default label for the *close popup* icon button.
   *
   * For localization purposes, you can use the provided [translations](/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The main color for the alert. Unless provided, the value is taken from the `severity` prop.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   */
  icon: PropTypes.node,
  /**
   * The component maps the `severity` prop to a range of different icons,
   * for instance success to `<SuccessOutlined>`.
   * If you wish to change this mapping, you can provide your own.
   * Alternatively, you can use the `icon` prop to override the icon displayed.
   */
  iconMapping: PropTypes.shape({
    error: PropTypes.node,
    info: PropTypes.node,
    success: PropTypes.node,
    warning: PropTypes.node,
  }),
  /**
   * Callback fired when the component requests to be closed.
   * When provided and no `action` prop is set, a close icon button is displayed that triggers the callback when clicked.
   * @param {object} event The event source of the callback.
   */
  onClose: PropTypes.func,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The severity of the alert. This defines the color and icon used.
   * @default 'success'
   */
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined', 'standard']),
    PropTypes.string,
  ]),
};

export default Alert;
