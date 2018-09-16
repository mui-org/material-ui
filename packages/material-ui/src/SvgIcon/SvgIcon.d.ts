import * as React from 'react';
import { StandardProps, PropTypes } from '..';

export interface SvgIconProps
  extends StandardProps<React.SVGProps<SVGSVGElement>, SvgIconClassKey> {
  color?: PropTypes.Color | 'action' | 'disabled' | 'error';
  component?: React.ReactType<SvgIconProps>;
  fontSize?: 'inherit' | 'default';
  nativeColor?: string;
  size?: 'small' | 'medium' | 'large';
  titleAccess?: string;
  viewBox?: string;
}

export type SvgIconClassKey =
  | 'root'
  | 'colorSecondary'
  | 'colorAction'
  | 'colorDisabled'
  | 'colorError'
  | 'colorPrimary'
  | 'fontSizeInherit';

declare const SvgIcon: React.ComponentType<SvgIconProps>;

export default SvgIcon;
