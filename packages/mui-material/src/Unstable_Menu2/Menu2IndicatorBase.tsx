'use client';
import * as React from 'react';
import type { ListItemIconProps } from '../ListItemIcon';
import ListItemIcon from '../ListItemIcon';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import type { SlotProps } from '../utils/types';

interface IndicatorSlotProps {
  /**
   * Whether to keep the indicator mounted when the item is not checked.
   * @default true
   */
  keepMounted?: boolean | undefined;
}

// Keep typed DOM props assignable while also accepting data attributes in literals.
export type Menu2IndicatorSlotProps<OwnerState> = SlotProps<
  'span',
  IndicatorSlotProps | (IndicatorSlotProps & { [attribute: `data-${string}`]: unknown }),
  OwnerState
>;

interface IndicatorProps extends ListItemIconProps {
  component?: React.ElementType | undefined;
}

// Pass the element override through ListItemIcon, not through styled(), so its
// classes and theme styles also apply when the indicator uses another element.
const Indicator = React.forwardRef<HTMLDivElement, IndicatorProps>(function Indicator(
  { component = 'span', ...props },
  ref,
) {
  const iconProps = { ...props, as: component };
  return <ListItemIcon {...iconProps} ref={ref} data-mui-menu-indicator="" />;
});

// Each item supplies the theme overrides for its indicator slot.
/**
 * @ignore - internal component.
 */
const Menu2IndicatorBase = styled(Indicator, { slot: 'root' })(
  memoTheme(({ theme }) => ({
    alignItems: 'center',
    // Match MenuItemBase's fixed ListItemIcon column and ListItemText inset.
    minWidth: 36,
    // Match Checkbox and Radio colors, not the color of a decorative ListItemIcon.
    color: (theme.vars || theme).palette.text.secondary,
    '&[data-checked]': {
      color: (theme.vars || theme).palette.primary.main,
    },
  })),
);

export default Menu2IndicatorBase;
