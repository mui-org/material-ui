import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { SkeletonClasses } from './skeletonClasses';

export interface SkeletonPropsVariantOverrides {}

export interface SkeletonOwnProps {
  /**
   * The animation.
   * If `false` the animation effect is disabled.
   * @default 'pulse'
   */
  animation?: 'pulse' | 'wave' | false | undefined;
  /**
   * Optional children to infer width and height from.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SkeletonClasses> | undefined;
  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height?: number | string | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The type of content that will be rendered.
   * @default 'text'
   */
  variant?:
    | OverridableStringUnion<
        'text' | 'rectangular' | 'rounded' | 'circular',
        SkeletonPropsVariantOverrides
      >
    | undefined;
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width?: number | string | undefined;
}

export interface SkeletonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'span',
> {
  props: AdditionalProps & SkeletonOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Skeleton](https://next.mui.com/material-ui/react-skeleton/)
 *
 * API:
 *
 * - [Skeleton API](https://next.mui.com/material-ui/api/skeleton/)
 */
declare const Skeleton: OverridableComponent<SkeletonTypeMap>;

export type SkeletonProps<
  RootComponent extends React.ElementType = SkeletonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<SkeletonTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Skeleton;
