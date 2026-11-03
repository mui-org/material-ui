'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { applyChildrenFocusVisible } from '../styles/focusVisible';
import useSlot from '../utils/useSlot';
import capitalize from '../utils/capitalize';
import createSimplePaletteValueFilter from '../utils/createSimplePaletteValueFilter';
import Paper from '../Paper';
import alertClasses, { getAlertUtilityClass } from './alertClasses';
import IconButton from '../IconButton';
import SuccessOutlinedIcon from '../internal/svg-icons/SuccessOutlined';
import ReportProblemOutlinedIcon from '../internal/svg-icons/ReportProblemOutlined';
import ErrorOutlineIcon from '../internal/svg-icons/ErrorOutline';
import InfoOutlinedIcon from '../internal/svg-icons/InfoOutlined';
import CloseIcon from '../internal/svg-icons/Close';

const useUtilityClasses = (ownerState) => {
  const { variant, color, severity, classes } = ownerState;

  const slots = {
    root: ['root', `color${capitalize(color || severity)}`, `${variant}`],
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
    const { ownerState } = props;

    return [styles.root, styles[ownerState.variant]];
  },
})(
  memoTheme(({ theme }) => {
    const getColor = theme.palette.mode === 'light' ? theme.darken : theme.lighten;
    const getBackgroundColor = theme.palette.mode === 'light' ? theme.lighten : theme.darken;
    return {
      ...theme.typography.body2,
      backgroundColor: 'transparent',
      display: 'flex',
      padding: '6px 16px',
      variants: [
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter(['light']))
          .map(([color]) => ({
            props: { colorSeverity: color, variant: 'standard' },
            style: {
              color: theme.vars
                ? theme.vars.palette.Alert[`${color}Color`]
                : getColor(theme.palette[color].light, 0.6),
              backgroundColor: theme.vars
                ? theme.vars.palette.Alert[`${color}StandardBg`]
                : getBackgroundColor(theme.palette[color].light, 0.9),
              [`& .${alertClasses.icon}`]: theme.vars
                ? { color: theme.vars.palette.Alert[`${color}IconColor`] }
                : {
                    color: theme.palette[color].main,
                  },
            },
          })),
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter(['light']))
          .map(([color]) => ({
            props: { colorSeverity: color, variant: 'outlined' },
            style: {
              color: theme.vars
                ? theme.vars.palette.Alert[`${color}Color`]
                : getColor(theme.palette[color].light, 0.6),
              border: `1px solid ${(theme.vars || theme).palette[color].light}`,
              [`& .${alertClasses.icon}`]: theme.vars
                ? { color: theme.vars.palette.Alert[`${color}IconColor`] }
                : {
                    color: theme.palette[color].main,
                  },
            },
          })),
        ...Object.entries(theme.palette)
          .filter(createSimplePaletteValueFilter(['dark']))
          .map(([color]) => ({
            props: { colorSeverity: color, variant: 'filled' },
            style: {
              ...(theme.focusVisible &&
                applyChildrenFocusVisible(
                  `0 0 0 4px ${(theme.vars || theme).palette.background.default}`,
                )),
              fontWeight: theme.typography.fontWeightMedium,
              ...(theme.vars
                ? {
                    color: theme.vars.palette.Alert[`${color}FilledColor`],
                    backgroundColor: theme.vars.palette.Alert[`${color}FilledBg`],
                  }
                : {
                    backgroundColor:
                      theme.palette.mode === 'dark'
                        ? theme.palette[color].dark
                        : theme.palette[color].main,
                    color: theme.palette.getContrastText(theme.palette[color].main),
                  }),
            },
          })),
      ],
    };
  }),
);

const AlertIcon = styled('div', {
  name: 'MuiAlert',
  slot: 'Icon',
})({
  marginRight: 12,
  padding: '7px 0',
  display: 'flex',
  fontSize: 22,
  opacity: 0.9,
});

const AlertMessage = styled('div', {
  name: 'MuiAlert',
  slot: 'Message',
})({
  padding: '8px 0',
  minWidth: 0,
  overflow: 'auto',
});

const AlertAction = styled('div', {
  name: 'MuiAlert',
  slot: 'Action',
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
  const props = useDefaultProps({ props: inProps, name: 'MuiAlert' });
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
    slotProps = {},
    slots = {},
    variant = 'standard',
    ...other
  } = props;

  const ownerState = {
    ...props,
    color,
    severity,
    variant,
    colorSeverity: color || severity,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    shouldForwardComponentProp: true,
    className: clsx(classes.root, className),
    elementType: AlertRoot,
    externalForwardedProps: {
      ...externalForwardedProps,
      ...other,
    },
    ownerState,
    additionalProps: {
      role,
      elevation: 0,
    },
  });

  const [IconSlot, iconSlotProps] = useSlot('icon', {
    className: classes.icon,
    elementType: AlertIcon,
    externalForwardedProps,
    ownerState,
  });

  const [MessageSlot, messageSlotProps] = useSlot('message', {
    className: classes.message,
    elementType: AlertMessage,
    externalForwardedProps,
    ownerState,
  });

  const [ActionSlot, actionSlotProps] = useSlot('action', {
    className: classes.action,
    elementType: AlertAction,
    externalForwardedProps,
    ownerState,
  });

  const [CloseButtonSlot, closeButtonProps] = useSlot('closeButton', {
    elementType: IconButton,
    externalForwardedProps,
    ownerState,
  });

  const [CloseIconSlot, closeIconProps] = useSlot('closeIcon', {
    elementType: CloseIcon,
    externalForwardedProps,
    ownerState,
  });

  return (
    <RootSlot {...rootSlotProps}>
      {icon !== false ? (
        <IconSlot {...iconSlotProps}>
          {icon || iconMapping[severity] || defaultIconMapping[severity]}
        </IconSlot>
      ) : null}
      <MessageSlot {...messageSlotProps}>{children}</MessageSlot>
      {action != null ? <ActionSlot {...actionSlotProps}>{action}</ActionSlot> : null}
      {action == null && onClose ? (
        <ActionSlot {...actionSlotProps}>
          <CloseButtonSlot
            size="small"
            aria-label={closeText}
            title={closeText}
            color="inherit"
            onClick={onClose}
            {...closeButtonProps}
          >
            <CloseIconSlot fontSize="small" {...closeIconProps} />
          </CloseButtonSlot>
        </ActionSlot>
      ) : null}
    </RootSlot>
  );
});

Alert.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * For localization purposes, you can use the provided [translations](https://mui.com/material-ui/guides/localization/).
   * @default 'Close'
   */
  closeText: PropTypes.string,
  /**
   * The color of the component. Unless provided, the value is taken from the `severity` prop.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * Override the icon displayed before the children.
   * Unless provided, the icon is mapped to the value of the `severity` prop.
   * Set to `false` to remove the `icon`.
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
   * @param {React.SyntheticEvent} event The event source of the callback.
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
  severity: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['error', 'info', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    action: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    closeButton: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    closeIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    message: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    action: PropTypes.elementType,
    closeButton: PropTypes.elementType,
    closeIcon: PropTypes.elementType,
    icon: PropTypes.elementType,
    message: PropTypes.elementType,
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
   * The variant to use.
   * @default 'standard'
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['filled', 'outlined', 'standard']),
    PropTypes.string,
  ]),
};

export default Alert;
