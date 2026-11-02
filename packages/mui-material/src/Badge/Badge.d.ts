import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion, Simplify } from '@mui/types';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { BadgeClasses } from './badgeClasses';

export interface BadgePropsVariantOverrides {}
export interface BadgePropsColorOverrides {}
export interface BadgeRootSlotPropsOverrides {}
export interface BadgeBadgeSlotPropsOverrides {}

export interface BadgeSlots {
  /**
   * The component that renders the root.
   * @default span
   */
  root: React.ElementType;
  /**
   * The component that renders the badge.
   * @default span
   */
  badge: React.ElementType;
}

export type BadgeSlotsAndSlotProps = CreateSlotsAndSlotProps<
  BadgeSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the span element.
     */
    root: SlotProps<'span', BadgeRootSlotPropsOverrides, BadgeOwnerState>;
    /**
     * Props forwarded to the label slot.
     * By default, the available props are based on the span element.
     */
    badge: SlotProps<'span', BadgeBadgeSlotPropsOverrides, BadgeOwnerState>;
  }
>;

export type BadgeOwnerState = Simplify<
  Omit<BadgeOwnProps, 'slotProps' | 'slots'> & {
    badgeContent: React.ReactNode;
    invisible: boolean;
    max: number;
    displayValue: React.ReactNode;
    showZero: boolean;
    anchorOrigin: BadgeOrigin;
    color: OverridableStringUnion<
      'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning',
      BadgePropsColorOverrides
    >;
    overlap: 'rectangular' | 'circular';
    variant: OverridableStringUnion<'standard' | 'dot', BadgePropsVariantOverrides>;
  }
>;

export interface BadgeOrigin {
  vertical?: 'top' | 'bottom' | undefined;
  horizontal?: 'left' | 'right' | undefined;
}

export interface BadgeOwnProps extends BadgeSlotsAndSlotProps {
  /**
   * The anchor of the badge.
   * @default {
   *   vertical: 'top',
   *   horizontal: 'right',
   * }
   */
  anchorOrigin?: BadgeOrigin | undefined;
  /**
   * The content rendered within the badge.
   */
  badgeContent?: React.ReactNode;
  /**
   * The badge will be added relative to this node.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<BadgeClasses> | undefined;
  /**
   * @ignore
   */
  className?: string | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'default'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning',
        BadgePropsColorOverrides
      >
    | undefined;
  /**
   * If `true`, the badge is invisible.
   * @default false
   */
  invisible?: boolean | undefined;
  /**
   * Max count to show.
   * @default 99
   */
  max?: number | undefined;
  /**
   * Wrapped shape the badge should overlap.
   * @default 'rectangular'
   */
  overlap?: 'rectangular' | 'circular' | undefined;
  /**
   * Controls whether the badge is hidden when `badgeContent` is zero.
   * @default false
   */
  showZero?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The variant to use.
   * @default 'standard'
   */
  variant?: OverridableStringUnion<'standard' | 'dot', BadgePropsVariantOverrides> | undefined;
}

export interface BadgeTypeMap<
  RootComponent extends React.ElementType = 'span',
  AdditionalProps = {},
> {
  props: AdditionalProps & BadgeOwnProps;
  defaultComponent: RootComponent;
}

type BadgeRootProps = NonNullable<BadgeTypeMap['props']['slotProps']>['root'];
type BadgeBadgeProps = NonNullable<BadgeTypeMap['props']['slotProps']>['badge'];

export declare const BadgeRoot: React.FC<BadgeRootProps>;
export declare const BadgeMark: React.FC<BadgeBadgeProps>;

/**
 *
 * Demos:
 *
 * - [Avatar](https://next.mui.com/material-ui/react-avatar/)
 * - [Badge](https://next.mui.com/material-ui/react-badge/)
 *
 * API:
 *
 * - [Badge API](https://next.mui.com/material-ui/api/badge/)
 */
declare const Badge: OverridableComponent<BadgeTypeMap>;

export type BadgeProps<
  RootComponent extends React.ElementType = BadgeTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BadgeTypeMap<RootComponent, AdditionalProps>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Badge;
