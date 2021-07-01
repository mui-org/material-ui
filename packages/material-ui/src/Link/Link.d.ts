import * as React from 'react';
import { DistributiveOmit } from '@material-ui/types';
import { SxProps } from '@material-ui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { TypographyProps } from '../Typography';
import { LinkClasses } from './linkClasses';

export interface LinkTypeMap<P = {}, D extends React.ElementType = 'a'> {
  props: P &
    DistributiveOmit<LinkBaseProps, 'classes'> & {
      /**
       * The content of the component.
       */
      children?: React.ReactNode;
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<LinkClasses>;
      /**
       * The color of the link.
       * @default 'primary'
       */
      color?: TypographyProps['color'];
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
      /**
       * `classes` prop applied to the [`Typography`](/api/typography/) element.
       */
      TypographyClasses?: TypographyProps['classes'];
      /**
       * Controls when the link should have an underline.
       * @default 'always'
       */
      underline?: 'none' | 'hover' | 'always';
      /**
       * Applies the theme typography styles.
       * @default 'inherit'
       */
      variant?: TypographyProps['variant'];
    };
  defaultComponent: D;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://material-ui.com/components/breadcrumbs/)
 * - [Links](https://material-ui.com/components/links/)
 *
 * API:
 *
 * - [Link API](https://material-ui.com/api/link/)
 * - inherits [Typography API](https://material-ui.com/api/typography/)
 */
declare const Link: OverridableComponent<LinkTypeMap>;

export type LinkBaseProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color'> &
  DistributiveOmit<TypographyProps, 'children' | 'component' | 'color' | 'variant'>;

export type LinkProps<
  D extends React.ElementType = LinkTypeMap['defaultComponent'],
  P = {},
> = OverrideProps<LinkTypeMap<P, D>, D>;

export default Link;
