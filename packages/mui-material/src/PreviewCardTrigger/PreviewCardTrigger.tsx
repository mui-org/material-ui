'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { PreviewCard as BasePreviewCard } from '@base-ui/react/preview-card';
import { useDefaultProps } from '../DefaultPropsProvider';

export interface PreviewCardTriggerProps extends Pick<
  BasePreviewCard.Trigger.Props,
  'closeDelay' | 'delay' | 'payload'
> {
  /**
   * @ignore
   */
  children?: React.ReactNode | undefined;
  /**
   * A handle that connects the trigger with a `PreviewCard` rendered elsewhere.
   * Create one with `createPreviewCardHandle()`.
   */
  handle?: BasePreviewCard.Trigger.Props['handle'] | undefined;
  /**
   * The id of the trigger. Pass it to `triggerId` on `PreviewCard` to open the card from this trigger.
   */
  id?: string | undefined;
  /**
   * The element that opens the preview card, usually a link.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render: NonNullable<BasePreviewCard.Trigger.Props['render']>;
}

/**
 * The link that opens a preview card on hover or focus.
 *
 * Demos:
 *
 * - [Preview Card](https://next.mui.com/material-ui/react-preview-card/)
 *
 * API:
 *
 * - [PreviewCardTrigger API](https://next.mui.com/material-ui/api/preview-card-trigger/)
 */
const PreviewCardTrigger = React.forwardRef(function PreviewCardTrigger(
  inProps: PreviewCardTriggerProps,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiPreviewCardTrigger' });
  const { children, closeDelay, delay, handle, id, payload, render } = props;

  return (
    <BasePreviewCard.Trigger
      ref={ref}
      closeDelay={closeDelay}
      delay={delay}
      handle={handle}
      id={id}
      payload={payload}
      render={render}
    >
      {children}
    </BasePreviewCard.Trigger>
  );
});

PreviewCardTrigger.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * How long to wait before closing the preview card. Specified in milliseconds.
   * @default 300
   */
  closeDelay: PropTypes.number,
  /**
   * How long to wait before the preview card opens. Specified in milliseconds.
   * @default 600
   */
  delay: PropTypes.number,
  /**
   * A handle that connects the trigger with a `PreviewCard` rendered elsewhere.
   * Create one with `createPreviewCardHandle()`.
   */
  handle: PropTypes /* @typescript-to-proptypes-ignore */.object,
  /**
   * The id of the trigger. Pass it to `triggerId` on `PreviewCard` to open the card from this trigger.
   */
  id: PropTypes.string,
  /**
   * A payload to pass to the preview card when it is opened.
   */
  payload: PropTypes.any,
  /**
   * The element that opens the preview card, usually a link.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
} as any;

export default PreviewCardTrigger;
