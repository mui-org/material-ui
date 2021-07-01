import * as React from 'react';
import { ResponsiveStyleValue, SxProps, SystemProps } from '@material-ui/system';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles/createTheme';

export interface StackTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    SystemProps<Theme> & {
      ref?: React.Ref<unknown>;
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * Defines the `flex-direction` style property.
       * It is applied for all screen sizes.
       * @default 'column'
       */
      direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
      /**
       * Defines the space between immediate children.
       * @default 0
       */
      spacing?: ResponsiveStyleValue<number | string>;
      /**
       * Add an element between each child.
       */
      divider?: React.ReactNode;
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}
/**
 *
 * Demos:
 *
 * - [Stack](https://material-ui.com/components/stack/)
 *
 * API:
 *
 * - [Stack API](https://material-ui.com/api/stack/)
 */
declare const Stack: OverridableComponent<StackTypeMap>;

export type StackProps<
  D extends React.ElementType = StackTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<StackTypeMap<P, D>, D>;

export default Stack;
