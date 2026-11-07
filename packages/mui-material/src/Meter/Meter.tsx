'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { Meter as BaseMeter } from '@base-ui/react/meter';
import type { SlotComponentProps } from '@mui/utils/types';
import type { OverridableStringUnion } from '@mui/types';
import type { SxProps } from '@mui/system';
import type { Theme } from '../styles';
import { useDefaultProps } from '../DefaultPropsProvider';
import MeterRootSlot from './MeterRootSlot';
import MeterInnerSlot from './MeterInnerSlot';
import type { MeterClasses } from './meterClasses';

export interface MeterPropsColorOverrides {}

export interface MeterSlots {
  /**
   * The component that renders the root.
   * @default 'div'
   */
  root?: React.ElementType | undefined;
  /**
   * The component that renders the label.
   * @default 'span'
   */
  label?: React.ElementType | undefined;
  /**
   * The component that renders the formatted value.
   * @default 'span'
   */
  value?: React.ElementType | undefined;
  /**
   * The component that renders the track.
   * @default 'div'
   */
  track?: React.ElementType | undefined;
  /**
   * The component that renders the indicator.
   * @default 'div'
   */
  indicator?: React.ElementType | undefined;
}

type MeterSlotSxProps = { sx?: SxProps<Theme> | undefined };

export interface MeterSlotProps {
  root?: SlotComponentProps<'div', MeterSlotSxProps, MeterOwnerState> | undefined;
  label?: SlotComponentProps<'span', MeterSlotSxProps, MeterOwnerState> | undefined;
  value?: SlotComponentProps<'span', MeterSlotSxProps, MeterOwnerState> | undefined;
  track?: SlotComponentProps<'div', MeterSlotSxProps, MeterOwnerState> | undefined;
  indicator?: SlotComponentProps<'div', MeterSlotSxProps, MeterOwnerState> | undefined;
}

export interface MeterProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'color'>,
    Pick<BaseMeter.Root.Props, 'format' | 'getAriaValueText' | 'locale' | 'max' | 'min'> {
  /**
   * The current value.
   */
  value: BaseMeter.Root.Props['value'];
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<MeterClasses> | undefined;
  /**
   * @ignore
   */
  className?: string | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color?:
    | OverridableStringUnion<
        'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit',
        MeterPropsColorOverrides
      >
    | undefined;
  /**
   * The label of the meter. Screen readers announce it as the meter's name.
   */
  label?: React.ReactNode;
  /**
   * Replaces the rendered root element while keeping the meter styles.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render?: BaseMeter.Root.Props['render'] | undefined;
  /**
   * Renders the visible value. Receives the formatted value and the raw value.
   * Setting it also shows the value.
   */
  renderValue?: ((formattedValue: string, value: number) => React.ReactNode) | undefined;
  /**
   * If `true`, the formatted value is displayed next to the label.
   * @default false
   */
  showValue?: boolean | undefined;
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots?: MeterSlots | undefined;
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps?: MeterSlotProps | undefined;
  /**
   * @ignore
   */
  style?: React.CSSProperties | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface MeterOwnerState extends MeterProps {}

/**
 * A graphical display of a numeric value within a known range, such as storage used or battery level.
 *
 * Demos:
 *
 * - [Meter](https://next.mui.com/material-ui/react-meter/)
 *
 * API:
 *
 * - [Meter API](https://next.mui.com/material-ui/api/meter/)
 */
const Meter = React.forwardRef(function Meter(
  inProps: MeterProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const props = useDefaultProps({ props: inProps, name: 'MuiMeter' });
  const {
    className,
    classes,
    color = 'primary',
    format,
    getAriaValueText,
    label,
    locale,
    max,
    min,
    render,
    renderValue,
    showValue = false,
    slots,
    slotProps,
    value,
    ...other
  } = props;
  const ownerState: MeterOwnerState = { ...props, color, showValue };
  const hasValue = showValue || renderValue !== undefined;

  return (
    <BaseMeter.Root
      value={value}
      min={min}
      max={max}
      format={format}
      locale={locale}
      getAriaValueText={getAriaValueText}
      render={(baseProps, state) => (
        <MeterRootSlot
          ref={ref}
          baseProps={baseProps}
          baseState={state}
          ownerState={ownerState}
          externalForwardedProps={{ ...other, slots, slotProps, component: undefined }}
        />
      )}
    >
      {label != null && (
        <BaseMeter.Label
          render={(baseProps) => (
            <MeterInnerSlot name="label" baseProps={baseProps} ownerState={ownerState} />
          )}
        >
          {label}
        </BaseMeter.Label>
      )}
      {hasValue && (
        <BaseMeter.Value
          render={(baseProps) => (
            <MeterInnerSlot name="value" baseProps={baseProps} ownerState={ownerState} />
          )}
        >
          {renderValue}
        </BaseMeter.Value>
      )}
      <BaseMeter.Track
        render={(baseProps) => (
          <MeterInnerSlot name="track" baseProps={baseProps} ownerState={ownerState} />
        )}
      >
        <BaseMeter.Indicator
          render={(baseProps) => (
            <MeterInnerSlot name="indicator" baseProps={baseProps} ownerState={ownerState} />
          )}
        />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
});

Meter.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: PropTypes.oneOf([
    'error',
    'info',
    'inherit',
    'primary',
    'secondary',
    'success',
    'warning',
  ]),
  /**
   * Options to format the value.
   */
  format: PropTypes.shape({
    compactDisplay: PropTypes.oneOf(['long', 'short']),
    currency: PropTypes.string,
    currencyDisplay: PropTypes.oneOf(['code', 'name', 'narrowSymbol', 'symbol']),
    currencySign: PropTypes.oneOf(['accounting', 'standard']),
    localeMatcher: PropTypes.oneOf(['best fit', 'lookup']),
    maximumFractionDigits: PropTypes.number,
    maximumSignificantDigits: PropTypes.number,
    minimumFractionDigits: PropTypes.number,
    minimumIntegerDigits: PropTypes.number,
    minimumSignificantDigits: PropTypes.number,
    notation: PropTypes.oneOf(['compact', 'engineering', 'scientific', 'standard']),
    numberingSystem: PropTypes.string,
    signDisplay: PropTypes.oneOf(['always', 'auto', 'exceptZero', 'never']),
    style: PropTypes.oneOf(['currency', 'decimal', 'percent', 'unit']),
    unit: PropTypes.string,
    unitDisplay: PropTypes.oneOf(['long', 'narrow', 'short']),
    useGrouping: PropTypes.bool,
  }),
  /**
   * A function that returns a string value that provides a human-readable text alternative for `aria-valuenow`, the current value of the meter.
   */
  getAriaValueText: PropTypes.func,
  /**
   * The label of the meter. Screen readers announce it as the meter's name.
   */
  label: PropTypes.node,
  /**
   * The locale used by `Intl.NumberFormat` when formatting the value.
   * Defaults to the user's runtime locale.
   */
  locale: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.string])),
    PropTypes.object,
    PropTypes.string,
  ]),
  /**
   * The maximum value
   * @default 100
   */
  max: PropTypes.number,
  /**
   * The minimum value
   * @default 0
   */
  min: PropTypes.number,
  /**
   * Replaces the rendered root element while keeping the meter styles.
   * Accepts an element or a function that receives the props and the Base UI state.
   */
  render: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  /**
   * Renders the visible value. Receives the formatted value and the raw value.
   * Setting it also shows the value.
   */
  renderValue: PropTypes.func,
  /**
   * If `true`, the formatted value is displayed next to the label.
   * @default false
   */
  showValue: PropTypes.bool,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    indicator: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    label: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    track: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    value: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    indicator: PropTypes.elementType,
    label: PropTypes.elementType,
    root: PropTypes.elementType,
    track: PropTypes.elementType,
    value: PropTypes.elementType,
  }),
  /**
   * @ignore
   */
  style: PropTypes.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The current value.
   */
  value: PropTypes.number.isRequired,
} as any;

export default Meter;
