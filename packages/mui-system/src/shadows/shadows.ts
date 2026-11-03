import style from '../style';
import type { PropsFor, SimpleStyleFunction } from '../style';

const boxShadow = style({
  prop: 'boxShadow',
  themeKey: 'shadows',
}) as unknown as SimpleStyleFunction<'boxShadow'>;

export type ShadowsProps = PropsFor<typeof boxShadow>;

export default boxShadow;
