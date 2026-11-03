'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import { useDefaultProps } from '../DefaultPropsProvider';
import ListContext from './ListContext';
import { getListUtilityClass } from './listClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, disablePadding, dense, subheader } = ownerState;

  const slots = {
    root: ['root', !disablePadding && 'padding', dense && 'dense', subheader && 'subheader'],
  };

  return composeClasses(slots, getListUtilityClass, classes);
};

const ListRoot = styled('ul', {
  name: 'MuiList',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      styles.root,
      !ownerState.disablePadding && styles.padding,
      ownerState.dense && styles.dense,
      ownerState.subheader && styles.subheader,
    ];
  },
})({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  position: 'relative',
  variants: [
    {
      props: ({ ownerState }) => !ownerState.disablePadding,
      style: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
    {
      props: ({ ownerState }) => ownerState.subheader,
      style: {
        paddingTop: 0,
        isolation: 'isolate', // Prevent overlap with iOS overlay scrollbars.
      },
    },
  ],
});

const List = React.forwardRef(function List(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiList' });
  const {
    children,
    className,
    component = 'ul',
    dense = false,
    disablePadding = false,
    subheader,
    ...other
  } = props;

  const context = React.useMemo(() => ({ dense }), [dense]);

  const ownerState = {
    ...props,
    component,
    dense,
    disablePadding,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListContext.Provider value={context}>
      <ListRoot
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        ownerState={ownerState}
        {...other}
      >
        {subheader}
        {children}
      </ListRoot>
    </ListContext.Provider>
  );
});

List.propTypes /* remove-proptypes */ = {
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
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: PropTypes.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: PropTypes.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default List;
