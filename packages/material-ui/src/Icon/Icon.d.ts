import * as React from 'react';
import { PropTypes } from '..';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface IconTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    color?: PropTypes.Color | 'action' | 'disabled' | 'error';
    fontSize?: 'inherit' | 'default' | 'small' | 'large';
    rotate?: 90 | 180 | 270;
  };
  defaultComponent: D;
  classKey: IconClassKey;
}
/**
 *
 * Demos:
 *
 * - [Icons](https://material-ui.com/components/icons/)
 * - [Material Icons](https://material-ui.com/components/material-icons/)
 *
 * API:
 *
 * - [Icon API](https://material-ui.com/api/icon/)
 */
declare const Icon: OverridableComponent<IconTypeMap>;

export type IconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  | 'fontSizeInherit'
  | 'fontSizeSmall'
  | 'fontSizeLarge'
  | 'rotate90deg'
  | 'rotate180deg'
  | 'rotate270deg';

export type IconProps<
  D extends React.ElementType = IconTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<IconTypeMap<P, D>, D>;

export default Icon;
