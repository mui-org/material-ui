'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import TableContext from './TableContext';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import { getTableUtilityClass } from './tableClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, stickyHeader } = ownerState;

  const slots = {
    root: ['root', stickyHeader && 'stickyHeader'],
  };

  return composeClasses(slots, getTableUtilityClass, classes);
};

const TableRoot = styled('table', {
  name: 'MuiTable',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [styles.root, ownerState.stickyHeader && styles.stickyHeader];
  },
})(
  memoTheme(({ theme }) => ({
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    '& caption': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      color: (theme.vars || theme).palette.text.secondary,
      textAlign: 'left',
      captionSide: 'bottom',
    },
    variants: [
      {
        props: ({ ownerState }) => ownerState.stickyHeader,
        style: {
          borderCollapse: 'separate',
        },
      },
    ],
  })),
);

const defaultComponent = 'table';

const Table = React.forwardRef(function Table(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiTable' });
  const {
    className,
    component = defaultComponent,
    padding = 'normal',
    size = 'medium',
    stickyHeader = false,
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    padding,
    size,
    stickyHeader,
  };

  const classes = useUtilityClasses(ownerState);

  const table = React.useMemo(
    () => ({ padding, size, stickyHeader }),
    [padding, size, stickyHeader],
  );

  return (
    <TableContext.Provider value={table}>
      <TableRoot
        as={component}
        role={component === defaultComponent ? null : 'table'}
        ref={ref}
        className={clsx(classes.root, className)}
        ownerState={ownerState}
        {...other}
      />
    </TableContext.Provider>
  );
});

Table.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the table, normally `TableHead` and `TableBody`.
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
   * Allows TableCells to inherit padding of the Table.
   * @default 'normal'
   */
  padding: PropTypes.oneOf(['checkbox', 'none', 'normal']),
  /**
   * Allows TableCells to inherit size of the Table.
   * @default 'medium'
   */
  size: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['medium', 'small']),
    PropTypes.string,
  ]),
  /**
   * Set the header sticky.
   * @default false
   */
  stickyHeader: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default Table;
