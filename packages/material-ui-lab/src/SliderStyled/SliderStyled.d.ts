import * as React from 'react';
import { SxProps } from '@material-ui/core/Box';
import {
  ExtendSliderUnstyledTypeMap,
  ExtendSliderUnstyled,
} from '@material-ui/unstyled/SliderUnstyled';

export type SliderStyledTypeMap<
  D extends React.ElementType = 'span',
  P = {}
> = ExtendSliderUnstyledTypeMap<{
  props: P & {
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
  };
  defaultComponent: D;
}>;

type SliderRootProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['root'];
type SliderMarkProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['mark'];
type SliderMarkLabelProps = NonNullable<
  SliderStyledTypeMap['props']['componentsProps']
>['markLabel'];
type SliderRailProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['rail'];
type SliderTrackProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['track'];
type SliderThumbProps = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['thumb'];
type SliderValueLabel = NonNullable<SliderStyledTypeMap['props']['componentsProps']>['valueLabel'];

export const SliderRoot: React.FC<SliderRootProps>;
export const SliderMark: React.FC<SliderMarkProps>;
export const SliderMarkLabel: React.FC<SliderMarkLabelProps>;
export const SliderRail: React.FC<SliderRailProps>;
export const SliderTrack: React.FC<SliderTrackProps>;
export const SliderThumb: React.FC<SliderThumbProps>;
export const SliderValueLabel: React.FC<SliderValueLabel>;

/**
 *
 * Demos:
 *
 * - [Slider Styled](https://material-ui.com/components/slider-styled/)
 *
 * API:
 *
 * - [SliderStyled API](https://material-ui.com/api/slider-styled/)
 */
declare const Slider: ExtendSliderUnstyled<SliderStyledTypeMap>;

export type SliderStyledClassKey =
  /** Class name applied to the root element. */
  | 'root'
  /** Class name applied to the root element if `color="primary"`. */
  | 'colorPrimary'
  /** Class name applied to the root element if `color="secondary"`. */
  | 'colorSecondary'
  /** Class name applied to the root element if `marks` is provided with at least one label. */
  | 'marked'
  /** Class name applied to the root element if `orientation="vertical"`. */
  | 'vertical'
  /** Pseudo-class applied to the root and thumb element if `disabled={true}`. */
  | 'disabled'
  /** Class name applied to the rail element. */
  | 'rail'
  /** Class name applied to the track element. */
  | 'track'
  /** Class name applied to the track element if `track={false}`. */
  | 'trackFalse'
  /** Class name applied to the track element if `track="inverted"`. */
  | 'trackInverted'
  /** Class name applied to the thumb element. */
  | 'thumb'
  /** Class name applied to the thumb element if `color="primary"`. */
  | 'thumbColorPrimary'
  /** Class name applied to the thumb element if `color="secondary"`. */
  | 'thumbColorSecondary'
  /** Pseudo-class applied to the thumb element if it's active. */
  | 'active'
  /** Pseudo-class applied to the thumb element if keyboard focused. */
  | 'focusVisible'
  /** Class name applied to the thumb label element. */
  | 'valueLabel'
  /** Class name applied to the mark element. */
  | 'mark'
  /** Class name applied to the mark element if active (depending on the value). */
  | 'markActive'
  /** Class name applied to the mark label element. */
  | 'markLabel'
  /** Class name applied to the mark label element if active (depending on the value). */
  | 'markLabelActive';

export default Slider;
