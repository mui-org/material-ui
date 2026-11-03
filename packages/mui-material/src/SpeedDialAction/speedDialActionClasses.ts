import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface SpeedDialActionClasses {
  /** Styles applied to the Fab component. */
  fab: string;
  /** Styles applied to the Fab component if `open={false}`. */
  fabClosed: string;
  /** Styles applied to the root element if `slotProps.tooltip.open` is `true`. */
  staticTooltip: string;
  /** Styles applied to the root element if `slotProps.tooltip.open` is `true` and `open` is `false`. */
  staticTooltipClosed: string;
  /** Styles applied to the static tooltip label if `slotProps.tooltip.open` is `true`. */
  staticTooltipLabel: string;
  /** Styles applied to the root element if `slotProps.tooltip.open` is `true` and `slotProps.tooltip.placement` contains "left". */
  tooltipPlacementLeft: string;
  /** Styles applied to the root element if `slotProps.tooltip.open` is `true` and `slotProps.tooltip.placement` contains "right". */
  tooltipPlacementRight: string;
  /** Styles applied to the root element if `slotProps.tooltip.open` is `true` and `slotProps.tooltip.placement` contains "top". */
  tooltipPlacementTop: string;
  /** Styles applied to the root element if `slotProps.tooltip.open` is `true` and `slotProps.tooltip.placement` contains "bottom". */
  tooltipPlacementBottom: string;
}

export type SpeedDialActionClassKey = keyof SpeedDialActionClasses;

export function getSpeedDialActionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiSpeedDialAction', slot);
}

const speedDialActionClasses: SpeedDialActionClasses = generateUtilityClasses(
  'MuiSpeedDialAction',
  [
    'fab',
    'fabClosed',
    'staticTooltip',
    'staticTooltipClosed',
    'staticTooltipLabel',
    'tooltipPlacementLeft',
    'tooltipPlacementRight',
    'tooltipPlacementTop',
    'tooltipPlacementBottom',
  ],
);

export default speedDialActionClasses;
