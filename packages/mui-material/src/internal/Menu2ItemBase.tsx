'use client';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { getMenuItemHighlightStyles, menuItemOverridesResolver } from '../MenuItem/menuItemStyles';
import type { Menu2ItemOwnerState } from '../Unstable_Menu2Item/Menu2Item';
import MenuItemBase from './MenuItemBase';

/**
 * @ignore - internal component.
 */
const Menu2ItemBase = styled(MenuItemBase, {
  name: 'MuiMenu2Item',
  slot: 'root',
  overridesResolver: menuItemOverridesResolver,
})<{ ownerState: Menu2ItemOwnerState }>(
  memoTheme(({ theme }) => getMenuItemHighlightStyles(theme)),
);

export default Menu2ItemBase;
