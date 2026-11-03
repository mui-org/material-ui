import * as React from 'react';
import { SxProps } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ListSubheaderClasses } from './listSubheaderClasses';

export interface ListSubheaderOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ListSubheaderClasses> | undefined;
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color?: 'default' | 'primary' | 'inherit' | undefined;
  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters?: boolean | undefined;
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky?: boolean | undefined;
  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface ListSubheaderTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'li',
> {
  props: AdditionalProps & ListSubheaderOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Lists](https://next.mui.com/material-ui/react-list/)
 * - [Menubar](https://next.mui.com/material-ui/react-menubar/)
 *
 * API:
 *
 * - [ListSubheader API](https://next.mui.com/material-ui/api/list-subheader/)
 */
declare const ListSubheader: OverridableComponent<ListSubheaderTypeMap>;

export type ListSubheaderProps<
  RootComponent extends React.ElementType = ListSubheaderTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ListSubheaderTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default ListSubheader;
