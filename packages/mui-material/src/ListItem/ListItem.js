'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import useSlot from '../utils/useSlot';
import ListContext from '../List/ListContext';
import { getListItemUtilityClass } from './listItemClasses';
import { listItemButtonClasses } from '../ListItemButton';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import { getTransitionStyles } from '../transitions/utils';

export const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
    !ownerState.disablePadding && styles.padding,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { alignItems, classes, dense, disableGutters, disablePadding, divider } = ownerState;

  const slots = {
    root: [
      'root',
      dense && 'dense',
      !disableGutters && 'gutters',
      !disablePadding && 'padding',
      divider && 'divider',
      alignItems === 'flex-start' && 'alignItemsFlexStart',
    ],
    secondaryAction: ['secondaryAction'],
  };

  return composeClasses(slots, getListItemUtilityClass, classes);
};

export const ListItemRoot = styled('div', {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'left',
    variants: [
      {
        props: ({ ownerState }) => !ownerState.disablePadding,
        style: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disablePadding && ownerState.dense,
        style: {
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disablePadding && !ownerState.disableGutters,
        style: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
      {
        props: ({ ownerState }) => !ownerState.disablePadding && !!ownerState.secondaryAction,
        style: {
          // Add some space to avoid collision as `ListItemSecondaryAction`
          // is absolutely positioned.
          paddingRight: 48,
        },
      },
      {
        props: ({ ownerState }) => !!ownerState.secondaryAction,
        style: {
          [`& > .${listItemButtonClasses.root}`]: {
            paddingRight: 48,
          },
        },
      },
      {
        props: {
          alignItems: 'flex-start',
        },
        style: {
          alignItems: 'flex-start',
        },
      },
      {
        props: ({ ownerState }) => ownerState.divider,
        style: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          backgroundClip: 'padding-box',
        },
      },
      {
        props: ({ ownerState }) => ownerState.button,
        style: {
          ...getTransitionStyles(theme, 'background-color', {
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            textDecoration: 'none',
            backgroundColor: (theme.vars || theme).palette.action.hover,
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
    ],
  })),
);

const StyledListItemSecondaryAction = styled(ListItemSecondaryAction, {
  name: 'MuiListItem',
  slot: 'secondaryAction',
})({});

const ListItem = React.forwardRef(function ListItem(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiListItem' });
  const {
    alignItems = 'center',
    children: childrenProp,
    className,
    component: componentProp = 'li',
    dense = false,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    secondaryAction,
    slotProps = {},
    slots = {},
    ...other
  } = props;

  const context = React.useContext(ListContext);
  const childContext = React.useMemo(
    () => ({
      dense: dense || context.dense || false,
      alignItems,
      disableGutters,
    }),
    [alignItems, context.dense, dense, disableGutters],
  );

  const ownerState = {
    ...props,
    alignItems,
    dense: childContext.dense,
    disableGutters,
    disablePadding,
    divider,
    secondaryAction,
  };

  const classes = useUtilityClasses(ownerState);

  const externalForwardedProps = {
    slots,
    slotProps,
  };

  const [RootSlot, rootSlotProps] = useSlot('root', {
    ref,
    elementType: ListItemRoot,
    externalForwardedProps: {
      component: componentProp,
      ...externalForwardedProps,
      ...other,
    },
    ownerState,
    className: clsx(classes.root, className),
  });

  const [SecondaryActionSlot, secondaryActionSlotProps] = useSlot('secondaryAction', {
    elementType: StyledListItemSecondaryAction,
    shouldForwardComponentProp: true,
    externalForwardedProps,
    ownerState,
    className: classes.secondaryAction,
  });

  return (
    <ListContext.Provider value={childContext}>
      <RootSlot {...rootSlotProps}>
        {childrenProp}
        {secondaryAction && (
          <SecondaryActionSlot {...secondaryActionSlotProps}>{secondaryAction}</SecondaryActionSlot>
        )}
      </RootSlot>
    </ListContext.Provider>
  );
});

ListItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: PropTypes.oneOf(['center', 'flex-start']),
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
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, all padding is removed.
   * @default false
   */
  disablePadding: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * The element to display at the end of ListItem.
   */
  secondaryAction: PropTypes.node,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    secondaryAction: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
    secondaryAction: PropTypes.elementType,
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ListItem;
