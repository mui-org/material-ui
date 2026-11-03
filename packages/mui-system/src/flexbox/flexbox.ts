import style from '../style';
import type { PropsFor, SimpleStyleFunction } from '../style';
import compose from '../compose';

export const flexBasis = style({
  prop: 'flexBasis',
}) as unknown as SimpleStyleFunction<'flexBasis'>;
export const flexDirection = style({
  prop: 'flexDirection',
}) as unknown as SimpleStyleFunction<'flexDirection'>;
export const flexWrap = style({ prop: 'flexWrap' }) as unknown as SimpleStyleFunction<'flexWrap'>;
export const justifyContent = style({
  prop: 'justifyContent',
}) as unknown as SimpleStyleFunction<'justifyContent'>;
export const alignItems = style({
  prop: 'alignItems',
}) as unknown as SimpleStyleFunction<'alignItems'>;
export const alignContent = style({
  prop: 'alignContent',
}) as unknown as SimpleStyleFunction<'alignContent'>;
export const order = style({ prop: 'order' }) as unknown as SimpleStyleFunction<'order'>;
export const flex = style({ prop: 'flex' }) as unknown as SimpleStyleFunction<'flex'>;
export const flexGrow = style({ prop: 'flexGrow' }) as unknown as SimpleStyleFunction<'flexGrow'>;
export const flexShrink = style({
  prop: 'flexShrink',
}) as unknown as SimpleStyleFunction<'flexShrink'>;
export const alignSelf = style({
  prop: 'alignSelf',
}) as unknown as SimpleStyleFunction<'alignSelf'>;
export const justifyItems = style({
  prop: 'justifyItems',
}) as unknown as SimpleStyleFunction<'justifyItems'>;
export const justifySelf = style({
  prop: 'justifySelf',
}) as unknown as SimpleStyleFunction<'justifySelf'>;

const flexbox = compose(
  flexBasis,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignContent,
  order,
  flex,
  flexGrow,
  flexShrink,
  alignSelf,
  justifyItems,
  justifySelf,
) as unknown as SimpleStyleFunction<
  | 'flexBasis'
  | 'flexDirection'
  | 'flexWrap'
  | 'justifyContent'
  | 'alignItems'
  | 'alignContent'
  | 'order'
  | 'flex'
  | 'flexGrow'
  | 'flexShrink'
  | 'alignSelf'
  | 'justifyItems'
  | 'justifySelf'
>;

export type FlexboxProps = PropsFor<typeof flexbox>;

export default flexbox;
