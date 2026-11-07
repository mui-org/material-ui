'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import Typography from '../Typography';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getDialogTitleUtilityClass } from './dialogTitleClasses';
import DialogContext from '../Dialog/DialogContext';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDialogTitleUtilityClass, classes);
};

const DialogTitleRoot = styled(Typography, {
  name: 'MuiDialogTitle',
  slot: 'Root',
})({
  padding: '16px 24px',
  flex: '0 0 auto',
});

const DialogTitle = React.forwardRef(function DialogTitle(inProps, ref) {
  const props = useDefaultProps({
    props: inProps,
    name: 'MuiDialogTitle',
  });

  const { className, id: idProp, ...other } = props;
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const { titleId = idProp } = React.useContext(DialogContext);

  return (
    <DialogTitleRoot
      component="h2"
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      variant="h6"
      id={idProp ?? titleId}
      {...other}
    />
  );
});

DialogTitle.propTypes /* remove-proptypes */ = {
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
   * A CSS class name applied to the root element.
   */
  className: PropTypes.string,
  id: PropTypes.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default DialogTitle;
