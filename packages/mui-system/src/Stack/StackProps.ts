import type * as React from 'react';
import type { OverrideProps } from '@mui/types';
import type { ResponsiveStyleValue, SxProps } from '../styleFunctionSx';
import type { Theme } from '../createTheme';

export interface StackBaseProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'> | undefined;
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<number | string> | undefined;
  /**
   * Add an element between each child.
   */
  divider?: React.ReactNode;
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the known limitations,
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the theme's default props configuration.
   * @default false
   */
  useFlexGap?: boolean | undefined;
}
export interface StackTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps &
    StackBaseProps & {
      /**
       * The system prop, which allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme> | undefined;
    };
  defaultComponent: DefaultComponent;
}

export type StackProps<
  RootComponent extends React.ElementType = StackTypeMap['defaultComponent'],
  AdditionalProps = {
    component?: React.ElementType | undefined;
  },
> = OverrideProps<StackTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export interface StackOwnerState {
  direction: StackProps['direction'];
  spacing: StackProps['spacing'];
  useFlexGap: boolean;
}
