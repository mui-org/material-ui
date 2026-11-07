'use client';
import * as React from 'react';
import type { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { useRender } from '@base-ui/react/use-render';

export type PopupRenderState = BasePreviewCard.Popup.State & Record<string, unknown>;

export interface RenderElementProps extends React.HTMLAttributes<HTMLElement> {
  render: useRender.RenderProp<PopupRenderState>;
  renderState: PopupRenderState;
}

/**
 * @ignore - internal component.
 */
const RenderElement = React.forwardRef(function RenderElement(
  props: RenderElementProps,
  ref: React.Ref<HTMLElement>,
) {
  const { render, renderState, ...other } = props;
  return useRender({ render, state: renderState, props: other, ref });
});

export default RenderElement;
