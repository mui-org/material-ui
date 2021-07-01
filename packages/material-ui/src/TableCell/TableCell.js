import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { darken, alpha, lighten } from '@material-ui/system';
import capitalize from '../utils/capitalize';
import TableContext from '../Table/TableContext';
import Tablelvl2Context from '../Table/Tablelvl2Context';
import useThemeProps from '../styles/useThemeProps';
import styled from '../styles/styled';
import tableCellClasses, { getTableCellUtilityClass } from './tableCellClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, variant, align, padding, size, stickyHeader } = styleProps;

  const slots = {
    root: [
      'root',
      variant,
      stickyHeader && 'stickyHeader',
      align !== 'inherit' && `align${capitalize(align)}`,
      padding !== 'normal' && `padding${capitalize(padding)}`,
      `size${capitalize(size)}`,
    ],
  };

  return composeClasses(slots, getTableCellUtilityClass, classes);
};

const TableCellRoot = styled('td', {
  name: 'MuiTableCell',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [
      styles.root,
      styles[styleProps.variant],
      styles[`size${capitalize(styleProps.size)}`],
      styleProps.padding !== 'normal' && styles[`padding${capitalize(styleProps.padding)}`],
      styleProps.align !== 'inherit' && styles[`align${capitalize(styleProps.align)}`],
      styleProps.stickyHeader && styles.stickyHeader,
    ];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the root element. */
  ...theme.typography.body2,
  display: 'table-cell',
  verticalAlign: 'inherit',
  // Workaround for a rendering bug with spanned columns in Chrome 62.0.
  // Removes the alpha (sets it to 1), and lightens or darkens the theme color.
  borderBottom: `1px solid
    ${
      theme.palette.mode === 'light'
        ? lighten(alpha(theme.palette.divider, 1), 0.88)
        : darken(alpha(theme.palette.divider, 1), 0.68)
    }`,
  textAlign: 'left',
  padding: 16,
  /* Styles applied to the root element if `variant="head"` or `context.table.head`. */
  ...(styleProps.variant === 'head' && {
    color: theme.palette.text.primary,
    lineHeight: theme.typography.pxToRem(24),
    fontWeight: theme.typography.fontWeightMedium,
  }),
  /* Styles applied to the root element if `variant="body"` or `context.table.body`. */
  ...(styleProps.variant === 'body' && {
    color: theme.palette.text.primary,
  }),
  /* Styles applied to the root element if `variant="footer"` or `context.table.footer`. */
  ...(styleProps.variant === 'footer' && {
    color: theme.palette.text.secondary,
    lineHeight: theme.typography.pxToRem(21),
    fontSize: theme.typography.pxToRem(12),
  }),
  /* Styles applied to the root element if `size="small"`. */
  ...(styleProps.size === 'small' && {
    padding: '6px 16px',
    [`&.${tableCellClasses.paddingCheckbox}`]: {
      width: 24, // prevent the checkbox column from growing
      padding: '0 12px 0 16px',
      '& > *': {
        padding: 0,
      },
    },
  }),
  /* Styles applied to the root element if `padding="checkbox"`. */
  ...(styleProps.padding === 'checkbox' && {
    width: 48, // prevent the checkbox column from growing
    padding: '0 0 0 4px',
  }),
  /* Styles applied to the root element if `padding="none"`. */
  ...(styleProps.padding === 'none' && {
    padding: 0,
  }),
  /* Styles applied to the root element if `align="left"`. */
  ...(styleProps.align === 'left' && {
    textAlign: 'left',
  }),
  /* Styles applied to the root element if `align="center"`. */
  ...(styleProps.align === 'center' && {
    textAlign: 'center',
  }),
  /* Styles applied to the root element if `align="right"`. */
  ...(styleProps.align === 'right' && {
    textAlign: 'right',
    flexDirection: 'row-reverse',
  }),
  /* Styles applied to the root element if `align="justify"`. */
  ...(styleProps.align === 'justify' && {
    textAlign: 'justify',
  }),
  /* Styles applied to the root element if `context.table.stickyHeader={true}`. */
  ...(styleProps.stickyHeader && {
    position: 'sticky',
    top: 0,
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  }),
}));

/**
 * The component renders a `<th>` element when the parent context is a header
 * or otherwise a `<td>` element.
 */
const TableCell = React.forwardRef(function TableCell(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTableCell' });
  const {
    align = 'inherit',
    className,
    component: componentProp,
    padding: paddingProp,
    scope: scopeProp,
    size: sizeProp,
    sortDirection,
    variant: variantProp,
    ...other
  } = props;

  const table = React.useContext(TableContext);
  const tablelvl2 = React.useContext(Tablelvl2Context);

  const isHeadCell = tablelvl2 && tablelvl2.variant === 'head';

  let component;
  if (componentProp) {
    component = componentProp;
  } else {
    component = isHeadCell ? 'th' : 'td';
  }

  let scope = scopeProp;
  if (!scope && isHeadCell) {
    scope = 'col';
  }

  const variant = variantProp || (tablelvl2 && tablelvl2.variant);

  const styleProps = {
    ...props,
    align,
    component,
    padding: paddingProp || (table && table.padding ? table.padding : 'normal'),
    size: sizeProp || (table && table.size ? table.size : 'medium'),
    sortDirection,
    stickyHeader: variant === 'head' && table && table.stickyHeader,
    variant,
  };

  const classes = useUtilityClasses(styleProps);

  let ariaSort = null;
  if (sortDirection) {
    ariaSort = sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  return (
    <TableCellRoot
      as={component}
      ref={ref}
      className={clsx(classes.root, className)}
      aria-sort={ariaSort}
      scope={scope}
      styleProps={styleProps}
      {...other}
    />
  );
});

TableCell.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Set the text-align on the table cell content.
   *
   * Monetary or generally number fields **should be right aligned** as that allows
   * you to add them up quickly in your head without having to worry about decimals.
   * @default 'inherit'
   */
  align: PropTypes.oneOf(['center', 'inherit', 'justify', 'left', 'right']),
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Sets the padding applied to the cell.
   * The prop defaults to the value (`'default'`) inherited from the parent Table component.
   */
  padding: PropTypes.oneOf(['checkbox', 'none', 'normal']),
  /**
   * Set scope attribute.
   */
  scope: PropTypes.string,
  /**
   * Specify the size of the cell.
   * The prop defaults to the value (`'medium'`) inherited from the parent Table component.
   */
  size: PropTypes.oneOf(['medium', 'small']),
  /**
   * Set aria-sort direction.
   */
  sortDirection: PropTypes.oneOf(['asc', 'desc', false]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  variant: PropTypes.oneOf(['body', 'footer', 'head']),
};

export default TableCell;
