'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { DirectionProvider } from '@base-ui/react/direction-provider';
import { useRtl } from '@mui/system/RtlProvider';
import { useDefaultProps } from '../DefaultPropsProvider';

export interface PreviewCardProps<Payload = unknown> extends Pick<
  BasePreviewCard.Root.Props<Payload>,
  | 'actionsRef'
  | 'children'
  | 'defaultOpen'
  | 'defaultTriggerId'
  | 'onOpenChange'
  | 'onOpenChangeComplete'
  | 'open'
  | 'triggerId'
> {
  /**
   * A handle that connects the preview card with triggers rendered outside of it.
   * Create one with `createPreviewCardHandle()`.
   */
  handle?: BasePreviewCard.Root.Props<Payload>['handle'] | undefined;
}

/**
 * Groups the trigger and the popup of a preview card and holds its open state.
 *
 * Demos:
 *
 * - [Preview Card](https://next.mui.com/material-ui/react-preview-card/)
 *
 * API:
 *
 * - [PreviewCard API](https://next.mui.com/material-ui/api/preview-card/)
 */
function PreviewCard<Payload = unknown>(inProps: PreviewCardProps<Payload>) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPreviewCard' });
  const {
    actionsRef,
    children,
    defaultOpen,
    defaultTriggerId,
    handle,
    onOpenChange,
    onOpenChangeComplete,
    open,
    triggerId,
  } = props;
  const isRtl = useRtl();

  return (
    <DirectionProvider direction={isRtl ? 'rtl' : 'ltr'}>
      <BasePreviewCard.Root
        actionsRef={actionsRef}
        defaultOpen={defaultOpen}
        defaultTriggerId={defaultTriggerId}
        handle={handle}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        open={open}
        triggerId={triggerId}
      >
        {children}
      </BasePreviewCard.Root>
    </DirectionProvider>
  );
}

PreviewCard.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref to imperative actions.
   * - `unmount`: Ends the closing phase of the preview card after an externally controlled closing animation finishes.
   * Call `preventUnmountOnClose()` in `onOpenChange` first, otherwise the preview card completes closing on its own.
   * Whether it leaves the DOM is decided by `keepMounted` on the portal.
   * - `close`: Closes the preview card imperatively when called.
   */
  actionsRef: PropTypes.shape({
    current: PropTypes.shape({
      close: PropTypes.func.isRequired,
      unmount: PropTypes.func.isRequired,
    }),
  }),
  /**
   * The content of the preview card.
   * This can be a regular React node or a render function that receives the `payload` of the active trigger.
   */
  children: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  /**
   * Whether the preview card is initially open.
   *
   * To render a controlled preview card, use the `open` prop instead.
   * @default false
   */
  defaultOpen: PropTypes.bool,
  /**
   * ID of the trigger that the preview card is associated with.
   * This is useful in conjunction with the `defaultOpen` prop to create an initially open preview card.
   */
  defaultTriggerId: PropTypes.string,
  /**
   * A handle that connects the preview card with triggers rendered outside of it.
   * Create one with `createPreviewCardHandle()`.
   */
  handle: PropTypes /* @typescript-to-proptypes-ignore */.object,
  /**
   * Event handler called when the preview card is opened or closed.
   */
  onOpenChange: PropTypes.func,
  /**
   * Event handler called after any animations complete when the preview card is opened or closed.
   */
  onOpenChangeComplete: PropTypes.func,
  /**
   * Whether the preview card is currently open.
   */
  open: PropTypes.bool,
  /**
   * ID of the trigger that the preview card is associated with.
   * This is useful in conjunction with the `open` prop to create a controlled preview card.
   * There's no need to specify this prop when the preview card is uncontrolled (that is, when the `open` prop is not set).
   */
  triggerId: PropTypes.string,
} as any;

export default PreviewCard;
