import * as React from 'react';
import {
  OverridableComponent,
  OverridableStringUnion,
  OverrideProps,
  PartiallyRequired,
} from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { AvatarGroupClasses } from './avatarGroupClasses';
import Avatar from '../Avatar';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';

export interface AvatarGroupPropsVariantOverrides {}

export interface AvatarGroupComponentsPropsOverrides {}

export interface AvatarGroupSlots {
  surplus: React.ElementType;
}

export type AvatarGroupSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AvatarGroupSlots,
  {
    surplus: SlotProps<typeof Avatar, AvatarGroupComponentsPropsOverrides, AvatarGroupOwnerState>;
  }
>;
export interface AvatarGroupOwnProps extends AvatarGroupSlotsAndSlotProps {
  /**
   * The avatars to stack.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AvatarGroupClasses> | undefined;
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: React.ElementType | undefined;
  /**
   * Max avatars to show before +x.
   * @default 5
   */
  max?: number | undefined;
  /**
   * custom renderer of extraAvatars
   * @param {number} surplus number of extra avatars
   * @returns {React.ReactNode} custom element to display
   */
  renderSurplus?: ((surplus: number) => React.ReactNode) | undefined;
  /**
   * Spacing between avatars.
   * @default 'medium'
   */
  spacing?: 'small' | 'medium' | number | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The total number of avatars. Used for calculating the number of extra avatars.
   * @default children.length
   */
  total?: number | undefined;
  /**
   * The variant to use.
   * @default 'circular'
   */
  variant?:
    | OverridableStringUnion<'circular' | 'rounded' | 'square', AvatarGroupPropsVariantOverrides>
    | undefined;
}

export interface AvatarGroupTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & AvatarGroupOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Avatar](https://next.mui.com/material-ui/react-avatar/)
 *
 * API:
 *
 * - [AvatarGroup API](https://next.mui.com/material-ui/api/avatar-group/)
 */
declare const AvatarGroup: OverridableComponent<AvatarGroupTypeMap>;

export type AvatarGroupProps<
  RootComponent extends React.ElementType = AvatarGroupTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AvatarGroupTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export interface AvatarGroupOwnerState extends PartiallyRequired<
  AvatarGroupProps,
  'max' | 'spacing' | 'component' | 'variant'
> {}

export default AvatarGroup;
