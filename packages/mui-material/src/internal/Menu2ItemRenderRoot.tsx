'use client';
import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';
import type { ComponentRenderFn, HTMLProps } from '@base-ui/react/types';

interface Menu2ItemRenderRootProps<OwnerState extends object> extends HTMLProps {
  internalRender: React.ReactElement | ComponentRenderFn<Omit<HTMLProps, 'color'>, OwnerState>;
  internalRenderState: OwnerState;
}

/**
 * @ignore - internal component.
 */
const Menu2ItemRenderRoot = React.forwardRef(function Menu2ItemRenderRoot<
  OwnerState extends object,
>(
  {
    internalRender: render,
    internalRenderState: state,
    ...props
  }: Menu2ItemRenderRootProps<OwnerState>,
  ref: React.ForwardedRef<HTMLElement>,
) {
  // Base UI already supplies the state attributes. This layer composes the
  // final element after Material styles and ButtonBase handlers are applied.
  return useRender({
    render: typeof render === 'function' ? (renderProps) => render(renderProps, state) : render,
    props: { ...props },
    ref,
  });
});

export default Menu2ItemRenderRoot;
