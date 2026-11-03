import * as React from 'react';
import { SxProps } from '@mui/system';
import { DistributiveOmit } from '@mui/types';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { PaperOwnProps } from '../Paper';
import { CardClasses } from './cardClasses';

// TODO: v6 remove this interface, it is not used
export interface CardPropsColorOverrides {}

export interface CardOwnProps extends DistributiveOmit<PaperOwnProps, 'classes'> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardClasses> | undefined;
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface CardTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & CardOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Card](https://next.mui.com/material-ui/react-card/)
 *
 * API:
 *
 * - [Card API](https://next.mui.com/material-ui/api/card/)
 * - inherits [Paper API](https://next.mui.com/material-ui/api/paper/)
 */

declare const Card: OverridableComponent<CardTypeMap>;

export type CardProps<
  RootComponent extends React.ElementType = CardTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Card;
