import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { SxProps } from '@mui/system';
import { Theme, TypeText } from '../styles';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { TypographyVariant } from '../styles/createTypography';
import { TypographyClasses } from './typographyClasses';

export interface TypographyPropsVariantOverrides {}

export interface TypographyPropsColorOverrides {}

export interface TypographyOwnProps {
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify' | undefined;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TypographyClasses> | undefined;
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color?:
    | OverridableStringUnion<
        | 'primary'
        | 'secondary'
        | 'success'
        | 'error'
        | 'info'
        | 'warning'
        | `text${Capitalize<keyof TypeText>}`,
        TypographyPropsColorOverrides
      >
    | (string & {})
    | undefined;
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom?: boolean | undefined;
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap?: boolean | undefined;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme> | undefined;
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant?:
    | OverridableStringUnion<TypographyVariant | 'inherit', TypographyPropsVariantOverrides>
    | undefined;
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping?:
    | Partial<
        Record<
          OverridableStringUnion<TypographyVariant | 'inherit', TypographyPropsVariantOverrides>,
          string
        >
      >
    | undefined;
}

export interface TypographyTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'span',
> {
  props: AdditionalProps & TypographyOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Breadcrumbs](https://next.mui.com/material-ui/react-breadcrumbs/)
 * - [Menubar](https://next.mui.com/material-ui/react-menubar/)
 * - [Typography](https://next.mui.com/material-ui/react-typography/)
 *
 * API:
 *
 * - [Typography API](https://next.mui.com/material-ui/api/typography/)
 */
declare const Typography: OverridableComponent<TypographyTypeMap>;

export type TypographyProps<
  RootComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<TypographyTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType | undefined;
};

export default Typography;
