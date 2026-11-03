import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { CardMediaClasses } from './cardMediaClasses';

export interface CardMediaOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardMediaClasses> | undefined;
  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image?: string | undefined;
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src?: string | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface CardMediaTypeMap<AdditionalProps, RootComponent extends React.ElementType> {
  props: AdditionalProps & CardMediaOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Card](https://next.mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [CardMedia API](https://next.mui.com/material-ui/api/card-media/)
 */
declare const CardMedia: OverridableComponent<CardMediaTypeMap<{}, 'div'>>;

export type CardMediaProps<
  RootComponent extends React.ElementType = 'div',
  AdditionalProps = {},
> = OverrideProps<CardMediaTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default CardMedia;
