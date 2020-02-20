import * as React from 'react';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';

export interface CardMediaTypeMap<P, D extends React.ElementType> {
  props: P & {
    image?: string;
    src?: string;
    component?: string | React.Component
  };
  defaultComponent: D;
  classKey: CardMediaClassKey;
}

declare const CardMedia: OverridableComponent<CardMediaTypeMap<{}, 'div'>>;

export type CardMediaClassKey = 'root' | 'media';

export type CardMediaProps<D extends React.ElementType = 'div', P = {}> = OverrideProps<
  CardMediaTypeMap<P, D>,
  D
>;

export default CardMedia;
