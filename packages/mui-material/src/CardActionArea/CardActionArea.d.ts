import * as React from 'react';
import { SxProps } from '@mui/system';
import { SlotProps, CreateSlotsAndSlotProps } from '../utils/types';
import { Theme } from '../styles';
import {
  ButtonBaseProps,
  ButtonBaseTypeMap,
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
} from '../ButtonBase';
import { OverrideProps } from '../OverridableComponent';
import { CardActionAreaClasses } from './cardActionAreaClasses';

export interface CardActionAreaRootSlotPropsOverrides {}
export interface CardActionAreaFocusHighlightSlotPropsOverrides {}

export interface CardActionAreaSlots {
  /**
   * The component that renders the root.
   * @default ButtonBase
   */
  root: React.ElementType;
  /**
   * The component that renders the focusHighlight.
   * @default span
   */
  focusHighlight: React.ElementType;
}

export type CardActionAreaSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CardActionAreaSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the span element.
     */
    root: SlotProps<
      React.ElementType<ButtonBaseProps>,
      CardActionAreaRootSlotPropsOverrides,
      CardActionAreaOwnerState
    >;
    /**
     * Props forwarded to the focusHighlight slot.
     * By default, the available props are based on the span element.
     */
    focusHighlight: SlotProps<
      'span',
      CardActionAreaFocusHighlightSlotPropsOverrides,
      CardActionAreaOwnerState
    >;
  }
>;

export interface CardActionAreaOwnerState extends Omit<
  CardActionAreaProps,
  'slots' | 'slotProps'
> {}

export interface CardActionAreaOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardActionAreaClasses> | undefined;
  focusVisibleClassName?: string | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export type CardActionAreaTypeMap<
  AdditionalProps,
  RootComponent extends React.ElementType,
> = ExtendButtonBaseTypeMap<{
  props: AdditionalProps & CardActionAreaOwnProps & CardActionAreaSlotsAndSlotProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Card](https://next.mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardActionArea API](https://next.mui.com/material-ui/api/card-action-area/)
 * - inherits [ButtonBase API](https://next.mui.com/material-ui/api/button-base/)
 */
declare const CardActionArea: ExtendButtonBase<
  CardActionAreaTypeMap<{}, ButtonBaseTypeMap['defaultComponent']>
>;

export type CardActionAreaProps<
  RootComponent extends React.ElementType = ButtonBaseTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardActionAreaTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default CardActionArea;
