'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import exactProp from '@mui/utils/exactProp';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import useEventCallback from '@mui/utils/useEventCallback';
import Menu2SubmenuClosingContext from '../Unstable_Menu2/Menu2SubmenuClosingContext';
import { useDefaultProps } from '../DefaultPropsProvider';

/**
 * Controls a submenu without rendering an element.
 * Place `Menu2SubmenuTrigger` and `Menu2SubmenuPopup` inside this component.
 */
export interface Menu2SubmenuProps extends Pick<
  BaseMenu.SubmenuRoot.Props,
  'closeParentOnEsc' | 'defaultOpen' | 'highlightItemOnHover' | 'loopFocus' | 'open'
> {
  /**
   * A ref to imperative actions.
   * - `unmount`: Ends the closing phase of the menu after an externally controlled closing animation finishes.
   *   Call `preventUnmountOnClose()` in `onOpenChange` first, otherwise the menu completes closing on its own.
   *   Whether it leaves the DOM is decided by `keepMounted` on `Menu2SubmenuPopup`.
   * - `close`: Closes the menu imperatively when called.
   */
  actionsRef?: BaseMenu.SubmenuRoot.Props['actionsRef'] | undefined;
  /**
   * The submenu trigger and popup.
   */
  children?: React.ReactNode;
  /**
   * Event handler called when the submenu is opened or closed.
   * @param {boolean} open The new open state.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onOpenChange?: BaseMenu.SubmenuRoot.Props['onOpenChange'] | undefined;
  /**
   * Event handler called after the opening or closing animation completes.
   * @param {boolean} open Whether the submenu is open.
   */
  onOpenChangeComplete?: BaseMenu.SubmenuRoot.Props['onOpenChangeComplete'] | undefined;
}

// With these close reasons the pointer is on another row, so focus does not return.
const pointerLeaveReasons = new Set<string>(['trigger-hover', 'sibling-open']);

/**
 * Controls a submenu without rendering a DOM element.
 * Use `MuiMenu2Submenu.defaultProps` to set behavior defaults in the theme.
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Submenu API](https://next.mui.com/material-ui/api/menu-2-submenu/)
 */
function Menu2Submenu(inProps: Menu2SubmenuProps) {
  const props = useDefaultProps({ props: inProps, name: 'MuiMenu2Submenu' });
  const {
    children,
    actionsRef,
    closeParentOnEsc,
    defaultOpen,
    highlightItemOnHover,
    loopFocus,
    onOpenChange,
    onOpenChangeComplete,
    open,
  } = props;

  // Keep the exit tint for focus return, but clear it when the pointer leaves.
  const [closing, setClosing] = React.useState(false);
  const [retainClosingTint, setRetainClosingTint] = React.useState(true);
  const handleOpenChange = useEventCallback<NonNullable<Menu2SubmenuProps['onOpenChange']>>(
    (nextOpen, details) => {
      onOpenChange?.(nextOpen, details);
      if (!details.isCanceled) {
        setRetainClosingTint(nextOpen || !pointerLeaveReasons.has(details.reason));
      }
    },
  );
  const handleClosingChange = useEventCallback((nextClosing: boolean) => {
    setClosing(nextClosing);
    if (closing && !nextClosing) {
      setRetainClosingTint(true);
    }
  });
  const closingContext = React.useMemo(
    () => ({ closing, retainClosingTint, onClosingChange: handleClosingChange }),
    [closing, retainClosingTint, handleClosingChange],
  );

  return (
    <BaseMenu.SubmenuRoot
      actionsRef={actionsRef}
      closeParentOnEsc={closeParentOnEsc}
      defaultOpen={defaultOpen}
      highlightItemOnHover={highlightItemOnHover}
      loopFocus={loopFocus}
      onOpenChange={handleOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
    >
      <Menu2SubmenuClosingContext.Provider value={closingContext}>
        {children}
      </Menu2SubmenuClosingContext.Provider>
    </BaseMenu.SubmenuRoot>
  );
}

Menu2Submenu.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref to imperative actions.
   * - `unmount`: Ends the closing phase of the menu after an externally controlled closing animation finishes.
   *   Call `preventUnmountOnClose()` in `onOpenChange` first, otherwise the menu completes closing on its own.
   *   Whether it leaves the DOM is decided by `keepMounted` on `Menu2SubmenuPopup`.
   * - `close`: Closes the menu imperatively when called.
   */
  actionsRef: PropTypes.shape({
    current: PropTypes.shape({
      close: PropTypes.func.isRequired,
      unmount: PropTypes.func.isRequired,
    }),
  }),
  /**
   * The submenu trigger and popup.
   */
  children: PropTypes.node,
  /**
   * When in a submenu, determines whether pressing the Escape key
   * closes the entire menu, or only the current child menu.
   * @default false
   */
  closeParentOnEsc: PropTypes.bool,
  /**
   * Whether the menu is initially open.
   *
   * To render a controlled menu, use the `open` prop instead.
   * @default false
   */
  defaultOpen: PropTypes.bool,
  /**
   * Whether moving the pointer over items should highlight them.
   * Disabling this prop allows CSS `:hover` to be differentiated from the `:focus` (`data-highlighted`) state.
   * @default true
   */
  highlightItemOnHover: PropTypes.bool,
  /**
   * Whether to loop keyboard focus back to the first item
   * when the end of the list is reached while using the arrow keys.
   * @default true
   */
  loopFocus: PropTypes.bool,
  /**
   * Event handler called when the submenu is opened or closed.
   * @param {boolean} open The new open state.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onOpenChange: PropTypes.func,
  /**
   * Event handler called after the opening or closing animation completes.
   * @param {boolean} open Whether the submenu is open.
   */
  onOpenChangeComplete: PropTypes.func,
  /**
   * Whether the menu is currently open.
   */
  open: PropTypes.bool,
} as any;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  (Menu2Submenu as any)['propTypes' + ''] = exactProp(Menu2Submenu.propTypes);
}

export default Menu2Submenu;
