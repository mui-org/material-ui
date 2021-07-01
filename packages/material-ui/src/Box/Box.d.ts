import { SxProps, SystemProps } from '@material-ui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';

export interface BoxTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps<Theme> & {
      children?: React.ReactNode;
      component?: React.ElementType;
      ref?: React.Ref<unknown>;
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Box](https://material-ui.com/components/box/)
 *
 * API:
 *
 * - [Box API](https://material-ui.com/api/box/)
 */
declare const Box: OverridableComponent<BoxTypeMap>;

export type BoxProps<
  D extends React.ElementType = BoxTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<BoxTypeMap<P, D>, D>;

/**
 *
 * Demos:
 *
 * - [Box](https://material-ui.com/components/box/)
 *
 * API:
 *
 * - [Box API](https://material-ui.com/api/box/)
 */
export default Box;
