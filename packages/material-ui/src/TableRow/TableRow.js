import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import { fade } from '../styles/colorManipulator';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: 'inherit',
    display: 'table-row',
    verticalAlign: 'middle',
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    '&$selected': {
      backgroundColor:
        theme.palette.type === 'light'
          ? fade(theme.palette.secondary.main, 0.04)
          : 'rgba(255, 255, 255, 0.08)',
    },
    '&$hover:not($selected):hover': {
      backgroundColor:
        theme.palette.type === 'light'
          ? theme.palette.action.hover
          : 'rgba(255, 255, 255, 0.14)',
    },
  },
  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},
  /* Pseudo-class applied to the root element if `hover={true}`. */
  hover: {},
  /* Styles applied to the root element if table variant="head". */
  head: {},
  /* Styles applied to the root element if table variant="footer". */
  footer: {},
});

/**
 * Will automatically set dynamic row height
 * based on the material table element parent (head, body, etc).
 */
const TableRow = React.forwardRef(function TableRow(props, ref) {
  const {
    classes,
    className,
    component: Component = 'tr',
    hover = false,
    selected = false,
    ...other
  } = props;
  const tablelvl2 = React.useContext(Tablelvl2Context);

  return (
    <Component
      ref={ref}
      className={clsx(
        classes.root,
        {
          [classes.head]: tablelvl2 && tablelvl2.variant === 'head',
          [classes.footer]: tablelvl2 && tablelvl2.variant === 'footer',
          [classes.hover]: hover,
          [classes.selected]: selected,
        },
        className,
      )}
      {...other}
    />
  );
});

TableRow.propTypes = {
  /**
   * Should be valid <tr> children such as `TableCell`.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the table row will shade on hover.
   */
  hover: PropTypes.bool,
  /**
   * If `true`, the table row will have the selected shading.
   */
  selected: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiTableRow' })(TableRow);
