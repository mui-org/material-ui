import type { PortalProps } from '../Portal';
import type { EventHandlers } from '../utils/types';

export interface UseModalRootSlotOwnProps {
  role: React.AriaRole;
  onKeyDown: React.KeyboardEventHandler;
  ref: React.RefCallback<Element> | null;
}

export interface UseModalBackdropSlotOwnProps {
  'aria-hidden': React.AriaAttributes['aria-hidden'];
  onClick: React.MouseEventHandler;
  open?: boolean | undefined;
}

export type UseModalBackdropSlotProps<TOther = {}> = TOther & UseModalBackdropSlotOwnProps;

export type UseModalRootSlotProps<TOther = {}> = TOther & UseModalRootSlotOwnProps;

export type UseModalParameters = {
  'aria-hidden'?: React.AriaAttributes['aria-hidden'] | undefined;
  /**
   * A single child content element.
   */
  children:
    | React.ReactElement<{
        in?: boolean | undefined;
        onEnter?: ((this: unknown) => void) | undefined;
        onExited?: ((this: unknown) => void) | undefined;
      }>
    | undefined
    | null;
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition?: boolean | undefined;
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'] | undefined;
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock?: boolean | undefined;
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose?:
    | {
        bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
      }['bivarianceHack']
    | undefined;
  onKeyDown?: React.KeyboardEventHandler | undefined;
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter?: (() => void) | undefined;
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited?: (() => void) | undefined;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  rootRef: React.Ref<Element>;
};

export interface UseModalReturnValue {
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <TOther extends EventHandlers = {}>(
    externalProps?: TOther,
  ) => UseModalRootSlotProps<TOther>;
  /**
   * Resolver for the backdrop slot's props.
   * @param externalProps props for the backdrop slot
   * @returns props that should be spread on the backdrop slot
   */
  getBackdropProps: <TOther extends EventHandlers = {}>(
    externalProps?: TOther,
  ) => UseModalBackdropSlotProps<TOther>;
  /**
   * Resolver for the transition related props.
   * @param externalProps props for the transition element
   * @returns props that should be spread on the transition element
   */
  getTransitionProps: <TOther extends EventHandlers = {}>(
    externalProps?: TOther,
  ) => { onEnter: () => void; onExited: () => void };
  /**
   * A ref to the component's root DOM element.
   */
  rootRef: React.RefCallback<Element> | null;
  /**
   * A ref to the component's portal DOM element.
   */
  portalRef: React.RefCallback<Element> | null;
  /**
   * The container used by the portal. While a transition is exiting, this remains the last
   * resolved mount node so changing containers does not remount the transition.
   */
  portalContainer: PortalProps['container'];
  /**
   * If `true`, the modal is the top most one.
   */
  isTopModal: () => boolean;
  /**
   * If `true`, the exiting transition finished (to be used for unmounting the component).
   */
  exited: boolean;
  /**
   * If `true`, the component's child is transition component.
   */
  hasTransition: boolean;
}
