'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { isItemFocusable } from '@mui/utils/useRovingTabIndex';
import contains from '../utils/contains';
import ownerDocument from '../utils/ownerDocument';
import getActiveElement from '../utils/getActiveElement';
import getScrollbarSize from '../utils/getScrollbarSize';
import focusWithVisible from '../utils/focusWithVisible';
import useEventCallback from '../utils/useEventCallback';
import useForkRef from '../utils/useForkRef';
import useEnhancedEffect from '../utils/useEnhancedEffect';
import { useDefaultProps } from '../DefaultPropsProvider';
import { RovingTabIndexContext, useRovingTabIndexRoot } from '../utils/useRovingTabIndex';
import ownerWindow from '../utils/ownerWindow';
import List from '../List';
import { useSelectFocusSource } from '../Select/utils';
import { MenuListContext } from './MenuListContext';

function getItemText(itemOrElement) {
  const element = itemOrElement?.element ?? itemOrElement;

  if (!element) {
    return '';
  }

  if (itemOrElement?.textValue !== undefined) {
    return itemOrElement.textValue;
  }

  let text = element.innerText;
  if (text === undefined) {
    // jsdom doesn't support innerText
    text = element.textContent;
  }

  return text ?? '';
}

function textCriteriaMatches(itemOrElement, textCriteria) {
  if (textCriteria === undefined) {
    return true;
  }

  let text = getItemText(itemOrElement);
  text = text.trim().toLowerCase();

  if (text.length === 0) {
    return false;
  }

  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }

  return text.startsWith(textCriteria.keys.join(''));
}

function isItemFocusableWithTextCriteria(item, criteria) {
  if (!textCriteriaMatches(item, criteria)) {
    return false;
  }

  return isItemFocusable(item);
}

// Menu auto-focus is not always keyboard-driven. On open we often move focus to the
// active item programmatically so arrow-key navigation starts from the right place.
function focusInitialItem(element, focusSource) {
  focusWithVisible(element, focusSource);
}

/**
 * A permanently displayed menu following https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/.
 * It's exposed to help customization of the [`Menu`](/material-ui/api/menu/) component if you
 * use it separately you need to move focus into the component manually. Once
 * the focus is placed inside the component it is fully keyboard accessible.
 */
const MenuList = React.forwardRef(function MenuList(inProps, ref) {
  const props = useDefaultProps({ props: inProps, name: 'MuiMenuList' });
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions,
    autoFocus: autoFocusList = false,
    autoFocusItem: autoFocusActiveItem = false,
    children,
    className,
    disabledItemsFocusable = false,
    disableListWrap = false,
    onKeyDown,
    variant = 'selectedMenu',
    ...other
  } = props;
  const listRef = React.useRef(null);
  const hasFocusedInitialTargetRef = React.useRef(false);
  // Escape hatch for <Menu variant="menu"> (items have no selection state). When opened with
  // mouse/pointer, the initial focused item should still receive DOM focus, but ButtonBase
  // should suppress its focus-visible state for that one initial handoff.
  const [suppressInitialFocusVisible, setSuppressInitialFocusVisible] = React.useState(false);
  // Current anchored <Menu>s cannot receive a `openInteractionType` signal from a trigger
  // the API only receives `open` and `anchorEl`. When <MenuList> is used in <Select>, the
  // internal <SelectInput> is able to achieve this via `useSelectFocusSource`.
  const focusSource = useSelectFocusSource();
  const textCriteriaRef = React.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null,
  });

  const getDefaultActiveItemId = React.useCallback(
    (items) => {
      if (variant === 'selectedMenu') {
        return (
          items.find((item) => item.selected && isItemFocusable(item))?.id ??
          items.find((item) => isItemFocusable(item))?.id ??
          null
        );
      }

      return items.find((item) => isItemFocusable(item))?.id ?? null;
    },
    [variant],
  );

  const rovingContainer = useRovingTabIndexRoot({
    activeItemId: undefined,
    getDefaultActiveItemId,
    orientation: 'vertical',
    wrap: !disableListWrap,
  });
  const { activeItemId, focusNext, getActiveItem, getContainerProps, getItemMap } = rovingContainer;

  const focusInitialTarget = useEventCallback((force = false) => {
    // `force` is used by the imperative action when `Menu` asks `MenuList` to restore its
    // initial focus target after the popover finishes entering, even if this list already
    // completed its normal one-time initial-focus path on an earlier render.
    if (!listRef.current || (!force && hasFocusedInitialTargetRef.current)) {
      return null;
    }

    if (autoFocusActiveItem) {
      const activeItem = getActiveItem();

      if (activeItem?.element) {
        const hasSelectedItem = Array.from(getItemMap().values()).some((item) => item.selected);
        const shouldSuppressInitialFocusVisible =
          variant === 'menu' && hasSelectedItem && !activeItem.selected && focusSource == null;

        setSuppressInitialFocusVisible(shouldSuppressInitialFocusVisible);
        focusInitialItem(activeItem.element, focusSource);
        hasFocusedInitialTargetRef.current = true;
        return activeItem.element;
      }

      if (!autoFocusList) {
        return null;
      }

      // Keep the list container focusable while waiting for items to register,
      // or when there is no focusable item to move to.
      setSuppressInitialFocusVisible(false);
      listRef.current.focus();
      return listRef.current;
    }

    if (!autoFocusList) {
      setSuppressInitialFocusVisible(false);
      return null;
    }

    setSuppressInitialFocusVisible(false);
    listRef.current.focus();
    hasFocusedInitialTargetRef.current = true;
    return listRef.current;
  });

  useEnhancedEffect(() => {
    if (!autoFocusList && !autoFocusActiveItem) {
      hasFocusedInitialTargetRef.current = false;
      setSuppressInitialFocusVisible(false);
      return undefined;
    }

    focusInitialTarget();

    return undefined;
  }, [activeItemId, autoFocusActiveItem, autoFocusList, focusInitialTarget]);

  React.useImperativeHandle(
    actions,
    () => ({
      adjustStyleForScrollbar: (containerElement, { direction }) => {
        // Let's ignore that piece of logic if users are already overriding the width
        // of the menu.
        const noExplicitWidth = !listRef.current.style.width;
        if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
          const win = ownerWindow(containerElement);
          const scrollbarSize = getScrollbarSize(win);
          // Overlay scrollbars (e.g. macOS, Windows 11) have zero width — there is
          // nothing to compensate for, and writing the inline styles anyway would
          // freeze the current padding, overriding later theme/CSS changes.
          if (scrollbarSize > 0) {
            const scrollbarSizePx = `${scrollbarSize}px`;
            const paddingKey = direction === 'rtl' ? 'paddingLeft' : 'paddingRight';
            // Preserve any existing padding (e.g. set via theme/CSS) by adding to it
            // rather than replacing it with the scrollbar width alone.
            const existingPadding =
              parseFloat(win.getComputedStyle(listRef.current)[paddingKey]) || 0;
            listRef.current.style[paddingKey] = `${existingPadding + scrollbarSize}px`;
            listRef.current.style.width = `calc(100% + ${scrollbarSizePx})`;
          }
        }
        return listRef.current;
      },
      focusInitialTarget: () => {
        if (!listRef.current) {
          return null;
        }

        const currentFocus = getActiveElement(ownerDocument(listRef.current));

        if (currentFocus && contains(listRef.current, currentFocus)) {
          return currentFocus;
        }

        return focusInitialTarget(true);
      },
    }),
    [focusInitialTarget],
  );

  const rovingContainerProps = getContainerProps(undefined, other.onFocus);
  const handleRef = useForkRef(listRef, rovingContainerProps.ref, ref);
  const menuListContextValue = React.useMemo(
    () => ({
      itemsFocusableWhenDisabled: disabledItemsFocusable,
      suppressInitialFocusVisible,
      variant,
    }),
    [disabledItemsFocusable, suppressInitialFocusVisible, variant],
  );

  const handleKeyDown = useEventCallback((event) => {
    if (suppressInitialFocusVisible) {
      setSuppressInitialFocusVisible(false);
    }

    const isModifierKeyPressed = event.ctrlKey || event.metaKey || event.altKey;

    if (isModifierKeyPressed && onKeyDown) {
      onKeyDown(event);

      return;
    }

    rovingContainerProps.onKeyDown(event);

    if (event.key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = event.key.toLowerCase();
      const currTime = performance.now();

      if (criteria.keys.length > 0) {
        // Reset
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }

      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);

      const currentFocus = getActiveElement(ownerDocument(listRef.current));
      const keepFocusOnCurrent =
        currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);

      if (
        criteria.previousKeyMatched &&
        (keepFocusOnCurrent ||
          focusNext((item) => isItemFocusableWithTextCriteria(item, criteria)) != null)
      ) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }

    if (onKeyDown) {
      onKeyDown(event);
    }
  });

  return (
    <List
      role="menu"
      ref={handleRef}
      className={className}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      {...other}
      onFocus={rovingContainerProps.onFocus}
    >
      <MenuListContext.Provider value={menuListContextValue}>
        <RovingTabIndexContext.Provider value={rovingContainer}>
          {children}
        </RovingTabIndexContext.Provider>
      </MenuListContext.Provider>
    </List>
  );
});

MenuList.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: PropTypes.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: PropTypes.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: PropTypes.bool,
  /**
   * @ignore
   */
  onFocus: PropTypes.func,
  /**
   * @ignore
   */
  onKeyDown: PropTypes.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu']),
};

export default MenuList;
