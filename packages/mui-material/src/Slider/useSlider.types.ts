import type * as React from 'react';

export interface UseSliderParameters {
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby'?: string | undefined;
  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: number | ReadonlyArray<number> | undefined;
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
   * If `true` the Slider will be rendered right-to-left (with the lowest value on the right-hand side).
   * @default false
   */
  isRtl?: boolean | undefined;
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks?: boolean | ReadonlyArray<Mark> | undefined;
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
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange?: ((event: Event, value: number | number[], activeThumb: number) => void) | undefined;
  /**
   * Callback function that is fired when the pointer or touch interaction ends.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted?:
    ((event: React.SyntheticEvent | Event, value: number | number[]) => void) | undefined;
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical' | undefined;
  /**
   * The ref attached to the root of the Slider.
   */
  rootRef?: React.Ref<Element> | undefined;
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
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step?: number | null | undefined;
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex?: number | undefined;
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value?: number | ReadonlyArray<number> | undefined;
}

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export type UseSliderRootSlotOwnProps = {
  onPointerDown: React.HTMLAttributes<HTMLSpanElement>['onPointerDown'];
  ref: React.RefCallback<Element> | null;
};

export type UseSliderRootSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseSliderRootSlotOwnProps
> &
  UseSliderRootSlotOwnProps;

export type UseSliderThumbSlotOwnProps = {
  onMouseLeave: React.MouseEventHandler;
  onMouseOver: React.MouseEventHandler;
};

export type UseSliderThumbSlotProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseSliderThumbSlotOwnProps
> &
  UseSliderThumbSlotOwnProps;

export type UseSliderHiddenInputOwnProps = {
  'aria-labelledby'?: string | undefined;
  'aria-orientation'?: React.AriaAttributes['aria-orientation'] | undefined;
  'aria-valuemax'?: React.AriaAttributes['aria-valuemax'] | undefined;
  'aria-valuemin'?: React.AriaAttributes['aria-valuemin'] | undefined;
  disabled: boolean;
  name?: string | undefined;
  onBlur: React.FocusEventHandler;
  onChange: React.ChangeEventHandler;
  onFocus: React.FocusEventHandler;
  step?: number | 'any' | undefined;
  style: React.CSSProperties;
  tabIndex?: number | undefined;
  type?: React.InputHTMLAttributes<HTMLInputElement>['type'] | undefined;
};

export type UseSliderHiddenInputProps<ExternalProps = {}> = Omit<
  ExternalProps,
  keyof UseSliderHiddenInputOwnProps
> &
  UseSliderHiddenInputOwnProps;

export type Axis = 'horizontal' | 'vertical' | 'horizontal-reverse';

export interface AxisProps<T extends Axis> {
  offset: (
    percent: number,
  ) => T extends 'horizontal'
    ? { left: string }
    : T extends 'vertical'
      ? { bottom: string }
      : T extends 'horizontal-reverse'
        ? { right: string }
        : never;
  leap: (
    percent: number,
  ) => T extends 'horizontal' | 'horizontal-reverse'
    ? { width: string }
    : T extends 'vertical'
      ? { height: string }
      : never;
}

export interface UseSliderReturnValue {
  /**
   * The active index of the slider.
   */
  active: number;
  /**
   * The orientation of the slider.
   */
  axis: Axis;
  /**
   * Returns the `offset` and `leap` methods to calculate the positioning styles based on the slider axis.
   */
  axisProps: { [key in Axis]: AxisProps<key> };
  /**
   * If `true`, the slider is being dragged.
   */
  dragging: boolean;
  /**
   * The index of the thumb which is focused on the slider.
   */
  focusedThumbIndex: number;
  /**
   * Resolver for the hidden input slot's props.
   * @param externalProps props for the hidden input slot
   * @returns props that should be spread on the hidden input slot
   */
  getHiddenInputProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseSliderHiddenInputProps<ExternalProps>;
  /**
   * Resolver for the root slot's props.
   * @param externalProps props for the root slot
   * @returns props that should be spread on the root slot
   */
  getRootProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseSliderRootSlotProps<ExternalProps>;
  /**
   * Resolver for the thumb slot's props.
   * @param externalProps props for the thumb slot
   * @returns props that should be spread on the thumb slot
   */
  getThumbProps: <ExternalProps extends Record<string, unknown> = {}>(
    externalProps?: ExternalProps,
  ) => UseSliderThumbSlotProps<ExternalProps>;
  /**
   * Resolver for the thumb slot's style prop.
   * @param index of the currently moved thumb
   * @returns props that should be spread on the style prop of thumb slot
   */
  getThumbStyle: (index: number) => object;
  /**
   * The marks of the slider. Marks indicate predetermined values to which the user can move the slider.
   */
  marks: readonly Mark[];
  /**
   * The thumb index for the current value when in hover state.
   */
  open: number;
  /**
   * If `true`, the slider is a range slider when the `value` prop passed is an array.
   */
  range: boolean;
  /**
   * Ref to the root slot's DOM node.
   */
  rootRef: React.RefCallback<Element> | null;
  /**
   * The track leap for the current value of the slider.
   */
  trackLeap: number;
  /**
   * The track offset for the current value of the slider.
   */
  trackOffset: number;
  /**
   * The possible values of the slider.
   */
  values: number[];
}
