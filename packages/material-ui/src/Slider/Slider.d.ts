import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface Mark {
  value: number;
  label?: React.ReactNode;
}

export interface ValueLabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  open: boolean;
  children: React.ReactElement;
}

export interface SliderTypeMap<P = {}, D extends React.ElementType = 'span'> {
  props: P & {
    'aria-label'?: string;
    'aria-labelledby'?: string;
    'aria-valuetext'?: string;
    color?: 'primary' | 'secondary';
    defaultValue?: number | number[];
    disabled?: boolean;
    getAriaLabel?: (index: number) => string;
    getAriaValueText?: (value: number, index: number) => string;
    marks?: boolean | Mark[];
    max?: number;
    min?: number;
    name?: string;
    onChange?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
    onChangeCommitted?: (event: React.ChangeEvent<{}>, value: number | number[]) => void;
    orientation?: 'horizontal' | 'vertical';
    step?: number | null;
    scale?: (value: number) => number;
    ThumbComponent?: React.ElementType<React.HTMLAttributes<HTMLSpanElement>>;
    track?: 'normal' | false | 'inverted';
    useCapture?: boolean;
    value?: number | number[];
    ValueLabelComponent?: React.ElementType<ValueLabelProps>;
    valueLabelDisplay?: 'on' | 'auto' | 'off';
    valueLabelFormat?: string | ((value: number, index: number) => React.ReactNode);
  };
  defaultComponent: D;
  classKey: SliderClassKey;
}
/**
 *
 * Demos:
 *
 * - [Slider](https://material-ui.com/components/slider/)
 *
 * API:
 *
 * - [Slider API](https://material-ui.com/api/slider/)
 */
declare const Slider: OverridableComponent<SliderTypeMap>;

export type SliderClassKey =
  | 'root'
  | 'colorPrimary'
  | 'colorSecondary'
  | 'marked'
  | 'vertical'
  | 'disabled'
  | 'rail'
  | 'track'
  | 'trackFalse'
  | 'trackInverted'
  | 'thumb'
  | 'thumbColorPrimary'
  | 'thumbColorSecondary'
  | 'active'
  | 'focusVisible'
  | 'valueLabel'
  | 'mark'
  | 'markActive'
  | 'markLabel'
  | 'markLabelActive';

export type SliderProps<
  D extends React.ElementType = SliderTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<SliderTypeMap<P, D>, D>;

export default Slider;
