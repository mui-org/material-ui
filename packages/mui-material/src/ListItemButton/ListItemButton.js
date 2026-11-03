'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { applyInsetFocusVisible } from '../styles/focusVisible';
import { useDefaultProps } from '../DefaultPropsProvider';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import ButtonBase from '../ButtonBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import useForkRef from '../utils/useForkRef';
import ListContext from '../List/ListContext';
import listItemButtonClasses, { getListItemButtonUtilityClass } from './listItemButtonClasses';
import { getTransitionStyles } from '../transitions/utils';

export const overridesResolver = (props, styles) => {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.alignItems === 'flex-start' && styles.alignItemsFlexStart,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ];
};

const useUtilityClasses = (ownerState) => {
  const { alignItems, classes, dense, disabled, disableGutters, divider, selected } = ownerState;

  const slots = {
    root: [
      'root',
      dense && 'dense',
      !disableGutters && 'gutters',
      divider && 'divider',
      disabled && 'disabled',
      alignItems === 'flex-start' && 'alignItemsFlexStart',
      selected && 'selected',
    ],
  };

  const composedClasses = composeClasses(slots, getListItemButtonUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

const ListItemButtonRoot = styled(ButtonBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiListItemButton',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => ({
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    textDecoration: 'none',
    minWidth: 0,
    boxSizing: 'border-box',
    textAlign: 'left',
    paddingTop: 8,
    paddingBottom: 8,
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
    [`&.${listItemButtonClasses.selected}`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.action.selectedOpacity,
      ),
      ...(!theme.focusVisible && {
        [`&.${listItemButtonClasses.focusVisible}`]: {
          backgroundColor: theme.alpha(
            (theme.vars || theme).palette.primary.main,
            `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
          ),
        },
      }),
    },
    [`&.${listItemButtonClasses.selected}:hover`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.hoverOpacity}`,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.selectedOpacity,
        ),
      },
    },
    ...(theme.focusVisible
      ? // Inset the ring: a scrolling List (drawers, long lists) clips an outset ring.
        applyInsetFocusVisible(1)
      : {
          [`&.${listItemButtonClasses.focusVisible}`]: {
            backgroundColor: (theme.vars || theme).palette.action.focus,
          },
        }),
    [`&.${listItemButtonClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
    variants: [
      {
        props: ({ ownerState }) => ownerState.divider,
        style: {
          borderBottom: `1px solid ${(theme.vars || theme).palette.divider}`,
          backgroundClip: 'padding-box',
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
        props: ({ ownerState }) => !ownerState.disableGutters,
        style: {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
      {
        props: ({ ownerState }) => ownerState.dense,
        style: {
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
    ],
  })),
);

const ListItemButton = React.forwardRef(function ListItemButton(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiListItemButton' });
  const {
    alignItems = 'center',
    autoFocus = false,
    component = 'div',
    children,
    dense = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false,
    className,
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

  const listItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: Unable to set focus to a ListItemButton whose component has not been rendered.',
        );
      }
    }
  }, [autoFocus]);

  const ownerState = {
    ...props,
    alignItems,
    dense: childContext.dense,
    disableGutters,
    divider,
    selected,
  };

  const classes = useUtilityClasses(ownerState);

  // Don't forward the 'root' class to the ButtonBase, as it will get duplicated with the one passed to the className prop.
  const { root, ...forwardedClasses } = classes;

  const handleRef = useForkRef(listItemRef, ref);

  return (
    <ListContext.Provider value={childContext}>
      <ListItemButtonRoot
        ref={handleRef}
        href={other.href || other.to}
        // `ButtonBase` processes `href` or `to` if `component` is set to 'button'
        component={(other.href || other.to) && component === 'div' ? 'button' : component}
        internalNativeButton={false}
        focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
        ownerState={ownerState}
        className={clsx(classes.root, className)}
        {...other}
        classes={forwardedClasses}
      >
        {children}
      </ListItemButtonRoot>
    </ListContext.Provider>
  );
});

ListItemButton.propTypes /* remove-proptypes */ = {
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
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: PropTypes.bool,
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: PropTypes.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: PropTypes.string,
  /**
   * @ignore
   */
  href: PropTypes.string,
  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default ListItemButton;
