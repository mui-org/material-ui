import style from '../style';
import type { PropsFor, SimpleStyleFunction } from '../style';
import compose from '../compose';

export const fontFamily = style({
  prop: 'fontFamily',
  themeKey: 'typography',
}) as unknown as SimpleStyleFunction<'fontFamily'>;

export const fontSize = style({
  prop: 'fontSize',
  themeKey: 'typography',
}) as unknown as SimpleStyleFunction<'fontSize'>;

export const fontStyle = style({
  prop: 'fontStyle',
  themeKey: 'typography',
}) as unknown as SimpleStyleFunction<'fontStyle'>;

export const fontWeight = style({
  prop: 'fontWeight',
  themeKey: 'typography',
}) as unknown as SimpleStyleFunction<'fontWeight'>;

export const letterSpacing = style({
  prop: 'letterSpacing',
}) as unknown as SimpleStyleFunction<'letterSpacing'>;
export const textTransform = style({
  prop: 'textTransform',
}) as unknown as SimpleStyleFunction<'textTransform'>;
export const lineHeight = style({
  prop: 'lineHeight',
}) as unknown as SimpleStyleFunction<'lineHeight'>;
export const textAlign = style({
  prop: 'textAlign',
}) as unknown as SimpleStyleFunction<'textAlign'>;

export const typographyVariant = style({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography',
}) as unknown as SimpleStyleFunction<'typography'>;

const typography = compose(
  typographyVariant,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  textTransform,
) as unknown as SimpleStyleFunction<
  | 'typography'
  | 'fontFamily'
  | 'fontSize'
  | 'fontStyle'
  | 'fontWeight'
  | 'letterSpacing'
  | 'lineHeight'
  | 'textAlign'
  | 'textTransform'
>;

export type TypographyProps = PropsFor<typeof typography>;

export default typography;
