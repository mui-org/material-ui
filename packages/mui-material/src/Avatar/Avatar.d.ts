import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { AvatarClasses } from './avatarClasses';
import { CreateSlotsAndSlotProps, SlotProps } from '../utils/types';
import { SvgIconProps } from '../SvgIcon';

export interface AvatarSlots {
  /**
   * The component that renders the root slot.
   * @default 'div'
   */
  root: React.ElementType;
  /**
   * The component that renders the img slot.
   * @default 'img'
   */
  img: React.ElementType;
  /**
   * The component that renders the fallback slot.
   * @default Person icon
   */
  fallback: React.ElementType;
}

export interface AvatarPropsVariantOverrides {}

export interface AvatarRootSlotPropsOverrides {}
export interface AvatarImgSlotPropsOverrides {}
export interface AvatarFallbackSlotPropsOverrides {}

export type AvatarSlotsAndSlotProps = CreateSlotsAndSlotProps<
  AvatarSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the div element.
     */
    root: SlotProps<'div', AvatarRootSlotPropsOverrides, AvatarOwnProps>;
    /**
     * Props forwarded to the img slot.
     * By default, the available props are based on the img element.
     */
    img: SlotProps<'img', AvatarImgSlotPropsOverrides, AvatarOwnProps>;
    /**
     * Props forwarded to the fallback slot.
     * By default, the available props are based on the [SvgIcon](https://mui.com/material-ui/api/svg-icon/#props) component.
     */
    fallback: SlotProps<
      React.ElementType<SvgIconProps>,
      AvatarFallbackSlotPropsOverrides,
      AvatarOwnProps
    >;
  }
>;

export interface AvatarOwnProps {
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt?: string | undefined;
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<AvatarClasses> | undefined;
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes?: string | undefined;
  /**
   * The `src` attribute for the `img` element.
   */
  src?: string | undefined;
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet?: string | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant?:
    | OverridableStringUnion<'circular' | 'rounded' | 'square', AvatarPropsVariantOverrides>
    | undefined;
}

export interface AvatarTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & AvatarOwnProps & AvatarSlotsAndSlotProps;
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
 * - [Avatar API](https://next.mui.com/material-ui/api/avatar/)
 */
declare const Avatar: OverridableComponent<AvatarTypeMap>;

export type AvatarProps<
  RootComponent extends React.ElementType = AvatarTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AvatarTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Avatar;
