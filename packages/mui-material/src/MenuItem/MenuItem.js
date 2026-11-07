'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import composeClasses from '@mui/utils/composeClasses';
import rootShouldForwardProp from '../styles/rootShouldForwardProp';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { useDefaultProps } from '../DefaultPropsProvider';
import ListContext from '../List/ListContext';
import MenuItemBase from '../internal/MenuItemBase';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import focusWithVisible from '../utils/focusWithVisible';
import useForkRef from '../utils/useForkRef';
import useId from '../utils/useId';
import { useRovingTabIndexItem } from '../utils/useRovingTabIndex';
import { useMenuListContext } from '../MenuList/MenuListContext';
import { useSelectFocusSource } from '../Select/utils';
import { getMenuItemUtilityClass } from './menuItemClasses';
import {
  getMenuItemHighlightStyles,
  getMenuItemSelectedStyles,
  menuItemOverridesResolver,
} from './menuItemStyles';

export const overridesResolver = menuItemOverridesResolver;

const useUtilityClasses = (ownerState) => {
  const { disabled, dense, divider, disableGutters, selected, classes } = ownerState;
  const slots = {
    root: [
      'root',
      dense && 'dense',
      disabled && 'disabled',
      !disableGutters && 'gutters',
      divider && 'divider',
      selected && 'selected',
    ],
  };

  const composedClasses = composeClasses(slots, getMenuItemUtilityClass, classes);

  return {
    ...classes,
    ...composedClasses,
  };
};

const MenuItemRoot = styled(MenuItemBase, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver,
})(
  memoTheme(({ theme }) => getMenuItemSelectedStyles(theme)),
  memoTheme(({ theme }) => getMenuItemHighlightStyles(theme)),
);

const MenuItem = React.forwardRef(function MenuItem(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiMenuItem' });
  const {
    autoFocus: shouldAutoFocusOnMount = false,
    component = 'li',
    dense = false,
    divider = false,
    disableGutters = false,
    focusVisibleClassName,
    role = 'menuitem',
    tabIndex: tabIndexProp,
    className,
    ...other
  } = props;

  // `menuitemcheckbox`/`menuitemradio` require `aria-checked`; derive it from `selected`
  // (an omitted `selected` means unchecked). Other roles keep `selected` presentational.
  const isCheckableRole = role === 'menuitemcheckbox' || role === 'menuitemradio';
  const ariaChecked = isCheckableRole ? Boolean(props.selected) : undefined;

  const focusSource = useSelectFocusSource();
  const context = React.useContext(ListContext);
  const childContext = React.useMemo(
    () => ({
      dense: dense || context.dense || false,
      disableGutters,
    }),
    [context.dense, dense, disableGutters],
  );
  const menuListContext = useMenuListContext();
  const rovingItemId = useId();
  // Escape hatch via ButtonBase for when an anchored <Menu> is opened with a pointer
  // interaction on a trigger, the item should receive DOM focus but without focus visible
  // styling. Current API does not allow a reliable `openInteractionType` for anchored menus.
  const suppressFocusVisible = menuListContext.suppressInitialFocusVisible;
  const itemsFocusableWhenDisabled = menuListContext.itemsFocusableWhenDisabled;

  const menuItemRef = React.useRef(null);
  useEnhancedEffect(() => {
    if (shouldAutoFocusOnMount) {
      if (menuItemRef.current) {
        focusWithVisible(menuItemRef.current, focusSource);
      } else if (process.env.NODE_ENV !== 'production') {
        console.error(
          'MUI: Unable to set focus to a MenuItem whose component has not been rendered.',
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldAutoFocusOnMount]);

  const ownerState = {
    ...props,
    dense: childContext.dense,
    divider,
    disableGutters,
  };

  const classes = useUtilityClasses(props);

  // Don't forward the 'root' class to the ButtonBase, as it will get duplicated with the one passed to the className prop.
  const { root, ...forwardedClasses } = classes;

  const rovingItemProps = useRovingTabIndexItem({
    id: rovingItemId,
    ref,
    disabled: props.disabled,
    focusableWhenDisabled: itemsFocusableWhenDisabled,
    selected: props.selected,
  });

  const handleRef = useForkRef(menuItemRef, rovingItemProps.ref);

  let tabIndex;
  if (tabIndexProp !== undefined) {
    tabIndex = tabIndexProp;
  } else if (menuListContext.variant === 'selectedMenu') {
    tabIndex = rovingItemProps.tabIndex;
  } else if (!props.disabled || itemsFocusableWhenDisabled) {
    // In `menu` variant, registration still drives arrow-key navigation even
    // though each item keeps `tabIndex={-1}`.
    tabIndex = -1;
  }

  return (
    <ListContext.Provider value={childContext}>
      <MenuItemRoot
        ref={handleRef}
        role={role}
        aria-checked={ariaChecked}
        tabIndex={tabIndex}
        component={component}
        internalNativeButton={false}
        focusableWhenDisabled={itemsFocusableWhenDisabled}
        suppressFocusVisible={suppressFocusVisible}
        focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
        className={clsx(classes.root, className)}
        {...other}
        ownerState={ownerState}
        classes={forwardedClasses}
      />
    </ListContext.Provider>
  );
});

MenuItem.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
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
   * The prop defaults to the value inherited from the parent Menu component.
   * @default false
   */
  dense: PropTypes.bool,
  /**
   * @ignore
   */
  disabled: PropTypes.bool,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, a 1px light border is added to the bottom of the menu item.
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
  role: PropTypes.string,
  /**
   * If `true`, the component is selected.
   * For `menuitemcheckbox` and `menuitemradio` roles, this also drives `aria-checked`.
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
  /**
   * @default 0
   */
  tabIndex: PropTypes.number,
};

export default MenuItem;
