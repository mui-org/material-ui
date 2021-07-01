import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import TableContext from './TableContext';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import { getTableUtilityClass } from './tableClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, stickyHeader } = styleProps;

  const slots = {
    root: ['root', stickyHeader && 'stickyHeader'],
  };

  return composeClasses(slots, getTableUtilityClass, classes);
};

const TableRoot = styled('table', {
  name: 'MuiTable',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styleProps.stickyHeader && styles.stickyHeader];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  display: 'table',
  width: '100%',
  borderCollapse: 'collapse',
  borderSpacing: 0,
  '& caption': {
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    textAlign: 'left',
    captionSide: 'bottom',
  },
  /* Styles applied to the root element if `stickyHeader={true}`. */
  ...(styleProps.stickyHeader && {
    borderCollapse: 'separate',
  }),
}));

const defaultComponent = 'table';

const Table = React.forwardRef(function Table(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTable' });
  const {
    className,
    component = defaultComponent,
    padding = 'normal',
    size = 'medium',
    stickyHeader = false,
    ...other
  } = props;

  const styleProps = {
    ...props,
    component,
    padding,
    size,
    stickyHeader,
  };

  const classes = useUtilityClasses(styleProps);

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
        styleProps={styleProps}
        {...other}
      />
    </TableContext.Provider>
  );
});

Table.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the table, normally `TableHead` and `TableBody`.
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
   *
   * ⚠️ It doesn't work with IE11.
   * @default false
   */
  stickyHeader: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default Table;
