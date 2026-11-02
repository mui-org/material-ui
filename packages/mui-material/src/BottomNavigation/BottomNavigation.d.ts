import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { BottomNavigationClasses } from './bottomNavigationClasses';

export interface BottomNavigationOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<BottomNavigationClasses> | undefined;
  /**
   * Callback fired when the value changes.
   *
   * @param {React.SyntheticEvent} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {any} value We default to the index of the child.
   */
  onChange?: ((event: React.SyntheticEvent, value: any) => void) | undefined;
  /**
   * If `true`, all `BottomNavigationAction`s will show their labels.
   * By default, only the selected `BottomNavigationAction` will show its label.
   * @default false
   */
  showLabels?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * The value of the currently selected `BottomNavigationAction`.
   */
  value?: any;
}

export interface BottomNavigationTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & BottomNavigationOwnProps;
  defaultComponent: RootComponent;
}
/**
 *
 * Demos:
 *
 * - [Bottom Navigation](https://next.mui.com/material-ui/react-bottom-navigation/)
 *
 * API:
 *
 * - [BottomNavigation API](https://next.mui.com/material-ui/api/bottom-navigation/)
 */
declare const BottomNavigation: OverridableComponent<BottomNavigationTypeMap>;

export type BottomNavigationProps<
  RootComponent extends React.ElementType = BottomNavigationTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<BottomNavigationTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default BottomNavigation;
