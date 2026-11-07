import type { CSSInterpolation } from '@mui/system';
import type { Theme } from '../styles';
import type { MenuItemProps } from './MenuItem';
import menuItemClasses from './menuItemClasses';

export function menuItemOverridesResolver(
  props: { ownerState: Pick<MenuItemProps, 'dense' | 'divider' | 'disableGutters'> },
  styles: Record<string, CSSInterpolation>,
): CSSInterpolation {
  const { ownerState } = props;

  return [
    styles.root,
    ownerState.dense && styles.dense,
    ownerState.divider && styles.divider,
    !ownerState.disableGutters && styles.gutters,
  ];
}

export function getMenuItemHighlightStyles(theme: Theme): CSSInterpolation {
  return {
    ...(!theme.focusVisible && {
      [`&.${menuItemClasses.focusVisible}`]: {
        backgroundColor: (theme.vars || theme).palette.action.focus,
      },
    }),
  };
}

// Selection belongs to the classic item, not the shared Menu2 presentation.
// Keep selected hover after selected focus to preserve the classic precedence.
export function getMenuItemSelectedStyles(theme: Theme): CSSInterpolation {
  return {
    [`&.${menuItemClasses.selected}`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        (theme.vars || theme).palette.action.selectedOpacity,
      ),
    },
    ...(!theme.focusVisible && {
      [`&.${menuItemClasses.selected}.${menuItemClasses.focusVisible}`]: {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          `${(theme.vars || theme).palette.action.selectedOpacity} + ${(theme.vars || theme).palette.action.focusOpacity}`,
        ),
      },
    }),
    [`&.${menuItemClasses.selected}:hover`]: {
      backgroundColor: theme.alpha(
        (theme.vars || theme).palette.primary.main,
        `${(theme.vars || theme).palette.action.selectedOpacity} + ${
          (theme.vars || theme).palette.action.hoverOpacity
        }`,
      ),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.alpha(
          (theme.vars || theme).palette.primary.main,
          (theme.vars || theme).palette.action.selectedOpacity,
        ),
      },
    },
  };
}
