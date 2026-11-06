'use client';
import * as React from 'react';
import clsx from 'clsx';
import { useRtl } from '@mui/system/RtlProvider';
import type { HTMLProps } from '@base-ui/react/types';
import MenuItemBase from '../internal/MenuItemBase';
import Menu2ItemRenderRoot from '../internal/Menu2ItemRenderRoot';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import menuItemClasses from '../MenuItem/menuItemClasses';
import useSlot from '../utils/useSlot';
import { styled } from '../zero-styled';
import memoTheme from '../utils/memoTheme';
import { getMenuItemHighlightStyles, menuItemOverridesResolver } from '../MenuItem/menuItemStyles';
import type { Theme } from '../styles';
import { Menu2ItemRootSlot } from '../Unstable_Menu2/menu2ItemShared';
import { menu2SubmenuTriggerClasses } from '../Unstable_Menu2/menu2Classes';
import type {
  Menu2SubmenuTriggerProps,
  Menu2SubmenuTriggerOwnerState,
} from './Menu2SubmenuTrigger';

function menu2SubmenuTriggerStyles(theme: Theme, selector: string) {
  // Keyboard focus takes precedence over the open tint. With a focus ring,
  // the tint stays because it shows the open state, not focus.
  // Keep the focus guard at zero specificity so state style overrides can win.
  const notFocused = theme.focusVisible ? '' : `:where(:not(.${menuItemClasses.focusVisible}))`;

  return {
    [`&${selector}${notFocused}`]: {
      backgroundColor: (theme.vars || theme).palette.action.hover,
    },
  };
}

// Put the open tint before the common item overrides, as with the other defaults.
const Menu2SubmenuTriggerBase = styled(MenuItemBase, {
  name: 'MuiMenu2Item',
  slot: 'root',
  overridesResolver: menuItemOverridesResolver,
})<{ ownerState: Menu2SubmenuTriggerOwnerState }>(
  memoTheme(({ theme }) => getMenuItemHighlightStyles(theme)),
  memoTheme(({ theme }) => ({
    ...menu2SubmenuTriggerStyles(theme, `.${menu2SubmenuTriggerClasses.open}`),
    ...menu2SubmenuTriggerStyles(theme, '[data-mui-internal-retain-open-tint]'),
  })),
);

const Menu2SubmenuTriggerRoot = styled(Menu2SubmenuTriggerBase, {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'root',
  overridesResolver: menuItemOverridesResolver,
})({});

const Menu2SubmenuTriggerIndicator = styled('span', {
  name: 'MuiMenu2SubmenuTrigger',
  slot: 'indicator',
})({
  display: 'inline-flex',
  alignItems: 'center',
  flexShrink: 0,
  marginLeft: 'auto',
  paddingLeft: 8,
});

/**
 * @ignore - internal component.
 */
function Menu2SubmenuTriggerRootSlot(
  props: Pick<
    Menu2SubmenuTriggerProps,
    'disableRipple' | 'nativeButton' | 'render' | 'slotProps' | 'slots' | 'sx'
  > & {
    baseProps: HTMLProps & { 'data-mui-internal-retain-open-tint'?: string | undefined };
    ownerState: Menu2SubmenuTriggerOwnerState & Pick<Menu2SubmenuTriggerProps, 'classes'>;
  },
) {
  const { ownerState, render: renderProp, slotProps, slots, ...other } = props;
  const isRtl = useRtl();
  const [IndicatorSlot, indicatorProps] = useSlot('indicator', {
    elementType: Menu2SubmenuTriggerIndicator,
    externalForwardedProps: {
      slots: { indicator: slots?.indicator ?? undefined },
      slotProps,
    },
    ownerState,
    className: clsx(menu2SubmenuTriggerClasses.indicator, ownerState.classes?.indicator),
    additionalProps: {
      'aria-hidden': true,
      children: isRtl ? (
        <KeyboardArrowLeft fontSize="small" />
      ) : (
        <KeyboardArrowRight fontSize="small" />
      ),
    },
  });

  return (
    <Menu2ItemRootSlot
      {...other}
      ownerState={ownerState}
      elementType={Menu2SubmenuTriggerRoot}
      component={renderProp ? Menu2ItemRenderRoot : undefined}
      internalRender={renderProp}
      internalRenderState={{
        dense: ownerState.dense,
        disabled: ownerState.disabled,
        disableGutters: ownerState.disableGutters,
        divider: ownerState.divider,
        highlighted: ownerState.highlighted,
        open: ownerState.open,
      }}
      endIndicator={slots?.indicator === null ? null : <IndicatorSlot {...indicatorProps} />}
    />
  );
}

export default Menu2SubmenuTriggerRootSlot;
