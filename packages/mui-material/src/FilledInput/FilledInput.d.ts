import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { InternalStandardProps as StandardProps } from '../internal';
import { InputBaseProps } from '../InputBase';
import { FilledInputClasses } from './filledInputClasses';

export interface FilledInputProps extends StandardProps<InputBaseProps> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<FilledInputClasses> | undefined;
  /**
   * If `true`, the label is hidden.
   * This is used to increase density for a `FilledInput`.
   * Be sure to add `aria-label` to the `input` element.
   * @default false
   */
  hiddenLabel?: boolean | undefined;
  /**
   * If `true`, the input will not have an underline.
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
 * - [FilledInput API](https://next.mui.com/material-ui/api/filled-input/)
 * - inherits [InputBase API](https://next.mui.com/material-ui/api/input-base/)
 */
declare const FilledInput: ((props: FilledInputProps) => React.JSX.Element) & { muiName: string };

export default FilledInput;
