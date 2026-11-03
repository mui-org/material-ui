import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { Mark } from './useSlider.types';
import { CreateSlotsAndSlotProps, SlotComponentProps, SlotProps } from '../utils/types';
import { Theme } from '../styles';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import SliderValueLabelComponent from './SliderValueLabel';
import { SliderClasses } from './sliderClasses';

export interface SliderPropsColorOverrides {}

export interface SliderPropsSizeOverrides {}

export interface SliderSlots {
  /**
   * The component that renders the root.
   * @default 'span'
   */
  root: React.ElementType;
  /**
   * The component that renders the track.
   * @default 'span'
   */
  track: React.ElementType;
  /**
   * The component that renders the rail.
   * @default 'span'
   */
  rail: React.ElementType;
  /**
   * The component that renders the thumb.
   * @default 'span'
   */
  thumb: React.ElementType;
  /**
   * The component that renders the mark.
   * @default 'span'
   */
  mark: React.ElementType;
  /**
   * The component that renders the mark label.
   * @default 'span'
   */
  markLabel: React.ElementType;
  /**
   * The component that renders the value label.
   * @default SliderValueLabel
   */
  valueLabel: React.ElementType;
  /**
   * The component that renders the input.
   * @default 'input'
   */
  input: React.ElementType;
}

export interface SliderRootSlotPropsOverrides {}
export interface SliderTrackSlotPropsOverrides {}
export interface SliderRailSlotPropsOverrides {}
export interface SliderThumbSlotPropsOverrides {}
export interface SliderMarkSlotPropsOverrides {}
export interface SliderMarkLabelSlotPropsOverrides {}
export interface SliderValueLabelSlotPropsOverrides {}
export interface SliderInputSlotPropsOverrides {}

export type SliderSlotsAndSlotProps = CreateSlotsAndSlotProps<
  SliderSlots,
  {
    /**
     * Props forwarded to the root slot.
     * By default, the available props are based on the span element.
     */
    root: SlotProps<'span', SliderRootSlotPropsOverrides, SliderOwnerState>;
    /**
     * Props forwarded to the track slot.
     * By default, the available props are based on the span element.
     */
    track: SlotProps<'span', SliderTrackSlotPropsOverrides, SliderOwnerState>;
    /**
     * Props forwarded to the rail slot.
     * By default, the available props are based on the span element.
     */
    rail: SlotProps<'span', SliderRailSlotPropsOverrides, SliderOwnerState>;
    /**
     * Props forwarded to the thumb slot.
     * By default, the available props are based on the span element.
     */
    thumb: SlotProps<'span', SliderThumbSlotPropsOverrides, SliderOwnerState>;
    /**
     * Props forwarded to the mark slot.
     * By default, the available props are based on the span element.
     */
    mark: SlotProps<'span', SliderMarkSlotPropsOverrides, SliderOwnerState>;
    /**
     * Props forwarded to the mark label slot.
     * By default, the available props are based on the span element.
     */
    markLabel: SlotProps<'span', SliderMarkLabelSlotPropsOverrides, SliderOwnerState>;
    /**
     * Props forwarded to the value label slot.
     * By default, the available props are based on the [SliderValueLabel](https://mui.com/material-ui/api/slider/) component.
     */
    valueLabel: SlotComponentProps<
      typeof SliderValueLabelComponent,
      SliderValueLabelSlotPropsOverrides,
      SliderOwnerState
    >;
    /**
     * Props forwarded to the input slot.
     * By default, the available props are based on the input element.
     */
    input: SlotProps<'input', SliderInputSlotPropsOverrides, SliderOwnerState>;
  }
>;

export interface SliderOwnerState extends SliderProps {
  dragging: boolean;
  marked: boolean;
  focusedThumbIndex: number;
}

export interface SliderOwnProps<Value extends number | readonly number[]> {
  /**
   * The label of the slider.
   */
  'aria-label'?: string | undefined;
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby'?: string | undefined;
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext'?: string | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
        SliderPropsColorOverrides
      >
    | undefined;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SliderClasses> | undefined;
  /**
   * @ignore
   */
  className?: string | undefined;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: Value | undefined;
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean | undefined;
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap?: boolean | undefined;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel?: ((index: number) => string) | undefined;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText?: ((value: number, index: number) => string) | undefined;
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks?: boolean | readonly Mark[] | undefined;
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max?: number | undefined;
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min?: number | undefined;
  /**
   * Name attribute of the hidden `input` element.
   */
  name?: string | undefined;
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {Value} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange?: ((event: Event, value: Value, activeThumb: number) => void) | undefined;
  /**
   * Callback function that is fired when the pointer or touch interaction ends.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {Value} value The new value.
   */
  onChangeCommitted?: ((event: React.SyntheticEvent | Event, value: Value) => void) | undefined;
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical' | undefined;
  /**
   * A transformation function, to change the scale of the slider.
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  scale?: ((value: number) => number) | undefined;
  /**
   * The granularity with which the slider can step through values when using Page Up/Page Down or Shift + Arrow Up/Arrow Down.
   * @default 10
   */
  shiftStep?: number | undefined;
  /**
   * The size of the slider.
   * @default 'medium'
   */
  size?: OverridableStringUnion<'small' | 'medium', SliderPropsSizeOverrides> | undefined;
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step?: number | null | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex?: number | undefined;
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track?: 'normal' | false | 'inverted' | undefined;
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value?: Value | undefined;
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay?: 'on' | 'auto' | 'off' | undefined;
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @param {any} x
   * @returns {any}
   * @default function Identity(x) {
   *   return x;
   * }
   */
  valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode) | undefined;
}

export interface SliderTypeMap<
  RootComponent extends React.ElementType = 'span',
  AdditionalProps = {},
  Value extends number | readonly number[] = number | number[],
> {
  props: AdditionalProps & SliderOwnProps<Value> & SliderSlotsAndSlotProps;
  defaultComponent: RootComponent;
}

export type SliderComponent<Value extends number | readonly number[]> = OverridableComponent<
  SliderTypeMap<'span', {}, Value>
>;

export type SliderType = SliderComponent<number> &
  SliderComponent<number[]> &
  SliderComponent<readonly number[]> &
  SliderComponent<number | number[]>;

export interface SliderValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactElement<unknown>;
  index: number;
  open: boolean;
  value: React.ReactNode;
}

type SliderRootProps = NonNullable<SliderTypeMap['props']['slotProps']>['root'];
type SliderMarkProps = NonNullable<SliderTypeMap['props']['slotProps']>['mark'];
type SliderMarkLabelProps = NonNullable<SliderTypeMap['props']['slotProps']>['markLabel'];
type SliderRailProps = NonNullable<SliderTypeMap['props']['slotProps']>['rail'];
type SliderTrackProps = NonNullable<SliderTypeMap['props']['slotProps']>['track'];
type SliderThumbProps = NonNullable<SliderTypeMap['props']['slotProps']>['thumb'];

export declare const SliderRoot: React.FC<SliderRootProps>;
export declare const SliderMark: React.FC<SliderMarkProps>;
export declare const SliderMarkLabel: React.FC<SliderMarkLabelProps>;
export declare const SliderRail: React.FC<SliderRailProps>;
export declare const SliderTrack: React.FC<SliderTrackProps>;
export declare const SliderThumb: React.FC<SliderThumbProps>;
export declare const SliderValueLabel: React.FC<SliderValueLabelProps>;

/**
 *
 * Demos:
 *
 * - [Slider](https://next.mui.com/material-ui/react-slider/)
 *
 * API:
 *
 * - [Slider API](https://next.mui.com/material-ui/api/slider/)
 */
declare const Slider: SliderType;

export type SliderProps<
  RootComponent extends React.ElementType = SliderTypeMap['defaultComponent'],
  AdditionalProps = {},
  Value extends number | readonly number[] = number | number[],
> = OverrideProps<SliderTypeMap<RootComponent, AdditionalProps, Value>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Slider;
