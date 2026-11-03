import type * as React from 'react';
import type { Instance, Options, OptionsGeneric, VirtualElement } from '@popperjs/core';
import type { PortalProps } from '../Portal';
import type { SlotComponentProps } from '../utils/types';
import type { PolymorphicProps } from '../utils/PolymorphicComponent';

export type PopperPlacementType = Options['placement'];

export interface PopperRootSlotPropsOverrides {}

export interface PopperTransitionProps {
  in: boolean;
  onEnter: () => void;
  onExited: () => void;
}

export interface PopperChildrenProps {
  placement: PopperPlacementType;
  TransitionProps?: PopperTransitionProps | undefined;
}

export interface PopperOwnProps {
  /**
   * An HTML element, [virtualElement](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/virtual-elements.md),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl?:
    null | VirtualElement | HTMLElement | (() => HTMLElement) | (() => VirtualElement) | undefined;
  /**
   * Popper render function or node.
   */
  children?: React.ReactNode | ((props: PopperChildrenProps) => React.ReactNode);
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
   * Direction of the text.
   * @default 'ltr'
   */
  direction?: 'ltr' | 'rtl' | undefined;
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: PortalProps['disablePortal'] | undefined;
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted?: boolean | undefined;
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/modifiers/index.md).
   */
  modifiers?: Options['modifiers'] | undefined;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement?: PopperPlacementType | undefined;
  /**
   * Options provided to the [`Popper.js`](https://github.com/floating-ui/popper-docs/blob/main/docs/v2/constructors.md#options) instance.
   * @default {}
   */
  popperOptions?: Partial<OptionsGeneric<any>> | undefined;
  /**
   * A ref that points to the used popper instance.
   */
  popperRef?: React.Ref<Instance> | undefined;
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps?:
    | {
        root?:
          SlotComponentProps<'div', PopperRootSlotPropsOverrides, PopperOwnerState> | undefined;
      }
    | undefined;
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots?: PopperSlots | undefined;
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition?: boolean | undefined;
}

export interface PopperSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
}

export type PopperOwnerState = PopperOwnProps;

export interface PopperTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: PopperOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type PopperProps<
  RootComponentType extends React.ElementType = PopperTypeMap['defaultComponent'],
> = PolymorphicProps<PopperTypeMap<{}, RootComponentType>, RootComponentType>;

export type PopperTooltipOwnProps = Omit<
  PopperOwnProps,
  'container' | 'keepMounted' | 'transition'
> & {
  TransitionProps?: PopperTransitionProps | undefined;
};

export interface PopperTooltipTypeMap<
  AdditionalProps = {},
  RootComponentType extends React.ElementType = 'div',
> {
  props: PopperTooltipOwnProps & AdditionalProps;
  defaultComponent: RootComponentType;
}

export type PopperTooltipProps<
  RootComponentType extends React.ElementType = PopperTooltipTypeMap['defaultComponent'],
> = PolymorphicProps<PopperTooltipTypeMap<{}, RootComponentType>, RootComponentType>;

export interface PopperRootSlotProps {
  className?: string | undefined;
  ref: React.Ref<any>;
  ownerState: PopperOwnerState;
}
