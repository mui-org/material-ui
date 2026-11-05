'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import exactProp from '@mui/utils/exactProp';
import useEventCallback from '@mui/utils/useEventCallback';
import { useRtl } from '@mui/system/RtlProvider';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { useDefaultProps } from '../DefaultPropsProvider';
import Menu2ModalContext from './Menu2ModalContext';

/**
 * Controls a menu without rendering an element.
 * Place `Menu2Trigger` and `Menu2Popup` inside this component.
 */
export interface Menu2Props extends Pick<
  BaseMenu.Root.Props,
  'defaultOpen' | 'disabled' | 'highlightItemOnHover' | 'loopFocus' | 'open'
> {
  /**
   * A ref to imperative actions.
   * - `unmount`: Ends the closing phase of the menu after an externally controlled closing animation finishes.
   *   Call `preventUnmountOnClose()` in `onOpenChange` first, otherwise the menu completes closing on its own.
   *   Whether it leaves the DOM is decided by `keepMounted` on `Menu2Popup`.
   * - `close`: Closes the menu imperatively when called.
   */
  actionsRef?: BaseMenu.Root.Props['actionsRef'] | undefined;
  /**
   * The menu trigger and popup.
   */
  children?: React.ReactNode;
  /**
   * Determines if the menu enters a modal state when open.
   * - `true`: the page scroll is locked, and the popup backdrop blocks pointer interactions outside the menu.
   * - `false`: user interaction with the rest of the document is allowed.
   *
   * Nested menus ignore this prop, and menus opened by hover are never modal.
   * @default true
   */
  modal?: boolean | undefined;
  /**
   * Event handler called when the menu is opened or closed.
   * @param {boolean} open The new open state.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onOpenChange?: BaseMenu.Root.Props['onOpenChange'] | undefined;
  /**
   * Event handler called after the opening or closing animation completes.
   * @param {boolean} open Whether the menu is open.
   */
  onOpenChangeComplete?: BaseMenu.Root.Props['onOpenChangeComplete'] | undefined;
}

/**
 * Controls a menu without rendering a DOM element.
 * Use `MuiMenu2.defaultProps` to set behavior defaults in the theme.
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2 API](https://next.mui.com/material-ui/api/menu-2/)
 */
function Menu2(inProps: Menu2Props) {
  const props = useDefaultProps({ props: inProps, name: 'MuiMenu2' });
  const {
    children,
    actionsRef,
    defaultOpen,
    disabled,
    highlightItemOnHover,
    loopFocus,
    modal = true,
    onOpenChange,
    onOpenChangeComplete,
    open,
  } = props;
  const isRtl = useRtl();
  // Like Base UI, use the reason of the last change that is not canceled.
  // A menu opened by hover is not modal.
  const [hoverOpen, setHoverOpen] = React.useState(false);
  const handleOpenChange = useEventCallback<NonNullable<Menu2Props['onOpenChange']>>(
    (nextOpen, eventDetails) => {
      onOpenChange?.(nextOpen, eventDetails);
      if (!eventDetails.isCanceled) {
        setHoverOpen(eventDetails.reason === 'trigger-hover');
      }
    },
  );

  return (
    <DirectionProvider direction={isRtl ? 'rtl' : 'ltr'}>
      <BaseMenu.Root
        actionsRef={actionsRef}
        defaultOpen={defaultOpen}
        disabled={disabled}
        highlightItemOnHover={highlightItemOnHover}
        loopFocus={loopFocus}
        // Material UI owns the modal state. ModalManager locks the scroll and
        // the popup backdrop blocks outside clicks.
        modal={false}
        onOpenChange={handleOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        open={open}
      >
        <Menu2ModalContext.Provider value={modal && !hoverOpen}>
          {children}
        </Menu2ModalContext.Provider>
      </BaseMenu.Root>
    </DirectionProvider>
  );
}

Menu2.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref to imperative actions.
   * - `unmount`: Ends the closing phase of the menu after an externally controlled closing animation finishes.
   *   Call `preventUnmountOnClose()` in `onOpenChange` first, otherwise the menu completes closing on its own.
   *   Whether it leaves the DOM is decided by `keepMounted` on `Menu2Popup`.
   * - `close`: Closes the menu imperatively when called.
   */
  actionsRef: PropTypes.shape({
    current: PropTypes.shape({
      close: PropTypes.func.isRequired,
      unmount: PropTypes.func.isRequired,
    }),
  }),
  /**
   * The menu trigger and popup.
   */
  children: PropTypes.node,
  /**
   * Whether the menu is initially open.
   *
   * To render a controlled menu, use the `open` prop instead.
   * @default false
   */
  defaultOpen: PropTypes.bool,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
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
   * Determines if the menu enters a modal state when open.
   * - `true`: the page scroll is locked, and the popup backdrop blocks pointer interactions outside the menu.
   * - `false`: user interaction with the rest of the document is allowed.
   *
   * Nested menus ignore this prop, and menus opened by hover are never modal.
   * @default true
   */
  modal: PropTypes.bool,
  /**
   * Event handler called when the menu is opened or closed.
   * @param {boolean} open The new open state.
   * @param {object} eventDetails The reason for the change and the native event.
   */
  onOpenChange: PropTypes.func,
  /**
   * Event handler called after the opening or closing animation completes.
   * @param {boolean} open Whether the menu is open.
   */
  onOpenChangeComplete: PropTypes.func,
  /**
   * Whether the menu is currently open.
   */
  open: PropTypes.bool,
} as any;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  (Menu2 as any)['propTypes' + ''] = exactProp(Menu2.propTypes);
}

export default Menu2;
