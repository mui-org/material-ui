'use client';
import * as React from 'react';
import type { Meter as BaseMeter } from '@base-ui/react/meter';
import { useRender } from '@base-ui/react/use-render';

export type MeterRenderState = BaseMeter.Root.State & Record<string, unknown>;

export interface RenderElementProps extends React.HTMLAttributes<HTMLElement> {
  render: useRender.RenderProp<MeterRenderState>;
  renderState: MeterRenderState;
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
