import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { InputBaseProps } from '../InputBase';
import { InputClasses } from './inputClasses';

export interface InputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<InputClasses> | undefined;
  /**
   * If `true`, the `input` will not have an underline.
   * @default false
   */
  disableUnderline?: boolean | undefined;
  /**
   * @internal
   */
  notched?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

/**
 *
 * Demos:
 *
 * - [Text Field](https://next.mui.com/material-ui/react-text-field/)
 *
 * API:
 *
 * - [Input API](https://next.mui.com/material-ui/api/input/)
 * - inherits [InputBase API](https://next.mui.com/material-ui/api/input-base/)
 */
declare const Input: ((props: InputProps) => React.JSX.Element) & { muiName: string };

export default Input;
