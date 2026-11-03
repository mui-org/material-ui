import style from '../style';
import type { PropsFor, SimpleStyleFunction } from '../style';
import compose from '../compose';

/** @internal */
export function paletteTransform(value: unknown, userValue: unknown) {
  if (userValue === 'grey') {
    return userValue;
  }
  return value;
}

export const color = style({
  prop: 'color',
  themeKey: 'palette',
  transform: paletteTransform as any,
}) as unknown as SimpleStyleFunction<'color'>;

export const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform as any,
}) as unknown as SimpleStyleFunction<'bgcolor'>;

export const backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform: paletteTransform as any,
}) as unknown as SimpleStyleFunction<'backgroundColor'>;

const palette = compose(color, bgcolor, backgroundColor) as unknown as SimpleStyleFunction<
  'bgcolor' | 'color'
>;

export type PaletteProps = PropsFor<typeof palette>;

export default palette;
