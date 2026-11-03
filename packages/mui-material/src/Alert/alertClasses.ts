import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AlertClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `variant="filled"`. */
  filled: string;
  /** Styles applied to the root element if `variant="outlined"`. */
  outlined: string;
  /** Styles applied to the root element if `variant="standard"`. */
  standard: string;
  /** Styles applied to the root element if `color="success"`. */
  colorSuccess: string;
  /** Styles applied to the root element if `color="info"`. */
  colorInfo: string;
  /** Styles applied to the root element if `color="warning"`. */
  colorWarning: string;
  /** Styles applied to the root element if `color="error"`. */
  colorError: string;
  /** Styles applied to the icon wrapper element. */
  icon: string;
  /** Styles applied to the message wrapper element. */
  message: string;
  /** Styles applied to the action wrapper element if `action` is provided. */
  action: string;
}

export type AlertClassKey = keyof AlertClasses;

export function getAlertUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAlert', slot);
}

const alertClasses: AlertClasses = generateUtilityClasses('MuiAlert', [
  'root',
  'action',
  'icon',
  'message',
  'filled',
  'colorSuccess',
  'colorInfo',
  'colorWarning',
  'colorError',
  'outlined',
  'standard',
]);

export default alertClasses;
