'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { emphasize } from '@mui/system/colorManipulator';
import { styled } from '../zero-styled';
import { applyChildrenFocusVisible } from '../styles/focusVisible';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import Paper from '../Paper';
import { getSnackbarContentUtilityClass } from './snackbarContentClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    action: ['action'],
    message: ['message'],
  };

  return composeClasses(slots, getSnackbarContentUtilityClass, classes);
};

const SnackbarContentRoot = styled(Paper, {
  name: 'MuiSnackbarContent',
  slot: 'Root',
})(
  memoTheme(({ theme }) => {
    const emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;

    return {
      ...(theme.focusVisible &&
        applyChildrenFocusVisible(`0 0 0 4px ${(theme.vars || theme).palette.background.default}`)),
      ...theme.typography.body2,
      color: theme.vars
        ? theme.vars.palette.SnackbarContent.color
        : theme.palette.getContrastText(emphasize(theme.palette.background.default, emphasis)),
      backgroundColor: theme.vars
        ? theme.vars.palette.SnackbarContent.bg
        : emphasize(theme.palette.background.default, emphasis),
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px 16px',
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        flexGrow: 'initial',
        minWidth: 288,
      },
    };
  }),
);

const SnackbarContentMessage = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Message',
})({
  padding: '8px 0',
});

const SnackbarContentAction = styled('div', {
  name: 'MuiSnackbarContent',
  slot: 'Action',
})({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
  paddingLeft: 16,
  marginRight: -8,
});

const SnackbarContent = React.forwardRef(function SnackbarContent(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiSnackbarContent' });
  const { action, className, message, role = 'alert', ...other } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  return (
    <SnackbarContentRoot
      role={role}
      elevation={6}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    >
      <SnackbarContentMessage className={classes.message} ownerState={ownerState}>
        {message}
      </SnackbarContentMessage>
      {action ? (
        <SnackbarContentAction className={classes.action} ownerState={ownerState}>
          {action}
        </SnackbarContentAction>
      ) : null}
    </SnackbarContentRoot>
  );
});

SnackbarContent.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The message to display.
   */
  message: PropTypes.node,
  /**
   * The ARIA role attribute of the element.
   * @default 'alert'
   */
  role: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default SnackbarContent;
