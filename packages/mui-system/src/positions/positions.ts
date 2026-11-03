import style from '../style';
import type { PropsFor, SimpleStyleFunction } from '../style';
import compose from '../compose';

export const position = style({ prop: 'position' });
export const zIndex = style({ prop: 'zIndex', themeKey: 'zIndex' });
export const top = style({ prop: 'top' });
export const right = style({ prop: 'right' });
export const bottom = style({ prop: 'bottom' });
export const left = style({ prop: 'left' });

const positions = compose(
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
) as unknown as SimpleStyleFunction<'zIndex' | 'position' | 'top' | 'right' | 'bottom' | 'left'>;

export type PositionsProps = PropsFor<typeof positions>;

export default positions;
