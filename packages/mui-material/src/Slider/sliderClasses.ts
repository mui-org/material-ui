import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SliderClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `color="primary"`. */
  colorPrimary: string;
  /** Styles applied to the root element if `color="secondary"`. */
  colorSecondary: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `marks` is provided with at least one label. */
  marked: string;
  /** Styles applied to the root element if `orientation="vertical"`. */
  vertical: string;
  /** State class applied to the root and thumb element if `disabled={true}`. */
  disabled: string;
  /** State class applied to the root if a thumb is being dragged. */
  dragging: string;
  /** Styles applied to the rail element. */
  rail: string;
  /** Styles applied to the track element. */
  track: string;
  /** Styles applied to the root element if `track={false}`. */
  trackFalse: string;
  /** Styles applied to the root element if `track="inverted"`. */
  trackInverted: string;
  /** Styles applied to the thumb element. */
  thumb: string;
  /** State class applied to the thumb element if it's active. */
  active: string;
  /** State class applied to the thumb element if keyboard focused. */
  focusVisible: string;
  /** Styles applied to the mark element. */
  mark: string;
  /** Styles applied to the mark element if active (depending on the value). */
  markActive: string;
  /** Styles applied to the mark label element. */
  markLabel: string;
  /** Styles applied to the mark label element if active (depending on the value). */
  markLabelActive: string;
  /** Styles applied to the root element if `size="small"`. */
  sizeSmall: string;
  /** Styles applied to the thumb label element. */
  valueLabel: string;
  /** Styles applied to the thumb label element if it's open. */
  valueLabelOpen: string;
  /** Styles applied to the thumb label's circle element. */
  valueLabelCircle: string;
  /** Styles applied to the thumb label's label element. */
  valueLabelLabel: string;
}

export type SliderClassKey = keyof SliderClasses;

export function getSliderUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSlider', slot);
}

const sliderClasses: SliderClasses = generateUtilityClasses('MuiSlider', [
  'root',
  'active',
  'colorPrimary',
  'colorSecondary',
  'colorError',
  'colorInfo',
  'colorSuccess',
  'colorWarning',
  'disabled',
  'dragging',
  'focusVisible',
  'mark',
  'markActive',
  'marked',
  'markLabel',
  'markLabelActive',
  'rail',
  'sizeSmall',
  'thumb',
  'track',
  'trackInverted',
  'trackFalse',
  'valueLabel',
  'valueLabelOpen',
  'valueLabelCircle',
  'valueLabelLabel',
  'vertical',
]);

export default sliderClasses;
