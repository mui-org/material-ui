import * as React from 'react';
import { SxProps } from '@material-ui/system';
import { DistributiveOmit } from '@material-ui/types';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';
import { Theme } from '..';
import { PaperProps } from '../Paper';
import { CardClasses } from './cardClasses';

export interface CardPropsColorOverrides {}

export interface CardTypeMap<P = {}, D extends React.ElementType = 'div'> {
  props: P &
    DistributiveOmit<PaperProps, 'classes'> & {
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<CardClasses>;
      /**
       * If `true`, the card will use raised styling.
       * @default false
       */
      raised?: boolean;
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Cards](https://material-ui.com/components/cards/)
 *
 * API:
 *
 * - [Card API](https://material-ui.com/api/card/)
 * - inherits [Paper API](https://material-ui.com/api/paper/)
 */

declare const Card: OverridableComponent<CardTypeMap>;

export type CardProps<
  D extends React.ElementType = CardTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<CardTypeMap<P, D>, D>;

export default Card;
