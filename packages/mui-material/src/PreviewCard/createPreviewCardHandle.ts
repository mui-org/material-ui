import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';

export type PreviewCardHandle<Payload = unknown> = BasePreviewCard.Handle<Payload>;

/**
 * Creates a handle that connects a `PreviewCard` with `PreviewCardTrigger` components rendered outside of it.
 */
export function createPreviewCardHandle<Payload = unknown>(): PreviewCardHandle<Payload> {
  return BasePreviewCard.createHandle<Payload>();
}
