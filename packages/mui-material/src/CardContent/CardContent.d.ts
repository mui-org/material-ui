import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { CardContentClasses } from './cardContentClasses';

export interface CardContentOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<CardContentClasses> | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
}

export interface CardContentTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & CardContentOwnProps;
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
 * - [CardContent API](https://next.mui.com/material-ui/api/card-content/)
 */
declare const CardContent: OverridableComponent<CardContentTypeMap>;

export type CardContentProps<
  RootComponent extends React.ElementType = CardContentTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<CardContentTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default CardContent;
