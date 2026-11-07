'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useForkRef from '@mui/utils/useForkRef';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';
import { useDefaultProps } from '../DefaultPropsProvider';
import { menu2TriggerClasses } from '../Unstable_Menu2/menu2Classes';
import { warnMenu2FragmentTrigger, warnMenu2TriggerRef } from '../Unstable_Menu2/menu2Utils';

export type { Menu2TriggerClasses } from '../Unstable_Menu2/menu2Classes';

export interface Menu2TriggerProps
  extends
    Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'color'>,
    Pick<BaseMenu.Trigger.Props, 'disabled' | 'openOnHover' | 'delay' | 'closeDelay'> {
  /**
   * The content of the trigger.
   */
  children?: React.ReactNode;
  /**
   * Whether the trigger renders a native `<button>` element.
   * Set to `false` when the trigger renders a different element.
   * @default true
   */
  nativeButton?: BaseMenu.Trigger.Props['nativeButton'] | undefined;
  /**
   * The element that opens the menu, or a function that returns it.
   * Forward the props and ref to the element.
   * Set visual props, such as `color`, `sx`, and `variant`, on this element.
   */
  render: React.ReactElement | ComponentRenderFn<Omit<HTMLProps, 'color'>, BaseMenu.Trigger.State>;
}

/**
 *
 * Demos:
 *
 * - [Menu v2](https://next.mui.com/material-ui/react-menu2/)
 *
 * API:
 *
 * - [Menu2Trigger API](https://next.mui.com/material-ui/api/menu-2-trigger/)
 */
const Menu2Trigger = React.forwardRef(function Menu2Trigger(
  inProps: Menu2TriggerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const {
    render: renderProp,
    className,
    ...props
  } = useDefaultProps({
    props: inProps,
    name: 'MuiMenu2Trigger',
  });
  if (process.env.NODE_ENV !== 'production') {
    warnMenu2FragmentTrigger(renderProp, 'Menu2Trigger', 'Button', 'render');
  }

  const localRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(ref, localRef);
  React.useEffect(() => {
    if (process.env.NODE_ENV !== 'production' && localRef.current == null) {
      warnMenu2TriggerRef(renderProp, 'Menu2Trigger', 'render');
    }
  }, [renderProp]);

  return (
    <BaseMenu.Trigger
      {...props}
      ref={handleRef}
      render={renderProp}
      className={(state) =>
        clsx(
          menu2TriggerClasses.root,
          state.disabled && menu2TriggerClasses.disabled,
          state.open && menu2TriggerClasses.open,
          className,
        )
      }
    />
  );
});

Menu2Trigger.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the trigger.
   */
  children: PropTypes.node,
  /**
   * How long to wait before closing the menu that was opened on hover.
   * Specified in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 0
   */
  closeDelay: PropTypes.number,
  /**
   * How long to wait before the menu may be opened on hover. Specified in milliseconds.
   *
   * Requires the `openOnHover` prop.
   * @default 100
   */
  delay: PropTypes.number,
  /**
   * Whether the component should ignore user interaction.
   * @default false
   */
  disabled: PropTypes.bool,
  /**
   * Whether the trigger renders a native `<button>` element.
   * Set to `false` when the trigger renders a different element.
   * @default true
   */
  nativeButton: PropTypes.bool,
  /**
   * Whether the menu should also open when the trigger is hovered.
   */
  openOnHover: PropTypes.bool,
  /**
   * The element that opens the menu, or a function that returns it.
   * Forward the props and ref to the element.
   * Set visual props, such as `color`, `sx`, and `variant`, on this element.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
} as any;

export default Menu2Trigger;
