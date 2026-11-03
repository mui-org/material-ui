'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import ListContext from '../List/ListContext';
import { getListItemSecondaryActionClassesUtilityClass } from './listItemSecondaryActionClasses';

const useUtilityClasses = (ownerState) => {
  const { disableGutters, classes } = ownerState;

  const slots = {
    root: ['root', disableGutters && 'disableGutters'],
  };

  return composeClasses(slots, getListItemSecondaryActionClassesUtilityClass, classes);
};

const ListItemSecondaryActionRoot = styled('div', {
  name: 'MuiListItemSecondaryAction',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.disableGutters && styles.disableGutters];
  },
})({
  position: 'absolute',
  right: 16,
  top: '50%',
  transform: 'translateY(-50%)',
  variants: [
    {
      props: ({ ownerState }) => ownerState.disableGutters,
      style: {
        right: 0,
      },
    },
  ],
});

/**
 * Must be used as the last child of ListItem to function properly.
 */
const ListItemSecondaryAction = React.forwardRef(function ListItemSecondaryAction(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiListItemSecondaryAction' });
  const { className, component, ...other } = props;
  const context = React.useContext(ListContext);
  const ownerState = { ...props, disableGutters: context.disableGutters };
  const classes = useUtilityClasses(ownerState);

  return (
    <ListItemSecondaryActionRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      ref={ref}
      {...other}
    />
  );
});

ListItemSecondaryAction.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally an `IconButton` or selection control.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

ListItemSecondaryAction.muiName = 'ListItemSecondaryAction';

export default ListItemSecondaryAction;
