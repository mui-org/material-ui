import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import ButtonBase from '../ButtonBase';
import ArrowDownwardIcon from '../internal/svg-icons/ArrowDownward';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import capitalize from '../utils/capitalize';
import tableSortLabelClasses, { getTableSortLabelUtilityClass } from './tableSortLabelClasses';

const useUtilityClasses = (styleProps) => {
  const { classes, direction, active } = styleProps;

  const slots = {
    root: ['root', active && 'active'],
    icon: ['icon', `iconDirection${capitalize(direction)}`],
  };

  return composeClasses(slots, getTableSortLabelUtilityClass, classes);
};

const TableSortLabelRoot = styled(ButtonBase, {
  name: 'MuiTableSortLabel',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.root, styleProps.active && styles.active];
  },
})(({ theme }) => ({
  /* Styles applied to the root element. */
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'flex-start',
  flexDirection: 'inherit',
  alignItems: 'center',
  '&:focus': {
    color: theme.palette.text.secondary,
  },
  '&:hover': {
    color: theme.palette.text.secondary,
    [`& .${tableSortLabelClasses.icon}`]: {
      opacity: 0.5,
    },
  },
  [`&.${tableSortLabelClasses.active}`]: {
    color: theme.palette.text.primary,
    [`& .${tableSortLabelClasses.icon}`]: {
      opacity: 1,
      color: theme.palette.text.secondary,
    },
  },
}));

const TableSortLabelIcon = styled('span', {
  name: 'MuiTableSortLabel',
  slot: 'Icon',
  overridesResolver: (props, styles) => {
    const { styleProps } = props;

    return [styles.icon, styles[`iconDirection${capitalize(styleProps.direction)}`]];
  },
})(({ theme, styleProps }) => ({
  /* Styles applied to the icon component. */
  fontSize: 18,
  marginRight: 4,
  marginLeft: 4,
  opacity: 0,
  transition: theme.transitions.create(['opacity', 'transform'], {
    duration: theme.transitions.duration.shorter,
  }),
  userSelect: 'none',
  /* Styles applied to the icon component if `direction="desc"`. */
  ...(styleProps.direction === 'desc' && {
    transform: 'rotate(0deg)',
  }),
  /* Styles applied to the icon component if `direction="asc"`. */
  ...(styleProps.direction === 'asc' && {
    transform: 'rotate(180deg)',
  }),
}));

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
const TableSortLabel = React.forwardRef(function TableSortLabel(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTableSortLabel' });
  const {
    active = false,
    children,
    className,
    direction = 'asc',
    hideSortIcon = false,
    IconComponent = ArrowDownwardIcon,
    ...other
  } = props;

  const styleProps = {
    ...props,
    active,
    direction,
    hideSortIcon,
    IconComponent,
  };

  const classes = useUtilityClasses(styleProps);

  return (
    <TableSortLabelRoot
      className={clsx(classes.root, className)}
      component="span"
      disableRipple
      styleProps={styleProps}
      ref={ref}
      {...other}
    >
      {children}
      {hideSortIcon && !active ? null : (
        <TableSortLabelIcon
          as={IconComponent}
          className={clsx(classes.icon)}
          styleProps={styleProps}
        />
      )}
    </TableSortLabelRoot>
  );
});

TableSortLabel.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   * @default false
   */
  active: PropTypes.bool,
  /**
   * Label contents, the arrow will be appended automatically.
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
   * The current sort direction.
   * @default 'asc'
   */
  direction: PropTypes.oneOf(['asc', 'desc']),
  /**
   * Hide sort icon when active is false.
   * @default false
   */
  hideSortIcon: PropTypes.bool,
  /**
   * Sort icon to use.
   * @default ArrowDownwardIcon
   */
  IconComponent: PropTypes.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,
};

export default TableSortLabel;
