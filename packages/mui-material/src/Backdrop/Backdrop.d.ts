import * as React from 'react';
import { SxProps } from '@mui/system';
import { FadeProps } from '../Fade';
import { TransitionProps } from '../transitions/types';
import { Theme } from '../styles';
import { BackdropClasses } from './backdropClasses';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';

export interface BackdropSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root: React.ElementType;
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transition-slots) to learn more about the requirements for this component.
   * @default Fade
   */
  transition: React.ElementType;
}
export interface BackdropComponentsPropsOverrides {}

export interface BackdropTransitionSlotPropsOverrides {}

export type BackdropSlotsAndSlotProps = CreateSlotsAndSlotProps<
  BackdropSlots,
  {
    /**
     * Props forwarded to the transition slot.
     * By default, the available props are based on the div element.
     */
    root: SlotProps<'div', BackdropComponentsPropsOverrides, BackdropOwnerState>;
    /**
     * Props forwarded to the transition slot.
     * By default, the available props are based on the [Fade](https://mui.com/material-ui/api/fade/#props) component.
     */
    transition: SlotComponentProps<
      React.ElementType<TransitionProps>,
      TransitionProps & BackdropTransitionSlotPropsOverrides,
      BackdropOwnerState
    >;
  }
>;

export interface BackdropOwnProps
  extends Partial<Omit<FadeProps, 'children'>>, BackdropSlotsAndSlotProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<BackdropClasses> | undefined;
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible?: boolean | undefined;
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration?: TransitionProps['timeout'] | undefined;
}

export interface BackdropTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & BackdropOwnProps;
  defaultComponent: RootComponent;
}

type BackdropRootProps = React.HTMLAttributes<HTMLDivElement> & BackdropComponentsPropsOverrides;

export declare const BackdropRoot: React.FC<BackdropRootProps>;

/**
 *
 * Demos:
 *
 * - [Backdrop](https://next.mui.com/material-ui/react-backdrop/)
 *
 * API:
 *
 * - [Backdrop API](https://next.mui.com/material-ui/api/backdrop/)
 * - inherits [Fade API](https://next.mui.com/material-ui/api/fade/)
 */
declare const Backdrop: OverridableComponent<BackdropTypeMap>;

export type BackdropProps<
  RootComponent extends React.ElementType = BackdropTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BackdropTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export interface BackdropOwnerState extends BackdropProps {}

export default Backdrop;
