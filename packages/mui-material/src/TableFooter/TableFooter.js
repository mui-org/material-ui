'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTableFooterUtilityClass } from './tableFooterClasses';

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableFooterUtilityClass, classes);
};

const TableFooterRoot = styled('tfoot', {
  name: 'MuiTableFooter',
  slot: 'Root',
})({
  display: 'table-footer-group',
});

const tablelvl2 = {
  variant: 'footer',
};

const defaultComponent = 'tfoot';

const TableFooter = React.forwardRef(function TableFooter(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTableFooter' });
  const { className, component = defaultComponent, ...other } = props;

  const ownerState = {
    ...props,
    component,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <Tablelvl2Context.Provider value={tablelvl2}>
      <TableFooterRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        role={component === defaultComponent ? null : 'rowgroup'}
        ownerState={ownerState}
        {...other}
      />
    </Tablelvl2Context.Provider>
  );
});

TableFooter.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component, normally `TableRow`.
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

export default TableFooter;
