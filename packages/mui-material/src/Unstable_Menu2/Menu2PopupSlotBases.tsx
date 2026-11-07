'use client';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import Paper from '../Paper';
import List from '../List';
import { menu2PopupClasses, menu2SubmenuPopupClasses } from './menu2Classes';

// Common Menu2 theme styles precede the submenu-specific styles.
// The final popup wrappers resolve sx after both theme layers.
/**
 * @ignore - internal component.
 */
export const Menu2PortalBase = styled('div', { name: 'MuiMenu2Popup', slot: 'portal' })(
  memoTheme(({ theme }) => ({
    // Keep Base UI's interaction backdrop and the popup in one stacking context.
    // This layer has no full-screen box, so non-modal menus remain click-through.
    // Keep it out of layout so it does not resize the anchor when content changes.
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: (theme.vars || theme).zIndex.modal,
    // Base UI hides the positioner after its exit transition, but retains the
    // portal with keepMounted. Hide this layer too, including its own styles.
    [`&:has(> .${menu2PopupClasses.positioner}[hidden], > .${menu2SubmenuPopupClasses.positioner}[hidden])`]:
      { display: 'none' },
  })),
);

export const Menu2PositionerBase = styled('div', { name: 'MuiMenu2Popup', slot: 'positioner' })({
  // The portal controls page stacking. Keep the popup above its sibling backdrops.
  zIndex: 1,
});

export const Menu2RootBase = styled(Paper, { name: 'MuiMenu2Popup', slot: 'root' })({
  outline: 0,
  // Support momentum scrolling on iOS versions before 13.
  WebkitOverflowScrolling: 'touch',
  // The popup has no full-screen Modal. Limit its height to the viewport
  // and the space available at the anchor, not to its parent's height.
  maxHeight: 'min(calc(100vh - 96px), var(--available-height))',
  overflowY: 'auto',
  // Grow uses the origin that Base UI sets on the positioner.
  transformOrigin: 'var(--transform-origin)',
});

export const Menu2ListBase = styled(List, { name: 'MuiMenu2Popup', slot: 'list' })({
  // The items, not the list, show focus.
  outline: 0,
});
