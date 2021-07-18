import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { OverridableStringUnion } from '@material-ui/types';
import { SwitchUnstyledProps } from '@material-ui/unstyled';
import { InternalStandardProps as StandardProps, Theme } from '..';
import { SwitchClasses } from './switchClasses';
import { TouchRippleProps } from '../ButtonBase/TouchRipple';

export interface SwitchPropsSizeOverrides {}

export interface SwitchPropsColorOverrides {}

export interface SwitchProps extends StandardProps<SwitchUnstyledProps> {
  /**
   * The icon to display when the component is checked.
   */
  checkedIcon?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SwitchClasses>;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color?: OverridableStringUnion<
    'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'default',
    SwitchPropsColorOverrides
  >;
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple?: boolean;
  /**
   * If `true`, the keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple?: boolean;
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple?: boolean;
  /**
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge?: 'start' | 'end' | false;
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/master/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName?: string;
  /**
   * The icon to display when the component is unchecked.
   */
  icon?: React.ReactNode;
  /**
   * The id of the `input` element.
   */
  id?: string;
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  /**
   * Ref associated with the `input` element.
   */
  inputRef?: React.Ref<any>;
  /**
   * Name attribute of the `input` element.
   */
  name?: string;
  /**
   * If `true`, the `input` element is required.
   * @default false
   */
  required?: boolean;
  /**
   * The size of the component.
   * `small` is equivalent to the dense switch styling.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', SwitchPropsSizeOverrides>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps?: Partial<TouchRippleProps>;
  /**
   * The value of the component. The DOM API casts this to a string.
   * The browser uses "on" as the default value.
   */
  value?: unknown;
}

/**
 *
 * Demos:
 *
 * - [Switches](https://material-ui.com/components/switches/)
 * - [Transfer List](https://material-ui.com/components/transfer-list/)
 *
 * API:
 *
 * - [Switch API](https://material-ui.com/api/switch/)
 */
export default function Switch(props: SwitchProps): JSX.Element;
