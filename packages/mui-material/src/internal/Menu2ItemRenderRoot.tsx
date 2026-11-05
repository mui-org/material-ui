'use client';
import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';
import type { HTMLProps } from '@base-ui/react/types';
import type { Menu2ItemOwnerState, Menu2ItemProps } from '../Unstable_Menu2Item/Menu2Item';

interface Menu2ItemRenderRootProps extends HTMLProps {
  internalRender: NonNullable<Menu2ItemProps['render']>;
  internalRenderState: Menu2ItemOwnerState;
}

/**
 * @ignore - internal component.
 */
const Menu2ItemRenderRoot = React.forwardRef(function Menu2ItemRenderRoot(
  { internalRender: render, internalRenderState: state, ...props }: Menu2ItemRenderRootProps,
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
