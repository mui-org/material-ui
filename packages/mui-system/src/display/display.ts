import style from '../style';
import type { PropsFor, SimpleStyleFunction } from '../style';
import compose from '../compose';

export const displayPrint = style({
  prop: 'displayPrint',
  cssProperty: false,
  transform: (value) => ({
    '@media print': {
      display: value,
    },
  }),
});

export const displayRaw = style({
  prop: 'display',
});

export const overflow = style({
  prop: 'overflow',
});

export const textOverflow = style({
  prop: 'textOverflow',
});

export const visibility = style({
  prop: 'visibility',
});

export const whiteSpace = style({
  prop: 'whiteSpace',
});

const display = compose(
  displayPrint,
  displayRaw,
  overflow,
  textOverflow,
  visibility,
  whiteSpace,
) as unknown as SimpleStyleFunction<
  'display' | 'displayPrint' | 'overflow' | 'textOverflow' | 'visibility' | 'whiteSpace'
>;

export type DisplayProps = PropsFor<typeof display>;

export default display;
