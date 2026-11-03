import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ImageListItemClasses } from './imageListItemClasses';

export interface ImageListItemOwnProps {
  /**
   * The content of the component, normally an `<img>`.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ImageListItemClasses> | undefined;
  /**
   * Width of the item in number of grid columns.
   * @default 1
   */
  cols?: number | undefined;
  /**
   * Height of the item in number of grid rows.
   * @default 1
   */
  rows?: number | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ImageListItemTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'li',
> {
  props: AdditionalProps & ImageListItemOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Image List](https://next.mui.com/material-ui/react-image-list/)
 *
 * API:
 *
 * - [ImageListItem API](https://next.mui.com/material-ui/api/image-list-item/)
 */
declare const ImageListItem: OverridableComponent<ImageListItemTypeMap>;

export type ImageListItemProps<
  RootComponent extends React.ElementType = ImageListItemTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ImageListItemTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default ImageListItem;
